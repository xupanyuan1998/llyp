// pages/shoping/shoping.js
/*



                    购物车bug说明 :
                      点击状态点击少的情况下没有任何问题  你要是瞎点时间长了就会出现多几毛钱;
                      价钱因为是活的  我没有接口只能模拟数据始终不能代替  大致完成有了接口直接套就行
                    只不过加减和点击状态这个地方会有少钱的情况或者多钱的情况;
                      那个点击状态或者加减或者全选 总价格那个地方小数点后保留了两位但是后两位最后有0就不显示;
                      
                                      ,            _..._            ,                 .---.              
                                      {'.         .'     '.         .'}              (_,/\ \                  
                                      { ~ '.      _|=    __|_      .'  ~}           (`a a(  )              
                                    { ~  ~ '-._ (___________) _.-'~  ~  }           ) \=  ) (                    
                                  {~  ~  ~   ~.'           '. ~    ~    }          (.--' '--.)    
                                  {  ~   ~  ~ /   /\     /\   \   ~    ~  }        / (_\_/_) \        
                                  {   ~   ~  /    __     __    \ ~   ~    }       | / \   / \ |              
                                  {   ~  /\/  -<( o)   ( o)>-  \/\ ~   ~}          \\ / . \ //    
                                    { ~   ;(      \/ .-. \/      );   ~ }           \/\___/\/    
                                    { ~ ~\_  ()  ^ (   ) ^  ()  _/ ~  }             |  \_/  |  
                                      '-._~ \   (`-._'-'_.-')   / ~_.-'              \  /  /  
                                          '--\   `'._'"'_.'`   /--'                   \/  /                
                                              \     \`-'/     /                        ( (            
                                              `\    '-'    /'                          |\ \  
                                                `\       /'                            | \ \  
                                                  '-...-'                             /_Y/_Y    

                                                        _____                 &&&&_) )
                                                      \/,---<                &&&&&&\ \
                                                      ( )c~c~~@~@            )- - &&\ \
                                                        C   >/                \<   |&/
                                                        \_O/ - 哇塞          _`*-'_/ /
                                                      ,- >o<-.              / ____ _/
                                                      /   \/   \            / /\  _)_)
                                                    / /|  | |\ \          / /  )   |
                                                    \ \|  | |/ /          \ \ /    |
                                                      \_\  | |_/            \ \_    |
                                                      /_/`___|_\            /_/\____|
                                                        |  | |                  \  \|
                                                        |  | |                   `. )
                                                        |  | |                   / /
                                                        |__|_|_                 /_/|
                                                        (____)_)                |\_\_

                                                                   ___
                                                               _.-'   \
                                                             /        \
                                                             /          \
                                                           /            `.___
                                                           ( .--.)\/(,.--.    `-.
                                                           ,',-. \   / ,-.`.     )
                                                         ( /   \     /   \ )   / \
                                                           || .-|     |-. ||---'|  \
                                                         _|| | |     | | ||_   |   \
                                                         /. \ |_|.---.|_| / ,\  | .^.\
                                                         `.\ `--"     "--' /,'  |/
                                                           `>  _________ <'
                                                         ,-' ,---.---.---. `-.
                                                         `--'\    \j/    /`--'
                                                           `.\         /,'
                                                             \\_______//
                                                               `-------'



      _//|.-~~~~-,
    _/66  \       \_@
    (")_   /   /   |
      '--'|| |-\  /
          //_/ /_/





╭︿︿︿╮
{/ X  o /}
 ( (oo) )
  ︶︶︶




*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin:true,
    tt:1,  //全选状态
    price:'00.00',  //总价
    goods:[{
      tltie:'健客大药房网定点送',  //商家
      tt:1,  //选中状态 1没有选中 0选中
      con: [{
        image: '/images/shop_name.jpg',  //商品图片
        title: '鸡骨草胶囊（玉林）',  //商品名称
        price: '120.50',  //商品价格
        number: 1,  //商品数量
        tt:1,
        q:1  //是否价钱相加的状态  1没有相加 0相加
      }, {
          image: '/images/shop_name.jpg',
          title: '鸡骨草胶囊（玉林）',
          price: '120.60',
          number: 1,
          tt:1,
          q:1
        }]
    }, {
        tltie: '健客大药房网定点送',
        tt:1,
        con: [{
          image: '/images/shop_name.jpg',  //商品图片
          title: '鸡骨草胶囊（玉林）',  //商品名称
          price: '120.50',  //商品价格
          number: 1,  //商品数量
          tt:1,
          q:1
        }, {
          image: '/images/shop_name.jpg',
          title: '鸡骨草胶囊（玉林）',
          price: '120.60',
          number: 1,
          tt:1,
          q:1
        }]
      }]
  },
//管理订单
switch(){
  if(this.data.admin==true){
  this.setData({
    admin:false
  })
  }else if(this.data.admin==false){
    this.setData({
      admin: true
    })
  }
},
order(){
  wx.navigateTo({
    url: '/pages/order/order',
  })
},
//商店状态
all_selected(e){
  var ti = this;  //指定this
  var tt = e.currentTarget.dataset.check_tt;  //获取当前状态
  var find = e.currentTarget.dataset.check_find;  //当前第几个
  var cc = this.data.goods[find].con;  //这商家有几个商品
  for (var i = 0; i < cc.length; ++i) {  //循环出商品数量
    var vo = 'goods[' + find + '].con[' + i + '].tt';  //定义商品选中状态
    var oo = 'goods[' + find + '].tt';  //定义商店选中状态
    var arr = Number(cc[i].price);  //把商品价格 字符串转换数字
    var aee = Number(ti.data.price);  //把总价格 字符串转换数字
    if (tt == 0) {  //判断商店是否选中  是商品全选  否商品全不选
      if(cc[i].tt == 0){  //判断商品是否选中状态
        var pri = aee -= arr;  //数学计算 减法
        var pric = Math.floor(pri * 100) / 100;  /*保留小数点后两位*/
        ti.setData({
          [vo]: 1,
          [oo]: 1,
          price: pric
        })
      }
    } else {
      if(cc[i].tt == 1){
        var pri = aee += arr;  //数学算法 加法
        var pric = Math.floor(pri * 100) / 100;  /*保留小数点后两位*/
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
check_find(e){
  var ti = this;  //指定this
  var tt = e.currentTarget.dataset.check_tt;  //获取商品状态
  var find = e.currentTarget.dataset.check_find;  //获取第几件商品
  var box = e.currentTarget.dataset.check_box;  //获取父级第几家商店
  var cc = this.data.goods[box].con;  //获取商品位置
  var vo = 'goods[' + box + '].con[' + find + '].tt';  //指定第几个商品的状态
  var pr = e.currentTarget.dataset.price;  //商品的价格
  var arr = Number(pr);  //商品价格字符串转换数字
  var aee = Number(ti.data.price);  //总价格字符串转换数字
  if(tt == 0){
    var pri = aee -= arr;  //数学减法
    var pric = Math.floor(pri * 100) / 100;  /*小数点后两位*/
    ti.setData({
      [vo]: 1,
      price: pric
    })
  }else{
    var pri = aee += arr;  //数学加法
    var pric = Math.floor(pri * 100) / 100;  /*小数点后两位*/
    ti.setData({
      [vo]: 0,
      price: pric
    })
  }
  var ss = 0;  //判断商品全选
  var oo = 'goods[' + box + '].tt';  //指定第几家商店状态
  for(var f = 0;f < cc.length;++f){
    if(cc[f].tt == 0){
      ss++;
    }else{
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
all_box(e){
  var ti = this;
  var tt = e.currentTarget.dataset.tt;
  var cc = ti.data.goods;
  if(tt == 1){
    ti.setData({
      tt:0
    })
    var l = 0;
    var w = 1;
    fn(l,w, true);
  }else{
    ti.setData({
      tt: 1
    })
    var l = 1;
    var w = 0;
    fn(l,w, false);
  }
  if(ti.data.price <= 0){
    ti.setData({
      price:'00.00'
    });
  }
  function fn(l,w,R){
    for (var f = 0; f < cc.length; ++f) {  //循环goods
      for (var i = 0; i < cc[f].con.length; ++i) {  //循环goods下的con
        var ss = 'goods[' + f + '].tt';  //第几家商店
        var vo = 'goods[' + f + '].con[' + i + '].tt';  //第几家商店里的第几件商品
        if (cc[f].con[i].tt == w) {  //判断商品的状态
          var arr = Number(cc[i].con[f].price);  //商品的价格字符串转换数字
          var aee = Number(ti.data.price);  //总价的字符串转换数字
          if (R) {
            var pri = aee += arr;  //数学加法
          } else {
            var pri = aee -= arr;  //数学减法
          }
          var pric = Math.floor(pri * 100) / 100;  /*小数点后两位*/
          ti.setData({
            [ss]: l,
            [vo]: l,
            price: pric
          })
        }
      }
    }
  }
},
add(e){
  var ti = this;
  var pr = e.currentTarget.dataset.add;
  var number = e.currentTarget.dataset.number;
  var father = e.currentTarget.dataset.father;
  var child = e.currentTarget.dataset.child;
  var num = 'goods['+father+'].con['+child+'].number';
  var arr = Number(pr);
  var aee = Number(ti.data.price);
  number++;
  var ag = aee += arr;
  var pric = Math.floor(ag * 100) / 100;
  ti.setData({
    [num]:number,
    price:pric
  });
  console.log(pric);
},
minus(e){
  var ti = this;
  var pr = e.currentTarget.dataset.minus;
  var number = e.currentTarget.dataset.number;
  var father = e.currentTarget.dataset.father;
  var child = e.currentTarget.dataset.child;
  var num = 'goods[' + father + '].con[' + child + '].number';
  var arr = Number(pr);
  var aee = Number(ti.data.price);
  number--;
  var ag = aee -= arr;
  var pric = Math.floor(ag * 100) / 100;
  ti.setData({
    [num]: number,
    price: pric
  });
  console.log(pric);
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
