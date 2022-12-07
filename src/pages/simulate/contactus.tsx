import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { DateTime } from 'luxon';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AppBarNav } from '../../component/appbar/appbar';
import { LoadingButton } from '../../component/button/loadingButton';
import { generatePublicToken } from '../../functions/auth';
import { handleCatchError } from '../../functions/error';

interface Props {
  contactUs?: Simulate.ContactUsMessage[];
}
const SimulateContactUs: NextPage = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleOnClick = async (
    id: string,
    status: Simulate.ContactUsMessageStatus
  ) => {
    try {
      setLoading(true);
      const result = await axios({
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/store/simulate/contactus/status`,
        headers: {
          authorization: `Bearer ${generatePublicToken()}`,
        },
        data: { id, status },
      });

      if (result.status === 200) {
        router.reload();
      }
    } catch (error) {
      handleCatchError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ minHeight: '80vh' }}>
      <AppBarNav />

      <Typography>Just simulation for viewing the order data</Typography>
      <Typography>
        For production, we will use Flutter Streams to allow the tablet to
        retrieve data
      </Typography>

      <Box>
        {props.contactUs ? (
          <>
            {props.contactUs.map((msg) => {
              const dt = DateTime.fromMillis(msg.createdAt);
              const date = dt.toFormat('LLL dd, y');

              return (
                <Box
                  key={msg.id}
                  sx={{
                    border: '1px solid #000',
                    m: 2,
                    p: 2,
                  }}
                >
                  <Typography>Date: {date}</Typography>
                  <Typography>Customer Name: {msg.name}</Typography>
                  <Typography>Customer Email: {msg.email}</Typography>
                  <Typography>Subject: {msg.subject}</Typography>
                  <Typography>Message: {msg.message}</Typography>
                  <Typography>
                    Message Status:{' '}
                    {msg.status.replace('_', ' ').toLocaleUpperCase()}
                  </Typography>

                  <LoadingButton
                    loading={loading}
                    text={'Require Follow Up'}
                    onClick={() => handleOnClick(msg.id, 'required_followup')}
                  />

                  <span style={{ marginRight: '10px' }}></span>

                  <LoadingButton
                    loading={loading}
                    text={'Mark Complete'}
                    onClick={() => handleOnClick(msg.id, 'complete')}
                  />
                </Box>
              );
            })}
          </>
        ) : (
          <Typography>No Message</Typography>
        )}
      </Box>
    </Box>
  );
};

SimulateContactUs.getInitialProps = async () => {
  const result = await axios({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/store/simulate/contactus`,
    headers: {
      authorization: `Bearer ${generatePublicToken()}`,
    },
  });

  const temp = result.data.contactUs as Simulate.ContactUsMessage[];
  temp.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    return 0;
  });

  return {
    contactUs: result.data.contactUs,
  };
};

export default SimulateContactUs;
