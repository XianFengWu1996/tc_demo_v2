import { Typography } from '@mui/material';
import Link from 'next/link';

interface IAuthLink {
  linkTo: string;
  text: string;
}
export const AuthLink = (props: IAuthLink) => {
  return (
    <Link href={props.linkTo}>
      <Typography sx={{ mb: 3, fontSize: 14, cursor: 'pointer' }}>
        {props.text}
      </Typography>
    </Link>
  );
};
