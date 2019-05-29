// pages/personal/zhuanrecord/zhuanrecord.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiangxi:[]
  },
// 详细
xiangxi(e){
  wx.navigateTo({
    url: '/pages/personal/zhuanint/zhuanint?id='+e.currentTarget.dataset.id,
  })
},
onLoad(){
  var that=this;
  wx.request({
    url: imgurl+'api/member/transferLog',
    data:{
      page:1,
      token:app.globalData.is_login
    },
    success(res){
      console.log(res.data.data)
      that.setData({
        xiangxi:res.data.data
      })
    }
  })
}
})