import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface CategorySelectorProps {
  value: string;
  onChange: (val: string) => void;
  menu: Menu;
}

export const CategorySelector = (props: CategorySelectorProps) => {
  const isMobileScreen = useMediaQuery('(max-width: 600px)');

  const ref = useRef<HTMLDivElement>();
  const [position, setPosition] = useState<number>(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <>
      <Box
        ref={ref}
        sx={
          ref.current && ref.current?.getBoundingClientRect().y > 0
            ? null
            : {
                position: 'sticky',
                top: 0,
                backgroundColor: '#fff',
                borderBottom: '1px solid rgba(0,0,0,0.2)',
                zIndex: 100,
              }
        }
      >
        <Tabs
          value={props.value}
          onChange={(e, val) => {
            props.onChange(val);
          }}
          TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
          }}
          variant="scrollable"
          scrollButtons={isMobileScreen}
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
          sx={{
            maxWidth: isMobileScreen ? '100%' : '90vw',
            margin: '8px 0',
            '& .MuiTabs-indicator': {
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            },
            '& .MuiTabs-indicatorSpan': {
              maxWidth: 45,
              width: '100%',
              backgroundColor: '#f38486',
            },
          }}
        >
          {props.menu.category.map((category) => {
            return (
              <Tab
                key={category.id}
                value={category.id}
                label={category.en_name}
                disableRipple
                sx={{ fontSize: 10, fontWeight: 600 }}
              />
            );
          })}
        </Tabs>
      </Box>
    </>
  );
};
