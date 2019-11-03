<template>
  <div class="SlotDiv">
    <slot>
      <p>如果父组件没用插入内容,我将作为默认出现2</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'SlotDiv',
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
