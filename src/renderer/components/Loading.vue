<template>
    <div id="app">
        <v-app light>
            <p> Loading </p>
            <v-btn router-link
          :to="mainWin"></v-btn>
        </v-app>
    </div>
  
</template>

<script>
export default {
  data () {
      return {
          mainWin: '/mainWin/home'
      }
  }
}
</script>

