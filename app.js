import {formatTime} from './utils/util'
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    let server = 'release-f59277';
    // let server = 'test-f5ef21';
    wx.cloud.init({
      env: server
    })

    // const db = wx.cloud.database();
    // db.collection('rentKey').limit(10).get().then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // })

    this.funcTestTime();
    // 获取用户信息
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