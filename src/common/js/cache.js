import storage from './local-storage.js'
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const LATER_PLAYLIST_KEY = '__laterPlaylist__'
const LATER_MAX_LEN = 200

const FAVORITE_KEY = '__favourite__'
const FAVORITE_MAX_LEN = 200

function insertArray(arr, val, compare, maxLen) {
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

function delArrayItem(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
export const loadSearchHis = () => {
  return storage.get(SEARCH_KEY, [])
}

export const saveSearch = query => {
  let searchHisList = storage.get(SEARCH_KEY, [])
  insertArray(
    searchHisList,
    query,
    item => {
      return item === query
    },
    SEARCH_MAX_LEN
  )
  storage.set(SEARCH_KEY, searchHisList)
  return searchHisList
}

export const delSearch = query => {
  let searchHisList = storage.get(SEARCH_KEY, [])
  delArrayItem(searchHisList, item => {
    return item === query
  })
  storage.set(SEARCH_KEY, searchHisList)
  return searchHisList
}

export const clearSearch = () => {
  storage.removeItem(SEARCH_KEY)
  return []
}

export const loadLaterPlayList = () => {
  return storage.get(LATER_PLAYLIST_KEY, [])
}

export const saveLaterPlay = function(song) {
  let laterPlayList = storage.get(LATER_PLAYLIST_KEY, [])
  insertArray(
    laterPlayList,
    song,
    s => {
      return s.id === song.id
    },
    LATER_MAX_LEN
  )
  storage.set(LATER_PLAYLIST_KEY, laterPlayList)
  return laterPlayList
}

export const delLaterPlay = song => {
  let laterPlayList = storage.get(LATER_PLAYLIST_KEY, [])
  delArrayItem(laterPlayList, s => {
    return s.id === song.id
  })
  storage.set(LATER_PLAYLIST_KEY, laterPlayList)
  return laterPlayList
}

export const loadFavouriteList = () => {
  return storage.get(FAVORITE_KEY, [])
}

export const saveFavourite = function(song) {
  let favouriteList = storage.get(FAVORITE_KEY, [])
  insertArray(
    favouriteList,
    song,
    s => {
      return s.id === song.id
    },
    FAVORITE_MAX_LEN
  )
  storage.set(FAVORITE_KEY, favouriteList)
  return favouriteList
}

export const delFavourite = song => {
  let favouriteList = storage.get(FAVORITE_KEY, [])
  delArrayItem(favouriteList, s => {
    return s.id === song.id
  })
  storage.set(FAVORITE_KEY, favouriteList)
  return favouriteList
}
// import storage from 'good-storage'

// const SEARCH_KEY = '__search__'
// const SEARCH_MAX_LEN = 15

// const PLAY_KEY = '__play__'
// const PLAY_MAX_LEN = 200

// const FAVORITE_KEY = '__favorite__'
// const FAVORITE_MAX_LEN = 200

// function insertArray(arr, val, compare, maxLen) {
//   const index = arr.findIndex(compare)
//   if (index === 0) {
//     return
//   }
//   if (index > 0) {
//     arr.splice(index, 1)
//   }
//   arr.unshift(val)
//   if (maxLen && arr.length > maxLen) {
//     arr.pop()
//   }
// }

// function deleteFromArray(arr, compare) {
//   const index = arr.findIndex(compare)
//   if (index > -1) {
//     arr.splice(index, 1)
//   }
// }

// export function saveSearch(query) {
//   let searches = storage.get(SEARCH_KEY, [])
//   insertArray(searches, query, (item) => {
//     return item === query
//   }, SEARCH_MAX_LEN)
//   storage.set(SEARCH_KEY, searches)
//   return searches
// }

// export function deleteSearch(query) {
//   let searches = storage.get(SEARCH_KEY, [])
//   deleteFromArray(searches, (item) => {
//     return item === query
//   })
//   storage.set(SEARCH_KEY, searches)
//   return searches
// }

// export function clearSearch() {
//   storage.remove(SEARCH_KEY)
//   return []
// }

// export function loadSearch() {
//   return storage.get(SEARCH_KEY, [])
// }

// export function savePlay(song) {
//   let songs = storage.get(PLAY_KEY, [])
//   insertArray(songs, song, (item) => {
//     return song.id === item.id
//   }, PLAY_MAX_LEN)
//   storage.set(PLAY_KEY, songs)
//   return songs
// }

// export function loadPlay() {
//   return storage.get(PLAY_KEY, [])
// }

// export function saveFavorite(song) {
//   let songs = storage.get(FAVORITE_KEY, [])
//   insertArray(songs, song, (item) => {
//     return song.id === item.id
//   }, FAVORITE_MAX_LEN)
//   storage.set(FAVORITE_KEY, songs)
//   return songs
// }

// export function deleteFavorite(song) {
//   let songs = storage.get(FAVORITE_KEY, [])
//   deleteFromArray(songs, (item) => {
//     return item.id === song.id
//   })
//   storage.set(FAVORITE_KEY, songs)
//   return songs
// }

// export function loadFavorite() {
//   return storage.get(FAVORITE_KEY, [])
// }
