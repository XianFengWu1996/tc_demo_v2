import { Box, Button, TextField, Typography } from "@mui/material"
import { isEmpty } from "lodash"
import Image from "next/image"
import { useEffect, useState } from "react"
import { GoFlame } from "react-icons/go"
import placeholderImage from '../../../../public/assets/images/fallback.jpeg'

interface IMenuItem {
    dish: IDish
}

export const MenuItem = ({ dish } :IMenuItem) => {  
    return <Box sx={{ 
        backgroundColor: 'background.paper',
        minHeight: 'calc(100vh - 68px)',
    }}>
      
        <div style={{ display: 'flex', padding: '20px 100px'}}>
           <Image
            src={isEmpty(dish.pic_url) ? placeholderImage.src : dish.pic_url}
            alt={`Picture of ${dish.en_name}`} 
            width={300}
            height={300}
          />

          <div style={{ marginLeft: '50px'}}> 

            <DishDetails dish={dish}/>
            
            <DishVariant dish={dish} />

            <DishComment />

            <Button variant='contained' color='primary'>Add To Cart | $10.95</Button>
          </div>

        </div>
    </Box>
}

export const DishDetails = ({dish}:{dish: IDish}) => {
    return <>
        <Typography sx={{ fontSize: 18, fontWeight: 500}}>{dish.label_id}.{dish.en_name} {dish.ch_name} {isEmpty(dish.variant) && dish.is_spicy && <GoFlame size={15} color={'red'}/>}</Typography>
        <Typography>${dish.price.toFixed(2)}</Typography>

        {
            !isEmpty(dish.description) && <Typography>Description: {dish.description}</Typography>
        }
    </>
}

export const DishVariant = ({ dish } : {dish: IDish}) => {
    return <>
         {
            dish.variant.map((variant) => {
            return <div key={variant.id}>
                <Typography >{variant.en_name} {variant.ch_name}</Typography>

                {
                variant.options.map((option) => {
                    return <div key={option.id}> {option.en_name} {option.ch_name} {option.spicy && <GoFlame size={15} color={'red'}/> } +${option.price.toFixed(2)} </div>
                })
                }
            </div>
            })
        }
    </>
}

export const DishComment = () => {
    return <div>
        <TextField
              sx={{ my: 2, width: '600px'}}
              multiline
              minRows={3}
              fullWidth
              placeholder='Leave comment specific to the dish, such as spicy level, allergies, etc'
        />
    </div>
}