// pages/personal/tx/tx.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
      console.log(res)
      var list = res.data.data.list;
        var arr=[];
        for(var i in list){
          arr.push(list[i].account_number.substring(15))
        }
    }
  })
}
})