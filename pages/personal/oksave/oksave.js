// pages/personal/oksave/oksave.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay: [{ src: '/images/pay_2.png', name: '银行卡支付', checked:"true"},
      { src: '/images/pay_1.png', name: '微信支付' },
      { src: '/images/pay_3.png', name: '支付宝支付' }
    ]
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  // 提交充值
  oksave(){
    wx.navigateTo({
      url: '/pages/personal/chsave/chsave',
    })
  }
})