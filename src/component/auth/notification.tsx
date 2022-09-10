import { Button, CardActions, CardContent, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import { TbMailbox } from 'react-icons/tb';
import { EmailVerifyCard } from './styles';

interface INotificationProps {
  onDismiss: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const EmailVerificationNotification = (props: INotificationProps) => {
  return (
    <>
      <EmailVerifyCard elevation={0}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <TbMailbox size={25} color={'#fff'} />
          <Typography sx={{ color: '#fff', ml: 3 }}>
            Success, please check verification link in your inbox.
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'end',
            p: 0,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={props.onDismiss}
            sx={{ borderColor: '#fff', color: '#fff' }}
          >
            Dismiss
          </Button>
        </CardActions>
      </EmailVerifyCard>
    </>
  );
};
