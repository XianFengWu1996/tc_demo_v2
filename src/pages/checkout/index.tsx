import { Box, Button, ButtonGroup, Card, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AiOutlineCreditCard } from "react-icons/ai";
import { GoFlame } from "react-icons/go";
import {  MdOutlineStoreMallDirectory } from "react-icons/md";
import { AppBarNav } from "../../modules/appbar/appbar";
import { AddressContact, CustomerContact } from "../../modules/checkout/contact";
import { DeliveryNotes } from "../../modules/checkout/deliveryNote";
import { DeliveryOption } from "../../modules/checkout/deliveryOption";
import { PaymentOptions } from "../../modules/checkout/paymentOptions";
import { Redemption } from "../../modules/checkout/redemption";
import { Schedule } from "../../modules/checkout/schedule";
import {  useAppSelector } from "../../store/hook";

export default function CheckoutPage () {
    const { cart, cartSummary } = useAppSelector(state => state.cart)

    return <>
        <AppBarNav />

        <Box sx={{ display: 'flex'}}>
            <Box sx={{ flex: 2.5, mx: 5, my: 3}}>
                <DeliveryOption />

                <Grid container spacing={2} direction='row' alignItems={'stretch'}>
                    <CustomerContact />
                    <AddressContact />
                </Grid>

                <Divider sx={{ my: 2}} />

                <Grid container spacing={2} direction='row' alignItems={'stretch'}>
                    <Schedule />
                    <Redemption />
                </Grid>

                <Divider sx={{ my: 2}} />

                <DeliveryNotes />

                <PaymentOptions />

                <Button variant="contained" fullWidth>Continue to payment</Button>

            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: 'calc(100vh - 64px)', borderLeft: '1.5px solid #000'}}>
                <div style={{ overflow: 'scroll', height: 'inherit', padding: '10px'}}>
                    <Typography>Cart</Typography>
                    
                    {
                        cart.map((item) => {
                            return <Box key={item.itemDetails.id} sx={{ my: 1.5}}>
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
                        })
                    }
                </div>

                <div style={{ backgroundColor: '#fff', minWidth: '300px',height:'200px', borderBlock: '1px solid #000', padding: 10}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize:14, fontWeight: 600}}>Lunch:</Typography>
                        <Typography sx={{ color: 'green', fontSize: 14, fontWeight: 600}}>-(${cartSummary.discount.lunch.toFixed(2)})</Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize:14, fontWeight: 600}}>Redemption:</Typography>
                        <Typography sx={{ color: 'green', fontSize: 14, fontWeight: 600}}>-(${cartSummary.discount.redemption.toFixed(2)})</Typography>
                    </div>
                    <Divider /> 

                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize:14, fontWeight: 600}}>Subtotal:</Typography>
                        <Typography sx={{ fontSize:14, fontWeight: 600}}>${cartSummary.subtotal.toFixed(2)}</Typography>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize:14, fontWeight: 600}}>Tax:</Typography>
                        <Typography sx={{ fontSize:14, fontWeight: 600}}>${cartSummary.tax.toFixed(2)}</Typography>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize:14, fontWeight: 600}}>Delivery Fee:</Typography>
                        <Typography sx={{ fontSize:14, fontWeight: 600}}>${cartSummary.delivery_fee.toFixed(2)}</Typography>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize:14, fontWeight: 600}}>Total:</Typography>
                        <Typography sx={{ fontSize:14, fontWeight: 600}}>${cartSummary.total.toFixed(2)}</Typography>
                    </div>
               
                </div>
            </Box>
        </Box>
    </>
}