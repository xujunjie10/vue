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
// 添加用户
export const addUser = obj => axios.post('/users', obj).then(res => res.data)
// 删除用户
export const delUser = id => axios.delete(`users/${id}`).then(res => res.data)
// 编辑用户提交
export const editUser = obj => axios.put(`/users/${obj.id}`, { email: obj.email, mobile: obj.mobile }).then(res => res.data)

// 修改用户状态
export const chackState = (uId, type) => axios.put(`users/${uId}/state/${type}`).then(res => res.data)

// 动态获取左侧菜单
export const getLeftList = () => axios.get('/menus').then(res => res.data)

// 获取商品分类数据
export const getCatUserList = (type, pagenum, pagesize) => axios.get('/categories', {params: {type: type, pagenum: pagenum, pagesize: pagesize}}).then(res => res.data)
