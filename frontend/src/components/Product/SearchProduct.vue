<template>
  <div class="SearchProduct">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">Manage Product</el-breadcrumb-item>
        <el-breadcrumb-item>Search Product</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>New Arrivals</h3>
      <hr style="width: 100%;border: 1px solid rgb(239,239,239)">
    </div>

    <div style="height: 40px;display: flex">

      <div style="line-height: 28px;margin-top: 6px;background-color: #FFF;text-align: center;width: 10%;
      border-radius: 5px;height: 28px;">
        Selling to :
        <span style="padding: 0px 5px"><img :src="flagsrc" style="width: 20px;height: 15px;position: relative;top: 3px;"/></span>
        Auatralia
      </div>

      <div style="flex: 1"></div>
      <div style="flex: 1"></div>
      <div style="flex: 1">
          <el-select placeholder="Sort By" size="mini" style="margin-top: 6px" v-model="sortValue" @change="handleSortChange">
            <el-option
              v-for="(item,index) in sortArray"
              :key="index"
              :value="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>
          <el-button type="primary" plain class="toolbutton" size="mini" style="margin-top: 6px;margin-left: 10px" @click="selectAll">Select All</el-button>
          <el-button type="primary" plain class="toolbutton" size="mini" @click="unselectAll">Unselect All</el-button>
          <el-button type="primary" plain class="toolbutton" size="mini" @click="importFun">Import List</el-button>
      </div>
    </div>
    <el-container>
      <el-aside style="min-height: 765px;width: 15%;">
        <div style="background-color: white;border-radius: 5px">
          <ul style="margin: 0px;padding: 0px">
            <li style="line-height: 20px;font-size: 16px;padding: 5px;border-bottom: 1px solid rgb(239,239,239)">Category</li>
            <li v-for="(category,index) in categorys" style="line-height: 20px;font-size: 14px;padding: 5px;"
                v-show="category.parent_id === rootCategoty"
                :key="index">
              <div style="display: flex">
                <span style="flex: 1">
                  <i class="el-icon-arrow-left" @click="getPrev(category)" v-show="category.parent_id!==2"></i>
                </span>
                <span style="flex: 6">
                  {{category.name}}
                </span>
                <span style="flex: 1">
                  <i class="el-icon-arrow-right" @click="getNext(category)" v-show="category.children"></i>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </el-aside>
      <el-main style="width: 90%;min-height: 765px;padding-top: 0px" v-loading="loading">
        <div style="display: flex;flex-wrap: wrap">
          <ListCard v-for="(product,index) in products" v-bind:key="index"
                    :title="product.title"
                    :price="product.price"
                    :rrp="product.rrp"
                    :small_image="product.small_image"
                    :sku="product.sku"
                    :imported="product.imported"
                    :is_import="product.is_import"
                    :pageviews="product.viewed"
                    :product_id="product.product_id"
                    @importTolist="importTolist"
                    @removeFromlist="removeFromlist"
          ></ListCard>
        </div>
        <div class="block" style="width: 500px;margin: 0px auto;line-height: 28px;height: 28px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="changePage"
            :page-sizes="[40, 80, 160]"
            :page-size="40"
            layout="sizes, prev, pager, next,total"
            :total="total_count">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ProductCard from '../Public/ProductCard'
