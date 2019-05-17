// pages/personal/safe/safe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiugai: [{ src: '/images/suo.png', text: '修改登录密码', img: '/images/int.png' }, 
    { src: '/images/suo.png', text: '修改二级密码', img: '/images/int.png' },]
  },
// 改密码页面
changepass(){
  wx.navigateTo({
    url: '/pages/personal/changepass/changepass',
  })
}
})