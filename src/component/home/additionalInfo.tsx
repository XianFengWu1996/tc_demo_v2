import { uuidv4 } from '@firebase/util';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect } from 'react';
import { FaUtensils } from 'react-icons/fa';
import OpenSign from '../../../public/assets/images/opensign.png';
import Reservation from '../../../public/assets/images/reservations.png';
import { OpenHourDisplay } from './components/hourDisplay';
import { SectionTitle } from './components/sectionTitle';
import {
  AdditionInfoSection,
  HoursContainer,
  ReservationCateringContainer,
} from './styles/styles';

// animation
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { toggleInView } from '../../functions/utilities/framerMotion';

// rare case to need to close on a certain day for a long period of time
const open_hours = [
  {
    day: 'Monday',
    close: false,
  },
  {
    day: 'Tuesday',
    close: false,
  },
  {
    day: 'Wednesday',
    close: false,
  },
  {
    day: 'Thursday',
    close: false,
  },
  {
    day: 'Friday',
    close: false,
  },
  {
    day: 'Saturday',
    close: false,
  },
  {
    day: 'Sunday',
    close: false,
  },
];

export const AdditionalInfo = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    toggleInView(inView, controls);
  }, [controls, inView]);

  const hourVariants: Variants = {
    hidden: {
      x: -100,
    },
    visible: {
      x: 0,
      transition: { duration: 1 },
    },
  };
  const othersVariants: Variants = {
    hidden: {
      x: 100,
    },
    visible: {
      x: 0,
      transition: { duration: 1 },
    },
  };

  return (
    <AdditionInfoSection>
      <SectionTitle title="Additional Information" />

      <Grid container spacing={5} sx={{ pt: 5 }}>
        <Grid
          item
          xs={12}
          md={6}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={hourVariants}
          >
            <HoursContainer>
              <Image
                src={OpenSign.src}
                alt="open sign"
                width={200}
                height={200}
              />
              {open_hours.map((hour) => {
                return (
                  <OpenHourDisplay
                    key={uuidv4()}
                    date={hour.day}
                    close={hour.close}
                  />
                );
              })}
            </HoursContainer>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={othersVariants}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                height: 'inherit',
              }}
            >
              <ReservationCateringContainer>
                <Image
                  src={Reservation.src}
                  alt="reservation icon"
                  width={150}
                  height={100}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                >
                  Reservation
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 'light',
                    fontSize: '20px',
                    fontFamily: 'Arial',
                  }}
                >
                  Reservations are only accept over the phone and we currently
                  only reserve table for parties of 5 or more.
                </Typography>
              </ReservationCateringContainer>
              <ReservationCateringContainer>
                <FaUtensils size={80} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                >
                  Catering
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 'light',
                    fontSize: '20px',
                    fontFamily: 'Arial',
                  }}
                >
                  We offer Catering for events. Please call in to get discuss
                  more details. Call in a least a day ahead to allow time for
                  prepration.
                </Typography>
              </ReservationCateringContainer>
            </div>
          </motion.div>
        </Grid>
      </Grid>
    </AdditionInfoSection>
  );
};
