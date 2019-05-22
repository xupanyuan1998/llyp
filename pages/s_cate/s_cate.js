// pages/s_cate/s_cate.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cata: [],
    active: 0,
    show: 'none',
    Goods:[],
    imageurl:'http://www.lianlianyp.com/',
    block_id:'',
  },
  // 分类切换
  active(e) {
    this.setData({
      active: e.target.dataset.index,
      show: 'none'
    })
    var that = this;
    wx.request({
      url: imgurl + 'api/goods/goodsList',
      method: "POST",
      data: {
        category_id: e.currentTarget.dataset.category,
        block_id: that.data.block_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        that.setData({
          Goods: res.data.data.data,
        })
      }
    })
  },
  // 全部分类
  allcate() {
    if (this.data.show == 'none') {
      this.setData({
        show: 'block'
      })
    } else {
      this.setData({
        show: 'none'
      })
    }
  },
  // 商品详情跳转
  goodsint(e){
    wx.navigateTo({
      url: '/pages/int/int?int='+e.currentTarget.dataset.int,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this=this;
    // 获取当前分类id 和名称
    let id = options.id;
    let name = options.name;
    wx.setNavigationBarTitle({ title: name })  
    wx.request({
      url: imgurl + '/index.php?s=/api/goods/goodsClassificationList',
      method: "POST",
      data: {
        block_id:id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
       _this.setData({
          cata: res.data.data,
          block_id: id
        })
        wx.request({
          url: imgurl + 'api/goods/goodsList',
          method: "POST",
          data: {
            category_id: '',
            block_id: id
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: (res) => {
            _this.setData({
              Goods: res.data.data.data,
            })
          }
        });
      }
    })
  },
 
   /* 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})