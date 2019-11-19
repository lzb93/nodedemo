const Router = require('koa-router');

const {
  AboutValidator,
  PositiveIdParamsValidator,
  AboutSearchValidator
} = require('../../validators/about');

const {Auth} = require('../../../middlewares/auth');
const {AboutDao} = require('../../dao/about');
const {CommentDao} = require('../../dao/comment');
const {ColumnDao} = require('../../dao/column');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})

/**
 * 创建文章
 */
router.post('/about', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new AboutValidator().validate(ctx);

  // 创建文章
  await AboutDao.create(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('创建文章成功');
});

/**
 * 删除文章
 */
router.delete('/about/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取文章ID参数
  const id = v.get('path.id');
  // 删除文章
  await AboutDao.destroy(id);

  ctx.response.status = 200;
  ctx.body = res.success('删除文章成功');
})

/**
 * 更新文章
 */
router.put('/about/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取文章ID参数
  const id = v.get('path.id');
  // 更新文章
  await AboutDao.update(id, v);

  ctx.response.status = 200;
  ctx.body = res.success('更新文章成功');
})


/**
 * 获取文章列表
 */
router.get('/about', async (ctx) => {
  // 获取页码，排序方法，分类ID，搜索关键字
  // 查询文章列表
  const aboutList = await AboutDao.list(ctx.query);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(aboutList);
});

/**
 * 查询文章详情
 */
router.get('/about/:id', async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取文章ID参数
  const id = v.get('path.id');
  // 查询文章
  const about = await AboutDao.detail(id);

  // 获取关联此文章的评论列表
  const commentList = await CommentDao.targetComment({
    target_id: id,
    target_type: 'about'
  });

  // 更新文章浏览
  await AboutDao.updateBrowse(id, ++about.browse);
  await about.setDataValue('about_comment', commentList);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(about);
})

/**
 * 返回首页的文章和专栏
 */
router.get('/home', async (ctx) => {
  // 查询文章
  const about = await AboutDao.list();
  const column = await ColumnDao.list({
    pageSize: 2
  })
  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json({
    column: column.data,
    about: about.data
  });
})


module.exports = router
