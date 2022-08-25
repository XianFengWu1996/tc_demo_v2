import { Button, ButtonGroup, Typography } from "@mui/material"
import { AiOutlineCreditCard } from "react-icons/ai"
import { MdOutlineStoreMallDirectory } from "react-icons/md"

export const PaymentOptions = () => {
    return <ButtonGroup fullWidth size="large" sx={{ my: 2}}>
            <Button>
                <AiOutlineCreditCard size={22} />
                <Typography sx={{ ml: 0.7}}>Pay Online</Typography>
            </Button>    
            <Button>
                <MdOutlineStoreMallDirectory size={22} />
                <Typography sx={{ ml: 0.7}}>Pay In Store</Typography>
            </Button>
    </ButtonGroup>
}