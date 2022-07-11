import { Typography } from "@mui/material"
import { AiOutlineUser } from "react-icons/ai"
import { TestimonyAuthor, TestimonyContents } from "../styles/styles"

export const TestimonyDetails = ({ contents, author } :ITestimonyDetails) => {
    return <>
        <span style={{ color: '#fff', fontSize: '400%'}}>&#8220;</span>
        <TestimonyContents> { contents } </TestimonyContents>

        <TestimonyAuthor>
            <AiOutlineUser color='#fff' size={25}/>
            <Typography sx={{ color: '#fff'}}>{author}</Typography>
        </TestimonyAuthor>
    </>
}