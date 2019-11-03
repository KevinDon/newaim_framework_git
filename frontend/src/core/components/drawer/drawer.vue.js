export default {
  name: 'drawer.vue',
  props:{
    conf:{

    },
    state:{
      isShow:{
        type:Boolean
      }
    }
  },
  data(){
    return{
      isShowed:false
    }
  },
  methods:{
    handleClose(){
      let vm = this
      vm.$emit('drawerClosed')
    },
    handleOpen(){
      let vm = this
      vm.$emit('drawerOpened')
    }
  }

}
