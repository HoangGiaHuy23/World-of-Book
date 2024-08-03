import axios from "axios"

export const payment = async(bill, orderID) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/vnpay/payment?bill=${bill}&orderId=${orderID}`)
    return res.data
}
