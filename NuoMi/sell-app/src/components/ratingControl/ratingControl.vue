<template>
  <div class="rating-control">
      <div class="control-type">
        <span class="type-btn" @click="toggleAll"
        :class="{active: allFlag}">全部<span class="type-num">{{ ratings.length }}</span></span>
        <span v-for="(item,index) in ratingTypes" class="type-btn"
        :class="{active: index===selectedType}" @click="toggleType(index)">{{ item.name }}<span class="type-num">{{ typesCount[index].length }}</span></span>
      </div>
      <div class="only-btn" @click="toggleContent">
        <span class="icon-check_circle" :class="{check: contentFlag}"></span><span :class="{check: contentFlag}">只看有内容的评价</span>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    ratingTypes: {
      type: Array,
      default () {
        return ['满意', '不满意']
      }
    }
  },
  computed: {
    typesCount () {
      let counts = []
      this.ratingTypes.forEach((type, index) => {
        let count = this.ratings.filter((rate) => {
          return rate.rateType === index
        })
        counts.push(count)
      })
      return counts
    }
  },
  data () {
    return {
      selectedType: '',
      contentFlag: false,
      allFlag: true
    }
  },
  methods: {
    toggleType (index) {
      this.selectedType = index
      this.allFlag = false
      this.$emit('on-change', {
        selectedType: this.selectedType,
        allFlag: this.allFlag,
        contentFlag: this.contentFlag
      })
    },
    toggleAll () {
      if (!this.allFlag) {
        this.allFlag = true
        this.selectedType = ''
        this.$emit('on-change', {
          selectedType: this.selectedType,
          allFlag: this.allFlag,
          contentFlag: this.contentFlag
        })
      }
    },
    toggleContent () {
      this.contentFlag = !this.contentFlag
      this.$emit('on-change', {
        selectedType: this.selectedType,
        allFlag: this.allFlag,
        contentFlag: this.contentFlag
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rating-control {
  padding: 12px 18px 0 18px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.control-type {
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.type-btn {
  display: inline-block;
  font-size: 12px;
  color: #000;
  line-height: 16px;
  padding: 8px 12px;
  border-radius: 2px;
  background: rgba(0,160,220,0.2);
  margin-right: 8px;
}
.control-type .active {
  color: #fff;
  background: rgb(0,160,220);
}
.type-num {
  font-size: 8px;
}
.only-btn {
  width: 100%;
  height: 48px;
  padding: 12px 0;
}
.only-btn span {
  display: inline-block;
  font-size: 12px;
  color: rgb(147,153,159);
  line-height: 48px;
  vertical-align: top;
}
span.icon-check_circle {
  margin-right: 4px;
  font-size: 24px;
}
.only-btn .check {
  color: #2FA146;
}
</style>
