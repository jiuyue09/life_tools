// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_root:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.cloud.callFunction({
      name: 'rootManage',
    }).then(res => {
      console.log(res);
      _this.setData({
        is_root:res.result
      });
    }).catch(error => {
      console.log(error);
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  funcGetPhone: function(e) {
    console.log(e);
  },

  // function rendkey(params) {
    
  // },

  rendkey:function() {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },

  returnKey:function() {
    wx.navigateTo({
      url:'/pages/rentlist/rentlist'
    })
  },

  rentList:function() {
    wx.navigateTo({
      url: '/pages/manage/manage'
    })
  },
})