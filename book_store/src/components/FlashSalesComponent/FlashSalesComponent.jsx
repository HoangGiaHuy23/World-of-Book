import React, { useEffect, useState } from 'react'
import { WrapperContent } from "./style";
import { Button } from "antd"
import { RightOutlined } from "@ant-design/icons"
import ProductListComponent from '../ProductListComponent/ProductListComponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import Loading from '../LoadingComponent/Loading'



const FlashSalesComponent = () => {
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }
  const { isLoading, data: products } = useQuery({ queryKey: ['products'], queryFn: fetchProductAll, retry: 3, retryDelay: 1000 })
  const [time, setTime] = useState({
    hours: 2,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        const { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          return { hours, minutes, seconds: seconds - 1 };
        }
        if (minutes > 0) {
          return { hours, minutes: minutes - 1, seconds: 59 };
        }
        if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        }

        clearInterval(timerId);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);
  
  return (
    <Loading isLoading={isLoading}>
      <WrapperContent>
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#FFF",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "30px", color: "red", fontWeight: "bold", }}>FLASH SALE</span>
          <span style={{ color: '#000', fontSize: '18px', marginLeft: '25px', }}>
            Kết thúc trong:
            <span style={{ color: '#FFF', backgroundColor: '#000', padding: '5px 5px', borderRadius: '5px', marginLeft: '10px' }}>{String(time.hours).padStart(2, '0')}</span>
            <span> : </span>
            <span style={{ color: '#FFF', backgroundColor: '#000', padding: '5px 5px', borderRadius: '5px' }}>{String(time.minutes).padStart(2, '0')}</span>
            <span> : </span>
            <span style={{ color: '#FFF', backgroundColor: '#000', padding: '5px 5px', borderRadius: '5px' }}>{String(time.seconds).padStart(2, '0')}</span>
          </span>
          <span style={{ color: 'blue', marginLeft: '53%' }}>
            <Button type="link" style={{ fontSize: '18px' }}>Xem tất cả <RightOutlined /></Button>
          </span>
        </div>
        <ProductListComponent list={products} />
      </WrapperContent>
    </Loading>
  )
}

export default FlashSalesComponent