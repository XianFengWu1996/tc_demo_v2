import {
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  styled,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { GoFlame } from 'react-icons/go';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { removeCartItemById } from '../../../store/slicer/cartSlicer';
// import { removeById } from '../../../store/slicer/cartSlicer';
import { DrawerQuantity } from '../../dialog/menuItemDialog/quantity';

export const CartDrawerList = () => {
  const cartState = useAppSelector((state) => state.cart);
  return (
    <List sx={{ pb: 10, backgroundColor: 'background.default' }}>
      {cartState.cart.map((item) => {
        return <CartDrawerItem key={item.id} item={item} />;
      })}
    </List>
  );
};

interface CartDrawerItemProps {
  item: CartItem;
}

const PriceText = styled(Typography)(() => ({
  fontSize: '13px',
  margin: '2px 0',
  fontWeight: 'bold',
}));

export const CartDrawerItem = (props: CartDrawerItemProps) => {
  const { item } = props;
  const { details, comments, price } = item;
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ margin: '15px' }}>
      <CardContent
        sx={{
          display: 'flex',
          width: '100%',
          paddingBottom: '7px!important',
          bgcolor: 'white',
          border: '1px solid #C1C1C1',
          borderRadius: 1,
        }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', width: 'inherit' }}
        >
          <div style={{ display: 'flex' }}>
            <MenuImage pic_url={details.pic_url} name={details.en_name} />

            <div>
              <Typography sx={{ fontSize: '13px' }}>
                {details.label_id}. {details.en_name} {details.ch_name}
              </Typography>
              {comments && (
                <Typography sx={{ color: red[400], fontSize: '11px' }}>
                  Comments: {comments}
                </Typography>
              )}
              <ChoiceDisplay item={item} />
              <PriceText>${price.toFixed(2)}</PriceText>
            </div>
          </div>
          <Divider />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '5px',
            }}
          >
            <DrawerQuantity item={item} />
            <IconButton onClick={() => dispatch(removeCartItemById(item.id))}>
              <FaTrash size={18} color={'red'} />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface IMenuImage {
  pic_url: string;
  name: string;
}

const MenuImage = (props: IMenuImage) => {
  return (
    <div style={{ paddingRight: '10px' }}>
      {props.pic_url && (
        <Image
          src={props.pic_url}
          alt={`Picture of ${props.name}`}
          height={50}
          width={50}
        />
      )}
    </div>
  );
};

interface ChoiceDisplay {
  item: CartItem;
}
const ChoiceDisplay = (props: ChoiceDisplay) => {
  return (
    <div style={{ margin: '3px 15px' }}>
      {props.item.choices.map((choice) => {
        return (
          <div key={choice.id}>
            <Typography
              sx={{
                fontSize: 10,
                fontStyle: 'italic',
                textTransform: 'capitalize',
              }}
            >
              {choice.en_name} {choice.ch_name}
            </Typography>
            {choice.selectOptions.map((option) => {
              return (
                <Typography
                  key={option.id}
                  sx={{ ml: 2, fontSize: 8, textTransform: 'capitalize' }}
                >
                  - {option.en_name} {option.ch_name}
                  {option.price > 0 && `+$${option.price.toFixed(2)}`}
                  {option.is_spicy && <GoFlame color="red" />}
                </Typography>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
