// pages/rentlist/rentlist.js
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
    shopFlag:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.shopFlag = options.shopFlag;
    this.funcClearData();
    wx.showLoading({
      title: '加载中...',
      mask: true,
    });
    this.funcGetDataList();
  },

  funcGetDataList() {
    const _this = this;
    wx.cloud.callFunction({
      name: 'queryRentList',
      data: {
        page_size: _this.data.page_size,
        page_index: _this.data.page_index
      }
    }).then(res => {
      wx.hideLoading();
      if (this.data.page_index == 0) {
        this.data.total_data = [];
      }
      let old_data = this.data.total_data;
      let currentData = res.result.data;
      let bottom = false;
      if (currentData.length < 20) {
        bottom = true;
      }
      _this.setData({
        is_show_data: true,
        total_data: old_data.concat(currentData),
        is_bottom: bottom,
      })
      console.log('自定义云函数', _this.total_data);
    }).catch(() => {
      wx.hideLoading();
      _this.setData({
        is_show_data: true,
      })
    })
  },

  funcClearData: function () {
    this.data.is_show_data = false;
    this.data.total_data = [];
    this.data.page_index = 0;
    this.data.page_size = 20;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  funcGoToReturn(index) {
    // console.log(index);
    let data_info = index.currentTarget.dataset.info;
    if (!data_info.is_rent) {
      let info = JSON.stringify(data_info);
      console.log(info);
      // wx.navigateTo({
      //   url: '/pages/returnDetail/returnDetail?data_info='+info
      // })
      let _this = this;
      wx.showModal({
        content: '确认归还钥匙？',
        success: function (res) {
          if (res.confirm) {
            _this.funcUpdateKeyRecoard(data_info);
            console.log('确定');
          }
        }
      })
    }
  },

  funcUpdateKeyRecoard(info) {
    if (this.data.shopFlag != '1000') {
      wx.showToast({
        title: '请去门店归还钥匙',
        icon: 'none'
      })
      return;
    }

    let info_id = info._id;
    const db = wx.cloud.database();
    const myTodo = db.collection('rentKey').doc(info_id);
    myTodo.update({
      data: {
        is_rent: true
      }
    }).then(res => {
      console.log(res);
      wx.redirectTo({
        url: '/pages/remind/success/success?rent=0'
      })
    }).catch(fail => {
      wx.redirectTo({
        url: '/pages/remind/warn/warn?rent=0'
      })
    });
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
    this.funcGetDataList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})