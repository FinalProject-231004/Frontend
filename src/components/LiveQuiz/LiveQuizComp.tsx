import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Client, Stomp } from '@stomp/stompjs';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userNickNameState } from '@/recoil/atoms/userInfoAtom';
import { usersState } from '@/recoil/atoms/userStateAtom';
import { CanvasComponent } from '..';
import axios from 'axios';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz/liveQuizUsers`);
  //       setUsers(response.data);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //       toast.error('유저목록을 불러오는데 실패하였습니다 😔.');
  //     }
  //   };

  //   fetchUsers();
  // }, [setUsers]);

  // 웹소켓 연결 및 연결 해제 로직을 포함하는 useEffect
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
            setHistory(prevHistory => [...prevHistory, chatMessage]);
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

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputMessage.trim() && stompClient) {
      stompClient.publish({
        destination: '/app/liveChatRoom',
        body: JSON.stringify({ message: inputMessage, nickName: nickName }),
      });
      setInputMessage('');
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.currentTarget.value);
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
                  <div key={index} className="mt-3">
                    <div>
                      <strong>{item.nickName}</strong> (
                      {new Date(item.timestamp).toLocaleString()}):{' '}
                      {item.message}
                    </div>
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
                />
                <button type="submit" className="ml-2 bg-blue p-2 rounded-md">
                  보내기
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[420px] h-full">
        <h3 className="w-full pt-[132px] text-xl text-center"></h3>
      </div>
    </div>
  );
};

export default LiveQuizComp;
