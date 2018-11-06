/**
 * 存储localStorage
 */
export const setStore = (name, value) => {
  if (!name || typeof name !== 'string') return
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(name, value)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name || typeof name !== 'string') return
  return localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name || typeof name !== 'string') return
  localStorage.removeItem(name)
}
