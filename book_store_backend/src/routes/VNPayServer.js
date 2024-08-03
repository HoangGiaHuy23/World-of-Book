const axios = require('axios').default; // npm install axios
const crypto = require('crypto');
const moment = require('moment'); // npm install moment
const qs = require('qs')
const express = require("express");
const router = express.Router()
const Order = require('../models/OrderProduct');
const dotenv = require('dotenv');
const request = require('request');
dotenv.config()

const sortObject = (obj) => {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

let config = {
    vnp_TmnCode: "FGJU0RSD",
    vnp_HashSecret: "SXCNSLKLA1DMZXTSQPNLBBKYVPCPT87F",
    vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
    vnp_ReturnUrl: `${process.env.NGROK_URL}/api/vnpay/callback`
}

router.post('/payment', async (req, res) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let expireDate = moment(date).add(30, 'minutes').format('YYYYMMDDHHmmss');
    const orderId = req.query.orderId
    let vnp_Params = {};
    config.vnp_ReturnUrl = `${process.env.NGROK_URL}/api/vnpay/callback?&orderId=${orderId}`

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let tmnCode = config.vnp_TmnCode
    let secretKey = config.vnp_HashSecret
    let vnpUrl = config.vnp_Url
    let returnUrl = config.vnp_ReturnUrl
    let amount = req.query.bill;
    let bankCode = '' //req.body.bankCode;

    let locale = 'vn' //req.body.language;
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    let currCode = 'VND';
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = '127.0.0.1' //ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_ExpireDate'] = expireDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

    const result = {
        redirectUrl: vnpUrl,
        vnp_Params
    }
    return res.status(200).json(result)
})

router.get('/callback', async (req, res) => {
    let vnp_Params = req.query //.vnp_Params;
    const orderId = vnp_Params.orderId  //req.query.orderId
    console.log('vnp_Params', vnp_Params)
    let secureHash = vnp_Params['vnp_SecureHash'];
    const method = 'VNPay'
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    delete vnp_Params['orderId'];

    vnp_Params = sortObject(vnp_Params);

    let secretKey = config.vnp_HashSecret;

    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    let redirecturl = `http://localhost:3000/paid/0/${orderId}/${method}`

    console.log('secureHash', secureHash, ' | ', 'signed', signed)

    if (secureHash === signed) {
        if (vnp_Params.vnp_TransactionStatus === '00') {
            const currentDate = new Date()
            let data = await Order.findById(orderId)
            data.isPaid = true
            data.paidAt = currentDate
            const newdata = await Order.findByIdAndUpdate(orderId, data, { new: true })
            res.redirect(redirecturl)
        }
        else {
            const currentDate = new Date()
            let data = await Order.findById(orderId)
            data.isCancel = true
            const newdata = await Order.findByIdAndUpdate(orderId, data, { new: true })
            redirecturl = `http://localhost:3000/paid/1/${orderId}/${method}`
            res.redirect(redirecturl)
        }

    } else {
        const currentDate = new Date()
        let data = await Order.findById(orderId)
        data.isCancel = true
        const newdata = await Order.findByIdAndUpdate(orderId, data, { new: true })
        redirecturl = `http://localhost:3000/paid/1/${orderId}/${method}`
        res.redirect(redirecturl)
    }
    res.status(200)
})

module.exports = router