// pages/personal/tx/tx.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',//所有的银行卡
    arr:'',//银行卡尾号
    show:'none',
    yue:0,
    name:'',
    num:'',
    cardid:''
  },
// 提现记录页面
txjilu(){
  wx.navigateTo({
    url: '/pages/personal/txjilu/txjilu',
  })
},
onLoad(){
  //获取银行卡列表
  var that = this;
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
      var list = res.data.data.list;
        var arr=[];
        for(var i in list){
          arr.push(list[i].account_number.substring(15))
        }
      that.setData({
        list:list,
        arr:arr
      })
      wx.request({
        url: imgurl +'api/member/Withdraw',
        data:{
          token:app.globalData.is_login
        },
        success(res){
          var data=res.data.data;
          that.setData({
            yue:data.account,
            name: data.account_list[0].branch_bank_name,
            num: data.account_list[0].account_number.substring(15),
            cardid: data.account_list[0].id
          })
        }
      })
    }
  })
},
  changeCard(){
    this.setData({
      show:'block'
    })
},
can(){
  this.setData({
    show: 'none'
  })
},
// 选择银行卡
active(e){
  var name=e.currentTarget.dataset.name;
  var num=e.currentTarget.dataset.num;
  var cardid = e.currentTarget.dataset.id
  this.setData({
    name:name,
    num:num,
    cardid:cardid,
    show:'none'
  })
},
all(){
  this.setData({
    money:this.data.yue
  })
},
// 获取表单提交数据
send(e){
  var data = e.detail.value;
  var jine=data.jine,
  pass=data.pass;
  var that=this;
  if(jine<=0){
    wx.showToast({
      title: '金额不能小于0元',
      icon:'none'
    })
  } else if (!(/^\d{6}$/).test(pass)){
    wx.showToast({
      title: '密码格式不正确',
      icon: 'none'
    })
  }else{
    wx.request({
      url:imgurl+ '/api/member/toWithdraw',
      method:"POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        bank_account_id:that.data.cardid,
        cash:jine,
        token:app.globalData.is_login,
        two_password:pass
      },
      success(res){
        if(res.data.code==200){
          wx.showToast({
            title: '提现成功',
          });
          that.setData({
            clear:'',
            money:''
          })
        }
      }
    })
  }
}
})