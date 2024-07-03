import axios from "axios"

export const createOrder = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/order/create`, data)
    return res.data
}

export const getAllOrder = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-all`)
    return res.data
    //orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice, user, isPaid, paidAt
    // shippingAddress: {
    //     fullName: { type: String, required: true },
    //     email: { type: String, required: true, unique: true },
    //     phone: { type: Number, required: true },
    //     city: { type: String, required: true },
    //     district: { type: String, required: true },
    //     wards: { type: String, required: true },
    //     address: { type: String, required: true },
    // },
}