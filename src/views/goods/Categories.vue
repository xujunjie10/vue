<template>
  <div class="categories">
    <!-- 头部面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加分类 -->
    <el-button type="primary" plain >添加分类</el-button>
    <!-- 分页数据 -->
    <!-- 使用组件 -->
    <tree-table
      class="mt-15"
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-table>
    <!-- 分页器 -->
    <el-pagination
      class="mt-15 page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>

  </div>
</template>
<script>
import {getCatUserList} from '@/api'
// 引入组件
import TreeTable from '@/components/TreeGrid/TreeGrid'
export default{
  // 注入组件
  components: {
    TreeTable
  },
  data () {
    return {
      dataSource: [],
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }],
      // 分页器数据
      pagesize: 10,
      totalNum: 0,
      pagenum: 1

    }
  },
  created () {
    // 调用初始化
    this.initTable()
  },
  methods: {
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    },
    // 分页器
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initTable()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.initTable()
    },

    // 初始化列表
    initTable () {
      getCatUserList(3, this.pagenum, this.pagesize)
        .then(res => {
          console.log(res)
          this.dataSource = res.data.result
          this.totalNum = res.data.total
        })
    }
  }
}
</script>
