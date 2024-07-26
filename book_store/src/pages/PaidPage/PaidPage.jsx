import React, { useEffect, useState } from 'react'
import * as ZalopayService from '../../services/ZalopayService'
import * as OrderService from '../../services/OrderService'
import { useParams } from "react-router-dom";
import { WrapperDiv } from './style'
import Loading from '../../components/LoadingComponent/Loading';

const PaidPage = () => {
    const { billId, orderID } = useParams();
    const [orderStatus, setOrderStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const updateOrder = async () => {
        const res = await ZalopayService.order_status(billId, orderID)
        const return_code = res.return_code
        let order_status
        if (return_code === 1) {
            order_status = true
        }
        else {
            order_status = false
            let order = await OrderService.getDetailOrder(orderID)
            order.isCancel = true
            const updatedOrder = await OrderService.updateOrder(orderID, order)
        }
        return order_status
    }
    useEffect(() => {
        const fetchOrderStatus = async () => {
            const status = await updateOrder();
            setOrderStatus(status);
            setIsLoading(false)
        };
        fetchOrderStatus();
    }, [billId, orderID]);
    console.log('orderStatus', orderStatus)
    return (
        <Loading isLoading={isLoading}>
            <WrapperDiv style={{display : isLoading ? 'none' : 'block'}}>
                <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', fontSize: '1.4em' }} >
                    <img style={{ width: '100%', height: '100%', maxWidth: '150px', maxHeight: '150px' }}
                        src={orderStatus ? `https://static.vecteezy.com/system/resources/previews/009/591/689/original/check-mark-icon-free-png.png` : `https://cdn0.fahasa.com/skin/frontend/base/default/images/order_status/ico_fail.png`} alt="pass" />
                    <h1 style={{ fontSize: '2.1em', fontWeight: 'bold', lineHeight: '1.25em', marginTop: '0', color: orderStatus ? `#14cf14` : `#A90000` }}>THANH TOÁN{orderStatus ? ` ` : ` KHÔNG `}THÀNH CÔNG</h1>
                    <p style={{ margin: '0' }}>{orderStatus ? `Đơn hàng của bạn đã được ghi nhận, chúng tôi sẽ gửi mail xác nhận đơn hàng cho bạn.` : `Đã có vấn đề xảy ra với việc thanh toán của bạn.`}</p>
                    <p style={{ margin: '10px 0px 40px 0px' }}>Đây là mã đơn hàng của bạn : <span style={{ color: 'orange', fontWeight: 'bold' }}>#{orderID.toUpperCase()}</span> trong trường hợp bạn muốn liên hệ.</p>
                </div>
            </WrapperDiv>
        </Loading>
    )
}

export default PaidPage
