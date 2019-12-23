<template>
  <div class="app-container">
    <div class="filter-container">
    <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="单位名称" v-model="listQuery.title">
      </el-input>
    </el-form-item>

    <el-form-item label="">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
    </el-form-item>
    </el-form>
    </div>


    <el-table
    :data="list"
    stripe
    style="width: 100%">

    <el-table-column
      type="index"
      >
    </el-table-column>

    <el-table-column
      prop="company"
      label="用户名"
      >
    </el-table-column>



     <el-table-column
      prop="companyTel"
      label="公司电话">
    </el-table-column>

    <el-table-column
      prop="companyContact"
      label="公司联系人">
    </el-table-column>

    <el-table-column
      prop="companyPhone"
      label="公司联系人电话">
    </el-table-column>

  
    <el-table-column
      prop="UpdateTime"
      label="操作">
      <template slot-scope="scope">
      <el-button-group>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('user.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{$t('user.delete')}}
          </el-button>

          </el-button-group>
        </template>
    </el-table-column>
  </el-table>


    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.curpage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="公司" prop="company">
          <el-input v-model="temp.company"></el-input>
        </el-form-item>
        <el-form-item label="公司电话" prop="companyTel">
          <el-input v-model="temp.companyTel"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="companyContact">
          <el-input v-model="temp.companyContact"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="companyPhone">
          <el-input v-model="temp.companyPhone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"> </el-table-column>
        <el-table-column prop="pv" label="Pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchCompanyList, fetchGroupList, fetchPv, createCompany, deleteCompany, updateCompany } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import lang from '@/lang'
const calendarTypeOptions = [
  { key: '1', display_name: lang.t('user.root') },
  { key: '2', display_name: lang.t('user.admin') },
  { key: '3', display_name: lang.t('user.watcher') }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  name: 'user',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      groupList: null,
      total: null,
      listLoading: true,
      listQuery: {
        curpage: 1,
        pagesize: 10
      },
      test: [],
      calendarTypeOptions,
      sortOptions: [{ label: '升序', key: '+id' }, { label: '降序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        username: '',
        id: '',
        importance: 1,
        remark: '',
        timestamp: new Date(),
        admin_name: '',
        admin_gid: '',
        status: 'published',
        password: '',
        admin_areaid: [],
        checkedCities: []
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        admin_gid: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        company: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        password: [{ required: true, message: 'password is required', trigger: 'blur' }],
        checkedCities: [{ type: 'array', required: true, message: 'area is required', trigger: 'change' }]
      },
      downloadLoading: false,
      checkAll: false,
      cities: '',
      isIndeterminate: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    this.getList()
    this.getAreaList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchCompanyList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.datas.company_list
        this.total = parseInt(response.datas.total_count)
        this.listLoading = false
      })
    },
    getAreaList() {
      this.listLoading = true
      fetchGroupList(this.listQuery).then(response => {
        console.log(response)
        this.groupList = response.datas.group_list
        var arr = []
        /* for(var i = 0; i < this.groupList.length; i++){
          arr[i] = {}
          arr[i].id = this.groupList[i].Group_id
          arr[i].value = this.groupList[i].GroupName
        } */
        this.groupList.forEach(function(item, index, array){
          arr[index] = {}
          arr[index].id = item.Group_id
          arr[index].value = item.GroupName
        })
        this.cities = arr
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.curpage = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pagesize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.curpage = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      if(!this.hasPermission('addShip')){
        this.$notify({
              title: '没有权限',
              message: '当前用户没有操作权限',
              type: 'success',
              duration: 2000
            })
        return
      }


     this.$confirm('此操作将永久删除该单位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteCompany(row.id).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
      row.status = status
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


      
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        admin_gid: '',
        checkedCities: []
      }
    },
    handleCreate() {
      if(!this.hasPermission('addShip')){
        this.$notify({
              title: '没有权限',
              message: '当前用户没有操作权限',
              type: 'success',
              duration: 2000
            })
        return
      }

      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      const vm = this;
      vm.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // vm.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // vm.temp.admin_name = vm.temp.title
          console.log(vm.temp.checkedCities);

          createCompany(vm.temp).then((response) => {
            var msg = response.msg
            if(response.code === 200){
              console.log(vm.list)
              vm.list.unshift(vm.temp)
              vm.dialogFormVisible = false
              vm.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',    
                duration: 2000
              })
            }else{
              vm.dialogFormVisible = false
              vm.$notify({
                title: '失败',
                message: msg,
                type: 'fail',    
                duration: 2000
              })
            }
          })
        }
      })
    },
    hasPermission(actionId){
      const group = this.$store.getters.admingroupid
      console.log(group)
      if(group == 1) return true;
      return false;
    },
    handleUpdate(row) {

      if(!this.hasPermission('addShip')){
        this.$notify({
              title: '没有权限',
              message: '当前用户没有操作权限',
              type: 'success',
              duration: 2000
            })
        return
      }

      this.temp = Object.assign({ checkedCities: [] }, row) // copy obj
      
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      const vm = this;
      vm.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, vm.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateCompany(tempData).then(() => {
            for (const v of vm.list) {
              if (v.admin_id === vm.temp.admin_id) {
                const index = vm.list.indexOf(v)
                vm.list.splice(index, 1, vm.temp)
                break
              }
            }
            vm.dialogFormVisible = false
            vm.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleCheckAllChange(val) {
      const areas = this.cities.map((item, index) => 
        item.id
      )
      this.temp.checkedCities = val ? areas : []
      // console.log(val, areas, this.checkedCities)
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    transformString(value){
      var str 
      if(parseInt(value) === 1){
        str = '超级管理员'
      }else if(parseInt(value) === 2){
        str = '区域管理员'
      }else if(parseInt(value) === 3){
        str = '普通用户'
      }else{
        str = ''
      }
      return str
    },
    transformSuper(value){
      var str 
      if(parseInt(value) === 1){
        str = 'Yes'
      }else if(parseInt(value) === 0){
        str = 'No'
      }else{
        str = ''
      }
      return str
    },
    transformGroup(array){
      var arr = []
      array.forEach(function(item, index, array){
        arr[index] = item.GroupName
      })
      return arr.join(',')
    }
  }
}

</script>
<style scoped>
  .el-checkbox{
    margin-left: 10px;
  } 
</style>

<style rel="stylesheet/scss" lang="scss" scoped>

.filter-container {
    padding-top: 20px;
}

.app-container {
    height: 100%;
    padding: 20px;
}
</style>
