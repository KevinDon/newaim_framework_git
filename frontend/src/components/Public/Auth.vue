<template>
  <div class="Auth">
    <i class="el-icon-loading"></i>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  created: function () {
    // window.location.href = 'https://mfend1.myshopify.com/admin/oauth/authorize?client_id=5156a9b864825057381\n' +
    // '9d4d9b19bbc66&scope=write_products,write_inventory&state=157130127843600&redirec\n' +
    // 't_uri=https://b971c39d.ngrok.io/auth/callback'
    let url = this.HOME + '/auth'
    let pageParams = this.$route.query

    this.$http.get(url, {params: pageParams}).then(function (response) {
      console.log(response.data)
      if (response.data) {
        window.location.href = response.data
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
