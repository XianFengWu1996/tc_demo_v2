import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material"

export const Schedule = () => {
    return <Grid item xs={12} sm={12} md={6}>
        <Typography>Schedule Time</Typography>
        <FormControl sx={{ width: '100px', mt: 1, mr:0.5}}>
            <InputLabel id="demo-simple-select-label">Hour</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                value={0}
                label="Hour"
                onChange={() => {}}
            >
                <MenuItem value={10}>11</MenuItem>
                <MenuItem value={20}>12</MenuItem>
                <MenuItem value={30}>13</MenuItem>
            </Select>
        </FormControl>

        <FormControl sx={{ width: '130px', mt: 1}}>
            <InputLabel id="demo-simple-select-label">Minute</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                value={0}
                label="Minute"
                onChange={() => {}}
            >
                <MenuItem value={10}>00</MenuItem>
                <MenuItem value={20}>05</MenuItem>
                <MenuItem value={30}>10</MenuItem>
                <MenuItem value={30}>15</MenuItem>
                <MenuItem value={30}>20</MenuItem>
            </Select>
        </FormControl>


    </Grid>
}