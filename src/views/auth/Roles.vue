<template>
  <div class="roles">
    <!-- 头部面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色 -->
    <el-button type="primary" plain @click="addDialogFormVisible = true">添加角色</el-button>
    <!-- 角色数据列表 -->
      <el-table
        class="mt-15"
        :data="rolesList"
        border
        style="width: 100%">
        <!-- 展开功能 -->
        <el-table-column type="expand">
           <template slot-scope="props">
              <el-row>
                <el-col :span="24">
                  <el-row v-for="firstItem in props.row.children" :key="firstItem.id">
                    <el-col :span="4" > <el-tag class="tagStyle" closable>{{firstItem.authName}}</el-tag><i class="el-icon-arrow-right"></i>
                    </el-col>
                    <el-col :span="20">
                      <el-row v-for="secItem in firstItem.children" :key="secItem.id">
                        <el-col :span="4"><el-tag type="warning" class="tagStyle" closable>{{secItem.authName}}</el-tag><i class="el-icon-arrow-right"></i></el-col>
                        <el-col :span="20">
                          <el-tag v-for="thirdItem in secItem.children" :key="thirdItem.id" type="success" class="tagStyle" closable @close="handleDelRoles(props.row,thirdItem.id)">{{thirdItem.authName}}</el-tag>
                          <!-- <i class="el-icon-arrow-right"></i> -->
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
           </template>
        </el-table-column>

        <el-table-column
          type='index'
          width="50">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="描述">
        </el-table-column>
        <el-table-column
        prop=""
        label="操作">
        <!-- 通过scope.row可以取到表格那一行对象里面的属性 -->
        <!--  scope.row能获取当前行的数据 -->
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <!-- scope.row.id可以将你点击的那个用户的id取到，传递给函数发请求 -->
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
          <el-button type="warning" icon="el-icon-check" circle></el-button>
        </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import {getRolesList, delRolesuser} from '@/api'
export default {
  data () {
    return {
      rolesList: [],
      roleName: '',
      roleDesc: ''
    }
  },
  created () {
    this.initTables()
  },
  methods: {
    // 初始化数据列表
    initTables () {
      getRolesList()
        .then(res => {
          console.log(res.data)
          this.rolesList = res.data
        })
    },
    handleDelRoles (row, id) {
      delRolesuser(row.id, id)
        .then(res => {
          console.log(res)
          if (res.meta.status === 200) {
            this.$message.success(res.meta.msg)
            this.initTables()
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.tagStyle{
  margin: 5px
}
</style>
