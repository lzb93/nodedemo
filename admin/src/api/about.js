import fetch from './fetch';

export default {
  // 获取关于我们列表
  list(params) {
    return fetch.get('/about', params)
  },
  // 获取关于我们详情
  detail(params) {
    const {id} = params;
    delete params.id;

    return fetch.get('/about/' + id, params);
  },

  // 更新关于我们
  update(params) {
    const {id} = params;
    delete params.id;
    return fetch.put('/about/' + id, params)
  },

  // 删除关于我们
  destroy(id) {
    return fetch.delete('/about/' + id)
  },

  // 创建关于我们
  create(params) {
    return fetch.post('/about', params);
  }
}
