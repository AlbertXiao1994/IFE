import {playMode} from 'common/js/config'
import {loadSearchHistory, loadPlayHistory} from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearchHistory(),
  playHistory: loadPlayHistory()
}

export default state