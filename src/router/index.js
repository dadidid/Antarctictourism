import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/regist', component: () => import('@/views/regist/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  //首页
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/applylist/dashboard'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  },
  //游客管理
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/touristList',
    name: 'tourristMagement',
    meta: {
      title: 'tourristMagement',
      icon: 'tourist',
    },
    children: [
      {
        path: 'touristListEdit',
        component: () => import('@/views/apply/touristListEdit'),
        name: 'touristListEdit',
        meta: { title: 'touristListEdit', noCache: true }
      },
      {
        path: 'touristList',
        component: () => import('@/views/applylist/touristList'),
        name: 'touristList',
        meta: { title: 'touristList',  noCache: true }
      }

    ]
  },
  //订单
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/OrderEdit',
    name: '订单管理',
    meta: {
      title: '订单管理',
      icon: '订单',
    },
    children: [
      {
        path: 'OrderEdit',
        component: () => import('@/views/apply/OrderEdit'),
        name: 'OrderEdit',
        meta: { title: 'OrderEdit', noCache: true }
      },
      {
        path: 'OrderList',
        component: () => import('@/views/applylist/OrderList'),
        name: 'OrderList',
        meta: { title: 'OrderList',  noCache: true }
      }
    ]
  },
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/RouteEdit',
    name: '行程管理',
    meta: {
      title: '行程管理',
      icon: '_行程',
    },
    children: [
      {
        path: 'RouteEdit',
        component: () => import('@/views/apply/RouteEdit'),
        name: 'RouteEdit',
        meta: { title: 'RouteEdit',  noCache: true }
      },
      {
        path: 'RouteList',
        component: () => import('@/views/applylist/RouteList'),
        name: 'RouteList',
        meta: { title: 'RouteList',  noCache: true , activeMenu: '/apply/RouteEdit'}
      }

    ]
  },
  
  {
    path: '/applylist',
    component: Layout,
    redirect: 'BoatList',
    children: [{
      path: 'BoatList',
      component: () => import('@/views/applylist/BoatList'),
      name: 'BoatList',
      meta: { title: 'BoatList', icon: 'trip', noCache: true }
    }]
  },

  //更新行程信息
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/updateRouteInfo',
    hidden: true,
    children: [{
      path: 'updateRouteInfo',
      component: () => import('@/views/apply/updateRouteInfo'),
      name: 'updateRouteInfo',
      meta: { title: 'updateRouteInfo', icon: 'table', noCache: true }
    }]
  },
  //更新订单信息
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/updateOrderInfo',
    hidden: true,
    children: [{
      path: 'updateOrderInfo',
      component: () => import('@/views/apply/updateOrderInfo'),
      name: 'updateOrderInfo',
      meta: { title: 'updateOrderInfo', icon: 'table', noCache: true }
    }]
  },
  //船舶新建
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/BoatEdit',
    hidden: true,
    children: [{
      path: 'BoatEdit',
      component: () => import('@/views/apply/BoatEdit'),
      name: 'BoatEdit',
      meta: { title: 'BoatEdit', icon: 'plus', noCache: true }
    }]
  },
  
  //更新船舶信息
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/updateBoatInfo',
    hidden: true,
    children: [{
      path: 'updateBoatInfo',
      component: () => import('@/views/apply/updateBoatInfo'),
      name: 'updateBoatInfo',
      meta: { title: 'updateBoatInfo', icon: 'table', noCache: true }
    }]
  },
  //新建公司(游轮)
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/CompanyEdit',
    hidden:true,
    children: [{
      path: 'CompanyEdit',
      component: () => import('@/views/apply/CompanyEdit'),
      name: 'CompanyEdit',
      meta: { title: 'CompanyEdit', icon: 'edit', noCache: true }
    }]
  },
  // //公司(游轮)列表
  // {
  //   path: '/applylist',
  //   component: Layout,
  //   redirect: 'applylist/CompanyList',
  //   children: [{
  //     path: 'CompanyList',
  //     component: () => import('@/views/applylist/CompanyList'),
  //     name: 'CompanyList',
  //     meta: { title: 'CompanyList', icon: 'table', noCache: true }
  //   }]
  // },
  //游轮管理
  

  //游客新建
  // {
  //   path: '/apply',
  //   component: Layout,
  //   redirect: 'apply/touristListEdit',
  //   hidden: true,
  //   children: [{
  //     path: 'touristListEdit',
  //     component: () => import('@/views/apply/touristListEdit'),
  //     name: 'touristListEdit',
  //     meta: { title: 'touristListEdit', icon: 'trip', noCache: true }
  //   }]
  // },
  //游客管理
  // {
  //   path: '/applylist',
  //   component: Layout,
  //   redirect: 'applylist/touristList',
  //   children: [{
  //     path: 'touristList',
  //     component: () => import('@/views/applylist/touristList'),
  //     name: 'touristList',
  //     meta: { title: 'touristList', icon: '游客', noCache: true }
  //   }]
  // },
  //修改公司(游轮)信息
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/updateCompanyInfo',
    hidden: true,
    children: [{
      path: 'updateCompanyInfo',
      component: () => import('@/views/apply/updateCompanyInfo'),
      name: 'updateCompanyInfo',
      meta: { title: 'updateCompanyInfo', icon: 'table', noCache: true }
    }]
  },
  //新建上游公司
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/UpperCompanyEdit',
    hidden:true,
    children: [{
      path: 'UpperCompanyEdit',
      component: () => import('@/views/apply/UpperCompanyEdit'),
      name: 'UpperCompanyEdit',
      meta: { title: 'UpperCompanyEdit', icon: 'edit', noCache: true }
    }]
  },
  // //上游公司列表
  // {
  //   path: '/applylist',
  //   component: Layout,
  //   redirect: 'applylist/UpperCompanyList',
  //   children: [{
  //     path: 'UpperCompanyList',
  //     component: () => import('@/views/applylist/UpperCompanyList'),
  //     name: 'UpperCompanyList',
  //     meta: { title: 'UpperCompanyList', icon: 'table', noCache: true }
  //   }]
  // },
  //修改上游公司信息
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/updateUpperCompanyInfo',
    hidden: true,
    children: [{
      path: 'updateUpperCompanyInfo',
      component: () => import('@/views/apply/updateUpperCompanyInfo'),
      name: 'updateUpperCompanyInfo',
      meta: { title: 'updateUpperCompanyInfo', icon: 'table', noCache: true }
    }]
  },
  //新建下游公司
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/DownnerCompanyEdit',
    hidden:true,
    children: [{
      path: 'DownnerCompanyEdit',
      component: () => import('@/views/apply/DownnerCompanyEdit'),
      name: 'DownnerCompanyEdit',
      meta: { title: 'DownnerCompanyEdit', icon: 'edit', noCache: true }
    }]
  },
  //下游公司列表
  // {
  //   path: '/applylist',
  //   component: Layout,
  //   redirect: 'applylist/DownnerCompanyList',
  //   children: [{
  //     path: 'DownnerCompanyList',
  //     component: () => import('@/views/applylist/DownnerCompanyList'),
  //     name: 'DownnerCompanyList',
  //     meta: { title: 'DownnerCompanyList', icon: 'table', noCache: true }
  //   }]
  // },
   
  //修改下游公司信息
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/updateDownnerCompanyInfo',
    hidden: true,
    children: [{
      path: 'updateDownnerCompanyInfo',
      component: () => import('@/views/apply/updateDownnerCompanyInfo'),
      name: 'updateDownnerCompanyInfo',
      meta: { title: 'updateDownnerCompanyInfo', icon: 'table', noCache: true }
    }]
  },
  // {
  //   path: '/applylist',
  //   component: Layout,
  //   redirect: 'applylist/personApply',
  //   children: [{
  //     path: 'personApply',
  //     component: () => import('@/views/apply/personApply'),
  //     name: 'personApply',
  //     meta: { title: 'personApply', icon: 'form', noCache: true }
  //   }]
  // },
  //修改游客信息
  {
    path: '/apply',
    component: Layout,
    redirect: 'apply/modifyTouristInfo',
    hidden: true, // 不在侧边栏线上
    children: [{
      path: 'modifyTouristInfo',
      component: () => import('@/views/apply/modifyTouristInfo'),
      name: 'modifyTouristInfo',
      meta: { title: 'modifyTouristInfo', icon: 'table', noCache: true }
    }]
  }
  
  // {
  //   path: '/applylist',
  //   component: Layout,
  //   redirect: 'applylist/companyApplyList',touristList
  //   children: [{
  //     path: 'companyApplyList',
  //     component: () => import('@/views/applylist/companyApplyList'),
  //     name: 'companyApplyList',
  //     meta: { title: 'companyApplyList', icon: 'table', noCache: true }
  //   }]
  // },
  // {
  //   path: '/applylist',
  //   component: Layout,
  //   redirect: 'applylist/personApplyList',
  //   children: [{
  //     path: 'personApplyList',
  //     component: () => import('@/views/applylist/personApplyList'),
  //     name: 'personApplyList',
  //     meta: { title: 'personApplyList', icon: 'list', noCache: true }
  //   }]
  // },
  
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  
  {
    path: '/apply',
    component: Layout,
    name: '公司管理',
    meta: {
      title: '公司管理',
      icon: '公司',
    },
    children: [
      {
        path: 'UpperCompanyList',
        component: () => import('@/views/applylist/UpperCompanyList'),
        name: 'UpperCompanyList',
        meta: { title: 'UpperCompanyList',  noCache: true }
      },
      {
        path: 'DownnerCompanyList',
        component: () => import('@/views/applylist/DownnerCompanyList'),
        name: 'DownnerCompanyList',
        meta: { title: 'DownnerCompanyList', noCache: true }
      },
      {
        path: 'CompanyList',
        component: () => import('@/views/applylist/CompanyList'),
        name: 'CompanyList',
        meta: { title: 'CompanyList',  noCache: true }
      }
    ]
  },
  //船舶列表
 
  //日志管理
  {
    path: '/applylist',
    component: Layout,
    redirect: 'applylist/logManage',
    children: [{
      path: 'logManage',
      component: () => import('@/views/applylist/logManage'),
      name: 'logManage',
      meta: { title: 'logManage', icon: 'bug', noCache: true }
    }]
  },
  //统计报表
  {
    path: '/applylist',
    component: Layout,
    redirect: 'applylist/statisticalForm',
    children: [{
      path: 'statisticalForm',
      component: () => import('@/views/applylist/statisticalForm'),
      name: 'statisticalForm',
      meta: { title: 'statisticalForm', icon: '报表', noCache: true }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: 'user/index',
    meta: { title: 'user', roles: ['admin'], icon: 'users', noCache: true },
    children: [{
      path: 'index',
      component: () => import('@/views/user/index'),
      name: 'user',
      meta: { title: 'user', roles: ['admin'], icon: 'users', noCache: true }
    }]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    // alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      roles: ['admin']
      // you can set roles in root nav
    },
    children: [{
      path: 'page',
      component: () => import('@/views/permission/page'),
      name: 'pagePermission',
      meta: {
        title: 'pagePermission',
        icon: 'lock',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    ]
  },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   meta: { title: '个人中心', icon: 'user', noCache: true },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: '个人中心', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]
