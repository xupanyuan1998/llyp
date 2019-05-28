// pages/personal/personmsg/personmsg.js
const app=getApp();
const imgurl=app.globalData.imgurl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username:'风起云涌',
    changeimg:'none',
    imgurles:'/images/user_image.jpeg',
    change_sex:'none',
    sex:'女',
    sex_choose:['男','女'],
    phone:'',
    p_phone: '', 
    real_name:''
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
        // console.log(res.tempFilePaths[0])
        _this.setData({
          changeimg: 'none',
          imgurles: res.tempFilePaths[0]
        })
        var date = new Date().getTime;
        console.log(_this.data.imgurles);
        // wx.uploadFile({
        //   url: 'http://www.lianlianyp.com/api/upload/uploadPic',
        //   filePath: _this.data.imgurles,
        //   name: 'date',
        //   formData: {
        //     'user': 'test'
        //   },
        //   header: {
        //     'content-type': 'application/text'
        //   },
        //   success(res) {
        //     console.log(res)
        //   }
        // })

        wx.request({
          url: 'http://www.lianlianyp.com/api/upload/uploadPic',
          method: "POST",
          data: {
            image: _this.data.imgurles
          },
          // 请求头部
          header: {
            'content-type': 'application/text'
          },
          success: function (res) {
            console.log(res);
          }
        })
      },
    });
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
    });
    var sexs;
    if (e.target.dataset.id=='男'){
      sexs=1
    }else{
      sexs=2
    }
    wx.request({
      url:imgurl+ 'api/member/editUser',
      method:"POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        field:'sex',
        value: sexs,
        token:app.globalData.is_login
      },
      success(res){
        // console.log(res)
      }
    })
  },
  //修改生日
  change_birth(){
   wx.navigateTo({
     url: '/pages/personal/trueName/trueName',
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
    
  },
  //添加推荐人
  add_man(){
    wx.navigateTo({
      url: '/pages/personal/add_man/add_man',
    })
  },
  //调用相机
  // takephoto(){
  //   var _this=this;
  //   this.ctx = wx.createCameraContext();
  //   this.ctx.takePhoto({
  //     quality: 'high',
  //     success: (res) => {
  //       _this.setData({
  //         changeimg: 'none',
  //         imgurl: res.tempFilePaths
  //       })
  //     }
  //   })
  // },
  // nicheng
  nicheng(){
   wx.navigateTo({
     url: '/pages/personal/nicheng/nicheng',
   })
  },
  //获取个人信息
  onLoad(){
    var that=this;
    wx.request({
      url:imgurl+ 'api/member/personalData',
      data:{
        token:app.globalData.is_login
      },
      success(res){
        // console.log(res.data.data.member_info.user_info.sex)
        if (res.data.data.member_info.user_info.sex==1){
          that.setData({
            sex:'男'
          })
        }else{
          that.setData({
            sex: '女'
          })
        }
        that.setData({
          imgurles: res.data.data.member_img,
          username: res.data.data.member_info.user_info.user_name,
          nick_name: res.data.data.member_info.user_info.nick_name,
          birth: res.data.data.member_info.user_info.birthday,
          phone: res.data.data.member_info.user_info.user_tel,
          p_phone: res.data.data.member_info.user_info.p_phone,
          real_name: res.data.data.member_info.user_info.real_name
        })
      }
    })
  },


})