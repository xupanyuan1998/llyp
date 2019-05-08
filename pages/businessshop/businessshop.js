// pages/businessshop/businessshop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodity: [
      { dis: '5.2折', int: '汤臣倍健  恩济堂多种维生素矿物质片1.5g/片 *60片', price: '￥89.00', buy: '购买', img_url: '/images/medical.jpg' },
      { dis: '5.2折', int: '东阿阿胶　复方阿胶浆 (礼盒) 20ml*48支无糖型', price: '￥89.00', buy: '购买', img_url: '/images/commod.png' },
      { dis: '5.2折', int: '汤臣倍健  恩济堂多种维生素矿物质片1.5g/片 *60片', price: '￥89.00', buy: '购买', img_url: '/images/medical.jpg' },
      { dis: '5.2折', int: '东阿阿胶　复方阿胶浆 (礼盒) 20ml*48支无糖型', price: '￥89.00', buy: '购买', img_url: '/images/commod.png' },
      { dis: '5.2折', int: '汤臣倍健  恩济堂多种维生素矿物质片1.5g/片 *60片', price: '￥89.00', buy: '购买', img_url: '/images/medical.jpg' },
      { dis: '5.2折', int: '东阿阿胶　复方阿胶浆 (礼盒) 20ml*48支无糖型', price: '￥89.00', buy: '购买', img_url: '/images/commod.png' },
      { dis: '5.2折', int: '汤臣倍健  恩济堂多种维生素矿物质片1.5g/片 *60片', price: '￥89.00', buy: '购买', img_url: '/images/medical.jpg' },
      { dis: '5.2折', int: '东阿阿胶　复方阿胶浆 (礼盒) 20ml*48支无糖型', price: '￥89.00', buy: '购买', img_url: '/images/commod.png' }
    ],
    shop: [{ name: '最新商品', num: 0 }, { name: '全部商品', num: 1 }, { name: '返场打折',num:2}],
    active:0,
    share:[{src:'/images/wechart.png',text:'微信好友'},
      { src: '/images/firend.png', text: '朋友圈' },
      { src: '/images/apply.png', text: '保存图片' }
    ],
    show:'none',
    concern:'false',
    shop_concern:'+ 关注'
  },
  active(e){
    this.setData({
      active:e.target.dataset.id
    })
    console.log(this.data.active)
  },
  //分享页面展示
  share(){
   this.setData({
     show:'block'
   })
  },
  //分享页面隐藏
  dis(){
    this.setData({
      show:'none'
    })
  },
  //关注店铺
  concern(){
    var _this=this;
    if(this.data.concern=='false'){
      _this.setData({
        concern:'true',
        shop_concern: '已关注'
      })
    }else{
      _this.setData({
        concern: 'false',
        shop_concern: '+ 关注'
      })
    }
  }


})