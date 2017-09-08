import storage from 'good-storage'
// 搜索历史及最大长度
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15
// 播放历史及最大长度
const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200
// 收藏及最大长度
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

// 添加一个搜索条件
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}
// 向数组里插入数据
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  } else if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

// 删除某个搜索条件
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 获取localStorage里保存的搜索条件
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 删除所有的搜索历史
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 存储播放历史记录
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}
// 读取播放历史
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

// 添加收藏
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}
// 删除收藏
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}
// 加载收藏
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}