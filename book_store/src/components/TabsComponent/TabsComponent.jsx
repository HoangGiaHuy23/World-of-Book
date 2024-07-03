import React from 'react';
import { Tabs, Row } from 'antd';
import CardComponent from "../CardComponent/CardComponent";
import ButonComponent from '../ButtonComponent/ButonComponent';

const { TabPane } = Tabs;

const TabsComponent = (props) => {
  const { list } = props
  return (
    <div style={{ backgroundColor: '#FFF', borderBottomLeftRadius: '14px', borderBottomRightRadius: '14px', padding: '0px 20px' }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Xu hướng theo tuần" key="1">
          <Row gutter={[16, 16]} style={{ padding: '0px 30px', gap: '23px' }}>
            {list?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}            
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  discount={product.discount}
                  image={product.image}
                />
              )
            })}
          </Row>
          <div style={{ textAlign: 'center', padding: '15px 0px' }}>
            <ButonComponent
              styleButton={{
                padding: '0px 50px',
                background: '#FFF',
                border: '1px solid red',
              }}
              textButton={'Xem thêm'}
              styleTextButton={{ color: 'red', }}
            >
            </ButonComponent>
          </div>
        </TabPane>
        <TabPane tab="Sách hot - Giảm sốc" key="2">
          <Row gutter={[16, 16]} style={{ padding: '0px 30px', gap: '23px' }}>
            {list?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}            
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  discount={product.discount}
                  image={product.image}
                />
              )
            })}
          </Row>
          <div style={{ textAlign: 'center', padding: '15px 0px' }}>
            <ButonComponent
              styleButton={{
                padding: '0px 50px',
                background: '#FFF',
                border: '1px solid red',
              }}
              textButton={'Xem thêm'}
              styleTextButton={{ color: 'red', }}
            >
            </ButonComponent>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabsComponent