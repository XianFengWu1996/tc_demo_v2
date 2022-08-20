import { Box, Button, Typography } from "@mui/material";
import { AppBarNav } from "../../modules/appbar/appbar";

export default function CheckoutPage () {
    return <>
        <AppBarNav />
        <Typography>Checkout</Typography>

        <Box>
            <Typography>Delivery</Typography>
            <Button>Change</Button>
        </Box>
    </>
}