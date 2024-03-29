import { Box, Button, Typography } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useAppSelector } from '../../../store/hook';
import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { InPersonDialog } from '../../dialog/paymentDialog/inpersonDialog';
import { NewCardDialog } from '../../dialog/paymentDialog/newCardDialog';
import { SaveCardDialog } from '../../dialog/paymentDialog/savedCardDialog';
import { CreditCardIcon, PaymentIconType } from '../../icon/creditCard';
import { CheckoutExpandPanel } from '../expandPanel';

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

  const { cards } = useAppSelector((state) => state.checkout);

  return (
    <CheckoutExpandPanel show={props.showPayment} text={'payment'}>
      <CheckoutNavigationButton
        onClick={() => {
          setInPerson(true);
        }}
        title="Pay In Person"
        icon={<CreditCardIcon type="cash" />}
      />

      {cards.length >= 1 && (
        <CheckoutNavigationButton
          onClick={() => {
            setSaved(true);
          }}
          title="Use Saved Payment"
          icon={<CreditCardIcon type="wallet" />}
        />
      )}

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
  value?: string;
  content?: ReactNode;
  onClick?: (arg1: string | undefined) => void;

  iconHeight?: number;
  iconWidth?: number;
}
export const PaymentChoice = (props: PaymentChoiceProps) => {
  return (
    <>
      <Button
        fullWidth
        onClick={() => {
          if (!props.onClick) return;

          props.onClick(props.value);
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
