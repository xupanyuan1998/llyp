// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:'none',
    exit:'none',
    shop_name:'东阿阿胶官方旗舰店',
    del:0
  },
  //删除
  del(){
    this.setData({
      show:'block'
    })
  },
  //取消删除
  cancle(){
    this.setData({
      show:'none'
    })
  },
  //删除全部
  del_all(){
    this.setData({
      del:1,
      shop_name:'聊天记录设置',
      exit:'flex'
    })
  },
  //取消删除
  cancle_b(){
    this.setData({
      del: 0,
      shop_name: '东阿阿胶官方旗舰店',
      exit: 'none'
    })
  }
})