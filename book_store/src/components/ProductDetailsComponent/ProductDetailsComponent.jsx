import { Col, Image, Rate, Row } from 'antd'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PriceBox, ShareButton, WrapperAmountText, WrapperDiscountPercent, WrapperHighlightText, WrapperImageSmall, WrapperInputNumber, WrapperLinkText, WrapperNameText, WrapperOldPriceValue, WrapperPriceValue, WrapperQualityProduct, WrapperRate, WrapperRowHeaderText } from './style'
import ButtonComponent from '../ButtonComponent/ButonComponent'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import * as ProductService from '../../services/ProductService';
import Loading from '../LoadingComponent/Loading';
import { useDispatch } from 'react-redux'
import { addOrderProduct } from '../../redux/slices/orderSlice'
import { useNavigate } from "react-router-dom";

const ProductDetailsComponent = ({ idProduct }) => {
  const onChange = () => { }
  const navigate = useNavigate()
  const [count, setCount] = useState(1)
  const dispatch = useDispatch()
  const handleMinus = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }
  const handlePlus = () => {
    setCount(count + 1)
  }
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
  const [stateDetailsProduct, setStateDetailsProduct] = useState({
    name: '',
    type: '',
    price: '',
    discount: '',
    provider: '',
    author: '',
    publisher: '',
    publisherYear: '',
    weight: '',
    packagingSize: '',
    pages: '',
    form: '',
    description: '',
    countInStock: '',
    image: '',
    rating: '0',
  });

  const fetchGetDetailsProduct = async () => {
    const res = await ProductService.getDetailsProduct(idProduct)
    return res.data
  }

  const { isLoading: isLoadingProducts, data: productDetails } = useQuery({ queryKey: ['products'], queryFn: fetchGetDetailsProduct, retry: 3, retryDelay: 1000, enabled: !!idProduct })
  const handleAddOrderProduct = () => {
    dispatch(addOrderProduct({
      orderItem: {
        name: productDetails?.name,
        amount: count,
        image: productDetails?.image,
        price: productDetails?.price,
        discount: productDetails?.discount,
        product: productDetails?._id
      }
    }))
  }
  const handleBuyProduct = () => {
    dispatch(addOrderProduct({
      orderItem: {
        name: productDetails?.name,
        amount: count,
        image: productDetails?.image,
        price: productDetails?.price,
        discount: productDetails?.discount,
        product: productDetails?._id
      }
    }))
    navigate('/order')
  }
  return (
    <Loading isLoading={isLoadingProducts}>
      <Row style={{ background: 'white', padding: '16px 16px 25px 16px', borderRadius: '8px', height: '510px' }}>
        <Col span={9} style={{ height: '500px', }}>
          <div>
            <Row style={{ height: '410px', }}>
              <Col span={3}>
                <Row><WrapperImageSmall src={productDetails?.image} alt='image-small' preview={false} /></Row>
                <Row><WrapperImageSmall src={productDetails?.image} alt='image-small' preview={false} /></Row>
                <Row><WrapperImageSmall src={productDetails?.image} alt='image-small' preview={false} /></Row>
                <Row><WrapperImageSmall src={productDetails?.image} alt='image-small' preview={false} /></Row>
              </Col>
              <Col span={21} style={{ paddingTop: '5px', display: 'flex', justifyContent: 'center' }}><Image style={{ maxHeight: '392px', maxWidth: '100%', height: 'auto', width: 'auto' }} src={productDetails?.image} alt='product-image' preview={false} /></Col>
            </Row>
            <Row>
              <ButtonComponent
                size={32}
                styleButton={{
                  background: '#fff',
                  height: '44px',
                  width: '220px',
                  border: '2px solid #C92127',
                  borderRadius: '8px',
                  margin: '20px 10px 0 0'
                }}
                textButton={'Thêm vào giỏ hàng'}
                onClick={handleAddOrderProduct}
                styleTextButton={{ color: '#C92127', fontSize: '1.2em', fontWeight: '600' }}
              ></ButtonComponent>
              <ButtonComponent
                size={32}
                styleButton={{
                  background: '#C92127',
                  height: '44px',
                  width: '220px',
                  border: '2px solid #C92127',
                  borderRadius: '8px',
                  margin: '20px 0 0 10px'
                }}
                textButton={'Mua ngay'}
                onClick={handleBuyProduct}
                styleTextButton={{ color: '#fff', fontSize: '1.2em', fontWeight: '600' }}
              ></ButtonComponent>
            </Row>
          </div>
        </Col>
        <Col span={15}>
          <div>
            <Row><WrapperNameText>{productDetails?.name}</WrapperNameText></Row>
            <Row style={{ paddingBottom: '8px' }}>
              <Col span={16}><WrapperRowHeaderText>Nhà cung cấp: </WrapperRowHeaderText><WrapperLinkText>{productDetails?.provider}</WrapperLinkText></Col>
              <Col span={8}><WrapperRowHeaderText>Tác giả: </WrapperRowHeaderText><WrapperHighlightText>{productDetails?.author}</WrapperHighlightText></Col>
            </Row>
            <Row>
              <Col span={16}><WrapperRowHeaderText>Nhà xuất bản: </WrapperRowHeaderText><WrapperHighlightText>{productDetails?.publisher}</WrapperHighlightText></Col>
              <Col span={8}><WrapperRowHeaderText>Hình thức bìa: </WrapperRowHeaderText><WrapperHighlightText>{productDetails?.form}</WrapperHighlightText></Col>
            </Row>
            <Row style={{ paddingTop: '10px' }}>
              <Rate disabled defaultValue={productDetails?.rating} />
              <WrapperRate>(0 đánh giá)</WrapperRate>
            </Row>
            <Row style={{ padding: '14px 0 16px 0' }}>
              <Col span={22}>
                <PriceBox>
                  <WrapperPriceValue>{productDetails?.price ? formatNumber(productDetails?.price * (1 - productDetails?.discount)) : 0} đ</WrapperPriceValue>
                  <WrapperOldPriceValue>{productDetails?.price ? formatNumber(productDetails?.price) : 0} đ</WrapperOldPriceValue>
                  <WrapperDiscountPercent>-{productDetails?.discount * 100}%</WrapperDiscountPercent>
                </PriceBox>
              </Col>
              <Col span={1}><ShareButton></ShareButton></Col>
              <Col span={1}></Col>
            </Row>
            <Row style={{ paddingBottom: '10px' }}>
              <Col span={5}><WrapperRowHeaderText>Thời gian giao hàng</WrapperRowHeaderText></Col>
              <Col span={19}><WrapperRowHeaderText>Giao hàng đến </WrapperRowHeaderText><WrapperLinkText>Thay đổi</WrapperLinkText></Col>
            </Row>
            <Row style={{ paddingBottom: '15px' }}>
              <Col span={5}><WrapperRowHeaderText>Chính sách đổi trả</WrapperRowHeaderText></Col>
              <Col span={19}><WrapperRowHeaderText>Đổi trả sản phẩm trong 30 ngày </WrapperRowHeaderText><WrapperLinkText>Xem thêm</WrapperLinkText></Col>
            </Row>
            <Row>
              <Col span={5}><WrapperAmountText>Số lượng:</WrapperAmountText></Col>
              <Col>
                <WrapperQualityProduct>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={handleMinus}>
                    <MinusOutlined style={{ color: '#000', fontSize: '14px' }} size="14" />
                  </button>
                  <WrapperInputNumber defaultValue={1} value={count} onChange={onChange} />
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={handlePlus}>
                    <PlusOutlined style={{ color: '#000', fontSize: '14px' }} size="14" />
                  </button>
                </WrapperQualityProduct>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row style={{ background: 'white', padding: '16px 16px 25px 16px', marginTop: '30px', borderRadius: '8px', height: '100%', maxHeight: '600px' }}>
        <Col style={{ width: '100%' }}>
          <Row style={{ fontSize: '1.4em', fontWeight: '600', paddingBottom: '15px' }}>Thông tin sản phẩm</Row>
          <Row style={{ fontSize: '1em', padding: '5px 0' }}>
            <Col span={6}>Tên Nhà Cung Cấp</Col>
            <Col span={18}>{productDetails?.provider}</Col>
          </Row>
          <Row style={{ fontSize: '1em', padding: '5px 0' }}>
            <Col span={6}>Tác giả</Col>
            <Col span={18}>{productDetails?.author}</Col>
          </Row>
          <Row style={{ fontSize: '1em', padding: '5px 0' }}>
            <Col span={6}>NXB</Col>
            <Col span={18}>{productDetails?.publisher}</Col>
          </Row>
          <Row style={{ fontSize: '1em', padding: '5px 0' }}>
            <Col span={6}>Năm XB</Col>
            <Col span={18}>{productDetails?.publisherYear}</Col>
          </Row>
          <Row style={{ fontSize: '1em', padding: '5px 0' }}>
            <Col span={6}>Trọng lượng (gr)</Col>
            <Col span={18}>{productDetails?.weight}</Col>
          </Row>
          <Row style={{ fontSize: '1em', padding: '5px 0' }}>
            <Col span={6}>Kích Thước Bao Bì</Col>
            <Col span={18}>{productDetails?.packagingSize}</Col>
          </Row>
          <Row style={{ fontSize: '1em', padding: '5px 0' }}>
            <Col span={6}>Số trang</Col>
            <Col span={18}>{productDetails?.pages}</Col>
          </Row>
          <Row style={{ fontSize: '1em', padding: '5px 0' }}>
            <Col span={6}>Hình thức</Col>
            <Col span={18}>{productDetails?.form}</Col>
          </Row>
          <Row style={{ paddingBottom: '15px', borderBottom: '1px solid #ccc' }}></Row>
          <Row style={{ fontSize: '1em', padding: '20px 0', lineHeight: '1.4em' }}>Mô tả</Row>
          <Row style={{fontSize: '1.05em'}} dangerouslySetInnerHTML={{ __html: productDetails?.description }}></Row>
        </Col>
      </Row>
    </Loading>
  )
}

export default ProductDetailsComponent
