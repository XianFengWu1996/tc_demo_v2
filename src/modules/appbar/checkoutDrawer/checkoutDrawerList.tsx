import { Card, CardContent, Divider, IconButton, List, styled, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { GoFlame } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { removeById } from "../../../store/slicer/cartSlicer";
import { DrawerQuantity } from "../../menu/menuItem/quantity";

export const CartDrawerList = () => {
    const cartState = useAppSelector(state => state.cart);
    return <List sx={{ pb: 10,backgroundColor: 'background.default'}}>
        {
            cartState.cart.map((item) => {
                return <CartDrawerItem key={item.itemDetails.id} item={item} />
            })
        }
    </List>
}

interface ICartDrawerItemProps {
    item: ICartItem
}

const PriceText = styled(Typography)(() => ({
    fontSize: '13px',
    margin: '2px 0',
    fontWeight: 'bold'
}))

export const CartDrawerItem = (props: ICartDrawerItemProps) => {
    const { item } = props;
    let { itemDetails, comments, total } = item;
    const dispatch = useAppDispatch();

    return <Card sx={{ margin: '15px'}}>
        <CardContent sx={{ display: 'flex', width: '100%', paddingBottom: '7px!important', bgcolor: 'white', border: '1px solid #C1C1C1', borderRadius: 1}}>
            <div style={{ display: 'flex', flexDirection: 'column', width: 'inherit' }}>
                <div style={{ display: 'flex'}}>
                    <MenuImage pic_url={itemDetails.pic_url} name={itemDetails.en_name}/>
                   
                    <div>
                        <Typography sx={{ fontSize: '13px'}}>{itemDetails.label_id}. {itemDetails.en_name} {itemDetails.ch_name}</Typography>               
                        {   comments &&  <Typography sx={{ color: red[400],fontSize: '11px'}}>Comments: {comments}</Typography> }
                        <ChoiceDisplay item={item}/>
                        <PriceText>${total.toFixed(2)}</PriceText>
                    </div>

                  
                </div>
                <Divider />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    
                    <DrawerQuantity item={item} />
                    <IconButton onClick={() => dispatch(removeById({ item }))}>
                        <FaTrash size={18} color={'red'}/>
                    </IconButton>
                </div>
            </div>
        </CardContent>
    </Card>
}




interface IMenuImage {
    pic_url: string, 
    name: string,
}

const MenuImage = (props: IMenuImage) => {
    return  <div style={{ paddingRight: '10px'}}>
        {
            props.pic_url && <Image
                src={props.pic_url}
                alt={`Picture of ${props.name}`}
                height={50}
                width={50}
            />
        }
    </div>
}

interface IChoiceDisplay {
    item: ICartItem
}
const ChoiceDisplay = (props:IChoiceDisplay) => {
    return  <div style={{ margin: '3px 15px'}}>
    {
        props.item.selectedChoices.map((choice) => {
            return <div key={choice.id}>
                <Typography sx={{ fontSize: 10, fontStyle: 'italic'}}>{choice.en_choice} {choice.ch_choice}</Typography>
                {
                    choice.selectedOption.map((option) => {
                        return <Typography key={option.id} sx={{ ml: 2, fontSize: 8}}> - {option.en_option} {option.ch_option} +${option.price.toFixed(2)} {option.spicy && <GoFlame color='red' />}</Typography>
                    })
                }
            </div>
        })
    }
</div>
}