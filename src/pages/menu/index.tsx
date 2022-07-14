import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Toolbar, Typography, useTheme } from "@mui/material"
import { styled } from "@mui/system"
import { AiOutlineShoppingCart } from "react-icons/ai";
import MenuIcon from '@mui/icons-material/Menu';
import {GoFlame} from 'react-icons/go'
import BlackLogo from '../../../public/assets/images/blacklogo.png'
import WhiteLogo from '../../../public/assets/images/whitelogo.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Image from "next/image";
import { v4 } from "uuid";



function MenuPage() {
    const temp_data = [
        {
            name: 'A1. 凉拌海蜇 Chilled Jelly Fish', 
            price: 13.95,
            image: 'https://firebasestorage.googleapis.com/v0/b/taipeicuisine_menu/o/pexels-cats-coming-1098545.jpg?alt=media&token=cd32f080-9a2b-4745-b2a1-f3fac10c4c76',
            favorite: false,
        },
        {
            name: 'A2. 台湾牛肉面 Spicy Beef Noodle Soup', 
            price: 13.95,
            image: 'https://firebasestorage.googleapis.com/v0/b/taipeicuisine_menu/o/pexels-cats-coming-1731535.jpg?alt=media&token=552753b8-0425-4744-ba6e-0370cccb04b6',
            favorite: true,
        },
        {
            name: 'A3. 左宗鸡 General Gau Chicken', 
            price: 13.95,
            image: 'https://firebasestorage.googleapis.com/v0/b/taipeicuisine_menu/o/pexels-polina-tankilevitch-5848525.jpg?alt=media&token=739b0872-cbc5-4c91-a831-3f5256074d67',
            favorite: false,
        },
        {
            name: 'A2. 台湾牛肉面 Spicy Beef Noodle Soup', 
            price: 13.95,
            image: 'https://firebasestorage.googleapis.com/v0/b/taipeicuisine_menu/o/pexels-cats-coming-1731535.jpg?alt=media&token=552753b8-0425-4744-ba6e-0370cccb04b6',
            favorite: false,
        },
        {
            name: 'A1. 凉拌海蜇 Chilled Jelly Fish', 
            price: 13.95,
            image: 'https://firebasestorage.googleapis.com/v0/b/taipeicuisine_menu/o/pexels-cats-coming-1098545.jpg?alt=media&token=cd32f080-9a2b-4745-b2a1-f3fac10c4c76',
            favorite: true,
        },
       
        {
            name: 'A3. 左宗鸡 General Gau Chicken', 
            price: 13.95,
            image: 'https://firebasestorage.googleapis.com/v0/b/taipeicuisine_menu/o/pexels-polina-tankilevitch-5848525.jpg?alt=media&token=739b0872-cbc5-4c91-a831-3f5256074d67',
            favorite: true,
        },
        {
            name: 'A1. 凉拌海蜇 Chilled Jelly Fish', 
            price: 13.95,
            image: 'https://firebasestorage.googleapis.com/v0/b/taipeicuisine_menu/o/pexels-cats-coming-1098545.jpg?alt=media&token=cd32f080-9a2b-4745-b2a1-f3fac10c4c76',
            favorite: false,
        },
        {
            name: 'A2. 台湾牛肉面 Spicy Beef Noodle Soup', 
            price: 13.95,
            image: 'https://firebasestorage.googleapis.com/v0/b/taipeicuisine_menu/o/pexels-cats-coming-1731535.jpg?alt=media&token=552753b8-0425-4744-ba6e-0370cccb04b6',
            favorite: true,
        },
        {
            name: 'A3. 左宗鸡 General Gau Chicken', 
            price: 13.95,
            image: 'https://firebasestorage.googleapis.com/v0/b/taipeicuisine_menu/o/pexels-polina-tankilevitch-5848525.jpg?alt=media&token=739b0872-cbc5-4c91-a831-3f5256074d67',
            favorite: false,
        },
    ]

    const menu_option = [

        {
            id: '2c152398-56d7-43cf-88c3-3e9635ed317b',
            en_name: 'fullday',
            ch_name: '全天菜单',
            category: [
                {
                    id: 'eab09d90-5e76-4486-9678-94970cb7d836',
                    en_name: 'appetizers',
                    ch_name: '开胃小吃'
                },
                {
                    id: '38811d9e-bf61-410f-a0e2-f7eb5b7eaf6e',
                    en_name: 'beef/lamb',
                    ch_name: '牛肉/羊肉'
                },
                {
                    id: 'd925b227-428d-4341-b21a-485e5dc8a5c5',
                    en_name: 'chicken/duck',
                    ch_name: '鸡肉/鸭肉'
                },
                {
                    id: 'e3bf5a2a-a085-439e-aee8-65a06a582695',
                    en_name: 'Dumpling/Buns',
                    ch_name: '包子/饺子'
                },
                {
                    id: 'eab17f94-0468-4b66-8c92-b4cfc58bcc73',
                    en_name: 'pork',
                    ch_name: '猪肉'
                },
                
            ],
        },
        {
            id: '5ff3d9ae-e56e-4bec-807e-d89e0b7e24cd',
            en_name: 'lunch',
            ch_name: '午餐特价',
            category: [
                {
                    id: '077156a9-5739-453f-8c96-14e1313a213b',
                    en_name: 'beef',
                    ch_name: '牛肉'
                },
                {
                    id: 'fec05935-bc43-49da-90f8-973fa4178dca',
                    en_name: 'chicken',
                    ch_name: '鸡肉'
                },
                {
                    id: '65495b7e-71a7-4a4d-885a-518217ae060b',
                    en_name: 'pork',
                    ch_name: '猪肉'
                },
            ],
        },
        
    ];

    const mui_theme = useTheme();

    return <Box sx={{ width: '100%', height: '100vh', bgcolor: 'background.paper'}}>
       <PublicAppBar />
       <div style={{ display: 'flex'}}>
       <Box sx={{ position: 'sticky', top: '0', left: 0, height: 'calc(100vh - 48px)', backgroundColor: 'red', flex: 1, overflow: 'scroll'}}>
            {
                menu_option.map((menu) => {
                    return <Accordion key={menu.id} sx={{ padding: 0}}>
                    <AccordionSummary
                      expandIcon={menu.category.length === 0 ? null : <ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{menu.en_name.toUpperCase()} {menu.ch_name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {
                        menu.category.map((category) => {
                            return <Typography key={category.id}>{category.en_name.toUpperCase()} {category.ch_name}</Typography>
                        })
                      }
                    </AccordionDetails>
                  </Accordion>
                })
            }
        </Box>
        <Grid container spacing={3} sx={{ p:8, flex: 4}}>
            {
                temp_data.map((dish) => {
                    return <Grid item xs={12} sm={6} md={4} lg={4} key={v4()}>
                        <Card sx={{  bgcolor: 'background.default', borderRadius: 2, boxShadow: mui_theme.shadows[6]}} >
                            <IconButton sx={{ position: 'absolute', top: '2', right: '2', zIndex: 9999, color: mui_theme.palette.secondary.main}}>
                                {dish.favorite ? <FavoriteIcon />: <FavoriteBorderIcon />}
                            </IconButton>

                            <CardMedia
                                component="img"
                                height="160"
                                image={dish.image}
                                alt="Paella dish"
                            />
                            <CardContent sx={{ display: 'flex'}}  >
                                <div>
                                <Typography sx={{ color: 'primary.dark', fontSize: 13, fontWeight: 600}}>{dish.name}<GoFlame color="red"/></Typography>
                                    <Typography sx={{ fontSize: 11, }}>${dish.price}</Typography>
                                </div>                                
                            </CardContent>
                        </Card>
                    </Grid>
                })
            }            
        </Grid>
       </div>


    </Box>
}
  
  export default MenuPage


export const PublicAppBar = () => {
    const mui_theme = useTheme();

    const StyleAppbar = styled(AppBar)(({ theme }) => ({
        position: 'static',
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : '#fff',
        color: theme.palette.primary.main,
        width: '100%',
        boxShadow:'1px 1px 1px 0px rgba(0,0,0,0.35)',
        backgroundImage: 'none',
        padding: '0 40px',
        [theme.breakpoints.down('md')]: {
            padding: '0 20px',
        },
        [theme.breakpoints.down('md')]: {
            padding: '0 10px',
        },
    }))
    
    const CartButton = styled(Button)(({theme}) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.mode === 'dark' ? '#000' : '#fff',
        fontSize: 21,
        padding: '10px 40px',
        '&:hover':{
            backgroundColor: '#bbb'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            padding: '10px 30px',
        }
    }))
    
    const CartCount = styled('span')(({theme}) => ({
        position: "absolute",
        fontSize: '10px',
        height: '18px',
        width: '18px',
        top: '3px', 
        right: '29px',
        border: '1px solid #fff',
        borderRadius: '50%',
        backgroundColor: '#fff',
        color: '#555',
        [theme.breakpoints.down('sm')]: {
            height: '14px', 
            width: '14px',
            fontSize: '7px',
            top: '2px', 
            right: '22px',
        }
    }))

    // const [menuOpen, setMenuOpen] = useState(false);
    // const [cartOpen, setCartOpen] = useState(false);

    // const handleMenuOpen = () => {
    //     setMenuOpen(true)
    // }

    // const handleMenuClose = () => {
    //     setMenuOpen(false)
    // }

    // const handleCartOpen = () => {
    //     setCartOpen(true)
    // }

    // const handleCartClose = () => {
    //     setCartOpen(false)
    // }

    return <>
        <Box>
            <StyleAppbar>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        // onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Image src={mui_theme.palette.mode === 'dark'?  WhiteLogo.src : BlackLogo.src} alt="taipei cuisine logo" width={60} height={50}/> 
                </div>
               
                <CartButton> 
                    <AiOutlineShoppingCart />
                    <CartCount>5</CartCount>
                </CartButton>
                    
            </Toolbar>
            </StyleAppbar>
        </Box>

        {/* <MenuDrawer open={menuOpen} handleOpen={handleMenuOpen} handleClose={handleMenuClose}/> */}
        {/* <CartDrawer open={cartOpen} handleOpen={handleCartOpen} handleClose={handleCartClose}/> */}
    </>
}
