// import axios from 'axios';
import { getAPI, postAPI } from './axios';

export default function Test() {
  const info = {
    id: 1,
    content: "string"
  }

  const postTest =async () => {
    console.log(111111111);
    try {
      const response = await getAPI(`/api/quiz/1`);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <button onClick={postTest}>테스트 버튼</button>
    </>
  )
}
