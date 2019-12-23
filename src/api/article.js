import request from '@/utils/request'
import fetch from '@/utils/fetch'
export function fetchList(data) {
  return fetch('act=qfq_area&op=getAreaList', data, 'post')
  // return request({
  //   url: '/article/list',
  //   method: 'get',
  //   params: query
  //
  // })
}
export function fetchLogList(data) {
  return fetch('act=qfq_log&op=getLogList', data, 'post')
}
export function fetchAlarmList(data) {
  return fetch('act=qfq_log&op=getAlarmList', data, 'post')
}
export function fetchAllCompanyList(data) {
  return fetch('act=qfq_company&op=getAllCompanyList', data, 'post')
}

export function fetchUserList(data) {
  return fetch('act=admin&op=getAdminList', data, 'post')
}
export function getShipPath(data) {
  return fetch('act=qfq_trail&op=getShipTrailHistory&shipid=127', data, 'post')
}
//新增订单接口
export function addNewOrder(data) {
  return fetch('act=nanji_admin&op=addOrder', data, 'post')
}
//查询订单列表接口
export function getOrderList(data){
  return fetch('act=nanji_admin&op=getOrderList', data, 'post')
}
//删除订单接口
export function delOrderInfo(T_id) {
  const data = {
    id: T_id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=delOrder', data, 'post')
}
//查询单个订单接口
export function getOneOrderInfo(data){
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getOrderInfoById', data, 'get')
}
//删除游客信息
export function delTourist(T_id) {
  const data = {
    id: T_id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=delTourist', data, 'post')
}
//获取游客列表，无条件
export function getTouristList(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=nanji_admin&op=getTouristList', data, 'post')
}
//修改游客信息，根据id值拿游客信息
export function getTouristInfo(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=nanji_admin&op=getTouristInfoById', data, 'get')
}
//增加游客信息
export function addtouristinfo(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=nanji_admin&op=addTourist', data, 'post')
}
//修改游客信息
export function modifytouristinfo(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=nanji_admin&op=editTourist', data, 'post')
}
//创建公司信息
export function createCompany(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=nanji_admin&op=addCompany', data, 'post')
}
//更新公司信息
export function updateCompany(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=editCompany', data, 'post')
}
//获取公司信息列表
export function getCompanyList(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getCompanyList', data, 'post')
}
//删除公司信息
export function deleteCompany(id) {
  const data = {
    id: id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=delCompany', data, 'post')
}
//创建船只信息
export function createTripInfo(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=nanji_admin&op=addTourShip', data, 'post')
}
//更新船只信息
export function updateTripInfo(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=editTourShip', data, 'post')
}
//获取船只信息列表
export function getTripInfoList(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getTourShipList', data, 'post')
}
//删除船只信息
export function deleteTripInfo(id) {
  const data = {
    id: id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=delTourShip', data, 'post')
}
//查询单只船只信息
export function getSingleTripInfo(id) {
  const data = {
    id: id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getTourShipInfoById', data, 'get')
}
//新增行程信息
export function addTrip(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=addTrip', data, 'post')
}
//更新行程信息
export function editTrip(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=editTrip', data, 'post')
}
//获取行程信息列表
export function getTripList(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getTripList', data, 'post')
}
//删除行程信息
export function delTrip(id) {
  const data = {
    id: id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=delTrip', data, 'post')
}
//获取单个行程信息
export function getTripInfoById(id) {
  const data = {
    id: id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getTripInfoById', data, 'get')
}
//获取上游公司列表
export function getUpperCompanyList(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getUpperCompanyList', data, 'post')
}
//新建上游公司列表
export function createUpperCompany(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=addUpperCompany', data, 'post')
}
//删除上游公司列表

export function delUpperCompany(id) {
  const data = {
    id: id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=delUpperCompany', data, 'post')
}
//修改上游公司信息
export function editUpperUserList(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=editUpperCompany', data, 'post')
}
//获取下游公司列表
export function getDownnerCompanyList(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getDownnerCompanyList', data, 'post')
}
//新建下游公司
export function addDownnerCompany(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=addDownnerCompany', data, 'post')
}
//删除下游公司列表
export function delDownnerCompany(id) {
  const data = {
    id: id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=delDownnerCompany', data, 'post')
}
//修改下游公司信息
export function editDownnerCompany(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=editDownnerCompany', data, 'post')
}
//获取下游公司列表
export function getDownnerUserList(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getDownnerCompanyList', data, 'post')
}
//获取工作人员
export function getAdminUserList() {
  const data = {}
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getAdminUserList', data, 'get')
}
//完成订单
export function finishOrder(id) {
  const data = {
    id: id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=finishOrder', data, 'post')
}
//修改订单
export function editOrder(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=editOrder', data, 'post')
}
//取消订单
export function cancelOrder(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=cancelOrder', data, 'post')
}
//撤销订单
export function disCancelOrder(id) {
  const data = {
    id: id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=disCancelOrder', data, 'post')
}
//获取日志管理信息
export function getLogManagement(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getLogList', data, 'post')
}
//获取统计月报
export function getBalanceStatList(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getBalanceStatList', data, 'post')
}
//获取成交金額饼状图
export function getRealTimeBalance() {
  const data = {}
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getRealTimeBalance', data, 'post')
}
export function updateUserPwd(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=admin&op=editAdminPwd', data, 'post')
}
//获取订单状态饼状图
export function getRealTimeOrder() {
  const data = {}
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getRealTimeOrder', data, 'post')
}
//获取订单日报折线图
export function getDayOrder() {
  const data = {}
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getDayOrder', data, 'post')
}
//获取游客日报折线图
export function getDayTourist() {
  const data = {}
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=nanji_admin&op=getDayTourist', data, 'post')
}
export function addBeianCompany(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=beian_apply&op=addBeianCompanyInfo', data, 'post')
}
export function editBeianCompany(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=beian_apply&op=editBeianCompanyInfo', data, 'post')
}
export function delBeianCompany(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=beian_apply&op=delBeianCompanyInfo', data, 'post')
}
export function getNewBeianPersons(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=beian_apply&op=getNewBeianPersons', data, 'post')
}

export function getBeianPersons(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=beian_apply&op=getBeianPersons', data, 'post')
}
export function getBeianApplyInfo(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=beian_apply&op=getBeianApplyInfo', data, 'post')
}
export function updatePwd(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=login&op=updatePwd', data, 'post')
}

export function addBeianPerson(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=beian_apply&op=addBeianPerson', data, 'post')
}
export function editBeianPerson(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=beian_apply&op=editBeianPerson', data, 'post')
}
export function delBeianPerson(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=beian_apply&op=delBeianPerson', data, 'post')
}
export function addBeianApply(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=beian_apply&op=addBeianApply', data, 'post')
}
export function editBeianApply(data) {
  data['myusername'] = localStorage.getItem('myusername')
  data['userid'] = localStorage.getItem('myuserid')
  return fetch('act=beian_apply&op=editBeianApply', data, 'post')
}
export function getRealTimeQfqStat(data) {
  return fetch('act=qfq_static&op=getRealTimeAreaStat', data, 'post')
}

export function getRealTimeTrailStat(data) {
  return fetch('act=qfq_static&op=getRealTimeTrailStat', data, 'post')
}

export function getRealTimeTrailReportStatList(data) {
  return fetch('act=qfq_static&op=getRealTimeTrailReportStatList', data, 'post')
}

export function getDayQfqStat(data) {
  return fetch('act=qfq_static&op=getDayAreaStat', data, 'post')
}

export function getRealTimeShipStat(data) {
  return fetch('act=qfq_static&op=getRealTimeShipStat', data, 'post')
}

export function getDayShipStat(data) {
  return fetch('act=qfq_static&op=getDayShipStat', data, 'post')
}

export function getShipHistoryTrail(data) {
  return fetch('act=qfq_trail&op=getShipTrailHistory', data, 'post')
}

export function getAreaLocation(data) {
  return fetch('act=qfq_area&op=getAreaList', data, 'post')
}
export function getShipsLocation(data) {
  return fetch('act=qfq_trail&op=getShipsLocation', data, 'post')
}
export function getShipsOnlineRate(data) {
  return fetch('act=qfq_static&op=getShipsOnlineRate', data, 'post')
}
export function fetchBoatList(data) {
  return fetch('act=qfq_ship&op=getShipList', data, 'post')
}
export function fetchBoatTrailList(data) {
  return fetch('act=qfq_trail&op=getShipTrailList', data, 'post')
}
export function fetchGroupList(data) {
  return fetch('act=qfq_group&op=getGroupList', data, 'post')
}

export function fetchGroupListForMap(data) {
  return fetch('act=qfq_group&op=getShipGroupListForMap', data, 'post')
}

export function deleteArea(id) {
  const data = {
    Area_id: id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=qfq_area&op=delArea', data, 'post')
  // return request({
  //   url: '/article/list',
  //   method: 'get',
  //   params: query
  // })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}
export function createArticle(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=qfq_area&op=addArea', data, 'post')
}
export function createUser(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=admin&op=addAdmin', data, 'post')
}
export function createGroup(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=qfq_group&op=addGroup', data, 'post')
}
export function createBoat(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=qfq_ship&op=addShip', data, 'post')
}
export function updateUser(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=admin&op=editAdmin', data, 'post')
}
export function updateGroup(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=qfq_group&op=editGroup', data, 'post')
}
export function updateBoat(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=qfq_ship&op=editShip', data, 'post')
}
export function deleteUser(id) {
  const data = {
    admin_id: id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=admin&op=delAdminInfo', data, 'post')
}
export function deleteBoat(id) {
  const data = {
    ship_id: id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=qfq_ship&op=delShip', data, 'post')
}
export function deleteGroup(id) {
  const data = {
    Group_id: id
  }
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=qfq_group&op=delGroup', data, 'post')
}
export function updateArticle(data) {
  data['myusername'] = localStorage.getItem('myusername')
  return fetch('act=qfq_area&op=editArea', data, 'post')
}
export function mockTest(data) {
  return fetch('/article/list', data, 'get')
}
export function mockLog(data) {
  return fetch('/article/log', data, 'get')
}
export function mockAlarm(data) {
  return fetch('/article/alarm', data, 'get')
}
export function mockPerm(data) {
  return fetch('/article/permission', data, 'get')
}
