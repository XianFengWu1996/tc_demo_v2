interface ICartItem {
  itemDetails: IDish;
  comments: string;
  quantity: number;
  price: number;
  total: number;
  selectedChoices: ISelectedChoice[];
}
