import React, { useEffect, useState } from "react";
import { Badge, Col, Image, Popover } from 'antd';
import { WrapperHeader, Menu, WrapperIcon, WrapperContentPopup } from "./style";
import { MenuOutlined, CaretDownOutlined, BellOutlined, ShoppingCartOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import WoB from '../../assets/images/WoB_logo.png'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService';
import * as ProductService from '../../services/ProductService';
import { resetUser } from "../../redux/slices/userSlice";
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/slices/productSlice";
import TypeProduct from "../TypeProduct/TypeProduct";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenIcon = false }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const order = useSelector((state) => state.order)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [typeProduct, setTypeProduct] = useState([])
  const [isHovered, setIsHovered] = useState(false);

  
  const handleLogoOnClick = () => {
    navigate('/')
  }
  const handleNavigateLogin = () => {
    navigate('/signin')
  }
  const handleCartOnClick = () => {
    navigate('/order')
  }
  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    localStorage.removeItem('access_token')
    setLoading(false)
    navigate('/')
  }
  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value, 'e.target.value')
    dispatch(searchProduct(e.target.value))
  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    setTypeProduct(res?.data)
  }
  
  useEffect(() => {
    fetchAllTypeProduct()
  }, [])

  return (
    <div>
      <WrapperHeader style= {{justifyContent: isHiddenSearch && isHiddenIcon ? 'space-between': 'unset', background: isHiddenSearch && isHiddenIcon ? 'rgb(184 231 255)' : 'none'}}>
        <Col span={4}>
          <Image src={WoB} alt='weblogo' preview={false} height='50px' width='160px' style={{cursor: 'pointer'}} onClick={handleLogoOnClick}/>
        </Col>
        {!isHiddenIcon && (
          <Col span={2}>
            <Menu
              onMouseEnter={() => setIsHovered(true)}
              style={{ cursor: 'pointer' }}
            >
              <MenuOutlined />
              <CaretDownOutlined style={{ fontSize: '20px' }}/>
            </Menu>
            {isHovered && (
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 1fr', 
                  gap: '10px',
                  position: 'absolute', 
                  background: 'white', 
                  zIndex: 1, 
                  width: '600px', 
                  marginTop: '40px',
                  border: '1px solid grey',
                  borderRadius: '10px',
                  padding: '15px 15px',
                  fontWeight: 'bold' 
                }}
                onMouseLeave={() => setIsHovered(false)}
              >
                {typeProduct.map((item) => {
                  return (
                    <TypeProduct name={item} key={item} />
                  )
                })}
              </div>
            )}
          </Col>
        )}
        {!isHiddenSearch && (
          <Col span={12}>
            <ButtonInputSearch onChange = {onSearch} />
          </Col>
        )}
        <Col span={5}>
          <WrapperIcon style={{ gridTemplateColumns: user?.name ? (isHiddenSearch && isHiddenIcon ? '4fr 1fr 1fr 1fr' : '1fr 1fr 1fr 4fr') : '1fr 1fr 1fr 1fr'}}>
            {!isHiddenIcon && (
              <div>
                <Badge count={2}>
                  <BellOutlined style={{ fontSize: '30px', cursor: 'pointer' }} />
                </Badge>
              </div>
            )}
            {!isHiddenIcon && (
              <div>
                <Badge count={order?.orderItems?.length}>
                  <ShoppingCartOutlined style={{ fontSize: '30px', cursor: 'pointer' }} onClick={handleCartOnClick}/>
                </Badge>
              </div>
            )}
            {!isHiddenIcon && (
              <div>
                <HeartOutlined style={{ cursor: 'pointer' }}/>
              </div>
            )}
            {user?.name ? (
              <Loading isLoading={loading}>
                <Popover content={content} trigger="click">
                  <div style={{ fontSize: '18px', paddingTop: '8px', color: 'blue', cursor: 'pointer', fontWeight: '600' }}>
                    {user?.name.split(" ")[user?.name.split(" ").length - 2]} {user?.name.split(" ")[user?.name.split(" ").length - 1]}
                  </div>
                </Popover>
              </Loading>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                <UserOutlined />
              </div>
            )}
          </WrapperIcon>
        </Col>
      </WrapperHeader>
    </div>
  );
}

export default HeaderComponent;
