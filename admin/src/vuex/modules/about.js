import about from '../../api/about'

const state = {}
const mutations = {}
const actions = {
  // 获取文章列表
  async getAboutList({state, commit}, params) {
    return about.list(params);
  },

  // 获取文章详情
  async getAbout({state, commit}, params) {
    return about.detail(params);
  },

  // 创建文章
  async createAbout({state, commit}, params) {
    return about.create(params);
  },

  // 更新文章
  async updateAbout({state, commit}, params) {
    return about.update(params);
  },

  // 删除文章
  async destroyAbout({state, commit}, id) {
    return about.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
