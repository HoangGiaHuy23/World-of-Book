// Node v10.15.3
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment
const qs = require('qs')
const express = require("express");
const router = express.Router()
const Order = require('../models/OrderProduct');
const dotenv = require('dotenv');
dotenv.config()

// APP INFO
const config = {
    app_id: "2554",
    key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
    key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
    endpoint: "	https://sb-openapi.zalopay.vn/v2/create"
};

router.post('/payment', async (req, res) => {
    const orderID = req.query.orderID
    const bill = req.query.bill
    const method = 'Zalo'
    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const app_trans_id = `${moment().format('YYMMDD')}_${transID}` // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    const order = {
        app_id: config.app_id,
        app_trans_id: app_trans_id, 
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify({
            redirecturl : `http://localhost:3000/paid/${app_trans_id}/${orderID}/${method}` 
        }),
        amount: bill,
        description: `WoB - Payment for the order #${transID}`,
        bank_code: "",
        callback_url: `${process.env.NGROK_URL}/api/zalopay/callback?orderID=${orderID}`
        
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
        let result = await axios.post(config.endpoint, null, { params: order })
        result.data.app_trans_id = order.app_trans_id
        return res.status(200).json(result.data)
    } catch (error) {
        return res.status(404).json(error)
    }
})

router.post('/callback', async (req, res) => {
    let result = {};
    const orderID = req.query.orderID
    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;
  
      let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
      console.log("mac =", mac);
      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = "mac not equal";
      }
      else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng
        let dataJson = JSON.parse(dataStr, config.key2);
        console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);
        const currentDate = new Date() 
        let data = await Order.findById(orderID)
        data.isPaid = true
        data.paidAt = currentDate
        const newdata = await Order.findByIdAndUpdate(orderID, data, { new: true })
        result.return_code = 1;
        result.return_message = "success";
      }
    } catch (ex) {
      result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result.return_message = ex.message;
    }
  
    // thông báo kết quả cho ZaloPay server
    res.json(result);
})

router.post('/order-status', async (req, res) => {
    const app_trans_id = req.query.app_trans_id
    const orderID = req.query.orderID
    let postData = {
        app_id: config.app_id,
        app_trans_id: app_trans_id, // Input your app_trans_id
    }
    
    let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    
    
    let postConfig = {
        method: 'post',
        url: 'https://sb-openapi.zalopay.vn/v2/query',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(postData)
    };
    
    try {
        const result = await axios(postConfig)
        return res.status(200).json(result.data)
    } catch (error) {
        console.log('Error: ', error.message)
    }        
})

module.exports = router
