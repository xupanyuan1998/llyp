// pages/personal/recharge/recharge.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  chongzhi(e){
    console.log(e.detail.value)
    this.setData({
      chongzhi:e.detail.value
    })
  },
// 确认充值
save(){
  var that=this;
  wx.request({
    url: imgurl + 'api/member/createRechargeOrder',
    method:"POST",
    header:{
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data:{
      recharge_money: that.data.chongzhi,
      token:app.globalData.is_login
    },
    success(res){
      if(res.data.code==200){
        wx.navigateTo({
          url: '/pages/personal/oksave/oksave?money=' + that.data.chongzhi+'&id='+res.data.data,
        })
      }
    }
  })
  
},
//充值记录
chjilu(){
  wx.navigateTo({
    url: '/pages/personal/chjilu/chjilu',
  })
}
})