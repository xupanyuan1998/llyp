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
    level_name: '',
    dfk: '',
    dfh: '',
    dsh: '',
    dpj: ''
  },
  // 代付款
  dfk(e) {
    inOrder(e)
  },
  // 待发货
  dfh(e) {
    inOrder(e)
  },
  // 待收货
  dsh(e) {
    inOrder(e)
  },
  // 待评价
  dpj(e) {
    inOrder(e)
  },
  // 售后
  sh(e) {
    inOrder(e)
  },
  // 个人资料
  person() {
    wx.navigateTo({
      url: '/pages/personal/personmsg/personmsg',
    })
  },
  // 财务中心
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
    if (app.globalData.is_login == 'null') {//判断用户是否登录
      wx.showToast({
        title: '您还没有登录',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '/pages/personal/address/address',
      })
    }
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
  order(e) {
    inOrder(e)
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
    var that = this;
    if (app.globalData.is_login == null) {
      wx.showToast({
        title: '您还没有登录',
        icon: 'none'
      })
    } else {
      // 获取个人信息
      wx.request({
        url: imgurl + '/api/member/index',
        data: {
          token: app.globalData.is_login
        },
        success(res) {
          let data = res.data.data;
          console.log(data.user_info)
          that.setData({
            member_img: data.user_info.user_headimg,
            member_name: data.user_info.user_name,
            level_name: data.level_name,
            dfk: data.order_list.dfk,
            dfh: data.order_list.dfh,
            dsh: data.order_list.dsh,
            dpj: data.order_list.dpj,
          });
          console.log(that.data.dfh)
        }
      });
    }
  }
})
//点击订单分类 进入相应的页面
function inOrder(e) {
  var that = this;
  var order = e.currentTarget.dataset.id;
  var active = e.currentTarget.dataset.active;
  wx.navigateTo({
    url: '/pages/personal/order_all/order_all?order=' + order + '&active=' + active,
  })
}