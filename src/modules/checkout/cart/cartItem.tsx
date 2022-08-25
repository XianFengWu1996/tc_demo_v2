import { Box, Card, CardContent, Typography } from "@mui/material"
import { GoFlame } from "react-icons/go";

interface ICartItemProps {
    item: ICartItem
}

export const CartItem = (props: ICartItemProps) => {
    const { item } = props;
    return  <Box sx={{ my: 1.5}}>
        <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center'}}>
                <Typography sx={{ mr: '15px', fontSize: '13px', fontWeight: 600}}>
                    x{item.quantity}
                </Typography>
                <div>
                    <Typography sx={{ fontSize: '13px'}}>{item.itemDetails.label_id}.{item.itemDetails.en_name} {item.itemDetails.ch_name}</Typography>
                    <Typography sx={{ fontSize: '13px'}}>Total: ${item.total}</Typography>

                    {
                        item.selectedChoices.map((choice) => {
                            return <>
                                <Typography sx={{ fontSize: 11}}>{choice.en_choice} {choice.ch_choice}</Typography>
                                {
                                    choice.selectedOption.map((option) => {
                                        return <Typography key={option.id} sx={{ fontSize: 10, pl: 2}}>
                                            - {option.en_option} {option.ch_option} +${option.price.toFixed(2)} {option.spicy && <GoFlame color="red" />}
                                            </Typography>
                                    })
                                }
                            </>
                        })
                    }
                </div>
            </CardContent>
        </Card>
</Box>
}