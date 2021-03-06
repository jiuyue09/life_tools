//index.js
//获取应用实例
import {isvaildTelPhone} from '../../utils/util'
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shopFlag:''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
      this.data.shopFlag = options.shopFlag;
  },

  funcSubmit: function (e) {
    if (this.data.shopFlag != '1000') {
      wx.showToast({
        title: '请去门店借用钥匙',
        icon: 'none',
      });
      return
    }
    let name = e.detail.value.name;
    if (!name || name == '') {
      this.funcToast('请输入租借人姓名');
      return;
    }
    let tel = e.detail.value.tel;
    if (!tel || tel == '') {
      this.funcToast('请输入租借人手机号');
      return;
    }
    if (!isvaildTelPhone(tel)) {
      this.funcToast('您输入的手机号格式不正确');
      return;
    }
    let shops = e.detail.value.shops;
    if (!shops || shops == '') {
      this.funcToast('请输入租借人所属门店');
      return;
    }
    let address = e.detail.value.address;
    if (!address || address == '') {
      this.funcToast('请输入钥匙所属物业');
      return;
    }
    let sys_num = e.detail.value.sys_num;
    wx.cloud.callFunction({
      name: 'add',
      data: {
        'rent_name':name,
        'user_shops':shops,
        'rent_tel':tel,
        'key_address':address,
        'sys_num':sys_num
      }
    }).then(res => {
      console.log(res);
        wx.redirectTo({
          url: '/pages/remind/success/success?rent=1'
        })
    }).catch(error => {
      console.log(error);
      wx.redirectTo({
        url: '/pages/remind/warn/warn?rent=1'
      })
    });
  },

  funcToast:function(title) {
    wx.showToast({
      title: title,
      icon:'none',
      duration: 2000
    })  
  },



  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
