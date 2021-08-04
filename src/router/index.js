import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '@/views/login/Index'
import { Dialog } from 'vant'
Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { isUser: false } },
  {
    path: '/hobby',
    name: 'hobby',
    component: () =>
      import('@/views/login/Hobby.vue')
  },
  {
    path: '/',
    component: () =>
      import('@/views/Layout'),
    children: [{
      path: '',
      name: 'home',
      component: () =>
        import('@/views/Home'),
      meta: {
        isUser: false,
        footShow: true
      }
    },
    {
      path: '/publish',
      name: 'publish',
      component: () =>
        import('@/views/publish/Index'),
      meta: { isUser: false }
    },
    {
      path: '/my',
      name: 'my',
      component: () =>
        import('@/views/my/Index'),
      meta: {
        isUser: false,
        footShow: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () =>
        import('@/views/Search'),
      meta: { isUser: false }
    }
    ]
  },
  {
    path: '/userProfile',
    name: 'user-profile',
    component: () =>
      import('@/views/UserProfile'),
    meta: { isUser: true }
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.isUser) {
    if (store.state.user) {
      return next()
    }
    Dialog.confirm({
      title: '访问提示',
      message: '需要登录,是否前往登录页面?',
    }).then(() => {
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => {
      next(false)
    });
  } else {
    next()
  }
})
export default router