// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deliver:[{sum:'订单总价',price:'￥0.01'},{sum:'运费(快递)',price:'￥9.89'},{sum:'订单总价',price:'￥9.90'}]
  },
  okpay(){
    wx.navigateTo({
      url: '/pages/conpay/conpay',
    })
  }
})