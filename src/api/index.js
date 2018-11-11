import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // config参数表示请求对象
  // Do something before request is sent相应之前
  let mytoken = localStorage.getItem('mytoken')
  if (mytoken) {
    // 存在token就将token塞进请求头的某个字段中，这个字段名不能随便取，它是一个前后端约定好的字段名
    config.headers['Authorization'] = mytoken
  }
  console.log(config)

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 定义登录接口
export const postLogin = obj => {
  return axios.post('/login', obj)
    .then(res => res.data)
}
// 用户数据列表
export const getUserList = obj => {
  return axios.get('/users', { params: obj })
    .then(res => res.data)
}
