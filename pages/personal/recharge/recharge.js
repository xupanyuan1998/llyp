// pages/personal/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
// 确认充值
save(){
  wx.navigateTo({
    url: '/pages/personal/oksave/oksave',
  })
},
//充值记录
chjilu(){
  wx.navigateTo({
    url: '/pages/personal/chjilu/chjilu',
  })
}
})