// pages/msg/msg.js
const app=getApp();
const imgurl=app.globalData.imgurl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    head_url:[
      {url:"/images/platform.png",text:"平台公告"},
    {url:"/images/customer.png",text:"平台消息"},
    {url:"/images/business.png",text:"商家消息"}
    ],
    abc: '',
    unreadNum:''//未读消息
  },
//系统通知
notice(){
  wx.navigateTo({
    url: '/pages/notice/notice',
  })
},
chat(e){
  let id=e.currentTarget.dataset.id,
      name=e.currentTarget.dataset.name;
  wx.navigateTo({
    url: '/pages/chat/chat?id='+id+'&name='+name,
  })
},
// 获取聊天列表
onShow(){
  var that=this;
 if(app.globalData.is_login==null){
   wx.showToast({
     title: '请登录',
     icon:'none'
   })
 }else{
   wx.request({
     url: imgurl + 'api/helpcenter/chatList',
     data: {
       token: app.globalData.is_login
     },
     success(res) {
       console.log(res)
       that.setData({
         abc: res.data.data
       });
       // 获取未读消息
       wx.request({
         url: imgurl + 'api/goods/unreadNum',
         data: {
           token: app.globalData.is_login
         },
         success(req) {
           // 将返回的数据设置给未读的消息；
           that.setData({
             unreadNum: req.data.data
           })
         }
       })
     }
   })
 }
},
// 删除聊天
dels(e){
  var id = e.currentTarget.dataset.id;
  wx.showModal({
    title:'提示',
    content: '您确定要删除吗？',
    success(res) {
      if (res.confirm) {
        wx.request({
          url: imgurl + '/api/helpcenter/delChat',
          method: "post",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            id: id,
            type: 2,
            token: app.globalData.is_login
          },
          success(res) {
            wx.request({
              url: imgurl + 'api/helpcenter/chatList',
              data: {
                token: app.globalData.is_login
              },
              success(req) {
                that.setData({
                  message: req.data.data
                })
              }
            })
          }
        })
      } 
    }
  })
  
}
})