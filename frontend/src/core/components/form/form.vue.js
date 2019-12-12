export default {
    name: 'form.vue',
    components: {
        textfield: () => import('@/core/components/form/widget/textfield.vue')
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
        let vm = this;

        console.log('from组件传参', vm.$props);
        //  根据 formField 初始化 字段值容器
        debugger;
        vm.formField.forEach(item => {
            vm.$set(this.innerData, item['header'], '');
        });
    },
    watch: {
    },
    methods: {
        handleClick(index, row) {

        }
    }
};
