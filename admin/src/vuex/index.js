import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import about from './modules/about'
import admin from './modules/admin'
import category from './modules/category'
import comment from './modules/comment'
import reply from './modules/reply'
import article from './modules/article'
import advertise from './modules/advertise'
import column from './modules/column'
import chapter from './modules/chapter'
import section from './modules/section'

Vue.use(Vuex);

const state = {
  main_loading: false,
  picture_modal: {
    picture: null,
    modal: false
  },
}

const mutations = {
  /**
   * 修改loading状态
   * @param state
   * @param data
   */
  [types.SET_MAIN_LOADING](state, data) {
    state.main_loading = data
  },

  /**
   * 图集显示
   * @param state
   * @param data
   */
  [types.SET_PICTURE_MODAL](state, data) {
    state.picture_modal = data
  }

}

const actions = {
  setMainLoading({commit}, data) {
    commit(types.SET_MAIN_LOADING, data)
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    about,
    admin,
    article,
    comment,
    reply,
    category,
    advertise,
    column,
    chapter,
    section
  }
});
