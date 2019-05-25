// pages/int/int.js
const app = getApp();
const imgurl = app.globalData.imgurl;
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    image_int: '',
    share_msg:"",
    saoma:'',
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
        // 判断有没有规格的主图
        var tu = dataes.goods_detail.picture_detail.pic_cover_small;
        _this.setData({
          image_int: dataes.goods_detail.img_list,
          data_int: dataes,
          guige: dataes.goods_detail.spec_list,
          stock: dataes.goods_detail.stock,
          //  获取goods_id 得到相关推荐
          goods_id: dataes.goods_detail.goods_id,
          logo_ban: tu,
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
            });
            wx.request({
              url: imgurl + '/api/member/myCollection',
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                token: app.globalData.is_login
              },
              success(suc) {
                var arr = [];
                var len = suc.data.data.data.length;
                for (let i = 0; i < len; ++i) {
                  arr.push(suc.data.data.data[i].goods_id);
                };
                // 判断当前商品是否被收藏过
                var a = dataes.goods_detail.goods_id;
                var leng = arr.length;
                for (let i = 0; i < leng; ++i) {
                  if (a == arr[i]) {
                    _this.setData({
                      shoucangs: true
                    })
                  }
                }
              }
            });
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
    var id = e.currentTarget.dataset.id;
    var smallimg = that.data.data_int.goods_detail.sku_picture_array
    if(smallimg==''){
      that.setData({
        color_active: id,
        sum: that.data.data_int.goods_detail.sku_list[id].price * that.data.numberType
      })
    }else{
      that.setData({
        color_active: id,
        logo_ban: that.data.data_int.goods_detail.sku_picture_array[id].sku_picture_query[0].pic_cover_small,
        sum: that.data.data_int.goods_detail.sku_list[id].price * that.data.numberType
      })
    }
   
  },
  // yincangguige
  hidden() {
    this.setData({
      specifications: 'none'
    })
  },
  //商品分享
  share_c() {
    var that=this;
    this.setData({
      show: 'block'
    });
    // 将图片转成64
    wx.request({
      url: imgurl + 'api/goods/toBase64',
      data: {
        path: that.data.image_int[0].pic_cover
      },
      success(res) {
        that.setData({
          share_banner:res.data.data
        })
        wx.request({
          url: imgurl + 'api/goods/getShareContents',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            flag: "goods",
            shop_id: that.data.data_int.goods_detail.shop_id,
            token: app.globalData.is_login
          },
          success(req) {
            console.log(req)
          }
        })
      }
    })
    // 获取分享二维码
    
    
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
    }
  },
  // 取消收藏
  cancletabloidbaby() {
    var that = this;
    if (app.globalData.is_login == null) {
      wx.showToast({
        title: '您没有登录不能收藏',
        icon: 'none'
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
        success(req) {
          if (req.data.code == 200) {
            wx.showToast({
              title: req.data.message,
            });
            that.setData({
              shoucangs: false
            })
          }
        }
      })
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
          wx.request({
            url: imgurl + '/api/helpcenter/judgeChat',
            method: "post",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              id: res.data.data.shop_info.uid,
              token: app.globalData.is_login
            },
            success(req) {
              wx.navigateTo({
                url: '/pages/chat/chat?id=' + req.data.data + '&name=' + res.data.data.shop_info.shop_name
              })
            }
          })
        }
      })
    }
  },
  // 加入购物车
  addcar() {
    console.log(1111)
    var that = this;
    const datas = that.data.data_int;
    let color_active = that.data.color_active,
      goods_id = that.data.goods_id,
      shop_name = datas.shopname || '善缘堂',
      price = datas.goods_detail.member_price,
      goods_name = datas.goods_detail.goods_name,
      cost_price = datas.goods_detail.sku_list[color_active].cost_price,
      shop_id = datas.goods_detail.shop_id,
      select_skuid = datas.goods_detail.sku_list[color_active].sku_id,
      sku_name = datas.goods_detail.sku_list[color_active].sku_name,
      pictureId = datas.goods_detail.picture;
    var cart_detail = {
      trueId: goods_id,
      shop_name: shop_name,
      price: price,
      goods_name: goods_name,
      cost_price: cost_price,
      shop_id: shop_id,
      select_skuid: select_skuid,
      select_skuName: sku_name,
      picture: pictureId,
      count: that.data.numberType
    }

    if (app.globalData.is_login == null) {
      wx.showToast({
        title: '加入购物车失败，请登陆后重试',
        icon: "none",
        mask: 'true'
      })
    } else {
      console.log(cart_detail);
      wx.request({
        url: imgurl + 'api/cart/addcart',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        dataType: 'JSON',
        data: {
          cart_detail_wx: JSON.stringify(cart_detail),
          cart_tag: "addcart",
          token: app.globalData.is_login
        },
        success(res) {
        var dataes=JSON.parse(res.data)
        console.log(dataes);
          if(dataes.code==200){
            wx.showToast({
              title:dataes.message
            })
          }
        }
      })
    }
  },
  // 立即购买
  buyNow(){
    var that= this;
    let color_active = that.data.color_active,
      select_skuid = that.data.data_int.goods_detail.sku_list[color_active].sku_id;
    wx.request({
      url: imgurl + 'api/order_mini/orderCreateSession',
      method:"POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        tag:'buy_now',
        sku_id: select_skuid,
        num: that.data.numberType,
        token:app.globalData.is_login,
        cart_id:''
      },
      success(res){
        console.log(res)
        if(res.data.code==200){
          wx.navigateTo({
            url: '/pages/order/order?list=' + JSON.stringify(res.data.data),
          })
        }
      }
    })
  }
})