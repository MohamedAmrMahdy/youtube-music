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
                <v-btn type="submit" large class="info"><v-icon>search</v-icon></v-btn>
              </v-flex>
            </v-layout>
           </v-form>
          </v-flex>
      </v-layout>
  
          
            <v-layout row wrap>
              <v-flex pa-1 xs12 sm6 md4 lg4 v-for="item in resultArray" :key="item.id">
                <v-card tile hover gery--darken-1>
                    <v-card-media :src="item.picture" width="100%" height="200">
                    </v-card-media>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline"><v-icon color="red" v-if="item.live">fiber_manual_record</v-icon>{{item.title}}</div>
                        <span class="grey--text">{{item.author}}</span>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn small outline round color="blue" @click.native="sendvid(item.id,item.title,item.author)"><v-icon>add_box</v-icon>Play</v-btn>
                      <v-btn small outline round flat color="cyan"><v-icon>bookmark</v-icon>Save for Later</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn icon color="blue" @click.native="item.showDes = !item.showDes">
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
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&regionCode=eg&type=video&key=AIzaSyAbWy9rzBUnNsuu8XU_avOLck3h0a7AcZE&q='${keyword}`).
        then( (response) => {
          console.log(response)
          let arr = []
          for(let i = 0 ; i < response.data.items.length; i++){
            let item = response.data.items[i] 
            this.resultArray.push({
                title: item.snippet.title,
                author: item.snippet.channelTitle,
                picture: item.snippet.thumbnails.high.url,
                id: item.id.videoId,
                description: item.snippet.description,
                showDes: false,
                live: (item.snippet.liveBroadcastContent==="live"?true:false)
            })
          }
          
          }
        )
        // request('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&regionCode=eg&key=AIzaSyAbWy9rzBUnNsuu8XU_avOLck3h0a7AcZE&q=' +keyword, (error, response, body) =>{
        //   var json = JSON.parse(body)
        //   if (error) {
        //     throw error
        //   } else {
        //     for (let item in json.items) {
        //       this.resultArray.push({
        //         title: json.items[item].snippet.title,
        //         author: json.items[item].snippet.channelTitle,
        //         picture: json.items[item].snippet.thumbnail.medium,
        //         link: json.items[item].videoId,
        //         description: json.items[item].snippet.description,
        //         showDes: false
        //       })
        //     }
        //   }
        // })
      },
      clear(){
        this.input = ''
      }
    }
  }
</script>