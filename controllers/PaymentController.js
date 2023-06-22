const asyncHandler = require('express-async-handler')
const BuyProducts = require('../models/BuyProductsModel')
const Orders = require('../models/OrdersModel')



const checkoutPayment = asyncHandler(async (req, res) => {
  const payment = await BuyProducts.find(paymentID = req.params)
  console.log()


  //Zarinpal code
  function request(zpamount, zpdesc, zpcallback) {
    var soap = require('soap');
    var url = "https://sandbox.zarinpal.com/pg/services/WebGate/wsdl";
    var args = {
      'MerchantID': "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      'Amount': zpamount,
      'Description': zpdesc,
      'CallbackURL': 'http://localhost:5000/callback'
    };

    soap.createClient(url, function (err, client) {
      client.PaymentRequest(args, function (err, result) {
        var parseData = JSON.parse(JSON.stringify(result));
        if (Number(parseData.Status) === 100) {
          var status = true;
          var url = 'https://sandbox.zarinpal.com/pg/StartPay/' + parseData.Authority;
          zpcallback({ 'status': status, 'url': url });
        } else {
          var status = false;
          var code = parseData.Status;
          zpcallback({ 'status': status, 'code': 'خطایی پیش آمد! ' + code });
        }
      });
    });
  }
  //Use function
  request(payment[0].totalPrice, 'خرید از فروشگاه', function (data) {
    if (data.status) {
      res.writeHead(302, { 'Location': data.url });
      res.end();
    } else {
      console.log('Add all fields')
    }
  })






})



// @desc Verify from zarinpal
const verifyPayment = asyncHandler(async (req, res) => {
  function verify(zpstatus, zpamount, zpau, zpcallback) {
    var soap = require('soap');
    var url = "https://sandbox.zarinpal.com/pg/services/WebGate/wsdl";
    var args = {
      'MerchantID': "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      'Authority': zpau,
      'Amount': zpamount
    };
    soap.createClient(url, function (err, client) {
      client.PaymentVerification(args, function (err, result) {
        var parseData = JSON.parse(JSON.stringify(result));
        if (zpstatus === "OK") {
          if (Number(parseData.Status) === 100) {
            var status = true;
            zpcallback({ 'status': status, 'code': parseData.RefID });
          } else {
            var status = false;
            zpcallback({ 'status': status, 'code': parseData.Status });
          }
        } else {
          var status = false;
          var code = 'عملیات توسط کاربر لغو شده است.';
          zpcallback({ 'status': status, 'code': 'خطایی پیش آمد! ' + code });
        }
      });
    });
  }
  const payment = await BuyProducts.find(paymentID = req.params)
  console.log(payment)
  verify(req.query.Status, payment[0].totalPrice, req.query.Authority,  async function (data) {

    console.log(data)
    if (data.status) {
      await Orders.create({
        user: payment[0].user,
        products: payment[0].products,
        totalprice: payment[0].totalPrice,
        paymentid: payment[0].paymentID,
        success: true

      })
    }

  })
})

module.exports = { checkoutPayment, verifyPayment } 
