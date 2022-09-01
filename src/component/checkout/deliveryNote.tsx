import { TextField, Typography } from '@mui/material';

export const DeliveryNotes = () => {
  return (
    <>
      <Typography sx={{ my: 1.5 }}>Delivery Notes</Typography>
      <TextField
        id="r"
        variant="outlined"
        multiline
        minRows={4}
        fullWidth
        label={'Delivery notes, ex. leave at porch, call upon delivery, etc..'}
        sx={{ display: 'block' }}
      />
    </>
  );
};
