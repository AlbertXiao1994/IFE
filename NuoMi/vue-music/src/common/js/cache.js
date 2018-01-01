import storage from 'good-storage'

// 搜索
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

// 播放历史
const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

// 收藏列表
const FAVORITE_KEY = '__like__'
const FAVORITE_MAX_LEN = 200

function insertToStorage(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (arr.length > maxLen) {
    arr.pop()
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertToStorage(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearchHistory() {
  return storage.get(SEARCH_KEY, [])
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteElement(searches, query, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

function deleteElement(arr, query, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function loadPlayHistory() {
  return storage.get(PLAY_KEY, [])
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertToStorage(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}

export function saveFavorite(song) {
  let favorites = storage.get(FAVORITE_KEY, [])
  insertToStorage(favorites, song, (item) => {
    return item.id === song.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, favorites)
  return favorites
}

export function deleteFavorite(song) {
  let favorites = storage.get(FAVORITE_KEY, [])
  deleteElement(favorites, song, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, favorites)
  return favorites
}