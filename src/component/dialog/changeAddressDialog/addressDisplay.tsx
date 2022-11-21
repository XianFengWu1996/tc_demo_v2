import { Box, IconButton, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { AiOutlineEdit } from 'react-icons/ai';

interface AddressDisplayProps {
  streetName: string;
  cityStateZip: string;
  apartmentNumber: string;
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
          {props.streetName}{' '}
          {!isEmpty(props.apartmentNumber) && `#${props.apartmentNumber}`}
        </Typography>

        <Typography fontSize={14} fontWeight={600}>
          {props.cityStateZip}
        </Typography>
      </Box>

      <IconButton onClick={props.onClick}>
        <AiOutlineEdit size={25} />
      </IconButton>
    </Box>
  );
};
