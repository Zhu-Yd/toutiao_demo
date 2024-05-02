import request from '@/utils/request'
/*
* 登录接口
* */
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/login',
    data
  })
}

/*
* 获取用户信息接口
* */
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/user/profile'
  })
}

/*
* 获取指定用户信息接口
* */
export const getTargetUserInfo = (id) => {
  return request({
    method: 'get',
    url: `/user/profile/${id}`
  })
}

/*
* 获取用户频道信息
* */
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: 'channel/channels'
  })
}

/*
* 关注用户
* */
export const followUser = (data) => {
  return request({
    method: 'post',
    url: '/user/followings',
    data
  })
}

/*
* 取消关注用户
* */
export const unFollowUser = (toUserId) => {
  return request({
    method: 'delete',
    url: `/user/followings/${toUserId}`
  })
}

/*
* 修改用户信息
* */
export const updateUserInfo = (data) => {
  return request({
    method: 'patch',
    url: '/user/profile',
    data
  })
}
