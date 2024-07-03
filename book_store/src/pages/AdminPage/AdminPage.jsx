import { Menu } from 'antd'
import React, { useState } from 'react'
import { AppstoreOutlined, UserOutlined, ShopOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminOrder from '../../components/AdminOrder/AdminOrder';

function AdminPage() {
  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return (
          <AdminUser />
        )
      case 'product':
        return (
          <AdminProduct />
        )
      case 'order':
        return (
          <AdminOrder/>
        )
      default:
        return <></>
    }
  }
  const items = [
    {
      key: 'user',
      icon: <UserOutlined />,
      label: 'Người dùng',
    },
    {
      key: 'product',
      icon: <AppstoreOutlined />,
      label: 'Sản phẩm',
    },
    {
      key: 'order',
      icon: <ShopOutlined />,
      label: 'Đơn hàng',
    },
  ];
  const [keySelected, setKeySelected] = useState('')
  const handleOnClick = ({ key }) => {
    setKeySelected(key)
  }
  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenIcon />
      <div style={{ display: 'flex' }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            minHeight: '90vh'
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: 15}}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}
export default AdminPage
