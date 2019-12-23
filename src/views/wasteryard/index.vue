<template>
  <div class="app-container">

  <el-form :inline="true"  class="demo-form-inline">

  <el-form-item label="">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="倾废区编号" v-model="listQuery.code">
      </el-input>
    </el-form-item>

    <el-form-item label="">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" :placeholder="$t('wasteryard.title')" v-model="listQuery.name">
      </el-input>
    </el-form-item>

    <el-form-item label="">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="区域" v-model="listQuery.district">
      </el-input>
    </el-form-item>

    <el-form-item label="">
      <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="任务单位" v-model="listQuery.dep">
      </el-input>
    </el-form-item>

    <el-form-item label="">
      <el-select  @change='handleFilter' placeholder="类型" v-model="listQuery.type">
        <el-option v-for="item in  areaTypeOptions" :key="item.label" :label="item.value" :value="item.value">
          </el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="">
      <el-select  @change='handleFilter' placeholder="状态" v-model="listQuery.state">
        <el-option v-for="item in  areaStateOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
    </el-form-item>
    </el-form>



<el-table
    :key='tableKey' :data="list" v-loading="listLoading" stripe
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">

          <el-form-item label="编号">
            <span>{{ props.row.AreaCode }}</span>
          </el-form-item>
          <el-form-item label="名称">
            <span>{{ props.row.AreaName }}</span>
          </el-form-item>
          <el-form-item label="圆心">
            <span>{{ props.row.CycleLocs }}</span>
          </el-form-item>
          <el-form-item label="区域">
            <span>{{ props.row.AreaDistrict }}</span>
          </el-form-item>

          <el-form-item label="面积">
            <span>{{ props.row.Area }}</span>
          </el-form-item>

          <el-form-item label="总量">
            <span>{{ props.row.TotalAmount }}</span>
          </el-form-item>

          <el-form-item label="剩余量">
            <span>{{ props.row.RemainAmout }}</span>
          </el-form-item>

          <el-form-item label="日倾废量">
            <span>{{ props.row.DailyAmount }}</span>
          </el-form-item>

          <el-form-item label="年倾废量">
            <span>{{ props.row.AnnualAmount }}</span>
          </el-form-item>

          <el-form-item label="状态">
            <span>{{ props.row.AreaInUseDesc }}</span>
          </el-form-item>

          <el-form-item label="审核部门">
            <span>{{ props.row.ApprovalDep }}</span>
          </el-form-item>

          <el-form-item label="审核时间">
            <span>{{ props.row.ApprovalTime }}</span>
          </el-form-item>

          <el-form-item label="批准字号">
            <span>{{ props.row.ApprovalNum }}</span>
          </el-form-item>

          <el-form-item label="废物类型">
            <span>{{ props.row.WasteType }}</span>
          </el-form-item>

          <el-form-item label="区域类型">
            <span>{{ props.row.AreaType }}</span>
          </el-form-item>

          <el-form-item label="开放时间">
            <span>{{ props.row.ActiveTime }}</span>
          </el-form-item>

          <el-form-item label="关闭时间">
            <span>{{ props.row.CloseTime }}</span>
          </el-form-item>

          <el-form-item label="延迟时间">
            <span>{{ props.row.AreaExten }}</span>
          </el-form-item>

          <el-form-item label="新增时间">
            <span>{{ props.row.AddTime }}</span>
          </el-form-item>

        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      >
    </el-table-column>
    <el-table-column
      label="编码"
      prop="AreaCode">
    </el-table-column>
    <el-table-column  min-width="250"
      label="名称"
      prop="AreaName">
    </el-table-column>

    <el-table-column
      label="区域"
      prop="AreaDistrict">
    </el-table-column>

    <el-table-column
      label="年倾废量"
      prop="AnnualAmount">
    </el-table-column>

    <el-table-column
      label="总量"
      prop="TotalAmount">
    </el-table-column>

    <el-table-column
      label="剩余量"
      prop="RemainAmout">
    </el-table-column>


    <el-table-column
      label="状态"
      prop="AreaInUseDesc">
    </el-table-column>

    <el-table-column
      label="倾废物类型"
      prop="WasteType">
    </el-table-column>

    <el-table-column
      label="区域类型"
      prop="AreaType">
    </el-table-column>

    <el-table-column label="操作"   min-width="150px">
    <template slot-scope="scope">
    <el-button-group>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('user.edit')}}</el-button>
          <el-button type="success" size="mini" @click="handleDetail(scope.row)">{{$t('user.details')}}</el-button>
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

    <el-dialog v-if="dialogStatus!=='detail'" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="40%">
      <div style="height: 400px; overflow-y: scroll;">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 300px; margin-left:30px;'>
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
          </el-form-item>
          <el-form-item :label="$t('user.title')" prop="title">
            <el-input v-model="temp.title"></el-input>
          </el-form-item> -->
          <el-form-item :label="$t('wasteryard.title')" label-width="200px" prop="AreaName">
            <el-input v-model="temp.AreaName" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.AreaCode')" label-width="200px"  prop="AreaCode">
            <el-input v-model="temp.AreaCode" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.mulitpoint')" label-width="200px" prop="">
            <el-input v-model="temp.PloygonLocs" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.circleCenter')" label-width="200px" prop="">
            <el-input v-model="temp.CycleLocs" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.circleRadius')" label-width="200px" prop="">
            <el-input v-model="temp.AreaCenrad" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.twowerCompany')" label-width="200px" prop="">
            <el-input v-model="temp.AreaDistrict" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.areaType')" label-width="200px" prop="">
            <el-input v-model="temp.AreaType" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.wasteType')" label-width="200px" prop="">
            <el-input v-model="temp.WasteType" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.area')" label-width="200px" prop="">
            <el-input v-model="temp.Region" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.areaSquare')" label-width="200px" prop="">
            <el-input v-model="temp.Area" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.amountDumping')" label-width="200px" prop="">
            <el-input v-model="temp.TotalAmount" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.operaType')" label-width="200px" prop="">
            <el-input v-model="temp.OperaType" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.areaDepth')" label-width="200px" prop="">
            <el-input v-model="temp.AreaDepth" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.state')" label-width="200px" prop="">
            <el-input v-model="temp.AreaInUse" style="width: 300px"></el-input>
          </el-form-item>


          <el-form-item :label="$t('wasteryard.RemainAmout')" label-width="200px" prop="RemainAmout">
            <el-input v-model="temp.RemainAmout" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.RemainDays')" label-width="200px" prop="RemainDays">
            <el-input v-model="temp.RemainDays" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.approvalNum')" label-width="200px" prop="">
            <el-input v-model="temp.ApprovalNum" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.approvalDep')" label-width="200px" prop="">
            <el-input v-model="temp.ApprovalDep" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wasteryard.approvalTime')" label-width="200px" prop="">
            <el-input v-model="temp.ApprovalTime" style="width: 300px"></el-input>
          </el-form-item>

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
        <el-tab-pane :label="$t('wasteryard.detail')">
          <div style="height: 300px; overflow-y: scroll;">
            <table class="wasterTable"
              style="width: 100%">
              <tr>
                <td class="tableKey">{{$t('wasteryard.AreaCode')}}</td>
                <td class="tableValue">{{temp.AreaCode}}</td>
                <td class="tableKey">{{$t('form.name')}}</td>
                <td class="tableValue">{{temp.AreaName}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.circleCenter')}}</td>
                <td class="tableValue">{{temp.CycleLocs}}</td>
                <td class="tableKey">{{$t('wasteryard.circleRadius')}}</td>
                <td class="tableValue">{{temp.AreaCenrad}}</td>
                <!-- <td class="tableKey">{{$t('form.lng')}}</td>
                <td class="tableValue">{{temp.AreaLon}}</td> -->
              </tr>
              <tr>
                <td class="tableKey" rowspan="3">{{$t('wasteryard.mulitpoint')}}</td>
                <td class="tableValue" rowspan="3">
                  <div v-if="temp.isCircle===0" v-for="item in PloygonLocs">经度:{{item.split(',')[0].padEnd(11,0)}} 纬度：{{item.split(',')[1].padEnd(10,0)}}</div>
                </td>
                <td class="tableKey">{{$t('wasteryard.twowerCompany')}}</td>
                <td class="tableValue">{{temp.AreaDistrict}}</td>
                <!-- <td class="tableKey">{{$t('form.lat')}}</td>
                <td class="tableValue">{{temp.AreaLat}}</td> -->
                <!-- <td class="tableKey">{{$t('form.centerLng')}}</td>
                <td class="tableValue">{{temp.AreaCenterLon}}</td>
                <td class="tableKey">{{$t('form.centerLat')}}</td>
                <td class="tableValue">{{temp.AreaCenterLat}}</td> -->
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.areaSquare')}}</td>
                <td class="tableValue">{{temp.Area}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.amountDumping')}}</td>
                <td class="tableValue">{{temp.TotalAmount}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('form.state')}}</td>
                <td class="tableValue" :class="{ active: isActive }">{{transformState(temp.AreaInUse)}}</td>
                <td class="tableKey">{{$t('wasteryard.wasteType')}}</td>
                <td class="tableValue">{{temp.WasteType}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.RemainDays')}}</td>
                <td class="tableValue">{{temp.RemainDays}}</td>
                <td class="tableKey">{{$t('wasteryard.area')}}</td>
                <td class="tableValue">{{temp.Region}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.RemainAmout')}}</td>
                <td class="tableValue">{{temp.RemainAmout}}</td>
                <td class="tableKey">{{$t('form.updateTime')}}</td>
          <td class="tableValue">{{temp.AddTime|parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.areaType')}}</td>
                <td class="tableValue">{{temp.AreaType}}</td>
                <td class="tableKey">{{$t('wasteryard.operaType')}}</td>
                <td class="tableValue">{{temp.OperaType}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('form.dailyAmount')}}</td>
                <td class="tableValue">{{temp.DailyAmount}}</td>
                <td class="tableKey">{{$t('wasteryard.areaDepth')}}</td>
                <td class="tableValue">{{temp.AreaDepth}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.approvalNum')}}</td>
                <td class="tableValue">{{temp.ApprovalNum}}</td>
                <td class="tableKey">{{$t('wasteryard.approvalDep')}}</td>
                <td class="tableValue">{{temp.ApprovalDep}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.approvalTime')}}</td>
                <td class="tableValue">{{temp.ApprovalTime}}</td>
                <td class="tableKey">{{$t('wasteryard.accessory')}}</td>
                <td class="tableValue">{{temp.Accessory}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.postpone')}}</td>
                <td class="tableValue">{{temp.Postpone}}</td>
                <td class="tableKey">{{$t('wasteryard.postponeInfo')}}</td>
                <td class="tableValue">{{temp.PostponeInfo}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.PositionChange')}}</td>
                <td class="tableValue">{{temp.PositionChange}}</td>
                <td class="tableKey">{{$t('wasteryard.UnUsed')}}</td>
                <td class="tableValue">{{temp.UnUsed}}</td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="配置管理">视频播放</el-tab-pane>
        <el-tab-pane label="角色管理">历史轨迹</el-tab-pane> -->
      </el-tabs>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>

    <!-- <el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"> </el-table-column>
        <el-table-column prop="pv" label="Pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>

<script>
import { fetchList, deleteArea, createArticle, updateArticle } from '@/api/article'
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
  name: 'wasteryard',
  directives: {
    waves
  },
  data() {
    return {
      isActive: false,
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        name: '',
        code: '',
        district: '',
        dep: '',
        type: '',
        state: '',
        pagesize: 20,
        curpage: 1
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: '升序', key: '+id' }, { label: '降序', key: '-id' }],
      areaTypeOptions: [{ label: '临时倾倒区', value: '临时倾倒区' }, { label: '永久倾倒区', value: '永久倾倒区' }],
      areaStateOptions: [{ label: '所有', value: '0' }, { label: '在用', value: '1' }, { label: '暂停', value: '2' }, { label: '停用', value: '3' }, { label: '封闭', value: '4' }, { label: '闲置', value: '5' }, { label: '位移', value: '6' }, { label: '延期', value: '7' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        // timestamp: new Date(),
        title: '',
        type: '',
        status: 'published',
        password: '',       
        AreaCode: '',
        AreaName: '',
        PloygonLocs: [],
        CycleLocs: '',
        AreaCenrad: '',
        AreaLon: '',
        AreaLat: '',
        AreaCenterLon: '',
        AreaCenterLat: '',
        AreaDistrict: '',
        Area: '',
        TotalAmount: '',
        AreaInUse: '',
        WasteType: '',
        RemainAmout: '',
        RemainDays: '',
        Region: '',
        AddTime: '',
        isCircle: '',
        AreaType: '',
        OperaType: '',
        DailyAmount: '',
        AreaDepth: '',
        ApprovalNum: '',
        ApprovalDep: '',
        ApprovalTime: '',
        Accessory: '',
        Postpone: '',
        PostponeInfo: '',
        PositionChange: '',
        UnUsed: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: lang.t('wasteryard.editWaster'),
        create: lang.t('wasteryard.create'),
        detail: lang.t('wasteryard.detail')
      },
      // dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }],
        password: [{ required: true, message: 'password is required', trigger: 'blur' }],
        area: [{ required: true, message: 'area is required', trigger: 'blur' }],
        AreaName: [{ required: true, message: 'AreaName is required', trigger: 'blur' }],
        AreaCode: [{ required: true, message: 'AreaCode is required', trigger: 'blur' }]

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
      fetchList(this.listQuery).then(response => {
        this.list = response.datas.area_list
        this.total = parseInt(response.datas.total_count)
        this.listLoading = false
      })
    },
    hasPermission(actionId){
      const group = this.$store.getters.admingroupid
      console.log(group)
      if(group == 1) return true;
      return false;
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

      if (this.setPermission()){

        this.$confirm('此操作将永久删除该倾废区, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteArea(row.Area_id)
          this.$message({
            message: '操作成功',
            type: 'success'
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

      }else{
        this.$notify({
          title: '失败',
          message: '您没有操作权限',
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
        // timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
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
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = '海洋倾废区管理系统'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDetail(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
      this.PloygonLocs = row.PloygonLocs.substr(0, row.PloygonLocs.length - 1).split('|')
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
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

      if (this.setPermission()){
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
          message: '您没有操作权限',
          type: 'fail',
          duration: 2000
        })
      } 
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
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
    // handleFetchPv(pv) {
    //   fetchPv(pv).then(response => {
    //     this.pvData = response.data.pvData
    //     this.dialogPvVisible = true
    //   })
    // },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['倾废区代码', '倾废区名称', '剩余倾倒量', '剩余有效期']
        const filterVal = ['AreaCode', 'AreaName', 'RemainAmout', 'RemainDays']
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
    transformState(value){
      var str 
      if(parseInt(value) === 1){
        str = '在用'
        this.isActive = true
      }else{
        str = '禁用'
        this.isActive = false
      }
      return str
    },
    setPermission(){
      if(this.$store.getters.roles.indexOf('editor') >= 0){
        return true
      }else if(this.$store.getters.roles.indexOf('admin') >= 0){
        return true
      }else{
        return false
      }
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


