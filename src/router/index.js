import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const Question = () => import('@/views/Question')
const User = () => import('@/views/User')
const Article = () => import('@/views/Article')
const Login = () => import('@/views/Login')
const Search = () => import('@/views/Search')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    components: {
      default: Home,
      layout: Layout
    }
  },
  {
    path: '/video',
    components: {
      default: Video,
      layout: Layout
    }
  },
  {
    path: '/question',
    components: {
      default: Question,
      layout: Layout
    }
  },
  {
    path: '/user',
    name: 'user',
    components: {
      default: User,
      layout: Layout
    }
  },
  {
    path: '/article/:article_id',
    component: Article,
    name: 'article',
    // params相关的路由加props:true 可以让路由和组件解耦
    props: true
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
