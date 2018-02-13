<template>
      <v-footer fixed color=transparent>
        <v-card tile style="width:100%" color="transparent" raised>
          <v-slider v-model="trackPlaying[0].playingPer" step="0" color="red" style="padding-left:15px;padding-top:0px;margin-top:0px;height:13px"></v-slider>
          <v-list>
            <v-list-tile>
              <v-btn icon @click="trackPlaying[0].favorite = !trackPlaying[0].favorite">
                  <v-icon v-if="trackPlaying[0].favorite" large color="red">bookmark</v-icon>
                  <v-icon v-else large>bookmark</v-icon>
                </v-btn>
              <v-list-tile-content>
                <v-list-tile-title> Playing : {{trackPlaying[0].title}}</v-list-tile-title>
                <v-list-tile-sub-title>AlanVEO</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-spacer></v-spacer>
              <v-list-tile-action>
                <v-btn icon>
                  <v-icon>fast_rewind</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action :class="{
                'mx-5': $vuetify.breakpoint.mdAndUp
              }">
                <v-btn icon>
                  <v-icon >pause</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action :class="{
                'mr-3': $vuetify.breakpoint.mdAndUp
              }">
                <v-btn icon>
                  <v-icon>fast_forward</v-icon>
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
       trackPlaying: [
          {title:'AlanWalker - Faded ( 3am ba5a Remix )',author:'ALanVeVo',playingPer:40,duration:200,playing:false,favorite:false}
        ]
    }
  }
}
</script>
