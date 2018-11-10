<template>
  <div class="login">
    <el-form class="container" :model="loginForm" :rules="myrules" ref="loginForm">
      <el-form-item class="avatar">
        <img src="../assets/avatar.jpg" alt="">
      </el-form-item>
      <el-form-item prop="username">
        <el-input prefix-icon="myicon myicon-user" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="myicon myicon-key" v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <div>
        <!-- 2.2 点击的时候将ref的值作为参数传递到函数submitLogin中去,注意加上引号⭐ -->
          <el-button type="primary" class="login-btn" @click="subLogin('loginForm')">登录</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
// 引入axios
// import axios from 'axios'
// 引入接口
import {postLogin} from '@/api'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      myrules: {
        username: { required: true, message: '请输入用户名', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      }
    }
  },
  methods: {
    subLogin (refval) {
      // alert(123)
      // 2.3 发请求之前，先利用validate()方法对表单进行校验,validate方法在element-ui中已封装好
      this.$refs[refval].validate(isPass => {
        // 参数isPass是一个布尔值，为true表示校验通过，则可以进行下一步发请求，为false表示校验失败
        if (isPass) {
          // console.log('登录了')
          // 调用接口发送请求
          // axios.post('http://localhost:8888/api/private/v1/login', {username: this.loginForm.username, password: this.loginForm.password})
          //   .then(res => {
          //     // console.log(res)
          //     if (res.data.meta.status === 200) {
          //       this.$router.push('/')
          //       this.$message.success(res.data.meta.msg)
          //     } else {
          //       // console.log('登录失败了')
          //       this.$message.error(res.data.meta.msg)
          //     }
          //   })
          postLogin({username: this.loginForm.username, password: this.loginForm.password})
            .then(res => {
              if (res.meta.status === 200) {
                this.$message.success(res.meta.msg)
                // console.log(res)
                // 将服务器返回的token保存到本地
                localStorage.setItem('mytoken', res.data.token)
                localStorage.setItem('username', res.data.username)
                this.$router.push({name: 'home'})
              } else {
                console.log('登录失败了')

                this.$message.error(res.meta.msg)
              }
            })
        } else {
          console.log('失败了')
          this.$message.warning('请正确填写表单')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #2f4050;

    .container {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 0px 40px 15px 40px;
      margin: 200px auto;
      background: white;
      .avatar {
        position: relative;
        left: 50%;
        width: 120px;
        height: 120px;
        margin-left: -60px;
        margin-top: -60px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 10px solid #fff;
        box-shadow: 0 1px 5px #ccc;
        overflow: hidden;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
</style>
