export default {
    name: 'form.vue',
    components: {
        //输入框
        textfield: () => import('@/core/components/form/widget/textfield.vue'),
        //下拉框
        combofield: () => import('@/core/components/form/widget/combofield.vue')
    },
    props: {
        formData: {

        },
        formConf: {

        },
        formField: {
            type: Array
        }
    },
    data() {
        return {
            innerData:{}
        };
    },
    created() {
        let me = this;

        console.log('from组件传参', me.$props);
        //  根据 formField 初始化 字段值容器
        debugger;
        me.formField.forEach(item => {
            me.$set(this.innerData, item['header'], '');
        });
    },
    watch: {
    },
    methods: {
        handleClick(index, row) {

        }
    }
};
