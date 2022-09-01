import { Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { GoFlame } from 'react-icons/go';

export const DishDetails = ({ dish }: { dish: IDish }) => {
  return (
    <>
      <Typography sx={{ fontSize: 30, fontWeight: 600, marginTop: 2 }}>
        {dish.label_id}.{dish.en_name} {dish.ch_name}{' '}
        {isEmpty(dish.choices) && dish.is_spicy && (
          <GoFlame size={15} color={'red'} />
        )}
      </Typography>
      <Typography sx={{ fontSize: 15 }}>
        ${dish.price ? dish.price.toFixed(2) : 0.0}
      </Typography>

      {!isEmpty(dish.description) && (
        <Typography>Description: {dish.description}</Typography>
      )}
    </>
  );
};
