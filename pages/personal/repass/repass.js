//index.js
//获取应用实例
var guan = null;  //定时器名字
const app=getApp();
const imgurl = app.globalData.imgurl;

Page({
  data: {
    time:'获取验证码',  //验证码输出
    list:true , //判断连续点击
    phone:0,
  },
  code:function(){
    var time = 60;  //验证码时间
    var ti = this;
    // 获取验证码
    wx.request({
      url: imgurl + 'index.php?s=/api/Send_Sms/send',
      method: "GET",
      data: {
        phone: ti.data.phone,
        event: 'resetpwd'
      },
      success(res){
        if(res.data.code==200){
          ti.setData({
            list: false  //判断点击  不可换位置要不出bug
          })
          guan = setInterval(function () {
            time--;
            if (time <= 0) {  //判断关闭定时器  不能简写要不出bug
              clearInterval(guan);  //关闭定时器
              ti.setData({
                time: '重新发送',  //验证码时间过后
                list: true  //时间过后点击
              })
            } else {
              ti.setData({
                time: time  //验证码时间时刻传递
              })
            }
          }, 1000)
        }
      }
    })
  
  },
  formSubmit(e){
   var phone=e.detail.value.phone,
     yanzheng = e.detail.value.yanzheng,
     password = e.detail.value.password,
    repass = e.detail.value.repass;
    if(phone==''){
      wx.showToast({
        title: '手机号码不能为空',
        icon:'none'
      })
    }else if(yanzheng==''){
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
    }else if(password==''){
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
    }else if(repass!=password){
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      })
    }else{
      wx.request({
        url: imgurl + '/index.php?s=/api/login/forget_password',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          phone: phone,
          code: yanzheng,
          re_pwd: repass,
          new_pwd: password,
        },
        success(res) {
          if(res.data.code){
            wx.showToast({
              title: '密码重置成功',
            })
          }
        }
      })
    }
  },
// 获取手机号
getphone(e){
  this.setData({
    phone: e.detail.value
  })
}
})
