import request from '@/utils/request'

export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}
/**
 * 获取文章新闻推荐
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: {
      channel_id,
      timestamp
    }
  })
}
export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}
export const saveChannels = (channels) => {
  return request({
    url: 'user/articles',
    data: {
      channels
    }
  })
}
