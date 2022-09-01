import { Button, Card, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import BgImage from '../../../../public/assets/images/dumpling_background.jpg';
import CustomerBg from '../../../../public/assets/images/customer-background.jpeg';

// ========================================
//      Home Styled Components
// ========================================

export const HomeSection = styled('div')(({ theme }) => ({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(${BgImage.src})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '100vh',
  width: '100vw',
  padding: '2% 5%',
  [theme.breakpoints.down('md')]: {
    padding: '2% 3%',
  },
}));

export const HomeTitle = styled(Typography)(({ theme }) => ({
  color: '#fff',
  paddingBottom: '20px',
  fontSize: '60px',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '25px',
  },
}));

export const HomeButtonGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  minWidth: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'start',
  },
}));

export const HomeContainedButton = styled(Button)(() => ({
  marginRight: '35px',
  backgroundColor: '#e74c3c',
  marginBottom: '15px',
  height: '40px',
}));

export const HomeOutlinedButton = styled(Button)(() => ({
  border: '1px solid #e74c3c',
  color: '#e74c3c',
  height: '40px',
}));
// ================================================================
//     END OF Home Styled Components
// ================================================================

// ========================================
//     Store Detail Styled Components
// ========================================
export const StoreDetailSection = styled('section')(() => ({
  minHeight: '100vh',
  width: '100vw',
  paddingBottom: '50px',
}));

export const StoreDetailSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginTop: '40px',
  fontFamily: 'Arial',
  color: '#555555',
  fontWeight: 'lighter',
  [theme.breakpoints.down('md')]: {
    fontSize: '18px',
    padding: '0 20px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
  },
}));

export const StoreDetailGrid = styled(Grid)(({ theme }) => ({
  padding: '60px 100px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '40px 60px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 30px',
  },
}));

export const StoreDetailCardContainer = styled(Card)(({ theme }) => ({
  height: '45vh',
  [theme.breakpoints.down('md')]: {
    height: '30vh',
  },
  [theme.breakpoints.down('sm')]: {
    height: '50vh',
  },
}));

export const StoreDetailCardContents = styled('div')(({ theme }) => ({
  paddingTop: '15px',
  lineHeight: '1.5',
  wordSpacing: '2px',
  fontSize: '18px',
  fontWeight: 'lighter',
  [theme.breakpoints.down('md')]: {
    wordSpacing: '1px',
    fontSize: '16px',
    fontWeight: 'normal',
  },
}));

export const StoreDetailCardTitle = styled(Typography)(() => ({
  marginLeft: '13px',
  color: '#555',
  fontWeight: 'normal',
  fontSize: '19px',
}));

// ================================================================
//     END OF Store Detail Styled Components
// ================================================================

// ========================================
//     Testimony Styled Components
// ========================================
export const TestimonySection = styled('section')(({ theme }) => ({
  backgroundImage: `linear-gradient(rgb(0 0 0 / 52%), rgb(0 0 0 / 87%)), url(${CustomerBg.src})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  minHeight: '100vh',
  width: '100vw',
  [theme.breakpoints.down('md')]: {
    padding: '0 50px 50px 50px',
  },
}));

export const TestimonyContents = styled(Typography)(() => ({
  color: '#fff',
  fontSize: '18px',
  fontStyle: 'italic',
  fontWeight: 200,
  wordSpacing: 2.5,
  lineHeight: 1.3,
}));

export const TestimonyAuthor = styled('div')(() => ({
  display: 'flex',
  paddingTop: '10px',
  alignItems: 'center',
}));

// ================================================================
//     END OF Testimony Styled Components
// ================================================================

// ========================================
//     Additional Info Styled Components
// ========================================

export const AdditionInfoSection = styled('section')(() => ({
  minHeight: '100vh',
  width: '100%',
  overflow: 'hidden',
}));

export const HoursContainer = styled('section')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const ReservationCateringContainer = styled('div')(({ theme }) => ({
  padding: '0 80px 40px 80px',
  [theme.breakpoints.down('sm')]: {
    padding: '0 15px 40px 15px',
  },
}));

export const OpenHourContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '5px 0',
  width: '80%',
  fontSize: '20px',
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
    width: '90%',
  },
}));

// ================================================================
//     END OF Additonal Info Styled Components
// ================================================================

// ========================================
//     Footer Styled Components
// ========================================

export const FooterContainer = styled('footer')(() => ({
  minHeight: '30vh',
  backgroundColor: '#333',
  color: '#888',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 20px',
  textAlign: 'center',
}));

// ================================================================
//     END OF Footer Styled Components
// ================================================================
