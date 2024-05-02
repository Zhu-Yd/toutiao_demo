import request from '@/utils/request'
/*
* 获取用户搜索历史记录
* */
export const getUserHistory = () => {
  return request({
    method: 'get',
    url: '/user/history'
  })
}

/*
* 添加用户搜索历史记录
* */
export const addUserHistory = (data) => {
  return request({
    method: 'post',
    url: '/user/history',
    data
  })
}

/*
* 删除用户搜索历史记录
* */
export const deleteUserHistory = (data) => {
  return request({
    method: 'delete',
    url: '/user/history',
    data
  })
}

/*
* 获取搜索推荐
* */
export const getRecommendSearch = (params) => {
  return request({
    method: 'get',
    url: '/user/recommend',
    params
  })
}

/*
* 获取文章搜索结果
* */
export const searchArticles = (params) => {
  return request({
    method: 'get',
    url: '/article/search',
    params
  })
}
