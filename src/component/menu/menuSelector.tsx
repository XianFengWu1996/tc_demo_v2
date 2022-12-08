import {
  Box,
  InputAdornment,
  styled,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ChangeEventHandler } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { generateMenuTime } from '../../functions/time';
import { useAppSelector } from '../../store/hook';
import { CustomInput } from '../input/checkoutInput';

interface MenuSelectorProps {
  menus: Menu[];
  value: string;
  onChange: (value: string) => void;
  onSearch: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const MenuSelectorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    alignItems: 'start',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

export const MenuSelector = (props: MenuSelectorProps) => {
  const isMobileScreen = useMediaQuery('(max-width: 600px)');
  const { disableLunch } = useAppSelector((state) => state.store);

  return (
    <MenuSelectorContainer>
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
                item.id === process.env.NEXT_PUBLIC_LUNCH_MENU && disableLunch
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
          width: isMobileScreen ? '100%' : '250px',
          marginTop: isMobileScreen ? '10px' : 0,
        }}
        onChange={props.onSearch}
      />
    </MenuSelectorContainer>
  );
};
