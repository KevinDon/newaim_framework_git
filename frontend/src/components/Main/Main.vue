<template>
  <div class="Main">
    <div class="Main-SearchBar">
      <SearchBar></SearchBar>
    </div>
    <div class="Main-Navigation">
      <Navigation></Navigation>
    </div>
    <div class="Main-Container" v-loading="this.$store.state.fullloading">
      <el-scrollbar style="height: 100%;">
        <router-view></router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import SearchBar from '../Public/SearchBar';
import Navigation from '../Public/Navigation';
export default {
    name: 'Main',
    components: { SearchBar, Navigation },
    mounted: () => {
    // console.log('Main', this)
    },
    data () {
        return {
            msg: ''
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Main{ width:100%;max-height:100%;margin:0px;display: flex;flex-wrap: wrap }
  .Main-SearchBar{ width: 100%;height: 60px;position: fixed;top: 0;left: 0; }
  .Main-Navigation{ width: 170px;height:calc(100% - 65px);margin-top: 60px;border-top: 5px solid #ffffff }
  .Main-Container{ width: calc(100% - 170px);height: calc(100% - 60px);margin-top: 60px }
</style>
