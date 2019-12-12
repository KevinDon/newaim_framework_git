<template>
  <div class="Navigation">
    <el-row class="tac" style="height: 100%">
      <el-col :span="24" style="height: 100%">
        <el-menu
          :default-active="path"
          class="el-menu-vertical-demo"
          background-color="#163C52"
          text-color="#FFFFFF"
          active-text-color="#FFFFFF"
          :default-openeds="opened"
          style="height: 100%"
          router
        >
          <el-menu-item index="/DashBoard">
            <template>
              <i class="el-icon-menu"></i>
              <span style="font-size: 12px">DashBoard</span>
            </template>
          </el-menu-item>

          <el-menu-item index="/MyAccount">
            <template>
              <i class="el-icon-menu"></i>
              <span  style="font-size: 12px">My Account</span>
            </template>
          </el-menu-item>

          <el-submenu index="/ProductUpdate">
            <template slot="title" >
              <i class="el-icon-menu"></i>
              <span  style="font-size: 12px">Manage Product</span>
            </template>
            <el-menu-item index="/SearchProduct"  style="font-size: 12px">Search Product</el-menu-item>
            <el-menu-item index="/ImportList"  style="font-size: 12px">Import List</el-menu-item>
            <el-menu-item index="/MyProduct"  style="font-size: 12px">My Product</el-menu-item>
            <el-menu-item index="/ProductUpdate"  style="font-size: 12px">Product Update</el-menu-item>
          </el-submenu>

          <el-submenu index="/FreightService">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span  style="font-size: 12px">Freight service</span>
            </template>
            <el-menu-item index="/DropshipzoneShipping"  style="font-size: 12px">DropshipzoneShipping</el-menu-item>
            <el-menu-item index="/VendorShipping"  style="font-size: 12px">Vendor Shipping</el-menu-item>
          </el-submenu>

          <el-submenu index="/Notice">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span  style="font-size: 12px">Notice</span>
            </template>
            <el-menu-item index="/UpdateLog"  style="font-size: 12px">Freight service</el-menu-item>
          </el-submenu>
          <el-submenu index="/TestChart">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span  style="font-size: 12px">TestChart</span>
            </template>
            <el-menu-item index="/TestChart"  style="font-size: 12px">TestChart</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name: 'Navigation',
    data () {
        return {
            msg: '',
            path: this.$route.path,
            opened: ['/ProductUpdate', '/FreightService', '/Notice']
        };
    },
    created: function () {
    // console.log(this.$router.path)
    },
    methods: {

    }

};
</script>

<style scoped>
  .Navigation{ background-color:#333333;width: 100%;height: 100% }
  .is-active{ background-color: #009FE3!important }
  .el-menu-item, .el-submenu__title{ height: 40px;line-height: 40px }
  .el-submenu__icon-arrow{ display: none }
</style>
