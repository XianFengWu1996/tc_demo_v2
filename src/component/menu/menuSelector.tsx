import { Box, InputAdornment, Tab, Tabs, Typography } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { generateMenuTime } from '../../functions/time';
import { CustomInput } from '../input/checkoutInput';

interface MenuSelectorProps {
  currentTime: number;
  menus: Menu[];
  value: string;
  onChange: (value: string) => void;
  onSearch: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const MenuSelector = (props: MenuSelectorProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Tabs
        TabIndicatorProps={{
          children: <span className="MuiTabs-indicatorSpan" />,
        }}
        sx={{
          '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          },
          '& .MuiTabs-indicatorSpan': {
            maxWidth: 65,
            width: '100%',
            backgroundColor: '#f38486',
          },
        }}
        value={props.value}
        onChange={(e, val) => {
          props.onChange(val);
        }}
        aria-label="basic tabs example"
      >
        {props.menus.map((item) => {
          return (
            <Tab
              key={item.id}
              value={item.id}
              disabled={
                item.id === process.env.NEXT_PUBLIC_LUNCH_MENU &&
                props.currentTime > item.hours.end
              }
              label={
                <>
                  <Typography
                    sx={{
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {item.en_name} Menu
                  </Typography>
                  <Typography sx={{ fontSize: 9, fontWeight: 600 }}>
                    {generateMenuTime(item.hours)}
                  </Typography>
                </>
              }
            />
          );
        })}
      </Tabs>

      <CustomInput
        startAdornment={
          <InputAdornment position="start">
            <AiOutlineSearch size={17} />
          </InputAdornment>
        }
        placeholder="Search"
        styles={{
          width: '250px',
        }}
        onChange={props.onSearch}
      />
    </Box>
  );
};
