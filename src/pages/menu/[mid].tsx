import { useRouter } from 'next/router'

export const DishById = () => {
  const router = useRouter()
  const { mid } = router.query

  return <p>Dish: {mid}</p>
}

export default DishById