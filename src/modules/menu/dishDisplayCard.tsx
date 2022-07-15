import { Card, CardContent, CardMedia, Grid, IconButton, styled, Theme, Typography, useTheme } from "@mui/material"
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { GoFlame } from "react-icons/go";
import FallBackImg from '../../../public/assets/images/fallback-min.jpg'

const CardContainer = styled(Card)(({ theme }) => ({
    bgcolor: 'background.default', 
    borderRadius: 10, 
    boxShadow: theme.shadows[4],
    minHeight: '200px'
}))

const FavoriteIcons = styled(IconButton)(({ theme }) => ({
    position: 'absolute', 
    top: '2',
    right: '2', 
    zIndex: 9999, 
    color: theme.palette.secondary.main
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
    return <>
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <CardContainer>
                <FavoriteIcons>
                    <FavoriteBorder />
                </FavoriteIcons>

                <CardMedia
                    component="img"
                    height="200"
                    image={dish.pic_url ? dish.pic_url :FallBackImg.src}
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