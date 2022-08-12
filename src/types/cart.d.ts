interface ICartItem {
    itemDetails: IDish,
    comments: string,
    quantity: number,
    total: number,
    selectedChoices: ISelectedChoice[]
}