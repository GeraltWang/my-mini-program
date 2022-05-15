const BASE_URL = 'https://devapi.qweather.com/v7'
const KEY = 'e9c8f289a3184506aa5afa4236f8c10f'

export const request = (url, method, data = {}) => {
  data.key = KEY
  return new Promise((resolve, reject) => {
    wx.request({
      method: method,
      url: BASE_URL + url,
      data: data,
      header: {
        'content-type': 'application-json'
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}