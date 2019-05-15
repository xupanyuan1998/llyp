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
    imageurl:'http://www.lianlianyp.com/'
  },
  // 分类切换
  active(e) {
    this.setData({
      active: e.target.dataset.index,
      show: 'none'
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this=this;
    // 获取当前分类id 和名称
    console.log(options);
    let id = options.id;
    let name = options.name;
    wx.request({
      url: imgurl +'/index.php?s=/api/goods/goodsClassificationList',
      success(res){
        _this.setData({
          cata: res.data.data
        })
      }
    });
    wx.request({
      url: imgurl + 'api/goods/goodsList',
      method: "POST",
      data: {
        category_id: '',
        block_id: id
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        var arr = [];
        var a = res.data.data.data;
        for (var index in a) {
          arr.push(index.category_name)
        }
        console.log(arr);
        _this.setData({
          Goods: a,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
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