import { Box, IconButton, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { AiOutlineEdit } from 'react-icons/ai';

interface AddressDisplayProps {
  street_name: string;
  city_state_zip: string;
  apartment_number: string;
  onClick: () => void;
}

export const AddressDisplay = (props: AddressDisplayProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        margin: '15px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography fontSize={14} fontWeight={600}>
          {props.street_name}{' '}
          {!isEmpty(props.apartment_number) && `#${props.apartment_number}`}
        </Typography>

        <Typography fontSize={14} fontWeight={600}>
          {props.city_state_zip}
        </Typography>
      </Box>

      <IconButton onClick={props.onClick}>
        <AiOutlineEdit size={25} />
      </IconButton>
    </Box>
  );
};
