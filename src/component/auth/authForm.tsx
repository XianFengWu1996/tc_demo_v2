import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export const AuthForm: FC<Props> = (props) => {
  return (
    <Box
      component={'form'}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', width: '425px' }}
    >
      {props.children}
    </Box>
  );
};
