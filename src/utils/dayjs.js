import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
dayjs.locale('zh-cn')

dayjs.extend(relativeTime)

Vue.filter('timeToNow', value => {
  return dayjs().to(dayjs(value))
})

Vue.filter('timeFormat', value => {
  return dayjs(value).format('MM-DD HH:mm')
})

Vue.filter('dayFormat', value => {
  return dayjs(value).format('YYYY-MM-DD')
})
