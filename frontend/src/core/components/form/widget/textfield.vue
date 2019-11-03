<template>
  <el-form-item :label="label">
    <el-input></el-input>
  </el-form-item>
</template>

<script>
    export default {
        name: "textfield",
        props: {
            label:{
                type: String
            },
        },
        data() {
            return {
                value: 'text'
            };
        },
        mounted(){

        },
        watch:{

        }
    }
</script>

<style scoped>

</style>
