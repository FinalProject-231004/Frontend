const shareKakaoLink = userId => {
  window.Kakao.Link.createCustomButton({
    container: '#kakao-link-btn',
    templateId: 100262,
    templateArgs: {
      userId: `${userId}`,
    },
  });
};

const onShareKakaoClick = () => {
  shareKakaoLink(userId);
};
