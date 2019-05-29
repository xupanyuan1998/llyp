// pages/personal/addcard/addcard.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  // 添加银行卡
  addcard(e){
    var that=this;
    var data = e.detail.value;//获取提交的数据
    let bankName=data.bankName,//获取银行名称
        card=data.card,//获取银行卡号
        userName=data.userName,//获取用户姓名
        phone=data.phone;//获取手机号码；
    var pattern = /^([1-9]{1})(\d{14}|\d{18})$/, //银行卡号正则
        phonereg= /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;//手机号正则
    if(bankName==''){
      wx.showToast({
        title: '银行名称不能为空',
        icon:'none'
      })
    } else if (!pattern.test(card)){
      wx.showToast({
        title: '银行卡号不正确',
        icon: 'none'
      })
    } else if (userName=='') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
    }
    else if (!phonereg.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
    }else{
      wx.request({
        url:imgurl+ 'api/member/addAccount',
        method:'POST',
        header:{
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          mobile:phone,
          realname:userName,
          account_number:card,
          branch_bank_name:bankName,
          bank_type:1,
          token:app.globalData.is_login
        },
        success(res){
          console.log(res.data.data)
          if(res.data.code==200){
            wx.showToast({
              title: res.data.message,
            });
            that.setData({
              info:''
            })
          }
        }
      })
    }
  }
})