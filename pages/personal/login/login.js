// pages/personal/login/login.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    log: ['登录', '注册'],
    active: 0,
    getyan: '获取验证码',
    actives:0,
    is_login :app.globalData.is_login
  },
  active(e) {
    this.setData({
      active: e.currentTarget.dataset.id
    })
  },
  // 获取手机号
  getphone(e) {
      this.setData({
        phone: e.detail.value
      })
  },
  // 获取验证码
  getnum() {
    var that = this;
    wx.request({
      url: imgurl +'/index.php?s=/api/login/checkMobileIsHas',
      data: { mobile:that.data.phone},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if(res.data.code==210){
         wx.showToast({
           title: res.data.message,
           icon: 'none',
         })
        }else if(res.data.code==200){
          if (that.data.getyan = 0 || that.data.getyan == '获取验证码') {
            wx.request({
              url: imgurl + 'index.php?s=/api/Send_Sms/send',
              method: "GET",
              data: {
                phone: that.data.phone,
                event:'register'
              },
              success: (res) => {
                var yan = 60;
                var timer = setInterval(function () {
                  if (yan <= 0) {
                    that.setData({
                      getyan: '获取验证码'
                    });
                    clearInterval(timer);
                  } else {
                    yan--;
                    that.setData({
                      getyan: yan
                    });
                  }
                }, 1000)
              }

            })
          }
        }
      }
    })
    
  },
  // 是否选中协议
  actives(){
    if(this.data.actives==0){
      this.setData({
        actives: 1
      })
    }else {
      this.setData({
        actives: 0
      })
    }
  },
  // 注册
  formSubmit(e) {
    var that=this;
    // 获取提交的数据
    let phone = e.detail.value.phone,
      yanzheng = e.detail.value.yanahengma,
      pass = e.detail.value.pass,
    repass = e.detail.value.repass,
    tui = e.detail.value.tui;
    if (yanzheng == '') {
      wx.showToast({
        title: '验证码不能为空',
        mask: true,
        icon: 'none'
      })
    } else if (pass == '') {
      wx.showToast({
        title: '请输入密码',
        mask: true,
        icon: 'none'
      })
    } else if (repass == '') {
      wx.showToast({
        title: '支付密码不能为空',
        mask: true,
        icon: 'none'
      })
    } else if (that.data.actives != 1) {
      wx.showToast({
        title: '请选择用户协议',
        mask: true,
        icon: 'none'
      })
    } else if (tui=='') {
      wx.showToast({
        title: '请填写推荐人',
        mask: true,
        icon: 'none'
      })
    } else {
      wx.request({
        url:imgurl+ 'index.php?s=/api/login/register',
        method:"post",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          flag:1,
          phone:phone,
          code:yanzheng,
          password:pass,
          p_phone:tui,
          two_password:repass
        },
        success(res){
          console.log(res)
        }
      })
    }
  },
  // 登录
  formSubmits(e){
    var that=this;
   var password=e.detail.value.password,
     tellphone = e.detail.value.tellphone;
     if(password==''){
       wx.showToast({
         title: '密码不能为空',
         icon:'none'
       })
     }else if(tellphone==''){
       wx.showToast({
         title: '用户名不能为空',
         icon: 'none'
       })
     }else{
       wx.request({
         url: imgurl+'api/login/login',
         method:"POST",
         data: {
           code:password,
           phone: tellphone,
           flag:2
         },
         header: {
           "Content-Type": "application/x-www-form-urlencoded"
         },
         success(res){
           console.log(res);
           if(res.data.code==-2001){
             wx.showToast({
               title: res.data.message,
               icon:'none'
             })
           } else if (res.data.code == 200){
             app.globalData.is_login = res.data.data;
             wx.showToast({
               title: '登录成功',
             });
             setTimeout(function(){
               wx.reLaunch({
                 url: '/pages/index/index',
               })
             },2000);
           }
         }
       })
     }
  },
  // 忘记密码
  repass(){
    wx.navigateTo({
      url: '/pages/personal/repass/repass',
    })
  }
})