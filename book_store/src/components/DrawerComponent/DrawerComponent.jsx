import { Drawer } from 'antd'
import React from 'react'

const DrawerComponent = ({ title = 'Drawer', placement = 'right', isopen, children = false, ... rests}) => {
    return (
        <>
            <Drawer title={title} placement={placement} open={isopen} {...rests}>
                {children}
            </Drawer>
        </>
    )
}

export default DrawerComponent
