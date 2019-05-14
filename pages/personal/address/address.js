// pages/personal/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
// 新增地址
  newaddress(){
    wx.navigateTo({
      url: '/pages/personal/newaddress/newaddress',
    })
  }
})