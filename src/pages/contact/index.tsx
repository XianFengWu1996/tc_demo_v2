import { Box, styled, Typography } from '@mui/material';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { ChangeEvent, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { AppBarNav } from '../../component/appbar/appbar';
import { LoadingButton } from '../../component/button/loadingButton';
import { CustomInput } from '../../component/input/checkoutInput';
import { generatePublicToken } from '../../functions/auth';
import { handleCatchError } from '../../functions/error';
import snackbar from '../../functions/utilities/snackbar';

interface Contact {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ErrorText = styled(Typography)(() => ({
  fontSize: 11,
  fontWeight: 500,
  color: 'red',
}));

const initialState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const [state, setState] = useState<Contact>(initialState);

  const [error, setError] = useState<Contact>(initialState);

  const [loading, setLoading] = useState<boolean>(false);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // handle on change base on the input name
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

    // reset the error for the particular input, in something has changed
    setError({
      ...error,
      [e.target.name]: '',
    });
  };

  const handleSubmit = async () => {
    setError(initialState);
    if (isEmpty(state.name)) {
      return setError({
        ...error,
        name: 'Name can not be empty',
      });
    }

    if (isEmpty(state.email)) {
      return setError({
        ...error,
        email: 'Email can not be empty',
      });
    }

    if (!isEmail(state.email)) {
      return setError({
        ...error,
        email: 'Email is invalid or malformatted',
      });
    }

    if (isEmpty(state.subject)) {
      return setError({
        ...error,
        subject: 'Subject can not be empty',
      });
    }

    if (isEmpty(state.message)) {
      return setError({
        ...error,
        message: 'Message can not be empty',
      });
    }

    try {
      setLoading(true);
      const result = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/store/contactus`,
        headers: {
          authorization: `Bearer ${generatePublicToken()}`,
        },
        data: state,
      });

      if (result.status === 200) {
        snackbar.success(
          'Message has been sent, one of our staff will try to reply within 24 hours'
        );
        setState(initialState);
      }
    } catch (error) {
      handleCatchError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AppBarNav />
      <Box
        sx={{
          margin: '20px 30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
          Contact Us
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
          }}
        >
          <Typography>Name</Typography>
          <CustomInput
            name="name"
            value={state.name}
            onChange={handleOnChange}
          />
          {!isEmpty(error.name) && <ErrorText>{error.name}</ErrorText>}
          <Typography>Email</Typography>
          <CustomInput
            name="email"
            value={state.email}
            onChange={handleOnChange}
          />
          {!isEmpty(error.email) && <ErrorText>{error.email}</ErrorText>}

          <Typography>Subject</Typography>
          <CustomInput
            name="subject"
            value={state.subject}
            onChange={handleOnChange}
          />
          {!isEmpty(error.subject) && <ErrorText>{error.subject}</ErrorText>}

          <Typography>Message</Typography>

          <CustomInput
            minRows={7}
            multiline
            name="message"
            value={state.message}
            onChange={handleOnChange}
          />
          {!isEmpty(error.message) && <ErrorText>{error.message}</ErrorText>}

          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            text={'Submit'}
          />
        </Box>
      </Box>
    </>
  );
}
