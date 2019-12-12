<template>
    <!--  输入框 -->
    <el-form-item :label="item.header">
        <el-input v-model="val" :placeholder="item.placeholder" :style="{width: item.width}"></el-input>
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
        },
        item : {
            type: Object,
            default: () => {
                return {
                    placeholder: '',
                    width: 200
                };
            }
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
