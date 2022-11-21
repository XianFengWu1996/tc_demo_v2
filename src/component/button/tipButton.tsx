import { Button } from '@mui/material';

interface TipButtonProps {
  value: TipType;
  selected: boolean;
  onClick: (val: TipType) => void;
}
export const TipButton = (props: TipButtonProps) => {
  return (
    <Button
      variant={props.selected ? 'contained' : 'outlined'}
      fullWidth={props.value !== 'custom'}
      sx={{
        borderRadius: 0,
      }}
      onClick={() => props.onClick(props.value)}
    >
      {props.value}
    </Button>
  );
};
