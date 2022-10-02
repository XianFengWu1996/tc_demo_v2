import { Button } from '@mui/material';
import { isEmpty } from 'lodash';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CustomInput } from '../input/checkoutInput';
import {
  CustomDialog,
  CustomDialogActions,
  CustomDialogContent,
  CustomeDialogTitle,
} from './styles';

interface IEditNameDialogProps {
  open: boolean;
  name: string;
  onClose: () => void;
  setState: Dispatch<SetStateAction<CheckoutState>>;
}
export const EditNameDialog = (props: IEditNameDialogProps) => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setName(isEmpty(props.name) ? '' : props.name);
  }, [props.open]);

  const onCancel = () => {
    props.onClose();
  };

  const onConfirm = () => {
    props.setState((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        name,
      },
    }));
    props.onClose();
  };

  return (
    <CustomDialog open={props.open} onClose={props.onClose}>
      <CustomDialogContent>
        <CustomeDialogTitle>Change Name</CustomeDialogTitle>

        <CustomInput
          value={name}
          fullWidth
          placeholder="Enter your name"
          styles={{ margin: '15px  0' }}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </CustomDialogContent>

      <CustomDialogActions>
        <Button variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </CustomDialogActions>
    </CustomDialog>
  );
};
