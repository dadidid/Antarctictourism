<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('alarm.content')" v-model="listQuery.name">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" :label="$t('user.id')" width="100">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="500px" align="center" :label="$t('alarm.description')">
        <template slot-scope="scope">
          <span>{{scope.row.alarm_desp}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('alarm.operator')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.alarm_opter}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="$t('alarm.addTime')" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.add_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.curpage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
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
import { mockAlarm } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import lang from '@/lang'
const calendarTypeOptions = [
  { key: 'root', display_name: lang.t('user.root') },
  { key: 'admin', display_name: lang.t('user.admin') },
  { key: 'user', display_name: lang.t('user.watcher') }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  name: 'user',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        curpage: 1,
        pagesize: 10,
        name: ''
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: '升序', key: '+id' }, { label: '降序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        GroupCode: '',
        GroupName: '',
        GroupNote: '',
        type: '',
        status: 'published',
        Group_id: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        GroupCode: [{ required: true, message: 'GroupCode is required', trigger: 'change' }],
        GroupName: [{ required: true, message: 'GroupName is required', trigger: 'change' }],
        GroupNote: [{ required: true, message: 'GroupNote is required', trigger: 'blur' }]
        // password: [{ required: true, message: 'password is required', trigger: 'blur' }]
        // area: [{ required: true, message: 'area is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
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
    this.alarmList()
  },
  methods: {
    // getList() {
    //   this.listLoading = true
    //   fetchGroupList(this.listQuery).then(response => {
    //     console.log(response)
    //     this.list = response.datas.group_list
    //     this.total = parseInt(response.datas.total_count)

    //     // Just to simulate the time of the request
    //     setTimeout(() => {
    //       this.listLoading = false
    //     }, 1.5 * 1000)
    //   })
    // },
    alarmList(){
      this.listLoading = true
      mockAlarm().then(response => {
        this.list = response.alarmList
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
    // handleModifyStatus(row, status) {
    //   deleteGroup(row.Group_id).then(response => {
    //     this.$message({
    //       message: '操作成功',
    //       type: 'success'
    //     })
    //   })
    //   row.status = status
    //   const index = this.list.indexOf(row)
    //   this.list.splice(index, 1)
    // },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // createData() {
    //   const vm = this;
    //   vm.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       // vm.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
    //       // vm.temp.admin_name = vm.temp.title
    //       createGroup(vm.temp).then((response) => {
    //         var msg = response.msg
    //         if(response.code === 200){
    //           console.log(vm.list)
    //           vm.list.unshift(vm.temp)
    //           vm.dialogFormVisible = false
    //           vm.$notify({
    //             title: '成功',
    //             message: '创建成功',
    //             type: 'success',    
    //             duration: 2000
    //           })
    //         }else{
    //           vm.dialogFormVisible = false
    //           vm.$notify({
    //             title: '失败',
    //             message: msg,
    //             type: 'fail',    
    //             duration: 2000
    //           })
    //         }
    //       })
    //     }
    //   })
    // },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // updateData() {
    //   const vm = this;
    //   vm.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       const tempData = Object.assign({}, vm.temp)
    //       // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
    //       updateGroup(tempData).then(() => {
    //         for (const v of vm.list) {
    //           if (v.Group_id === vm.temp.Group_id) {
    //             const index = vm.list.indexOf(v)
    //             vm.list.splice(index, 1, vm.temp)
    //             break
    //           }
    //         }
    //         vm.dialogFormVisible = false
    //         vm.$notify({
    //           title: '成功',
    //           message: '更新成功',
    //           type: 'success',
    //           duration: 2000
    //         })
    //       })
    //     }
    //   })
    // },
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
    // handleFetchPv(pv) {
    //   fetchPv(pv).then(response => {
    //     this.pvData = response.data.pvData
    //     this.dialogPvVisible = true
    //   })
    // },
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
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}
</script>
