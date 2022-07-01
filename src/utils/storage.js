// 封装本地存储的工具
/**
 * 获取
 * @param {*} key
 * @returns
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    console.log(err)
  }
}
/**
 * 获取
 * @param {*} key
 * @param {*} value
 */
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
/**
 * 根据key删除本地存储中其中的一个
 * @param {*} key
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
/**
 * 删除所有本地存储
 */
export function clearItem () {
  window.localStorage.clearItem()
}
