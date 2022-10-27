import { Box, Grid, styled, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { AppBarNav } from '../../component/appbar/appbar';

import dumpling from '../../../public/assets/images/dumplings.jpg';
import dumplingBg from '../../../public/assets/images/dumpling_background.jpg';
import noodle from '../../../public/assets/images/noodle.jpg';

interface ICredit {
  id: string;
  src: string;
  alt: string;
  link_href: string;
  link_text: string;
}

const iconCredits: ICredit[] = [
  {
    id: '1',
    src: 'https://img.icons8.com/color/48/000000/google-logo.png',
    alt: 'google icons from icons 8',
    link_href: 'https://icons8.com/icon/17949/google',
    link_text: 'Credit: Google icon by Icons8',
  },
  {
    id: '2',
    src: 'https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-phone-contact-us-flatart-icons-flat-flatarticons.png',
    alt: 'photo icons from icons 8',
    link_href: 'https://icons8.com/icon/FKrvLCpXSmeu/phone',
    link_text: 'Credit: Phone icon by Icons8',
  },
  {
    id: '3',
    src: 'https://img.icons8.com/color/48/000000/visa.png',
    alt: 'visa icons from icons 8',
    link_href: 'https://icons8.com/icon/13608/visa',
    link_text: 'Credit: Visa icon by Icons8',
  },
  {
    id: '4',
    src: 'https://img.icons8.com/color/48/000000/mastercard.png',
    alt: 'mastercard icons from icons 8',
    link_href: 'https://icons8.com/icon/13610/mastercard',
    link_text: 'Credit: Mastercard icon by Icons8',
  },
  {
    id: '5',
    src: 'https://img.icons8.com/officel/40/000000/discover.png',
    alt: 'discover card icons from icons 8',
    link_href: 'https://icons8.com/icon/r2N4MhuWtQmy/discover-card',
    link_text: 'Credit: Discover Card icon by Icons8',
  },
  {
    id: '5',
    src: 'https://img.icons8.com/color/48/000000/amex.png',
    alt: 'american express icons from icons 8',
    link_href: 'https://icons8.com/icon/13607/american-express',
    link_text: 'Credit: American Express Card icon by Icons8',
  },
];

const photoCredits: ICredit[] = [
  {
    id: '1',
    src: dumpling.src,
    alt: 'photo of dumpling',
    link_href: 'https://unsplash.com/photos/GZe_M6TUJ_k',
    link_text: 'Photo by SJ 📸 on Unsplash',
  },
  {
    id: '2',
    src: noodle.src,
    alt: 'photo of noodle',
    link_href: 'https://unsplash.com/photos/LO7rNP0LRro',
    link_text: 'Photo by Debbie Tea on Unsplash',
  },
  {
    id: '3',
    src: dumplingBg.src,
    alt: 'photo of dumpling',
    link_href: 'https://unsplash.com/photos/q66grqqHpDQ',
    link_text: 'Photo by Pooja Chaudhary on Unsplash',
  },
];

export default function Credit() {
  return (
    <>
      <AppBarNav />

      <Box sx={{ py: 5, px: 10 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 30,
          }}
        >
          Credits
        </Typography>

        <CreditSubtitle>Icons</CreditSubtitle>

        <Grid container spacing={3}>
          {iconCredits.map((credit) => {
            return (
              <CreditItem height={30} width={30} key={credit.id} {...credit} />
            );
          })}
        </Grid>

        <CreditSubtitle>Photo</CreditSubtitle>

        <Grid container spacing={3}>
          {photoCredits.map((credit) => {
            return (
              <CreditItem key={credit.id} height={75} width={75} {...credit} />
            );
          })}
        </Grid>
      </Box>
    </>
  );
}

const CreditSubtitle = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: 20,
  margin: '15px 0',
}));

interface ICreditItem extends ICredit {
  height: number;
  width: number;
}

const CreditItem = (props: ICreditItem) => {
  return (
    <Grid
      item
      lg={4}
      md={6}
      sm={6}
      xs={12}
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <Image
        src={props.src}
        height={props.height}
        width={props.width}
        alt={props.alt}
        style={{ borderRadius: '10px' }}
      />

      <Link target="_blank" href={props.link_href}>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 500,
            cursor: 'pointer',
            ml: 2,
          }}
        >
          {props.link_text}
        </Typography>
      </Link>
    </Grid>
  );
};
