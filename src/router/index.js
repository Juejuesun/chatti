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
        path: '',
        redirect: '/home/enter'
      },
      {
        path: '/home/enter',
        component: Enter
      },
      {
        path: '/home/profilehome',
        component: ProfileHome
      },
      {
        path: '/home/chatroom',
        component: ChatRoom,
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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
