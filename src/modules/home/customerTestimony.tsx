import { Grid } from '@mui/material'
import { SectionTitle } from './components/sectionTitle'
import { useEffect } from 'react'
import { TestimonyDetails } from './components/testimonyDetails'
import { v4 } from 'uuid'
import { TestimonySection } from './styles/styles'

// animation
import { motion, useAnimation, Variants} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { toggleInView } from '../../functions/utilities/framerMotion'



export const CustomerTestimony = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView();

    useEffect(() => {
        toggleInView(inView, controls);
      }, [controls, inView]);

    const variants:Variants = {
        hidden: {
            y: -100,
        },
        visible: {
            y: 0,
            transition: {
                duration: 0.8,
                ease: 'linear'
            }
        }
    }

    const testimonyData: ITestimonyDetails[]= [
        {
            contents: `Authentic Taiwanese cuisine. I went for the beef noodles which is a staple in Taiwan 
            and how I gauged the authenticity. Two thumbs up from me and its always a plus if there is a wait and you see locals 
            in it. Only thing is you might have to share a table during busy hours  but don't let that take away from 
            the experience. If anything its a chance to make new friends!`,
            author: 'Nissai K.',
        },
        {
            contents: `If you enjoy authentic, tasty Szechuan and Taiwanese cuisines,
            this is the place to be! Their lunch special runs daily and on the weekends 
            as well. If you are feeling too lazy to cook and would like some decent, 
            spicy, Asian food, this is the place to be. If you are looking for good service, 
            don't come here.`,
            author: 'Shawn S.',
        },
        {
            contents: `Best place in Quincy to get Taiwanese food in my opinion. Try the fish
            in chili oil, beef scallion pancake, oyster omelet, soup dumplings, and cumin 
            lamb skewers - everything is delicious and reasonably priced!`,
            author: 'Victoria B.',
        },
    ]

    return <TestimonySection>
                <SectionTitle  title='Here is what customers are saying' color='#fff'/>
                 <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} >  
                    <Grid 
                        container 
                        spacing={6} 
                        justifyContent={'center'}
                        sx={{ paddingTop: '50px', minHeight: '90vh'}}>
                            {
                                testimonyData.map((testimony) => {
                                    return <Grid key={v4()} item xs={12} md={3}>
                                        <TestimonyDetails 
                                            contents={testimony.contents}
                                            author={testimony.author}
                                        />
                                    </Grid>
                                })
                            }
                    </Grid>
                </motion.div>

        </TestimonySection>
}

