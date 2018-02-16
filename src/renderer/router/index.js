import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddMusic from '@/components/addMusic/Addmusic'
import AddPlaylist from '@/components/addPlaylist/Addplaylist'
import Credits from '@/components/Credits'
import Feedback from '@/components/Feedback'
import Queue from '@/components/Queue'
import MainWin from '@/components/MainWin'
import Loading from '@/components/Loading'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loading',
      component: Loading,
    },
    {
      path: '/mainWin/:id',
      name: 'mainWin',
      component: MainWin,
      children: [
        {path: 'home', component:Home},
        {path: 'addmusic', component:AddMusic},
        {path: 'addplaylist', component:AddPlaylist},
        {path: 'credits', component:Credits},
        {path: 'queue', component:Queue},
        {path: 'feedback', component:Feedback}
      ]
    }
  ],
  mode: 'history'
})
