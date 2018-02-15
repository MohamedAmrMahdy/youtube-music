<template>
  <v-footer fixed dark height="auto">
    <youtube 
    :video-id="videoId"
    :player-width=0.01
    :player-height=0.01
    :player-vars="playerVars" 
    :mute="mute"
    @ready="ready" @ended="ended" @playing="playing" @paused="paused" @buffering="buffering" @qued="qued"
    style="display:block"
    >
    </youtube>
    <v-card tile class="transparent" width="100%" raised>
      <v-slider 
      :max="max" 
      @click="seek(trackPlaying.playingPer)" 
      v-model="trackPlaying.playingPer" 
      step="0"
      style="padding-left:15px;padding-top:0px;margin-top:-15px;margin-bottom:-41px"
      >
      </v-slider>
      <v-list>
        <v-list-tile>
          <v-btn icon @click="trackPlaying.favorite = !trackPlaying.favorite">
            <v-icon v-if="trackPlaying.favorite" large color="red">bookmark</v-icon>
            <v-icon v-else large>bookmark</v-icon>
          </v-btn>
          <v-list-tile-content>
            <v-list-tile-title> Playing : {{trackPlaying.title}}</v-list-tile-title>
            <v-list-tile-sub-title>{{trackPlaying.author}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-list-tile-action v-if="trackPlaying.buffer">
            <v-progress-circular indeterminate :width="7" color="white"></v-progress-circular>
          </v-list-tile-action>
          <v-list-tile-action :class="{'mx-5': $vuetify.breakpoint.mdAndUp}">
            <v-btn icon @click.native="pause" v-if="trackPlaying.running">
              <v-icon>pause</v-icon>
            </v-btn>
            <v-btn icon @click.native="play" v-else>
              <v-icon>play_arrow</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-footer>
</template>
<script>

export default {
  data(){
    return {
      max:0,
      videoId: '',
      mute: false,
      playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0
      },
      trackPlaying: {
        title:'',
        author:'',
        playingPer:0,
        running:false,
        favorite:false,
        mute:false,
        buffer:false
      }
    }
  },
  created(){
    this.$eventHub.$on('playvid', (id,title,author) =>{
      this.videoId = id
      this.trackPlaying.title = title
      this.trackPlaying.author = author
    })
    setInterval(()=> {
      if(this.trackPlaying.running){
        this.trackPlaying.playingPer = this.player.getCurrentTime()
      }
    }, 1000);
  },
  
  methods: {
    // Events Occurred
    ready: function(player){
      this.player = player
      console.log('Music Player ready')
      this.trackPlaying.running = false
      this.trackPlaying.buffer = false 
    },
    ended: function(player){
      console.log('Music Player ended')
      this.trackPlaying.running = false
      this.trackPlaying.buffer = false
    },
    playing: function(player){
      console.log('Music Player playing')
      this.trackPlaying.running = true
      this.trackPlaying.buffer = false
      this.max = this.player.getDuration()
      console.log(this.player.getDuration())
      this.progrupdate()

    },
    paused: function(player){
      console.log('Music Player paused')
      this.trackPlaying.running = false
      this.trackPlaying.buffer = false
    },
    buffering: function(player){
      console.log('Music Player Buffering')
      this.trackPlaying.running = false
      this.trackPlaying.buffer = true
    },
    qued: function(player){
      console.log('Music Player qued')
      this.trackPlaying.running = false
      this.trackPlaying.buffer = false
    },
    //controls
    toogleMute: function() {
      this.mute = !this.mute
    },
    play: function() {
      this.player.playVideo()
    },
    pause: function(vidid){
      this.player.pauseVideo()
      this.trackPlaying.running = !this.trackPlaying.running
    },
    stop: function(vidid){
      this.player.stopVideo()
    },
    progrupdate: function(){
      console.log(this.trackPlaying.playingPer)
    },
    seek: function(location){
      this.player.seekTo(location)
    }
  }
}
</script>
