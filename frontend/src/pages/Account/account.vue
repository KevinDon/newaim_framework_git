<template>
  <div>
    <template>
      <grid
        :gridData = 'accountInfo'
        :gridConf = 'gridConf'
      ></grid>
    </template>
  </div>
</template>

<script>

import grid from '@/core/components/grid/grid.vue';

export default {
    name: 'accounts.vue',
    components: {
        grid: grid
    },
    data() {
        return {
            conf: {
                urlList : 'http://localhost:8080/api/accounts/list'
            },
            gridConf: {
                editable: true,
                columns : [
                    { field: 'account', title:'Account', sort: true },
                    { field: 'first_name', title:'First Name' },
                    { field: 'last_name', title:'Last Name', width: '180' },
                    { field: 'email', title:'Email', sort: true },
                    { field: 'department', title:'Department' }
                ]
            },
            accountInfo: []
        };
    },
    mounted() {
        let me = this;

        this.$http.get(me.conf.urlList).then(function (response) {

            if (response.success === true) {
                me.accountInfo = response.data;
            } else {

            }
        }).catch(function (error) {

            me.accountInfo = [];
        });
    },
    methods: {

    },
    computed: {

    }
};
</script>

<style scoped>

</style>
