// pages/catas/catas.js
const app=getApp();
const imgurl=app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cata: [],
    active:0,
    imgurls:'http://www.lianlianyp.com/',
    twoCata:''
  },
  // 搜索页面
  search() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
// 选中分类
active(e){
  this.setData({
    active:e.currentTarget.dataset.id,
    twoCata: this.data.cata[e.currentTarget.dataset.id-1].child_list
  })
},
// 分类列表
list(e){
  // 跳转到二级分类详情页面
  wx.navigateTo({
    url: '/pages/list_int/list_int?category_id=' + e.currentTarget.dataset.cata_id,
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url:imgurl+ '/api/goods/goodsClassificationList',
      success(res){
        that.setData({
          cata:res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})