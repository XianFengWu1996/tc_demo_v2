import { Divider } from '@mui/material';
import { FC } from 'react';

type Props = {
  children?: React.ReactNode;
};

export const ViaEmailDivider: FC<Props> = ({ children }) => {
  return (
    <Divider
      sx={{
        my: 1,
        width: '90%',
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.40)',
      }}
    >
      {children}
    </Divider>
  );
};
