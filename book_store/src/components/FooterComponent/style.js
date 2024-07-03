import styled from 'styled-components'
import { Row } from 'antd'

export const WrapperFooter = styled(Row)`
    padding: 10px 120px;
    background-color: #9EC0CB;
    gap: 10px;
    flex-wrap: nowrap;
`

export const WrapperBoxLeft = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    padding-right: 40px;
`

export const WrapperIcon = styled.div`
    font-size: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 25px;
`

export const WrapperBoxRight = styled(Row)`
    padding-left: 200px;
    border-left: 1px solid #CECECE;
    gap: 30px;
`

export const TextHover = styled.div`
    &:hover{
        color: #FFFF;
    }
`
