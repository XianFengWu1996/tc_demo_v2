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
    variant: IVariant[],
    description: string,
    label_id: string,
    order: number,
    pic_url:string,
    additional_info: {
        menu: string,
        category: string,
    }
}

interface IVariant{
    id: string,
    en_name: string,
    ch_name:string,
    options: IVariantOption[],
}

interface IVariantOption {
    id: string,
    en_name: string,
    ch_name:string,
    price: number,
    spicy: boolean,
}