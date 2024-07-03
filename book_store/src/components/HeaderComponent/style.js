import styled from 'styled-components'
import { Row } from 'antd'

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: #FFFF;
    align-items: center;
    gap: 10px;
    flex-wrap: nowrap;
`

export const Menu = styled.div`
    font-size: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    float: right;
`

export const WrapperIcon = styled.div`
    float: right;
    font-size: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 25px;
`


export const WrapperContentPopup = styled.p`
    cursor: pointer;
    font-size: 1.2em;
    font-weight: 500;
    &:hover {
        color: red;
    }
`
