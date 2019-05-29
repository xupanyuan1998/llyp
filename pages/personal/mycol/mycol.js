// pages/personal/mycol/mycol.js
const app=getApp();
const imgurl=app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: ['收藏宝贝' , '收藏店铺' ],
    indexs:'0',
    goods_list:'',
    imgurls:'http://www.lianlianyp.com/',
  },
  active(e){
    var that=this;
    var id = e.currentTarget.dataset.id
  this.setData({
    indexs:id
  });
  // 判断用户点击的是收藏宝贝还是收藏店铺
  if(id==0){//如果是收藏宝贝就获取里面的数据
    wx.request({
      url: imgurl + 'api/member/myCollection',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        token: app.globalData.is_login
      },
      success(res) {
        that.setData({
          goods_list: res.data.data.data
        })
      }
    })
  } else {////如果是收藏店铺就获取里面的数据
    wx.request({
      url: imgurl + 'api/member/shopCollection',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        token: app.globalData.is_login
      },
      success(res) {
        that.setData({
          shop_list: res.data.data.data
        })
      }
    })
  }
  },
 onLoad(){
   var that =this;
   if(app.globalData.is_login==null){
     wx.showToast({
       title: '请先登录！！！！',
       icon:'none'
     })
   }else{
     wx.request({
       url: imgurl +'api/member/myCollection',
       method:"POST",
       header:{
         "Content-Type": "application/x-www-form-urlencoded"
       },
       data:{
         token:app.globalData.is_login
       },
       success(res){
         that.setData({
           goods_list: res.data.data.data
         })
       }
     })
   }
 },
//  取消收藏商品
cancleGoods(e){
  var that = this;
  var id=e.currentTarget.dataset.goods;
  wx.request({
    url:imgurl+ 'api/member/cancelFavorites',
    method:"POST",
    header:{
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data:{
      fav_id:id,
      fav_type:'goods',
      token:app.globalData.is_login
    },
    success(res){
      if(res.data.code==200){//判断如果取消收藏成功；重新拉去收藏列表的数据
        wx.showToast({
          title: res.data.message,
        });
        wx.request({
          url: imgurl + 'api/member/myCollection',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            token: app.globalData.is_login
          },
          success(res) {
            that.setData({
              goods_list: res.data.data.data
            })
          }
        })
      }
    }
  })
},
// 取消收藏店铺
  cancleShop(e){
  var that=this;
  var id = e.currentTarget.dataset.shop_id;
  wx.request({
    url: imgurl + 'api/member/cancelFavorites',
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      fav_id: id,
      fav_type: 'shop',
      token: app.globalData.is_login
    },
    success(res) {
      if (res.data.code == 200) {//判断如果取消收藏成功；重新拉去收藏列表的数据
        wx.showToast({
          title: res.data.message,
        });
        wx.request({
          url: imgurl + 'api/member/shopCollection',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            token: app.globalData.is_login
          },
          success(res) {
            that.setData({
              shop_list: res.data.data.data
            })
          }
        })
      }
    }
  })
},
})