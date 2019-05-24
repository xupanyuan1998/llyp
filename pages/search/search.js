// pages/search/search.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cata: ['店铺', '商品'],
    active: 0,
    shop_name: null,
    goods: null,
    imgurls: "http://www.lianlianyp.com/"
  },
  // 判断选中哪个分类
  active(e) {
    this.setData({
      active: e.currentTarget.dataset.id
    });
    var that = this;
    console.log(that.data.search)
    if (that.data.search == '') {
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none'
      })
    } else {
      if (e.currentTarget.dataset.id == 0) {
        wx.request({
          url: imgurl + 'api/goods/shopsSearchList',
          method: "post",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            sear_name: that.data.search,
            page: 1
          },
          success(res) {
            that.setData({
              shop_name: res.data.data.data
            })
          }
        })
      } else {
        wx.request({
          url: imgurl + 'api/goods/goodsSearchList',
          method: "post",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            sear_name: that.data.search,
            order: 'ng.promotion_price',
            sort: 'desc',
            page: 1
          },
          success(res) {
            that.setData({
              goods: res.data.data.data
            })
          }
        })
      }
    }
  },
  // 获取输入框的内容
  send(e) {
    this.setData({
      search: e.detail.value.search
    });
    var that = this;
    // 判断搜索内容是否为空
    if (e.detail.value.search == '') {
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none'
      })
    } else {
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
            that.setData({
              shop_name: res.data.data.data
            })
          }
        })
      } else {
        wx.request({
          url: imgurl + 'api/goods/goodsSearchList',
          method: "post",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            sear_name: e.detail.value.search,
            order: 'ng.promotion_price',
            sort: 'desc',
            page: 1
          },
          success(res) {
            console.log(res.data.data.data)
            that.setData({
              goods: res.data.data.data
            })
          }
        })
      }
    }
  },
  // 进入店铺
  join(e){
    wx.navigateTo({
      url: '/pages/businessshop/businessshop?id=' + e.currentTarget.dataset.shop_id,
    })
  },
  // 进入商品详情
  goods(e){
    console.log(e.currentTarget.dataset.goods_id)
    wx.navigateTo({
      url: '/pages/int/int?int='+e.currentTarget.dataset.goods_id,
    })
  }
})