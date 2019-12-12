<template>
  <div class="ProductBanner">
    <div style="width: 30px">
      <i class="el-icon-arrow-left icon-center"  style="font-size: 30px"></i>
    </div>
    <div style="flex: 1;display: flex">
      <ListCard></ListCard>
      <ListCard></ListCard>
      <ListCard></ListCard>
      <ListCard></ListCard>
      <ListCard></ListCard>
    </div>
    <div style="width: 30px">
      <i class="el-icon-arrow-right icon-center" style="font-size: 30px"></i>
    </div>
  </div>
</template>

<script>
import ListCard from '../Public/ListCard';
export default {
    name: 'ProductBanner',
    components: { ListCard },
    data () {
        return {
            msg: ''
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ProductBanner{ width: 100%;display: flex }
</style>
