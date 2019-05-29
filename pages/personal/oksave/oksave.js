// pages/personal/oksave/oksave.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay: [{ src: '/images/pay_2.png', name: '银行卡支付', checked:"true"},
      { src: '/images/pay_1.png', name: '微信支付' },
    ],
   int:0
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  // 提交充值
  oksave(){
    wx.navigateTo({
      url: '/pages/personal/chsave/chsave',
    })
  },
  onLoad(datas){
   var that=this;
  //  获取充值订单的详细信息
  wx.request({
    url: imgurl+'api/member/rechargeDetail',
    method:"post",
    header:{
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data:{
      id:datas.id,
      token:app.globalData.is_login
    },
    success(res){
      console.log(res.data.data);
      var int=res.data.data;
      that.setData({
        int:int
      })
    }
  })
  }
})