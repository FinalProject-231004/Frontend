import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { quizAtom } from '@/recoil/atoms/quizAtom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useModalState } from '@/hooks';
import {
  CustomQuizInput,
  ImageUploader,
  CategoryButton,
  WarningModal,
  BottomLongButton,
} from '..';

const CreateQuizGroup: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quiz, setQuiz] = useRecoilState(quizAtom);
  const warningModal = useModalState();

  // 이미지> string으로 변환버전
  const handleImageUpload = async (file: File) => {
    setQuiz({
      ...quiz,
      image: { file, preview: URL.createObjectURL(file) },
    });
    toast.success(' 이미지 업로드 성공 ! 😎');
  };

  // 퀴즈 정보를 JSON으로 변환하여 formData에 추가
  const requestDto = {
    title: quiz.title || '',
    category: selectedCategory || '',
    content: quiz.content || '',
  };
  const blob = new Blob([JSON.stringify(requestDto)], {
    type: 'application/json',
  });

  // 퀴즈 정보를 서버에 전송하는 함수
  const submitQuiz = async () => {
    try {
      const formData = new FormData();

      // 이미지 파일이 있으면 formData에 추가
      if (quiz.image && quiz.image.file) {
        formData.append('image', quiz.image.file);
        formData.append('requestDto', blob);
      }

      // localStorage에서 토큰 가져오기
      const token = localStorage.getItem('Authorization');

      if (!token) {
        toast.error('로그인이 필요합니다.');
        return;
      }

      // 요청 전송
      const response = await axios.post(
        `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const quizId = response.data.data.id;
      navigate(`/create-quiz/questions/${quizId}`);
    } catch (error) {
      toast.error('퀴즈 생성에 실패했어요. 😱 다시 시도해 주세요.');
      if (axios.isAxiosError(error)) {
        console.error(
          '퀴즈 생성에 실패했습니다:',
          error.response?.data || error.message,
        );
      } else {
        console.error('퀴즈 생성에 실패했습니다:', error);
      }
    }
  };

  // '세부 질문 만들기' 버튼 클릭 시 호출되는 함수
  const handleNavigation = async () => {
    if (
      !quiz.title?.trim() ||
      !quiz.content?.trim() ||
      !selectedCategory ||
      !quiz.image?.preview
    ) {
      warningModal.open();
    } else {
      await submitQuiz();
    }
  };

  const handleImageRemove = () => {
    setQuiz({ ...quiz, image: null });
    toast.error(' 이미지를 삭제했어요 ! 🧺');
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuiz({
      ...quiz,
      title: event.target.value,
    });
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setQuiz({
      ...quiz,
      content: event.target.value,
    });
  };

  return (
    <div className="w-full text-blue text-xl">
      <CustomQuizInput
        title="퀴즈명"
        placeholder="퀴즈명을 입력해 주세요"
        value={quiz.title || ''}
        onChange={handleTitleChange}
      />

      <div className="mb-[20px]">
        <h3 className="mb-[15px] font-extrabold">퀴즈 소개글</h3>
        <textarea
          className="w-full h-[114px] customborder"
          placeholder="퀴즈를 소개하는 글을 써주세요"
          value={quiz.content || ''}
          onChange={handleContentChange}
        />
      </div>

      <CategoryButton
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

      <div className="w-full flex mb-[20px] justify-end">
        <ImageUploader
          id="quiz-image"
          image={quiz.image}
          uploadImage={handleImageUpload}
          removeImage={handleImageRemove}
        />
      </div>
      <div className="w-full h-[400px] mx-auto mt-[10px] mb-[135px] border-dotted border-4 border-blue rounded-2xl bg-contain bg-center bg-no-repeat flex justify-center items-center">
        {quiz.image?.preview ? (
          <div
            className="w-full h-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${quiz.image.preview})` }}
          ></div>
        ) : (
          <span className="text-slate-200 text-lg">
            썸네일 이미지를 첨부해 주세요!
          </span>
        )}
      </div>

      <WarningModal
        isOpen={warningModal.isOpen}
        onRequestClose={warningModal.close}
        title="⚠"
        message="공백이나, 체크하지 않은 선택지가 있어요!"
        buttons={<button onClick={warningModal.close}>닫기</button>}
      />
      <BottomLongButton onClick={handleNavigation}>
        세부 질문 만들기
      </BottomLongButton>
    </div>
  );
};

export default CreateQuizGroup;
