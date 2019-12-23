<template>
  <div class="app-container">
    <img :src="banner" style="width: 100%">
    <baidu-map class="map" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" @moving="syncCenterAndZoom" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom" ControlAnchor='BMAP_ANCHOR_TOP_RIGHT' name="newMap" :mapStyle="mapStyle" :auto-resize="true">

    <bm-control>
    <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="">
    <el-cascader
    :options="groupOptions"
    change-on-select
    v-model="listQuery.goupselection"
    @change="handleQueryChange">
  </el-cascader>

</el-form-item>
  <el-form-item label="">
      <el-input  @keyup.enter.native="handleQueryChange"  placeholder="船只名称"  v-model="listQuery.shipname"></el-input>
</el-form-item>
</el-form>
    </bm-control>


      <bm-polygon v-if="zoom>9" v-for="item in polygonPaths" :key="item.Area_id" :path="item.PloygonLocs_points" stroke-color="green" :stroke-opacity="0.5" :stroke-weight="2" fill-color="green" :editing="false" @click="openWasterInfo(item)" @lineupdate="updatePolygonPath"/>

      <bm-marker v-if="zoom<=9" v-for="item in polygonPaths" :key="item.AreaCode" :position="item.PloygonLocs_points[0]" :dragging="false" :icon="{url: './src/icons/ball.svg', size: {width: 20, height: 20}}" @click="openWasterInfo(item)"></bm-marker>
      <bm-circle v-if="zoom>9" v-for="item in circleArea" :key="item.Area_id" :center="item.AreaCenter" :radius="item.AreaCenrad * 1000" stroke-color="green" fill-color="green" :stroke-opacity="0.5" :stroke-weight="2" @click="openWasterInfo(item)"></bm-circle>
      <bm-marker v-if="zoom<=9" v-for="item in circleArea" :key="item.Area_id" :position="item.AreaCenter" :dragging="false" :icon="{url: './src/icons/ball.svg', size: {width: 20, height: 20}}" @click="openWasterInfo(item)"></bm-marker>

      <bm-marker v-for="item in shipList" :key="'el'+item.key" :position="item.trail.position" :dragging="false" @rightclick="openInfo(item)" @click="showlatesttrail(item)" :icon="iconBoat">
        <bm-label :content="item.ShipName" :labelStyle="labelBoat" :offset="{width: 0, height: 30}"/>
      </bm-marker>


      <bml-curve-line  v-if="showShipLatestTrail" key="map_curlve" :points="boatLatestTrail" strokeColor="red" content="boatName" :editing="false" :stroke-weight="2"  ></bml-curve-line>


      <bml-lushu v-if="showShipLatestTrail"
        key="map"
        @stop="reset"
        :path="boatLatestTrail"
        :icon="icon"
        :speed="trail_speed"
        :play="play"
        :content="boatName"
        :rotation="true">
      </bml-lushu>


      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <bm-navigation :showZoomInfo="true" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-map-type>
      <bm-copyright
      anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
      :copyright="[{id: 1, content: '版权', bounds: {ne: {lng: 110, lat: 40}, sw:{lng: 0, lat: 0}}}, {id: 2, content: '<a>版权归华雷船舶有限责任公司所有</a>'}]">
      </bm-copyright>


    </baidu-map>
    <el-dialog
      :title="$t('form.title')"
      :visible.sync="dialogVisible"
      top= "8%"
      width= "60%" 
      :before-close="handleClose">
      <el-tabs v-if="dialogVisible" type="border-card">
        <el-tab-pane :label="$t('form.shipDetail')">
          <table class="shipTable"
            style="width: 100%">
            <tr>
              <td class="tableKey ship">{{$t('form.id')}}</td>
              <td class="tableValue ship">{{selectedShip.ship_id}}</td>
              <td class="tableKey ship">{{$t('form.name')}}</td>
              <td class="tableValue ship">{{selectedShip.ShipName}}</td>
              <td class="tableKey ship">{{$t('form.state')}}</td>
              <td class="tableValue ship">{{selectedShip.State}}</td>
            </tr>
            <tr>
              <td class="tableKey ship">{{$t('form.size')}}</td>
              <td class="tableValue ship">{{selectedShip.Size}}</td>
              <td class="tableKey ship">{{$t('form.length')}}</td>
              <td class="tableValue ship">{{selectedShip.ShipLength}}</td>
              <td class="tableKey ship">{{$t('form.width')}}</td>
              <td class="tableValue ship">{{selectedShip.ShipWidth}}</td>
            </tr>
            <tr>
              <td class="tableKey ship">{{$t('form.emptyDraft')}}</td>
              <td class="tableValue ship">{{selectedShip.EmptyDraft}}</td>
              <td class="tableKey ship">{{$t('form.fullDraft')}}</td>
              <td class="tableValue ship">{{selectedShip.FullDraft}}</td>
              <td class="tableKey ship">入网时间</td>
              <td class="tableValue ship">12</td>
            </tr>
            <tr>
              <td class="tableKey ship">{{$t('form.addTime')}}</td>
              <td class="tableValue ship">400</td>
              <td class="tableKey ship">{{$t('form.installUnit')}}</td>
              <td class="tableValue ship">作业单位</td>
              <td class="tableKey ship">{{$t('form.shipCaptain')}}</td>
              <td class="tableValue ship">{{selectedShip.ShipCaptain}}</td>
            </tr>
            <tr>
              <td class="tableKey ship">{{$t('form.shipTel')}}</td>
              <td class="tableValue ship">{{selectedShip.ShipTel}}</td>
              <td class="tableKey ship">{{$t('form.company')}}</td>
              <td class="tableValue ship" colspan="3">{{selectedShip.ShipCompany}}</td>
              <!-- <td class="tableKey">船长名称</td>
              <td class="tableValue">江一男</td> -->
            </tr>
             <tr>
              <td class="tableKey ship">{{$t('form.speed')}}</td>
              <td class="tableValue ship">{{selectedShip.trail.Speed}}</td>
              <td class="tableKey ship">{{$t('form.direction')}}</td>
              <td class="tableValue ship">{{selectedShip.trail.Direction}}</td>
              <td class="tableKey ship">{{$t('form.trailDeep')}}</td>
              <td class="tableValue ship">{{selectedShip.trail.Deep}}</td>
            </tr>
           <tr>
              <td class="tableKey ship">{{$t('form.lng')}}</td>
              <td class="tableValue ship">{{selectedShip.trail.position.lng}}</td>
              <td class="tableKey">{{$t('form.lat')}}</td>
              <td class="tableValue ship">{{selectedShip.trail.position.lat}}</td>
              <td class="tableKey ship">{{$t('form.trailShipLock')}}</td>
              <td class="tableValue ship">{{selectedShip.trail.ShipLock}}</td>
            </tr> 
            <tr>
              <td class="tableKey ship">{{$t('form.blackName')}}</td>
              <td class="tableValue ship">HC_01_639</td>
              <td class="tableKey">{{$t('form.blackPhone')}}</td>
              <td class="tableValue ship">111111111</td>
              <td class="tableKey ship">{{$t('form.updateTime')}}</td>
              <td class="tableValue ship">{{selectedShip.UpdateTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane :label="$t('form.videoDisplay')">
          <div style="width: 100%; text-align:center;margin-top: 10px;">
            <el-input style="width: 500px;" class="filter-item" :placeholder="$t('form.info')" v-model="address">
            </el-input>
          </div>
          <div style="width: 100%; text-align:center;margin-top: 10px;">
            <!-- <embed :src='address' allowFullScreen='true' quality='high' width='480' height='400' align='middle' allowScriptAccess='always' @onerror="errorTip" type='application/x-shockwave-flash'></embed> -->
            <video :src="address" width="400" height="300" controls autoplay >
              <!-- <source src="D:/work/myw2/seaMapVue/src/video/1234.mp4" type="video/mp4">
              <source :src='address' type="video/ogg">
              <source :src='address' type="video/webm">
              <object ：data='address' width="480" height="400">
                <embed :src='address' width="480" height="400">
              </object>  -->
              您的浏览器不支持 video 标签。
            </video>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('form.historyTrail')" style="height: 500px;">

      <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="">
        <div class="block">
            <span class="demonstration">起始时间</span>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              placeholder="选择日期时间"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期" 
              value-format="yyyy-MM-dd HH:mm:ss" >
            </el-date-picker>
          </div>
    </el-form-item>
    <el-form-item label="">
    <el-button size="small" type="primary" round @click="queryHistoryTrail" >查询</el-button>
    <el-button size="small" type="primary" round @click="playHistoryTrail">播放</el-button>
    <el-button size="small" type="primary" round @click="stopPlayHistoryTrail">停止</el-button>
    </el-form-item>
    </el-form>

      <baidu-map class="map" :scroll-wheel-zoom="true" :center="center_his" :zoom="zoom_his"  ControlAnchor='BMAP_ANCHOR_TOP_RIGHT' name="newMap" :mapStyle="mapStyle" :auto-resize="true">

      <bm-marker key="history_map_key" :position="position_his" :dragging="false" :icon="{url: './src/icons/boat.svg', size: {width: 60, height: 50}}">
        <bm-label :content="boatName" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: 0, height: 30}"/>
      </bm-marker>


      <bml-curve-line  key="trail_curve" :points="historyTrail" strokeColor="red" :editing="false" :stroke-weight="2"  ></bml-curve-line>


      <bml-lushu
        key="trail"
        @stop="reset_his"
        :path="historyTrail"
        :icon="icon"
        :speed="trail_speed"
        :play="play_his"
        :rotation="true">
      </bml-lushu>


      <bm-navigation :showZoomInfo="true" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

      </baidu-map>
        
      </el-tab-pane>
    </el-tabs>
    </el-dialog>

    <el-dialog
      :title="$t('wasteryard.information')"
      :visible.sync="dialogFormVisible"
      width = "60%"
      top= "12%">
      <el-tabs v-if="dialogFormVisible" type="border-card">
        <el-tab-pane :label="$t('wasteryard.detail')">
          <div style="height: 300px; overflow-y: scroll;">
            <table class="wasterTable"
              style="width: 100%;">
              <tr>
                <td class="tableKey">{{$t('wasteryard.AreaCode')}}</td>
                <td class="tableValue">{{selectedWaster.AreaCode}}</td>
                <td class="tableKey">{{$t('form.name')}}</td>
                <td class="tableValue" colspan="3">{{selectedWaster.AreaName}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.areaType')}}</td>
                <td class="tableValue">{{selectedWaster.AreaType}}</td>
                <td class="tableKey">{{$t('wasteryard.operaType')}}</td>
                <td class="tableValue">{{selectedWaster.OperaType}}</td>
                <td class="tableKey">{{$t('wasteryard.areaDepth')}}</td>
                <td class="tableValue">{{selectedWaster.AreaDepth}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.circleCenter')}}</td>
                <td class="tableValue">{{selectedWaster.CycleLocs}}</td>
                <td class="tableKey">{{$t('wasteryard.circleRadius')}}</td>
                <td class="tableValue">{{selectedWaster.AreaCenrad}}</td>
                <td class="tableKey">{{$t('form.dailyAmount')}}</td>
                <td class="tableValue">{{selectedWaster.DailyAmount}}</td>
              </tr>
              <tr>
                <td class="tableKey" rowspan="3">{{$t('wasteryard.mulitpoint')}}</td>
                <td class="tableValue" rowspan="3" colspan="3">
                  <div v-if="selectedWaster.isCircle===0" v-for="item in PloygonLocs">经度:{{item.split(',')[0].padEnd(11,0)}} 纬度：{{item.split(',')[1].padEnd(10,0)}}</div>
                </td>
                <td class="tableKey">{{$t('wasteryard.twowerCompany')}}</td>
                <td class="tableValue">{{selectedWaster.AreaDistrict}}</td>
                <!-- <td class="tableKey">{{$t('form.lat')}}</td>
                <td class="tableValue">{{selectedWaster.AreaLat}}</td> -->
                <!-- <td class="tableKey">{{$t('form.centerLng')}}</td>
                <td class="tableValue">{{selectedWaster.AreaCenterLon}}</td>
                <td class="tableKey">{{$t('form.centerLat')}}</td>
                <td class="tableValue">{{selectedWaster.AreaCenterLat}}</td> -->
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.areaSquare')}}</td>
                <td class="tableValue">{{selectedWaster.Area}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.amountDumping')}}</td>
                <td class="tableValue">{{selectedWaster.TotalAmount}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('form.state')}}</td>
                <td class="tableValue" :class="{ active: isActive }">{{transformState(selectedWaster.AreaInUse)}}</td>
                <td class="tableKey">{{$t('wasteryard.wasteType')}}</td>
                <td class="tableValue">{{selectedWaster.WasteType}}</td>
                <td class="tableKey">{{$t('wasteryard.approvalNum')}}</td>
                <td class="tableValue">{{selectedWaster.ApprovalNum}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.RemainDays')}}</td>
                <td class="tableValue">{{selectedWaster.RemainDays}}</td>
                <td class="tableKey">{{$t('wasteryard.area')}}</td>
                <td class="tableValue">{{selectedWaster.Region}}</td>
                <td class="tableKey">{{$t('wasteryard.approvalDep')}}</td>
                <td class="tableValue">{{selectedWaster.ApprovalDep}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.RemainAmout')}}</td>
                <td class="tableValue">{{selectedWaster.RemainAmout}}</td>
                <td class="tableKey">{{$t('form.updateTime')}}</td>
                <td class="tableValue">{{selectedWaster.AddTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
                <td class="tableKey">{{$t('wasteryard.approvalTime')}}</td>
                <td class="tableValue">{{selectedWaster.ApprovalTime}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.postpone')}}</td>
                <td class="tableValue">{{selectedWaster.Postpone}}</td>
                <td class="tableKey">{{$t('wasteryard.postponeInfo')}}</td>
                <td class="tableValue">{{selectedWaster.PostponeInfo}}</td>
                <td class="tableKey">{{$t('wasteryard.accessory')}}</td>
                <td class="tableValue">{{selectedWaster.Accessory}}</td>
              </tr>
              <tr>
                <td class="tableKey">{{$t('wasteryard.PositionChange')}}</td>
                <td class="tableValue">{{selectedWaster.PositionChange}}</td>
                <td class="tableKey">{{$t('wasteryard.UnUsed')}}</td>
                <td class="tableValue">{{selectedWaster.UnUsed}}</td>
                <td class="tableKey">{{$t('wasteryard.Note')}}</td>
                <td class="tableValue">{{selectedWaster.Note}}</td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('form.amout')">
          <p>批准倾倒量：0万方，年均倾倒量：900万方，日最大量：11.4万方；</p>
          <p>实际监控倾倒量：0万方，剩余倾倒量：0万方。</p>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

  </div>
</template>

<script>

import { BmlLushu, BmlCurveLine } from 'vue-baidu-map'
import banner from '@/assets/images/banner.png'

import { fetchGroupListForMap, getShipsLocation, getShipPath, getAreaLocation, getShipHistoryTrail } from '@/api/article'
export default { 
  components: {
    BmlLushu,
    BmlCurveLine
  },
  name: 'bdmap',
  data() {
    return {
      mapStyle: {
        styleJson: [
          {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': {
              'color': '#6a90ddff'
            }
          },
          {
            'featureType': 'green',
            'elementType': 'all',
            'stylers': {
              'color': '#b7e4a3ff'
            }
          }
        ]
      },
      showShipLatestTrail: false,
      shipGroupOptions: [],
      groupOptions: [],
      listQuery: {
        goupselection: [],
        groupid: 0,
        shipid: 0,
        shipname: ''
      },
      historyTrailQuery: {
        shipid: '',
        timespan: ''
      },
      historyTrail: [],
      boatName: '',
      boatLatestTrail: [
        { lng: 116.432045, lat: 39.910683 },
        { lng: 120.129721, lat: 30.314429 },
        { lng: 121.491121, lat: 25.127053 }
      ],
      boatHistoryTrail: [
        { lng: 116.432045, lat: 39.910683 },
        { lng: 120.129721, lat: 30.314429 },
        { lng: 121.491121, lat: 25.127053 }
      ],
      banner,
      dialogVisible: false,
      dialogFormVisible: false,
      temp: {},
      play: true,
      play_his: false,
      path: [],
      shipList: [],
      icon: {
        url: './src/icons/boat.svg',
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 }}
      },
      iconBoat: {url: './src/icons/boat.svg', size: {width: 60, height: 50}},
      labelBoat: {color: 'red', fontSize : '12px'},
      trail_speed: 4000,
      selectedShip: {},
      selectedWaster: {},
      PloygonLocs: [],
      address: '',
      markerPoint: {
        lng: 116.428,
        lat: 39.915
      },
      circlePath: {
        center: {
          lng: 121.492613,
          lat: 31.224813
        },
        radius: 500
      },
      polygonPaths: [],
      circleArea: [],
      polygonPoints: [],
      circlePoints: [],
      markerPoints: [],
      value1: '',
      value2: '',
      isActive: false,
      center: {
        lng: 121.492613,
        lat: 31.224813
      },
      zoom: 9,
      position_his: {
        lng: 121.492613,
        lat: 31.224813
      },
      center_his: {
        lng: 121.492613,
        lat: 31.224813
      },
      zoom_his: 9,
      old_center: {
        lng: 121.492613,
        lat: 31.224813
      },
      old_zoom: 9,
      old_center_his: {
        lng: 121.492613,
        lat: 31.224813
      },
      old_zoom_his: 9
    }
  },
  mounted() {
  },
  created(){
    this.getGroups()
    this.getShips()
    this.getShipPath()
    this.getAreaLocation()
    setInterval(() => {
      this.getShips() 
    }, 60000)
  },
  methods: {
    queryHistoryTrail(){
      this.historyTrailQuery.shipid = this.selectedShip.ShipId
      this.historyTrailQuery.timespan = this.value1
      this.listLoading = true
      getShipHistoryTrail(this.historyTrailQuery).then(response => {
        this.historyTrail = response.datas.trail
        this.center_his = response.datas.history_trail_start
        this.listLoading = false
      })
    },
    playHistoryTrail(){
      this.play_his = true
    },
    stopPlayHistoryTrail(){
      this.play_his = false
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    syncCenterAndZoom_his(e) {

    },
    handleQueryChange(value) {
      this.getShips()
    },
    getGroups() {
      this.listLoading = true
      fetchGroupListForMap().then(response => {
        this.groupOptions = response.datas.shipGroup
        this.listLoading = false
      })
    },
    getShips() {
      this.listLoading = true
      getShipsLocation(this.listQuery).then(response => {
        this.shipList = response.datas.shipList
        this.listLoading = false
      })
    },
    update(e) {
      this.points = e.target.cornerPoints
    },
    getShipPath() {
      this.listLoading = true
      getShipPath().then(response => {
        const tmparr = []
        const tmpshipPath = response.datas.trail || []
        tmpshipPath.map((item, index) => {
          const obj = {}
          if(item.lng.length > 0 && item.lat.length > 0){
            obj.lng = parseFloat(item.lng)
            obj.lat = parseFloat(item.lat)
            tmparr.push({ 'lng': item.lng, 'lat': item.lat })
          }
        })
        this.path = tmparr
        this.listLoading = false

      })
    },
    getAreaLocation() {
      this.listLoading = true
      getAreaLocation().then(response => {
        let tmparr = []
        const tmpCircleArea = []
        const tmpAreaList = response.datas.area_list || []
        tmparr = tmpAreaList.filter(item => {
          if(parseInt(item.AreaInUse) === 1){ 
            if(parseInt(item.isCircle) === 0){
              return item
            }else{
              tmpCircleArea.push(item)
            }
          }
        })
        this.polygonPaths = tmparr
        this.circleArea = tmpCircleArea
        this.listLoading = false
      })
    },
    zoomEnd(e){
      this.zoom = e.target.getZoom()
    },
    mapload() {
    },
    updatePolygonPath(e) {
      this.polygonPath = e.target.getPath()
    },
    showlatesttrail(info){
      this.boatName = info.ShipName
      for(var ship in this.shipList){
        if(this.shipList[ship]['ship_id'] === info.ship_id){
          var pp = [];
          this.shipList[ship]['trail']['latest'].forEach(function(item, index, array){
            pp.push({ lng: item.lng, lat: item.lat })
          })
          this.boatLatestTrail = pp
          this.play = true
        }
      }
      if(this.showShipLatestTrail === true){
        this.showShipLatestTrail = false
        this.center = this.old_center
        this.zoom = this.old_zoom
      }else{
        this.showShipLatestTrail = true
        this.old_center = this.center
        this.old_zoom = this.zoom
        this.center.lng = info.trail.position.lng
        this.center.lat = info.trail.position.lat
        this.zoom = 13
      }
    },
    openInfo(info){
      this.zoom_his = 13
      this.center_his.lng = info.trail.position.lng
      this.center_his.lat = info.trail.position.lat
      this.position_his = this.center_his
      this.dialogVisible = true
      this.selectedShip = info
      this.showShipLatestTrail = true
    },
    openWasterInfo(info){
      this.dialogFormVisible = true
      this.selectedWaster = info
      this.PloygonLocs = info.PloygonLocs.substr(0, info.PloygonLocs.length - 1).split('|')
    },
    handleClose(done) {
      this.dialogVisible = false
    },
    reset() {
      this.play = false
    },
    reset_his() {
      this.play_his = false
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
    handleSearchComplete(res) {
      this.path = res.getPlan(0).getRoute(0).getPath()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.map {
  width: 100%;
  height: calc(87vh);
  margin-top: 5rpx;
  .shipTable{
    .tableKey{
      
    }
  }
}
table{
  width:100%;
  border-collapse:collapse;
}
table,th, td {
  border: 1px solid #ccc;
}
table .tableKey {
  width:17%;
  background-color:#f5f7fa;
}
table .tableValue {
  width:17%;
  color:#222;
  background-color:#e5f3ff;
}
.wasterTable .active {
  background-color: #9ce71a;
}
.app-container {
  height: 100%;
}

.el-dialog__body {
    padding: 0px 20px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
}

</style>
