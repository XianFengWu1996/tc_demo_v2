import { Button, Typography } from '@mui/material';
import Router from 'next/router';
import { MdOutlineArrowBack } from 'react-icons/md';

export const BackToMenu = () => {
  const handleOnClick = () => {
    Router.push('/menu');
  };
  return (
    <>
      <Button sx={{ px: 0 }} onClick={handleOnClick}>
        <MdOutlineArrowBack size={22} style={{ fontWeight: 600 }} />
        <Typography ml={2} fontWeight={600}>
          Back to menu
        </Typography>
      </Button>
    </>
  );
};
