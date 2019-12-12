<template>
  <div class="MyProduct">
    <div class="ProductContainer">
      <div style="width: 100%;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }" class="bread">Manage Product</el-breadcrumb-item>
          <el-breadcrumb-item>My Products</el-breadcrumb-item>
        </el-breadcrumb>
        <h3>My Products</h3>
        <div style="height: 500px;width: 95%;margin: 0px auto;">
          <div style="border-radius: 5px;display: flex;justify-content: space-between;padding: 20px;background-color: #FFFFFF">
            <el-input v-model="keywords" placeholder="Enter KeyWords" size="mini" style="width: 20%"></el-input>
            <el-select v-model="value" placeholder="请选择" style="width: 20%" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" size="mini" style="width: 20%" @click="filter">Filter</el-button>
          </div>

          <div style="margin-top: 10px;border:1px solid rgb(239, 239, 239);min-height: 700px">
            <div v-for="(product,index) in products" v-bind:key="index">
              <ProductBar
                @loadProduct="loadProduct"
                :sh_title="product.sh_title"
                :sku="product.sku"
                :sh_price="product.sh_price"
                :dsz_price="product.dsz_price"
                :small_image="product.small_image"
                :product_id="product._id"
              ></ProductBar>
            </div>
          </div>

          <div class="block" style="width: 500px;margin: 0px auto;line-height: 28px;height: 28px">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="changePage"
              :page-sizes="[1, 2, 3]"
              :page-size="1"
              layout="sizes, prev, pager, next,total"
              :total="total_count">
            </el-pagination>
          </div>

        </div>
      </div>
    </div>
    <div style="width: 400px;background-color: rgb(239,239,239);position: fixed;right: 0;height: 100%">
      <div style="margin-top: 120px" v-loading="loading">
        <ProductDetail ref="productdetail"
          :sku="curProduct.sku"
          :gallery="curProduct.gallery"
          :sh_price="curProduct.sh_price"
          :dsz_price="curProduct.dsz_price"
          :qty="curProduct.qty"
          @showDeleteDialog="showDeleteDialog"
        ></ProductDetail>
      </div>
    </div>
    <!--Delete Product对话框-->
    <el-dialog title="Delete Product" :visible.sync="deleteDialogVisible" width="30%">
      <span>{{deleteDialogMsg}}</span><br/>
      <el-checkbox v-model="del_shopifly" style="color: black">Delete this product from my Shopifly store too.</el-checkbox><br/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">Cancel</el-button>
        <el-button type="warning" @click="deleteProduct">Delete Product</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ProductBar from '../Public/ProductBar';
import ProductDetail from '../Product/ProductDetail';
export default {
    name: 'MyProduct',
    components: { ProductBar, ProductDetail },
    created () {
    },
    mounted () {
        let url = this.HOME + '/products/myproduct/list';
        let pageParams = { status: this.status, page_no: this.pageno, limit: this.limit, keywords: this.keywords, product_id: this.curProduct_id };
        let me = this;
        this.$http.get(url, { params: pageParams }).then(function (response) {
            console.log(response);
            me.products = response.data.data.data;
            me.total_count = response.data.data.total_count;
            console.log(me.products);
        });
    },
    methods: {
        changePage: function (page) {
            this.page_no = page;
            let url = this.HOME + '/products/myproduct/list';
            let pageParams = { status: this.status, page_no: this.pageno, limit: this.limit, keywords: this.keywords, product_id: this.curProduct_id };
            let me = this;
            this.$http.get(url, { params: pageParams }).then(function (response) {
                console.log(response);
                me.products = response.data.data.data;
                me.total_count = response.data.data.total_count;
                console.log(me.products);
            });
        },
        showMsg: function () {

        },
        handleSizeChange: function () {

        },
        showDeleteDialog: function () {
            this.deleteDialogVisible = true;
        },
        loadProduct: function (productId) {
            this.curProduct_id = productId;
            this.loading = true;
            let url = this.HOME + '/products/myproduct/list';
            let pageParams = { status: this.status, page_no: this.pageno, limit: this.limit, keywords: this.keywords, product_id: this.curProduct_id };
            let me = this;
            this.$http.get(url, { params: pageParams }).then(function (response) {
                console.log(response);
                me.loading = false;
                me.curProduct = response.data.data.product[0];
            });
        },
        deleteProduct: function () {
            alert(123);
        },
        filter: function () {
            let url = this.HOME + '/products/myproduct/list';
            let pageParams = { status: this.status, page_no: this.pageno, limit: this.limit, keywords: this.keywords, product_id: this.curProduct_id };
            let me = this;
            this.$http.get(url, { params: pageParams }).then(function (response) {
                console.log(response);
                me.products = response.data.data.data;
                console.log(me.products);
            });
        }
    },
    data () {
        return {
            status: 0,
            pageno: 1,
            limit: 1,
            total_count: 0,
            keywords: '',
            curProduct_id: '',
            loading: false,
            options: [{
                value: '0',
                label: 'Status:All'
            }, {
                value: '1',
                label: 'Status:Removed form shopify'
            }, {
                value: '2',
                label: 'Status:Gone form supplier'
            }],
            value: '0',
            products: [],
            curProduct: {},
            deleteDialogVisible: false,
            deleteDialogMsg: 'Are you sure you want to delete product',
            del_shopifly: false
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.MyProduct{ width: calc(100% - 40px);height: calc(100% - 40px);padding: 20px;display: flex}*/
  .MyProduct{ width: 100%;height: 100%;display: flex }
  .ProductContainer{ width: calc(100% - 40px);/*height: calc(100% - 40px)*/;padding: 20px;display: flex;margin-right: 400px; }
  /*.ProductContainer::-webkit-scrollbar {display:none}*/
</style>
