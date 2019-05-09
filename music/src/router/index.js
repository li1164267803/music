import Vue from 'vue'
import Router from 'vue-router'

// import Recommend from 'pages/Recommend/Recommend'//推荐
// import Ranking from 'pages/Ranking/Ranking'//歌手
// import Singer from 'pages/Singer/Singer'//排行
// import Search from 'pages/Search/Search'//搜索
// import Zizi from 'pages/Search/Zizi'//搜索子页面
// import SingerDetail from 'pages/SingerDetail/SingerDetail'

//路由懒加载
const Recommend = ()=> import('pages/Recommend/Recommend')
const Ranking = ()=> import('pages/Ranking/Ranking')
const Singer = ()=> import('pages/Singer/Singer')
const Search = ()=> import('pages/Search/Search')
const Zizi = ()=> import('pages/Search/Zizi')
const SingerDetail = ()=> import('pages/SingerDetail/SingerDetail')

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/recommend',name:'Recommend',component: Recommend},
    {path: '/ranking',name:'Ranking',component: Ranking},
    {path: '/singer',name:'Singer',component: Singer,
          children:[{
            path:'singerdetail',
            name:'singerdetail',
            component:SingerDetail}]
  },
    {path: '/search',name:'Search',component: Search,
    children:[{path:'zizi',name:'Zizi',component:Zizi}]
  },
    {path: '/',redirect: '/recommend'},
    {path: '**',component: Recommend},
  ]
})
