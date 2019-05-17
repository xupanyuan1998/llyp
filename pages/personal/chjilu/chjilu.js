// pages/personal/chjilu/chjilu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chjilu: [{ src: '/images/wechat1.png', lei: '微信充值', jine: '500.00', date: '12-10 16:14', zt: '申请中' },
    { src: '/images/zhifubao1.png', lei: '支付宝充值', jine: '500.00', date: '12-10 16:14', zt: '申请中' },
    { src: '/images/yinlian1.png', lei: '银行卡充值', jine: '500.00', date: '12-10 16:14', zt: '申请中' },
    { src: '/images/wechat1.png', lei: '微信充值', jine: '500.00', date: '12-10 16:14', zt: '申请中' }
    ]
  },
//充值详情
chint(){
    wx.navigateTo({
      url: '/pages/personal/chint/chint',
    })
  }
})