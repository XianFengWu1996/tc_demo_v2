import { Grid, Typography } from "@mui/material"
import { DishDisplayCard } from "./dishCard"

interface IDishList {
    menu: IMenu,
}

export const DishList = ({ menu }:IDishList) => {
    return <>
        <Grid container spacing={3} sx={{ flex: 4}}>
                {
                    menu.category.map((category) => {
                        return <>
                            {/* displays the category as the tile */}
                            <Grid item xs={12} >
                                <Typography id={category.id} component={'div'} sx={{ fontSize:25, fontWeight: 700, pt: 1}}>
                                    {category.en_name}
                                </Typography>
                            </Grid>

                            {/* display all the list of the categories*/}
                            {
                                category.dishes.map((dish) => {
                                    return <DishDisplayCard key={dish.id} dish={dish}/>
                                })
                            }

                        </>

                    })
                }          
            </Grid>
    </>
}