import ListCard from '../Public/ListCard'
export default {
  name: 'SearchProduct',
  components: { ProductCard, ListCard },
  created: function () {
    let url = this.HOME + '/products/category'
    let me = this
    let producturl = this.HOME + '/products/search'
    let pageParams = { limit: 40, page_no: 1 }

    // 循环生成category
    let getchildren = function (data) {
      for (let i = 0; i < data.length; i++) {
        me.categorys.push({
          category_id: data[i].category_id,
          name: data[i].name,
          parent_id: data[i].parent_id,
          show: data[i].is_anchor === '1',
          menu: data[i].include_in_menu,
          children: data[i].children
        })

        if (data[i].children) {
          getchildren(data[i].children)
        }
      }
    }

    this.$store.dispatch('showloadingMask')
    // 请求category
    this.$http.get(url).then(function (response) {
      if (response.data.status === true) {
        getchildren(response.data.data, me)
        me.categoryTree = me.categorys
        console.log(me.categorys)

        // 请求产品列表
        me.$http.get(producturl, {params: pageParams}).then(function (response) {
          if (response.status === 200) {
            console.log(666, response.data.data)
            // me.$store.dispatch('updateProductList', response.data.data)
            me.products = response.data.data.data
            // me.total_count = response.data.data.total_count
            me.$store.dispatch('hideloadingMask')
          }
        }).catch(function (error) {
          me.$store.dispatch('hideloadingMask')
          console.log(error)
        })
      }
    })
  },
  methods: {
    getNext: function (category) {
      this.loading = true
      this.rootCategoty = category.category_id
      let me = this
      let producturl = this.HOME + '/products/search'
      let pageParams = { limit: 10, page_no: 1, category_id: this.rootCategoty }

      // 请求产品列表
      me.$http.get(producturl, {params: pageParams}).then(function (response) {
        if (response.status === 200) {
          me.loading = false
          // me.products = response.data.data.data
          me.$store.dispatch('updateProductList', response.data.data.data)
          me.total_count = response.data.data.total_count
        }
      }).catch(function (error) {
        me.$store.dispatch('hideloadingMask')
        console.log(error)
      })
    },
    getPrev: function (category) {
      this.loading = true
      let me = this
      let producturl = this.HOME + '/products/search'
      let pageParams = { limit: 10, page_no: 1, category_id: me.rootCategoty }

      for (let j = 0; j < this.categoryTree.length; j++) {
        if (me.categoryTree[j].category_id === category.parent_id) {
          if (me.categoryTree[j].parent_id !== 2) {
            me.rootCategoty = me.categoryTree[j].parent_id
          } else {
            pageParams.category_id = ''
            me.rootCategoty = 2
          }
        }
      }

      // 请求产品列表
      this.$http.get(producturl, {params: pageParams}).then(function (response) {
        console.log(response.data.data.data)
        if (response.status === 200) {
          me.loading = false
          // me.products = response.data.data.data
          me.$store.dispatch('updateProductList', response.data.data.data)
          me.total_count = response.data.data.total_count
        }
      }).catch(function (error) {
        me.$store.dispatch('hideloadingMask')
        console.log(error)
      })
    },
    selectAll: function () {
      let me = this
      this.loading = true
      for (let j = 0; j < this.products.length; j++) {
        if (me.products[j].is_import === 0) { me.products[j].imported = 1 }
      }
      this.loading = false
      this.products = [...this.products]
    },
    unselectAll: function () {
      let me = this
      this.loading = true
      for (let j = 0; j < this.products.length; j++) {
        if (me.products[j].is_import === 0) { me.products[j].imported = 0 }
      }
      this.loading = false
      this.products = [...this.products]
    },
    handleSizeChange: function (size) {
      let me = this
      this.limit = size
      let producturl = this.HOME + '/products/search'
      let pageParams = { limit: this.limit, page_no: this.page_no, category_id: this.rootCategoty }
      if (this.rootCategoty === 2) { pageParams.category_id = '' }
      // 请求产品列表
      me.$store.dispatch('showloadingMask')
      me.$http.get(producturl, {params: pageParams}).then(function (response) {
        if (response.status === 200) {
          me.$store.dispatch('hideloadingMask')
          // me.products = response.data.data.data
          me.$store.dispatch('updateProductList', response.data.data.data)
          me.total_count = response.data.data.total_count
          for (let i = 0; i < me.products.length; i++) {
            me.products[i].add = me.products[i].is_import !== 0
          }
        }
      }).catch(function (error) {
        me.$store.dispatch('hideloadingMask')
        console.log(error)
      })
    },
    importTolist: function (productid) {
      let me = this
      for (let i = 0; i < me.products.length; i++) {
        if (me.products[i].product_id === productid) {
          me.products[i].is_import = -1
        }
      }
      this.products = [...this.products]
    },
    removeFromlist: function (productid) {
      let me = this
      for (let i = 0; i < me.products.length; i++) {
        if (me.products[i].product_id === productid) {
          me.products[i].is_import = 0
        }
      }
      this.products = [...this.products]
    },
    importFun: function () {
      let waitTingProduct = []
      let me = this
      for (let i = 0; i < me.products.length; i++) {
        if (me.products[i].is_import === -1) {
          waitTingProduct.push(me.products[i]._id)
        }
      }

      let waitingList = waitTingProduct.join(',')

      let importurl = this.HOME + '/products/import/insert'
      let producturl = this.HOME + '/products/search'
      let pageParams = { limit: 40, page_no: 1 }

      me.$http.post(importurl, {product_ids: waitingList}).then(function (response) {
        if (response.status === 200) {
          me.$message.success(response.data.data)
          me.loading = true

          me.$http.post(producturl, {params: pageParams}).then(function (response) {
            console.log(response)
            me.loading = false
          }).catch(function (error) {
            me.loading = false
            console.log(error)
          })
        } else {
          me.$message.error(response.data.data)
        }
      }).catch(function (error) {
        me.$store.dispatch('hideloadingMask')
        console.log(error)
      })
    },
    handleSortChange: function (value) {
      console.log(value)
      let me = this
      let producturl = this.HOME + '/products/search'
      let pageParams = { limit: this.limit, page_no: this.page_no, category_id: this.rootCategoty }
      if (this.rootCategoty === 2) { pageParams.category_id = '' }

      if (value === 'Lower Price') {
        pageParams.sort = 'price'
      } else if (value === 'Higher Price') {
        pageParams.sort = '-price'
      }

      me.$store.dispatch('showloadingMask')
      me.$http.get(producturl, {params: pageParams}).then(function (response) {
        me.$store.dispatch('hideloadingMask')
        console.log(response)
        // me.products = response.data.data.data
        me.$store.dispatch('updateProductList', response.data.data.data)
        me.total_count = response.data.data.total_count
      }).catch(function (error) {
        me.$store.dispatch('hideloadingMask')
        console.log(error)
      })
    },
    changePage: function (pageno) {
      this.page_no = pageno
      let url = this.HOME + '/products/search'
      let me = this
      let pageParams = { limit: this.limit, page_no: this.page_no }

      // 请求产品列表
      me.$http.get(url, {params: pageParams}).then(function (response) {
        if (response.status === 200) {
          // me.products = response.data.data.data
          me.$store.dispatch('updateProductList', response.data.data)
          me.total_count = response.data.data.total_count
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  data () {
    return {
      msg: '',
      flagsrc: '../../static/Australia.jpg ',
      categorys: [],
      categoryTree: [],
      sortValue: '',
      sortArray: [
        {label: '', value: ''},
        {label: 'Lower Price', value: 'Lower Price'},
        {label: 'Higher Price', value: 'Higher Price'}
      ],
      products: [],
      rootCategoty: 2,
      loading: false,
      total_count: 0,
      limit: 40,
      page_no: 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .SearchProduct{ width: calc(100% - 40px);/*height: calc(100% - 40px);*/padding: 20px;background-color:rgba(248,250,251,1);}
</style>
