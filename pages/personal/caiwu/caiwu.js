// pages/personal/caiwu/caiwu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  // 添加银行卡
  add_card(){
    wx.navigateTo({
      url: '/pages/personal/addcard/addcard',
    })
  },
  //转账页面
  transfer(){
    wx.navigateTo({
      url: '/pages/personal/transferr/transfer',
    })
  },
  //充值页面
  recharge(){
    wx.navigateTo({
      url: '/pages/personal/recharge/recharge',
    })
  },
  // 提现页面
  tx(){
    wx.navigateTo({
      url: '/pages/personal/tx/tx',
    })
  }
})