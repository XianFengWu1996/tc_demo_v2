export const checkPasswordStrength = (password: string) => {
  const containWhiteSpace = /^(?=.*\s)/.test(password);
  const containUppercase = /^(?=.*[A-Z])/.test(password);
  const containLowercase = /^(?=.*[a-z])/.test(password);
  ``;
  const containNumber = /^(?=.*[0-9])/.test(password);
  const containSpecialChar =
    /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/.test(password);
  const qualifyLength = /^.{8,}$/.test(password);

  const isStrongPassword =
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).{8,}$/.test(
      password
    );

  return {
    containWhiteSpace,
    containUppercase,
    containLowercase,
    containNumber,
    containSpecialChar,
    qualifyLength,
    isStrongPassword,
  };
};
