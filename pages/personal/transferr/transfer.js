// pages/personal/transferr/transfer.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yue:'0.00'
  },
  // 转账记录
  jilu(){
    wx.navigateTo({
      url: '/pages/personal/zhuanrecord/zhuanrecord',
    })
  },
  onLoad(datas){
   this.setData({
     yue:datas.money
   })
  },
  // 转账
  zhuan(e){
    var that=this;
    var data=e.detail.value,//获取传入的数据
        zhanghao=data.zhanghao,
        money=data.money,
        password=data.password;
    //手机号正则
    var nphone = /^1[34578]\d{9}$/;
    //支付密码正则
    var payPass = /^\d{6}$/;
    if(!nphone.test(zhanghao)){
      wx.showToast({
        title: '请输入正确的账号',
        icon:'none'
      })
    }else if(money==''){
      wx.showToast({
        title: '金额不能为空',
        icon: 'none'
      })
    }else if(!payPass.test(password)){
      wx.showToast({
        title: '密码格式不正确',
        icon: 'none'
      })
    } else if (money>that.data.yue) {
      wx.showToast({
        title: '余额不足',
        icon: 'none'
      })
    }else{
      wx.request({
        url:imgurl+ 'api/member/submitTransfer',
        method:"POST",
        header:{
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          phone:zhanghao,
          money:money,
          two_password:password,
          token:app.globalData.is_login
        },
        success(res){
         if(res.data.code==200){
           wx.showToast({
             title: '转账成功',
           });
           that.setData({
             info:''
           })
           wx.request({
             url: imgurl + 'api/member/accountlist',
             method: "post",
             header: {
               "Content-Type": "application/x-www-form-urlencoded"
             },
             data: {
               token: app.globalData.is_login
             },
             success(res) {
               var money = res.data.data.money;
               that.setData({
                 
                 yue: money
               })
             }
           })
         }
        }
      })
    }
  }
})