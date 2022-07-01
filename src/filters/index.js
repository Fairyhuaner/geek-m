import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const dateformat = (time) => {
  return dayjs(time).fromNow()
}
