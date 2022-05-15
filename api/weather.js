import { request } from '../utils/request'

// 获取当天天气预报
export const dayWeather = (data) => request('/weather/now', 'get', data)

// 获取三日天气预报
export const threeDaysWeather = (data) => request('/weather/3d', 'get', data)