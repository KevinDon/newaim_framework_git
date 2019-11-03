<template>
  <div class="DropshipzoneShipping">
    <div style="text-align: right">
      <el-button size="mini" type="primary" plain>Enquiry by SKU</el-button>
    </div>
    <div style="margin-top: 10px">
      <div style="border-bottom: 1px solid rgba(139,139,139,1);display: flex;padding: 5px">
        <div style="flex: 2;display: flex">
          <p style="width: 25%;text-align: center;line-height: 28px;">Post Code:</p>
          <el-input v-model="postcode" placeholder="Dropshipzone Account" size="mini" ref="account"></el-input>
        </div>

        <div style="flex: 2;display: flex">
          <p style="width: 25%;text-align: center;line-height: 28px;">Suburb:</p>
          <el-input v-model="suburb" placeholder="Dropshipzone Account" size="mini" ref="account"></el-input>
        </div>

        <div style="flex: 2;display: flex">
          <p style="width: 25%;text-align: center;line-height: 28px;">Address:</p>
          <el-input v-model="address" placeholder="Dropshipzone Account" size="mini" ref="account"></el-input>
        </div>

        <div style="flex: 1;text-align: center">
          <el-button size="mini" type="primary" @click="addSku" plain>Add SKU</el-button>
        </div>
      </div>

      <div style="background-color: white;padding: 10px" v-for="(sku,index) in skulist" v-bind:key="index">
        <div style="display: flex">
          <div style="flex: 1;display: flex">
            <p style="width: 25%;text-align: center;line-height: 28px;">SKU:</p>
            <el-input  placeholder="" size="mini" ref=""></el-input>
          </div>

          <div style="flex: 1;display: flex">
            <p style="width: 25%;text-align: center;line-height: 28px;">QTY:</p>
            <el-input  placeholder="" size="mini" ref=""></el-input>
          </div>
          <div style="flex: 2">123</div>
        </div>
      </div>
      <!--<div v-for="(product,index) in products" v-bind:key="index">-->
        <!--<ProductBar-->
          <!--:descript="product.descript"-->
          <!--:sku="product.sku"-->
          <!--:shopifyprice="product.shopifyprice"-->
          <!--:costprice="product.costprice"-->
          <!--:images="product.images"-->
        <!--&gt;</ProductBar>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropshipzoneShipping',
  methods: {
    addSku: function () {
      this.skulist.push({
        sku: '', qty: 0
      })
    }
  },
  data () {
    return {
      msg: '',
      postcode: '',
      suburb: '',
      address: '',
      skulist: [
        {sku: '123', qty: 20},
        {sku: '456', qty: 22}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .DropshipzoneShipping{ width: calc(100% - 40px);height: calc(100% - 40px);padding: 20px; background-color: rgb(239,239,239); }
</style>
