import React from 'react'
import { Col, Image, List, Row } from 'antd';
import { WrapperFooter, WrapperBoxLeft, WrapperIcon, WrapperBoxRight, TextHover } from "./style";
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined, TwitterOutlined, HomeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import useHoverEffect  from '../../hooks/HoverEffect'
import WoB from '../../assets/images/WoB_logo.png'
import BoCongThuong from '../../assets/images/logo-bo-cong-thuong-da-thong-bao.png'
import VNPay from '../../assets/images/vnpay_logo.png'
import ZaloPay from '../../assets/images/zalopay_logo.png'
import Momo from '../../assets/images/momo_logo.png'
import ShopeePay from '../../assets/images/shopeepay_logo.png'

const data = [
  'Điều khoản sử dụng',
  'Chính sách bảo mật thông tin cá nhân',
  'Chính sách bảo mật thanh toán',
  'Giới thiệu World of Book',
];

const data2 = [
  'Chính sách đổi - trả - hoàn tiền',
  'Chính sách bảo hành - bồi hoàn',
  'Chính sách vận chuyển',
  'Phương thức thanh toán và xuất HĐ',
];

const data3 = [
  'Đăng nhập/Tạo mới tài khoản',
  'Thay đổi địa chỉ khách hàng',
  'Chi tiết tài khoản',
  'Lịch sử mua hàng',
];

function FooterComponent() {
  const { hoveredItem, handleMouseEnter, handleMouseLeave } = useHoverEffect();

  return (
    <div>
      <WrapperFooter>
        <Col span={6}>
          <WrapperBoxLeft>
            <div>
              <Image src={WoB} alt='weblogo' preview={false} />
            </div>
            <div style={{ fontSize:'18px' }}>
              Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM <br />
              Công Ty Cổ Phần Phát Hành Sách - World of Book <br />
              60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam
            </div>
            <div style={{ fontSize:'18px' }}>
              World of Book nhận đặt hàng trực tuyến và giao hàng tận nơi. <br />
              KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng.
            </div>
            <div>
              <Image src={BoCongThuong} alt='bctlogo' preview={false} height='100%' width='50%' />
            </div>
            <WrapperIcon>
              <FacebookOutlined style={{ fontSize:'60px' }} />
              <InstagramOutlined style={{ fontSize:'60px' }} />
              <YoutubeOutlined style={{ fontSize:'60px' }} />
              <TwitterOutlined style={{ fontSize:'60px' }} />
            </WrapperIcon>
          </WrapperBoxLeft>
        </Col>
        <Col span={20}>
          <WrapperBoxRight>
            <Col span={7}>
              <List
                header={<h2>DỊCH VỤ</h2>}
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item 
                    style={{ 
                      border:'none',
                      fontSize:'18px',
                      marginLeft: hoveredItem === index ? '5px' : '0',
                      transition: 'margin-left 0.5s ease'
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <TextHover>
                      {item}
                    </TextHover>
                  </List.Item>
                )}
              />
            </Col>
            <Col span={6}>
              <List
                header={<h2>HỖ TRỢ</h2>}
                dataSource={data2}
                renderItem={(item, index) => (
                  <List.Item 
                    style={{ 
                      border:'none',
                      fontSize:'18px',
                      marginLeft: hoveredItem === index ? '5px' : '0',
                      transition: 'margin-left 0.5s ease'
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <TextHover>
                      {item}
                    </TextHover>
                  </List.Item>
                )}
              />
            </Col>
            <Col span={6}>
              <List
                header={<h2>TÀI KHOẢN CỦA TÔI</h2>}
                dataSource={data3}
                renderItem={(item, index) => (
                  <List.Item 
                    style={{ 
                      border:'none',
                      fontSize:'18px',
                      marginLeft: hoveredItem === index ? '5px' : '0',
                      transition: 'margin-left 0.5s ease'
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <TextHover>
                      {item}
                    </TextHover>
                  </List.Item>
                )}
              />
            </Col>
            <Col span={20}>
              <h2>LIÊN HỆ</h2>
              <Row style={{ gap:'50px' }}>
                <Col span={8} style={{ fontSize:'18px' }}>
                  <HomeOutlined />
                  60-62 Lê Lợi, Q.1, TP. HCM
                </Col>
                <Col span={7} style={{ fontSize:'18px' }}>
                  <MailOutlined />
                  cskh@fahasa.com.vn
                </Col>
                <Col span={5} style={{ fontSize:'18px' }}>
                  <PhoneOutlined />
                  1900636467
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row style={{ gap:'50px' }}>
                <Image src={VNPay} alt='vnpay' preview={false} height='50px' width='150px' />
                <Image src={ZaloPay} alt='zalopay' preview={false} height='50px' width='150px' />
                <Image src={Momo} alt='momo' preview={false} height='50px' width='50px' />
                <Image src={ShopeePay} alt='shopeepay' preview={false} height='50px' width='150px' />
              </Row>
            </Col>
          </WrapperBoxRight>
        </Col>
      </WrapperFooter>
      <WrapperFooter style={{ paddingTop:'20px' }}>
        <Col span={24}>
          <div style={{ textAlign:'center', color:'grey', fontSize:'20px' }}>
            Giấy chứng nhận Đăng ký Kinh doanh số 0123456789 do 
            Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 20/12/2023.
          </div>
        </Col>
      </WrapperFooter>
    </div>
  )
}

export default FooterComponent