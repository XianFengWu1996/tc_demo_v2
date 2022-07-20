import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AppBarNav } from '../../modules/appbar/appbar'
import { useAppSelector } from '../../store/hook'

export const DishById = () => {
  const router = useRouter()
  const { dishId } = router.query
  const { listOfDishes } = useAppSelector((state) => state.menu);
  const [dish, setDish] = useState<IDish>();

  useEffect(() => {
      const found_dish = listOfDishes.find((dish) => {
        return dish.id === dishId
      })
      setDish(found_dish);
  }, [])

  return <>
    <AppBarNav />

    <Box sx={{ 
        backgroundColor: 'background.paper',
        minHeight: 'calc(100vh - 68px)',
    }}>
      {
        dish && <div style={{ display: 'flex'}}>
          <Image 
            src={dish.pic_url ?? ''} 
            alt={`Picture of ${dish.en_name}`} 
            width={300}
            height={300}
          />

          <div>
            <Typography>{dish.label_id}.{dish.en_name} {dish.ch_name}</Typography>
            <Typography>${dish.price}</Typography>

            <Typography>Description: {dish.description}</Typography>
          </div>

        </div>
      }
    </Box>
  </>
}

export default DishById