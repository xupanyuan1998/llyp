// pages/personal/zhuanrecord/zhuanrecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiangxi:[
      {zhanghu:"135635***3635",date:'12-28 18:00',jine:'351.00'},
      { zhanghu: "135635***3635", date: '12-28 18:00', jine: '351.00' },
      { zhanghu: "135635***3635", date: '12-28 18:00', jine: '351.00' },
      { zhanghu: "135635***3635", date: '12-28 18:00', jine: '351.00' }
    
    ]
  },
// 详细
xiangxi(){
  wx.navigateTo({
    url: '/pages/personal/zhuanint/zhuanint',
  })
}
})