<template>
  <div id="app">
    <v-app light>
      <v-navigation-drawer 
      fixed
      clipped
      temporary
      v-model="sideNav"
      >
        <v-list two-line dense>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-list-tile 
          router-link
          :to="home" exact
          >
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
              <v-list-tile-sub-title>Check What Is Trending</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-subheader>Add Music To Queue</v-subheader>
          <v-list-tile 
          v-for="item in sideMenutopItems" 
          :key="item.title" 
          router-link
          :to="item.link" exact
          >
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
              <v-list-tile-sub-title>{{item.des}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-list-tile 
          v-for="item in sideMenuItems" 
          :key="item.title" 
          router-link
          :to="item.link" exact
          >
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
              <v-list-tile-sub-title>{{item.des}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-subheader>Settings</v-subheader>
        </v-list>
      </v-navigation-drawer>
      <br>
      <v-system-bar fixed light style="-webkit-user-select:none;-webkit-app-region:drag;hight:400px">
        <img src="/assets/logo.png" style="width: 30px;padding-top:1px;padding-right:8px">YouTube Music
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn small flat depressed left color="blue" @click="minimi()" style="-webkit-app-region: no-drag">
            <v-icon>remove</v-icon>
          </v-btn>
          <v-btn small flat depressed left color="blue" @click="tooglemax()" style="-webkit-app-region: no-drag">
            <v-icon>check_box_outline_blank</v-icon>
          </v-btn>
          <v-btn small left depressed color="red darken-1" dark @click="close()" style="-webkit-app-region: no-drag">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-system-bar>
      <v-toolbar
      color="primary"
      >
        <v-toolbar-side-icon dark @click.native.stop="sideNav = !sideNav" class=""><v-icon>reorder</v-icon></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <router-link :to="home" tag="span" style="cursor: pointer">
            <v-btn flat small icon dark>
              <v-icon>home</v-icon>
            </v-btn>
        </router-link>
      </v-toolbar>
        <router-view></router-view>
      <player>
      </player>
    </v-app>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  export default{
    data () {
      return {
        home: '/mainWin/home',
        hiddenPlayer: false,
        sideNav: false, // we dont need to include it in store
        sideMenutopItems: [
          {icon: 'add', des: 'Search For Video', title: 'Music', link: '/mainWin/addmusic'},
          {icon: 'playlist_add', des: 'Search For Playlist', title: 'Playlist', link: '/mainWin/addplaylist'},
        ],
        sideMenuItems: [
          {icon: 'queue_music', des: 'Check Your Music Queue', title: 'Queue', link: '/mainWin/queue'},
          {icon: 'star_half', des: 'Please Rate Us To Keep Updating', title: 'Rate our App', link: '/mainWin'},
          {icon: 'mood', des: 'Check For The Magic', title: 'Credits', link: '/mainWin/credits'},
          {icon: 'email', des: 'Send Us Your Ideas', title: 'Send Feedback', link: '/mainWin/feedback'}
        ]
      }
    },
    methods: {
      close: () => {
        ipcRenderer.send('close-win')
      },
      tooglemax: () => {
        ipcRenderer.send('max-win')
      },
      minimi: () => {
        ipcRenderer.send('mini-win')
      }
    }
  }
</script>