// pages/list_int/list_int.js
const app=getApp();
const imgurl=app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    imgurls:'http://www.lianlianyp.com/',
    windowHeight:'',
    navHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: imgurl + '/api/goods/goodsList',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        category_id: options.category_id,
        order: 'ng.sales ',
        sort: 'asc'
      },
      success(res) {
        that.setData({
          list: res.data.data.data
        })
      }
    })
    //获取购物车头部的高度
    wx.createSelectorQuery().select('.nav').boundingClientRect(function (res) {
      that.setData({
        navHeight: res.height
      });
    }).exec();
    wx.getSystemInfo({
      success: function (suc) {
        that.setData({
          windowHeight: suc.windowHeight
        })
      },
    });
  },
  // 跳转到商品详情
  int(e){
    wx.navigateTo({
      url: '/pages/int/int?int='+e.currentTarget.dataset.int
    })
  },
})