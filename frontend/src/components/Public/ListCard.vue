<template>
  <div class="ListCard">
    <div style="height: 300px">
      <a class="pointlink" @click="jumpDetails">
      <el-image :src="small_image">
        <div slot="placeholder" class="image-slot" style="margin-top: 150px;margin-left: 135px">
          <!--Loading<span class="dot">...</span>-->
          <i class="el-icon-loading" style="font-size: 16px"></i>
        </div>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      </a>
    </div>
    <div style="padding: 16px 24px">
      <div style="height: 16px;line-height: 16px;font-size: 16px;" class="ignore">
        <a class="pointlink" @click="jumpDetails" style="text-decoration: none;font-size: 12px;-webkit-line-clamp: 2 !important;color:rgba(163,163,164,1);">
          {{title}}
        </a>
      </div>
      <div style="padding: 5px 0px;display: flex;justify-content: space-between">
        <p style="flex: 1"  class="cur-price" >{{price}}</p>
        <span style="flex: 1;text-align: right" class="old-price">RRP:{{rrp}}</span>
      </div>
      <div style="padding: 5px 0px;">
        <p>SKU:{{sku}}</p>
      </div>

      <div style="padding: 5px 0px;display: flex">
        <i class="el-icon-circle-plus-outline" style="font-size: 18px;color: green;"></i>
        <p style="flex: 1;line-height: 16px;padding-left: 5px">Imports</p>
        <span style="flex: 1;text-align: center">{{imported}}</span>
      </div>
      <div style="padding: 5px 0px;display: flex">
        <i class="el-icon-circle-plus-outline" style="font-size: 18px;color: green;"></i>
        <p style="flex: 1;line-height: 16px;padding-left: 5px">Pageviews</p>
        <span style="flex: 1;text-align: center">{{pageviews}}</span>
      </div>
      <div style="padding: 5px 0px;display: flex">
        <el-checkbox style="color: black" @change="checkboxchange" v-show="canImported" v-model="hasImported">Add To Import List</el-checkbox><br/>
      </div>
      <div style="padding: 5px 0px;display: flex">
        <el-button type="primary" size="mini" style="width: 100%"  v-show="canEdit" plain>Edit</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListCard',
  props: {
    title: '',
    price: '',
    rrp: '',
    small_image: '',
    sku: '',
    imported: '',
    pageviews: '',
    product_id: '',
    is_import: ''
  },
  methods: {
    checkboxchange: function (value) {
      if (value) {
        this.$emit('importTolist', this.product_id)
      } else {
        this.$emit('removeFromlist', this.product_id)
      }
    },
    jumpDetails: function () {
      this.$router.push({name: 'DetailsView', params: {product_id: this.product_id}})
    }
  },
  created: function () {

  },
  computed: {
    hasImported: {
      get () { return this.is_import !== 0 },
      set (value) {}
    },
    canEdit: {
      get () { return (this.is_import !== 0 && this.imported !== 0) },
      set (value) {}
    },
    canImported: {
      get () { return (this.is_import === 0 || this.is_import === -1) },
      set (value) {}
    }
  },
  // watch: {
  //   add (newVal, oldVal) {
  //     console.log(111)
  //   }
  // },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ListCard{ width: calc(20% - 10px);margin: 5px;background-color: #fff }
</style>
