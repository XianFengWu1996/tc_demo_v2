import { Box, Grid, styled, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import Image from 'next/image';

interface MenuContentProps {
  dishes: Dish[];
  onClick: (dish: Dish) => void;
}

const StyledMenuItem = styled(Box)(() => ({
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '5px',
  height: '120px',
  display: 'flex',
  justifyContent: 'space-between',
}));

const StyledMenuItemContent = styled(Box)(() => ({
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export const MenuContent = (props: MenuContentProps) => {
  return (
    <Grid container spacing={2} sx={{ mt: 1, mb: 5 }}>
      {props.dishes.map((dish) => {
        return (
          <Grid key={dish.id} item xs={12} sm={6} md={6} lg={4}>
            <StyledMenuItem onClick={() => props.onClick(dish)}>
              <StyledMenuItemContent>
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  {dish.label_id}. {dish.en_name} {dish.ch_name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    color: 'rgba(0,0,0,0.5)',
                  }}
                >
                  {dish.description}
                </Typography>

                <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                  ${dish.price.toFixed(2)}
                </Typography>
              </StyledMenuItemContent>
              {!isEmpty(dish.pic_url) && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    height={110}
                    width={120}
                    src={dish.pic_url}
                    alt={`Picture of ${dish.en_name}`}
                  />
                </Box>
              )}
            </StyledMenuItem>
          </Grid>
        );
      })}
    </Grid>
  );
};
