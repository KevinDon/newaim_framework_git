<!--suppress ALL -->
<template>
  <div class="Callback">
    <i class="el-icon-loading"></i>
  </div>
</template>

<script>
  export default {
    name: 'Callback',
    created: function () {
      let url = this.HOME + '/auth/callback'
      let pageParams = this.$route.query

      this.$http.get(url, {params: pageParams}).then(function (response) {
        console.log(response)
        if (response) {
          window.open(response.data.url)
        }
      })
    },
    data () {
      return {
        msg: ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
