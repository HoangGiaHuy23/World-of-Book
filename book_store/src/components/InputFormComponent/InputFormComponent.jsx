import React from "react";
import { WrapperInputStyle } from "./style";

const InputFormComponent = (props) => {
  const { placeholder = "Nhập....", ...rests } = props;
  const handleOnChangeInput = (e) => {
    props.onChange(e.target.value)
  }

  return (
    <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnChangeInput} />
  )
};

export const InputAdminFormComponent = (props) => {
  const { placeholder = "....", ...rests } = props;
  const handleOnChangeInput = (e) => {
    props.onChange(e)
  }

  return (
    <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnChangeInput} />
  )
};

export default InputFormComponent;
