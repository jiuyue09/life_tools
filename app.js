import {formatTime} from './utils/util'
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.cloud.init({
      env: 'test-f5ef21'
    })


    const db = wx.cloud.database();
    db.collection('rentKey').limit(10).get().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })

    this.funcTestTime();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  funcTestTime: function() {
    let timeString = new Date();
    let year = timeString.getUTCFullYear();
    let month = timeString.getUTCMonth();
    let day = timeString.getUTCDate();
    let hour = timeString.getUTCHours();
    let min = timeString.getMinutes();
    let sec = timeString.getSeconds();
    let aaa = formatTime(timeString);
    let time = new Date().getTime();
    console.log(aaa,time);
    console.log(year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec)
  },




  globalData: {
    userInfo: null
  }
})