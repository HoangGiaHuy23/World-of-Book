import React from "react";
import { WrapperPasswordStyle } from "./style";

const PasswordComponent = (props) => {
  const { placeholder = "Nhập text", ...rests } = props;
  const handleOnChangeInput = (e) => {
    props.onChange(e.target.value)
  }

  return (
    <WrapperPasswordStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnChangeInput} />
  )
};

export default PasswordComponent