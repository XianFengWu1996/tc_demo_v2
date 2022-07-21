import { Box, Button, TextField, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GoFlame } from 'react-icons/go'
import { AppBarNav } from '../../modules/appbar/appbar'
import { MenuItem } from '../../modules/menu/item/menuItem'
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
  }, [dishId, listOfDishes])

  return <>
    <AppBarNav />

    {
      dish && <MenuItem dish={dish}/>
    }
  </>
}

export default DishById