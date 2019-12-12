import VueRouterBuilder from '@/core/libs/vueRouterBuilder';

const subRouters = [{ name: 'SearchCriteria', title: 'list', path: './', vue: 'list.vue' },
    { name: 'SearchCriteriaAdd', title: 'add', path: './add', vue: 'add.vue' }];

const vueRouters = new VueRouterBuilder('SearchCriteria', subRouters).getRouters();

export default vueRouters;
