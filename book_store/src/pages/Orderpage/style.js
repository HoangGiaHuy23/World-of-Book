import { InputNumber } from "antd"
import styled from "styled-components"

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