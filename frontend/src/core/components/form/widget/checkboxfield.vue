<template>
    <!-- 复选框 -->
    <el-checkbox-group
            v-if="item.type==='Checkbox'"
            :style="{width: item.width}"
            v-model="searchData[item.prop]"
    >
        <el-checkbox
            v-for="ch in item.checkboxs"
            :label="ch.value"
            :key="ch.value"
        >{{ch.label}}</el-checkbox>

    </el-checkbox-group>
</template>

<script>
export default {
    name: 'checkboxfield',
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
