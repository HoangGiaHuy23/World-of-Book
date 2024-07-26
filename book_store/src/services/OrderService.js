import axios from "axios"

export const createOrder = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/create`, data)
    return res.data
}

export const updateOrder = async (orderID, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/order/update/${orderID}`, data)
    return res.data
}

export const getDetailOrder = async (orderID) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-order/${orderID}`)
    return res.data
}

export const getAllOrder = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-all`)
    return res.data
}
