import { TextField } from "@mui/material"
import { ChangeEvent } from "react"

interface IDishComment {
    comment: string,
    handleCommentChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const DishComment = ({comment, handleCommentChange}:IDishComment) => {
    return <div>
        <TextField
              sx={{ mt: 1, mb:3, width: '600px'}}
              multiline
              minRows={3}
              fullWidth
              placeholder='Leave comment specific to the dish, such as spicy level, allergies, etc'
              value={comment}
              onChange={handleCommentChange}
        />
    </div>
}