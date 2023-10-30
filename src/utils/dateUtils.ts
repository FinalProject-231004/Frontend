export function getTime(postedDate: Date): string {
  const now = new Date();
  const differenceInMilliseconds = now.getTime() - postedDate.getTime();

  const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000);
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);

  if (differenceInDays > 0) {
    return `${differenceInDays}일 전`;
  } else if (differenceInHours > 0) {
    return `${differenceInHours % 24}시간 전`;
  } else {
    const roundedMinutes = Math.round(differenceInMinutes / 10) * 10;
    return `${roundedMinutes}분 전`;
  }
}
