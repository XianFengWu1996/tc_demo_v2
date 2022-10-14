import axios from 'axios';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  getMenuData,
  handleCategoryIdChange,
} from '../../store/slicer/menuSlicer';

import { Box } from '@mui/material';
import { AppBarNav } from '../../component/appbar/appbar';
import { MenuContents } from '../../component/menu';
import { MainMenuSelect } from '../../component/menu/mainMenu';
import { MenuItemDialog } from '../../component/menu/menuItem/MenuItemDialog';
import { auth } from '../../config/firebaseConfig';

function MenuPage() {
  const dispatch = useAppDispatch();
  const { fullday, lunch } = useAppSelector((state) => state.menu);

  // handle the changing of the tabs, which essentially change of the menu
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    dispatch(handleCategoryIdChange({ id: '' })); // reset the category id when the menu changes
  };

  useEffect(() => {
    const retrieveMenu = async () => {
      try {
        const result = await axios({
          method: 'GET',
          url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/menu`,
        });
        dispatch(getMenuData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    retrieveMenu();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      console.log(auth.currentUser);
      console.log(await auth.currentUser?.getIdTokenResult());
    })();
  }, []);

  return (
    <Box
      sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.paper' }}
    >
      <AppBarNav />
      <MainMenuSelect value={value} handleChange={handleChange} />

      {!isEmpty(fullday) && (
        <MenuContents value={value} index={0} menu={fullday} />
      )}

      {!isEmpty(lunch) && <MenuContents value={value} index={1} menu={lunch} />}

      <MenuItemDialog />
    </Box>
  );
}

export default MenuPage;
