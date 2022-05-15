// pages/queryWeather/map.js
// 引入高德地图
import map from '../../utils/amap-config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    markerData: {},
    latitude: null,
    longitude: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    const {
      longitude,
      latitude
    } = wx.getStorageSync('geoCoord')
    this.setData({
      longitude,
      latitude
    })
    // 将关键字设置为标题
    if (options?.keyword) {
      wx.setNavigationBarTitle({
        title: `周边-${options.keyword}`,
      })
      // 使用高德地图周围兴趣点API 
      map.map.getPoiAround({
        keywords: options.keyword,
        success: (res) => {
          console.log(res);
          if (res.markers.length > 0) {
            this.setData({
              markers: res.markers
            })
            // 高亮第一个兴趣点
            this.showMarkerInfo(this.data.markers, 0)
            this.changeMarkerIcon(this.data.markers, 0)
          }
        }
      })
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
  // 展示当前点的信息
  showMarkerInfo(markers, index) {
    this.setData({
      markerData: {
        name: markers[index].name,
        address: markers[index].address,
        location: `${markers[index].longitude},${markers[index].latitude}`
      }
    })
  },
  // 更改当前点的图标
  changeMarkerIcon(markers, index) {
    let temp = []
    for (let j = 0; j < markers.length; j++) {
      if (j == index) {
        markers[j].iconPath = '../../static/icons/location.png'
      } else {
        markers[j].iconPath = '../../static/icons/location-grey.png'
      }
      markers[j].width = 30
      markers[j].height = 30
      temp.push(markers[j])
    }
    this.setData({
      markers: temp
    })
  },
  // 点击标记点
  markerTap(e) {
    console.log(e);
    const {
      markerId
    } = e
    this.showMarkerInfo(this.data.markers, markerId)
    this.changeMarkerIcon(this.data.markers, markerId)
  }
})