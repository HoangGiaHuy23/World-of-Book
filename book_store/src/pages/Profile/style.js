import styled from "styled-components";
import { Row, Col } from 'antd'

export const WrapperContent = styled(Row)`
    gap: 10px;
    color: #000;
    font-size: 18px;
`

export const WrapperBox = styled(Col)`
    background-color: #FFF;
    border-radius: 10px; 
    padding: 10px 10px;
    height: fit-content;
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 14px;
    font-weight: 600;
    width: 30%;
`

export const WrapperSideBarLabel = styled.span`
    cursor: pointer;
    text-transform: uppercase;
    line-height: 100%;
    text-align: left;
    font-weight: 600;
    margin-bottom: 0px;
    font-size: 16px;
    &:hover {
        color: red !important;
    }
`