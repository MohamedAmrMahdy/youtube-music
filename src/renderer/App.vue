<template>
    <v-app light>
        
      <main>
          <router-view></router-view>
      </main>
      <player>
      </player>
    </v-app>
</template>

<script>
  export default{
    data () {
      return {
        
        hiddenPlayer: false,
        
      }
    },
    
  }
</script>
<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
  ::-webkit-scrollbar {display: none;}
</style>

