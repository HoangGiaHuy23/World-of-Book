import React, { useEffect, useState } from 'react'
import { WrapperTextValue, WrapperLabelText, WrapperContent } from './style'
import { Checkbox } from 'antd'
import * as ProductService from '../../services/ProductService';
import TypeProduct from "../TypeProduct/TypeProduct";
import { useNavigate } from 'react-router-dom';

const NavBarComponent = () => {
  const [typeProduct, setTypeProduct] = useState([])
  const navigate = useNavigate()
  const onChange = () => {

  }

  const priceOptions = [
    { label: "0đ - 150,000đ", value: "0-150000" },
    { label: "150,000đ - 300,000đ", value: "150000-300000" },
    { label: "300,000đ - 500,000đ", value: "300000-500000" },
    { label: "500,000đ - 700,000đ", value: "500000-700000" },
    { label: "700,000đ - Trở Lên", value: "700000-" },
  ];
  
  const providerOptions = [
    { label: "Nhã Nam", value: "Nhã Nam" },
    { label: "NXB Trẻ", value: "NXB Trẻ" },
    { label: "Đinh Tị", value: "Đinh Tị" },
    { label: "NXB Tổng hợp TPHCM", value: "NXB Tổng hợp TPHCM" },
    { label: "Phụ nữ", value: "Phụ nữ" },
  ];

  const ageOptions = [
    { label: "3+", value: "3+" },
    { label: "5 - 10", value: "5 - 10" },
    { label: "10 - 12", value: "10 - 12" },
    { label: "12 - 16", value: "12 - 16" },
    { label: "16+", value: "16+" },
  ];

  const bookCoverOptions = [
    { label: "Bìa mềm", value: "Bìa mềm" },
    { label: "Bìa cứng", value: "Bìa cứng" },
    { label: "Bộ Hộp", value: "Bộ Hộp" },
  ];

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    setTypeProduct(res?.data)
  }

  useEffect(() => {
    fetchAllTypeProduct()
  }, [])

  const handleNavigateCategory = () => {
    navigate("/category/:type");
    window.location.reload();
  };

  return (
    <div>
      <WrapperLabelText>Nhóm sản phẩm</WrapperLabelText>
      <WrapperContent>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            rowGap: '15px'
          }}
        >
          <WrapperTextValue onClick={handleNavigateCategory}>Tất cả sản phẩm</WrapperTextValue>
          {typeProduct.map((item) => {
            return (
              <WrapperTextValue><TypeProduct name={item} key={item} /></WrapperTextValue>
            )
          })}
        </div>
      </WrapperContent>
      <WrapperLabelText>Giá</WrapperLabelText>
      <WrapperContent>
        <WrapperTextValue style={{ display: 'grid', gridTemplateColumns: '1fr', paddingLeft: '5px' }}>
          {priceOptions.map(option => (
            <Checkbox key={option.value} value={option.value} style={{ padding: '5px' }}>
              {option.label}
            </Checkbox>
          ))}
        </WrapperTextValue>
      </WrapperContent>
      <WrapperLabelText>Nhà cung cấp</WrapperLabelText>
      <WrapperContent>
        <WrapperTextValue style={{ display: 'grid', gridTemplateColumns: '1fr', paddingLeft: '5px' }}>
          {providerOptions.map(option => (
            <Checkbox key={option.value} value={option.value} style={{ padding: '5px' }}>
              {option.label}
            </Checkbox>
          ))}
        </WrapperTextValue>
      </WrapperContent>
      <WrapperLabelText>Độ tuổi</WrapperLabelText>
      <WrapperContent>
        <WrapperTextValue style={{ display: 'grid', gridTemplateColumns: '1fr', paddingLeft: '5px' }}>
          {ageOptions.map(option => (
            <Checkbox key={option.value} value={option.value} style={{ padding: '5px' }}>
              {option.label}
            </Checkbox>
          ))}
        </WrapperTextValue>
      </WrapperContent>
      <WrapperLabelText>Hình thức</WrapperLabelText>
      <WrapperContent>
        <WrapperTextValue style={{ display: 'grid', gridTemplateColumns: '1fr', paddingLeft: '5px' }}>
          {bookCoverOptions.map(option => (
            <Checkbox key={option.value} value={option.value} style={{ padding: '5px' }}>
              {option.label}
            </Checkbox>
          ))}
        </WrapperTextValue>
      </WrapperContent>

    </div>
  )
}

export default NavBarComponent