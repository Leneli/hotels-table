const storage = window.localStorage

export function save (key, value) {
  if (typeof value === 'object') value = JSON.stringify(value)

  storage.setItem(key, value)
}

export function saveMulti (datas) {
  datas.forEach(data => save(data.key, data.value))
}

export function read (key) {
  var r = storage.getItem(key)

  if (r === 'true' || r === 'false' || !isNaN(r) && r !== '') { // eslint-disable-line no-mixed-operators
    return JSON.parse(storage.getItem(key))
  }

  return r
}

export function readMulti (keys) {
  return keys.map(key => read(key))
}

export function clear (key, clearAll = false) {
  if (clearAll) {
    storage.clear()
  } else {
    storage.removeItem(key)
  }
}

export function clearMulti (keys) {
  keys.forEach(key => clear(key))
}
