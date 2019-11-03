<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted () {
      let vm = this
      vm.$logger.debug(`Controller framework `, this)
      vm.$logger.debug(`Launcher Settings`, this.$settings)
    }
  }
</script>

<style lang="stylus">
  @import "../static/css/stylus/global.styl"
</style>
