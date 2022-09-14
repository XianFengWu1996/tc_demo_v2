import { Box, styled, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { BsCircle } from 'react-icons/bs';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { checkPasswordStrength } from '../../functions/passwordStrength';

const ContainerBox = styled(Box)(() => ({
  position: 'absolute',
  height: '250px',
  width: '425px',
  backgroundColor: '#fff',
  zIndex: 9999,
  marginTop: '12px',
  borderRadius: '4px',
  border: '0.2px solid rgba(0, 0, 0, 0.6)',
  boxShadow: '0 2px 5px 1px rgba(0, 0, 0, 0.2)',
}));

const TriangleUp = styled(Box)(() => ({
  position: 'absolute',
  top: '-10px',
  left: '20px',
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderTop: 0,
  borderStyle: 'solid',
  borderLeftWidth: 10,
  borderRightWidth: 10,
  borderBottomWidth: 12,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderBottomColor: '#000',
}));

interface IPasswordStrengthProps {
  password: string;
}

export const PasswordStrength = (props: IPasswordStrengthProps) => {
  const [isStrong, setIsStrong] = useState<boolean>(false);

  const [hasNoWhiteSpace, setHasNoWhiteSpace] = useState<boolean>(false);
  const [hasUpper, setHasUpper] = useState<boolean>(false);
  const [hasLower, setHasLower] = useState<boolean>(false);
  const [hasNumber, setHasNumber] = useState<boolean>(false);
  const [hasSpecial, setHasSpecial] = useState<boolean>(false);
  const [hasQualifyLength, setHasQualifyLength] = useState<boolean>(false);

  useEffect(() => {
    const {
      containWhiteSpace,
      containUppercase,
      containLowercase,
      containNumber,
      containSpecialChar,
      qualifyLength,
      isStrongPassword,
    } = checkPasswordStrength(props.password);

    setHasNoWhiteSpace(!containWhiteSpace);
    setHasUpper(containUppercase);
    setHasLower(containLowercase);
    setHasNumber(containNumber);
    setHasSpecial(containSpecialChar);
    setHasQualifyLength(qualifyLength);
    setIsStrong(isStrongPassword);

    return () => {
      setHasNoWhiteSpace(false);
      setIsStrong(false);
      setHasUpper(false);
      setHasLower(false);
      setHasNumber(false);
      setHasSpecial(false);
      setHasQualifyLength(false);
    };
  }, [props.password]);

  return (
    <>
      {!isEmpty(props.password) && !isStrong && (
        <ContainerBox>
          <TriangleUp />

          <Box sx={{ bgcolor: '#000', py: 2, px: 3 }}>
            <Typography sx={{ fontSize: 10, color: '#fff' }}>
              The password must have at least 8 characters and must contain at
              least 1 lowercase, 1 uppercase, 1 numeric, and 1 special character
            </Typography>
          </Box>

          <Box sx={{ px: 3, py: 2 }}>
            <PasswordStrengthItem
              text="Must not contain white space"
              qualify={hasNoWhiteSpace}
            />
            <PasswordStrengthItem
              text="At least 8 characters"
              qualify={hasQualifyLength}
            />
            <PasswordStrengthItem
              text="At least one uppercase letter"
              qualify={hasUpper}
            />
            <PasswordStrengthItem
              text="At least one lowercase letter"
              qualify={hasLower}
            />
            <PasswordStrengthItem
              text="At least one number"
              qualify={hasNumber}
            />
            <PasswordStrengthItem
              text="At least one special characters"
              qualify={hasSpecial}
            />
          </Box>
        </ContainerBox>
      )}
    </>
  );
};

interface IPasswordStrengthItemProps {
  text: string;
  qualify: boolean;
}
const PasswordStrengthItem = (props: IPasswordStrengthItemProps) => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
    >
      {props.qualify ? <HiOutlineCheckCircle color="green" /> : <BsCircle />}
      <Typography sx={{ fontSize: 10, ml: 1 }}>{props.text}</Typography>
    </div>
  );
};
