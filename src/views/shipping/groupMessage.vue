<template>
  <div class="app-container">
    <div class="filter-container">
    <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="">
      <el-input @keyup.enter.native="handleFilter" :placeholder="$t('shipping.GroupName')" v-model="listQuery.name">
      </el-input>
    </el-form-item>

    <el-form-item label="">
      <el-select @change='handleFilter' v-model="listQuery.state">
        <el-option v-for="item in stateOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
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
      prop="GroupName"
      label="分组名称"
      >
    </el-table-column>


    <el-table-column
      prop="stateDesc"
      label="状态"
      >
    </el-table-column>


    <el-table-column
      prop="GroupNote"
      label="备注"
      >
    </el-table-column>


    <el-table-column
      prop="AddTime"
      label="添加时间">
    </el-table-column>

    <el-table-column
      prop="UpdateTime"
      label="更新时间">
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
        <!-- <el-form-item :label="$t('user.type')" prop="type">
          <el-select class="filter-item" v-model="temp.type" placeholder="Please select">
            <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('user.area')" prop="area">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item :label="$t('shipping.GroupCode')" prop="GroupCode">
          <el-input v-model="temp.GroupCode"></el-input>
        </el-form-item>
         <el-form-item :label="$t('shipping.GroupName')" prop="GroupName">
          <el-input v-model="temp.GroupName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('shipping.GroupNote')" prop="GroupNote">
          <el-input v-model="temp.GroupNote"></el-input>
        </el-form-item>
        
        <!-- <el-form-item :label="$t('table.date')" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item> -->
        
        <!-- <el-form-item :label="$t('table.status')">
          <el-select class="filter-item" v-model="temp.status" placeholder="Please select">
            <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item :label="$t('table.importance')">
          <el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max='3'></el-rate>
        </el-form-item> -->
        <!-- <el-form-item :label="$t('table.remark')">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.remark">
          </el-input>
        </el-form-item> -->
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
import { fetchGroupList, fetchPv, createGroup, deleteGroup, updateGroup } from '@/api/article'
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
  name: 'group',
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
        name: '',
        state: ''
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      stateOptions: [{ label: '全部', key: '' }, { label: '正常', key: '0' }, { label: '冻结', key: '1' }, { label: '已删除', key: '2' }],
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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchGroupList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.datas.group_list
        this.total = parseInt(response.datas.total_count)
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
    hasPermission(actionId){
      const group = this.$store.getters.admingroupid
      console.log(group)
      if(group == 1) return true;
      return false;
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

      if(this.hasPermission(row.Group_id)){

        this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteGroup(row.Group_id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })

            row.status = status
            const index = this.list.indexOf(row)
            this.list.splice(index, 1)

          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      }else{
        this.$notify({
          title: '失败',
          message: '你没有操作权限',
          type: 'fail',    
          duration: 2000
        })
      }
    },
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
      if(!this.hasPermission('addGroup')){
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
          createGroup(vm.temp).then((response) => {
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

      if(this.hasPermission(row.Group_id)){
        this.temp = Object.assign({}, row) // copy obj
        // this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      }else{
        this.$notify({
          title: '失败',
          message: '你没有操作权限',
          type: 'fail',    
          duration: 2000
        })
      }
    },
    updateData() {
      const vm = this;
      vm.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, vm.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateGroup(tempData).then(() => {
            for (const v of vm.list) {
              if (v.Group_id === vm.temp.Group_id) {
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
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

.filter-container {
    padding-top: 20px;
}

.app-container {
    height: 100%;
    padding: 20px;
}
</style>