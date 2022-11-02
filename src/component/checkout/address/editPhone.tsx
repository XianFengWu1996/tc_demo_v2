import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { ChangeEvent, ChangeEventHandler, ReactNode, useState } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import { MdOutlinePhone } from 'react-icons/md';
import validator from 'validator';
import { requestOTPCode, verifyOTPCode } from '../../../functions/checkout';
import { handleCatchError } from '../../../functions/error';
import { formatPhoneNumber } from '../../../functions/phone';
import snackbar from '../../../functions/utilities/snackbar';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setPhoneNumber } from '../../../store/slicer/checkoutSlicer';
import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { CountDownButton } from '../../button/countDownButton';
import { LoadingButton } from '../../button/loadingButton';
import {
  CustomDialog,
  CustomDialogActions,
  CustomDialogContent,
  CustomeDialogTitle,
} from '../../dialog/styles';
import { CustomInput } from '../../input/checkoutInput';

type VerificationStatus = 'pre' | 'verifying' | 'complete';

interface IEditPhoneContent {
  title?: string;
  subTitle?: string | ReactNode;
  content?: ReactNode;
  buttonDisabled?: boolean;
  buttonText: string;
  onClick?: () => void;
  loading?: boolean;
}
interface IPreVerify {
  phone: string;
  loading: boolean;
  onChange:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onClick: () => void;
}

interface IVerifying extends IPreVerify {
  otp: string;
  onResend: () => Promise<void>;
}

interface IPostVerify {
  onClick: () => void;
}

export const EditPhone = () => {
  const isMobileScreen = useMediaQuery('(max-width: 600px)');
  const dispatch = useAppDispatch();
  const { contact } = useAppSelector((state) => state.checkout);
  const [status, setStatus] = useState<VerificationStatus>('pre');

  const [phone, setPhone] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false); // button loading

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComplete = () => {
    setOtp('');
    setPhone('');
    setStatus('pre');
  };

  const handlePreOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= 10) {
      setPhone(e.target.value);
    }
  };

  const handlePreOnClick = async () => {
    try {
      setLoading(true);
      await requestOTPCode(phone, setToken);
      setStatus('verifying');
    } catch (error) {
      handleCatchError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyingOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= 6) {
      setOtp(e.target.value);
    }
  };

  const handleOnResend = async () => {
    try {
      await requestOTPCode(phone, setToken);
    } catch (error) {
      handleCatchError(error);
    }
  };

  const handleVerifyingOnClick = async () => {
    try {
      setLoading(true);
      const result = await verifyOTPCode(phone, otp, token);

      // update the phone number in the state
      dispatch(setPhoneNumber(phone));

      if (result.status === 200) {
        setStatus('complete');
      }

      snackbar.success('Phone has been updated');
    } catch (error) {
      handleCatchError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteVerifying = () => {
    try {
      handleClose();
      handleComplete();
    } catch (error) {
      handleCatchError(error);
    }
  };

  return (
    <>
      <CheckoutNavigationButton
        onClick={handleOpen}
        title={
          !isEmpty(contact.phone)
            ? formatPhoneNumber(contact.phone)
            : 'Add a phone number'
        }
        icon={<MdOutlinePhone size={22} />}
      />

      <CustomDialog
        fullScreen={isMobileScreen}
        open={open}
        onClose={handleClose}
      >
        <CustomDialogContent>
          {isMobileScreen && (
            <IconButton onClick={handleClose} sx={{ mb: 2, p: 0 }}>
              <FaRegTimesCircle size={35} color="000" />
            </IconButton>
          )}

          <CustomeDialogTitle>Edit Phone</CustomeDialogTitle>

          {status === 'pre' && (
            <PreVerify
              loading={loading}
              phone={phone}
              onChange={handlePreOnChange}
              onClick={handlePreOnClick}
            />
          )}

          {status === 'verifying' && (
            <Verifying
              otp={otp}
              phone={phone}
              loading={loading}
              onChange={handleVerifyingOnChange}
              onClick={handleVerifyingOnClick}
              onResend={handleOnResend}
            />
          )}

          {status === 'complete' && (
            <PostVerify onClick={handleCompleteVerifying} />
          )}
        </CustomDialogContent>

        {isMobileScreen && (
          <CustomDialogActions>
            <Button fullWidth onClick={handleClose}>
              Cancel
            </Button>
          </CustomDialogActions>
        )}
      </CustomDialog>
    </>
  );
};

const EditPhoneContent = (props: IEditPhoneContent) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Image
        height={50}
        width={50}
        alt="icon of a phone"
        src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-phone-contact-us-flatart-icons-flat-flatarticons.png"
      />
      {props.title && (
        <Typography sx={{ fontSize: 14, fontWeight: 600, textAlign: 'center' }}>
          {props.title}
        </Typography>
      )}
      {props.subTitle && (
        <Typography sx={{ fontSize: 13, textAlign: 'center', mb: 1 }}>
          {props.subTitle}
        </Typography>
      )}
      {props.content && (
        <Box sx={{ mb: 1, width: '100%' }}>{props.content}</Box>
      )}
      <LoadingButton
        fullWidth
        disabled={props.buttonDisabled}
        onClick={props.onClick}
        text={props.buttonText}
        loading={props.loading ?? false}
      />
    </Box>
  );
};

const PreVerify = (props: IPreVerify) => {
  return (
    <EditPhoneContent
      title="Enter your phone number"
      subTitle="The purpose of verification to make sure driver or staff can
reach you for any matter regarding the order"
      content={
        <CustomInput
          type={'number'}
          value={props.phone}
          startAdornment={
            <InputAdornment position="start">
              <Typography sx={{ fontSize: 13, mx: 1 }}>+1</Typography>
            </InputAdornment>
          }
          onChange={props.onChange}
          placeholder="ex: 123-456-7890"
          fullWidth
        />
      }
      buttonText="send"
      buttonDisabled={!validator.isMobilePhone(props.phone, 'en-US')}
      loading={props.loading}
      onClick={props.onClick}
    />
  );
};

const Verifying = (props: IVerifying) => {
  return (
    <EditPhoneContent
      title={`Please enter the one-time verification code sent to +1${props.phone}`}
      subTitle={
        <>
          Didn&apos;t get the code?
          <CountDownButton
            sx={{
              fontSize: 12,
              color: blue[300],
            }}
            loaderColor={blue[300]}
            text="Resend"
            onClick={props.onResend}
          />
        </>
      }
      content={
        <CustomInput
          placeholder="ex: 123456"
          type={'number'}
          value={props.otp}
          onChange={props.onChange}
          fullWidth
        />
      }
      loading={props.loading}
      buttonText="verify"
      buttonDisabled={props.otp.length < 6}
      onClick={props.onClick}
    />
  );
};

const PostVerify = (props: IPostVerify) => {
  return (
    <EditPhoneContent
      subTitle="The phone number has been successfully verified"
      buttonText="close"
      onClick={props.onClick}
    />
  );
};
