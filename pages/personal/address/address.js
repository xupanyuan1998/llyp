// pages/personal/address/address.js
const app=getApp();
const imgurl=app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address_list:''
  },
// 新增地址
  newaddress(){
    wx.navigateTo({
      url: '/pages/personal/newaddress/newaddress',
    })
  },
  //获取地址列表
  onLoad(){
    var that=this;
    wx.request({
      url: imgurl +'/api/member/memberAddress',
      data:{
        token:app.globalData.is_login
      },
      success(res){
      var  address_list=res.data.data.data;
        that.setData({
          address_list:address_list
        })
      }
    })
  }
})