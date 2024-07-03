import React from "react";
import { Row, Tabs, Select, Space } from "antd";
import { WrapperCategory } from "./style";
import CardComponent from "../CardComponent/CardComponent";

const { TabPane } = Tabs;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

function CategotyBarComponent() {
  return (
    <WrapperCategory>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tất cả" key="1">
          <Space wrap style={{ padding: "5px 5px", }}>
            <p>Sắp xếp theo: </p>
            <Select
              defaultValue="trend"
              style={{
                width: 150,
              }}
              onChange={handleChange}
              options={[
                {
                    value: "trend",
                    label: "Trending",
                  },
                {
                  value: "salesweek",
                  label: "Bán chạy tuần",
                },
                {
                  value: "salesmonth",
                  label: "Bán chạy tháng",
                },
                {
                  value: "salesyear",
                  label: "Bán chạy năm",
                },
                {
                  value: "hotweek",
                  label: "Nổi bật tuần",
                },
                {
                  value: "hotmonth",
                  label: "Nổi bật tháng",
                },
                {
                  value: "hotyear",
                  label: "Nổi bật năm",
                },
                {
                  value: "discount",
                  label: "Giảm giá thêm",
                },
                {
                  value: "cost",
                  label: "Giá bán",
                },
                {
                  value: "newest",
                  label: "Mới nhất",
                },
              ]}
            />
          </Space>
          <Row gutter={[16, 16]} style={{ padding: "0px 30px", gap: "23px" }}>
            {/* <CardComponent /> */}
          </Row>
        </TabPane>
        <TabPane tab="Văn học" key="2">
        <Space wrap style={{ padding: "5px 5px", }}>
            <p>Sắp xếp theo: </p>
            <Select
              defaultValue="trend"
              style={{
                width: 150,
              }}
              onChange={handleChange}
              options={[
                {
                    value: "trend",
                    label: "Trending",
                  },
                {
                  value: "salesweek",
                  label: "Bán chạy tuần",
                },
                {
                  value: "salesmonth",
                  label: "Bán chạy tháng",
                },
                {
                  value: "salesyear",
                  label: "Bán chạy năm",
                },
                {
                  value: "hotweek",
                  label: "Nổi bật tuần",
                },
                {
                  value: "hotmonth",
                  label: "Nổi bật tháng",
                },
                {
                  value: "hotyear",
                  label: "Nổi bật năm",
                },
                {
                  value: "discount",
                  label: "Giảm giá thêm",
                },
                {
                  value: "cost",
                  label: "Giá bán",
                },
                {
                  value: "newest",
                  label: "Mới nhất",
                },
              ]}
            />
          </Space>
          <Row gutter={[16, 16]} style={{ padding: "0px 30px", gap: "23px" }}>
            {/* <CardComponent /> */}
          </Row>
        </TabPane>
        <TabPane tab="Kinh tế" key="3">
        <Space wrap style={{ padding: "5px 5px", }}>
            <p>Sắp xếp theo: </p>
            <Select
              defaultValue="trend"
              style={{
                width: 150,
              }}
              onChange={handleChange}
              options={[
                {
                    value: "trend",
                    label: "Trending",
                  },
                {
                  value: "salesweek",
                  label: "Bán chạy tuần",
                },
                {
                  value: "salesmonth",
                  label: "Bán chạy tháng",
                },
                {
                  value: "salesyear",
                  label: "Bán chạy năm",
                },
                {
                  value: "hotweek",
                  label: "Nổi bật tuần",
                },
                {
                  value: "hotmonth",
                  label: "Nổi bật tháng",
                },
                {
                  value: "hotyear",
                  label: "Nổi bật năm",
                },
                {
                  value: "discount",
                  label: "Giảm giá thêm",
                },
                {
                  value: "cost",
                  label: "Giá bán",
                },
                {
                  value: "newest",
                  label: "Mới nhất",
                },
              ]}
            />
          </Space>
          <Row gutter={[16, 16]} style={{ padding: "0px 30px", gap: "23px" }}>
            {/* <CardComponent /> */}
          </Row>
        </TabPane>
        <TabPane tab="Thiếu nhi" key="4">
        <Space wrap style={{ padding: "5px 5px", }}>
            <p>Sắp xếp theo: </p>
            <Select
              defaultValue="trend"
              style={{
                width: 150,
              }}
              onChange={handleChange}
              options={[
                {
                    value: "trend",
                    label: "Trending",
                  },
                {
                  value: "salesweek",
                  label: "Bán chạy tuần",
                },
                {
                  value: "salesmonth",
                  label: "Bán chạy tháng",
                },
                {
                  value: "salesyear",
                  label: "Bán chạy năm",
                },
                {
                  value: "hotweek",
                  label: "Nổi bật tuần",
                },
                {
                  value: "hotmonth",
                  label: "Nổi bật tháng",
                },
                {
                  value: "hotyear",
                  label: "Nổi bật năm",
                },
                {
                  value: "discount",
                  label: "Giảm giá thêm",
                },
                {
                  value: "cost",
                  label: "Giá bán",
                },
                {
                  value: "newest",
                  label: "Mới nhất",
                },
              ]}
            />
          </Space>
          <Row gutter={[16, 16]} style={{ padding: "0px 30px", gap: "23px" }}>
            {/* <CardComponent /> */}
          </Row>
        </TabPane>
        <TabPane tab="Ngoại ngữ" key="5">
        <Space wrap style={{ padding: "5px 5px", }}>
            <p>Sắp xếp theo: </p>
            <Select
              defaultValue="trend"
              style={{
                width: 150,
              }}
              onChange={handleChange}
              options={[
                {
                    value: "trend",
                    label: "Trending",
                  },
                {
                  value: "salesweek",
                  label: "Bán chạy tuần",
                },
                {
                  value: "salesmonth",
                  label: "Bán chạy tháng",
                },
                {
                  value: "salesyear",
                  label: "Bán chạy năm",
                },
                {
                  value: "hotweek",
                  label: "Nổi bật tuần",
                },
                {
                  value: "hotmonth",
                  label: "Nổi bật tháng",
                },
                {
                  value: "hotyear",
                  label: "Nổi bật năm",
                },
                {
                  value: "discount",
                  label: "Giảm giá thêm",
                },
                {
                  value: "cost",
                  label: "Giá bán",
                },
                {
                  value: "newest",
                  label: "Mới nhất",
                },
              ]}
            />
          </Space>
          <Row gutter={[16, 16]} style={{ padding: "0px 30px", gap: "23px" }}>
            {/* <CardComponent /> */}
          </Row>
        </TabPane>
        <TabPane tab="Giáo khoa" key="6">
        <Space wrap style={{ padding: "5px 5px", }}>
            <p>Sắp xếp theo: </p>
            <Select
              defaultValue="trend"
              style={{
                width: 150,
              }}
              onChange={handleChange}
              options={[
                {
                    value: "trend",
                    label: "Trending",
                  },
                {
                  value: "salesweek",
                  label: "Bán chạy tuần",
                },
                {
                  value: "salesmonth",
                  label: "Bán chạy tháng",
                },
                {
                  value: "salesyear",
                  label: "Bán chạy năm",
                },
                {
                  value: "hotweek",
                  label: "Nổi bật tuần",
                },
                {
                  value: "hotmonth",
                  label: "Nổi bật tháng",
                },
                {
                  value: "hotyear",
                  label: "Nổi bật năm",
                },
                {
                  value: "discount",
                  label: "Giảm giá thêm",
                },
                {
                  value: "cost",
                  label: "Giá bán",
                },
                {
                  value: "newest",
                  label: "Mới nhất",
                },
              ]}
            />
          </Space>
          <Row gutter={[16, 16]} style={{ padding: "0px 30px", gap: "23px" }}>
            {/* <CardComponent /> */}
          </Row>
        </TabPane>
        <TabPane tab="Khoa học - Công nghệ" key="7">
        <Space wrap style={{ padding: "5px 5px", }}>
            <p>Sắp xếp theo: </p>
            <Select
              defaultValue="trend"
              style={{
                width: 150,
              }}
              onChange={handleChange}
              options={[
                {
                    value: "trend",
                    label: "Trending",
                  },
                {
                  value: "salesweek",
                  label: "Bán chạy tuần",
                },
                {
                  value: "salesmonth",
                  label: "Bán chạy tháng",
                },
                {
                  value: "salesyear",
                  label: "Bán chạy năm",
                },
                {
                  value: "hotweek",
                  label: "Nổi bật tuần",
                },
                {
                  value: "hotmonth",
                  label: "Nổi bật tháng",
                },
                {
                  value: "hotyear",
                  label: "Nổi bật năm",
                },
                {
                  value: "discount",
                  label: "Giảm giá thêm",
                },
                {
                  value: "cost",
                  label: "Giá bán",
                },
                {
                  value: "newest",
                  label: "Mới nhất",
                },
              ]}
            />
          </Space>
          <Row gutter={[16, 16]} style={{ padding: "0px 30px", gap: "23px" }}>
            {/* <CardComponent /> */}
          </Row>
        </TabPane>
      </Tabs>
    </WrapperCategory>
  );
}

export default CategotyBarComponent;
