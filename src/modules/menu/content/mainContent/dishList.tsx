import { Grid, styled, Typography } from "@mui/material"
import { DishDisplayCard } from "./dishCard"

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
                        return <>
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

                    })
                }          
            </Grid>
    </>
}