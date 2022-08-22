import { Box, Button, ButtonGroup, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { AppBarNav } from "../../modules/appbar/appbar";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { changeDeliveryOption } from "../../store/slicer/cartSlicer";

export default function CheckoutPage () {
    const dispatch = useAppDispatch();
    const { delivery_option, cart, cartSummary } = useAppSelector(state => state.cart)

    return <>
        <AppBarNav />

        <Box sx={{ display: 'flex'}}>
            <Box sx={{ flex: 2.5, mx: 5, my: 2}}>
                <ButtonGroup fullWidth size="large">
                    <Button 
                        onClick={() =>  dispatch(changeDeliveryOption('pickup'))}
                        variant={delivery_option === 'pickup' ? 'contained' : 'outlined'}
                    >
                        <AiOutlineShopping size={22} />
                        <Typography sx={{ ml: 0.7}}>Pick up</Typography>
                    </Button>    
                    <Button 
                        onClick={() =>  dispatch(changeDeliveryOption('delivery'))}
                        variant={delivery_option === 'delivery' ? 'contained' : 'outlined'}
                    >
                        <MdOutlineDeliveryDining size={22} />
                        <Typography sx={{ ml: 0.7}}>Delivery</Typography>
                    </Button>
                </ButtonGroup>

                <Grid container spacing={2} direction='row' alignItems={'stretch'}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box sx={{ mt: 2, p: 2, border: '1.5px solid #000', borderRadius: 3, minWidth: '300px', maxWidth: '500px', minHeight: '100px'}}>
                            <Typography>Contact</Typography>
                            <Typography>Name: Xian Feng Wu</Typography>
                            <Typography>Phone: 917-578-1234</Typography>
                        </Box>
                    </Grid>
                   
                    <Grid item xs={12} sm={12} md={6}>
                        <Box sx={{ mt: 2, p: 2, border: '1.5px solid #000', borderRadius: 3, minWidth: '300px', maxWidth: '500px', minHeight: '100px'}}>
                            <Typography>Address</Typography>
                            <Typography>69 Harvard St Quincy, MA 02171</Typography>
                            <Typography>Business: Taipei Cuisine</Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2}} />

                <Grid container spacing={2} direction='row' alignItems={'stretch'}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Typography>Schedule Time</Typography>
                        <FormControl sx={{ width: '100px', mt: 1, mr:0.5}}>
                            <InputLabel id="demo-simple-select-label">Hour</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                value={0}
                                label="Hour"
                                onChange={() => {}}
                            >
                                <MenuItem value={10}>11</MenuItem>
                                <MenuItem value={20}>12</MenuItem>
                                <MenuItem value={30}>13</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: '130px', mt: 1}}>
                            <InputLabel id="demo-simple-select-label">Minute</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                value={0}
                                label="Minute"
                                onChange={() => {}}
                            >
                                <MenuItem value={10}>00</MenuItem>
                                <MenuItem value={20}>05</MenuItem>
                                <MenuItem value={30}>10</MenuItem>
                                <MenuItem value={30}>15</MenuItem>
                                <MenuItem value={30}>20</MenuItem>
                            </Select>
                        </FormControl>


                    </Grid>
                   
                    <Grid item xs={12} sm={12} md={6}>
                        <Typography>Redemption</Typography>
                        <TextField id="redemption-input" variant="outlined" size="small" label={'Points Available: 3500'} sx={{ my: 0.5, width: '300px'}}/>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2}} />

             
                <TextField 
                    id="r" 
                    variant="outlined" 
                    multiline
                    minRows={4}
                    fullWidth
                    label={'Delivery notes, ex. leave at porch, call upon delivery, etc..'} 
                    sx={{ display: 'block', my: 2}}
                />

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
                                        </div>
                                    </CardContent>
                                </Card>
                            </Box>
                        })
                    }
                </div>

                <div style={{ backgroundColor: '#fff', minWidth: '300px',height:'200px', borderTop: '1px solid #000', padding: 10}}>
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