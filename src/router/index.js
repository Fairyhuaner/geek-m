import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const Question = () => import('@/views/Question')
const User = () => import('@/views/User')
const Article = () => import('@/views/Article')
const Login = () => import('@/views/Login')
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
    path: '/article',
    component: Article
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
