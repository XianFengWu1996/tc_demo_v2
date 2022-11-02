import { Box, Button, Radio, Typography } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { InPersonDialog } from '../../dialog/inpersonDialog';
import { NewCardDialog } from '../../dialog/newCardDialog';
import { SaveCardDialog } from '../../dialog/savedCardDialog';
import { CreditCardIcon, PaymentIconType } from '../../icon/creditCard';
import { CheckoutExpandPanel } from '../expandPanel';

type PaymentType = 'inperson' | 'saved' | 'new';

interface PaymentProps {
  showPayment: boolean;
  setShowPayment: Dispatch<SetStateAction<boolean>>;
}
export const Payment = (props: PaymentProps) => {
  // inperson dialog
  const [inPerson, setInPerson] = useState<boolean>(false);
  // saved card dialog
  const [saved, setSaved] = useState<boolean>(false);
  // new card dialog
  const [newCard, setNewCard] = useState<boolean>(false);

  return (
    <CheckoutExpandPanel show={props.showPayment} text={'payment'}>
      <CheckoutNavigationButton
        onClick={() => {
          setInPerson(true);
        }}
        title="Pay In Person"
        icon={<CreditCardIcon type="cash" />}
      />
      <CheckoutNavigationButton
        onClick={() => {
          setSaved(true);
        }}
        title="Pay with Saved cards"
        icon={<CreditCardIcon type="wallet" />}
      />
      <CheckoutNavigationButton
        onClick={() => {
          setNewCard(true);
        }}
        title="Pay with credit card"
        icon={<CreditCardIcon type="creditcard" />}
        borderBottom={'none'}
      />
      <InPersonDialog
        open={inPerson}
        handleClose={() => {
          setInPerson(false);
        }}
      />

      <SaveCardDialog
        open={saved}
        handleClose={() => {
          setSaved(false);
        }}
      />

      <NewCardDialog
        open={newCard}
        handleClose={() => {
          setNewCard(false);
        }}
      />
    </CheckoutExpandPanel>
  );
};

interface PaymentChoiceProps {
  selected: boolean;
  type: PaymentIconType;
  text: string;
  subText?: string;
  value?: PaymentType;
  content?: ReactNode;
  onClick?: (arg1: PaymentType) => void;

  iconHeight?: number;
  iconWidth?: number;
}
export const PaymentChoice = (props: PaymentChoiceProps) => {
  return (
    <>
      <Button
        fullWidth
        onClick={() => {
          if (props.onClick) {
            props.onClick(props.value!);
          }
        }}
        sx={{
          border: `1.5px solid ${props.selected ? '#4bb543' : '#000'}`,
          mr: 2,
          position: 'relative',
          padding: '10px 25px',
          justifyContent: 'start',
        }}
      >
        {props.selected && (
          <span
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '25px',
              width: '25px',
              backgroundColor: '#4bb543',
              borderBottomLeftRadius: '20px',
            }}
          >
            <FaCheck
              color="#fff"
              style={{
                fontSize: 12,
                position: 'absolute',
                top: 4,
                left: 9.5,
              }}
            />
          </span>
        )}
        <CreditCardIcon
          type={props.type}
          height={props.iconHeight ?? 30}
          width={props.iconWidth ?? 30}
        />
        <Box>
          <Typography
            sx={{
              textTransform: 'capitalize',
              fontSize: 13,
              fontWeight: 600,
              ml: 1.5,
              mr: 2,
            }}
          >
            {props.text}
          </Typography>
          {props.subText && (
            <Typography
              sx={{
                textAlign: 'start',
                textTransform: 'capitalize',
                fontSize: 12,
                fontWeight: 600,
                ml: 1.5,
              }}
            >
              {props.subText}
            </Typography>
          )}
        </Box>
      </Button>
    </>
  );
};

export const CreditCardButton = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '2px solid rgba(0,0,0,0.6)',
          borderRadius: '13px',
          padding: '10px 20px',
          width: '100%',
          mb: 1.5,
        }}
      >
        <Box display={'flex'}>
          <Radio
            checked={true}
            onChange={(e) => {
              console.log(e.target.value);
            }}
            value="a"
            name="radio-buttons"
          />

          <Box ml={2}>
            <Typography sx={{ fontSize: 15, fontWeight: 600 }}>Visa</Typography>
            <Box display={'flex'} alignItems={'center'}>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                •••• •••• ••••{' '}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  ml: 1,
                }}
              >
                3125
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <CreditCardIcon type="visa" height={30} width={30} />
        </Box>
      </Box>
    </Box>
  );
};
