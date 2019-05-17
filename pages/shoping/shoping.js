// pages/shoping/shoping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin:true
  },
//管理订单
switch(){
  if(this.data.admin==true){
  this.setData({
    admin:false
  })
  }else if(this.data.admin==false){
    this.setData({
      admin: true
    })
  }
},
order(){
  wx.navigateTo({
    url: '/pages/order/order',
  })
}
})