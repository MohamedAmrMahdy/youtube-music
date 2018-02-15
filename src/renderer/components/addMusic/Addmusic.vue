<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12>
        <v-form v-model="valid" @submit.prevent="searchNadd(input)">
          <v-layout row>
            <v-flex xs12>
              <v-text-field
              :rules="searchRules"
              v-model="input"
              placeholder="Enter Music Title to Search For"
              required
              class="white--text"
              @submit ="searchNadd(input)"
              >
              </v-text-field>
            </v-flex>
            <v-flex>
              <v-btn type="submit" large class="info">
                <v-icon>search</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex pa-1 xs12 sm6 md4 lg4 v-for="item in resultArray" :key="item.id">
        <v-card tile hover gery--darken-1>
          <v-card-media :src="item.picture" width="100%" height="200">
            <v-btn right small dark color="greay lighten-2" v-if="item.live">🔴 Live</v-btn>
            <v-btn right small dark color="greay lighten-2" v-else > {{item.duration}} </v-btn>
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <div class="headline">
                {{item.title}}
              </div>
              <span class="grey--text">{{item.author}}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn small dark color="red" @click.native="sendvid(item.id,item.title,item.author)">
              <v-icon>play_arrow</v-icon>
              Play
            </v-btn>
            <v-btn small color="cyan" disabled>
              <v-icon>bookmark</v-icon>
              Save for Later
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn small icon dark color="blue" @click.native="item.showDes = !item.showDes">
              <v-icon>{{ item.showDes ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text  v-show="item.showDes">
              {{item.description}}
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
        <br>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  var request = require('request')
  import axios from 'axios'
  export default{
    data () {
      return {
        valid:false,
        input:'',
        resultArray: [],
        searchRules:[(v) => !!v || `Can\'t Leave This Field Empty!`]
      }
    },
    methods: {
      sendvid (id,title,author){
        this.$eventHub.$emit('playvid',id,title,author)
      },
      searchNadd (keyword) {
        this.resultArray=[]
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&regionCode=eg&type=video&key=AIzaSyAbWy9rzBUnNsuu8XU_avOLck3h0a7AcZE&q='${keyword}'`).
        then( (response) => {
          let arr = []
          for(let i = 0 ; i < response.data.items.length; i++){
             let item = response.data.items[i] 
            axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${item.id.videoId}&key=AIzaSyAbWy9rzBUnNsuu8XU_avOLck3h0a7AcZE`).then((response)=>{
              let formattedDuration = this.format(response.data.items[0].contentDetails['duration'])
             
              this.resultArray.push({
                title: item.snippet.title,
                author: item.snippet.channelTitle,
                picture: item.snippet.thumbnails.high.url,
                id: item.id.videoId,
                duration: formattedDuration,
                description: item.snippet.description,
                showDes: false,
                live: (item.snippet.liveBroadcastContent==="live"?true:false)
            })
             })
           
            
          } 
        })
      },
      clear(){
        this.input = ''
      },
      format(duration) {
        let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

        match = match.slice(1).map((x)=> {
          if (x != null) {
              return x.replace(/\D/, '');
          }
        });

        let hours = (parseInt(match[0]) || 0)
        let minutes = (parseInt(match[1]) || 0)
        let seconds = (parseInt(match[2]) || 0)
        
        if(hours==0) hours = `00`
        if(minutes==0) minutes = `00`
        if(seconds==0) seconds = `00`

        if(hours>0 && hours <10) hours = `0${hours}`
        if(minutes>0 && minutes <10) minutes = `0${minutes}`
        if(seconds>0 && seconds <10) seconds = `0${seconds}`
        
        if(hours && hours!=`00`) {return `${hours}:${minutes}:${seconds}`}
        else if (minutes && minutes!=`00`) {return `${minutes}:${seconds}`}
        else if (seconds && seconds!=`00`){ return `0:${seconds}`}
        
}
    }
  }
</script>