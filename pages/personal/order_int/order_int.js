// pages/personal/order_int/order_int.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    int:''
  },
onLoad(datas){
  var id=datas.id;
  var that=this;
  wx.request({
    url:imgurl+ 'api/order/orderDetail',
    data:{
      orderId:id,
      token:app.globalData.is_login
    },
    success(res){
      var data = res.data.data.order;
      console.log(data)
      that.setData({
        int:data
      })
    }
  })

}
})