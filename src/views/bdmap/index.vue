<template>
  <div class="app-container">
    <img :src="banner" style="width: 100%">
    <baidu-map class="map" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" @moving="syncCenterAndZoom" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom" ControlAnchor='BMAP_ANCHOR_TOP_RIGHT' name="newMap" :mapStyle="mapStyle" :auto-resize="true">

    <bm-control>
    <el-form :inline="true"  class="demo-form-inline">

    <el-form-item label="" style="padding-left:10px;">
    <el-cascader  placeholder="船只分组"
    :options="groupOptions"
    change-on-select
    clearable
    v-model="listQuery.goupselection"
    @change="handleQueryChange">
  </el-cascader>

</el-form-item>
  <el-form-item label="">
    <el-select v-model="selectedQueryShipName" filterable clearable  @change="changeSelectedQueryShip" placeholder="结果筛选">
    <el-option
      v-for="item in shipList"
      :key="'rst'+item.ship_id"
      :label="item.ShipName"
      :value="item.ShipName">
    </el-option>
  </el-select>

</el-form-item>


</el-form-item>
  <el-button type="danger" >{{oneline_boat_number}} : {{offline_boat_number}}</el-button>
</el-form-item>

<el-form-item label="">
     <el-radio-group v-model="onlineStateFilter" size="small"  @change="showDifferentShips" >
      <el-radio-button label="全部"></el-radio-button>
      <el-radio-button label="在线"></el-radio-button>
      <el-radio-button label="离线"></el-radio-button>
    </el-radio-group>

</el-form-item>
  <el-button type="success" icon="el-icon-refresh" @click="handleQueryChange" circle></el-button>
</el-form-item>

</el-form>

<el-form :inline="true"  class="demo-form-inline">
<el-form-item>
<el-card class="box-card"  v-show="infoWindow.show">
  <div class="text item">{{'船只: ' + infoWindow.ShipName }}</div>
  <div class="text item">{{'状态: ' + infoWindow.ShipState }}</div>
  <div class="text item">{{'航速: ' + infoWindow.Speed }}</div>
  <div class="text item">{{'航向: ' + infoWindow.Direction }}</div>
  <div class="text item">{{'水深: ' + infoWindow.Deep }}</div>
  <div class="text item">{{'泥门: ' + infoWindow.ShipLock }}</div>
  <div class="text item">{{'时间: ' + infoWindow.UpdateTime }}</div>
</el-card>
</el-form-item>
</el-form>
    </bm-control>


      <bm-polygon v-if="zoom>9" v-for="item in polygonPaths" :key="item.Area_id" :path="item.PloygonLocs_points" stroke-color="green" :stroke-opacity="0.5" :stroke-weight="2" fill-color="green" :editing="false" @click="openWasterInfo(item)" @lineupdate="updatePolygonPath">
      </bm-polygon>

      <bm-marker v-if="zoom<=9" v-for="item in polygonPaths" :key="item.AreaCode" :position="item.PloygonLocs_points[0]" :dragging="false" :icon="{url: './src/icons/ball.svg', size: {width: 20, height: 20}}" @click="openWasterInfo(item)"></bm-marker>
      <bm-circle v-if="zoom>9" v-for="item in circleArea" :key="item.Area_id" :center="item.AreaCenter" :radius="item.AreaCenrad * 1000" stroke-color="green" fill-color="green" :stroke-opacity="0.5" :stroke-weight="2" @click="openWasterInfo(item)"></bm-circle>
      <bm-marker v-if="zoom<=9" v-for="item in circleArea" :key="item.Area_id" :position="item.AreaCenter" :dragging="false" :icon="{url: './src/icons/ball.svg', size: {width: 20, height: 20}}" @click="openWasterInfo(item)"></bm-marker>


      <bm-marker v-for="item in shipList"  :key="'all'+item.key" :position="item.position" :dragging="false" @rightclick="openInfo(item)" @click="showlatesttrail(item)" :icon="item.State==='1'?iconBoat:iconOfflineBoat"  v-if="showAllShips || (showOnlineShips && item.State==='1') || (showOfflineShips && item.State==='2')" >
        <bm-label :content="item.ShipName" :labelStyle="labelBoat" :offset="{width: 10, height: 35}"/>
      </bm-marker>


      <bm-polyline strokeColor="red" :path="boatLatestTrail" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="false" strokeStyle="dashed" ></bm-polyline>


      <bml-lushu v-if="showShipLatestTrail"
        key="map"
        @stop="reset"
        :path="boatLatestTrail"
        :icon="iconBoat"
        :speed="trail_speed"
        :play="play"
        :content="boatName"
        :rotation="false">
      </bml-lushu>


      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <bm-navigation :showZoomInfo="true" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-map-type :map-types="['BMAP_HYBRID_MAP','BMAP_NORMAL_MAP']" anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-map-type>
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
              <td class="tableValue ship">{{selectedShip.position.lng}}</td>
              <td class="tableKey">{{$t('form.lat')}}</td>
              <td class="tableValue ship">{{selectedShip.position.lat}}</td>
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

      <bm-marker key="history_map_key" :position="position_his" :dragging="false" :icon="iconBoat">
        <bm-label :content="boatName" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: 0, height: 30}"/>
      </bm-marker>


      <bm-polyline strokeColor="red" :path="historyTrail" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="false" strokeStyle="dashed" ></bm-polyline>


      <bml-lushu
        key="trail"
        @stop="reset_his"
        :path="historyTrail"
        :icon="iconBoat"
        :speed="trail_speed"
        :play="play_his"
        :rotation="false">
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

