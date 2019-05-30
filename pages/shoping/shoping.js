const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin: true,
    tt: 1, //全选状态
    price: '00.00', //总价
    goods: [],
    imageurls: "http://www.lianlianyp.com/",
    heaHei:0,
    pay:0
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
    var that=this;
    if (that.data.cart_id==undefined){
      wx.showToast({
        title: '请选择商品',
        icon:'none'
      })
    }else{
    wx.request({
      url: imgurl +'api/order/orderCreateSession',
      method:"POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        tag:'cart',
        cart_id: that.data.cart_id,
        token:app.globalData.is_login
      },
      success(res){
        if(res.data.code==200){
          wx.navigateTo({
            url: '/pages/order/order',
          })
        }
      }
    })
    }
  },
  //商店状态
  all_selected(e) {
    var ti = this; //指定this
    var tt = e.currentTarget.dataset.check_tt; //获取当前状态
    var find = e.currentTarget.dataset.check_find; //当前第几个
    var cc = this.data.goods[find].products; //这商家有几个商品
    for (var i = 0; i < cc.length; ++i) { //循环出商品数量
      var vo = 'goods[' + find + '].products[' + i + '].tt'; //定义商品选中状态
      var oo = 'goods[' + find + '].tt'; //定义商店选中状态
      var arr = Number(cc[i].price); //把商品价格 字符串转换数字
      var aee = Number(ti.data.price); //把总价格 字符串转换数字
      if (tt == 0) { //判断商店是否选中  是商品全选  否商品全不选
        if (cc[i].tt == 0) { //判断商品是否选中状态
          var pri = aee -= arr; //数学计算 减法
          var pric = Math.floor(pri * 100) / 100; /*保留小数点后两位*/
          ti.setData({
            [vo]: 1,
            [oo]: 1,
            price: pric
          })
        }
      } else {
        if (cc[i].tt == 1) {
          var pri = aee += arr; //数学算法 加法
          var pric = Math.floor(pri * 100) / 100; /*保留小数点后两位*/
          ti.setData({
            [vo]: 0,
            [oo]: 0,
            price: pric
          })
        }
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
    var cc = this.data.goods[box].products; //获取商品位置
    var vo = 'goods[' + box + '].products[' + find + '].tt'; //指定第几个商品的状态
    if (tt == 0) {
      ti.setData({
        [vo]: 1,
      })
    } else {
      ti.setData({
        [vo]: 0,
      })
    }
    sumPrice(ti.data.goods, ti)
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
      var w = 1;
      fn(l, w)
    } else {
      ti.setData({
        tt: 1
      })
      var l = 1;
      var w = 0;
      fn(l, w)
    }
    if (ti.data.price <= 0) {
      ti.setData({
        price: '00.00'
      });
    }

    function fn(l, w) {
      for (var f = 0; f < cc.length; ++f) { //循环goods
        for (var i = 0; i < cc[f].products.length; ++i) { //循环goods下的con
          var ss = 'goods[' + f + '].tt'; //第几家商店
          var vo = 'goods[' + f + '].products[' + i + '].tt'; //第几家商店里的第几件商品
          ti.setData({
            [ss]: l,
            [vo]: l
          });
        }
      }
    }
    // 计算总价格
    sumPrice(cc,ti)
  },
  // 增加购物车数量
  add(e) {
    var ti = this;
    var pr = e.currentTarget.dataset.add;
    var number = e.currentTarget.dataset.number;
    var father = e.currentTarget.dataset.father;
    var child = e.currentTarget.dataset.child;
    var cartid = e.currentTarget.dataset.cart_id;
    var num = 'goods[' + father + '].products[' + child + '].num';
    number++;
    ti.setData({
      [num]: number,
    });
    changeNum(cartid,number);
    sumPrice(ti.data.goods, ti)
  },
  minus(e) {
    var ti = this;
    var pr = e.currentTarget.dataset.minus;
    var number = e.currentTarget.dataset.number;
    var father = e.currentTarget.dataset.father;
    var child = e.currentTarget.dataset.child;
    var num = 'goods[' + father + '].products[' + child + '].num';
    var cartid = e.currentTarget.dataset.cart_id;

    if (number <= 1) {
      number == 1;
    } else {
      number--;
      changeNum(cartid, number);
      ti.setData({
        [num]: number,
      });
    }
    sumPrice(ti.data.goods, ti)
  },
  // 删除购物车的商品
  dels(){
    var that = this;
    wx.request({
      url:imgurl+ 'api/cart/cartDelete',
      method:"post",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        del_id:that.data.cart_id,
        token:app.globalData.is_login
      },
      success(res){
        if(res.data.code==200){//判断如果删除成功 就重新获取够购物车的列表
        wx.showToast({
          title: '删除成功',
        })
          wx.request({
            url: imgurl + 'api/cart/cart',
            data: {
              token: app.globalData.is_login
            },
            success(res) {
              var list = res.data.data.list.shops;
              if (list == undefined) {
                that.setData({
                  goods: []
                });
              } else {
                that.setData({
                  goods: list
                });
              }
              for (var i in that.data.goods) {
                var vo = that.data.goods[i];
                vo.tt = 1;

                for (var f in vo.products) {
                  var co = that.data.goods[i].products[f];
                  co.tt = 1;
                  co.q == 1;
                };
              }
            }
          })
        }
      }
    })
  },
  // 页面展示的时候获取购物车列表
  onShow() {
    var that = this;
    if (app.globalData.is_login == null) {
      wx.showToast({
        title: '您还没有登录哦！',
        icon: 'icon'
      })
    } else {
      wx.request({
        url: imgurl + 'api/cart/cart',
        data: {
          token: app.globalData.is_login
        },
        success(res) {
          var list = res.data.data.list.shops;
          if(list==undefined){
            that.setData({
              goods: []
            });
          }else{
          that.setData({
            goods: list
          });
          }
          for (var i in that.data.goods) {
            var vo = that.data.goods[i];
            vo.tt = 1;

            for (var f in vo.products) {
              var co = that.data.goods[i].products[f];
              co.tt = 1;
              co.q == 1;
            };
          }
        }
      })
    }
  },
  // 在商品上点击跳转到商品详情页面
  int(e){
    wx.navigateTo({
      url: '/pages/int/int?int='+e.currentTarget.dataset.goods,
    })
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
};
// 计算总价格
function sumPrice(cc,a) {
  var cart_id=[];
  var sum=0;
  for (var f = 0; f < cc.length; ++f) { //循环goods
    for (var i = 0; i < cc[f].products.length; ++i) {
      if (cc[f].products[i].tt == 0) {
        sum += cc[f].products[i].price * cc[f].products[i].num;
        cart_id.push(cc[f].products[i].cart_id);
      }
    }
  }
  if(sum<0){
    a.setData({
      price: Number(0.00)
    })
  }else{
    a.setData({
      price: Number(sum.toFixed(2)),
      cart_id:cart_id
    })
  }

}
// 改变购物车商品数量
function changeNum(id,number){
  wx.request({
    url: imgurl + 'api/cart/cartAdjustNum',
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      cartid: id,
      num: number,
      token: app.globalData.is_login
    }
  })
}