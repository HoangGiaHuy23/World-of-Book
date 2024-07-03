import React from 'react'
import { Button } from 'antd'

const ButonComponent = ({ size, styleButton, styleTextButton, textButton, disabled, ...rests }) => {
  return (
    <Button
        style={{
            ...styleButton,
            background: disabled ? '#CCC' : styleButton.background,
            border: disabled ? 'none' : styleButton.border,
            cursor: disabled ? 'default' : styleButton.cursor
        }}
        size={size}
        {...rests}
    >
        <span style={styleTextButton}>{textButton}</span>
    </Button>
  )
}

export default ButonComponent