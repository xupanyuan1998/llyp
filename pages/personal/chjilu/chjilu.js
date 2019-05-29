// pages/personal/chjilu/chjilu.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chjilu: [{ src: '/images/wechat1.png', lei: '微信充值', jine: '500.00', date: '12-10 16:14', zt: '申请中' },
    { src: '/images/zhifubao1.png', lei: '支付宝充值', jine: '500.00', date: '12-10 16:14', zt: '申请中' },
    { src: '/images/yinlian1.png', lei: '银行卡充值', jine: '500.00', date: '12-10 16:14', zt: '申请中' },
    { src: '/images/wechat1.png', lei: '微信充值', jine: '500.00', date: '12-10 16:14', zt: '申请中' }
    ]
  },
//充值详情
chint(e){
    wx.navigateTo({
      url:'/pages/personal/chint/chint?id='+e.currentTarget.dataset.id,
    })
  },
  // 充值记录
  onLoad(){
    var that=this;
    wx.request({
      url: imgurl+'api/member/rechargeLog',
      method:'POST',
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        page:1,
        token:app.globalData.is_login
      },
      success(res){
        that.setData({
          chjilu:res.data.data
        })
      }
    })
  }
})