import Mock from 'mockjs'
import qs from 'qs'

// 获取搜索推荐
Mock.mock(/\/user\/recommend/, 'get', config => {
  // console.log(config)
  const resList = []
  const params = qs.parse(config.url.split('?')[1])
  // console.log(params)
  for (let i = 0; i < 5; i++) {
    resList.push(params.keys + Mock.mock('@cword(3)'))
  }
  return resList
})
