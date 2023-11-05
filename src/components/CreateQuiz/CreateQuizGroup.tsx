import React, { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const warningModal = useModalState();

  const handleImageUpload = async (file: File) => {
    setQuiz({
      ...quiz,
      image: { file, preview: URL.createObjectURL(file) },
    });
    toast.success(' 이미지 업로드 성공 ! 😎');
  };

  const requestDto = {
    title: quiz.title || '',
    category: selectedCategory || '',
    content: quiz.content || '',
  };
  const blob = new Blob([JSON.stringify(requestDto)], {
    type: 'application/json',
  });

  const submitQuiz = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      if (quiz.image && quiz.image.file) {
        formData.append('image', quiz.image.file);
        formData.append('requestDto', blob);
      }

      const token = localStorage.getItem('Authorization');
      if (!token) {
        toast.error('로그인이 필요합니다.');
        setIsLoading(false);
        return;
      }

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

      setQuiz({
        title: '',
        content: '',
        category: '',
        image: null,
      });

      const quizId = response.data.data.id;
      navigate(`/create-quiz/questions/${quizId}`);
    } catch (error) {
      toast.error('퀴즈 생성에 실패했어요. 😱 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      setQuiz({
        title: '',
        content: '',
        category: '',
        image: null,
      });
    };
  }, []);

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

  const handleTitleChange = (newValue: string) => {
    setQuiz({
      ...quiz,
      title: newValue,
    });
  };

  const handleContentChange = (newValue: string) => {
    setQuiz({
      ...quiz,
      content: newValue,
    });
  };

  return (
    <div className="w-screen">
      <div className="w-[720px] mx-auto text-blue text-xl">
        <p className="hidden justify-end text-slate-300 underline text-sm cursor-pointer">
          퀴즈 제작 튜토리얼 🔍
        </p>
        <CustomQuizInput
          title="퀴즈명"
          placeholder="퀴즈명을 입력해 주세요"
          value={quiz.title || ''}
          onChange={handleTitleChange}
          inputType="input"
          maxLength={64}
        />
        <CustomQuizInput
          title="퀴즈 소개글"
          placeholder="퀴즈를 소개하는 글을 써주세요"
          value={quiz.content || ''}
          onChange={handleContentChange}
          inputType="textarea"
          maxLength={250}
        />

        <CategoryButton
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
        />

        <div className="flex mb-[20px] justify-end">
          <ImageUploader
            id="quiz-image"
            image={quiz.image}
            uploadImage={handleImageUpload}
            removeImage={handleImageRemove}
          />
        </div>
        <div className="w-full h-[450px] mx-auto mt-[10px] mb-[110px] border-dotted border-4 border-blue rounded-2xl bg-contain bg-center bg-no-repeat flex justify-center items-center">
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
          title="🚨"
          message="비어있는 항목 또는 체크하지 않은 선택지가 있어요!"
          button={
            <div
              onClick={warningModal.close}
              className="flex justify-center items-center w-20 bg-blue text-white rounded-md py-2"
            >
              닫기
            </div>
          }
        />
      </div>
      <BottomLongButton onClick={handleNavigation} disabled={isLoading}>
        {isLoading ? '제출 중...' : '세부 질문 만들기'}
      </BottomLongButton>
    </div>
  );
};

export default CreateQuizGroup;
