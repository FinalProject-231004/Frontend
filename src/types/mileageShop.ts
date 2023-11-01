export type gifticonList = {
  msg:string,
  data: {
    id: number,
    image: string,
    itemName: string,
    price: number,
    category: string,
  }[]
};

export type gifticonListProps = {
  image: string;
  itemName: string;
  price: number;
  itemId: number;
};

export type orderItemInfo = {
  itemId: number,
  quantity: number,
  email: string,
}

export type orderModalProps = {
  itemId: number;
  itemName: string;
  price: number;
  isOpen: boolean;
  close: ()=>void;
}