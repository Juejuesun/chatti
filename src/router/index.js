import Vue from 'vue'
import VueRouter from 'vue-router'

import Enter from '../components/Enter.vue'
import ProfileHome from '../components/ProfileHome.vue'
import ChatRoom from '../components/ChatRoom.vue'
import Home from '../components/Home.vue'
import ShareGroup from '../components/ShareGroup.vue'
import EditGroup from '../components/EditGroup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    // redirect: '/home',
    children: [
      {
        path: '/home/enter',
        component: Enter
      },
      {
        path: '/home/profilehome',
        name: 'profilehome',
        component: ProfileHome,
        // meta: { requireAuth: true }
      },
      {
        path: '/home/chatroom',
        name: 'chatroom',
        component: ChatRoom,
        // meta: { requireAuth: true },
        children: [
          {
            path: '/home/chatroom/share',
            component: ShareGroup
          },
          {
            path: '/home/chatroom/edit',
            component: EditGroup
          }
        ]
      },
      {
        path: '',
        redirect: '/home/enter'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  if(to.path === '/home/enter') return next()
  if(to.path === '/home/profilehome') return next()
  const usName = window.sessionStorage.getItem('USERNAME')
  if(!usName) return next('/home/profilehome')
  next()
})

export default router
