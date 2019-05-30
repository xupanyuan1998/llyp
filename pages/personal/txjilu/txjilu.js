// pages/personal/txjilu/txjilu.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:''
  },
  onLoad(){
    var that=this;
    wx.request({
      url: imgurl+'api/member/balanceWithdraw',
      data:{
        token:app.globalData.is_login
      },
      success(res){
        var list = res.data.data.withdraws;
        that.setData({
          list:list
        })
      }
    })
  }
})