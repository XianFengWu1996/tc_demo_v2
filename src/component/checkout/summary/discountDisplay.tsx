import { Box, Button, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import snackbar from '../../../functions/utilities/snackbar';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { addDiscount } from '../../../store/slicer/cartSlicer';
import { CustomeDialogSubTitle } from '../../dialog/styles';
import { CustomInput } from '../../input/checkoutInput';

export const DiscountDisplay = () => {
  // for collaspe animation
  const discountRef = useRef<HTMLDivElement>();
  const [showDiscount, setShowDiscount] = useState<boolean>(false);

  // for state tracking
  const [points, setPoints] = useState<string>('');

  const dispatch = useAppDispatch();
  const { reward } = useAppSelector((state) => state.checkout);

  const handlePointRedemption = () => {
    const pt = Number(points);
    if (pt < 0) return;

    if (pt > reward.points) {
      return snackbar.error('Not enough points');
    }
    dispatch(addDiscount(pt));
  };

  return (
    <>
      <Button
        disableRipple
        fullWidth
        onClick={() => {
          setShowDiscount(!showDiscount);
        }}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 0,
          mt: 1,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Typography sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
          Discount
        </Typography>

        {showDiscount ? (
          <HiOutlineChevronUp size={20} />
        ) : (
          <HiOutlineChevronDown size={20} />
        )}
      </Button>

      <Box
        ref={discountRef}
        sx={{
          height: showDiscount ? discountRef.current?.scrollHeight : 0,
          overflow: 'hidden',
          transition: 'height ease 0.9s',
        }}
      >
        <CustomeDialogSubTitle>Point Redemption</CustomeDialogSubTitle>
        <Box display={'flex'}>
          <CustomInput
            value={points}
            type={'number'}
            fullWidth
            placeholder={`Points available: ${reward.points}`}
            onChange={(e) => {
              setPoints(e.target.value);
            }}
            styles={{
              flex: 3,
            }}
          />
          <Button
            variant="contained"
            sx={{
              ml: 2,
              flex: 1,
            }}
            onClick={handlePointRedemption}
          >
            Enter
          </Button>
        </Box>

        <CustomeDialogSubTitle>Promo Code</CustomeDialogSubTitle>
        <Box display={'flex'}>
          <CustomInput
            fullWidth
            placeholder={'Enter promo code'}
            styles={{
              flex: 3,
            }}
          />
          <Button
            variant="contained"
            sx={{
              ml: 2,
              flex: 1,
            }}
          >
            Enter
          </Button>
        </Box>
      </Box>
    </>
  );
};
