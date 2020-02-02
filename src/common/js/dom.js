// 元素 class操作
export const hasClass = (el, className) => {
  return el.classList.contains(className)
}
export const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return
  }
  el.classList.add(className)
}

// html data-xxx 值的get及set
export const htmlDataGetOrSet = (el, key, val) => {
  const attrPrefix = 'data-'
  if (!val) {
    return el && el.getAttribute(attrPrefix + key)
  } else {
    el.setAttribute(attrPrefix + key, val)
  }
}

// js添加css前缀(能力检测)
const elemmentStyle = document.createElement('div').style
const vendor = (() => {
  const transforms = {
    'webkit': 'webkitTransform',
    'moz': 'mozTransform',
    'o': 'oTransform',
    'ms': 'msTransform',
    'standard': 'transform'
  }
  for (let key in transforms) {
    if (elemmentStyle[transforms[key]] !== undefined) {
      return key
    }
  }
  return false
})()
export const prefixStyle = (style) => {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
