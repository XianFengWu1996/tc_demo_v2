import { Grid, TextField, Typography } from "@mui/material"

export const Redemption = () => {
    return <Grid item xs={12} sm={12} md={6}>
        <Typography>Redemption</Typography>
        <TextField id="redemption-input" variant="outlined" size="small" label={'Points Available: 3500'} sx={{ my: 0.5, width: '300px'}}/>
    </Grid>
}