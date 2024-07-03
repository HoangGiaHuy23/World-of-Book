import React from "react";
import { Input, Button } from "antd";
import { SearchBar } from "./style";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function ButtonInputSearch(props) {
  const navigate = useNavigate();

  const handleNavigateCategory = () => {
    navigate("/category/:type");
  };

  return (
    <SearchBar>
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        style={{
          backgroundColor: "#F4F4FF",
          border: "none",
          boxShadow: "none",
        }}
        {...props}
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        style={{
          marginLeft: "20px",
          padding: "0px 40px",
          backgroundColor: "#CDCDFF",
          color: "black",
          boxShadow: "none",
        }}
        onClick={handleNavigateCategory}
      />
    </SearchBar>
  );
}

export default ButtonInputSearch;
