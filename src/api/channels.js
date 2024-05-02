import request from '@/utils/request'
/*
* 获取全部频道列表
* */
export const getAllChannels = () => {
  return request({
    method: 'get',
    url: '/channel/getAllChannels'
  })
}

/*
* 修改用户频道列表
* */
export const updateChannels = (data) => {
  return request({
    method: 'put',
    url: '/channel/channels',
    data
  })
}
