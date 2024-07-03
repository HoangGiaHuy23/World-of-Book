import { Card } from "antd";
import styled from "styled-components";

export const CustomCard = styled(Card)`
    .ant-card-body {
        padding: 5px;
    }
`

export const ProductName = styled.div`
    padding-top: 0px !important;
    line-height: 1.4em;
    word-break: break-word;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    min-height: 2.8em;
    max-height: 2.8em;
    font-size: 1em;
    color: #333333;
`
export const Price = styled.div`
    margin: 0px;
    background-color: transparent !important;
    display: flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    -webkit-align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
`
export const SpecialPrice = styled.span`
    line-height: 1.6rem;
    font-size: 1.6rem !important;
    color: #C92127;
    font-weight: 600;
`
export const Discount = styled.span`
    margin-left: 8px;
    padding: 3px 4px;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    background-color: #C92127;
    color: #fff;
    font-size: 1em;
    font-weight: 600;
    letter-spacing: 0px;
}
`
export const OldPrice = styled.span`
    color: #888888;
    text-decoration: line-through;
    font-size: 1.4rem !important;
`