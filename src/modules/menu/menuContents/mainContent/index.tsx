import { Box } from "@mui/material";
import { SideNavigation } from "../sideNavigation";
import { DishList } from "./dishList";

interface IMenuContents {
    menu: IMenu,
    index: number;
    value: number;
}

// the main contents will be consist of two part, the side navigation and the list of the dishes
export const MenuContents = (props:IMenuContents) => {
    const { menu, value, index,  ...other } = props;

    return <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ p: 3, display: 'flex' }}>
        <SideNavigation menu={menu} />

        <DishList menu={menu} />
      </Box>
    )}
  </div>
}