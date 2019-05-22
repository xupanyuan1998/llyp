// pages/businessshop/businessshop.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    commodity:'',
    shop: [{
      name: '推荐商品',
      num: 3
    }, {
      name: '全部商品',
      num: 0
    }, {
      name: '最新商品',
      num: 1
    }],
    active: 0,
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
    concern: 'false',
    shop_concern: '+ 关注',
    shop_name: '',
    imgurls: 'http://www.lianlianyp.com/',
    goods_id:''
  },
  // 店铺商品选中状态
  active(e) {
    var that=this;
    this.setData({
      active: e.target.dataset.id
    })
   wx.request({
     url: imgurl + '/api/shop/goodsList',
     data:{
       shop_id:that.data.shop_id,
       type:e.target.dataset.id
     },
     success(res){
       that.setData({
         commodity: res.data.data.goods_list
       });
     }
   })
   
  },
  //分享页面展示
  share() {
    this.setData({
      show: 'block'
    })
  },
  //分享页面隐藏
  dis() {
    this.setData({
      show: 'none'
    })
  },
  //关注店铺
  concern() {
    var _this = this;
    if (this.data.concern == 'false') {
      wx.request({
        url: imgurl + 'api/member/FavoritesGoodsorshop',
        method:"POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          fav_id:_this.data.goods_id,
          fav_type:'shop',
          log_msg:'',
          token:app.globalData.is_login
        },
        success(res){
         if(res.data.code==200){
           wx.showToast({
             title: res.data.message,
           })
           _this.setData({
             concern: 'true',
             shop_concern: '已关注'
           });
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
          fav_id: _this.data.goods_id,
          fav_type: 'shop',
          log_msg: '',
          token: app.globalData.is_login
        },
        success(res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: res.data.message,
            })
            _this.setData({
              concern: 'false',
              shop_concern: '+ 关注'
            })
          }
        }
      })
    }
  },
  onLoad(opition) {
    var that = this;
    var id = opition.id; //获取上个页面传入得id；
    that.setData({
      goods_id:id
    });
    wx.request({
      url: imgurl + 'api/Shop/index',
      data: {
        shop_id: id
      },
      success(res) {
        wx.setNavigationBarTitle({ title: res.data.data.shop_info.shop_name })  
        // 将获取到的店铺信息存入shop_name中
        that.setData({
          shop_name: res.data.data,
          shop_id: res.data.data.shop_id
        });
        // 默认获取全部商品
        wx.request({
          url: imgurl + '/api/shop/goodsList',
          data: {
            shop_id: res.data.data.shop_id,
            type: 0
          },
          success(res) {
            that.setData({
              commodity: res.data.data.goods_list
            });
          }
        })

      }
    })
  },
  // 商品详情
  com_int(e){
    wx.navigateTo({
      url: '/pages/int/int?int='+e.currentTarget.dataset.goods_id,
    })
  }
})