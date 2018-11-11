<template>
  <div class="users">
    <!-- 头部面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" class="search-input" v-model="searchVal" @keydown.native.enter="searchUser">
        <el-button slot="append" icon="el-icon-search" @click="searchUser" ></el-button>
      </el-input>
        <el-button type="primary" plain>添加用户</el-button>
    </div>
    <!-- 表格 -->
      <el-table
        class="mt-15"
        :data="userList"
        border
        style="width: 100%">
        <el-table-column
          type='index'
          width="50">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="状态">
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
          <el-pagination
          class="mt-15 page"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalnum">
          </el-pagination>
  </div>
</template>
<style lang="scss" scoped>
  .search-input {
    width: 300px;
  }
</style>
<script>
import {getUserList} from '@/api'
export default {
  data () {
    return {
      // 调用初始化table的方法
      userList: [],
      searchVal: '',
      pagesize: 3,
      pagenum: 1,
      totalnum: 0
    }
  },
  created () {
    this.initTable()
  },
  methods: {
    handleSizeChange (val) {
      // 改变每页多少条的时候，将这个值赋值给pagesize属性，接着再调用获取数据的方法
      this.pagesize = val
      this.initTable()
    },
    handleCurrentChange (val) {
      // 改变当前页码时，将当前页面的值赋值给pagenum属性，接着再调用获取数据的方法
      this.pagenum = val
      this.initTable()
    },
    // 初始化用户列表
    initTable () {
      getUserList({query: this.searchVal, pagenum: this.pagenum, pagesize: this.pagesize})
        .then(res => {
          // console.log(res)
          this.userList = res.data.users
          // 页面总条数赋值
          this.totalnum = res.data.total
        })
    },
    // 搜索按钮
    searchUser () {
      this.initTable()
      this.searchVal = ''
    }
  }
}
</script>
