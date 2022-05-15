// pages/home/index.js
// 引入高德地图
import map from '../../utils/amap-config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: null,
    longitude: null,
    markers: {},
    inputShowed: false,
    inputVal: '',
    tips: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从本地存储获取经纬度
    const geoCoord = wx.getStorageSync('geoCoord')
    this.setData({
      latitude: geoCoord.latitude,
      longitude: geoCoord.longitude
    })
    // 逆地址解析
    map.map.getRegeo({
      success: res => {
        console.log(res);
        this.setData({
          markers: res
        })
      },
      fail: res => {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  showInput() {
    this.setData({
      inputShowed: true,
    });
  },
  hideInput() {
    this.setData({
      inputVal: '',
      tips: [],
      inputShowed: false,
    });
  },
  clearInput() {
    this.setData({
      inputVal: '',
    });
  },
  inputTyping(e) {
    if (e.detail.value === '') {
      this.setData({
        inputVal: '',
        tips: []
      });
    } else {
      this.setData({
        inputVal: e.detail.value,
      });
      this.keyword(e.detail.value)
    }
  },
  // 根据输入的关键字调用高德地搜索
  keyword(keyword) {
    map.map.getInputtips({
      keywords: keyword,
      location: `${this.data.longitude},${this.data.latitude}`,
      success: res => {
        console.log(res);
        if (res?.tips) {
          this.setData({
            tips: res.tips
          })
        }
      }
    })
  }
})