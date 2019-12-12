<template>
  <div class="ProductBar" @click="loadCurrentProduct">
    <div style="border-bottom: 1px solid rgb(239,239,239);height: 100px;display: flex;width: 100%">

      <div style="width: 150px;">
        <el-image :src="small_image" style="background-color: #FFFFFF;width: 80px;height: 80px;margin: 10px 25px;display: block">
          <div slot="placeholder" class="image-slot">
            <i class="el-icon-loading" style="font-size: 16px;margin-top: 32px;margin-left: 32px;"></i>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" style="font-size: 16px;margin-top: 32px;margin-left: 32px;"></i>
          </div>
        </el-image>
      </div>

      <div style="flex: 2">
        <div style="line-height: 20px;margin-top: 20px">{{sh_title}}</div>
        <div style="line-height: 20px;margin-top: 10px">sku:{{ sku }}<span></span></div>
      </div>

      <div style="flex: 1">
        <div style="line-height: 20px;margin-top: 20px">Shopify Price：{{sh_price}}</div>
        <div style="line-height: 20px;margin-top: 10px">Cost exclude shipping：{{dsz_price}}<span></span></div>
      </div>

      <div style="width: 20px;font-size: 20px">
        <i class="el-icon-arrow-right" style="line-height: 100px" @click="showMsg"></i>
      </div>

    </div>
  </div>
</template>

<script>
export default {
    name: 'ProductBar',
    created () {},
    methods: {
        showMsg: function () {
            console.log(this);
        },
        loadCurrentProduct: function () {
            this.$emit('loadProduct', this.product_id);
        }
    },
    props: [
        'sku', 'sh_title', 'sh_price', 'dsz_price', 'small_image', 'product_id'
    ],
    data () {
        return {
            msg: ''
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ProductBar{width: 100%;display: flex;padding: 0px}
  .ProductBar:hover{ background-color: rgb(239,239,239) }
</style>
