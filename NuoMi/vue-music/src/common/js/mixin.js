import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  watch: {
    playList(newVal) {
      this.handlePlayList(this.playList)
    }
  },
  methods: {
    handlePlayList(playList) {
      throw new Error('component must implement handlePlayList method')
    }
  }
}

export const playModeMixin = {
  computed: {
    ...mapGetters([
      'mode',
      'sequenceList',
      'playList'
    ]),
    modeIcon() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.random ? 'icon-random' : 'icon-loop'
    }
  },
  methods: {
    ...mapMutations({
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    }),
    toggleMode() {
      let mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return this.currentSong.id === item.id
      })
      this.setCurrentIndex(index)
    }
  }
}

export const searchMixin = {
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    queryChange(query) {
      this.query = query
    },
    addQuery(key) {
      this.$refs.searchBox.setQuery(key)
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    ...mapActions([
      'saveSearchHistory',
      'clearSearchHistory',
      'deleteSearchHistory'
    ])
  }
}