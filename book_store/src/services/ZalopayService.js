import axios from "axios"

export const payment = async(bill, orderID) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/zalopay/payment?bill=${bill}&orderID=${orderID}`)
    return res.data
}

export const order_status = async(billID, orderID) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/zalopay/order-status?app_trans_id=${billID}&orderID=${orderID}`)
    return res.data
}