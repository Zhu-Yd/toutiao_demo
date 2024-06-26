import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'layout'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/home') },
      { path: 'video', name: 'video', component: () => import('@/views/video') },
      { path: 'qa', name: 'qa', component: () => import('@/views/qa') },
      { path: 'my', name: 'my', component: () => import('@/views/my') }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/article/:articleId',
    name: 'article_desc',
    component: () => import('@/views/Articles'),
    props: true
  },
  {
    path: '/comments/:articleId',
    component: () => import('@/views/Comments'),
    props: true
  },
  {
    path: '/secondComments/:articleId/:commentId',
    component: () => import('@/views/Comments/secondComments'),
    props: true
  },
  {
    path: '/userInfo',
    component: () => import('@/views/UserInfo')
  }
]

const router = new VueRouter({
  routes
})

export default router
