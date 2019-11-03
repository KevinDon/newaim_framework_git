import VueRouterBuilder from '@/core/libs/vueRouterBuilder'

const subRouters = [
  {name: 'Account', path: './', icon:'el-icon-user',vue: 'components/testGrid/grid.vue'},
]

const vueRouters = new VueRouterBuilder('Account',subRouters).getRouters()

export default vueRouters
