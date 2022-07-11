import { StoreDetailCardContainer, StoreDetailCardContents, StoreDetailCardTitle } from "../styles/styles"

export const StoreDetailCard = ({title, contents, Icon}: IStoreDetailCard) => {
    return <StoreDetailCardContainer>
        <StoreDetailCardContents>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                {Icon}
                <StoreDetailCardTitle>{title}</StoreDetailCardTitle>
            </div>

            <StoreDetailCardContents>
                {contents}
            </StoreDetailCardContents>
        </StoreDetailCardContents>
    </StoreDetailCardContainer>
}