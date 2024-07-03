import React from "react";
import { Row } from "antd";
import CardComponent from "../CardComponent/CardComponent";

const ProductListComponent = (props) => {
  const check = props.category
  const {list} = props
  const check2 = props.checkSearchPro
  const search = props.search

  const filteredList = check2 ? list?.data?.filter(product => product.name.toLowerCase().includes(search.toLowerCase())) : list?.data;

  return (
    <Row
      style={{
        padding: check ? "0px 0px" : "20px 30px",
        columnGap: check ?  "15px" : "29px",
        rowGap: check ?  "20px" : "29px",
        backgroundColor: check ? "#FFF" : "#FF0000",
        borderBottomLeftRadius: "14px",
        borderBottomRightRadius: "14px",
        display: "flex",
      }}
    >
      {filteredList?.map((product) => {
        return (
          <CardComponent
            id={product._id}
            key={product._id}
            name={product.name}
            price={product.price}
            discount={product.discount}
            image={product.image}
          />
        )
      })}
    </Row>
  );
}

export default ProductListComponent;