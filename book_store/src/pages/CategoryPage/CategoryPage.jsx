import React, { useEffect, useState } from "react";
import { Pagination, Select, Space } from "antd";
import { WrapperContent, WrapperBox, WrapperList } from "./style";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import { useSelector } from "react-redux";
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import Loading from '../../components/LoadingComponent/Loading';
import ProductListComponent from "../../components/ProductListComponent/ProductListComponent";
import { useDebounce } from "../../hooks/useDebounce";
import { useLocation } from "react-router-dom";

function CategoryPage() {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 1600)
  const [limitType, setLimitType] = useState(24)
  const [loading, setLoading] = useState(false)
  const [typeProducts, setTypeProducts] = useState([])
  const [typePage, setTypePage] = useState(false)
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: limitType,
    total: 1,
  })
  const [panigateSearch, setPanigateSearch] = useState({
    page: 0,
    limit: 10,
    total: 1,
  })

  const handlePanigationChange = (limitType, limit, page, total) => {
    let current = 0, a = 0, b = 0
    a = limit * (page + 1)
    current = (a - (a % limitType)) / limitType
    if (a % limitType !== 0){
      current = current + 1
    }
    a = limitType * (current)
    if (a > total){
      b = ((a - total) - ((a - total) % limitType)) / limitType
      if (b > 0) {
        current = current - b
      }
    }
    setPanigate({...panigate, limit: limitType})
    onChangeSearch(current)
  }

  const handleChange = (value) => {
    let limit = 24
    switch (value) {
      case '12product':
        limit = 12
        break;
      case '24product':
        limit = 24
        break;
      default:
        limit = 48
        break;
    }
    handlePanigationChange(limit, panigate?.limit, panigateSearch?.page, panigateSearch?.total)
    setLimitType(limit)
  };

  const handleChangeSales = () => {

  };
  
  const fetchProductSearch = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const page = context?.queryKey && context?.queryKey[3]
    const res = await ProductService.getSearchProduct(search, limit, page)
    setPanigateSearch({...panigateSearch, total: res?.total})
    if (searchProduct === '') {
      setPanigateSearch({...panigateSearch, total: res?.total})
    }       
    return res
  }

  const { isLoading, data: products } = useQuery({ queryKey: ['products', limitType, searchDebounce, panigateSearch.page], queryFn: fetchProductSearch, retry: 3, retryDelay: 1000 })

  const { state } = useLocation()

  const fetchProductType = async (type, page, limit) => {
    setLoading(true)
    const res = await ProductService.getProductType(type)
    const res1 = await ProductService.getProductType(type, page, limit)
    if (res1?.status === 'OK'){
      setLoading(false)
      setTypeProducts(res1)
      setTypePage(true)
      setPanigate({...panigate, total: res?.data?.length})
    }
    else {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (state) {
      fetchProductType(state, panigate.page, panigate.limit)
    }
    
  }, [state, panigate.page, panigate.limit])

  const onChange = (current, pageSize) => {
    setPanigate({...panigate, page: current - 1, limit: limitType})
  }

  const onChangeSearch = (current, pageSize) => {
    setPanigateSearch({...panigateSearch, page: current - 1})
  }

  return (
    <WrapperContent>
      <WrapperBox span={5}>
        <NavBarComponent />
      </WrapperBox>
      <WrapperBox span={18}>
        <Loading isLoading={isLoading || loading}>
          <Space wrap style={{ padding: '5px 5px' }}>
            <p>Sắp xếp theo: </p>
            <Select
              defaultValue="salesweek"
              style={{
                width: 150,
              }}
              onChange={handleChangeSales}
              options={[
                { value: "salesweek", label: "Bán chạy tuần", },
                { value: "salesmonth", label: "Bán chạy tháng", },
                { value: "salesyear", label: "Bán chạy năm", },
                { value: "hotweek", label: "Nổi bật tuần", },
                { value: "hotmonth", label: "Nổi bật tháng", },
                { value: "hotyear", label: "Nổi bật năm", },
                { value: "discount", label: "Giảm giá thêm", },
                { value: "cost", label: "Giá bán", },
                { value: "newest", label: "Mới nhất", },
              ]}
            />
            <Select
              defaultValue="24product"
              style={{
                width: 140,
              }}
              onChange={handleChange}
              options={[
                { value: "12product", label: "12 Sản phẩm", },
                { value: "24product", label: "24 Sản phẩm", },
                { value: "48product", label: "48 Sản phẩm", },
              ]}
            />
          </Space>
          <WrapperList>
            <ProductListComponent list={typePage ? typeProducts : products} category={true} checkSearchPro={typePage ? true : false} search={searchDebounce} />
          </WrapperList>
          {typePage ?
            <Pagination
              defaultCurrent={panigate.page + 1}
              total={panigate?.total}
              pageSize={panigate?.limit}
              showSizeChanger={false}
              onChange={onChange}
              style={{ textAlign: "center", margin: "10px 0px" }}
            />
          :
            <Pagination
              defaultCurrent={panigateSearch.page + 1}
              current={panigateSearch?.page + 1}
              total={panigateSearch?.total}
              pageSize={panigate?.limit}
              showSizeChanger={false}
              onChange={onChangeSearch}
              style={{ textAlign: "center", margin: "10px 0px" }}
            />
          }
        </Loading>
      </WrapperBox>
    </WrapperContent>
  );
}

export default CategoryPage;
