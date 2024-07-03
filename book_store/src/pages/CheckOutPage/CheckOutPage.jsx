import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Radio, Select } from 'antd'
import { InputAdminFormComponent } from '../../components/InputFormComponent/InputFormComponent'
import { WrapperDiv, WrapperFooter } from './style'
import * as RegionService from '../../services/RegionService';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent/ButonComponent'
import * as OrderService from '../../services/OrderService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { removeOrderProduct } from '../../redux/slices/orderSlice'


const CheckOutPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order)
    const deliveryFee = order.shippingPrice || 1
    const totalBill = order.totalPrice
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [checkWard, setCheckWard] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(1);
    const [stateAddress, setStateAddress] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        district: '',
        wards: '',
        address: '',
    });
    const [selectedOrder, setSelectedOrder] = useState([])
    const [stateOrder, setStateOrder] = useState({
        paymentMethod: 'ZaloPay',
        itemsPrice: totalBill,
        shippingPrice: deliveryFee,
        taxPrice: '0',
        totalPrice: totalBill + deliveryFee,
        user: 'huy',
        isPaid: false,
        paidAt: '',
    })
    useEffect(() => {
        order?.orderItems?.map((item) => {
            if (item.check === true) {
                const check = selectedOrder.find((order) => order?.product === item.product)
                if (!check) {
                    selectedOrder.push(item)
                }
            }
        })
    }, [])
    const onChange = (e) => {
        setPaymentMethod(e.target.value);
        setStateOrder({ ...stateOrder, paymentMethod: e.target.label })
    };
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
    const getAllProvince = async () => {
        const res = await RegionService.getAllProvince()
        const data = res.data
        let list = []
        Object.keys(data).forEach(key => {
            list.push({
                label: data[key].name,
                value: data[key].province_id,
            })
        });
        return list
    }
    const getAllDistrict = async (provinceID) => {
        const res = await RegionService.getAllDistrict(provinceID)
        const data = res.data
        let list = []
        Object.keys(data).forEach(key => {
            list.push({
                label: data[key].name,
                value: data[key].district_id,
            })
        });
        setDistrict(list)
        return list
    }
    const getAllWard = async (districtID) => {
        const res = await RegionService.getAllWard(districtID)
        const data = res.data
        let list = []
        Object.keys(data).forEach(key => {
            list.push({
                label: data[key].name,
                value: data[key].ward_id,
            })
        });
        setWard(list)
        return list
    }
    const queryProvince = useQuery({ queryKey: ['provinces'], queryFn: getAllProvince, retry: 3, retryDelay: 1000 })
    const { data: Provinces } = queryProvince

    const handleDetailsOnchange = (e) => {
        setStateAddress({ ...stateAddress, [e.target.name]: e.target.value })
    }
    const handleOnChangeProvince = (value) => {
        getAllDistrict(value)
        setStateAddress({ ...stateAddress, city: value })
    }
    const handleOnChangeDistrict = (value) => {
        getAllWard(value)
        setStateAddress({ ...stateAddress, district: value })
    }
    const handleOnChangeWard = (value) => {
        setCheckWard(true)
        setStateAddress({ ...stateAddress, wards: value })
    }
    const onSearch = (value) => {
        
    }
    const mutation = useMutationHooks(
        (data) => {
            const { orderItems, shippingAddress, paymentMethod, itemsPrice,
                shippingPrice, taxPrice, totalPrice, user, isPaid, paidAt } = data
            const res = OrderService.createOrder({
                orderItems, shippingAddress, paymentMethod, itemsPrice,
                shippingPrice, taxPrice, totalPrice, user, isPaid, paidAt
            })
            return res
        }
    )
    const { data: dataMutation, isPending, isSuccess, isError } = mutation
    const handleOK = () => {
        navigate('/order')
    }
    useEffect(() => {
        if (isSuccess && dataMutation?.status === 'OK') {
          message.success()
          order?.orderItems?.map((item) => {
            if (item.check === true) {
                const idProduct = item?.product
                dispatch(removeOrderProduct({idProduct}))
            }
        })
          handleOK()
        } else if (isError) {
          message.error()
        }
      }, [isSuccess])
    const handlePayOrder = () => {
        mutation.mutate({ ...stateOrder, orderItems: selectedOrder, shippingAddress: stateAddress })
    }
    return (
        <Loading isLoading={isPending}>
            <WrapperDiv>
                <h3>ĐỊA CHỈ GIAO HÀNG</h3>
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Họ và tên người nhận"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập họ và tên người nhận!',
                            },
                        ]}
                    >
                        <InputAdminFormComponent onChange={handleDetailsOnchange} name="fullName" placeholder="Nhập họ và tên người nhận" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập email!',
                            },
                        ]}
                    >
                        <InputAdminFormComponent onChange={handleDetailsOnchange} name="email" placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập số điện thoại!',
                            },
                        ]}
                    >
                        <InputAdminFormComponent onChange={handleDetailsOnchange} name="phone" placeholder="Nhập số điện thoại" />
                    </Form.Item>
                    <Form.Item
                        label="Tỉnh/Thành Phố"
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: 'Chọn tỉnh / thành phố!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn tỉnh / thành phố"
                            optionFilterProp="label"
                            onChange={handleOnChangeProvince}
                            onSearch={onSearch}
                            options={Provinces}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Quận/Huyện"
                        name="district"
                        rules={[
                            {
                                required: true,
                                message: 'Chọn quận / huyện!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn quận / huyện"
                            optionFilterProp="label"
                            onChange={handleOnChangeDistrict}
                            onSearch={onSearch}
                            options={district}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Phường/Xã"
                        name="ward"
                        rules={[
                            {
                                required: true,
                                message: 'Chọn phường / xã!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn phường / xã"
                            optionFilterProp="label"
                            onChange={handleOnChangeWard}
                            onSearch={onSearch}
                            options={ward}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ nhận hàng"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập địa chỉ nhận hàng!',
                            },
                        ]}
                    >
                        <InputAdminFormComponent onChange={handleDetailsOnchange} name="address" placeholder="Nhập địa chỉ nhận hàng" />
                    </Form.Item>
                </Form>
            </WrapperDiv>
            <WrapperDiv style={{ paddingBottom: '20px' }}>
                <h3>PHƯƠNG THỨC VẬN CHUYỂN</h3>
                <div style={{ display: checkWard ? 'block' : 'none' }}>
                    <Radio checked={true}>
                        <div style={{ fontWeight: '600' }}>
                            Giao hàng tiêu chuẩn: 32.000 đ
                        </div>
                    </Radio>
                    <div style={{ marginTop: '8px', textIndent: '24px' }}>
                        Dự kiến giao: Thứ Ba - 02/07
                    </div>
                </div>
                <div style={{ display: checkWard ? 'none' : 'block' }}>
                    Quý khách vui lòng điền tên và địa chỉ giao nhận trước.
                </div>
            </WrapperDiv>
            <WrapperDiv style={{ paddingBottom: '20px' }}>
                <h3>PHƯƠNG THỨC THANH TOÁN</h3>
                <Radio.Group onChange={onChange} value={paymentMethod} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Radio value={1} label='ZaloPay'>ZaloPay</Radio>-
                    <Radio value={2} label='VNPay'>VNPay</Radio>
                    <Radio value={3} label='ShoppePay'>ShoppePay</Radio>
                    <Radio value={4} label='Thanh toán khi nhận hàng'>Thanh toán khi nhận hàng</Radio>
                </Radio.Group>
            </WrapperDiv>
            <WrapperDiv style={{ paddingBottom: '20px', marginBottom: '120px' }}>
                <h3>KIỂM TRA LẠI ĐƠN HÀNG</h3>
                {order?.orderItems?.map((order) => {
                    if (order?.check === true) {
                        return (
                            <Row style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '2px' }}>
                                <Col span={15}>
                                    <Row>
                                        <Col span={7} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <img src={order?.image} alt="Book's image" style={{ width: '75%' }} />
                                        </Col>
                                        <Col span={17} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <div>{order?.name}</div>

                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={9}>
                                    <Row>
                                        <Col span={11}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <div style={{ fontSize: '1.2em', lineHeight: '1.2em', color: '#333', fontWeight: '500' }}>
                                                    {order?.price ? formatNumber(order?.price * (1 - order?.discount)) : 0} đ
                                                </div>
                                                <div style={{
                                                    textDecoration: 'line-through', color: '#bfbfbf', fontSize: '1.2em', lineHeight: '1.2em', fontWeight: 'normal'
                                                }}>
                                                    {order?.price ? formatNumber(order?.price) : 0} đ
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={1}>{order?.amount}</Col>
                                        <Col span={10} style={{
                                            display: 'flex', justifyContent: 'center', color: '#C92127', fontWeight: '700',
                                            fontSize: '1.2em'
                                        }}>{order?.price ? formatNumber(order?.price * (1 - order?.discount) * order?.amount) : 0} đ</Col>
                                    </Row>
                                </Col>
                            </Row>
                        )
                    }
                })}

            </WrapperDiv>
            <WrapperFooter>
                <WrapperDiv style={{ padding: '0 120px', marginBottom: '0' }}>
                    <Row>
                        <Col span={21}>
                            <Row style={{ display: 'flex', flexDirection: 'row-reverse', padding: '7px 0', fontSize: '1.2em', lineHeight: '1.2em' }}>Thành tiền</Row>
                            <Row style={{ display: 'flex', flexDirection: 'row-reverse', paddingBottom: '7px', fontSize: '1.2em', lineHeight: '1.2em' }}>Phí vận chuyển (Giao hàng tiêu chuẩn)</Row>
                            <Row style={{ display: 'flex', flexDirection: 'row-reverse', paddingBottom: '7px', fontSize: '1.2em', lineHeight: '1.2em' }}>Tổng Số Tiền (gồm VAT)</Row>
                        </Col>
                        <Col span={3}>
                            <Row style={{ display: 'flex', flexDirection: 'row-reverse', padding: '7px 0', fontSize: '1.2em', lineHeight: '1.2em' }}>{formatNumber(totalBill)} đ</Row>
                            <Row style={{ display: 'flex', flexDirection: 'row-reverse', paddingBottom: '7px', fontSize: '1.2em', lineHeight: '1.2em' }}>{deliveryFee === 1 && totalBill > 0 ? `Miễn phí` : `${formatNumber(deliveryFee)} đ`}</Row>
                            <Row style={{ display: 'flex', flexDirection: 'row-reverse', paddingBottom: '7px', fontSize: '1.2em', lineHeight: '1.2em', fontWeight: '700', color: '#F39801' }}>{formatNumber(totalBill + deliveryFee)} đ</Row>
                        </Col>
                    </Row>
                    <hr />
                    <Row style={{ paddingBottom: '20px' }}>
                        <Col span={18}></Col>
                        <Col span={6}>
                            <ButtonComponent
                                size={40}
                                styleButton={{
                                    background: '#C92127',
                                    height: '44px',
                                    width: '90%',
                                    border: '2px solid #C92127',
                                    borderRadius: '8px',
                                    margin: '10px 5% 0 5%'
                                }}
                                textButton={'Xác nhận thanh toán'}
                                onClick={handlePayOrder}
                                styleTextButton={{ color: '#fff', fontSize: '1.2em', fontWeight: '600' }}
                            ></ButtonComponent>
                        </Col>
                    </Row>
                </WrapperDiv>
            </WrapperFooter>
        </Loading>
    )
}

export default CheckOutPage
