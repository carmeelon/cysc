import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import AppraisalSetMain from '@/components/PC/Pages/AppraisalPages/AppraisalSetMain'
import SetProjectInfo from '@/components/PC/Pages/AppraisalPages/SetProjectInfo'
import UserSetMain from '@/components/PC/Pages/UserPages/UserSetMain'
import Query from '@/components/PC/Pages/StatisticsQuery/Query'
import pcHello from '@/components/PC/Pages/pc_hello'
Vue.use(Router)
// @/components/PC/Pages/AppraisalPages/AppraisalSetMain
export default new Router({
  routes: [      
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/AppraisalSetMain',
      name: 'AppraisalSetMain',
      component: AppraisalSetMain
    },
    {
      path: '/SetProjectInfo',
      name: 'SetProjectInfo',
      component: SetProjectInfo
    },
    {
      path: '/Query',
      name: 'Query',
      component: Query
    }
    ,
    {
      path: '/Hello',
      name: 'pcHello',
      component: pcHello
    },
    {
      path: '/UserSetMain',
      name: 'UserSetMain',
      component: UserSetMain
    }
  ]
})
