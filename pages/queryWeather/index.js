// pages/queryWeather/index.js
import {
  dayWeather,
  threeDaysWeather
} from '../../api/weather'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: null,
    latitude: null,
    markers: [],
    threeDays: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDayWeather()
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
    wx.showNavigationBarLoading()
    this.getDayWeather()
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
  async getDayWeather() {
    wx.showLoading({
      title: '加载中',
    })
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success: async (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        const resp = await threeDaysWeather({
          location: `${ longitude },${ latitude }`
        })
        if (resp?.code === "200") {
          console.log(resp);
          this.setData({
            threeDays: resp.daily
          })
          // wx.hideLoading()
        } else {
          wx.showToast({
            title: '获取天气数据失败',
          })
        }
      },
      complete: () => {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        wx.hideLoading()
      }
    })
  },
  // 跳转到地图并根据关键字查找周围的兴趣点
  async doSearch(e) {
    if (e.currentTarget.dataset.keyword) {
      const keyword = e.currentTarget.dataset.keyword
      wx.navigateTo({
        url: `/pages/queryWeather/map?keyword=${keyword}`,
      })
    }
  }
})