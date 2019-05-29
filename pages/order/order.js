// pages/order/order.js
const app=getApp();
const imgurl = app.globalData.imgurl;
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
  },
  // 获取商品信息
  onLoad(list){
    var list = JSON.parse(list.list) ;
    wx.request({
      url: imgurl + 'api/OrderMini/orderInfo',
      method:"POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        order_data:list,
        token:app.globalData.is_login,
        order_tag: 'buy_now'
      },
      success(res){
        console.log(res)
      }
    })
  }
})