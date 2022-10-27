import {
  Dialog,
  DialogActions,
  DialogContent,
  styled,
  Typography,
} from '@mui/material';

export const CustomDialog = styled(Dialog)(() => ({
  '.MuiDialog-paper': {
    borderRadius: '15px',
  },
}));

export const CustomDialogContent = styled(DialogContent)(() => ({
  maxWidth: '700px',
  minWidth: '400px',
  width: '500px',
  overflowY: 'auto',
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
