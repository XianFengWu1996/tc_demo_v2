import Image from 'next/image';

type CreditCardType =
  | 'visa'
  | 'mastercard'
  | 'discover'
  | 'amex'
  | 'creditcard';

interface CreditCardIcons {
  type: CreditCardType;
  height?: number;
  width?: number;
}

const generateSrc = (type: CreditCardType) => {
  let url = '';
  switch (type) {
    case 'visa':
      url = 'https://img.icons8.com/color/48/000000/visa.png';
      break;
    case 'mastercard':
      url = 'https://img.icons8.com/color/48/000000/mastercard.png';
      break;
    case 'amex':
      url = 'https://img.icons8.com/color/48/000000/amex.png';
      break;
    case 'discover':
      url = 'https://img.icons8.com/officel/40/000000/discover.png';
      break;
    case 'creditcard':
      url = 'https://img.icons8.com/fluency/48/000000/bank-card-back-side.png';
      break;
    default:
      break;
  }
  return url;
};

export const CreditCardIcon = (props: CreditCardIcons) => {
  return (
    <Image
      src={generateSrc(props.type)}
      height={props.height ?? 25}
      width={props.width ?? 25}
      alt={'photo of credit card brand'}
    />
  );
};
