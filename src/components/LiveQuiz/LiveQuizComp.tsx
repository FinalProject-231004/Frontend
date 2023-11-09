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
    setCurrentTime(new Date().toLocaleString());

    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const showGreeting = (data: ChatMessage) => {
    const { username, timestamp, message } = data;
    console.log(timestamp, message, username);

    // 새 메시지를 history에 추가
    setHistory(prevHistory => [...prevHistory, data]);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_GENERATED_SERVER_URL
        }/api/Quiz/liveQuizUsers`,
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // toast.error('유저목록을 불러오는데 실패하였습니다 😔.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const connectWebSocket = () => {
    try {
      const token = localStorage.getItem('Authorization');
      if (!token) {
        toast.error('로그인이 필요합니다.');
        return;
      }

      const socket = new WebSocket(
        `${import.meta.env.VITE_APP_WS_SERVER_URL}/ws`,
      );
      const newStompClient = Stomp.over(() => socket);

      // 연결 설정 시 헤더에 토큰 추가
      const headers = {
        Authorization: `${token}`,
      };

      newStompClient.connect(headers, () => {
        console.log('웹소켓 연결 성공!😎');
        // 라이브 퀴즈 채팅방 구독
        newStompClient.subscribe('/topic/liveChatRoom', liveChat => {
          const message = JSON.parse(liveChat.body);
          showGreeting(message);
          console.log('Received message: ', message);
        });
        // '/topic/users' 구독 - 접속자 목록을 받아옵니다.
        newStompClient.subscribe('/topic/users', usersMessage => {
          const receivedUserList = JSON.parse(usersMessage.body);
          setUsers(receivedUserList);
          console.log(receivedUserList);
        });

        // 초기 사용자 목록을 요청합니다.
        // console.log('유저 목록 요청 전송 전');
        // newStompClient.send('/app/users.request', {}, '');
        // console.log('유저 목록 요청 전송 후');

        setStompClient(newStompClient);
      });
    } catch (error) {
      console.error('웹소켓 연결 오류: ', error);
      toast.error('채팅방 입장에 실패했어요. 😱 다시 시도해 주세요.');
    }
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputMessage.trim() || !stompClient) {
      return;
    }

    try {
      if (inputMessage.trim() && stompClient) {
        nickName;
        stompClient.publish({
          destination: '/app/liveChatRoom',
          body: JSON.stringify({ message: inputMessage, nickName: nickName }),
        });
        setInputMessage('');
        console.log('메시지 전송: ', inputMessage);
      }
    } catch (error) {
      console.error('메시지 전송 오류: ', error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.currentTarget.value);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

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
