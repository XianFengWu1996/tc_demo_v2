import { FavoriteBorder } from "@mui/icons-material"
import { Card, CardContent, CardMedia, Grid, IconButton, styled, Typography, useTheme } from "@mui/material"
import { red } from "@mui/material/colors"
import { GoFlame } from "react-icons/go"
import { useAppDispatch } from "../../store/hook"
import { handleMenuItemChange, toggleMenuItemDialog } from "../../store/slicer/menuSlicer"
import FallBackImg from '../../../public/assets/images/fallback-min.jpg'


interface IDishList {
    menu: IMenu,
}

const CategoryTitle = styled(Typography)(({ theme }) => ({
    fontSize:25, 
    fontWeight: 700, 
    paddingTop: 5,
    color: theme.palette.primary.main
})) 

export const DishList = ({ menu }:IDishList) => {
    return <>
        <Grid container spacing={3} sx={{ flex: 4}}>
                {
                    menu.category.map((category) => {
                        return <DishItem key={category.id} category={category}/>
                    })
                }          
            </Grid>
    </>
}

export const DishItem = ({category}: {category: ICategory}) => {
    return  <>
    {/* displays the category as the tile */}
    <Grid item xs={12} >
        <CategoryTitle id={category.id}>
            {category.en_name}
        </CategoryTitle>
    </Grid>

    {/* display all the list of the categories*/}
    {
        category.dishes.map((dish) => {
            return <DishDisplayCard key={dish.id} dish={dish}/>
        })
    }

</>
}

const CardContainer = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.default, 
    borderRadius: 10, 
    boxShadow: theme.shadows[4],
    minHeight: '200px',
}))

const FavoriteIcons = styled(IconButton)(({ theme }) => ({
    position: 'absolute', 
    top: '2',
    right: '2', 
    zIndex: 999, 
    color: red[400]
}))

const DishName = styled(Typography)(({ theme }) => ({
    color: 'primary.dark', 
    fontSize: 13, 
    fontWeight: 600
}))

const DishPrice = styled(Typography)(({ theme }) => ({
    fontSize: 11, 
}))

const DishDisplayCard = ({dish}:{dish: IDish}) => {
    const theme = useTheme()
    const dispatch = useAppDispatch();

    return <>
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <CardContainer onClick={() => {
                dispatch(toggleMenuItemDialog(true))
                dispatch(handleMenuItemChange(dish))
            }}>
                <FavoriteIcons>
                    <FavoriteBorder />
                </FavoriteIcons>

                <CardMedia
                    component="img"
                    height="200"
                    image={dish.pic_url ? dish.pic_url :FallBackImg.src}
                    sx={{ 
                        filter: theme.palette.mode === 'dark' ? "brightness(80%)" : "brightness(100%)",
                    }}
                    alt={`${dish.en_name}`}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column'}}  >
                    <DishName>
                        {dish.label_id}.{dish.en_name} <GoFlame color="red"/>
                    </DishName>
                    <DishPrice>${dish.price.toFixed(2)}</DishPrice>                               
                </CardContent>
            </CardContainer>
        </Grid>
    </>
}