import { Button } from '@mui/material';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { updateCustomerName } from '../../functions/checkout';
import { handleCatchError } from '../../functions/error';
import snackbar from '../../functions/utilities/snackbar';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setContactName } from '../../store/slicer/checkoutSlicer';
import { LoadingButton } from '../button/loadingButton';
import { CustomInput } from '../input/checkoutInput';
import {
  CustomDialog,
  CustomDialogActions,
  CustomDialogContent,
  CustomeDialogTitle,
} from './styles';

export const EditNameDialog = (props: Dialog) => {
  const { contact } = useAppSelector((state) => state.checkout);
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setName(!isEmpty(contact.name) ? contact.name : '');
  }, [props.open]);

  const onCancel = () => {
    props.handleClose();
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      await updateCustomerName(name);

      dispatch(setContactName(name));
      snackbar.success('Name has been updated');

      props.handleClose();
    } catch (error) {
      handleCatchError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomDialog open={props.open} onClose={props.handleClose}>
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
