// pages/personal/zhuanint/zhuanint.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    int:''
  },
// 获取上个页面传入的内容
onLoad(datas){
  var id=datas.id;
  var that=this;
  wx.request({
    url:imgurl+ 'api/member/transferDetail',
    method:"POST",
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