const amapFile = require('amap-wx.130.js')

// 实例化高德地图
const map = new amapFile.AMapWX({
  key: 'ac5bf6268ba45a44b6dad788f85734b0'
})

module.exports = {
  map
}