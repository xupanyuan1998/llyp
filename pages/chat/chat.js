// pages/chat/chat.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 'none',
    exit: 'none',
    shop_name: '',
    del: 0,
    chat_content: '',
    chat_id: '',
    chat_expect: '',
    // 用户id
    another_id: "",
    scrollhei:'',
    shopHeith:'',
    footerHeith:''
  },
  //删除
  del() {
    this.setData({
      show: 'block'
    })
  },
  //取消删除
  cancle() {
    this.setData({
      show: 'none'
    })
  },
  //删除全部
  del_all() {
    this.setData({
      del: 1,
      shop_name: '聊天记录设置',
      exit: 'flex'
    })
  },
  //取消删除
  cancle_b() {
    this.setData({
      del: 0,
      shop_name: '东阿阿胶官方旗舰店',
      exit: 'none'
    })
  },
  // 获取页面传入的id
  onLoad(datas) {
    var that = this;
    var a = datas.id;
    var name = datas.name;
    that.setData({
      shop_name: name,
      chat_id:a
    })

    // 进入聊天室
    wx.request({
      url: imgurl + '/api/helpcenter/inChat',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: a,
        token: app.globalData.is_login,
      },
      success(reg) {
        // 获取聊天信息
        if (reg.data.code == 200) {
          wx.request({
            url: imgurl + '/api/helpcenter/chatInfo',
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              id: a,
              token: app.globalData.is_login,
            },
            success(req) {
              that.setData({
                chat_expect: req.data.data.chat,
                another_id: req.data.data.another_id
              })
            }
          })
        }
      }
    })
     //动态计算scroll的高度
    let query = wx.createSelectorQuery();//创建元素节点；
    query.select("#shop").boundingClientRect(function (rect){
    });//获取#shop的高度
    query.select("#footer").boundingClientRect();//获取#shop的高度
    query.exec(function (req) {
      that.setData({
        shopHeight: req[0].height,
        footerHeith: req[1].height
      })
    });
    wx.getSystemInfo({//获取当前设备的高度
      success(res){
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    });
  },
  // 获取聊天框的内容
  content(e) {
    this.setData({
      chat_content: e.detail.value
    })
  },
  // 发送聊天信息
  send() {
    var that = this;
    wx.request({
      url: imgurl + '/api/helpcenter/addChat',
      method: "post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: that.data.chat_id,
        msg_type: 'text',
        msg: that.data.chat_content,
        token: app.globalData.is_login
      },
      success(res) {
        that.setData({
          chat_content: ''
        })
        wx.request({
          url: imgurl + '/api/helpcenter/chatInfo',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            id: that.data.chat_id,
            token: app.globalData.is_login,
          },
          success(req) {
            that.setData({
              chat_expect: req.data.data.chat,
              another_id: req.data.data.another_id,
              scrollBottom: 'scrollBottom'
            })
          }
        })
      }
    })
  },
})