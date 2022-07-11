import type { NextPage } from 'next'
import { AdditionalInfo } from '../modules/home/additionalInfo'
import { CustomerTestimony } from '../modules/home/customerTestimony'
import { Footer } from '../modules/home/Footer'
import { HomePage } from '../modules/home/Home'
import { StoreDetails } from '../modules/home/storeDetails'

const Home: NextPage = () => {
  return (
    <>
      <HomePage />
      <StoreDetails />
      <CustomerTestimony />
      <AdditionalInfo />
      <Footer />
    </>
  )
}

export default Home
