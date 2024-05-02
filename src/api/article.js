import request from '@/utils/request'
/*
* 获取文章列表
* */
export const getAticles = (params) => {
  return request({
    method: 'get',
    url: '/article/articles',
    params
  })
}

/*
* 获取文章详情
* */
export const getArticleDetail = (articleId) => {
  return request({
    method: 'get',
    url: `/article/${articleId}`
  })
}

/*
* 点赞/取消点赞 文章
* data.type:操作行为 1点赞 0取消点赞
* data.like_type:点赞类型 0文章 1评论
* data.target:点赞目标id
* */
export const likingArticle = (data) => {
  return request({
    method: 'post',
    url: '/article/likings',
    data
  })
}

/*
* 收藏/取消收藏 文章
* data.type:操作行为 1收藏 0取消收藏
* data.target:点赞目标id
* */
export const collectedArticle = (data) => {
  return request({
    method: 'post',
    url: '/article/collections',
    data
  })
}

/*
* 添加|回复 评论
* data.art_id
* data.target
* data.content 评论内容
* */
export const addComments = (data) => {
  return request({
    method: 'post',
    url: '/article/comments',
    data
  })
}

/*
* 获取 回复|评论
* params.type
* params.source
* */
export const getComments = (params) => {
  return request({
    method: 'get',
    url: '/article/comments',
    params
  })
}

/*
* 获取指定 回复|评论
* params.target
* */
export const getComment = (params) => {
  return request({
    method: 'get',
    url: '/article/comment',
    params
  })
}

/*
* 获取 评论 数量
* params.target
* */
export const getCommentsCount = (params) => {
  return request({
    method: 'get',
    url: '/article/comments_count',
    params
  })
}
