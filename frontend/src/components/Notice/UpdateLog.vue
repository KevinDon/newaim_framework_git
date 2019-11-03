<template>
  <div class="UpdateLog">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }" >Notice</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }" style="font-size: 12px">Inventory Update Log</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>Inventory Update Log</h3>
      <hr style="width: 100%;border: 1px solid rgb(239,239,239)">
    </div>
    <div>
      <div style="background-color: gainsboro">
        <div>
          <div style="border-right: 1px solid #000">Select All</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateLog',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .UpdateLog{ width: calc(100% - 40px);padding: 20px;min-height:calc(100% - 40px);background-color: aliceblue }
</style>
