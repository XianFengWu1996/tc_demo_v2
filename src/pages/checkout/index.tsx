import { Box, Button, ButtonGroup, Divider, Grid, TextField, Typography } from "@mui/material";
import { AiOutlineShopping } from "react-icons/ai";
import { IoCar } from "react-icons/io5";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { AppBarNav } from "../../modules/appbar/appbar";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { changeDeliveryOption } from "../../store/slicer/cartSlicer";

export default function CheckoutPage () {
    const dispatch = useAppDispatch();
    const { delivery_option } = useAppSelector(state => state.cart)

    return <>
        <AppBarNav />

        <Box sx={{ display: 'flex'}}>
            <Box sx={{ width: '75%', mx: 5, my: 2}}>
                <Typography>Checkout</Typography>
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
                    <Typography>Redemption</Typography>
                        <TextField id="redemption-input" variant="outlined" size="small" label={'Points Available: 3500'} sx={{ my: 0.5, width: '300px'}}/>


                        <Typography sx={{ mt: 1}}>Coupon</Typography>
                        <TextField id="redemption-input" variant="outlined" size="small" label={'Enter promo code'} sx={{ my: 0.5, width: '300px'}}/>
                    </Grid>
                   
                    <Grid item xs={12} sm={12} md={6}>
                        <Typography>Redemption</Typography>
                        <TextField id="redemption-input" variant="outlined" size="small" label={'Points Available: 3500'} sx={{ my: 0.5, width: '300px'}}/>


                        <Typography sx={{ mt: 1}}>Coupon</Typography>
                        <TextField id="redemption-input" variant="outlined" size="small" label={'Enter promo code'} sx={{ my: 0.5, width: '300px'}}/>
                    </Grid>
                </Grid>

             
                <TextField 
                    id="r" 
                    variant="outlined" 
                    multiline
                    minRows={4}
                    fullWidth
                    label={'Delivery notes, ex. leave at porch, call upon delivery, etc..'} 
                    sx={{ display: 'block', my: 2}}
                />

                <Button variant="contained">Continue to payment</Button>

            </Box>

            <Box sx={{width: '25%', height: 'calc(100vh - 64px)', backgroundColor: 'orange', overflow: 'scroll'}}>
                side cart
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis porro voluptatum error, saepe ut minima quibusdam aut officiis placeat et quis ipsam dicta magni illo accusamus labore fuga nihil eum.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur accusamus repudiandae, est voluptates, asperiores, sapiente illo eaque eum aliquam explicabo exercitationem recusandae laborum itaque cumque. Deleniti mollitia nihil laboriosam nulla.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque ea mollitia iusto accusantium, explicabo ut excepturi sapiente ipsa quasi sint perferendis quo distinctio ex itaque et, voluptatum, voluptates corporis obcaecati! Nostrum labore maxime impedit non eos sunt mollitia, sapiente quod, officiis magni porro natus, illo asperiores alias tempore quisquam eveniet blanditiis laboriosam cum? Minus labore suscipit libero autem expedita, in ad omnis facere blanditiis quos architecto, explicabo commodi distinctio, nam dicta dolor necessitatibus quidem! A officia, accusantium ex inventore atque enim consectetur possimus molestias explicabo doloribus at impedit iure odio tempora sapiente optio nesciunt eaque officiis, magnam beatae libero similique? Nam labore culpa ratione expedita eaque! Voluptate, perferendis harum. Natus quod, culpa deserunt voluptate quam dolorum soluta deleniti quasi aperiam, consequuntur, porro inventore nisi tenetur temporibus accusantium! Obcaecati fugiat voluptatum optio modi, dignissimos fugit minima eveniet commodi officia aperiam id sit quas sapiente deleniti, consequatur odit perspiciatis eius recusandae illo amet, vero tempore. Esse quae illo tempore consectetur doloremque ipsam vitae nesciunt cum dolorem officia sed voluptas porro ea unde quos aperiam reiciendis, ut magni quis rerum enim aut, iusto nisi? Similique, culpa eligendi eius odit rerum et expedita cupiditate libero aliquam. Iste, ipsam praesentium laboriosam eveniet voluptatibus dicta aut minima cum harum illo sit perspiciatis nesciunt pariatur nemo accusamus vero molestiae accusantium ipsa facilis quam ratione culpa, nisi ducimus. Facere non quos aperiam maxime aliquam rem quis nostrum quae, voluptate quidem. Vitae, facilis pariatur perspiciatis illum eius rerum vel minus tempora magnam at et praesentium suscipit saepe nam modi quam nesciunt! Sapiente ipsam voluptatibus impedit mollitia repellat, cupiditate dolorum a esse itaque quia incidunt iste vero fugit atque. Aut possimus deleniti voluptates animi aliquid minus necessitatibus non laboriosam corrupti ab, minima autem dolore quod aperiam recusandae quia mollitia maxime ipsa harum magni ipsam voluptatibus earum? Illum assumenda, laudantium id exercitationem incidunt quia necessitatibus numquam pariatur saepe, ad, minus ex distinctio accusamus nulla? Dolore totam, quibusdam quod, libero vero ipsum doloremque at praesentium sint, assumenda cum iure illum inventore dicta. Harum reprehenderit, voluptatum illum expedita velit suscipit perspiciatis ut quam ipsam, fugiat quis quidem assumenda odio praesentium aliquid, perferendis sapiente iste quisquam quibusdam error! Est optio, modi molestiae officiis ipsam doloribus facilis tempore illo minus ipsum, dolorum magni numquam neque error voluptatum! Obcaecati neque ipsum blanditiis consectetur adipisci facilis voluptatibus quasi aut dignissimos harum, exercitationem voluptatem dolores, magnam vero amet possimus? Velit, ipsam ut vel aliquam reiciendis omnis, rem facilis hic consectetur quam, atque officia aut quas exercitationem. Nesciunt voluptates vero magnam velit iusto quia aliquid ullam molestias officiis voluptatem ratione maxime quis iste, voluptas eligendi! Perspiciatis odit earum pariatur iusto reprehenderit! Harum consequatur fugiat deleniti, dolores voluptatum dicta minima perspiciatis totam libero illo adipisci voluptate eius ea quia repellendus consectetur a? Libero incidunt, atque maiores ipsam necessitatibus dolorum aliquam amet inventore aliquid eum et, dolores dignissimos, doloribus hic iure explicabo? Deserunt vel beatae delectus neque quasi ab soluta, eius expedita. Dolorem quasi accusantium consequatur eos unde cupiditate, fugiat magnam esse molestias, illo animi placeat, velit sint quia! Amet, consequuntur.
            </Box>
        </Box>
    </>
}