<template>
  <div>
    <transition name="fade" mode="out-in" appear>
    <el-menu
      id="dashboard-leftnav-menu"
      router
      :default-active="curRouter.path"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapsed"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/">
        <slot name="logo" :atl="'这是logo'"></slot>
      </el-menu-item>
      <div style="padding:1em;font-size: 12px;color:whitesmoke">
        <el-row>
          <el-col>
            <label for="showFullMenuSwitch">
              <el-switch v-model="showFullMenu" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              {{isCollapse === false?(showFullMenu ?'All Menu':'Menu'):''}}
            </label>
          </el-col>
        </el-row>
      </div>
      <el-menu-item index="/">首页</el-menu-item>
      <template v-if="showFullMenu">
        <!-- 根据vue routes list 生成菜单 -->
        <template v-for="route in routerList[0].children">
          <template v-if="route.children.length > 1">
            <el-submenu :index="route.path" icon="el-icon-user" :key="route.name">
              <template slot="title">
                <i :class="route.icon"></i>
                <span slot="title">{{route.name}}</span>
              </template>
              <el-menu-item
                v-for="[subRouteIndex,subRoute] in route.children.entries()"
                :key="subRouteIndex"
                :index="subRoute.path"
              >
                <template>
                  <i :class="subRoute.icon"></i>
                  <span slot="title">{{subRoute.title || subRoute.name}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="route.children[0].path" :key="route.children[0].name">
              <template>
                <i :class="route.children[0].icon"></i>
                <span slot="title">{{route.children[0].title || route.children[0].name}}</span>
              </template>
            </el-menu-item>
          </template>
        </template>
      </template>
      <template v-else></template>
    </el-menu>
    </transition>
  </div>
</template>

<style lang="stylus" scoped>

</style>

<script>

export default {
    props: {
        isCollapse: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showFullMenu: true
        };
    },
    methods: {
        handleOpen(key, keyPath) {},
        handleClose(key, keyPath) {}
    },
    computed: {
    //

    // 路由列表 - 菜单列表
        routerList: function() {
            return this.$router.options.routes;
        },
        curRouter: {
            get() {
                return this.$route;
            }
        },
        isCollapsed: {
            get() {
                return this.isCollapse;
            }
        }
    }
};
</script>

