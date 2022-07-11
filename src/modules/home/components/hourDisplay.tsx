import { OpenHourContainer } from "../styles/styles"

export const OpenHourDisplay = ({ date, close } : { date: string, close: boolean }) => {
    return <OpenHourContainer>
        <div>{date.toUpperCase()}</div>
        <div>{ close ? 'Close' :'11:00AM - 9:50PM'}</div>
    </OpenHourContainer>
}