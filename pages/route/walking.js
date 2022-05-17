// pages/route/walking.js
// 引入高德地图
import map from '../../utils/amap-config'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    if (options?.poilocation) {
      const { longitude, latitude } = wx.getStorageSync('geoCoord')
      const endLocation = options.poilocation.split(',')
      this.setData({
        poilocation: options.poilocation,
        markers: [
          { longitude, latitude },
          { longitude: parseFloat(endLocation[0]), latitude: parseFloat(endLocation[1]) }
        ]
      })
      console.log(this.data);
      map.map.getWalkingRoute({
        origin:`${longitude},${latitude}`,
        destination: this.data.poilocation,
        success: (res) => {
          console.log(res);
        }
      })
    } else {
      console.log('poi参数缺失!');
    }
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
  changeNav(e) {
    console.log(e);
    if (e.currentTarget?.dataset?.type) {
      const route = e.currentTarget?.dataset?.type
      wx.navigateTo({
        url: `/pages/route/${route}?poilocation=${this.data.poilocation}`,
      })
    }
  }
})