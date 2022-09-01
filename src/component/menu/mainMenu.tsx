import { Box, Tab, Tabs } from '@mui/material';

interface IMenuNavigation {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const MainMenuSelect = ({ value, handleChange }: IMenuNavigation) => {
  return (
    <Box sx={{ pt: 3, pl: 3 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="All Day Menu" />
        <Tab label="Lunch Special" />
      </Tabs>
    </Box>
  );
};
