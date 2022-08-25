import { Divider, Typography } from "@mui/material"
import { useAppSelector } from "../../../store/hook"

export const CartSummary = () => {
    const { cartSummary } = useAppSelector(state => state.cart)

    return <div style={{ backgroundColor: '#fff', minWidth: '300px',height:'200px', borderBlock: '1px solid #000', padding: 10}}>
        <DiscountItem label="lunch" amount={cartSummary.discount.lunch}/>
        <DiscountItem label="redemption" amount={cartSummary.discount.redemption}/>
        <Divider /> 
        <SummaryItem label="subtotal" amount={cartSummary.subtotal} />   
        <SummaryItem label="tax" amount={cartSummary.tax} />   
        <SummaryItem label="delivery fee" amount={cartSummary.delivery_fee} />   
        <SummaryItem label="total" amount={cartSummary.total} />   
    </div>
}

interface ISummaryItem {
    label: string,
    amount: number,
}

const DiscountItem = (props: ISummaryItem) => {
    const { label, amount } = props;
    return  <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Typography sx={{ fontSize:14, fontWeight: 600,  textTransform: 'capitalize'}}>{label}:</Typography>
        <Typography sx={{ color: 'green', fontSize: 14, fontWeight: 600}}>-(${(amount ?? 0).toFixed(2)})</Typography>
    </div>
}

const SummaryItem = (props: ISummaryItem) => {
    const { label, amount } = props;
    return <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Typography sx={{ fontSize:14, fontWeight: 600, textTransform: 'capitalize'}}>{label}:</Typography>
        <Typography sx={{ fontSize:14, fontWeight: 600}}>${(amount ?? 0).toFixed(2)}</Typography>
    </div>
}