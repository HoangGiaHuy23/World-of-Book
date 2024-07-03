const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice, user, isPaid, paidAt } = req.body
        if ( !orderItems || !shippingAddress || !paymentMethod || !itemsPrice || !shippingPrice || !taxPrice || !totalPrice || !user || ((isPaid && !paidAt) || (!isPaid && !(!paidAt))) ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const orderID = req.params.id
        const data = req.body
        if (!orderID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderID is required'
            })
        }
        const response = await OrderService.updateOrder(orderID, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: е
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const response = await OrderService.getAllOrder()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: е
        })
    }
}

module.exports = {
    createOrder,
    updateOrder,
    getAllOrder
}