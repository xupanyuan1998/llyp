// pages/personal/jifen/jifen.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cata:['全部','收入','支出'],
    list:'',
    point:'',
    active:0
  },
  onLoad(){
    var that=this;
    wx.request({
      url:imgurl+ 'api/member/pointLog',
      method:"post",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        type: 0,
        token:app.globalData.is_login
      },
      success(res){
        that.setData({
          list: res.data.data.log,
          point: res.data.data.point
        })
      }
    })
  },
  // 切换分类
  active(e){
    var that=this;
    var id = e.currentTarget.dataset.id
    that.setData({
      active:id
    });
    wx.request({
      url: imgurl + 'api/member/pointLog',
      method: "post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        type: id,
        token: app.globalData.is_login
      },
      success(res) {
        that.setData({
          list: res.data.data.log,
          point: res.data.data.point
        })
      }
    })
  }
})