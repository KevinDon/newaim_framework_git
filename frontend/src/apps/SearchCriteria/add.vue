<template>
  <div id="SearchCriteriaAdd">
    <el-container>
      <el-header>Search Criteria Add</el-header>
      <el-main>
        <el-form>
          <template v-for="column in columns">
            <el-form-item :label="column.title">
              <el-input v-model="form[column.name]"></el-input>
            </el-form-item>
          </template>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'add.vue',
    props:{
      columns:{
        type:Array
      }
    },
    data(){
      return{
        // columns: [
        //   {field: '_id', title: 'ID', sort: true},
        //   {field: 'ComboSearchID', title: 'ComboSearchID'},
        //   {field: 'ComboSearchName', title: 'ComboSearchName', width: '180'},
        //   {field: 'UserID', title: 'User ID', sort: true},
        //   {
        //     field: 'Active', title: 'Active', renderer: val => {
        //       return (val + '') === '1' ? 'Yes' : 'No'
        //     }
        //   },
        //   {field: 'AddTime', title: 'AddTime'},
        // ],
        form:{

        }
      }
    }
  }
</script>

<style scoped>
</style>
