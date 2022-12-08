import { styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { isEmpty } from 'lodash';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { AppBarNav } from '../../component/appbar/appbar';
import { MenuItemDialog } from '../../component/dialog/menuItemDialog/menuItemDialog';
import { CategorySelector } from '../../component/menu/categorySelector';
import { MenuContent } from '../../component/menu/menuContent';
import { MenuSelector } from '../../component/menu/menuSelector';
import { getCurrentTime } from '../../functions/time';
import snackbar from '../../functions/utilities/snackbar';
import { useAppSelector } from '../../store/hook';

const MenuContainer = styled(Box)(({ theme }) => ({
  margin: '10px 50px',
  [theme.breakpoints.down('md')]: {
    margin: '10px 35px',
  },

  [theme.breakpoints.down('sm')]: {
    margin: '10px',
  },
}));

export default function MenuV2() {
  const { menus, dishes, today } = useAppSelector((state) => state.store);

  const [menu, setMenu] = useState<Menu>();
  const [category, setCategory] = useState<Category>();
  const [dish, setDish] = useState<Dish[]>([]);

  const [search, setSearch] = useState<boolean>(false);

  const [selectDish, setSelectDish] = useState<Dish>({
    id: '',
    menuId: '',
    categoryId: '',
    en_name: '',
    ch_name: '',
    is_spicy: false,
    is_popular: false,
    is_lunch: false,
    in_stock: false,
    price: 0,
    choices: [],
    description: '',
    label_id: '',
    pic_url: '',
  });

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateDishes = (
    menuId: string,
    categoryId: string,
    dishes: Dish[]
  ) => {
    const tempDishes: Dish[] = []; // temp array for dish

    dishes.map((dish) => {
      if (dish.menuId === menuId && dish.categoryId === categoryId) {
        tempDishes.push(dish);
      }
    });

    tempDishes.sort((a, b) => {
      return a.label_id.localeCompare(b.label_id, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });

    return tempDishes;
  };

  const searchDishes = (searchTerm: string, dishes: Dish[]) => {
    const tempDishes: Dish[] = []; // temp array for dish

    dishes.map((dish) => {
      if (dish.en_name.toLowerCase().includes(searchTerm.toLowerCase())) {
        tempDishes.push(dish);
      }
    });

    tempDishes.sort((a, b) => {
      return a.label_id.localeCompare(b.label_id, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });

    return tempDishes;
  };

  const onMenuChange = (val: string) => {
    const time = getCurrentTime();
    // if we are changing to the lunch menu, we will want to check if its still during lunch time

    if (today && time > today.hours.lunch.close) {
      const found = menus.find((menu) => {
        return menu.id === process.env.NEXT_PUBLIC_FULLDAY_MENU;
      });
      setMenu(found);
      if (found) {
        setCategory(found.category[0]);
        setDish(generateDishes(found.id, found.category[0].id, dishes));
      }
      window.scrollTo(0, 0);
      return snackbar.info('Lunch time has ended');
    } else {
      const found = menus.find((menu) => {
        return menu.id === val;
      });
      setMenu(found);
      if (found) {
        setCategory(found.category[0]);
        setDish(generateDishes(found.id, found.category[0].id, dishes));
      }
      window.scrollTo(0, 0);
    }
  };

  const onCategoryChange = (val: string) => {
    if (menu) {
      const found = menu.category.find((category) => {
        return category.id === val;
      });
      setCategory(found);
      if (found) setDish(generateDishes(menu.id, found?.id, dishes));
      window.scrollTo(0, 0);
    }
  };

  const handleOnSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(true);

    if (e.target.value.length === 0 && menu && category) {
      setDish(generateDishes(menu.id, category.id, dishes));
      setSearch(false);
    } else {
      setDish(searchDishes(e.target.value, dishes));
    }
  };

  const handleDishSelected = (dish: Dish) => {
    handleOpen();
    setSelectDish({
      ...selectDish,
      ...dish,
    });
  };

  const setDefaultValue = useCallback(async () => {
    if (!isEmpty(menus)) {
      const tempMenu = menus[0];
      const tempCategory = tempMenu.category[0];
      setMenu(tempMenu);
      setCategory(tempCategory);
      setDish(generateDishes(tempMenu.id, tempCategory.id, dishes));
    }
  }, [menus, dishes]);

  useEffect(() => {
    setDefaultValue();
  }, [setDefaultValue]);

  return (
    <>
      <AppBarNav />

      <MenuContainer>
        {menu && (
          <MenuSelector
            menus={menus}
            value={menu.id}
            onChange={onMenuChange}
            onSearch={handleOnSearch}
          />
        )}

        {menu && category && !search && (
          <CategorySelector
            value={category.id}
            menu={menu}
            onChange={onCategoryChange}
          />
        )}

        {search && (
          <Typography sx={{ fontSize: 20, fontWeight: 700, mb: -3, mt: 3 }}>
            Search Results
          </Typography>
        )}
        <MenuContent dishes={dish} onClick={handleDishSelected} />

        <MenuItemDialog
          open={open}
          handleClose={handleClose}
          dish={selectDish}
        />
      </MenuContainer>
    </>
  );
}
