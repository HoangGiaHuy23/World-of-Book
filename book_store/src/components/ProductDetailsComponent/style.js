import styled from "styled-components";
import { Image, InputNumber } from "antd";

export const WrapperImageSmall = styled(Image)`
    width: 54px;
    height: 76px;
`

export const WrapperNameText = styled.h1`
    font-size: 1.7em;
    font-weight: 600;
    color: #333;
    line-height: 1.5em;
    overflow-wrap: break-word;
    padding-bottom: 16px;
`

export const WrapperRowHeaderText = styled.span`
    color: #333333;
    font-size: 14px;
    font-weight: 400;
`

export const WrapperLinkText = styled.span`
    color: #2489F4;
    font-weight: 680;
    font-size: 14px;
`

export const WrapperHighlightText = styled.span`
    color: #333333;
    font-size: 14px;
    font-weight: 600;
`

export const WrapperRate = styled.span`
    color: #CDCFD0 !important;
    font-size: 14px;
    font-weight: 500;
`

export const PriceBox = styled.div`
    display: flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
`

export const WrapperPriceValue = styled.span`
    font-size: 2.2em;
    line-height: 32px;
    color: #C92127;
    font-weight: 700;
`

export const WrapperOldPriceValue = styled.span`
    margin-left: 8px;
    color: #0D0E0F;
    font-size: 1.4em;    
    font-weight: 400;
    padding-left: 5px;
    text-decoration: line-through;
`

export const WrapperDiscountPercent =  styled.span`
    margin-left: 8px;
    padding: 4px 4px 6px 4px;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    background-color: #C92127;
    color: #fff;
    font-size: 1em;
    font-weight: 600;
`

export const ShareButton =  styled.div`
    background: url(https://cdn-icons-png.freepik.com/256/508/508214.png?semt=ais_hybrid) no-repeat center center;
    background-size: 20px;
    border-radius: 20px;
    box-shadow: 0px 3px 6px #00000029;
    min-height: 40px;
    min-width: 40px;
    cursor: pointer;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
    margin-left: 8px;
`
export const WrapperAmountText = styled.span`
    color: #555555;
    line-height: 32px;
    height: 32px;
    font-size: 1.2em;
    font-weight: 650;
    padding: 0 8px 0 0;
    margin-bottom: 0;
    text-align: left;
    max-width: 200px;
    min-width: 150px;
`

export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 100px;
    height: 32px;
    border: 1px solid #ccc;
    border-radius: 4px;
    justify-content: center;
`
export const WrapperInputNumber = styled (InputNumber)`
    border: none;
    &.ant-input-number.css-dev-only-do-not-override-1okl62o.ant-input-number-outlined {
        width: 40px;
        .ant-input-number-handler-wrap{
            display: none;
        }
        .ant-input-number-input-wrap{
            text-align: center;
        }
    }
`
