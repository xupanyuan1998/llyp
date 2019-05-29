// pages/personal/address/address.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address_list: '',
    id:0
  },
  list(e){
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.list_id;
    this.setData({
      id:index
    });
    wx.request({
      url: imgurl +'api/member/updateAddressDefault',
      method:"post",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id:id,
        token:app.globalData.is_login
      },
      success(res) {
       if(res.data.code==200){
         wx.showToast({
           title: '修改成功'
         })
       }
      }
    })
  },
  // 新增地址
  newaddress() {
    wx.navigateTo({
      url: '/pages/personal/newaddress/newaddress',
    })
  },
  //获取地址列表
  onShow() {
    var that = this;
    wx.request({
      url: imgurl + '/api/member/memberAddress',
      data: {
        token: app.globalData.is_login
      },
      success(res) {
        var address_list = res.data.data.data;
        that.setData({
          address_list: address_list
        })
      }
    })
  },
  //删除地址
  dels(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: imgurl + 'api/member/memberAddressDelete',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: id,
        token: app.globalData.is_login
      },
      success(res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '删除成功',
          })
          wx.request({
            url: imgurl + '/api/member/memberAddress',
            data: {
              token: app.globalData.is_login
            },
            success(res) {
              var address_list = res.data.data.data;
              that.setData({
                address_list: address_list
              })
            }
          })
        }
      }
    })
  },
  //编辑地址
  bian(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/newaddress/newaddress?id='+id,
    })
  }
})