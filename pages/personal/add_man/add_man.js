// pages/personal/add_man/add_man.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:''
  },
per(e){
    this.setData({
      name: e.detail.value
    })
},
send(){
  var that = this;
  if (this.data.name == '') {
    wx.showToast({
      title: '推荐人不能为空',
      icon: 'none'
    })
  } else {
    wx.request({
      url: imgurl + 'api/member/bindUpgrade',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        value: that.data.name,
        token: app.globalData.is_login
      },
      success(res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '修改成功',
          })
          wx.navigateTo({
            url: '/pages/personal/personmsg/personmsg',
          })
        }
      }
    })
  }
}
})