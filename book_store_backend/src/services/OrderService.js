const Order = require('../models/OrderProduct')

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice, user, isPaid, paidAt } = newOrder
        try {
            const createdOrder = await Order.create({
                orderItems, shippingAddress, paymentMethod, itemsPrice, 
                shippingPrice, taxPrice, totalPrice, isPaid, paidAt
            })

            if (createdOrder) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdOrder
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await Order.findOne({
                _id: id
            })
            if (checkOrder === null) {
                resolve({
                    status: 'OK',
                    message: 'The order is not defined'
                })
            }
            const updatedOrder = await Order.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalOrder = await Order.estimatedDocumentCount()
            const allOrder = await Order.find().select('_id itemsPrice totalPrice isCancel isPaid isDelivering isDelivered deliveredAt createdAt ').sort({createdAt: 'desc'})
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allOrder,
                total: totalOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    updateOrder,
    getAllOrder
}