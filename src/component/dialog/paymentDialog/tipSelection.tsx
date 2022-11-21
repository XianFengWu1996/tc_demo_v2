import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FocusEvent, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { updateCustomTip, updateTip } from '../../../store/slicer/cartSlicer';
import { TipButton } from '../../button/tipButton';

export const TipSelection = () => {
  const { deliveryOption, summary } = useAppSelector((state) => state.cart);
  const tipRef = useRef<HTMLDivElement>();
  const [showTip, setShowTip] = useState<boolean>(
    deliveryOption === 'delivery'
  );
  const dispatch = useAppDispatch();

  const handleTipChange = (val: TipType) => {
    if (summary.tipType === val) {
      return dispatch(updateTip(''));
    }
    dispatch(updateTip(val));
  };

  const handleCustomTipOnBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    dispatch(updateCustomTip(e.target.value));
  };

  const handleCustomTipOnFocus = () => {
    dispatch(updateTip('custom'));
  };

  const handleCustomTipOnClick = (val: TipType) => {
    handleTipChange(val);
    // also focus to the text field
    document.getElementById('tip_input')?.focus();
  };

  const handleTipToggle = () => {
    setShowTip(!showTip);
  };

  return (
    <>
      <Button
        fullWidth
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          my: 1,
          px: 0,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        disableRipple
        onClick={handleTipToggle}
      >
        <Typography sx={{ fontWeight: 600 }}>Tip</Typography>
        <FiChevronDown />
      </Button>

      <Box
        ref={tipRef}
        sx={{
          height: showTip ? tipRef.current?.scrollHeight : 0,
          overflow: 'hidden',
          transition: 'height ease 0.4s',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <TipButton
            value="10%"
            selected={summary.tipType === '10%'}
            onClick={handleTipChange}
          />
          <TipButton
            value="15%"
            selected={summary.tipType === '15%'}
            onClick={handleTipChange}
          />
          <TipButton
            value="18%"
            selected={summary.tipType === '18%'}
            onClick={handleTipChange}
          />
          <TipButton
            value="20%"
            selected={summary.tipType === '20%'}
            onClick={handleTipChange}
          />
          <TipButton
            value="cash"
            selected={summary.tipType === 'cash'}
            onClick={handleTipChange}
          />
        </Box>

        <Box sx={{ mt: 2, display: 'flex' }}>
          <TipButton
            value="custom"
            selected={summary.tipType === 'custom'}
            onClick={handleCustomTipOnClick}
          />
          <TextField
            id="tip_input"
            type={'number'}
            fullWidth
            size="small"
            onFocus={handleCustomTipOnFocus}
            onBlur={handleCustomTipOnBlur}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: 0,
                },
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};
