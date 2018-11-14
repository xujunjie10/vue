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
        <el-button type="primary" plain @click="addDialogFormVisible = true">添加用户</el-button>
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
          label="状态">
            <template slot-scope="scope">
              <!-- v-model="scope.row.mg_state" -->
              <el-switch
                v-model="scope.row.mg_state"
                @change="getState(scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
        </el-table-column>
        <el-table-column
        prop=""
        label="操作">
        <!-- 通过scope.row可以取到表格那一行对象里面的属性 -->
        <!--  scope.row能获取当前行的数据 -->
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editOpen(scope.row)"></el-button>
          <!-- scope.row.id可以将你点击的那个用户的id取到，传递给函数发请求 -->
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelUser(scope.row.id)"></el-button>
          <el-button type="warning" icon="el-icon-check" circle></el-button>
        </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
          <el-pagination
          class="mt-15 page"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalnum">
          </el-pagination>
          <!-- 添加用户页面 -->
          <!-- 添加用户对话框 -->
          <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
            <el-form :model="addForm" ref="addFormRef" :rules="myrules">
              <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                <el-input v-model="addForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                <el-input v-model="addForm.password"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="addForm.email"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
                <el-input v-model="addForm.mobile"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitAdd('addFormRef')">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 修改用户对话框 -->
          <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
            <el-form :model="editForm" ref="editFormRef" :rules="myrules">
              <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                <el-input v-model="editForm.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="editForm.email"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
                <el-input v-model="editForm.mobile"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitEdit('editFormRef')">确 定</el-button>
            </div>
          </el-dialog>

  </div>
</template>
<style lang="scss" scoped>
  .search-input {
    width: 300px;
  }
</style>
<script>
import {getUserList, addUser, delUser, editUser, chackState} from '@/api'
export default {
  data () {
    // 定义自定义校验规则所需的函数
    let checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        // 校验邮箱规则
        // eslint-disable-next-line
        let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if (emailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }
    }

    return {
      // 调用初始化table的方法
      userList: [],
      searchVal: '',
      pagesize: 10,
      pagenum: 1,
      totalnum: 0,
      addDialogFormVisible: false,
      formLabelWidth: '80px',
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      myrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          // 4.4 自定义校验邮箱规则，通过validator属性指定自定义的校验函数即可
          { required: true, validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      },
      // 状态
      // state: '',
      // 修改用户弹窗
      editDialogFormVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile: ''
      }
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
    },
    submitAdd (formRef) {
      this.$refs[formRef].validate((isPass) => {
        if (isPass) {
          addUser(this.addForm)
            .then(res => {
              if (res.meta.status === 201) {
                this.$message.success('添加用户成功')
                this.addDialogFormVisible = false
                // 刷新页面
                this.initTable()
              }
            })
        }
      })
    },
    // 删除
    handleDelUser (id) {
      // 让提示框显示
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(id)
          .then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              // 提示信息
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 刷新页面
              this.initTable()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 提交修改
    submitEdit (formRef) {
      this.$refs[formRef].validate((isPass) => {
        if (isPass) {
          editUser(this.editForm)
            .then(res => {
              // console.log(res)
              if (res.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: res.meta.msg
                })
                // 刷新数据
                this.initTable()
                // 隐藏对话框
                this.editDialogFormVisible = false
              }
            })
        }
      })
    },
    editOpen (row) {
      // console.log(123)
      // scope.row能获取当前行的数据
      this.editForm.id = row.id
      this.editForm.username = row.username
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
      this.editDialogFormVisible = true
    },
    getState (row) {
      chackState(row.id, row.mg_state)
        .then(res => {
          // console.log(res)
          this.$message.success(res.meta.msg)
        })
    }
  }
}
</script>
