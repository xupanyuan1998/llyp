//index.js
Page({
  data: {
    banner: ["/images/banner.jpg", "/images/banner.jpg"],
    hot: [
     "/images/1-1.png",
      "/images/1-2.png",
      "/images/1-3.png",
      "/images/1-4.png",
      "/images/1-5.png",
      "/images/1-6.png",
      "/images/1-7.png",
      "/images/1-8.png",
      "/images/1-9.png",
      "/images/1-10.png"
    ],
    hot_1: [
      "/images/1-11.png",
      "/images/1-12.png",
      "/images/1-13.png",
      "/images/1-14.png",
      "/images/1-15.png",
      "/images/1-16.png",
      "/images/1-17.png",
      "/images/1-18.png",
      "/images/1-19.png",
      "/images/1-20.png"],
    list:[
      {data:"0",src:"/images/like.png",big:"精选",small:"猜你喜欢"},
      { data: "1", src: "/images/dianpu.png", big: "好店", small: "精选好店" },
      { data: "2", src: "/images/lives.png", big: "直播", small: "直播中心" },
      { data: "3", src: "/images/makeup.png", big: "美装中心", small: "彩妆美容" }
    ],
    active:0,
    move:0,
    scroll_with:'',
    _move_width:'',
    content:'',
    left:0,
    commodity: [
      { dis: '5.2折', int: '汤臣倍健  恩济堂多种维生素矿物质片1.5g/片 *60片', price: '￥89.00', buy: '购买', img_url:'/images/medical.jpg'},
      { dis: '5.2折', int: '东阿阿胶　复方阿胶浆 (礼盒) 20ml*48支无糖型', price: '￥89.00', buy: '购买', img_url:'/images/commod.png' }
    ]
  },
  //商品列表选中状态
  clecked(e){
    this.setData({
      active:e.currentTarget.dataset.id
    })
  },
  //获取可视区宽度
 //cate
 scroll(e){
   //创建节点
   var _this=this;
   //get height 
   wx.getSystemInfo({
     success: function (suc) {
      _this.setData({
        scroll_with:suc.windowWidth
      })
     },
   });
   wx.createSelectorQuery().select('.scroll_c').boundingClientRect(function (res) {
     _this.setData({
       move: Number(e.detail.scrollLeft) / Number(res.width - _this.data.scroll_with)
     });
   }).exec();
   wx.createSelectorQuery().select('#moves').boundingClientRect(function (res) {
     _this.setData({
       _move_width: res.width
     });
   }).exec();
   wx.createSelectorQuery().select('#content').boundingClientRect(function (res) {
     _this.setData({
       content: res.width
     });
   }).exec();
   _this.setData({
     left: Number(_this.data.content - _this.data._move_width)*_this.data.move +'px'
   })
 },
  //商品详情跳转
  com_int(){
    wx.navigateTo({
      url: '/pages/int/int',
    })
  }
})
