<template>
  <div class="SearchBar">
    <div class="LogoContainer">
      <div class="logo">
        <img :src="logosrc" alt="LOGO" style="width: 140px;height: 30px;"/>
      </div>
      <div class="search-input">
        <div style="width: 700px;margin: 16px auto;display: flex">
          <div style="width: 600px;">
          <el-input
            placeholder="Search Products to Sell"
            size="mini"
            v-model="keyword"
            >
            <el-select v-model="select" slot="append" style="width: 165px">
              <el-option
                v-for="(item,index) in searchCategorys"
                :key="index"
                :value="item.category_id"
                :label="item.name"
              >
              </el-option>
            </el-select>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          </div>
          <div>
            <el-button size="mini" type="primary" plain style="margin-left: 20px;width: 150px" @click="searchkeyword">Search</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  created: function () {
    let url = this.HOME + '/products/category'
    let me = this

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

    this.$http.get(url).then(function (response) {
      if (response.data.status === true) {
        getchildren(response.data.data, me)
        me.searchCategorys.push({category_id: 2, name: 'All Category'})
        for (let i = 0; i < me.categorys.length; i++) {
          if (me.categorys[i].show === true) {
            me.searchCategorys.push({
              category_id: me.categorys[i].category_id,
              name: me.categorys[i].name
            })
          }
        }
        console.log(me.searchCategorys)
      }
    })
  },
  methods: {
    searchkeyword: function () {
      console.log(this.select)
      let categoryId = 0
      let keyword = this.keyword
      if (this.select === 'All Category') {
        categoryId = ''
      } else {
        categoryId = this.select
      }

      let me = this
      let url = this.HOME + '/products/search'
      let pageParams = { limit: 40, page_no: 1, keywords: keyword, category_id: categoryId }

      this.$store.dispatch('showloadingMask')
      this.$http.get(url, {params: pageParams}).then(function (response) {
        console.log(response)
        me.$store.dispatch('updateProductList', response.data.data)
        me.$store.dispatch('hideloadingMask')
      })
    }
  },
  data () {
    return {
      keyword: '',
      select: 'All Category',
      categorys: [],
      searchCategorys: [],
      logosrc: '../../static/small.png'
    }
  }
}
</script>

<style scoped>
  .SearchBar{ background-color:#163C52;width:100%;height: 100%; }
  .LogoContainer{ display: flex; }
  .logo{ color:#E6A23C;width:140px;height: 30px;margin: 15px;line-height: 30px;text-align: center;}
  .search-input{ width: calc(100% - 170px) }
</style>
