// pages/my/my.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tuxiang: '/images/image_user.png',
    username: app.globalData.is_login,
    member_img: '',
    member_name: '',
    level_name: ''
  },
  person() {
    wx.navigateTo({
      url: '/pages/personal/personmsg/personmsg',
    })
  },
  caiwu() {
    wx.navigateTo({
      url: '/pages/personal/caiwu/caiwu',
    })
  },
  // 安全中心
  safe() {
    wx.navigateTo({
      url: '/pages/personal/safe/safe',
    })
  },
  //我的收藏
  mycol() {
    wx.navigateTo({
      url: '/pages/personal/mycol/mycol',
    })
  },
  //地址管理
  address() {
    wx.navigateTo({
      url: '/pages/personal/address/address',
    })
  },
  //我的社区
  club() {
    wx.navigateTo({
      url: '/pages/personal/club/club',
    })
  },
  // 积分中心
  jifen() {
    wx.navigateTo({
      url: '/pages/personal/jifen/jifen',
    })
  },
  // 商城分享
  share() {
    wx.navigateTo({
      url: '/pages/personal/shareshop/shareshop',
    })
  },
  //全部订单
  order() {
    wx.navigateTo({
      url: '/pages/personal/order_all/order_all',
    })
  },
  // 登录页面
  login() {
    wx.navigateTo({
      url: '/pages/personal/login/login',
    })
  },
  // 退出登录
  out() {
    wx.navigateTo({
      url: '/pages/personal/login/login',
    })
  },
  onLoad() {
    var that=this;
    if (app.globalData.is_login == null) {
      wx.showToast({
        title: '您还没有登录',
        icon: 'none'
      })
    } else {
      // 获取个人信息
      wx.request({
        url: imgurl + 'api/member/personalData',
        data: {
          token: app.globalData.is_login
        },
        success(res) {
          let data=res.data.data;
          that.setData({
            member_img: data.member_img,
            member_name:data.member_info.member_name,
            level_name: data.member_info.level_name
          })
        }
      });
    }
  }
})