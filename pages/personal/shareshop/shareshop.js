// pages/personal/shareshop/shareshop.js
const app = getApp();
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/com_image.jpg',
      '/images/commod.png',
      '/images/com_image.jpg'
    ],
    msgurl:'',
  },
onLoad(){
  var that=this;
 wx.request({
   url: imgurl +'api/Goods/getShareContents',
   method:"POST",
   header:{
     "Content-Type": "application/x-www-form-urlencoded"
   },
   data:{
     flag: 'qrcode_my',
     token:app.globalData.is_login
   },
   success(res){
     console.log(res.data.data)
     that.setData({
       msgurl:res.data.data.share_url
     })
   }
 })
},
// 复制链接
copy(){
  wx.setClipboardData({//复制内容到剪切板
    data:this.data.msgurl,
    success(res){
      console.log(res)
    }
  })
},
//保存图片
img(){
  
}
})