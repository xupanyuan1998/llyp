// pages/personal/order_all/order_all.js
const app=getApp();
const imgurl=app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cate: ['全部', '待付款', '待发货', '待收货','已收货', '待评价', '售后'],
    active: 0,
    imgurls:'http://www.lianlianyp.com/',
    data_s:'',
  },
  //选中效果
  active(e) {
    var that=this;
    this.setData({
      active: e.target.dataset.id
    })
    var stau=e.currentTarget.dataset.order;
    var data_s;
    if(stau==-1){
      that.setData({
        data_s:'all'
      })
    }else{
      that.setData({
        data_s: stau
      })
    }

    getorder(that,that.data.data_s)
  },
  //退款
  outm() {
    wx.navigateTo({
      url: '/pages/personal/outm/outm',
    })
  },
  // 退货
  returns() {
    wx.navigateTo({
      url: '/pages/personal/returns/returns',
    })
  },
  //物流
  wuliu() {
    wx.navigateTo({
      url: '/pages/personal/wuliu/wuliu',
    })
  },
  //评价
  pingjia() {
    wx.navigateTo({
      url: '/pages/personal/pingjia/pingjia',
    })
  },
  // 订单详情
  order_int() {
    wx.navigateTo({
      url: '/pages/personal/order_int/order_int',
    })
  },
  // 获取全部订单
  onLoad(datas){
    var that=this;
    console.log(datas);
    that.setData({
      data_s:datas.order,
      active:datas.active
    });
    if(app.globalData.is_login==null){
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
    }else{
      getorder(that,that.data.data_s)
    };
  }
});
//获取订单列表 函数封装
function getorder(a,order_s){
  wx.request({
    url: imgurl + 'api/order_mini/myOrderList',
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      status: order_s,
      token: app.globalData.is_login
    },
    success(res) {
      let order_list = res.data.data.data;
      a.setData({
        order_list: order_list
      })
    }
  })
}