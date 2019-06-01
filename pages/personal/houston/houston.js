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
    zhizhao:'/images/group.png'
  },
  // 遮罩层
  go(){
    this.setData({
      show:'block',
      isFocus: true,
    })
  },
  cancle(){
    this.setData({
      show: 'none'
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
    console.log(datas)
    this.setData({
      isShow:id,
      tell:datas.tel
    })
  },
  //获取省份
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
    console.log(e.detail.value)
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
                console.log(res.data)
              }
            })
          }
        }
      })
    }
  }
})