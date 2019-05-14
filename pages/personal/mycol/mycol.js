// pages/personal/mycol/mycol.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: [{ num: "0", text: '收藏宝贝' }, { num: "1", text: '收藏店铺' }],
    indexs:'0'
  },
  active(e){
  this.setData({
    indexs:e.target.dataset.id
  })
  }
 
})