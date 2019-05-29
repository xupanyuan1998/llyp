// pages/personal/chint/chint.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    int:''
  },
  // 获取传入得id
  onLoad(datas){
    var id=datas.id;
    var that=this;
    wx.request({
      url: imgurl +'api/member/rechargeDetail',
      method:"post",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        id:id,
        token:app.globalData.is_login
      },
      success(res){
        that.setData({
          int:res.data.data
        })
      }
    })
  }
})