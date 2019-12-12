<template>
  <div id="SearchCriteriaList">
    <el-container>
      <el-header>Search Criteria List</el-header>
      <el-main>
        <el-popover placement="right" width="400" trigger="click">
          <el-checkbox
            :label="f.title"
            v-for="(f,k) in searchCriteriaGridConf.columns"
            :key="k"
            v-model="f.visable"
          ></el-checkbox>
          <el-button slot="reference">click 激活</el-button>
        </el-popover>
        <grid
          :gridData="searchCriteriaGridData"
          :gridConf="searchCriteriaGridConf"
          :gridState="searchCriteriaGridState"
          :gridLoading.sync="searchCriteriaGridState.loading"
          :gridToolbarConf="[['addItem','exportCsv'],['refresh']]"
          @gridPageSizeChange="handleQueryChange"
          @gridPageCurrentChange="handleQueryChange"
          @gridSortChange="handleQueryChange"
          @gridRefresh="loadListData"
        >
          <template #gridToolBar v-slot:default="slotProps">
            <el-button-group>
              <el-tooltip content="Grid Fields Settings">
                <el-button
                  @click="drawerState.isShow = !drawerState.isShow"
                  icon="el-icon-setting"
                  size="mini"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="New Search Criteria">
                <el-button
                  @click="newItem.isShow = !newItem.isShow"
                  icon="el-icon-plus"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </grid>
        <drawer ref="drawerAdd" :compState="drawerState" @drawerClosed="drawerState.isShow=false">
          <template #drawerMain>
            <add-page :columns.sync="addpageColumns"></add-page>
          </template>
        </drawer>
        <dialog-new-search-criteria ref="dialogAdd" :compState="newItem" @dialogClosed="newItem.isShow=false">
          <template #dialogMain>
            <add-page :columns.sync="addpageColumns"></add-page>
          </template>
        </dialog-new-search-criteria>
      </el-main>
      <el-footer>
        <label for>
          组合查询条件
          <pre>{{searchCriteriaGridConf}}</pre>
        </label>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import SearchCriteriaModel from './models/searchCriteriaModel';
import SearchCriteriaApi from './apis/searchCriteriaApi';

export default {
    name: 'list.vue',
    components: {
        Grid: () => import('@/core/components/grid/grid.vue'),
        Drawer: () => import('@/core/components/drawer/drawer.vue'),
        DialogNewSearchCriteria: () =>
      import('@/core/components/dialog/dialog.vue'),
        AddPage: () => import('./add.vue')
    },
    mounted() {
        let me = this;
        let searchModel = new SearchCriteriaModel();

        console.debug(searchModel);
        me.searchCriteriaGridConf.columns = searchModel.fields;
    },
    data() {
        return {
            searchCriteriaGridData: [],
            searchCriteriaGridConf: {
                editable: true,
                columns: [
                    { field: '_id', title: 'ID', sort: true },
                    { field: 'ComboSearchID', title: 'ComboSearchID' },
                    { field: 'ComboSearchName', title: 'ComboSearchName', width: '180' },
                    { field: 'UserID', title: 'User ID', sort: true },
                    {
                        field: 'Active',
                        title: 'Active',
                        renderer: val => {
                            return String(val) === '1' ? 'Yes' : 'No';
                        }
                    },
                    { field: 'AddTime', title: 'AddTime' }
                ],
                totalRow: 0,
                pageSize: 25,
                curPage: 1,
                sortField: '_id',
                sortValue: 'ascending'
            },
            searchCriteriaGridState: {
                loading: false
            },
            drawerState: {
                isShow: false
            },
            newItem: {
                isShow: false
            }
        };
    },
    methods: {
        loadListData: async function(query) {
            let list = await SearchCriteriaApi.list(this, query, this.afterLoadListData);
            this.afterLoadListData(list);
        },
        afterLoadListData: function(list) {
            this.searchCriteriaGridData = list.data;
            this.searchCriteriaGridConf.totalRow = list.tr;
        },
        handleQueryChange: function(gridConf) {
            console.debug('SearchCriteriaList Query Changed', gridConf);
            this.loadListData(gridConf);
        }
    },
    computed: {
        getSearchCriteriaGridConfColumns: {
            get() {
                return this.searchCriteriaGridConf.columns.filter(c => Boolean(c.visable));
            }
        },
        addpageColumns: {
            get() {
                let me = this;

                return me.searchCriteriaGridConf.columns.filter(
                    c => c.field !== 'UserID'
                );
            }
        }
    }
};
</script>

<style scoped>
</style>
