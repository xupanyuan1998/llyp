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
    console.log(datas)
    var that = this;
    var id = datas.id;
    var name = datas.name;
    that.setData({
      shop_name: name
    })
    //创建聊天室
    wx.request({
      url: imgurl + '/api/helpcenter/judgeChat',
      method: "post",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: id,
        token: app.globalData.is_login
      },
      success(res) {
        that.setData({
          chat_id: res.data.data
        });
        if (res.data.code == 200) {
          // 进入聊天室
          wx.request({
            url: imgurl + '/api/helpcenter/inChat',
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              id: res.data.data,
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
                    id: res.data.data,
                    token: app.globalData.is_login,
                  },
                  success(req) {
                    if (req.data.data != '') {
                      that.setData({
                        chat_expect: req.data.data.chat,
                        another_id: req.data.data.another_id
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
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
          chat_content:''
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
              another_id: req.data.data.another_id
            })
          }
        })
      }
    })
  },
})