<template>
  <div class="ProductCard">
    <div style="margin: 5px;background-color: grey;min-height: 200px">1</div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ProductCard{width: calc( 20% - 10px);background-color: white;margin: 5px}
</style>
