import { TextField } from "@mui/material"

export const DishComment = () => {
    return <div>
        <TextField
              sx={{ mt: 1, mb:3, width: '600px'}}
              multiline
              minRows={3}
              fullWidth
              placeholder='Leave comment specific to the dish, such as spicy level, allergies, etc'
        />
    </div>
}