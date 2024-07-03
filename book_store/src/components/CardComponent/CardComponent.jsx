import React from 'react';
import { ProductName, Discount, SpecialPrice, Price, OldPrice, CustomCard } from './style';
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
  const navigate = useNavigate()
  const { id, name, price, discount, image } = props
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
  const handleOnClick = () => {
    navigate(`/product-details/${id}`)
  }
  return (
      <CustomCard
        className='bodyPadding'
        hoverable
        bordered
        style={{ width: 220, alignItems: 'center', display: 'flex', flexDirection: 'column' }}
        cover={<img alt="book's image" style={{ width: '100%', height: 190, paddingTop: 5 }} src={image}/>}
        onClick={handleOnClick} 
      >
        <ProductName>{name}</ProductName>
        <Price style={{height: '38px'}}>
          <SpecialPrice>{formatNumber(price * (1 - discount))} đ</SpecialPrice>
          <Discount>-{discount * 100}%</Discount>
        </Price>
        <Price><OldPrice>{formatNumber(price)} đ</OldPrice></Price>
      </CustomCard>
  );
}

export default CardComponent;