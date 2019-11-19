const {Op} = require('sequelize')

const {About} = require('../models/about')

// 定义文章模型
class AboutDao {

  // 创建文章
  static async create(v) {

    // 检测是否存在文章
    const hasAbout = await About.findOne({
      where: {
        title: v.get('body.title'),
        deleted_at: null
      }
    });

    // 如果存在，抛出存在信息
    if (hasAbout) {
      throw new global.errs.Existing('文章已存在');
    }

    // 创建文章
    const about = new About();

    about.title = v.get('body.title');
    about.author = v.get('body.author');
    about.description = v.get('body.description');
    about.content = v.get('body.content');
    about.cover = v.get('body.cover');
    about.browse = v.get('body.browse');
    about.category_id = v.get('body.category_id');

    about.save();
  }

  // 获取文章列表
  static async list(params = {}) {
    const {
      category_id,
      keyword,
      page = 1,
      pageSize = 10,
      desc = 'created_at'
    } = params;

    // 筛选方式
    let filter = {
      deleted_at: null
    };

    // 筛选方式：存在分类ID
    if (category_id) {
      filter.category_id = category_id;
    }

    // 筛选方式：存在搜索关键字
    if (keyword) {
      filter.title = {
        [Op.like]: `%${keyword}%`
      };
    }
    const about = await About.scope('iv').findAndCountAll({
      limit: pageSize,//每页10条
      offset: (page - 1) * pageSize,
      where: filter,
      order: [
        [desc, 'DESC']
      ]
    });

    return {
      data: about.rows,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: about.count,
        total: about.count,
        total_pages: Math.ceil(about.count / 10),
      }
    };
  }

  // 删除文章
  static async destroy(id) {
    // 检测是否存在文章
    const about = await About.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    // 不存在抛出错误
    if (!about) {
      throw new global.errs.NotFound('没有找到相关文章');

    }

    // 软删除文章
    about.destroy()
  }

  // 更新文章
  static async update(id, v) {
    // 查询文章
    const about = await About.findByPk(id);
    if (!about) {
      throw new global.errs.NotFound('没有找到相关文章');
    }

    // 更新文章
    about.title = v.get('body.title');
    about.author = v.get('body.author');
    about.description = v.get('body.description');
    about.content = v.get('body.content');
    about.cover = v.get('body.cover');
    about.browse = v.get('body.browse');
    about.category_id = v.get('body.category_id');

    about.save();
  }

  // 更新文章浏览次数
  static async updateBrowse(id, browse) {
    // 查询文章
    const about = await About.findByPk(id);
    if (!about) {
      throw new global.errs.NotFound('没有找到相关文章');
    }
    // 更新文章浏览
    about.browse = browse;

    about.save();
  }

  // 文章详情
  static async detail(id) {
    const about = await About.findOne({
      where: {
        id
      }
      
    });

    if (!about) {
      throw new global.errs.NotFound('没有找到相关文章');
    }

    return about;
  }

}

module.exports = {
  AboutDao
}
