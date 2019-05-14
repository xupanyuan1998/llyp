//index.js
const app=getApp();
const imgurl = app.globalData.imgurl;
Page({
  data: {
    banner: ["/images/banner.jpg", "/images/banner.jpg"],
    imgurls:' http://www.lianlianyp.com/',
    hot: [],
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
    commodity: [],
    int:''
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
  com_int(e){
    var _this=this;
    if (e.target.dataset.id==30){
      wx.navigateTo({
        url: '/pages/personal/shareshop/shareshop',
      })
    }else{
      wx.request({
        url: imgurl + '/index.php?s=/api/goods/detailGoods&id=' +e.currentTarget.dataset.int,
        success(res) {
          _this.setData({
            int: res.data.data
          });
          console.log(_this.data.int)
          wx.navigateTo({
            url: '/pages/int/int?int=' + _this.data.int,
          })
        }
      })
    }
  },
  //分类
  cate(){},
  onLoad: function (options) {
    var _this=this;
    wx.request({
      url: imgurl +'/index.php?s=/api/index/index',
      success(res){
        _this.setData({
          banner: res.data.data.plat_adv_list.adv_list,
          hot: res.data.data.group_list,
          commodity: res.data.data.goods_recommend_list
        })
      }
    })
  },
})
