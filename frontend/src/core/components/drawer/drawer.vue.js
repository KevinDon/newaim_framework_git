import baseDataComp from '@/core/components/baseData/baseData';
import DrawerStore from './drawer.store.js';

let defaultPropConf = { position: 'right' };

export default {
    name: 'drawer.vue',
    extends: baseDataComp,
    compInnerStore: DrawerStore,
    props: {
        conf: {
            type: Object,
            default: () => defaultPropConf
        }
    },
    data() {
        return {};
    },
    mounted() {
        let vm = this;
    },
    methods: {
        handleClose() {
            let vm = this;

            vm.$emit('drawerClosed');
        },
        handleOpen() {
            let vm = this;

            vm.$emit('drawerOpened');
        }
    }
};
