import { Grid } from '@mui/material';
import Image from 'next/image';

interface IAuthPageImage {
  src: string;
}

export const AuthPageImage = (props: IAuthPageImage) => {
  return (
    <Grid item xs={0} sm={0} md={5} lg={6} height={'calc(100vh - 63px)'}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Image
          src={props.src}
          alt={'picture'}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </Grid>
  );
};
