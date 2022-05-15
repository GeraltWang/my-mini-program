// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success: res => {
        const { longitude, latitude } = res
        wx.setStorageSync('geoCoord', { longitude, latitude })
      }
    })
  },
  onShow() {

  },
  onHide() {

  },
  globalData: {
    userInfo: null
  }
})
