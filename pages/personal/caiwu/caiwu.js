// pages/personal/caiwu/caiwu.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    money:0,
    shou:0
  },
  // 添加银行卡
  add_card(){
    wx.navigateTo({
      url: '/pages/personal/addcard/addcard',
    })
  },
  //转账页面
  transfer(){
    wx.navigateTo({
      url: '/pages/personal/transferr/transfer?money='+this.data.money,
    })
  },
  //充值页面
  recharge(){
    wx.navigateTo({
      url: '/pages/personal/recharge/recharge',
    })
  },
  // 提现页面
  tx(){
    wx.navigateTo({
      url: '/pages/personal/tx/tx',
    })
  },
  //获取银行卡列表
  onShow(){
    var that=this;
    wx.request({
      url:imgurl+ 'api/member/accountlist',
      method:"post",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        token:app.globalData.is_login
      },
      success(res){
        var list=res.data.data.list,
            money=res.data.data.money;
        that.setData({
          list:list,
          money:money
        })
      }
    })
  },
  // 删除银行卡
  dels(e){
    var id=e.currentTarget.dataset.id;
    wx.request({
      url: imgurl+'api/member/delAccount',
      method:'POST',
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        id:id,
        token:app.globalData.is_login
      },
      success(res){
        if(res.data.code==200){//判断如果删除成功就重新获取银行卡列表
          wx.showToast({
            title: '删除成功',
          });
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
              var list = res.data.data.list,
                money = res.data.data.money;
              that.setData({
                list: list,
                money: money
              })
            }
          })
        }
      }
    })
  }
})