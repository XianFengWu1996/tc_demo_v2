import { Box, Button, styled } from "@mui/material"
import { isEmpty } from "lodash"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import placeholderImage from '../../../public/assets/images/fallback.jpeg'
import { DishComment } from "./dishComment"
import { DishDetails } from "./dishDetails"
import { DishChoice } from "./dishChoice"

interface IMenuItem {
    dish: IDish
}

const PageContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100vh - 68px)',
    display: 'flex',
    justifyContent: 'left',
    padding: '50px', 
}))

const DetailContainer = styled('div')(() => ({
    marginLeft: 50,
}))

export const MenuItem = ({ dish } :IMenuItem) => { 
    
    const [comment, setComment] = useState<string>('');

    // option related
    const [optionId, setOptionId] = useState<string>('')
    const [option, setOption] = useState<IOption | null>(null)


    const handleCommentChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment(e.target.value);
    }

    const handleOptionIdChange = (choice: IChoice, option: IOption[]) => {
    
    }
    
    return <PageContainer>
           <div>
                <Image
                    src={isEmpty(dish.pic_url) ? placeholderImage.src : dish.pic_url}
                    alt={`Picture of ${dish.en_name}`} 
                    width={300}
                    height={300}
                    layout='fixed'
                />
           </div>

          <DetailContainer> 
            <DishDetails dish={dish}/>
            
            <DishChoice dish={dish} handleChoice={handleOptionIdChange} />

            <DishComment comment={comment} handleCommentChange={handleCommentChange}/>

            <Button variant='contained' color='primary'>Add To Cart | $10.95</Button>
          </DetailContainer>

    </PageContainer>
}





