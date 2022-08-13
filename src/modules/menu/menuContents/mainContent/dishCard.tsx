import { Card, CardContent, CardMedia, Grid, IconButton, styled, Typography, useTheme } from "@mui/material"
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { GoFlame } from "react-icons/go";
import FallBackImg from '../../../../../public/assets/images/fallback-min.jpg'
import { red } from "@mui/material/colors";
import Router from "next/router";
import { useAppDispatch } from "../../../../store/hook";
import { handleMenuItemChange, toggleMenuItemDialog } from "../../../../store/slicer/menuSlicer";

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

export const DishDisplayCard = ({dish}:{dish: IDish}) => {
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