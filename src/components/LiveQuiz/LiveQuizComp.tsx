import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Client, Stomp } from '@stomp/stompjs';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userNickNameState, userRoleState } from '@/recoil/atoms/userInfoAtom';
import { usersState } from '@/recoil/atoms/userStateAtom';
import { AdminModal, CanvasComponent } from '@/components';
import axios from 'axios';
import { AdminModalProps, ChatMessage, UserStatusMap } from '@/types/liveQuiz';
import DOMPurify from 'dompurify';

const LiveQuizComp: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState('');
  const setUsers = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);
  const nickName = useRecoilValue(userNickNameState);
  const setNickName = useSetRecoilState(userNickNameState);
  const muteTimerRef = useRef<NodeJS.Timeout | null>(null);
  const userRole = useRecoilValue(userRoleState);
  const setUserRole = useSetRecoilState(userRoleState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userStatus, setUserStatus] = useState<UserStatusMap>({});
  const [correctAnsweredUsers, setCorrectAnsweredUsers] = useState([]);
  const [remainingWinners, setRemainingWinners] = useState(0);
  const [answerLength, setAnswerLength] = useState(0);
  const [mileagePoint, setMileagePoint] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userStatus[nickName]?.isMuted) {
      setTimeout(() => {
        setUserStatus(prevStatus => ({
          ...prevStatus,
          [nickName]: { ...prevStatus[nickName], isMuted: false },
        }));
      }, 30000);
    }
  }, [userStatus, nickName, setUserStatus]);

  useEffect(() => {
    const socket = new WebSocket(
      `${import.meta.env.VITE_APP_WS_SERVER_URL}/ws`,
    );
    const newStompClient = Stomp.over(socket);

    const connectWebSocket = () => {
      const token = localStorage.getItem('Authorization');
      if (!token) {
        toast.error('로그인이 필요합니다.');
        return;
      }

      newStompClient.connect(
        { Authorization: token },
        async () => {
          try {
            const response = await axios.get(
              `${
                import.meta.env.VITE_APP_GENERATED_SERVER_URL
              }/api/liveQuiz/userLists`,
            );
            setUsers(response.data);

            const userInfoResponse = await axios.get(
              `${
                import.meta.env.VITE_APP_GENERATED_SERVER_URL
              }/api/liveQuiz/userInfo`,
              { headers: { Authorization: token } },
            );
            userInfoResponse.data.role === 'ADMIN'
              ? setUserRole('ADMIN')
              : setUserRole('USER');
            setNickName(userInfoResponse.data.nickName);
            setCorrectAnsweredUsers(
              userInfoResponse.data.quizUpdateDto.correctAnsweredUsers,
            );
            setRemainingWinners(
              userInfoResponse.data.quizUpdateDto.remainingWinners,
            );
            setAnswerLength(userInfoResponse.data.quizUpdateDto.answerLength);
            setMileagePoint(userInfoResponse.data.quizUpdateDto.mileagePoint);
          } catch (error) {
            toast.error('유저 목록을 불러오는데 실패하였습니다.');
          }

          newStompClient.subscribe('/topic/users', message => {
            const userList = JSON.parse(message.body);
            setUsers(userList);
          });

          newStompClient.subscribe('/topic/quizUpdate', message => {
            const update = JSON.parse(message.body);
            setCorrectAnsweredUsers(update.correctAnsweredUsers);
            setRemainingWinners(update.remainingWinners);
            setAnswerLength(update.answerLength);
            setMileagePoint(update.mileagePoint);
          });

          newStompClient.subscribe('/topic/liveChatRoom', message => {
            const chatMessage = JSON.parse(message.body);

            if (chatMessage.type === 'ERROR') {
              if (chatMessage.message === '도배 금지!') {
                if (chatMessage.nickName === nickName) {
                  toast.error('도배로 인해 30초동안 채팅이 금지됩니다.');
                }
                setUserStatus(prevStatus => ({
                  ...prevStatus,
                  [chatMessage.nickName]: {
                    ...prevStatus[chatMessage.nickName],
                    isMuted: true,
                  },
                }));

                if (muteTimerRef.current) {
                  clearTimeout(muteTimerRef.current);
                }
              } else if (chatMessage.message === '차단된 유저입니다.') {
                if (chatMessage.nickName === nickName) {
                  toast.error('차단된 유저는 메세지를 전송할 수 없습니다.');
                }
              }
            } else {
              setHistory(prevHistory => [...prevHistory, chatMessage]);
            }
          });
          setStompClient(newStompClient);
        },
        (error: Error) => {
          console.error('Connection error:', error);
          toast.error('웹소켓 연결에 실패했습니다.');
        },
      );
    };

    const disconnectWebSocket = () => {
      newStompClient.disconnect(() => {});
    };

    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, [setUsers, setHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentUserStatus = userStatus[nickName];
    if (currentUserStatus && currentUserStatus.isMuted) {
      toast.error('도배로 인해 금지된 상태입니다.');
      return;
    }

    if (inputMessage.trim() && stompClient) {
      stompClient.publish({
        destination: '/app/liveChatRoom',
        body: JSON.stringify({ message: inputMessage, nickName: nickName }),
      });
      setInputMessage('');
    }
  };

  useEffect(() => {
    return () => {
      if (muteTimerRef.current) {
        clearTimeout(muteTimerRef.current);
      }
    };
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.currentTarget.value);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const submitAnswer = () => {
    openModal();
  };

  const handleModalSubmit: AdminModalProps['onSubmit'] = async data => {
    try {
      const token = localStorage.getItem('Authorization');
      await axios.post(
        `${
          import.meta.env.VITE_APP_GENERATED_SERVER_URL
        }/api/liveQuiz/liveSubmitAnswer`,
        {
          answer: data.answer,
          winnersCount: data.numberOfPeople,
          mileagePoint: data.mileage,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success('문제가 성공적으로 제출되었습니다!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || '오류가 발생했습니다.';
        toast.error(errorMessage);
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handleReport = async (nickName: string) => {
    try {
      const token = localStorage.getItem('Authorization');
      if (!token) {
        toast.error('로그인이 필요합니다.');
        return;
      }

      await axios.post(
        `${
          import.meta.env.VITE_APP_GENERATED_SERVER_URL
        }/api/report/liveChat/${nickName}`,
        {},
        { headers: { Authorization: token } },
      );

      toast.success(`'${nickName}' 사용자가 신고되었습니다.`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.msg ||
          '신고 처리 중 오류가 발생했습니다.';
        toast.error(errorMessage);
      } else {
        toast.error('신고 처리 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex w-[100vw] h-[920px] justify-center mx-auto overflow-y-hidden">
      <div className="min-w-[210px] h-auto mt-[125px]">
        <div className="mr-5 flex flex-col text-center bg-lightBlue px-3 py-5 rounded-xl shadow-md shadow-slate-300">
          <ul>
            <h1 className="text-center font-extrabold text-xl text-black">
              접속유저 목록
            </h1>
            <hr className="w-3/4 mx-auto my-3" />
            {users.map((user, index) => (
              <li key={index} className="mt-3 mx-auto">
                💙 {user} 💙
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-[1080px] h-full">
        <div className="pt-[90px]"></div>

        <div className="flex justify-between font-extrabold text-red mb-2 mt-30 text-lg">
          <div className="ml-3 text-red flex items-center">
            <span className="ml-1 animate-blink">● LIVE 퀴즈</span>
          </div>
          <p className="mr-3">{currentTime}</p>
        </div>

        <div className="flex items-center w-full h-[50px] mx-auto bg-blue rounded-md overflow-hidden">
          <div className="px-3 text-white text-xl mx-auto marquee">
            <span>
              🔥 즐거움이 터지는 퀴즈팝 ! 🎉 운영자와 함께 즐기는 라이브 그림
              퀴즈로 즐거움과 마일리지 모두 얻어가세요 \(@^0^@)/ 🔥
            </span>
          </div>
        </div>
        <div className="flex  h- justify-between">
          <div className="flex w-2/3 justify-start  h-full">
            <CanvasComponent stompClient={stompClient} userRole={userRole} />
          </div>

          <div className="flex flex-col w-[33%] h-[668px] mt-2 bg-lightBlue rounded-xl p-2">
            <div className="flex-grow overflow-y-auto">
              {history.map((item, index) => (
                <div key={index} className="mx-auto w-[94%] mb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span
                        className={`font-extrabold ${
                          item.nickName === '공지' ? 'text-red' : 'text-black'
                        }`}
                      >
                        {item.nickName}
                      </span>
                      <span className="font-regular text-slate-300 ml-2 text-sm">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    {item.nickName !== '공지' && (
                      <button
                        onClick={() => handleReport(item.nickName)}
                        className="flex items-center mt-2 p-1 rounded mb-1"
                      >
                        🚨{' '}
                        <span className="text-red text-sm underline">신고</span>
                      </button>
                    )}
                  </div>
                  <div
                    className={`flex items-center p-3  bg-white rounded-xl shadow${
                      item.nickName === '공지'
                        ? 'font-extrabold'
                        : 'font-regular'
                    }`}
                  >
                    {DOMPurify.sanitize(item.message)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="w-[94%] mx-auto">
              <div className="flex my-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={onChange}
                  placeholder="메시지 입력"
                  disabled={userStatus[nickName]?.isMuted}
                  className="w-[250px] px-2 rounded-md focus:ring-none focus:outline-none"
                />
                <button
                  type="submit"
                  className="ml-2 bg-blue p-2 rounded-md text-white"
                  disabled={userStatus[nickName]?.isMuted}
                >
                  보내기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-[420px] h-full">
        <div className="w-[420px] h-auto mt-[125px] ml-5 ">
          {userRole === 'ADMIN' && (
            <button
              type="button"
              className="w-[50%] flex justify-center items-center mb-2 text-lg h-[50px] rounded-2xl bg-blue text-white shadow-sm shadow-slate-600"
              onClick={submitAnswer}
            >
              문제 출제
            </button>
          )}
          <AdminModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={handleModalSubmit}
          />
        </div>

        <div className="w-[50%]  ml-5 flex flex-col text-center mr-52 bg-lightBlue px-3 py-5 rounded-xl shadow-md shadow-slate-300">
          <h1 className="w-full text-xl  font-extrabold mb-2">
            🎉 정답자 명단 🎉
          </h1>
          <ul className="text-lg my-1">
            {correctAnsweredUsers.map((user, index) => (
              <li key={index}>✅ {user}</li>
            ))}
          </ul>
          <hr className="w-2/3  my-5 mx-auto" />
          <p>
            남은 정답자 수:{' '}
            <span className="text-xl font-extrabold">
              <span className="text-blue">{remainingWinners}</span>
            </span>
          </p>
          <p>
            정답의 글자 수:{' '}
            <span className="text-xl font-extrabold">
              <span className="text-blue">{answerLength}</span>
            </span>
          </p>
          <p>
            마일리지 포인트:{' '}
            <span className="text-xl font-extrabold">
              <span className="text-blue">{mileagePoint}</span>
            </span>
          </p>
        </div>
        <h3 className="w-full pt-[132px] text-xl text-center"></h3>
      </div>
    </div>
  );
};

export default LiveQuizComp;
