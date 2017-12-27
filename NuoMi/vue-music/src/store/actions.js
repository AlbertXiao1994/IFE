import * as types from './mutation-types'
// import {playMode} from 'common/js/config'

export const selectPlay = function({commit, state}, {list, index}) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_CURRENT_INDEX, index)
}