<template>
  <div id="admin" class="layout" v-loading.fullscreen.lock="fullscreenLoading">
    <el-container class="layout-dashboard">
      <el-aside class="layout-dashboard-left" :width="this.leftWidth +'px'">
        <left-nav :isCollapse="!!leftNavCollapse">
          <template slot="logo" slot-scope="props">
            <el-image :src="'static/small.png'" lazy></el-image>
          </template>
        </left-nav>
      </el-aside>
      <el-container class="layout-dashboard-right" :style="{width:this.mainWidth+'px'}">
        <el-header class="layout-dashboard-top" :style="{width:this.mainWidth+'px'}">
          <top-nav @toggleLeftNav="leftNavCollapse = !leftNavCollapse" hasLogo></top-nav>
        </el-header>
        <transition name="fade" mode="out-in" appear>
          <el-main class="layout-dashboard-main" :style="{width:this.mainWidth+'px'}">
            <router-view name="default" />
          </el-main>
        </transition>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {
    TopNav: () => import("./dashboard/topNav.vue"),
    LeftNav: () => import("./dashboard/leftNav.vue")
  },
  data() {
    return {
      leftNavCollapse: false,
      fullscreenLoading: false
    };
  },
  mounted() {
    let vm = this;
    // Listen global loading event
    vm.$launcher.$on("globalLoading", function(payload) {
      console.debug("Global Loading Active", payload);
      vm.fullscreenLoading = payload;
    });
  },
  computed: {
    leftWidth: {
      get() {
        return this.leftNavCollapse ? "64" : "200";
      }
    },
    mainWidth: {
      get() {
        return document.body.clientWidth - this.leftWidth;
      }
    }
  }
};
</script>

<style lang="stylus">
.layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  &-dashboard {
    &-left {
      z-index: 1600;
      transition: all 0.5s ease;
      overflow: hidden;
    }

    &-logo {
      display: flex;
      justify-content: center;
    }

    &-top {
      /* position fixed */
      max-width: 100%;
      width: 100%;
      min-width: 680px;
      z-index: 1500;
      padding: 0;
      margin: 0;
    }

    &-right {
      max-width: 100%;
      width: 100%;
      min-width: 680px;
      height: 100vh;
    }

    &-main {
      margin-top: 4px;
      width: 100%;
    }
  }

  /* 滚动条样式 */
}

::-webkit-scrollbar { /* 滚动条整体样式 */
  width: 8px; /* 高宽分别对应横竖滚动条的尺寸 */
  height: 8px;
  transition: all 0.5s ease;
}

::-webkit-scrollbar-thumb { /* 滚动条里面小方块 */
  &:hover {
    background: rgba(32, 32, 32, 0.5);
    transition: all 0.5s ease;
  }

  border-radius: 100px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.1);
  // background: linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.0));
  transition: all 0.5s ease;
}

::-webkit-scrollbar-track { /* 滚动条里面轨道 */
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  border: rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}
</style>
