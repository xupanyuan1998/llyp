// pages/personal/club/club.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    my:['我的人数','我的收益'],
    active:0,
    child:''
  },
  onLoad(){
    var that=this;
    wx.request({
      url: imgurl +'api/member/myCommunity',
      data:{
        token:app.globalData.is_login
      },
      success(res){
        that.setData({
          list:res.data.data
        })
        wx.request({
          url: imgurl+'api/member/myChild',
          method:"post",
          header:{
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:{
            token:app.globalData.is_login
          },
          success(res){
            console.log(res.data.data)
            that.setData({
              child: res.data.data
            })
          }
        })
      }
    })
  },
  // 我的收益状态
  active(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    this.setData({
      active:id
    });
    if(id==0){
      wx.request({
        url: imgurl + 'api/member/myChild',
        method: "post",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          token: app.globalData.is_login
        },
        success(res) {
          console.log(res.data.data)
          that.setData({
            child: res.data.data
          })
        }
      })
    }else(
      wx.request({
        url: imgurl + '/api/member/myProfit',
        method: "post",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          token: app.globalData.is_login
        },
        success(res) {
         that.setData({
           goods:res.data.data
         })
        }
      })
    )
  }
})