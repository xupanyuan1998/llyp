// pages/msg/msg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head_url:[
      {url:"/images/platform.png",text:"平台公告"},
    {url:"/images/customer.png",text:"平台消息"},
    {url:"/images/business.png",text:"商家消息"}
    ],
    message: [
      { src: "/images/jing.jpg", big_size: "景胜旅游卡", small_size: "尊贵的康慧乐粉丝，在此为您提供最新资讯...", date: "18/12/29" },
      { src: "/images/lian.jpg", big_size: "平台消息 ", small_size: "尊贵的康慧乐粉丝，在此为您提供最新资讯...", date: "18/12/29" },
      { src: "/images/busine.jpg", big_size:"店铺111", small_size: "尊贵的康慧乐粉丝，在此为您提供最新资讯...", date: "18/12/29" }]
  },
//系统通知
notice(){
  wx.navigateTo({
    url: '/pages/notice/notice',
  })
},
chat(){
  wx.navigateTo({
    url: '/pages/chat/chat',
  })
}
})