// pages/returnDetail/returnDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    return_detail:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.data_info = '{"_id":"ee3099285cde57e9138f46f006920901","_openid":"oC6F45DEanKcIK6rVnIB2wgkwfUU","is_rent":false,"rent_name":"李四","rent_shops":"黄河南路城铁店","rent_tel":"18639517891","user_shops":"欢呼和南华里"}';
    let temp_info = JSON.parse(options.data_info);
    this.return_detail = temp_info;
    console.log(this.return_detail);
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})