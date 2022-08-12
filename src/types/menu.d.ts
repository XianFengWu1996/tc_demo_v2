interface IMenu {
    id: string,
    en_name: string,
    ch_name: string,
    document_name: string,
    category: ICategory[]
}

interface ICategory {
    id: string,
    en_name: string,
    ch_name: string,
    document_name: string,
    order: number,
    dishes: IDish[],
}

interface IDish {
    id: string,
    en_name: string,
    ch_name: string,
    is_spicy:boolean,
    is_popular: boolean,
    is_customizable: boolean,
    is_lunch: boolean,
    in_stock: boolean,
    price: number,
    description: string,
    label_id: string,
    order: number,
    pic_url:string,
    choices: IChoice[],
    additional_info: {
        menu: string,
        category: string,
    }
}

interface IChoice{
    id: string,
    en_choice: string,
    ch_choice: string,
    required: boolean,
    min: number,
    max: number
    options: IOption[]
}

interface IOption {
    id: string,
    en_option: string,
    ch_option: string,
    price: number,
    spicy: boolean,
}

interface ISelectedChoice {
    id: string,
    en_choice: string,
    ch_choice: string,
    required: boolean,
    selectedOption: IOption[]
}