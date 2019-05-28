// pages/personal/newaddress/newaddress.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 'none',
    provice: '',
    pro: '请选择省份',
    pro_id: '', //省份的id
    city: "",
    cit: '请选择市',
    num: 1,
    city_id: "",
    actives: 0,
    ci_ac: 0,
    qu: '',
    qus: '请选择区',
    qu_id: '',
    qu_ac: ''
  },
  // 获取省份
  sheng() {
    var that = this;
    that.setData({
      show: 'block'
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
            show: 'block'
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
            show: 'block'
          })
        }
      })
    }
  },
  //quxiao
  cancle() {
    this.setData({
      show: "none"
    })
  },
  //获取选择的省
  pro(e) {
    var that = this;
    var data = e.currentTarget.dataset
    that.setData({
      pro: data.pro,
      pro_id: data.id,
      show: 'none',
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
      show: 'none',
      ci_ac: data.idx
    })
  },
  // 获取选择的区
  qus(e) {
    var that = this;
    var data = e.currentTarget.dataset
    that.setData({
      qus: data.pro,
      qu_id: data.id,
      show: 'none',
      qu_ac: data.idx
    })
  },
  // 提交表单
  submit(e) {
    var that = this;
    console.log(e.detail.value)
    var shou_name = e.detail.value.shou_name,
      phone = e.detail.value.phone,
      int = e.detail.value.int;
    that.setData({
      shou_name: shou_name,
      phone: phone,
      int: int
    })
    if (that.data.shou_name == '') {
      wx.showToast({
        title: '请填写收货人',
        icon: "none"
      })
    } else if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(that.data.phone))) {
      wx.showToast({
        title: '您输入的手机号不正确',
        icon: "none"
      })
    } else if (that.data.int == '') {
      wx.showToast({
        title: '请填写详细地址',
        icon: "none"
      })
    } else if (that.data.pro == '请选择省') {
      wx.showToast({
        title: '请选择省份',
        icon: "none"
      })
    } else if (that.data.cit == '请选择城市') {
      wx.showToast({
        title: '请选择城市',
        icon: "none"
      })
    } else if (that.data.qus == '请选择区') {
      wx.showToast({
        title: '请选择区',
        icon: "none"
      })
    } else {
      wx.request({
        url: imgurl + 'api/member/addmemberaddress',
        method: "post",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          consigner: shou_name,
          mobile: phone,
          province: that.data.pro_id,
          city: that.data.city_id,
          district: that.data.qu_id,
          address: int,
          token: app.globalData.is_login
        },
        success(res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: '添加成功',
            });
            //添加成功后页面条转；
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/personal/address/address',
              })
            }, 1500)
          }
        }
      })
    }
  },
  onLoad(datas) {
    var that=this;
    var id = datas.id;
    wx.request({
      url: imgurl + 'api/member/getMemberAddressDetail',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: id,
        token: app.globalData.is_login
      },
      success(res) {
        //获取返回的数据
        var data = res.data.data;
        var pro_id = data.province,
          city_id = data.city,
          qu_id = data.district,
          shou_name = data.consigner,
          phone = data.mobile,
          int = data.address;
          that.setData({
            shou_name:shou_name,
            phone:phone,
            int:int
          })
        wx.request({
          url: imgurl + 'api/base_controller/getProvince',
          success(res) {
            var arr = res.data.data;//获取所有的省份信息
            var len = arr.lenght;
            var obj1 = {};
           for( var i in arr){
             if (arr[i].province_id== pro_id){
               console.log(arr[i]);
               that.setData({
                 pro: arr[i].province_name,
                 pro_id:arr[i].province_id
               })
             }
           }
           //获取城市
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
               var arr1=res.data.data;
               for( var b in arr1){
                 if (arr1[b].city_id==city_id){
                   console.log(arr1[b])
                   that.setData({
                     cit: arr1[b].city_name,
                     city_id:arr1[b].city_id
                   })
                 }
               };
              //  获取县
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
                    var arr2=res.data.data;
                    for (var c in arr2) {
                      if (arr2[c].district_id == qu_id) {
                        that.setData({
                          qus: arr2[c].district_name,
                          qu_id: arr2[c].district_id,
                        })
                      }
                    };
                  }
                })
              }
            })
          }
        })
      }
    })
  }
});
