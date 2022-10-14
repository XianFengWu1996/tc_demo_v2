export const formatPhoneNumber = (phone: string) => {
  return `+1(${phone.slice(0, 3)})-${phone.slice(3, 6)}-${phone.slice(6)}`;
};
