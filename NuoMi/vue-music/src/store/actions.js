import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, clearSearch, deleteSearch, savePlay, saveFavorite, deleteFavorite} from 'common/js/cache'

export const selectPlay = function({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (this.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_CURRENT_INDEX, index)
}

export const randomPlay = function({commit, state}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_CURRENT_INDEX, 0)
}

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const insertSong = function({commit, state}, song) {
  // 当前播放信息
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let currentSong = playList[currentIndex]

  // 查找插入歌曲在播放列表中的索引
  let fpIndex = findIndex(playList, song)

  // 插入歌曲，插入到下一首播放
  currentIndex++
  playList.splice(currentIndex, 0, song)

  // 如果播放列表包含这首歌
  if (fpIndex > -1) {
    // 如果原歌曲在插入位置之前
    if (fpIndex < currentIndex) {
      playList.splice(fpIndex, 1)
      // 原歌曲删除，索引减1
      currentIndex--
    } else {
      playList.splice(fpIndex + 1, 1)
    }
  }

  // 处理顺序列表
  let currentSIndex = findIndex(sequenceList, currentSong)
  currentSIndex++
  // 查找插入歌曲在顺序列表中的索引
  let fsIndex = findIndex(sequenceList, song)
  // 插入歌曲
  sequenceList.splice(currentSIndex, 0, song)

  // 如果顺序列表包含这首歌
  if (fsIndex > -1) {
    // 如果原歌曲在插入位置之前
    if (fsIndex < currentSIndex) {
      sequenceList.splice(fpIndex, 1)
      // 原歌曲删除，索引减1
    } else {
      sequenceList.splice(fpIndex + 1, 1)
    }
  }

  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_CURRENT_INDEX, currentIndex)
}

export const deleteSong = function({commit, state}, song) {
  // 当前播放信息
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  // 播放列表索引
  let pIndex = findIndex(playList, song)
  playList.splice(pIndex, 1)

  // 顺序列表索引
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)

  if (pIndex < currentIndex) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  if (!playList.length) {
    commit(types.SET_PLAYING_STATE, false)
  }
  commit(types.SET_CURRENT_INDEX, currentIndex)
}

export const clearSong = function({commit, state}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYING_STATE, false)
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_CURRENT_INDEX, -1)
}

export const saveSearchHistory = function({commit, state}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const clearSearchHistory = function({commit, state}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSearchHistory = function({commit, state}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const savePlayHistory = function({commit, state}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const saveFavoriteList = function({commit, state}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function({commit, state}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}