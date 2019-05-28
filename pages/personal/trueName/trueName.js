// pages/personal/trueName/trueName.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:''
  },
  shuru(e){
  this.setData({
    name: e.detail.value
  })
  },
  // 提交
  send(){
    var that=this;
    if(this.data.name==''){
      wx.showToast({
        title: '名字不能为空',
        icon:'none'
      })
    }else{
      wx.request({
        url: imgurl + 'api/member/editUser',
        method:"POST",
        header:{
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          field:'real_name',
          value:that.data.name,
          token:app.globalData.is_login
        },
        success(res){
          if(res.data.code==200){
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