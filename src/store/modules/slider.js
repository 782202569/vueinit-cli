import * as types from '../mutation-types'

const state = {
  sliderName: '',
  isgetsliderName: false,
  currentMenuName: '首页界面',
}

const actions = {
  // 接收名字
  getSliderName({ commit }, obj) {
    commit(types.SLIDER_NAME_TIP, { obj })
  },
  quitSliderName({ commit }) {
    commit(types.SLIDER_NAME_OUT)
  },
}
const mutations = {
  [types.SLIDER_NAME_TIP](state, { obj }) {
    state.sliderName = obj
    state.isgetsliderName = true
  },
  [types.SLIDER_NAME_OUT](state) {
    state.sliderName = ''
    state.isgetsliderName = false
  },
  /*
   * 设置菜单
   * @param {String} menuName 菜单名称
   * */
  setCurrentMenuName: function(state, { menuName }) {
    state.currentMenuName = menuName
  },
}

const getters = {
  sliderName: (state) => {
    return state.sliderName
  },
  currentMenuName: (state) => {
    return state.currentMenuName
  },
}

export default {
  state,
  actions,
  mutations,
  getters: getters,
}
