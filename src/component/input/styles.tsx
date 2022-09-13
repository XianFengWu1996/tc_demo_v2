import { InputBase, styled, Typography } from '@mui/material';
import { isEmpty } from 'lodash';

export const AuthInputLabel = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 600,
  textTransform: 'capitalize',
}));

interface AdditionalProps {
  errormsg: string;
}

export const AuthInputContainer = styled(InputBase)<AdditionalProps>(
  ({ errormsg }) => ({
    backgroundColor: '#f59c9e47',
    padding: '10px 15px',
    borderRadius: '5px',
    border: !isEmpty(errormsg) ? '1px solid red' : 'none',
  })
);
