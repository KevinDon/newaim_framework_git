<template>
  <div class="DetailsView">
    <div style="width: 80%;margin: 20px auto;display:flex;min-height: 500px;background-color: white;border-radius: 5px;border: 1px solid #e1e8f0;">
      <div style="width: 64px;height: 100%;display: flex;flex-direction: column;padding: 10px">
        <div v-for="(image,index) in product.gallery.slice(0,6)" :key="index" style="width: 100%;">
          <el-image :src="image" style="width: 64px; margin: 0px auto" :preview-src-list="product.gallery">
            <div slot="placeholder" class="image-slot" style="">
              <i class="el-icon-loading" style="font-size: 16px"></i>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <div>
          <div class="moreImage">
            +{{this.restImg}}
          </div>
        </div>
      </div>
      <div style="flex: 5;height: 100%">
        <el-image :src="previewImage" style="width: 100%; margin: 0px auto" :preview-src-list="product.gallery">
          <div slot="placeholder" class="image-slot" style="">
            <i class="el-icon-loading" style="font-size: 16px"></i>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div style="flex: 6;background-color: #fff;height: 100%">
        <div>
          <h3 style="font-size: 16px;line-height: 24px;font-weight: 600;">{{product.title}}</h3></div>
        <div style="display: flex">
          <p style="font-size: 14px;color: #818d9a;line-height: 40px;">{{product.qty}} in  stock</p>
          <!--<p style="font-size: 14px;color: #818d9a;line-height: 40px;padding: 0px 10px">|</p>-->
          <!--<p style="font-size: 14px;color: #818d9a;line-height: 40px;padding: 0px 10px">View product on AliExpress</p>-->
          <!--<p style="font-size: 14px;color: #818d9a;line-height: 40px;padding: 0px 10px">View product on AliExpress</p>-->
        </div>
        <div style="width: 50%;" v-show="canImport">
          <el-button icon="el-icon-plus" size="mini" type="info" @click="addImport" plain>Add to Import</el-button>
        </div>
        <div style="width: 100%;display: flex;margin-top: 10px" v-show="!canImport">
          <el-button icon="el-icon-edit-outline" size="mini" type="white" @click="editImport" plain>Edit on import list</el-button>
          <el-button icon="el-icon-close" size="mini" type="white" @click="removeImport" plain>remove import list</el-button>
        </div>
        <hr style="width:95%;height:1px;border:none;border-top:1px solid #e1e8f0;margin-left: 0px;"/>
        <div style="display: flex;margin-top: 10px">
          <div class="itemText" style="flex: 1;text-align: left;padding-left: 10px;line-height: 48px">Price</div>
          <div style="flex: 5">
            <p class="oldprice">US${{product.rrp}}</p>
            <div style="display: flex">
              <p class="newprice">US ${{product.price}}</p><span class="discountLabel">{{discountOff}}%off</span>
            </div>
          </div>
        </div>

        <div style="display: flex;margin-top: 10px">
          <div class="itemText" style="flex: 1;text-align: left;padding-left: 10px;line-height: 48px">Metal Color</div>
          <div style="flex: 5;display: flex;flex-direction: row">
            <div v-for="(image,index) in product.gallery.slice(0,6)" :key="index" style="padding: 0px 1px">
              <el-image :src="image" style="width: 48px;">
                <div slot="placeholder" class="image-slot" style="">
                  <i class="el-icon-loading" style="font-size: 16px"></i>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </div>
        </div>

        <!--<div style="display: flex;margin-top: 10px">-->
          <!--<div class="itemText" style="flex: 1;text-align: left;padding-left: 10px;line-height: 48px">Shipping</div>-->
          <!--<div style="flex: 5">-->
            <!--<p>Free to Australia via AliExpress Standard Shipping</p>-->
            <!--<p>Estimated delivery time 20-41 days</p>-->
          <!--</div>-->
        <!--</div>-->

        <!--<div style="display: flex;margin-top: 10px">-->
          <!--<div class="itemText" style="flex: 1;text-align: left;padding-left: 10px;line-height: 48px">Supplier</div>-->
          <!--<div style="flex: 5">-->

          <!--</div>-->
        <!--</div>-->

      </div>
    </div>
    <div style="width: 80%;margin: 20px auto;min-height: 200px;background-color: white;border-radius: 5px;border: 1px solid #e1e8f0">
      <div style="height: 30px;line-height: 30px;padding: 0px 10px;font-size: 14px;background-color: #f8fafb;width: calc(100% - 20px)">Product statistics</div>
      <div style="display: flex">
        <div style="flex: 1;padding: 10px">
          <div class="itemText">Imports</div>
          <div class="itemText" style="margin-top: 10px">
            <i class="el-icon-plus" style="color: #13ce66;margin-right: 10px"></i>{{product.imported}}
          </div>
          <div class="itemText" style="color: black;font-size: 12px;margin-top: 20px">This product has been added to 1543 Oberlo stores</div>
        </div>
        <div style="flex: 1;padding: 10px">
          <div class="itemText">Pageviews</div>
          <div class="itemText" style="margin-top: 10px">
            <i class="el-icon-view" style="color: #13ce66;margin-right: 10px"></i>{{product.viewed}}
          </div>
          <div class="itemText" style="color: black;font-size: 12px;margin-top: 20px">This product was viewed 43 times across all Shopify stores.</div>
        </div>
        <div style="flex: 1;padding: 10px">
          <div class="itemText">Orders (30 days)</div>
          <div class="itemText" style="margin-top: 10px">
            <i class="el-icon-tickets" style="color: #13ce66;margin-right: 10px"></i>0
          </div>
          <div class="itemText" style="color: black;font-size: 12px;margin-top: 20px">This product has been ordered through Oberlo and/or AliExpress 5 times in the past 30 days.</div>
        </div>
        <div style="flex: 1"></div>
      </div>
    </div>

    <div style="width: 80%;margin: 20px auto;min-height: 200px;background-color: white;border-radius: 5px;border: 1px solid #e1e8f0">
      <div style="height: 30px;line-height: 30px;padding: 0px 10px;font-size: 14px;background-color: #f8fafb;width: calc(100% - 20px)">Product Description</div>
      <div style="display: flex">
        {{product.description}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'DetailsView',
    methods: {
        addImport: function () {
            this.product.is_import = this.product._id;
            // let me = this
            let importurl = this.HOME + '/products/import/insert';

            this.$http.post(importurl, { product_ids: this.product._id }).then(function (response) {
                console.log(response);
            });
        },
        editImport: function () {
            console.log(this.product.is_import);
            this.$router.push({ name: 'ImportList', params: { import_id: this.product.is_import } });
        },
        removeImport: function () {
            let me = this;
            let url = this.HOME + '/products/import/remove';
            console.log(this.product.is_import);
            this.$http.post(url, { product_ids: this.product.is_import }).then(function (response) {
                console.log(response);
                me.product.is_import = 0;
            });
        }
    },
    computed: {
        restImg: function () {
            if (this.product.gallery.length > 6) {
                let rest = this.product.gallery.length - 6;
                return rest;
            } else {
                return false;
            }
        },
        previewImage: function () {
            return this.product.small_image;
        },
        discountOff: function () {
            let off = (((this.product.rrp - this.product.price) / this.product.rrp).toFixed(2)) * 100;
            return off;
        },
        canImport: function () {
            return this.product.is_import === 0;
        }
    },
    created: function () {
        let url = this.HOME + '/products/view';
        let me = this;
        let productId = this.$store.state.viewProductId;
        if (productId) {
            let pageParams = { product_id: productId };
            this.$http.get(url, { params: pageParams }).then(function (response) {
                // console.log(response)
                if (response.data.status === true) {
                    me.product = response.data.data;
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            me.$message.error('Failed to Get Product Information');
            this.$router.push({ name: 'SearchProduct' });
        }
    },
    data () {
        return {
            msg: '',
            product: {}
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .DetailsView{ padding: 80px;width: calc(100% - 40px);padding: 20px;background-color: rgba(248,250,251,1);min-height: calc(100% - 40px)}
  .moreImage{width: 64px;height: 64px;background-color: rgba(0,0,0,0.8);position: relative;top:0;float: left;color: white;line-height: 64px;text-align: center;font-size: 18px;}
  .itemText{color: #818d9a;word-break: break-word;font-size: 14px}
  .oldprice{font-weight: 400;font-size: 12px;line-height: 20px;text-decoration: line-through;line-height: 20px;color: #818d9a;}
  .newprice{font-weight: 600;font-size: 18px;line-height: 28px;color: #f97442;}
  .discountLabel{color: #fff;background-color: #fa7442;border-radius: 3px !important;padding: 6px 8px !important;margin-left: 10px;font-size: 12px}
</style>
