import Vue from 'vue'
import Vuex from 'vuex'
import Settings from '@/settings'
Vue.use(Vuex)
const modules = {};

try {
  if (Settings.settings.apps.length > 0) {
    Settings.settings.apps.map(item => {

      modules[item] = `@/apps/${item}/store`
    })
  }
} catch (e) {

}



// 创建Vuex实例
const store = new Vuex.Store({
  modules: modules,
  strict: process.env.NODE_ENV !== "production",
  state: {
    // 遮罩状态
    fullloading: false,
    // 模块名称
    moduleName: 'login',

    // 用户信息
    access_token: '',
    address: '',
    binding: true,
    country: '',
    created_at: '',
    email: '',
    id: 1,
    name: '',
    phone: '',
    postcode: '',
    shopify_id: 0,
    state: '',
    suburb: '',
    updated_at: '',
    website: '',

    // 登录状态
    longinLtype: false,

    // 更新设置
    update_price: true,
    update_stock: true,
    update_product: true,

    allProductQty: 0, // 总产品数
    allProduct: [], // 总产品
    productList: [],
    viewProductId: 1664,

    // 翻页参数
    total_count: 0,
    limit: 40,
    page_no: 1,

    categoryId: 0,
    globalsearch: false
  },
  mutations: {
    // 显示loading遮罩
    showloadingMask (state) {
      state.fullloading = true
    },
    // 隐藏loading遮罩
    hideloadingMask (state) {
      state.fullloading = false
    },
    // 处理登录
    handleLogin (state, email) {
      state.email = email
    },
    // 查询产品
    checkproduct (state, products) {
      state.allProduct = products
    },
    // 获取用户信息
    getuserInfo (state, userInfo) {
      Object.assign(state, userInfo)
    },
    // 显示全局搜索
    showGlobalSearch (state) {
      state.globalsearch = true
    },
    // 隐藏全局搜索
    hideGlobalSearch (state) {
      state.globalsearch = false
    },
    // 更新产品列表
    updateProductList (state, list) {
      state.total_count = list.total_count
      // state.page_no = list.cur_page

      state.productList = [...list.data]
    }
  },
  actions: {
    // loading遮罩
    showloadingMask (context) {
      context.commit('showloadingMask')
    },
    // 隐藏loading遮罩
    hideloadingMask (context) {
      context.commit('hideloadingMask')
    },
    // 处理登录
    handleLogin (context, userInfo) {
      context.commit('handleLogin', userInfo)
    },
    // 查询产品
    checkproduct (context, products) {
      context.commit('checkproduct', products)
    },
    // 获取用户信息
    getuserInfo (context, userInfo) {
      context.commit('getuserInfo', userInfo)
    },
    // 显示全局搜索
    showGlobalSearch (context) {
      context.commit('showGlobalSearch')
    },
    // 隐藏全局搜索
    hideGlobalSearch (context) {
      context.commit('hideGlobalSearch')
    },
    // 更新产品列表
    updateProductList (context, list) {
      context.commit('updateProductList', list)
    }
  }
})

export default store
