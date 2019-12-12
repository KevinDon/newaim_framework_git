<template>
  <!-- 下拉框 -->
  <el-select
        clearable v-if="item.xtype==='combo'"
        :placeholder="item.placeholder"
        v-model="searchData[item.prop]"
        :style="{width: item.width}"
        :size="size"
        @change="item.change(searchData[item.prop])"
  >
    <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"></el-option>
  </el-select>
</template>

<script>
export default {
    name: 'combofield',
    props: {
        item: {
            type: Object,
            default: () => {
                return {};
            }
        }
    }
};
</script>

<style scoped>

</style>
