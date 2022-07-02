import request from '@/utils/request'

/**
 * 获取搜索联想建议
 */
export const getSearchSuggestion = q => {
  return request({
    method: 'GET',
    url: 'suggestion',
    params: {
      q
    }
  })
}
/**
 * 获取搜索结果列表
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    method: 'GET',
    url: 'search',
    params: {
      page, per_page, q
    }
  })
}
