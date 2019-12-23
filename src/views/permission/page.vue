<template>
  <div class="app-container">
    <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="">
      <div>
      <span v-permission="['admin']" class="permission-alert">
        {{username}} 您当前角色是：
        <el-tag class="permission-tag" size="small">{{role}}</el-tag>
      </span>
    </div>

    </el-form-item>
  </el-form>

<el-table
    :key='tableKey' :data="list" v-loading="listLoading" stripe
    style="width: 100%">
    <el-table-column
      type="index"
      >
    </el-table-column>
    <el-table-column 
      label="权限描述"
      prop="per_desp">
    </el-table-column>
    <el-table-column 
      label="超级管理员"
      prop="per_root">
    </el-table-column>
    <el-table-column 
      label="区域管理员"
      prop="per_admin">
    </el-table-column>

    <el-table-column
      label="普通用户"
      prop="per_watcher">
    </el-table-column>
  </el-table>

  </div>
</template>

<script>
import { mockPerm } from '@/api/article'
import SwitchRoles from './components/SwitchRoles'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default{
  username: 'pagePermission',
  components: { SwitchRoles },
  directives: { permission },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      role: '',
      group: ''
    }
  },
  created() {
    this.permList()
    this.role = this.$store.getters.roles
    this.group = this.$store.getters.group
    this.username = localStorage.getItem('myusername')

    console.log(this.$store.getters)
  },
  methods: {
    permList(){
      this.listLoading = true
      mockPerm().then(response => {
        this.list = response.perList
        this.listLoading = false
      })
    },
    handleRolesChange() {
      this.$router.push({ path: '/permission/index?' + +new Date() })
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container{
  padding-top: 5px;
  .filter-item:first-child{
    width: 200px; 
    margin-left: 15px;
  }
}
table{
  width:100%;
  border-collapse:collapse;
}
table,th, td {
  border: 1px solid #ccc;
}
table .tableKey{
  width:15%;
  background-color:#f5f7fa;
}
table .tableValue{
  width:35%;
  color:#222;
  background-color:#e5f3ff;
}
.wasterTable .active {
  background-color: #9ce71a;
}

.filter-container {
    padding-top: 20px;
}



  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }


.app-container {
    height: 100%;
    padding: 20px;
}


  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }

</style>
