import { Form, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.div`
    font-size: 16px;
    color: #000;
    font-weight: 500;
`
export const WrapperFormItem = styled(Form.Item)`
    .ant-col.ant-col-16.ant-col-offset-8.ant-form-item-control.css-dev-only-do-not-override-1okl62o {
        margin: 0; 
        display: flex; 
        max-width: 100%; 
        align-items: center;
    }
`

export const WrapperUploadFile = styled(Upload)`
    .ant-upload-list.ant-upload-list-text {
        display: none
    }
`
