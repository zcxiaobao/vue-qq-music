const storage = window.localStorage
class LocalStor {
  get(key, def = '') {
    let tmp = storage.getItem(key)
    let val = null
    try {
      val = JSON.parse(tmp)
    } catch (e) {
      val = tmp
    }
    if (!val) {
      return def
    }
    return val
  }
  set(key, val) {
    storage.setItem(key, JSON.stringify(val))
  }
  clear() {
    storage.clear()
  }
  removeItem(key) {
    storage.removeItem(key)
  }
}

export default new LocalStor()
