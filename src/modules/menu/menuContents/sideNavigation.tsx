import { styled, Link as MuiLink } from "@mui/material"
import { Box } from "@mui/system"
import { isEmpty } from "lodash"
import Link from "next/link"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hook"
import { handleCategoryIdChange } from "../../../store/slicer/menuSlicer"

const SideNavContainer = styled(Box)(() => ({
    position: 'sticky', 
    top: '0', 
    left: 0, 
    height: 'calc(100vh - 48px)',
    backgroundColor: 'background.paper', 
    flex: 1, 
    overflow: 'scroll', 
    display: 'flex', 
    flexDirection: 'column', 
    paddingTop:1, 
    marginRight: 2
}))

const StyledMuiLink = styled(MuiLink)(({theme}) => ({
    margin: '5px 0',
    textDecorationThickness: 2,
    textDecorationColor: theme.palette.primary.main,
    textUnderlineOffset: 5,
    cursor: 'pointer'
}))

interface ISideNavigation {
    menu: IMenu,
}

export const SideNavigation = ({ menu }:ISideNavigation) => {
    const dispatch = useAppDispatch();
    const { selectedCategory } = useAppSelector(state => state.menu);

    useEffect(() => {
        if(isEmpty(selectedCategory)){
            dispatch(handleCategoryIdChange({ id: menu.category[0].id}));
        }
    }, [selectedCategory, dispatch, menu])

    return <SideNavContainer>    
        {
            menu.category.map((category) => {
                return <Link key={category.id} href={`#${category.id}`}>
                    <StyledMuiLink 
                        underline={selectedCategory === category.id ? 'always' : 'none'}  
                        onClick={() => dispatch(handleCategoryIdChange({ id: category.id }))}
                    >{category.en_name.toUpperCase()}
                    </StyledMuiLink>
                </Link>
            })
        }
    </SideNavContainer>
}