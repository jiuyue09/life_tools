// pages/manage/queryResult/queryResult.js
import { formatTime } from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_show_data: false,
    total_data: [],
    page_size: 10,
    page_index: 0,
    is_bottom: false,
    touch_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.touch_id = options.touch_id;
    this.funcClearData();
    wx.showLoading({
      title: '加载中...',
      mask: true,
    });
    this.funcGetRentList();
  },

  funcClearData: function () {
    this.data.is_show_data = false;
    this.data.total_data = [];
    this.data.page_index = 0;
    this.data.page_size = 10;
  },

  funcGetRentList: function () {
    const _this = this;
    let params = {
      page_size: _this.data.page_size,
      page_index: _this.data.page_index,
    };
    if (_this.touch_id == '1') {
      params.is_rent = true;
    } else if (_this.touch_id == '2') {
      params.time = true;
    } else {

    }
    if (this.data.page_index == 0) {
      this.data.total_data = [];
    }
    wx.cloud.callFunction({
      name: 'queryResult',
      data: params
    }).then(res => {
      wx.hideLoading();
      console.log(res);
      let old_data = _this.data.total_data;
      let currentData = res.result.data;
      let bottom = false;
      if (currentData.length < 20) {
        bottom = true;
      }
      _this.setData({
        is_show_data: true,
        total_data: old_data.concat(currentData),
        is_bottom:bottom,
      })
      console.log('自定义云函数', _this.total_data);
    }).catch(() => {
      wx.hideLoading();
      _this.setData({
        is_show_data: true,
      })
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
    if (this.data.is_bottom) {
      return;
    }
    this.data.page_index++;
    this.funcGetRentList();
  },


  funcMakeCall:function(e) {
    console.log(e,'这是个事件响应')
    let info = e.currentTarget.dataset.info;
    console.log(info);
    wx.makePhoneCall({
      phoneNumber: info.rent_tel,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})