import { Box,Grid, List, ListItem, Tab, Tabs, Typography, useTheme } from "@mui/material"

import { v4 } from "uuid";
import React, { useEffect } from "react";
import { DishDisplayCard } from "../../modules/menu/dishDisplayCard";
import { AppBarNav } from "../../modules/appbar/appbar";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getMenuData } from "../../store/slicer/menuSlicer";
import { isEmpty } from 'lodash'



function MenuPage() {
    const dispatch = useAppDispatch();

    const retrieveMenu = async () => {
        try {
            let result = await axios({
                method: 'GET',
                url: 'http://localhost:5001/foodorder-43af7/us-east4/v2/store/menus'
            })
            dispatch(getMenuData(result.data))            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
       retrieveMenu();
    }, [])

    const handleMenuDisplay = (menu: IMenu) => {

        let category_name = '';

        menu.category.map((category) => {
            category_name = category.en_name

            return category.dishes.map((dish) => {
                
            })

        })
    }

    interface TabPanelProps {
        menu: IMenu,
        index: number;
        value: number;
    }

    function TabPanel(props: TabPanelProps) {
        const { menu, value, index,  ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <div style={{ display: 'flex'}}>
                    <Box sx={{ position: 'sticky', top: '0', left: 0, height: 'calc(100vh - 48px)', backgroundColor: 'background.paper', flex: 1, overflow: 'scroll'}}>    
                        {
                            menu.category.map((category) => {
                                return <Typography key={category.id}>{category.en_name.toUpperCase()}</Typography>
                            })
                        }
                    </Box>
                    <Grid container spacing={3} sx={{ flex: 4}}>
                        {
                           
                        }            
                    </Grid>
                </div>
              </Box>
            )}
          </div>
        );
      }

    const mui_theme = useTheme();
    const { fullday, lunch } = useAppSelector((state) => state.menu)

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper'}}>
       <AppBarNav />
       <Box sx={{ pt: 3, pl: 3}}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="All Day Menu" />
                <Tab label="Lunch Special"  />
            </Tabs>
        </Box>

        { !isEmpty(fullday) &&  <TabPanel value={value} index={0} menu={fullday} />}

        { !isEmpty(lunch) && <TabPanel value={value} index={1} menu={lunch} />}            
    </Box>
}
  
  export default MenuPage



