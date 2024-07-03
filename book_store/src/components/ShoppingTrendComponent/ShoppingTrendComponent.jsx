import React from "react";
import { WrapperContent } from "./style";
import TabsComponent from "../TabsComponent/TabsComponent";
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import Loading from '../LoadingComponent/Loading';

const ShoppingTrend = () => {
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }
  const { isLoading, data: products } = useQuery({ queryKey: ['products'], queryFn: fetchProductAll, retry: 3, retryDelay: 1000 })
  return (
    <Loading isLoading={isLoading}>
      <WrapperContent>
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#FF6666",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Xu hướng mua sắm
        </div>
        <TabsComponent list={products} />
      </WrapperContent>
    </Loading>
  );
}

export default ShoppingTrend;
