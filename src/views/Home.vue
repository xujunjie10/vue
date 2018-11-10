<template>
    <div class="home">
    <el-container>
      <!-- 左侧 -->
      <el-aside width="auto">
          <div class="logo"></div>
          <!-- collapse属性的true或者false控制菜单折叠与展开 -->
          <!-- router属性用于开启路由模式，下面会将index里面的值作为跳转的路径 -->
          <el-menu
              router
              :collapse="isCollapse"
              background-color="#F9F9F9"
              default-active="2"
              class="el-menu-admin"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                 <!-- 这里需要index改为一个路径 -->
                  <el-menu-item index="/users"><i class="el-icon-menu"></i>用户列表</el-menu-item>
              </el-submenu>
            </el-menu>
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <!-- 头部 -->
      <el-header>
        <div class="myicon myicon-menu toggle-btn" @click="toggle" ></div>
        <div class="system-title">电商后台管理系统</div>
        <div>
          <span class="welcome">你好，{{username}}</span>
          <el-button type="warning" round @click="logout">退出</el-button>
        </div>
      </el-header>
      <!-- 中间主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      </el-container>
  </el-container>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapse: false,
      username: ''
    }
  },
  methods: {
    toggle () {
      this.isCollapse = !this.isCollapse
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      // 清除token
      localStorage.removeItem('mytoken')
      // 跳转到登录页面
      this.$router.push('/login')
    }
  },
  mounted () {
    // 取出存储的username
    let name = localStorage.getItem('username')
    // 赋值给定义好的username
    this.username = name
  }
}
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
    .el-menu-admin:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .el-container {
      height: 100%;
    }
    .el-aside {
      background-color: #f9f9f9;
    }
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #409eff;
    }
    .logo {
      height: 60px;
      background: url(../assets/logo.png);
      background-size: cover;
      background-color: white;
    }
    .toggle-btn {
      padding: 0 15px;
      margin-left: -20px;
      font-size: 36px;
      color: white;
      cursor: pointer;
      line-height: 60px;
      &:hover {
        background-color: #4292cf;
      }
    }
    .system-title {
      font-size: 28px;
      color: white;
    }
    .welcome {
      color: white;
    }
  }
</style>
