// pages/personal/houston/houston.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:'none',
    isFocus:false,
    codes: ["", "", "", ""],
    isShow:1,
    tell:'',
    provice: '',
    pro: '请选择省份',
    pro_id: '', //省份的id
    city: "",
    cit: '请选择市',
    num: 1,
    city_id: "",
    ci_ac: 0,
    qu: '',
    qus: '请选择区',
    qu_id: '',
    qu_ac: '',
    shows:'none',
    zhizhao:'/images/group.png',
    shenhe:'',
    place:'place',
    times:''
  },
  // 遮罩层
  go(e){
    var that=this;
    this.setData({
      shows:'block',
      num:4,
      isFocus: 'true',
      shop_id:e.currentTarget.dataset.shop_id
    });
    wx.request({//获取验证码
      url: imgurl + '/api/send_Sms/send',
      method:"post",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        phone:that.data.tell,
        event: 'bindshop',
        token:app.globalData.is_login
      },
      success(res){
        if(res.data.code==200){
          wx.showToast({
            title: '验证码发送成功请注意查收',
          });
          clearInterval(timer);
          var places=60;
          var timer=setInterval(function(){
            if(places<=0){
                clearInterval(timer);
                that.setData({
                  place:'place'
                })
            }else{
            places --;
            that.setData({
              place: places
            })
          }
          },1000)
          
        }
      }
    })
  },
  cancle(){

    this.setData({
      shows:'none',
      place: 'place'
    })
  },
  listenKeyInput: function (e) {
    var text = e.detail.value;
    var textLength = text.length;
    this.setData({
      inputValue:text
    })
    var codeArray = new Array();
    for (var i = 0; i < (textLength > 4 ? 4 : textLength); i++) {
      var code = text.substr(i, 1);
      codeArray[i] = (code);
    }
    for (var i = codeArray.length; i < 4; i++) {
      codeArray.push("");
    }
    this.setData({
      codes: codeArray
    })
  },
  fild(){
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          zhizhao: tempFilePaths[0]
        })
      }
    })
  },
  onLoad(datas){
    var id=datas.int;
    var that=this;
    this.setData({
      isShow:id,
      tell:datas.tel
    });
    if(id==3||id==2){
      wx.request({
        url: imgurl + '/api/shop/scanShop',
        data:{
          token:app.globalData.is_login
        },
        success(res){
          var arr1=[];
          var arr=res.data.data;
          for (var i in arr){
            var s = formatTimeTwo(arr[i].shop_create_time, 'Y-M-D h:m:s') ; 
            arr1.push(s)
          }
          that.setData({
            shenhe: res.data.data,
            creatTime:arr1
          });
        }
      })
    }
  },
  // 获取省份
  sheng() {
    var that = this;
    that.setData({
      shows: 'block'
    })
    wx.request({
      url: imgurl + 'api/base_controller/getProvince',
      success(res) {
        that.setData({
          provice: res.data.data,
          num: 1
        })
      }
    })
  },
  // huoqu城市
  city() {
    var that = this;
    if (that.data.pro_id == '') {
      wx.showToast({
        title: '请先选择省份',
        icon: "none"
      })
    } else {
      wx.request({
        url: imgurl + 'api/base_controller/getCity',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          province_id: that.data.pro_id,
        },
        success(res) {
          that.setData({
            num: 2,
            city: res.data.data,
            shows: 'block'
          })
        }
      })
    }
  },
  // 获取区
  qu() {
    var that = this;
    if (that.data.city_id == '') {
      wx.showToast({
        title: '请先选择区',
        icon: "none"
      })
    } else {
      wx.request({
        url: imgurl + 'api/base_controller/getDistrict',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          city_id: that.data.city_id,
        },
        success(res) {
          that.setData({
            num: 3,
            qu: res.data.data,
            shows: 'block'
          })
        }
      })
    }
  },
  //quxiao
  cancle() {
    this.setData({
      shows: "none"
    })
  },
  //获取选择的省
  pro(e) {
    var that = this;
    var data = e.currentTarget.dataset
    that.setData({
      pro: data.pro,
      pro_id: data.id,
      shows: 'none',
      actives: data.idx
    })
  },
  // 获取 选择的市
  citys(e) {
    var that = this;
    var data = e.currentTarget.dataset
    that.setData({
      cit: data.pro,
      city_id: data.id,
      shows: 'none',
      ci_ac: data.idx
    })
  },
  // 获取选择的区
  qus(e) {
    console.log(e)
    var that = this;
    var data = e.currentTarget.dataset
    that.setData({
      qus: data.pro,
      qu_id: data.id,
      shows: 'none',
      qu_ac: data.idx
    })
  },
  // 申请开通
  send(e){
    var that=this;
    var shop_name = e.detail.value.shop_name,
      head = e.detail.value.head,
      call = e.detail.value.call;
    if(shop_name==''){
      wx.showToast({
        title: '请填写商店名称',
        icon:'none'
      })
    }else if(head==''){
      wx.showToast({
        title: '请填写负责人名字',
        icon: 'none'
      })
    }else if(call==""){
      wx.showToast({
        title: '联系电话不能为空',
        icon: 'none'
      })
    } else if (that.data.zhizhao=='/images/group.png'){
      wx.showToast({
        title: '请上传营业执照',
        icon: 'none'
      })
    } else if (that.data.pro==''||that.data.cit==''||that.qus=='') {
      wx.showToast({
        title: '请填写地址',
        icon: 'none'
      })
    }else{
      wx.uploadFile({
        url: 'http://www.lianlianyp.com/api/upload/uploadPic',
        filePath: that.data.zhizhao,//文件路径
        name: 'avatar',//文件名称
        formData: {
          'user': 'test'
        },
        header: {
          'content-type': 'application/text'
        },
        success(res) {
          var obj1=JSON.parse(res.data);
          if (res.statusCode== 200) {
            wx.request({
              url: imgurl + 'api/shop/applyShop',
              method:"POST",
              header:{
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data:{
                card_licences: obj1.data,
                user_name: head,
                shop_phone: call,
                selProvinces: that.data.pro_id,
                selCities: that.data.city_id,
                selDistricts: that.data.qu_id,
                user_password: "",
                shop_contact: head,
                shop_name: shop_name,
                token:app.globalData.is_login
              },
              success(res){
               if(res.data.code==200){
                 wx.showToast({
                   title: res.data.message,
                 });
                 setTimeout(function(){
                   wx.navigateTo({
                     url: '/pages/my/my',
                   })
                 })
               }
              }
            })
          }
        }
      })
    }
  },
  sends(){
    var that=this;
    if(this.data.inputValue!=''){
      wx.request({
        url: imgurl + 'api/shop/bindShop',
        method: "post",
        header: {
          'content-type': 'application/text'
        },
        data: {
          shop_id: that.data.shop_id,
          code: that.data.inputValue,
          phone: that.data.tell,
          token:app.globalData.is_login
        },
        success(res){
          console.log(res)
        }
      })
    }
   
  }
})
//时间戳转时间格式

function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}