// pages/search/search.js
const app=getApp();
const imgurl=app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cata:['店铺','商品'],
    active:0
  },
  // 判断选中哪个分类
  active(e){
    this.setData({
      active:e.currentTarget.dataset.id
    });
    
  },
// 获取输入框的内容
send(e){
  this.setData({
    search:e.detail.value.search
  });
  var that=this;
  if (that.data.active == 0) {
    wx.request({
      url: imgurl + 'api/goods/shopsSearchList',
      method: "post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        sear_name: e.detail.value.search,
        page: 1
      },
      success(res) {
        console.log(res)
      }
    })
  } else {

  }
}
})