<template>
  <div id="app" >
    <v-app dark >
      <v-navigation-drawer 
      fixed
      clipped
      temporary
      v-model="sideNav"
      >
        <v-list two-line dense>
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
        </v-list>
      </v-navigation-drawer>
              <br>
      <v-system-bar fixed light style="-webkit-user-select:none;-webkit-app-region:drag;hight:400px">
        <img src="../assets/logo.png" style="width: 30px;padding-top:1px;padding-right:8px">YouTube Music
        <v-spacer></v-spacer>
        <v-toolbar-items>
        <v-btn small flat depressed left color="blue" @click="minimi()" style="-webkit-app-region: no-drag"><v-icon>remove</v-icon></v-btn>
        <v-btn small flat depressed left color="blue" @click="tooglemax()" style="-webkit-app-region: no-drag"><v-icon>check_box_outline_blank</v-icon></v-btn>
        <v-btn small left depressed primary @click="close()" style="-webkit-app-region: no-drag"><v-icon>close</v-icon></v-btn>
        </v-toolbar-items>
      </v-system-bar>
      <v-toolbar
      color="primary"
      >
        <v-toolbar-side-icon 
        @click.native.stop="sideNav = !sideNav"
        class=""></v-toolbar-side-icon>
        
          
          <!--<router-link to="/" tag="span" style="cursor: pointer"> Youtube Music </router-link>-->
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-badge overlay color="blue" overlap>
            <span slot="badge">{{queueItems.length}}</span>
            <v-btn flat small icon dark><v-icon>format_list_numbered</v-icon></v-btn>
          </v-badge>
        </router-link>
      </v-toolbar>
      <main>
        <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        </transition>
      </main>
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
        hiddenPlayer: false,
        sideNav: false, // we dont need to include it in store
        sideMenutopItems: [
          {icon: 'add', des: 'Search For Video', title: 'Music', link: '/addmusic'},
          {icon: 'playlist_add', des: 'Search for Playlist', title: 'Playlist', link: '/addplaylist'},
        ],
        sideMenuItems: [
          {icon: 'queue_music', des: 'Check Your Music Queue', title: 'Queue', link: '/queue'},
          {icon: 'star_half', des: 'Please Rate us to keep updating', title: 'Rate our App', link: '/#'},
          {icon: 'mood', des: 'Check For The Magic', title: 'Credits', link: '/credits'},
          {icon: 'email', des: 'Send us Your Ideas', title: 'Send Feedback', link: '/feedback'}
        ],// we will remove this queue items and connect queueItems.length with store>queue_list
        queueItems: [
          {index: '1', title: 'test', author: 'Mohamed', picture: '', link: '', description: 'bla bla bla bla'},
          {index: '2', title: 'test2', author: 'Mohamed', picture: '', link: '', description: 'bla bla bla bla'},
          {index: '3', title: 'test3', author: 'Mohamed', picture: '', link: '', description: 'bla bla bla bla'},
          {index: '4', title: 'test4', author: 'Mohamed', picture: '', link: '', description: 'bla bla bla bla'},
          {index: '5', title: 'test5', author: 'Mohamed', picture: '', link: '', description: 'bla bla bla bla'},
          {index: '6', title: 'test6', author: 'Mohamed', picture: '', link: '', description: 'bla bla bla bla'},
          {index: '7', title: 'test7', author: 'Mohamed', picture: '', link: '', description: 'bla bla bla bla'},
          {index: '8', title: 'test8', author: 'Mohamed', picture: '', link: '', description: 'bla bla bla bla'},
          {index: '9', title: 'test9', author: 'Mohamed', picture: '', link: '', description: 'bla bla bla bla'},
          {index: '10', title: 'test10', author: 'Mohamed', picture: '', link: '', description: 'bla bla bla bla'}
        ],
        trackPlaying: [
          {title:'AlanWalker - Faded ( 3am ba5a Remix )',author:'ALanVeVo',playingPer:40,duration:200,playing:false,favorite:false}
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

    },
  }
  
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
</script>
<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
  ::-webkit-scrollbar {display: none;}
</style>

