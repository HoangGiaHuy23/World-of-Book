import styled from "styled-components";

export const WrapperContent = styled.div`
    display: flex;
    //align-items: center;
    flex-direction: column;
    gap: 12px;
    margin: 10px 0 20px;
`
export const WrapperLabelText = styled.span`
    cursor: pointer;
    text-transform: uppercase;
    line-height: 100%;
    padding: 10px 0;
    text-align: left;
    font-weight: 600;
    margin-bottom: 0px;
    font-size: 13px;
`

export const WrapperTextValue = styled.span`
    color: #666;
    padding: 0 0 0 10px;
    display: inline;
    zoom: 1;
    font-size: 14px;
    text-transform: capitalize;
    cursor: pointer;
`
export const WrapperSelectedTextValue = styled.span`
    color: #F7941E;
    font-weight: bold;
    font-size: 14px;
`