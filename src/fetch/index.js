import axios from 'axios'
import qs from 'qs'
export default (Vue) => {
  // 使用axios来发ajax
  // 增加一个拦截器，当method为form时，使用表单提交的方式
  // 使用qs包将data转为表单数据
  axios.interceptors.request.use((config) => {
  	console.log(config,'我我我')
    if (config.method === 'form') {
      config.method = 'post'
      config.data = qs.stringify(config.data)
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    // 调用公共的请求路径
    config.baseURL = process.env.HTTP.BASE_URL
    // 设置超时时间
    config.timeout = 10000;
    // 增加时间戳，防止拉取缓存
    switch(config.method){
      case 'get':
        !!config.params ? config.params._t = new Date().getTime() : config.params = { _t: new Date().getTime() }
      break;
      case 'post':
        !!config.data ? config.data._t = new Date().getTime() : config.data = { _t: new Date().getTime() }
      break;
      default:
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })
  // 增加拦截器，在响应阶段统一处理
  axios.interceptors.response.use((response) => {
    return response
  }, (error) => {
    return Promise.reject(error)
  })
  // 挂载在Vue原型上
  Vue.prototype.$http = axios
}



   