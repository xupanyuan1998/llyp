// pages/personal/order_all/order_all.js
const app=getApp();
const imgurl=app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cate: ['全部', '待付款', '待发货', '待收货', '待评价', '售后'],
    active: 0
  },
  //选中效果
  active(e) {
    this.setData({
      active: e.target.dataset.id
    })
  },
  //退款
  outm() {
    wx.navigateTo({
      url: '/pages/personal/outm/outm',
    })
  },
  // 退货
  returns() {
    wx.navigateTo({
      url: '/pages/personal/returns/returns',
    })
  },
  //物流
  wuliu() {
    wx.navigateTo({
      url: '/pages/personal/wuliu/wuliu',
    })
  },
  //评价
  pingjia() {
    wx.navigateTo({
      url: '/pages/personal/pingjia/pingjia',
    })
  },
  // 订单详情
  order_int() {
    wx.navigateTo({
      url: '/pages/personal/order_int/order_int',
    })
  },
  // 获取全部订单
  onLoad(){
    if(app.globalData.is_login==null){
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
    }else{
      wx.request({
        url:imgurl+ 'api/order_mini/myOrderList',
        method:"POST",
        header:{
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          status:'all',
          token:app.globalData.is_login
        },
        success(res){
          console.log(res)
        }
      })
    }
  }
})