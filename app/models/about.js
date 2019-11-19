const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 关于我们模型
class About extends Model {

}

// 初始关于我们模型
About.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
    comment: '关于我们标题'
  },
  author: {
    type: Sequelize.STRING(30),
    allowNull: true,
    defaultValue: '梁凤波',
    comment: '关于我们作者'
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: '关于我们简介'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '关于我们内容'
  },
  cover: {
    type: Sequelize.STRING(100),
    allowNull: false,
    comment: '关于我们封面'
  },
  browse: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '关于我们浏览次数'
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  modelName: 'about',
  tableName: 'about'
})

// // 文章关联分类
// Category.hasMany(About, {
//   foreignKey: 'category_id', sourceKey: 'id', as: 'article'
// })
// About.belongsTo(Category, {
//   foreignKey: 'category_id', targetKey: 'id', as: 'category'
// })

module.exports = {
  About
}
