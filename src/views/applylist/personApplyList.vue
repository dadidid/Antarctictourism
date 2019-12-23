<template>
<div class="app-container">
  <div class="filter-container">
  <el-form :inline="true"  class="demo-form-inline">

  <el-form-item label="">
      <el-input  @keyup.enter.native="handleFilter"  placeholder="单位名称"  v-model="listQuery.companyname"></el-input>
    </el-form-item>


    <el-form-item label="">
      <el-input  @keyup.enter.native="handleFilter"  placeholder="申请人"  v-model="listQuery.applyername"></el-input>
    </el-form-item>

      <el-form-item label="">
          <el-date-picker v-model="listQuery.timespan" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        

    <el-form-item label="">
      <el-select  @change='handleFilter' placeholder="申请状态" v-model="listQuery.state">
        <el-option v-for="item in  stateOptions" :key="'state'+item.value" :label="item.label" :value="item.value">
          </el-option>
      </el-select>
    </el-form-item>

  <el-form-item>
    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item"  @click="addBeian" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
  </el-form-item>
</el-form>
</div>

<el-table
    :key='tableKey' :data="companyApplyList" v-loading="listLoading" stripe
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand"  label-width="120px">
          <el-row>
                <el-col :span="12">
                <template>
                    <el-table
                      :data="props.row.personlist"
                      style="width: 100%">
                      <el-table-column
                        prop="name"
                        label="姓名"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="gender"
                        label="性别"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="job"
                        label="职务"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="idno"
                        label="身份证">
                      </el-table-column>
                      <el-table-column
                        prop="tel"
                        label="电话">
                      </el-table-column>
                    </el-table>
                  </template>
                </el-col>
                <el-col :span="12">
                <el-form-item label="" style="width:100%">
                      <el-row> 
                      <div class="text item">
                          {{ props.row.addtime }}：{{ props.row.agentname }} 提交申请；
                      </div>
                      <div v-if="props.row.acceptstate>0" class="text item">
                          {{ props.row.accepttime }}：{{ props.row.acceptname }} {{ props.row.acceptopinion }}
                      </div>
                      <div v-if="props.row.auditstate>0" class="text item">
                          {{ props.row.audittime }}：{{ props.row.auditname }} {{ props.row.auditopinion }}
                      </div>
                      <div v-if="props.row.approvalstate>0" class="text item">
                          {{ props.row.approvaltime }}：{{ props.row.approvalname }} {{ props.row.approvalopinion }}
                      </div>

                      </el-row>
                  </el-form-item>
                </el-col>
          </el-row>


        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      >
    </el-table-column>
    <el-table-column
      label="公司"
      prop="companyname">
    </el-table-column>

    <el-table-column
      label="备案人数"
      prop="personnumber">
    </el-table-column>

    <el-table-column
      label="代办人姓名"
      prop="agentname">
    </el-table-column>

    <el-table-column
      label="代办人电话"
      prop="agenttel">
    </el-table-column>


    <el-table-column
      label="申请时间"
      prop="addtime">
    </el-table-column>


    <el-table-column
      label="状态"
      prop="stateDesc">
    </el-table-column>



<el-table-column label="操作"   min-width="150px">
    <template slot-scope="scope">
    <el-button-group>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">查看详情</el-button>
          <el-button :disabled="scope.row.state==4"  size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
          </el-button>
    </el-button-group>
        </template>
</el-table-column>

  </el-table>

   <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.curpage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


  </div>
</template>

<script>
import { getMyBeianCompanyApplyList, delBeianCompany, fetchPv, createBoat, deleteBoat, updateBoat, fetchAllCompanyList } from '@/api/article'

import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import lang from '@/lang'
const calendarTypeOptions = [
  { key: '开体驳', display_name: '开体驳' },
  { key: '开底驳', display_name: '开底驳' },
  { key: '耙吸式', display_name: '耙吸式' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ship',
  directives: {
    waves
  },
  data() {
    return {
    stateOptions: [
      { label: '全部', value: '0' },
      { label: '待受理', value: '1' },
      { label: '待审核', value: '3' },
      { label: '待审批', value: '4' },
      { label: '已审批', value: '5' },
      { label: '已取消', value: '10' },
      { label: '已拒绝', value: '2' }],

      listQuery: {
        curpage: 1,
        pagesize: 20,
        companyname: '',
        applername: '',
        state: ''
      },
      tableKey: 'companyapplylist',
      companyApplyList: [],
      listLoading: true,
      total: 0
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
      getMyBeianCompanyApplyList(this.listQuery).then(response => {
        console.log(response)
        this.companyApplyList = response.datas.info || []
        this.total = parseInt(response.datas.number)
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

    console.log(row)


    this.$confirm('此操作将永久删除单位备案信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delBeianCompany({id: row.id}).then(response => {
            if(response.code==200){
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.getList()
            }
          })
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
        type: ''
      }
    },
    hasPermission(actionId){
      const group = this.$store.getters.admingroupid
      if(group == 1) return true;
      return false;
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
          createBoat(vm.temp).then(() => {
            console.log(vm.list)
            vm.list.unshift(vm.temp)
            vm.dialogFormVisible = false
            vm.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    handleUpdate(row) {
      console.log(row)
      this.$router.push({path: '/applylist/personApplyEdit',
        query: {applyid:row.id}})
    },


    addBeian(row) {
      this.$router.push({path: '/apply/personApply'})
    },

    handleDetail(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateBoat(tempData).then(() => {
            for (const v of this.list) {
              if (v.ship_id === this.temp.ship_id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }

            this.getList()

            this.dialogFormVisible = false
            this.$notify({
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
        const tHeader = ['name', 'type', 'company', 'companyUser', 'companyTel', 'captainName', 'captainTel']
        const filterVal = ['ShipName', 'ShipType', 'ShipCompany', 'ShipCompanyContacter', 'ShipCompanyPhone', 'ShipCaptain', 'ShipTel']
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
    /* handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    }, */
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

table{
  width:100%;
  border-collapse:collapse;
}
table,th, td {
  border: 1px solid #ccc;
}
table .tableKey{
  width:17%;
  background-color:#f5f7fa;
}
table .tableValue{
  width:17%;
  color:#222;
  background-color:#e5f3ff;
}
</style>


<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }

  .table_1_column_12 .cell{
  min-width:120px !important;
  }


  .imagelist{
  width: 200px;
  height: 150px;
  margin-right: 10px;
}
</style>