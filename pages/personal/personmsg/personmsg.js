// pages/personal/personmsg/personmsg.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'风起云涌',
    changeimg:'none',
    imgurl:'/images/user_image.jpeg',
    change_sex:'none',
    sex:'女',
    sex_choose:['男','女'],
    birth:'请添加',
    changebirth:'none',
    years,
    year: date.getFullYear(),
    months,
    month: 2,
    days,
    day: 2,
    value: [9999, 1, 1]
  },
  changeimg(){
    this.setData({
      changeimg:'block'
    })
  },
  cancle(){
    this.setData({
      changeimg: 'none',
      change_sex: 'none'
    })
  },
  // 调用手机相册
  tuku(){
    var _this=this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        _this.setData({
          changeimg: 'none',
          imgurl: res.tempFilePaths
        })
      },
    })
  },
  //改变性别
  changesex(){
    this.setData({
      change_sex: 'block'
    })
  },
  //获取性别
  get_sex(e){
    this.setData({
      sex:e.target.dataset.id,
      change_sex: 'none'
    })
  },
  //修改生日
  change_birth(){
    this.setData({
      changebirth:'block'
    })
  },
  //获取生日
  bindChange(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  //取消
  quxiao(){
    this.setData({
      changebirth: 'none'
    })
  },
  //确定
  ok(){
    this.setData({
      changebirth: 'none',
      birth: this.data.year + '-' + this.data.month + '-'+this.data.day
    })
  },
  //添加推荐人
  add_man(){
    wx.navigateTo({
      url: '/pages/personal/add_man/add_man',
    })
  },
  //调用相机
  takephoto(){
    var _this=this;
    this.ctx = wx.createCameraContext();
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        _this.setData({
          changeimg: 'none',
          imgurl: res.tempFilePaths
        })
      }
    })
  }
})