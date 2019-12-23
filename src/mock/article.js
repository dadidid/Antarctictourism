import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: '我是测试数据',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}

export default {
  getList: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getlog(){
    const Random = Mock.Random
    return Mock.mock({
      'logList|4-10': [
        {
          'log_id': Random.increment(),
          'log_desp|1': [
            'admin 登陆成功',
            'admin 修改了船只信息',
            'admin 修改了倾废区信息'
          ],
          'log_opter|1': [
            'Lizhiguo',
            'admin',
            'superadmihn'
          ],
          'add_time': Math.floor(Random.datetime('T') / 1000)
        }]
    })
  },
  getPerm(){
    return Mock.mock({
      'perList': [
        {
          'per_desp': '操作用户信息（编辑、删除、增加）',
          'per_root': '是',
          'per_admin': '否',
          'per_watcher': '否'
        },
        {
          'per_desp': '查看用户信息详情',
          'per_root': '是',
          'per_admin': '是',
          'per_watcher': '是'
        },
        {
          'per_desp': '操作倾废区信息（编辑、删除、增加）',
          'per_root': '是',
          'per_admin': '否',
          'per_watcher': '否'
        },
        {
          'per_desp': '查看倾废区信息详情',
          'per_root': '是',
          'per_admin': '是',
          'per_watcher': '是'
        },
        {
          'per_desp': '增加船只信息',
          'per_root': '是',
          'per_admin': '是',
          'per_watcher': '否'
        },
        {
          'per_desp': '编辑船只分组信息',
          'per_root': '是',
          'per_admin': '是',
          'per_watcher': '否'
        },
        {
          'per_desp': '查看船只及其分组信息详情',
          'per_root': '是',
          'per_admin': '是',
          'per_watcher': '是'
        }]
    })
  },
  getAlarm(){
    const Random = Mock.Random
    return Mock.mock({
      'alarmList|4-10': [
        {
          'alarm_id': Random.increment(),
          'alarm_desp|1': [
            '船只出现故障',
            '没有倒入指定地点',
            '没有进入倾废区'
          ],
          'alarm_opter|1': [
            'admin',
            'superadmin',
            'lizhiguo'
          ],
          'add_time': Math.floor(Random.datetime('T') / 1000)
        }]
    })
  },
  getdata(){
    return {
      newVisitis: {
        inLineData: [60, 120, 161, 134, 105, 160, 165],
        offLineData: [120, 82, 91, 154, 162, 140, 145],
        xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    }
  },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getArticle: (config) => {
    const { id } = param2Obj(config.url)
    for (const article of List) {
      if (article.id === +id) {
        return article
      }
    }
  },
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  })
}
