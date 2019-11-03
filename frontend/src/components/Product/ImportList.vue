<template>
  <div class="ImportList">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 0px">
      <el-breadcrumb-item :to="{ path: '/' }">Manage Products</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">Import List</el-breadcrumb-item>
    </el-breadcrumb>
    <h3 style="margin-left: 0px">Import List</h3>
    <div style="width: 95%;margin: 10px auto">
      <el-checkbox style="margin-left: 18px" v-model="selectall" v-show="!selectall" @change="selectallFun">showing {{total_count}} product</el-checkbox>
      <div v-show="selectall" style="border: 1px solid #d2dce8;border-radius: 5px;padding: 2px;display: flex;width: 40%;background-color: white">
        <div style="padding-left: 15px;border-right: 1px solid #d2dce8;flex: 1">
          <el-checkbox v-model="selectall" @change="selectallFun">{{total_count}} products selected</el-checkbox>
        </div>
        <div style="padding-left: 10px;border-right: 1px solid #d2dce8;flex: 1;line-height: 20px;font-size: 13px;">
          <p class="finger" @click="importall">Import all to store</p>
        </div>
        <div style="padding-left: 10px;flex: 1;line-height: 20px;font-size: 13px;">
          <p class="finger" @click="removeall">Remove all from import list</p>
        </div>
        <!--<p>Select all {{total_count}} product in import list</p>-->
      </div>
    </div>
    <Tab
      v-for="(product,index) in products"
      :key="index"
      :title="product.title"
      :description="product.description"
      :small_image="product.small_image"
      :product="product"
      :price="product.price"
      :add="product.add"
      :TabHeads="TabHeads">
    </Tab>
    <!--Import all to store Dialog-->
    <el-dialog
      title="Notice"
      :visible.sync="importdialogVisible"
      width="30%"
      >
      <span>Are you sure you want to push {{total_count}} products to your shop ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="confirmImport">Yes</el-button>
        <el-button size="mini" @click="importdialogVisible = false">No</el-button>
      </span>
    </el-dialog>
    <!--Remove all from import list Dialog-->
    <el-dialog
      title="Notice"
      :visible.sync="removedialogVisible"
      width="30%"
    >
      <span>Are you sure you want to all products from your import list ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="confirmRemove">Yes</el-button>
        <el-button size="mini" @click="removedialogVisible = false">No</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tab from '../Public/Tab'
export default {
  name: 'ImportList',
  components: {
    Tab
  },
  created: function () {
    let url = this.HOME + 'products/import/list'
    let pageParams = { page_no: this.pageno, limit: this.limit, keywords: this.keywords }
    if (this.$route.params.import_id) { pageParams.import_id = this.$route.params.import_id }
    let me = this
    this.$store.dispatch('showloadingMask')
    this.$http.get(url, {params: pageParams}).then(function (response) {
      me.$store.dispatch('hideloadingMask')
      console.log(response)
      if (response.data.status === true) {
        me.products = response.data.data.data
        for (let i = 0; i < me.products.length; i++) {
          me.products[i].add = false
        }
        me.total_count = response.data.data.total_count
      }
    }).catch(function (error) {
      me.$store.dispatch('hideloadingMask')
      console.log(error)
    })
  },
  data () {
    return {
      msg: '',
      pageno: 1,
      limit: 10,
      total_count: 0,
      keywords: '',
      TabHeads: ['Product', 'Desccription', 'Variants', 'Images'],
      products: [],
      selectall: false,
      importdialogVisible: false,
      removedialogVisible: false
    }
  },
  methods: {
    selectallFun: function (value) {
      let me = this
      if (value) {
        for (let i = 0; i < me.products.length; i++) {
          me.products[i].add = true
        }
      } else {
        for (let i = 0; i < me.products.length; i++) {
          me.products[i].add = false
        }
      }
      this.products = [...this.products]
    },

    importall: function () {
      this.importdialogVisible = true
    },
    confirmImport: function () {
      this.importdialogVisible = false
    },
    removeall: function () {
      this.removedialogVisible = true
    },
    confirmRemove: function () {
      // this.removedialogVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ImportList{ width: calc(100% - 40px);height: calc(100% - 40px);padding: 20px;background-color:rgba(248,250,251,1);}
  .finger{cursor: pointer}
  .finger:hover{color: #32BCDE}
</style>
