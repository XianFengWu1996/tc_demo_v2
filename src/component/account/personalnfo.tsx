import { Box, Button, styled, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { Dispatch, SetStateAction, useState } from 'react';
import { formatPhoneNumber } from '../../functions/phone';
import { ChangeAddressDialog } from '../dialog/changeAddressDialog';
import { EditNameDialog } from '../dialog/editNameDialog';
import { EditPhoneDialog } from '../dialog/editPhoneDialog';
import { CustomeDialogSubTitle } from '../dialog/styles';
import { AccLoading } from './accountLoading';

const PersonalInfoItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '400px',
  marginBottom: '8px',
}));

interface AccPersonalProps {
  user: User.User;
  setUser: Dispatch<SetStateAction<User.User>>;
  loading?: boolean;
}
export const AccPersonal = (props: AccPersonalProps) => {
  return !props.loading ? (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <AccEditName user={props.user} setUser={props.setUser} />

      <AccEditPhone user={props.user} setUser={props.setUser} />

      <AccEditAddress user={props.user} setUser={props.setUser} />

      <AccRewards user={props.user} setUser={props.setUser} />
    </Box>
  ) : (
    <AccLoading />
  );
};

const AccEditName = (props: AccPersonalProps) => {
  const [nameDialog, setNameDialog] = useState<boolean>(false);

  const handleOpen = () => {
    setNameDialog(true);
  };

  const handleClose = () => {
    setNameDialog(false);
  };

  const handleOnComplete = (val: string | number | Address.Details) => {
    props.setUser((prev) => ({
      ...prev,
      name: val as string,
    }));
  };

  return (
    <>
      <CustomeDialogSubTitle>Name</CustomeDialogSubTitle>
      <PersonalInfoItem>
        <Typography>
          {!isEmpty(props.user.name) ? props.user.name : 'Not Provided'}
        </Typography>
        <Button sx={{ color: '#f59c9e' }} onClick={handleOpen}>
          Edit
        </Button>
      </PersonalInfoItem>

      <EditNameDialog
        open={nameDialog}
        handleClose={handleClose}
        onComplete={handleOnComplete}
      />
    </>
  );
};

const AccEditPhone = (props: AccPersonalProps) => {
  const [phoneDialog, setPhoneDialog] = useState<boolean>(false);

  const handleOpen = () => {
    setPhoneDialog(true);
  };

  const handleClose = () => {
    setPhoneDialog(false);
  };

  const handleOnComplete = (phone: string | number | Address.Details) => {
    props.setUser((prev) => ({
      ...prev,
      phone: phone as string,
    }));
  };

  return (
    <>
      <CustomeDialogSubTitle>Phone</CustomeDialogSubTitle>
      <PersonalInfoItem>
        <Typography>
          {!isEmpty(props.user.phone)
            ? formatPhoneNumber(props.user.phone)
            : 'Not Provided'}
        </Typography>
        <Button sx={{ color: '#f59c9e' }} onClick={handleOpen}>
          Edit
        </Button>
      </PersonalInfoItem>

      <EditPhoneDialog
        open={phoneDialog}
        handleClose={handleClose}
        onComplete={handleOnComplete}
      />
    </>
  );
};

const AccEditAddress = (props: AccPersonalProps) => {
  const { address } = props.user;
  const { formattedAddress, details } = address;
  const [addressDialog, setAddressDialog] = useState<boolean>(false);

  const handleOpen = () => {
    setAddressDialog(true);
  };

  const handleClose = () => {
    setAddressDialog(false);
  };

  const handleOnComplete = (val: string | number | Address.Details) => {
    props.setUser((prev) => ({
      ...prev,
      address: val as Address.Details,
    }));
  };

  return (
    <>
      <CustomeDialogSubTitle>Address</CustomeDialogSubTitle>
      <PersonalInfoItem>
        {formattedAddress ? (
          <Box>
            <Typography>{formattedAddress.streetName}</Typography>
            <Typography>{formattedAddress.cityStateZip}</Typography>
            <Typography>
              Delivery Fee: ${details?.deliveryFee.toFixed(2) ?? 0.0}
            </Typography>
            <Typography>
              Est. Arrival Time: {details?.estimateTime ?? 'N/A'}
            </Typography>
          </Box>
        ) : (
          <Typography>Not Provided</Typography>
        )}
        <Button sx={{ color: '#f59c9e' }} onClick={handleOpen}>
          Edit
        </Button>
      </PersonalInfoItem>

      <ChangeAddressDialog
        open={addressDialog}
        type="account"
        handleClose={handleClose}
        onComplete={handleOnComplete}
      />
    </>
  );
};

const AccRewards = (props: AccPersonalProps) => {
  const { points } = props.user.reward;
  return (
    <>
      <CustomeDialogSubTitle>Rewards</CustomeDialogSubTitle>
      <PersonalInfoItem>
        <Typography>
          {points ?? 0}pts = ${(points / 100).toFixed(2)}
        </Typography>
      </PersonalInfoItem>
    </>
  );
};
