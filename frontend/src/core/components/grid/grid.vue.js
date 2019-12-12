export default {
    name: 'grid.vue',
    components: {},
    props: {
        gridColumns:{
            type:Array
        },
        gridData: {
            type: Array
        },
        gridConf: {
            curPage: 1,
            pageSize: 25,
            sortField: '_id',
            sortValue: 'descending'
        },
        gridState: {
            loading: false
        },
        gridToolbarConf: {
            type: Array,
            default: []
        },
        gridLoading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            toolbarList: []
        };
    },
    mounted() {},
    methods: {
        handleClick(index, row) {},
        handleGridSortChange(column, prop, order) {
            this.gridConf.sortField = column.prop;
            this.gridConf.sortValue = column.order;
            // console.debug('Grid sort change',column,prop,order,this.gridConf);
            this.$emit('gridSortChange', this.gridConf);
        },
        handlePageSizeChange(size) {
            //  分页大小
            console.debug('Grid page size had changed', size);
            this.gridConf.pageSize = size;
            this.$emit('gridPageSizeChange', this.gridConf);
        },
        handleCurrentChange(curPage) {
            //  页码改变
            this.gridConf.curPage = curPage;
            this.$emit('gridPageCurrentChange', this.gridConf);
        },
        handleGridRefresh() {
            //  表格刷新
            console.debug('Grid refresh');
            this.$emit('gridRefresh', this.gridConf);
        },
        handleTBAddItem() {
            //  新增item
            console.debug('Grid add item');
        },
        toolbarSort(tbList) {
            console.debug('tbList', tbList);
            let vm = this;
            let tbMapping = {};

            vm.toolbarList
                .filter(_tb => tbList.indexOf(_tb.name) >= 0)
                .map(value => {
                    console.debug('Grid tbMapping ', tbList.indexOf(value.name), value);
                    if (tbList.indexOf(value.name) >= 0) {
                        tbMapping[tbList.indexOf(value.name)] = value;
                    }
                });
            return tbMapping;
        }
    },
    watch: {
        gridData(data) {
            console.debug('Grid data has changed', data);
            this.gridLoading = false;
            this.$emit('gridDataChanged', data);
        }
    },
    computed: {
    }
};
