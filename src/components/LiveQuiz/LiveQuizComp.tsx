import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Client, Stomp } from '@stomp/stompjs';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userNickNameState, userRoleState } from '@/recoil/atoms/userInfoAtom';
import { usersState } from '@/recoil/atoms/userStateAtom';
import { CanvasComponent } from '..';
import axios from 'axios';
import AdminModal from './AdminModal';
import { AdminModalProps } from './AdminModal';

type ChatMessage = {
  type: string;
  username: string;
  timestamp: string;
  message: string;
  nickName: string;
};

const LiveQuizComp: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState('');
  const setUsers = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);
  const nickName = useRecoilValue(userNickNameState);
  const [isMuted, setIsMuted] = useState(false);
  const muteTimerRef = useRef<NodeJS.Timeout | null>(null);
  const userRole = useRecoilValue(userRoleState);
  const setUserRole = useSetRecoilState(userRoleState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
          // 웹소켓 연결이 성공한 후 사용자 목록을 가져오는 로직
          try {
            const response = await axios.get(
              `${
                import.meta.env.VITE_APP_GENERATED_SERVER_URL
              }/api/quiz/liveQuizUsers`,
            );
            setUsers(response.data);

            // 관리자 여부 확인
            const adminResponse = await axios.get(
              `${
                import.meta.env.VITE_APP_GENERATED_SERVER_URL
              }/api/member/admin/check`,
              { headers: { Authorization: token } },
            );

            console.log(adminResponse.data.msg);

            if (adminResponse.data.msg === 'ADMIN') {
              setUserRole('ADMIN');
            } else {
              setUserRole('USER');
            }
          } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('유저 목록을 불러오는데 실패하였습니다.');
          }

          // 사용자 목록을 구독합니다.
          newStompClient.subscribe('/topic/users', message => {
            const userList = JSON.parse(message.body);
            setUsers(userList);
          });

          // 채팅 메시지를 구독합니다.
          newStompClient.subscribe('/topic/liveChatRoom', message => {
            const chatMessage = JSON.parse(message.body);

            if (chatMessage.type === 'ERROR') {
              if (chatMessage.message === '도배 금지!') {
                toast.error('도배로 인해 30초동안 채팅이 금지됩니다.');
                // 사용자를 30초 동안 금지합니다.
                setIsMuted(true);
                // 기존 타이머가 있다면 클리어합니다.
                if (muteTimerRef.current) {
                  clearTimeout(muteTimerRef.current);
                }
                // 30초 후에 금지를 해제하는 타이머를 설정합니다.
                muteTimerRef.current = setTimeout(() => {
                  setIsMuted(false);
                }, 30000);
              } else if (chatMessage.message === '차단된 유저입니다.') {
                toast.error('차단된 유저는 글을 작성할 수 없습니다.');
                // 여기에 차단된 유저에 대한 추가적인 처리를 할 수 있습니다.
              }
            } else {
              setHistory(prevHistory => [...prevHistory, chatMessage]);
            }
          });

          // 에러 메시지를 받을 엔드포인트를 구독합니다.
          newStompClient.subscribe('/user/queue/errors', message => {
            const errorResponse = JSON.parse(message.body);
            // 에러 처리 로직
            if (errorResponse.type === 'ERROR') {
              // 토스트 메시지로 사용자에게 에러를 알립니다.
              toast.error(errorResponse.message);

              // 사용자를 금지 상태로 설정
              setIsMuted(true);

              // 30초 후에 금지 상태를 해제합니다.
              setTimeout(() => setIsMuted(false), 30000);
            }
          });

          setStompClient(newStompClient);
        },
        (error: unknown) => {
          console.error('Connection error:', error);
          toast.error('웹소켓 연결에 실패했습니다.');
        },
      );
    };

    // 웹소켓 연결 해제 함수
    const disconnectWebSocket = () => {
      newStompClient.disconnect(() => {
        console.log('Disconnected from WebSocket.');
      });
    };

    connectWebSocket();

    // 웹소켓 연결을 해제하는 클린업 함수
    return () => {
      disconnectWebSocket();
    };
  }, [setUsers, setHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // 메시지 전송 로직 수정
  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 사용자가 금지 상태일 때는 메시지를 전송하지 않습니다.
    if (isMuted) {
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
        }/api/quiz/liveSubmitAnswer`,
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
      // 여기에 성공시 추가로 실행할 로직을 작성하십시오.
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

  // 신고 핸들러 함수
  const handleReport = async (nickName: string) => {
    console.log(nickName);
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
        {}, // POST 요청이므로, 필요한 경우 여기에 추가 데이터를 전달할 수 있습니다.
        { headers: { Authorization: token } },
      );

      // 신고가 성공적으로 처리되었을 때의 로직
      toast.success(`'${nickName}' 사용자가 신고되었습니다.`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // 서버에서 전달된 오류 메시지를 사용
        const errorMessage =
          error.response.data.message ||
          error.response.data.msg ||
          '신고 처리 중 오류가 발생했습니다.';
        toast.error(errorMessage);
      } else {
        // 서버로부터의 응답이 없는 경우 일반 오류 메시지를 사용
        toast.error('신고 처리 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex h-full justify-center mx-auto">
      <div className="w-[420px] h-full">
        <h3 className="w-full pt-[132px] text-2xl text-center font-extrabold mb-2">
          접속유저 목록
        </h3>
        <ul className="w-full text-center">
          {users.map((user: string, index: number) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>

      <div>
        <div className="w-[1080px] h-full">
          <h1 className="pt-[132px] mb-[42px] text-[28px] text-center text-blue font-extrabold">
            라이브 퀴즈
          </h1>

          {userRole === 'ADMIN' && (
            <button
              type="button"
              className="flex justify-center items-center mb-5 w-[150px] h-[50px] rounded-2xl bg-blue text-white"
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

          <div className="flex justify-between">
            <p className="ml-3 text-base text-red font-extrabold">● LIVE</p>
            <p className="mr-3 text-base text-red font-extrabold">
              {currentTime}
            </p>
          </div>
          <div className="flex items-center w-full h-[50px] mx-auto bg-blue rounded-md overflow-hidden">
            <div className="px-3 text-white text-xl mx-auto marquee">
              <span>
                퀴즈팝 방송중임 라이브 방송중임 🔥 전민지 바보 노시오패스 바보
                김곡갱 바보 양씨 백씨 다 바보 🔥 두팔이 귀여워 🔥
              </span>
            </div>
          </div>
          <div className="flex w-full h-[790px] justify-between">
            <div className="flex w-2/3 justify-center items-center h-full">
              <CanvasComponent />
            </div>

            <div className="flex flex-col w-1/3 h-full justify-between py-5 items-center bg-slate-100">
              <div className="overflow-y-auto mb-5">
                {history.map((item, index) => (
                  <div key={index} className="mt-3 flex justify-between">
                    <div>
                      <strong
                        style={
                          item.nickName === '공지'
                            ? { color: 'red', fontWeight: 'bold' }
                            : {}
                        }
                      >
                        {item.nickName}
                      </strong>{' '}
                      ({new Date(item.timestamp).toLocaleTimeString()}):{' '}
                      {item.message}
                    </div>
                    {item.nickName !== '공지' && (
                      <button
                        onClick={() => handleReport(item.nickName)}
                        className="ml-2 p-1 bg-red-500 text-white rounded"
                      >
                        신고하기
                      </button>
                    )}
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={sendMessage}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={onChange}
                  placeholder="메시지 입력"
                  disabled={isMuted} // 사용자가 금지 상태일 때 입력을 비활성화합니다.
                />
                <button
                  type="submit"
                  className="ml-2 bg-blue p-2 rounded-md"
                  disabled={isMuted}
                >
                  보내기
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[420px] h-full">
        <h3 className="w-full pt-[132px] text-xl text-center">dd</h3>
      </div>
    </div>
  );
};

export default LiveQuizComp;
