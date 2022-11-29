interface Dialog {
  open: boolean;
  handleClose: () => void;
  onComplete?: (arg: string | number | Address) => void;
}
