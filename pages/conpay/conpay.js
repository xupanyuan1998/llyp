// pages/conpay/conpay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:'none'
  },
  //显示密码页面
  ordersuc(){
   this.setData({
     show:'block'
   })
  },
  //跳转支付成功
  ok(){
    wx.navigateTo({
      url: '/pages/ordersuc/ordersuc',
    })
  },
  //隐藏支付页面
  hidden(){
    this.setData({
      show: 'none'
    })
  }
})