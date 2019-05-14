// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  person(){
    wx.navigateTo({
      url: '/pages/personal/personmsg/personmsg',
    })
  },
  caiwu(){
    wx.navigateTo({
      url: '/pages/personal/caiwu/caiwu',
    })
  },
  // 安全中心
  safe(){
    wx.navigateTo({
      url: '/pages/personal/safe/safe',
    })
  },
  //我的收藏
  mycol(){
    wx.navigateTo({
      url: '/pages/personal/mycol/mycol',
    })
  },
  //地址管理
  address(){
    wx.navigateTo({
      url: '/pages/personal/address/address',
    })
  },
  //我的社区
  club(){
    wx.navigateTo({
      url: '/pages/personal/club/club',
    })
  },
  // 积分中心
  jifen(){
    wx.navigateTo({
      url: '/pages/personal/jifen/jifen',
    })
  },
  // 商城分享
  share(){
    wx.navigateTo({
      url: '/pages/personal/shareshop/shareshop',
    })
  },
  //全部订单
  order(){
    wx.navigateTo({
      url: '/pages/personal/order_all/order_all',
    })
  },
  // 登录页面
  login(){
    wx.navigateTo({
      url: '/pages/personal/login/login',
    })
  },
})