import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddMusic from '@/components/addMusic/Addmusic'
import AddPlaylist from '@/components/addPlaylist/Addplaylist'
import Credits from '@/components/Credits'
import Feedback from '@/components/Feedback'
import Queue from '@/components/Queue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/queue',
      name: 'queue',
      component: Queue
    },
    {
      path: '/addmusic',
      name: 'addmusic',
      component: AddMusic
    },
    {
      path: '/addplaylist',
      name: 'addplaylist',
      component: AddPlaylist
    },
    {
      path: '/credits',
      name: 'credits',
      component: Credits
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback
    }
  ],
  mood: 'history'
})
