import request from '@/utils/request'

/**
 * 根据ID查文章
 * @param {*} article_id
 * @returns
 */
export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}

/**
 * 关注用户
 * @param {*} target
 * @returns
 */
export const addFollowUser = (target) => {
  return request({
    method: 'POST',
    url: '/user/followings/',
    data: {
      target
    }
  })
}
/**
 * 取消关注用户
 * @param {*} target
 * @returns
 */
export const delFollowUser = (target) => {
  return request({
    method: 'DELETE',
    url: `/user/followings/${target}`
  })
}

/**
 * 收藏文章
 * @param {*} target
 * @returns
 */
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}
/**
 * 取消文章收藏
 * @param {*} target
 * @returns
 */
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
  })
}