import { fetchGroupListForMap, getShipsLocation, getAreaLocation, getShipHistoryTrail } from '@/api/article'
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
      infoWindow: {
        show: false,
        ShipName: '',
        ShipState: '',
        ShipCompany: '',
        GroupName: '',
        Speed: '',
        Direction: '',
        Deep: '',
        ShipLock: '',
        UpdateTime: ''
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
      ck: false,
      onlineOptions: [{ label: '全部', key: '' }, { label: '在线', key: '1' }, { label: '离线', key: '2' }],
      historyTrailQuery: {
        shipid: '',
        timespan: ''
      },
      onlineStateFilter: '全部',
      selectedQueryShipName: '',
      historyTrail: [],
      boatName: '',
      boatLatestTrail: [
      ],
      showAllShips: true,
      showOnlineShips: false,
      showOfflineShips: false,
      banner,
      dialogVisible: false,
      dialogFormVisible: false,
      temp: {},
      active: false,
      play: true,
      play_his: false,
      path: [],
      shipList: [],
      oneline_boat_number : 0,
      offline_boat_number : 0,
      icon: {
        url: './src/icons/boat.png',
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 }}
      },
      iconBoat: {url: './src/icons/boat.png', size: {width: 60, height: 50}},
      iconOfflineBoat: {url: './src/icons/boat.png', size: {width: 60, height: 50}},
      labelBoat: {color: 'red', fontSize : '12px'},
      trail_speed: 1000,
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
    this.getAreaLocation()
    setInterval(() => {
      this.getShips() 
    }, 290000)
  },
  methods: {
    hover(item){
      //console.log(item)
      this.infoWindow.ShipName = item.ShipName
      this.infoWindow.ShipState = item.ShipState
      this.infoWindow.ShipCompany = item.ShipCompany
      this.infoWindow.GroupName = item.GroupName
      this.infoWindow.Speed = item.Speed
      this.infoWindow.Direction = item.Direction
      this.infoWindow.Deep = item.Deep
      this.infoWindow.ShipLock = item.ShipLock
      this.infoWindow.UpdateTime = item.UpdateTime
      this.infoWindow.show = true
    },
    hoverout(){
      //this.infoWindow.show = false
    },
  infoWindowClose (e) {
      this.infoWindow.show = false
    },
    infoWindowOpen (e) {
      this.infoWindow.show = false
    },
    clear () {
      this.infoWindow.contents = ''
    },
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
      //this.showShipLatestTrail = false
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
        this.oneline_boat_number = response.datas.online
        this.offline_boat_number = response.datas.offline
        this.listLoading = false
        if(response.datas.shipcount==1){
          this.selectedQueryShipName = this.shipList[0].ShipName
          this.changeSelectedQueryShip()
        }
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
    showDifferentShips(){
      if(this.onlineStateFilter == '全部'){
      console.log('111')
        this.showAllShips = true
        this.showOnlineShips = false
        this.showOfflineShips = false
      }else if(this.onlineStateFilter == '在线'){
      console.log('222')
        this.showAllShips = false
        this.showOnlineShips = true
        this.showOfflineShips = false
      }else if(this.onlineStateFilter == '离线'){
      console.log('333')
        this.showAllShips = false
        this.showOnlineShips = false
        this.showOfflineShips = true
      }
    },
    changeSelectedQueryShip(){
      this.boatName = this.selectedQueryShipName
      for(var ship in this.shipList){
        if(this.shipList[ship]['ShipName'] === this.selectedQueryShipName){
          var pp = [];
          this.shipList[ship]['trail']['latest'].forEach(function(item, index, array){
            pp.push({ lng: item.lng, lat: item.lat })
          })
          this.boatLatestTrail = pp
          //console.log(this.boatLatestTrail)
          //this.play = true
          this.play = false
          this.showShipLatestTrail = false
          this.old_center = this.center
          this.old_zoom = this.zoom
          this.center.lng = this.shipList[ship].position.lng
          this.center.lat = this.shipList[ship].position.lat
          this.zoom = 13
        }
      }
    },
    showlatesttrail(info){
      this.hover(info)
      this.boatName = info.ShipName
      for(var ship in this.shipList){
        if(this.shipList[ship]['ship_id'] === info.ship_id){
          var pp = [];
          console.log('111--------------------1111')
          console.log(this.shipList[ship]['trail'])
          this.shipList[ship]['trail']['latest'].forEach(function(item, index, array){
            pp.push({ lng: item.lng, lat: item.lat })
          })
          console.log('222--------------------222')
          this.boatLatestTrail = pp
          //console.log(this.boatLatestTrail)
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
        this.center.lng = info.position.lng
        this.center.lat = info.position.lat
        this.zoom = 13
      }
    },
    openInfo(info){
      this.hover(info)
      this.zoom_his = 13
      this.center_his.lng = info.position.lng
      this.center_his.lat = info.position.lat
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

.sample {
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: rgba(0,0,0,0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}
.sample.active {
  background: rgba(0,0,0,0.75);
  color: #fff;
}


.text {
    font-size: 12px;
  }

  .item {
    margin-bottom: 2px;
    line-height: 14px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 200px;
    padding: 0px;
  }

</style>
<style rel="stylesheet/scss" lang="scss">
.app-container /deep/ .BMap_vectex {
    cursor: pointer;
    width: 11px;
    height: 11px;
    position: absolute;
    background-repeat: no-repeat;
    background-position: 0 0;
    border-radius: 11px !important;
}

.app-container /deep/ .BMap_vectex_node {
    background-image: url() !important;
}

.app-container /deep/ .BMap_vectex_nodeT {
    background-image: url() !important;
}

</style>