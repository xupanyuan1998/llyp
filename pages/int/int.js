// pages/int/int.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({
  data: {
    image_int: '',
    imgurl:'http://www.lianlianyp.com/',
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
    comments_int: [{
        userimg: '/images/user_image.jpeg',
        username: '卡号服务费',
        date: '2018-12-15',
        package: '3盒家庭装',
        int_c: '买了整整意向，比药店便宜而且还保证正品，噶没时间昂双12优惠还送了赠品，五星好评！',
        int_images: [{
          src: "/images/carmer.jpg"
        }, {
          src: "/images/carmer.jpg"
        }, {
          src: "/images/carmer.jpg"
        }]
      },
      {
        userimg: '/images/user_image.jpeg',
        username: '卡号服务费',
        date: '2018-12-15',
        package: '3盒家庭装',
        int_c: '买了整整意向，比药店便宜而且还保证正品，噶没时间昂双12优惠还送了赠品，五星好评！',
        int_images: [{
          src: "/images/carmer.jpg"
        }, {
          src: "/images/carmer.jpg"
        }, {
          src: "/images/carmer.jpg"
        }]
      }
    ],
    data_int:''
  },
  onLoad(datas){
    var _this=this;
   wx.request({
     url: imgurl +'/index.php?s=/api/goods/detailGoods&id='+datas.int,
     success(res){
       let dataes=res.data.data;
       console.log(dataes.goods_detail)
       _this.setData({
         image_int : dataes.goods_detail.img_list,
         data_int: dataes.goods_detail
       })
     }
   })
  },
  
  // 详情
  active(e) {
    this.setData({
      active: e.target.dataset.id
    })
  },
  //商品分享
  share_c() {
    console.log(1)
    this.setData({
      show: 'block'
    })

  },
  //关闭分享页面
  close() {
    this.setData({
      show: 'none'
    })
  },
  shop() {
    wx.navigateTo({
      url: '/pages/businessshop/businessshop',
    })
  }
})