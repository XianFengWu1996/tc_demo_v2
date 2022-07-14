import { Card, CardContent, CardMedia, Grid, IconButton, Typography, useTheme } from "@mui/material"
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { GoFlame } from "react-icons/go";
import FallBackImg from '../../../public/assets/images/fallback.jpeg'


export const DishDisplayCard = ({dish}:{dish: IDish}) => {
    const mui_theme = useTheme();

    return <>
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card sx={{  bgcolor: 'background.default', borderRadius: 2, boxShadow: mui_theme.shadows[6]}} >
                <IconButton sx={{ position: 'absolute', top: '2', right: '2', zIndex: 9999, color: mui_theme.palette.secondary.main}}>
                    <FavoriteBorder />
                </IconButton>

                <CardMedia
                    component="img"
                    height="160"
                    image={dish.pic_url ? dish.pic_url :FallBackImg.src}
                    alt="Paella dish"
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column'}}  >
                    <Typography sx={{ color: 'primary.dark', fontSize: 13, fontWeight: 600}}>{dish.label_id}.{dish.en_name}<GoFlame color="red"/></Typography>
                    <Typography sx={{ fontSize: 11, }}>${dish.price}</Typography>                               
                </CardContent>
            </Card>
        </Grid>
    </>
}