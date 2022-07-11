import { Grid } from "@mui/material"
import { useEffect } from "react"
import { RiParkingBoxLine } from 'react-icons/ri'
import { BiShoppingBag, BiFoodMenu } from 'react-icons/bi'
import { MdDeliveryDining } from 'react-icons/md'
import { SectionTitle } from "./components/sectionTitle"
import { StoreDetailGrid, StoreDetailSection, StoreDetailSubtitle } from "./styles/styles"
import { StoreDetailCard } from "./components/storeDetailCard"
import { v4 } from "uuid"

// animation
import { motion, useAnimation, Variants} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { toggleInView } from "../../functions/utilities/framerMotion"

export const StoreDetails = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView();

    useEffect(() => {
        toggleInView(inView, controls);
      }, [controls, inView]);

    const sectionVariants: Variants = {
        hidden: { 
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 3,
                ease: 'easeOut'
            }
        }
    }

    const storeCardData: IStoreDetailCard[] = [
        {
            title:"Delivery",
            Icon:<MdDeliveryDining size={30} />,
            contents:`Delivery time are around 50 minutes. 
            But time may varies during peak hours & bad weathers.
            Delivery fees starts from $2 with the limit of around 6 miles,
            and the fee will be calculate at the time of the order.`
        }, 
        { 
            title:"Pick Up",
            Icon:<BiShoppingBag size={30} />,
            contents:`The pick up time are usually around 15 minutes. 
            But may varies during peak hours, size of the order, etc.
            All the dumplings and buns are house-made and steam upon request and may take around 10-15 minutes.`
        }, 
        {
            title:"Parking",
            Icon:<RiParkingBoxLine size={30} />,
            contents:`Street parking are available all around the restaurant 
            and there is a public parking lot across the resturant in Vane Street. 
            Most of the street parking are 60 and 90 minutes and free.`
        }, 
        {
            title:"Flavors",
            Icon:<BiFoodMenu size={30} />,
            contents:`Offering the best dishes from SiChuan and Taiwan. 
            The dishes are created by chefs who are high experienced with the styles. 
            Sichuan food is really about a variety of flavors: spicy, Sichuan peppercorns, salty, sour, sweet, etc`          
        }
    ]

    return <motion.div ref={ref} initial="hidden" animate={controls} variants={sectionVariants}> 
        <StoreDetailSection>
                <SectionTitle title="Best Chinese Food In - Quincy" />
                    <StoreDetailSubtitle variant="h6">Located On Billings Road, We offer some of the best Chinese and Taiwanese food</StoreDetailSubtitle>

                    <StoreDetailGrid container spacing={5}>
                        {
                            storeCardData.map((data) => {
                                return <Grid key={v4()} item xs={12} md={6} lg={3}>
                                    <StoreDetailCard
                                        title={data.title}
                                        Icon={data.Icon}
                                        contents={data.contents}
                                    />
                                </Grid>
                            })
                        }                        
                    </StoreDetailGrid>
        </StoreDetailSection>  
    </motion.div>
}





    
