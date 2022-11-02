import {
  Dialog,
  DialogActions,
  DialogContent,
  styled,
  Typography,
} from '@mui/material';

export const CustomDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    borderRadius: '15px',
  },

  [theme.breakpoints.down('sm')]: {
    '.MuiDialog-paper': {
      borderRadius: '0px',
    },
  },
}));

export const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
  minWidth: '500px',
  overflowY: 'auto',

  [theme.breakpoints.down('sm')]: {
    minWidth: '300px',
  },
}));

export const CustomDialogActions = styled(DialogActions)(() => ({
  borderTop: '1px solid rgba(0,0,0,0.1)',
  padding: '10px',
}));

export const CustomeDialogTitle = styled(Typography)(() => ({
  fontSize: 22,
  fontWeight: 700,
}));

export const CustomeDialogSubTitle = styled(Typography)(() => ({
  fontSize: 13,
  fontWeight: 600,
  marginTop: '8px',
  textTransform: 'capitalize',
}));
