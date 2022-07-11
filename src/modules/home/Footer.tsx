import { Typography } from "@mui/material"
import { FooterContainer } from "./styles/styles"

export const Footer = () => {
    const date = new Date()
    return <FooterContainer>
        <Typography>Contact us</Typography>
        <Typography>617-328-4188</Typography>
        <Typography>617-328-4288</Typography>
        <Typography>Copyright © {date.getFullYear()} by Taipei Cuisine. All rights reserved.</Typography>
    </FooterContainer>
}