<template>
  <div id="SearchCriteriaAdd">
    <el-container>
      <el-header>Search Criteria Add</el-header>
      <el-main>
        <na-form
          :formData='formData'
          :formConf='formConf'
          :formField='formField'
        >
        </na-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import form from '@/core/components/form/form.vue';
export default {
    components: {
        'na-form': form
    },
    name: 'add.vue',
    props: {
        columns: {
            type: Array
        }
    },
    data() {
        return {
            conf: {
                urlSave: 'http://localhost:8080/api/accounts/save'
            },
            formData: {},
            formConf: {},
            formField: [{ header: 'ComboSearchID', xtype: 'displayfield' },
                { header: 'ComboSearchName', xtype: 'textfield' },
                { header: 'Active', xtype: 'combo' }]
        };
    }
};
</script>

<style scoped>
</style>
