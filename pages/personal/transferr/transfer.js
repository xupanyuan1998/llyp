// pages/personal/transferr/transfer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 转账记录
  jilu(){
    wx.navigateTo({
      url: '/pages/personal/zhuanrecord/zhuanrecord',
    })
  }
})