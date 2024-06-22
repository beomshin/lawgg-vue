import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from "vue-cookies";
import cookieCont from "@/constants/cookieCont";
import LayoutDefault from "../layout/common/LayoutDefault.vue";
import PositionRouter from './page/position'
import TrialRouter from './page/trial'
import LawFirmRouter from './page/lawfirm'
import MemberRouter from './page/member'
import MyRouter from './page/my'
import LckRouter from './page/lck'

const beforeEnter = (to, from, next) => {
  if (to.query.token) {
    cookies.set(cookieCont.AUTH_REFRESH_COOKIE_NAME, to.query.token, '7d') // sns 들어온 경우 리프레쉬 토큰 발급 받음
    next('/')
  } {
    next()
  }

}

const scrollBehavior = (to, from, savedPosition)  => {
  if (savedPosition) return savedPosition
  else return { x: 0, y: 0 };
}

const meta = (title) => {
  return {
    layout: LayoutDefault,
    title: title,
    transition: 'fade-in-down'
  }
}


const routes = [
  //메인
  {
    path: '/',
    name: 'Home',
    meta: meta('Home'),
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/Home.vue'),
    beforeEnter: beforeEnter
  },
  ...LckRouter,
  ...PositionRouter,
  ...TrialRouter,
  ...LawFirmRouter,
  ...MemberRouter,
  ...MyRouter
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: '/lawgg',
  routes,
  scrollBehavior
})


router.beforeEach(async (to, from, next) => {
    next()
})


Vue.use(VueRouter)

export default router
