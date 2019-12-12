<template>
  <div class="ProductDetail">
    <div style="display: flex;padding: 5px;display: none">
      <div style="flex: 1"></div>
      <div style="width: 20px">
        <i class="el-icon-close" style="font-size: 20px" @click="hideContainer"></i>
      </div>
    </div>
    <div style="display: flex;padding: 15px 10px;font-size: 14px;font-weight: bold;">
      <div class="ignore">{{sku}}</div>
    </div>
    <div style="display: flex">
      <div style="flex: 1;padding: 5px" v-for="(image,index) in gallery.slice(0,3)" :key="index">
        <el-image :src="image" style="">
          <div slot="placeholder" class="image-slot">
            <i class="el-icon-loading" style="margin-left: 47px;margin-top: 47px;"></i>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" style="margin-left: 47px;margin-top: 47px;"></i>
          </div>
        </el-image>
      </div>
    </div>

    <div style="display: flex;border: 1px solid #DCDFE6;margin: 10px 5px 0px 5px;height: 30px">
      <div style="flex: 1;line-height: 30px;padding-left: 20px">Shopify Price</div>
      <div style="flex: 1;line-height: 30px;padding-left: 20px">{{sh_price}}</div>
    </div>

    <div style="display: flex;border: 1px solid #DCDFE6;margin: 0px 5px;height: 30px;border-top: 0px !important">
      <div style="flex: 1;line-height: 30px;padding-left: 20px">Product Cost</div>
      <div style="flex: 1;line-height: 30px;padding-left: 20px">{{dsz_price}}</div>
    </div>

    <div style="padding: 10px;padding-bottom:0px;font-size: 12px;line-height: 30px;">{{ pcmsg }}</div>
    <div style="padding: 10px;padding-top:0px;font-size: 12px;line-height: 30px;">{{ spmsg }}</div>

    <div style="padding: 10px;padding-top:0px;font-size: 12px;padding-bottom: 0px;line-height: 30px;">{{ qty }} avaliable in stock</div>

    <div style="border: 1px solid #DCDFE6;padding: 10px;margin: 0px 5px;line-height: 20px;">
      {{updatemsg}}
    </div>

    <div style="padding: 10px;display: flex;flex-direction: column">
      <el-button size="mini" type="info" style="margin: 0px auto;width: 50%;" @click="overwrite" plain>OverWride Product</el-button>
      <div style="height: 10px;width: 100%"></div>
      <el-button size="mini" type="warning" style="margin: 0px auto;width: 50%;" @click="deletep" plain>Delete Product</el-button>
    </div>

  </div>
</template>

<script>
export default {
    name: 'ProductDetail',
    props: [
        'sku', 'gallery', 'sh_price', 'dsz_price', 'qty'
    ],
    methods: {
        hideContainer: function () {
            console.log(this);
        },
        overwrite: function () {
            this.$emit('showDeleteDialog');
        },
        deletep: function () {
            this.$emit('showDeleteDialog');
        }
    },
    data () {
        return {
            msg: '123',
            pcmsg: 'Product Cost - amount you will pay to supplier.',
            spmsg: 'Shopify Price - product selling price paid by your',
            aliablenum: 0,
            updatemsg: 'Automatically update price when cost changes Manage auto update settings (disabled)'

        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ProductDetail{ background-color: #FFFFFF;margin: 0px 10px }
</style>
