// pages/shoping/shoping.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin: true,
    tt: 1,
    goods: [{
      tltie: '健客大药房网定点送', //商家
      tt: 1, //选中状态 1没有选中 0选中
      con: [{
        image: '/images/shop_name.jpg', //商品图片
        title: '鸡骨草胶囊（玉林）', //商品名称
        price: '￥120.50', //商品价格
        number: '1', //商品数量
        tt: 1
      }, {
        image: '/images/shop_name.jpg',
        title: '鸡骨草胶囊（玉林）',
        price: '￥120.50',
        number: '1',
        tt: 1
      }]
    }, {
      tltie: '健客大药房网定点送',
      tt: 1,
      con: [{
        image: '/images/shop_name.jpg', //商品图片
        title: '鸡骨草胶囊（玉林）', //商品名称
        price: '￥120.50', //商品价格
        number: '1', //商品数量
        tt: 1
      }, {
        image: '/images/shop_name.jpg',
        title: '鸡骨草胶囊（玉林）',
        price: '￥120.50',
        number: '1',
        tt: 1
      }]
    }]
  },
  //管理订单
  switch () {
    if (this.data.admin == true) {
      this.setData({
        admin: false
      })
    } else if (this.data.admin == false) {
      this.setData({
        admin: true
      })
    }
  },
  order() {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  //商店状态
  all_selected(e) {
    var ti = this; //指定this
    var tt = e.currentTarget.dataset.check_tt; //获取当前状态
    var find = e.currentTarget.dataset.check_find; //当前第几个
    var cc = this.data.goods[find].con; //这商家有几个商品
    for (var i = 0; i < cc.length; ++i) { //循环出商品数量
      var vo = 'goods[' + find + '].con[' + i + '].tt'; //定义商品选中状态
      var oo = 'goods[' + find + '].tt'; //定义商店选中状态
      if (tt == 0) { //判断商店是否选中  是商品全选  否商品全不选
        ti.setData({
          [vo]: 1,
          [oo]: 1
        })
      } else {
        ti.setData({
          [vo]: 0,
          [oo]: 0
        })
      }
    }
    fun(ti);
  },
  //点击商品商店和全选状态
  check_find(e) {
    var ti = this; //指定this
    var tt = e.currentTarget.dataset.check_tt; //获取商品状态
    var find = e.currentTarget.dataset.check_find; //获取第几件商品
    var box = e.currentTarget.dataset.check_box; //获取父级第几家商店
    var cc = this.data.goods[box].con; //获取商品位置
    var vo = 'goods[' + box + '].con[' + find + '].tt'; //指定第几个商品的状态
    if (tt == 0) {
      ti.setData({
        [vo]: 1
      })
    } else {
      ti.setData({
        [vo]: 0
      })
    }
    var ss = 0; //判断商品全选
    var oo = 'goods[' + box + '].tt'; //指定第几家商店状态
    for (var f = 0; f < cc.length; ++f) {
      if (cc[f].tt == 0) {
        ss++;
      } else {
        ss--;
      }
    }
    if (ss == f) {
      ti.setData({
        [oo]: 0
      })
    } else {
      ti.setData({
        [oo]: 1
      })
    }
    fun(ti);
  },
  //全选状态
  all_box(e) {
    var ti = this;
    var tt = e.currentTarget.dataset.tt;
    var cc = ti.data.goods;
    if (tt == 1) {
      ti.setData({
        tt: 0
      })
      var l = 0;
      fn(l);
    } else {
      ti.setData({
        tt: 1
      })
      var l = 1;
      fn(l);
    }

    function fn(l) {
      for (var f = 0; f < cc.length; ++f) {
        var ss = 'goods[' + f + '].tt';
        var pp = cc[f].con;
        var u = f;
        for (var i = 0; i < pp.length; ++i) {
          var vo = 'goods[' + u + '].con[' + i + '].tt';
          ti.setData({
            [ss]: l,
            [vo]: l
          })
        }
      }
    }
  },
  add(e) {
    console.log(e);
  },
  // 页面刷新的时候获取购车列表
  onShow() {
    if (app.globalData.is_login == null) {
      wx.showToast({
        title: '您还没有登录 请登录',
        icon: 'none',
      })
    } else {
      wx.request({
        url: imgurl +'api/cart/cart',
        data:{
          token:app.globalData.is_login
        },
        success(res){
          console.log(res)
        }
      })
    }
  }
})
//全部点击商品全选状态
function fun(ti) {
  var ee = 0;
  for (var i = 0; i < ti.data.goods.length; ++i) {
    if (ti.data.goods[i].tt == 0) {
      ee++;
    } else {
      ee--;
    }
  }
  if (ee == i) {
    ti.setData({
      tt: 0
    });
  } else {
    ti.setData({
      tt: 1
    });
  }
}