export type AdminModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    answer: string;
    numberOfPeople: number;
    mileage: number;
  }) => void;
};
