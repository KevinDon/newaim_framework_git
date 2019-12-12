<template>
  <div class="ManageProduct">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 80px">
        <el-breadcrumb-item :to="{ path: '/' }">Manage Products  ({{total_count}}items)</el-breadcrumb-item>
      </el-breadcrumb>
      <h3 style="margin-left: 80px">Manage Products</h3>
      <!--<hr style="width: 100%;border: 1px solid rgb(239,239,239)">-->
      <div style="width: 91%;margin: 0px auto;background-color: #FFF;border-radius: 5px;display: flex;flex-wrap: wrap;overflow: hidden">
        <div v-for="(category,index) in categorys" v-bind:key="index" class="categoryBox" v-show="category.show">
          <p style="text-align: center;color: black;padding: 20px;font-size: 12px">{{category.name}}</p>
        </div>
      </div>
      <div style="display: flex;width:100%;">
        <div style="flex: 1">
          <h3 style="margin-left: 75px">New Arrivals</h3>
        </div>
        <div style="flex: 1;">
          <el-button type="primary" size="mini" style="width: 20%;margin-top: 10px;margin-left: 230px" @click="selectall" plain>Select All</el-button>
          <el-button type="primary" size="mini" style="width: 20%;margin-top: 10px" plain>UnSelect All</el-button>
          <el-button type="primary" size="mini" style="width: 20%;margin-top: 10px" plain>Import List</el-button>
        </div>
      </div>
    </div>
    <div style="width: 95%;margin:10px auto;min-height: 675px">
      <div style="display: flex;flex-wrap: wrap;width: 95%;margin: 0px auto">
        <ListCard v-for="(product,index) in products" v-bind:key="index"
                  :title="product.title"
                  :price="product.price"
                  :rrp="product.rrp"
                  :small_image="product.small_image"
                  :sku="product.sku"
                  :imported="product.imported"
                  :pageviews="product.viewed"
                  :product_id="product.product_id"
                  :is_import="product.is_import"
                  :add="product.add"
                  @importlist = "importlist"
        ></ListCard>
      </div>
    </div>

    <div class="block" style="width: 500px;margin: 0px auto;line-height: 28px;height: 28px">
      <el-pagination
        @size-change="handleSizeChange"
        :page-sizes="[40, 80, 160]"
        :page-size="40"
        layout="sizes, prev, pager, next,total"
        :total="total_count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ListCard from '../Public/ListCard';
export default {
    name: 'ManageProduct',
    components: { ListCard },
    created: function () {
        let url = this.HOME + '/products/category';
        let producturl = this.HOME + '/products/index';
        let pageParams = { page_no: this.pageno, limit: this.limit };
        let me = this;

        // 循环生成category
        let getchildren = function (data) {
            for (let i = 0; i < data.length; i++) {
                me.categorys.push({
                    id: data[i].id,
                    name: data[i].name,
                    parent_id: data[i].parent_id,
                    show: data[i].is_anchor === '1'
                });

                if (data[i].children) {
                    getchildren(data[i].children);
                }
            }
        };

        this.$store.dispatch('showloadingMask');
        // 请求category
        this.$http.get(url).then(function (response) {
            // me.$store.dispatch('hideloadingMask')
            if (response.data.status === true) {
                getchildren(response.data.data);
            }

            // 请求产品列表
            me.$http.get(producturl, { params: pageParams }).then(function (response) {
                me.$store.dispatch('hideloadingMask');

                if (response.data.status === true) {
                    me.products = response.data.data.data;
                    for (let i = 0; i < me.products.length; i++) {
                        me.products.add = me.products.is_import === 0;
                    }
                    me.total_count = response.data.data.total_count;
                }
                console.log(me.products);
            }).catch(function (error) {
                me.$store.dispatch('hideloadingMask');
                console.log(error);
            });
        }).catch(function (error) {
            me.$store.dispatch('hideloadingMask');
            console.log(error);
        });
    },
    methods: {
        handleSizeChange: function (size) {
            let me = this;
            let producturl = this.HOME + '/products/index';
            let pageParams = { page_no: this.pageno, limit: size };
            this.$store.dispatch('showloadingMask');

            this.$http.get(producturl, { params: pageParams }).then(function (response) {
                me.$store.dispatch('hideloadingMask');

                if (response.data.status === true) {
                    me.products = response.data.data.data;
                }
                console.log(me.products);
            }).catch(function (error) {
                me.$store.dispatch('hideloadingMask');
                console.log(error);
            });
        },
        importlist: function (productid) {
            alert(productid);
        },
        selectall: function () {
            console.log(this.products);
            let me = this;
            for (let i = 0; i < this.products.length; i++) {
                if (me.products[i].is_import === 0) {
                    me.products[i].add = true;
                }
            }
        }
    },
    data () {
        return {
            msg: '',
            total_count: 0,
            categorys: [],
            products: [],
            pageno: 1,
            limit: 40
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ManageProduct{ width: calc(100% - 40px);padding: 20px;background-color: aliceblue }
  .categoryBox{ width: calc(20% - 1px);border-bottom: 1px solid rgba(210,220,232,1);border-right: 1px solid rgba(210,220,232,1); }
</style>
