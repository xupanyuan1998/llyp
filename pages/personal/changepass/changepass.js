// pages/personal/changepass/changepass.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    phone:'',
    getnums:'获取验证码'
  },
  onLoad(datas){
    //获取上个页面传入的id
    var id=datas.id;
    var that=this;
    this.setData({
      id:id
    });
    wx.request({
      url: imgurl + 'api/member/personalData',
      data:{
        token:app.globalData.is_login
      },
      success(res){
        that.setData({
          phone: res.data.data.member_info.user_info.user_tel
        })
      }
    })
  },
  // 获取修改密码验证码
  getNum(){
    var that=this;
    wx.request({
      url: imgurl +'api/Send_Sms/send',
      data:{
        phone:that.data.phone,
        event: 'changepwd'
      },
      success(res){
        if(res.data.code==200){
          var yan=60;
          var timer=setInterval(function(){
            if(yan<=0){
              that.setData({
                getnums:'获取验证码'
              })
              clearInterval(timer);
            }else{
              yan--;
            that.setData({
              getnums:yan
            })
            }
          },1000)
        }
      }
    })
  },
  //修改登录密码
  loginpass(e){
    var data=e.detail.value;//获取前端携带的数据
    var oldPass=data.oldpass,
        newPass=data.newpass,
        repatPass=data.repatpass,
        code=data.num;
    if(oldPass==''){
      wx.showToast({
        title: '旧密码不能为空',
        icon:'none'
      })
    }else if(newPass==''){
      wx.showToast({
        title: '新密码不能为空',
        icon: 'none'
      })
    }else if(repatPass!=newPass){
      wx.showToast({
        title: '两次密码不一致，请重新输入',
        icon: 'none'
      })
    }else if(code==''){
      wx.showToast({
        title: '验证码不能为空',
        icon:'icon'
      })
    }else{
      wx.request({
        url: imgurl + 'api/member/modifyPassword',
        method:"POST",
        header:{
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          old_password:oldPass,
          new_password:newPass,
          res_password: repatPass,
          code:code,
          type:1,
          token:app.globalData.is_login
        },
        success(res){
          if(res.data.data.code!=200){
            wx.showToast({
              title: '修改失败,请检查输入是否有误',
              icon: 'icon'
            })
          }else{
            wx.showToast({
              title: '修改成功,请重新登录',
              icon: 'icon'
            });
            setTimeout(function(){
              wx.navigateTo({
                url: '/pages/personal/login/login',
              })
            },2000)
          }
        }
      })
    }
  },
  // 获取支付验证码
  getpay(){
    var that = this;
    wx.request({
      url: imgurl + 'api/Send_Sms/send',
      data: {
        phone: that.data.phone,
        event: 'setpaypwd'
      },
      success(res) {
        if (res.data.code == 200) {
          var yan = 60;
          var timer = setInterval(function () {
            if (yan <= 0) {
              that.setData({
                getnums: '获取验证码'
              })
              clearInterval(timer);
            } else {
              yan--;
              that.setData({
                getnums: yan
              })
            }
          }, 1000)
        }
      }
    })
  },
  //修改支付密码
  payPass(e) {
    var data = e.detail.value;//获取前端携带的数据
    var oldPass = data.oldpass,
      newPass = data.newpass,
      repatPass = data.repatpass,
      code = data.num;
    var that=this;
    if (oldPass == '') {
      wx.showToast({
        title: '旧密码不能为空',
        icon: 'none'
      })
    } else if (newPass == '') {
      wx.showToast({
        title: '新密码不能为空',
        icon: 'none'
      })
    } else if (repatPass != newPass) {
      wx.showToast({
        title: '两次密码不一致，请重新输入',
        icon: 'none'
      })
    } else if (code == '') {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'icon'
      })
    } else {
      wx.request({
        url: imgurl + 'api/member/modifyPassword',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          old_password: oldPass,
          new_password: newPass,
          res_password: repatPass,
          code: code,
          type: 2,
          token: app.globalData.is_login
        },
        success(res) {
          if (res.data.code != 200) {
            wx.showToast({
              title: '修改失败,请重试',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: '修改成功',
              icon: 'icon'
            });
            that.setData({
              info:''
            })
          }
        }
      })
    }
  },
})