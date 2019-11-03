import VueRouterBuilder from '@/core/libs/vueRouterBuilder'

const routerList = [
  {name: 'TestChart_Edit',title:'edit', path: './edit', vue: 'edit.vue'},
  {name: 'TestChart_Add', title:'add',path: './add', vue: 'add.vue'}
]

const vueRouters = new VueRouterBuilder('TestChart', routerList).getRouters()

export default vueRouters
