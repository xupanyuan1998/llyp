// pages/personal/newaddress/newaddress.js
const app=getApp();
const imgurl = app. globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:'none',
    provice:''
  },
// 获取省份
sheng(){
  var that=this;
  that.setData({
    show:'block'
  })
  wx.request({
    url: imgurl + 'api/base_controller/getProvince',
    success(res){
      console.log(res.data.data)
      that.setData({
        provice: res.data.data
      })
    }
  })
},
//quxiao
cancle(){
  this.setData({
    show:"none"
  })
}
})