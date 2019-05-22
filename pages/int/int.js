// pages/int/int.js
const app = getApp();
const imgurl = app.globalData.imgurl;
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    image_int: '',
    imgurl: 'http://www.lianlianyp.com/',
    share: [{
        src: '/images/wechart.png',
        text: '微信好友'
      },
      {
        src: '/images/firend.png',
        text: '朋友圈'
      },
      {
        src: '/images/apply.png',
        text: '保存图片'
      }
    ],
    show: 'none',
    active: 0,
    comments: [{
        num: 0,
        text: '详情'
      },
      {
        num: 1,
        text: '评论'
      },
    ],
    pinglun_all: ['全部', "好评", '有图'],
    comments_int: [],
    data_int: '',
    activePing: 0,
    goodsping: 0,
    goods_id: 0,
    // guige
    specifications: 'none',
    arrName: [],
    goods_spec: '',
    guilist: '',
    selectGuigeName: '',
    textStates: ["sdalfd", "g_active"],
    jies: ['宝贝', "详情", "评价", "推荐"],
    nav: 0,
    b_ac: 0,
    opition: 'body_0',
    canshu_active: 0,
    color_active: 0,
    numberType: 1,
    // 选中价格
    sum: '',
    // 收藏
    shoucangs: false,
  },
  onLoad(datas) {
    var _this = this;
    wx.request({
      url: imgurl + '/index.php?s=/api/goods/detailGoods&id=' + datas.int,
      success(res) {
        let dataes = res.data.data;
        var article = dataes.goods_detail.description;
        WxParse.wxParse('article', 'html', article, _this);
        _this.setData({
          image_int: dataes.goods_detail.img_list,
          data_int: dataes,
          guige: dataes.goods_detail.spec_list,
          stock: dataes.goods_detail.stock,
          //  获取goods_id 得到相关推荐
          goods_id: dataes.goods_detail.goods_id,
          logo_ban: dataes.goods_detail.sku_picture_array[0].sku_picture_query[0].pic_cover_small,
          sum: dataes.goods_detail.sku_list[0].price * _this.data.numberType
        });
        wx.request({
          url: imgurl + 'index.php?s=/api/goods/RelatedRecommendations',
          method: "POST",
          data: {
            goods_id: dataes.goods_detail.goods_id,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success(res) {
            _this.setData({
              // 设置相关推荐的数据
              recommended: res.data.data.data
            })
          },
        })
      }
    })
  },
  // 页面滚动
  onPageScroll: function(e) {
    if (e.scrollTop >= 200) {
      this.setData({
        nav: 1
      })
    } else if (e.scrollTop < 200) {
      this.setData({
        nav: 0
      })
    }

  },
  // 下拉表头
  b_ac(e) {
    this.setData({
      b_ac: e.currentTarget.dataset.id,
      opition: e.currentTarget.dataset.cata
    })
  },
  // 详情
  active(e) {
    var that = this;
    this.setData({
      active: e.currentTarget.dataset.id,
      goods_id: e.currentTarget.dataset.goods_id
    })
    // 判断是否点击评论
    if (e.currentTarget.dataset.id == 1) {
      wx.request({
        url: imgurl + 'index.php?s=/api/goods/getGoodsComments',
        method: "POST",
        data: {
          goods_id: e.currentTarget.dataset.goods_id,
          comments_type: 5
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: (res) => {
          that.setData({
            comments_int: res.data.data.data
          })
        }
      })
    }
  },
  //  评论类别
  goodsping(e) {
    var that = this;
    var comments_type;
    this.setData({
      goodsping: e.currentTarget.dataset.idx
    });
    if (e.currentTarget.dataset.idx == 1) {
      comments_type = 1;
    } else if (e.currentTarget.dataset.idx == 2) {
      comments_type = 4;
    } else {
      comments_type = 5;
    };
    wx.request({
      url: imgurl + 'index.php?s=/api/goods/getGoodsComments',
      method: "POST",
      data: {
        goods_id: that.data.goods_id,
        comments_type: comments_type
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        that.setData({
          comments_int: res.data.data.data
        })
      }
    })
  },
  // 挑选规格
  specifications() {
    this.setData({
      specifications: 'block'
    });
  },
  // guige
  canshu(e) {
    let canshu = e.currentTarget.dataset.id;
    let canshu_name = e.currentTarget.dataset.item;
    this.setData({
      canshu_active: canshu
    })
  },
  // xuanzhongyashe
  color(e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    that.setData({
      color_active: id,
      logo_ban: that.data.data_int.goods_detail.sku_picture_array[id].sku_picture_query[0].pic_cover_small,
      sum: that.data.data_int.goods_detail.sku_list[id].price * that.data.numberType
    })
  },
  // yincangguige
  hidden() {
    this.setData({
      specifications: 'none'
    })
  },
  //商品分享
  share_c() {
    this.setData({
      show: 'block'
    });
    wx.request({
      url: '',
    })
  },
  // 规格减少数量
  ntotpr() {
    var that = this;
    var num = this.data.numberType;
    if (num > 1) {
      num--;
      this.setData({
        numberType: num,
        sum: num * that.data.data_int.goods_detail.sku_list[that.data.color_active].price
      })
    }
  },
  // 规格增加数量
  addnum() {
    var that = this;
    var num = this.data.numberType;
    if (num < this.data.stock) {
      num++;
      this.setData({
        numberType: num,
        sum: num * that.data.data_int.goods_detail.sku_list[that.data.color_active].price
      })
    }
  },
  //  相关推荐详情页面
  xiangguan(e) {
    wx.navigateTo({
      url: '/pages/int/int?int=' + e.currentTarget.dataset.int,
    })
  },
  //关闭分享页面
  close() {
    this.setData({
      show: 'none'
    })
  },
  shop(e) {
    wx.navigateTo({
      url: '/pages/businessshop/businessshop?id=' + e.currentTarget.dataset.shop_id,
    });
  },
  // 收藏宝贝
  tabloidbaby() {
    var that = this;
    if (app.globalData.is_login == null) {
      wx.showToast({
        title: '您没有登录不能收藏',
        icon: 'none'
      })
    } else {
      if (that.data.shoucangs == 'false') {
        wx.request({
          url: imgurl + '/api/member/FavoritesGoodsorshop',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            fav_id: that.data.goods_id,
            fav_type: 'goods',
            token: app.globalData.is_login
          },
          success(res) {
            console.log(res)
            if (res.data.code == 200) {
              wx.showToast({
                title: res.data.message,
              });
              that.setData({
                shoucangs: 'true'
              })
            }
          }
        })
      } else {
        wx.request({
          url: imgurl + '/api/member/cancelFavorites',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            fav_id: that.data.goods_id,
            fav_type: 'goods',
            token: app.globalData.is_login
          },
          success(res) {
            if (res.data.code == 200) {
              wx.showToast({
                title: res.data.message,
              });
              that.setData({
                shoucangs: 'false'
              })
            }
          }
        })
      }
    }
  },
  // 进入聊天页面
  chat(e) {
    if (app.globalData.is_login == null) {
      wx.showToast({
        title: '您还未登录',
      })
    } else {
      wx.request({
        url: imgurl + 'api/Shop/index',
        data: {
          shop_id: e.currentTarget.dataset.shop_id
        },
        success(res) {
          wx.navigateTo({
            url: '/pages/chat/chat?id=' + res.data.data.shop_info.uid + '&name=' + res.data.data.shop_info.shop_name
          })
        }
      })
    }
  }
})