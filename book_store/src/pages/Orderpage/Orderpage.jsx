import { Checkbox, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { WrapperInputNumber, WrapperQualityProduct } from './style'
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons'
import ButtonComponent from '../../components/ButtonComponent/ButonComponent'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseAmount, checkOrderProduct, uncheckOrderProduct , increaseAmount, removeOrderProduct, payOrder } from '../../redux/slices/orderSlice'
import { useNavigate } from 'react-router-dom'

function OrderPage() {
  const order = useSelector((state) => state.order)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [listChecked, setListChecked] = useState([])
  const [totalBill, setTotalBill] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(32000)
  const formatNumber = (number) => {
    const str = number.toString().split('.')[0]
    let result = ""
    let i = str.length - 1
    let count = 0
    while (i >= 0) {
      if (count % 3 === 0 && i !== (str.length - 1)) {
        result = "." + result;
      }
      result = str[i] + result;
      i--;
      count++;
    }
    if (result.startsWith(".")) {
      result = result.substring(1);
    }
    return result;
  }
  const handleSelectedProduct = (e) => {
    if (e.target.checked) {
      setListChecked([...listChecked, e.target.name])
    } else {
      const newListChecked = listChecked.filter((item) => item !== e.target.name)
      setListChecked(newListChecked)
    }
  }
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product)
      })
      setListChecked(newListChecked)
    } else {
      setListChecked([])
    }
  }

  useEffect(() => {
    let newTotalBill = 0
    order?.orderItems?.map((item) => {
      if (listChecked.includes(item?.product)) {
        const productsBill = item?.price * (1 - item?.discount) * item?.amount
        newTotalBill += productsBill
      }
    })
    setTotalBill(newTotalBill)
  }, [listChecked])

  useEffect(() => {
    if (totalBill === 0) {
      setDeliveryFee(0)
    } else if (0 < totalBill && totalBill < 300000) {
      setDeliveryFee(32000)
    } else setDeliveryFee(0)
  }, [totalBill]);
  const handlePayOrder = () => {
    order?.orderItems?.map((item) => {
      if (listChecked.includes(item?.product)) {
        dispatch(checkOrderProduct(item?.product))
      }
      else
      {
        dispatch(uncheckOrderProduct(item?.product))
      }
    })
    dispatch(payOrder([deliveryFee, totalBill]))
    navigate('/check-out')
  }
  const handleChangeCount = (type, idProduct) => {
    if (type === 'increase') {
      dispatch(increaseAmount({ idProduct }))
      if (listChecked.includes(idProduct)) {
        const newListChecked = listChecked.filter((item) => item !== idProduct)
        setListChecked(newListChecked)
        setListChecked([...listChecked, idProduct])
      }
    } else if (type === 'decrease') {
      dispatch(decreaseAmount({ idProduct }))
      if (listChecked.includes(idProduct)) {
        const newListChecked = listChecked.filter((item) => item !== idProduct)
        setListChecked(newListChecked)
        setListChecked([...listChecked, idProduct])
      }
    }
  }
  const handleDeleteProduct = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }))
    if (listChecked.includes(idProduct)) {
      const newListChecked = listChecked.filter((item) => item !== idProduct)
      setListChecked(newListChecked)
    }
  }
  return (
    <div>
      <h1 style={{ fontSize: '26px', fontWeight: '500', marginBottom: '15px' }}>Giỏ hàng</h1>

      <Row>
        <Col span={17} style={{ borderBottom: '0.2px solid #ccc' }}>
          <Row style={{ backgroundColor: '#fff', marginBottom: '10px', padding: '15px', borderRadius: '10px', borderBottom: '0.5px solid #ccc' }}>
            <Col span={1}>
              <Checkbox onChange={handleSelectAllChange} checked={listChecked.length === order?.orderItems?.length}></Checkbox>
            </Col>
            <Col span={14}>
              Chọn tất cả ({order?.orderItems?.length} sản phẩm)
            </Col>
            <Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
              Số lượng
            </Col>
            <Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
              Thành tiền
            </Col>
            <Col span={1}></Col>
          </Row>
          {order?.orderItems?.map((order) => {
            return (
              <Row style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '2px' }}>
                <Col span={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Checkbox onChange={handleSelectedProduct} name={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                </Col>
                <Col span={14}>
                  <Row>
                    <Col span={7} style={{ display: 'flex', justifyContent: 'center' }}>
                      <img src={order?.image} alt="Book's image" style={{ width: '75%' }} />
                    </Col>
                    <Col span={17} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>{order?.name}</div>
                      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ fontSize: '1.2em', lineHeight: '1.2em', color: '#333', fontWeight: '500', marginRight: '10px' }}>
                          {order?.price ? formatNumber(order?.price * (1 - order?.discount)) : 0} đ
                        </div>
                        <div style={{
                          color: '#7A7E7F !important', textDecoration: 'line-through', fontSize: '0.95em',
                          paddingleft: '10px', alignSelf: 'center', fontWeight: 'normal !important'
                        }}>
                          {order?.price ? formatNumber(order?.price) : 0} đ
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <WrapperQualityProduct>
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product)}>
                      <MinusOutlined style={{ color: '#000', fontSize: '14px' }} size="14" />
                    </button>
                    <WrapperInputNumber defaultValue={1} value={order?.amount || 1} />
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product)}>
                      <PlusOutlined style={{ color: '#000', fontSize: '14px' }} size="14" />
                    </button>
                  </WrapperQualityProduct>
                </Col>
                <Col span={4} style={{
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'center', color: '#C92127', fontWeight: '700', fontSize: '1.2em', alignItems: 'center'
                }}>
                  {order?.price ? formatNumber(order?.price * (1 - order?.discount) * order?.amount) : 0} đ
                </Col>
                <Col span={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><DeleteOutlined style={{ color: 'red', fontSize: '24px', cursor: 'pointer' }} onClick={() => handleDeleteProduct(order?.product)} /></Col>
              </Row>
            )
          })}
        </Col>
        <Col span={1}></Col>
        <Col span={6}>
          <Row style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px 20px', backgroundColor: '#fff' }}>
            <div>Thành tiền</div>
            <div style={{ fontSize: '1.15em' }}>{formatNumber(totalBill)} đ</div>
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px 20px', backgroundColor: '#fff' }}>
            <div style={{ maxWidth: '60%' }}>Phí vận chuyển (Giao hàng tiêu chuẩn)</div>
            <div style={{ fontSize: '1.15em' }}>{deliveryFee === 0 && totalBill > 0 ? `Miễn phí` : `${formatNumber(deliveryFee)} đ`}</div>
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px 20px', backgroundColor: '#fff', borderTop: '0.2px dotted #ccc' }}>
            <div style={{ fontWeight: '600' }}>Tổng Số Tiền (gồm VAT)</div>
            <div style={{ color: '#C92127', fontSize: '1.4em', fontWeight: '650' }}>{formatNumber(totalBill + deliveryFee)} đ</div>
          </Row>
          <Row style={{ backgroundColor: '#fff' }}>
            <ButtonComponent
              size={40}
              styleButton={{
                background: '#C92127',
                height: '44px',
                width: '90%',
                border: '2px solid #C92127',
                borderRadius: '8px',
                margin: '10px 5% 0 5%'
              }}
              textButton={'Thanh toán'}
              disabled={totalBill === 0}
              onClick={handlePayOrder}
              styleTextButton={{ color: '#fff', fontSize: '1.2em', fontWeight: '600' }}
            ></ButtonComponent>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default OrderPage