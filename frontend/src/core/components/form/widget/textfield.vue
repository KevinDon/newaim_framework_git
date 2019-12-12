<template>
  <el-form-item :label="label">
    <el-input v-model="val"></el-input>
  </el-form-item>
</template>

<script>
export default {
    name: 'textfield',
    props: {
        label: {
            type: String
        },
        value: {
            type: String
        }
    },
    data() {
        return {
            val: ''
        };
    },
    mounted() {},
    watch: {
        val: function(nv, ov) {
            let me = this;

            console.debug('值更改 %s => %s', ov, nv);
            me.$emit('changed', nv);
        }
    },
    computed: {}
};
</script>

<style scoped>
</style>
