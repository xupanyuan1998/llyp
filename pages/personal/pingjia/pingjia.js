// pages/personal/pingjia/pingjia.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start_1:0,
    start_2: 0,
    start_3: 0,
    start_4: 0,
    start_5: 0,
    show:"none"
  },
  start_1(){
    if (this.data.start_1==1){
      this.setData({
        start_1:0
      })
    }else{
      this.setData({
        start_1: 1
      })
    }
  },
  start_2() {
    if (this.data.start_2 == 1) {
      this.setData({
        start_2: 0
      })
    } else{
      this.setData({
        start_2: 1
      })
    }
  },
  start_3() {
    if (this.data.start_3 == 1) {
      this.setData({
        start_3: 0
      })
    } else{
      this.setData({
        start_3: 1
      })
    }
  },
  start_4() {
    if (this.data.start_4 == 1) {
      this.setData({
        start_4: 0
      })
    } else{
      this.setData({
        start_4: 1
      })
    }
  },
  start_5() {
    if (this.data.start_5 == 1) {
      this.setData({
        start_5: 0
      })
    } else{
      this.setData({
        start_5: 1
      })
    }
  },
  //tishi
  save(){
    this.setData({
      show:'bolock'
    })
  },
  //隐藏提示
  cancle(){
    this.setData({
      show: 'none'
    })
  }
})