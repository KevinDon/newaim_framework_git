<template>
  <div id="SearchCriteriaList">
    <el-container>
      <el-header>
        Search Criteria List
      </el-header>
      <el-main>
        <grid
          :gridData='searchCriteriaGridData'
          :gridConf='searchCriteriaGridConf'
          :gridState='searchCriteriaGridState'
          :gridLoading.sync='searchCriteriaGridState.loading'
          :gridToolbarConf="[['addItem','exportCsv'],['refresh']]"
          @gridPageSizeChange="handleQueryChange"
          @gridPageCurrentChange="handleQueryChange"
          @gridSortChange="handleQueryChange"
          @gridRefresh="loadListData"
        >
          <template #gridToolBar v-slot:default="slotProps">
            <el-button-group>
              <el-tooltip content="Grid Fields Settings">
                <el-button @click="drawerState.isShow = !drawerState.isShow" icon="el-icon-setting"
                           size="mini"></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </grid>
        <drawer
          :state="drawerState"
          @drawerClosed="drawerState.isShow=false">
          <template #drawerMain>
            <add-page :columns.sync="addpageColumns"></add-page>
          </template>
        </drawer>
      </el-main>
      <el-footer>
        <label for="">
          组合查询条件
          <pre>            {{searchCriteriaGridConf}}          </pre>
        </label>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import SearchCriteriaModel from './models/searchCriteriaModel'
  import SearchCriteriaApi from './apis/searchCriteriaApi'

  export default {
    name: 'list.vue',
    components: {
      Grid: () => import('@/core/components/grid/grid.vue'),
      Drawer: () => import('@/core/components/drawer/drawer.vue'),
      AddPage:()=>import('./add.vue')
    },
    mounted(){
      let vm = this;
      let searchModel = new SearchCriteriaModel()
      console.debug(searchModel);
      vm.searchCriteriaGridConf.columns = searchModel.fields
    },
    data () {
      return {
        searchCriteriaGridData: [],
        searchCriteriaGridConf: {
          editable: true,
          columns: [
            {field: '_id', title: 'ID', sort: true},
            {field: 'ComboSearchID', title: 'ComboSearchID'},
            {field: 'ComboSearchName', title: 'ComboSearchName', width: '180'},
            {field: 'UserID', title: 'User ID', sort: true},
            {
              field: 'Active', title: 'Active', renderer: val => {
                return (val + '') === '1' ? 'Yes' : 'No'
              }
            },
            {field: 'AddTime', title: 'AddTime'},
          ],
          totalRow: 0,
          pageSize: 25,
          curPage: 1,
          sortField: '_id',
          sortValue: 'ascending',
        },
        searchCriteriaGridState: {
          loading: false,
        },
        drawerState: {
          isShow: false,
        }
      }
    },
    methods: {
      loadListData: function (query) {
        let list = SearchCriteriaApi.list(this, query, this.afterLoadListData)
      },
      afterLoadListData: function (list) {
        this.searchCriteriaGridData = list.data
        this.searchCriteriaGridConf.totalRow = list.tr

      },
      handleQueryChange: function (gridConf) {
        console.debug('SearchCriteriaList Query Changed', gridConf)
        this.loadListData(gridConf)
      }
    },
    computed:{
      addpageColumns:{
        get(){
          let vm = this
          return vm.searchCriteriaGridConf.columns.filter(c=>c.field !="UserID")
        }
      }
    }
  }
</script>

<style scoped>

</style>
