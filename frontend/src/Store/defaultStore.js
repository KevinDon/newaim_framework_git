// 系统 store
const state = {
  //  本地配置
  localConfig: [],
  //  全局 loading
  globalLoadingSwitch: {
    type: Boolean,
    default: false
  },
}

const getters = {
  /**
   * 获取配置内容
   * @param state
   * @returns {number[]|*|null}
   */
  getConfig: state => state.localConfig || null,
  /**
   * 获取当前路由对象
   * @param state
   * @returns {state.curRouter|{}|*|null}
   */
}

const mutations = {
  /**
   * 初始化配置
   * @param state
   * @param payload
   * @constructor
   */
  INIT_CONFIG: (state, payload) => {
    state.localConfig = {
      ...payload
    }
  },
  /**
   * 更新配置
   * @param state
   * @param payload
   * @constructor
   */
  UPDATE_CONFIG: (state, payload) => {
    state.localConfig = {
      ...payload
    }
  },
  /**
   * 更新单一项目
   * @param state
   * @param payload
   * @constructor
   */
  UPDATE_ITEM: (state, payload) => {
    state[payload['name']] = payload['value']
  }

}

const actions = {
  init: (content, payload) => {
    content.commit('INIT_CONFIG', payload)
  },

  toggleGlobalLoading: (content, payload) => {
    content.commit('UPDATE_ITEM', {
      name: 'globalLoadingSwitch',
      value: !payload
    })
  }

}

export default {
  state,
  getters,
  mutations,
  actions,
}
