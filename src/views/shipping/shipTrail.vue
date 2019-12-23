<template>
  <div class="app-container">
    <div class="filter-container">
    <el-form :inline="true"  class="demo-form-inline">

    <el-form-item label="">
      <el-input  @keyup.enter.native="handleFilter"  placeholder="船只名称"  v-model="listQuery.shipname"></el-input>
    </el-form-item>

    <el-form-item label="">
      <el-input  @keyup.enter.native="handleFilter"  placeholder="设备ID"  v-model="listQuery.equipid"></el-input>
    </el-form-item>

    <el-form-item label="">
      
      <el-date-picker
      v-model="listQuery.timerange"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>

    </el-form-item>

  <el-form-item>
    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
  </el-form-item>
</el-form>
    </div>


<el-table
    :key='tableKey' :data="list" v-loading="listLoading" stripe
    style="width: 100%">
    <el-table-column
      type="index"
      >
    </el-table-column>

    <el-table-column
      label="船只名称"
      prop="ShipName">
    </el-table-column>

    <el-table-column
      label="设备ID"
      prop="EquipId">
    </el-table-column>

    <el-table-column
      label="GPS经度"
      prop="longitude">
    </el-table-column>

    <el-table-column
      label="GPS纬度"
      prop="latitude">
    </el-table-column>

    <el-table-column
      label="百度地图经度"
      prop="Baidu_longitude">
    </el-table-column>

    <el-table-column
      label="百度地图纬度"
      prop="Baidu_latitude">
    </el-table-column>

    <el-table-column
      label="轨迹时间"
      prop="TrailTime">
    </el-table-column>

    <el-table-column
      label="轨迹入库时间"
      prop="add_time">
    </el-table-column>
  </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.curpage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" v-if="dialogStatus!=='detail'" width="60%">
      <div style="height: 500px; overflow-y: scroll;">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
          <el-form-item :label="$t('boat.code')" prop="ShipId">
            <el-input v-model="temp.ShipId"></el-input>
          </el-form-item>
          <el-form-item :label="$t('boat.name')" prop="ShipName">
            <el-input v-model="temp.ShipName"></el-input>
            <!-- <label v-else>{{temp.ShipName}}</label> -->
          </el-form-item>
          <el-form-item :label="$t('boat.type')" prop="ShipType">
            <el-select class="filter-item" v-model="temp.ShipType" placeholder="请选择船只类型">
              <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
              </el-option>
            </el-select>
            <!-- <label v-else>{{temp.ShipType}}</label> -->
          </el-form-item>
          <el-form-item :label="$t('boat.captainName')" prop="ShipCaptain">
            <el-input v-model="temp.ShipCaptain"></el-input>
            <!-- <label v-else>{{temp.ShipCaptain}}</label> -->
          </el-form-item>
          <el-form-item :label="$t('boat.captainTel')" prop="ShipTel">
            <el-input v-model="temp.ShipTel"></el-input>
            <!-- <label v-else>{{temp.ShipTel}}</label> -->
          </el-form-item>
          <el-form-item :label="$t('boat.company')" prop="ShipCompany">


            <el-select class="filter-item" filterable v-model="temp.ShipCompany" placeholder="请选择所属单位">
              <el-option v-for="item in  calendarCityOptions" :key="item.key" :label="item.display_name" :value="item.key">
              </el-option>
            </el-select>

            <!-- <label v-else>{{temp.ShipCompany}}</label> -->
          </el-form-item>
          <el-form-item :label="$t('boat.group')" prop="ShipGroup">
            <el-select class="filter-item" v-model="temp.GroupId" placeholder="请选择船只分组">
              <el-option v-for="item in  cities" :key="item.id" :label="item.value" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('form.size')">
            <el-input v-model="temp.Size"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.length')">
            <el-input v-model="temp.ShipLength"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.width')">
            <el-input v-model="temp.ShipWidth"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.state')">
            <el-input v-model="temp.State"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.installUnit')">
            <el-input v-model="temp.State"></el-input>
          </el-form-item>
          <el-form-item :label="$t('boat.companyUser')" prop="ShipCompanyContacter">
            <el-input v-model="temp.ShipCompanyContacter"></el-input>
            <!-- <label v-else>{{temp.ShipCompanyContacter}}</label> -->
          </el-form-item>
          <el-form-item :label="$t('boat.companyTel')" prop="ShipCompanyPhone">
            <el-input v-model="temp.ShipCompanyPhone"></el-input>
            <!-- <label v-else>{{temp.ShipCompanyPhone}}</label> -->
          </el-form-item>
          <!-- <el-form-item :label="$t('boat.addTime')" prop="addTime">
            <el-input v-model="temp.addTime"></el-input>
          </el-form-item> -->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      v-if="dialogStatus=='detail'"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      top= "12%">
      <el-tabs v-if="dialogFormVisible" type="border-card">
        <el-tab-pane :label="$t('form.shipDetail')">
          <table class="shipTable"
            style="width: 100%">
            <tr>
              <td class="tableKey">{{$t('form.id')}}</td>
              <td class="tableValue">{{temp.ship_id}}</td>
              <td class="tableKey">{{$t('form.name')}}</td>
              <td class="tableValue">{{temp.ShipName}}</td>
              <td class="tableKey">{{$t('form.type')}}</td>
              <td class="tableValue">{{temp.ShipType}}</td>
            </tr>
            <tr>
              <td class="tableKey">{{$t('form.company')}}</td>
              <td class="tableValue">{{temp.ShipCompany}}</td>
              <td class="tableKey">{{$t('form.contacter')}}</td>
              <td class="tableValue">{{temp.ShipCompanyContacter}}</td>
              <td class="tableKey">{{$t('form.phone')}}</td>
              <td class="tableValue">{{temp.ShipCompanyPhone}}</td>
            </tr>
            <tr>
              <td class="tableKey">{{$t('form.size')}}</td>
              <td class="tableValue">{{temp.Size}}</td>
              <td class="tableKey">{{$t('form.length')}}</td>
              <td class="tableValue">{{temp.ShipLength}}</td>
              <td class="tableKey">{{$t('form.width')}}</td>
              <td class="tableValue">{{temp.ShipWidth}}</td>
            </tr>
            <tr>
              <td class="tableKey">{{$t('form.emptyDraft')}}</td>
              <td class="tableValue">{{temp.EmptyDraft}}</td>
              <td class="tableKey">{{$t('form.fullDraft')}}</td>
              <td class="tableValue">{{temp.FullDraft}}</td>
              <td class="tableKey">{{$t('form.state')}}</td>
              <td class="tableValue">{{temp.State}}</td>
            </tr>
            <tr>
              <td class="tableKey">{{$t('form.addTime')}}</td>
              <td class="tableValue">400</td>
              <td class="tableKey">{{$t('form.installUnit')}}</td>
              <td class="tableValue">作业单位</td>
              <td class="tableKey">{{$t('form.shipCaptain')}}</td>
              <td class="tableValue">{{temp.ShipCaptain}}</td>
            </tr>
            <tr>
              <td class="tableKey">{{$t('form.shipTel')}}</td>
              <td class="tableValue">{{temp.ShipTel}}</td>
              <td class="tableKey">{{$t('form.updateTime')}}</td>
              <td class="tableValue">{{temp.UpdateTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
              <td class="tableKey">船只分组</td>
              <td class="tableValue">{{temp.GroupName}}</td>
            </tr>
          </table>
        </el-tab-pane>
        <!-- <el-tab-pane label="配置管理">视频播放</el-tab-pane>
        <el-tab-pane label="角色管理">历史轨迹</el-tab-pane> -->
      </el-tabs>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
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
import { fetchBoatTrailList, fetchGroupList, fetchPv, createBoat, deleteBoat, updateBoat, fetchAllCompanyList } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import lang from '@/lang'
const calendarTypeOptions = [
  { key: '小船', display_name: lang.t('boat.xiaochuan') },
  { key: '船舶', display_name: lang.t('boat.chuanbo') },
  { key: '游艇', display_name: lang.t('boat.youting') }
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
      tableKey: 0,
      list: [],
      total: 0,
      groupList: [],
      listLoading: true,
      listQuery: {
        curpage: 1,
        pagesize: 20,
        groupid: '',
        shipname: '',
        captain: '',
        equipid: '',
        companyname: ''
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions: [
  { key: '小船', display_name: lang.t('boat.xiaochuan') },
  { key: '船舶', display_name: lang.t('boat.chuanbo') },
  { key: '游艇', display_name: lang.t('boat.youting') }
],
      calendarCityOptions: [],
      shipGroupOptions: [],
      sortOptions: [{ label: '升序', key: '+id' }, { label: '降序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        username: '',
        id: '',
        ShipId: '',
        importance: 1,
        remark: '',
        ShipName: '',
        ShipCompanyContacter: '',
        ShipCompanyPhone: '',
        ShipCaptain: '',
        ShipTel: '',
        addTime: '',
        ShipType: '',
        ShipCompany: '',
        status: 'published',
        ship_id: '',
        GroupId: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改船只信息',
        create: '新增船只信息',
        detail: '船只信息详情'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        ShipId: [{ required: true, message: '请输入船只ID', trigger: 'change' }], 
        ShipName: [{ required: true, message: '请输入船只名称', trigger: 'change' }],
        ShipType: [{ required: true, message: '请输入船只类型', trigger: 'change' }],
        ShipCompany: [{ required: true, message: '请输入船只所属单位', trigger: 'change' }],
        GroupId: [{ required: true, message: '请选择船只分组', trigger: 'change' }],
        ShipCaptain: [{ required: true, message: '请输入船长名称', trigger: 'blur' }],
        ShipTel: [{ required: true, message: '请输入船长电话号码', trigger: 'blur' }]
        // area: [{ required: true, message: 'area is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      checkAll: false,
      checkedCities: ['上海', '北京'],
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
    this.getCompanyList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchBoatTrailList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.datas.trailList || []
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
        var group = [{ id: '0', value: '所有分组' }];
        this.groupList.forEach(function(item, index, array){
          arr[index] = {}
          arr[index].id = item.Group_id
          arr[index].value = item.GroupName

          group.push({ id: item.Group_id, value: item.GroupName })
        })
        this.shipGroupOptions = group
        this.cities = arr
        this.listLoading = false
      })
    },
    getCompanyList() {
      this.listLoading = true
      fetchAllCompanyList(this.listQuery).then(response => {
        console.log(response)
        var group = [];
        response.datas.company_list.forEach(function(item, index, array){
          group.push({ key: item.company, display_name: item.company })
        })
        this.calendarCityOptions = group
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


    this.$confirm('此操作将永久删除该船只, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteBoat(row.ship_id).then(response => {
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
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
</style>