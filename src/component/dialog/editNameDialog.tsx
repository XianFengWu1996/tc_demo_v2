import { Button } from '@mui/material';
import { isEmpty } from 'lodash';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { updateCustomerName } from '../../functions/checkout';
import { handleCatchError } from '../../functions/error';
import snackbar from '../../functions/utilities/snackbar';
import { LoadingButton } from '../button/loadingButton';
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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setName(isEmpty(props.name) ? '' : props.name);
  }, [props.open]);

  const onCancel = () => {
    props.onClose();
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      await updateCustomerName(name);

      props.setState((prevState) => ({
        ...prevState,
        contact: {
          ...prevState.contact,
          name,
        },
      }));
      snackbar.success('Name has been updated');

      props.onClose();
    } catch (error) {
      handleCatchError(error);
    } finally {
      setLoading(false);
    }
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
        <LoadingButton onClick={onConfirm} text="Confirm" loading={loading} />
        <Button onClick={onCancel}>Cancel</Button>
      </CustomDialogActions>
    </CustomDialog>
  );
};
