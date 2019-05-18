// pages/int/int.js
const app = getApp();
const imgurl = app.globalData.imgurl;
var WxParse = require('../../wxParse/wxParse.js');
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
    pinglun_all:['全部',"好评",'有图'],
    comments_int: [],
    data_int:'',
    activePing:0,
    goodsping:0,
    goods_id:0,
    // guige
    specifications:'none',
    arrName: [],
    goods_spec: '',
    guilist: '',
    selectGuigeName: '',
    textStates: ["sdalfd", "g_active"],
    jies:['宝贝',"详情","评价","推荐"],
    nav:0,
    b_ac:0,
    opition:'body_0'
  },
  onLoad(datas){
    var _this=this;
   wx.request({
     url: imgurl +'/index.php?s=/api/goods/detailGoods&id='+datas.int,
     success(res){
       let dataes=res.data.data;
       var article=dataes.goods_detail.description;
       WxParse.wxParse('article', 'html', article, _this);
       _this.setData({
         image_int : dataes.goods_detail.img_list,
         data_int: dataes,
         guige: dataes.goods_detail.spec_list
       })
     }
   })
  },
  // 页面滚动
  onPageScroll: function (e) {
    if (e.scrollTop>=200){
     this.setData({
       nav:1
      })
    } else if (e.scrollTop <200){
      this.setData({
        nav: 0
      })
     }
  
  },
  // 下拉表头
  b_ac(e){
    this.setData({
      b_ac:e.currentTarget.dataset.id,
      opition: e.currentTarget.dataset.cata
    })
  },
  // 详情
  active(e) {
    var that=this;
    this.setData({
      active: e.currentTarget.dataset.id,
      goods_id: e.currentTarget.dataset.goods_id
    })
    // 判断是否点击评论
    if (e.currentTarget.dataset.id==1){
      wx.request({
        url: imgurl + 'index.php?s=/api/goods/getGoodsComments',
        method: "POST",
        data: {
           goods_id: e.currentTarget.dataset.goods_id,
        comments_type:5
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: (res) => {
         that.setData({
           comments_int:res.data.data.data
         })
        }
      })
    }
  },
//  评论类别
goodsping(e){
  var that=this;
  var comments_type;
  this.setData({
    goodsping:e.currentTarget.dataset.idx
  });
  if (e.currentTarget.dataset.idx==1){
    comments_type=1;
  } else if (e.currentTarget.dataset.idx == 2){
    comments_type = 4;
  }else{
    comments_type = 5;
  };
  wx.request({
    url: imgurl + 'index.php?s=/api/goods/getGoodsComments',
    method: "POST",
    data: {
      goods_id:that.data.goods_id,
      comments_type: comments_type
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: (res) => {
      console.log(res);
      that.setData({
        comments_int: res.data.data.data
      })
    }
  })
},
  // 挑选规格
  specifications(){
    this.setData({
      specifications:'block'
    });
  },
  // guigexuanzhong
  selectGuige(e) {
    console.log(e);
    let that = this,
      // 获取第一个循环的index
      fuindex = e.currentTarget.dataset.fuindex,
      // 获取第二个循环的index
      chindex = e.currentTarget.dataset.idx,
      // 获取当前点击的规格名称
      selectName = e.currentTarget.dataset.item,
      //  初始化arrName
      arrName = that.data.arrName,
      guilists = {},
      goods_spec = that.data.data_int.goods_detail.spec_list;
    // 通过循环来判断点击了哪一个规格，根据数据结构来；
    // goods_spec[fuindex]根据fuindex来判断点击了哪一种类型的规格
    for (let i = 0; i < goods_spec[fuindex].length; i++) {
      // 当i等于当前点击的规格时，设置isClick=1
      if (i == chindex) {
        goods_spec[fuindex][i].isClick = 1;
      }
      // 否则设置其他的isClick=0
      else {
        goods_spec[fuindex][i].isClick = 0;
      }
      console.log(goods_spec[fuindex][i].isClick )
    };
    // 把点击的规格名称和规格id存起来
    arrName[fuindex] = selectName;
    that.setData({
      goods_spec: goods_spec,
      guilist: guilists,
      selectGuigeName: arrName
    })
  },
  // yincangguige
  hidden(){
    this.setData({
      specifications: 'none'
    })
  },
  //商品分享
  share_c() {
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