import { Card, CardContent, Divider, IconButton, Typography } from "@mui/material";
// import { decreaseQty, increaseQty, removeItemFromCart } from "../../../store/slice/cartSlice";
// import { useAppDispatch } from "../../../store/store";
// import { MenuPreviewImage } from "../../images";
// import { QuantityController } from "../../menu/publicMenuDialog/quantityController";
import { FiTrash2 } from 'react-icons/fi'
import { styled } from "@mui/system";
import { GoFlame } from "react-icons/go";
import { blue, red } from "@mui/material/colors";
import Image from "next/image";
import { DrawerQuantity, Quantity } from "../../menu/menuItem/quantity";
import { FaTrash } from "react-icons/fa";

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
    let { itemDetails, comments, quantity  } = item;
    // const dispatch = useAppDispatch();
    // const opt = item.lunchOption

    return <Card sx={{ margin: '15px'}}>
        <CardContent sx={{ display: 'flex', width: '100%', paddingBottom: '7px!important', bgcolor: 'white', border: '1px solid #C1C1C1', borderRadius: 1}}>
            <div style={{ display: 'flex', flexDirection: 'column', width: 'inherit' }}>
                <div style={{ display: 'flex'}}>
                    <div style={{ paddingRight: '10px'}}>
                        {
                            itemDetails.pic_url && <Image
                                src={itemDetails.pic_url}
                                alt={`Picture of ${itemDetails.en_name}`}
                                height={50}
                                width={50}
                            />
                        }
                    </div>
                    <div>
                        <Typography sx={{ fontSize: '13px'}}>{itemDetails.label_id}. {itemDetails.en_name} {itemDetails.ch_name}</Typography>               
                        {
                            comments &&  <Typography sx={{ color: red[400],fontSize: '11px'}}>Comments: {comments}</Typography> 
                        }
                        <PriceText>${itemDetails.price.toFixed(2)}</PriceText>
                    </div>

                  
                </div>
                <Divider />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    
                    <DrawerQuantity quantity={quantity} />
                    <IconButton>
                        <FaTrash size={18} color={'red'}/>
                    </IconButton>
                </div>
            </div>
        </CardContent>
    </Card>
}