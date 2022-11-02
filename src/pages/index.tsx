import type { NextPage } from 'next';
import { AdditionalInfo } from '../component/home/additionalInfo';
import { CustomerTestimony } from '../component/home/customerTestimony';
import { HomePage } from '../component/home/Home';
import { StoreDetails } from '../component/home/storeDetails';

const Home: NextPage = () => {
  return (
    <>
      <HomePage />
      <StoreDetails />
      <CustomerTestimony />
      <AdditionalInfo />
    </>
  );
};

export default Home;
