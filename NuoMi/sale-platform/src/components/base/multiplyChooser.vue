<template>
    <div class="chooser-component">
        <ul class="chooser-list">
          <li
          v-for="(item, index) in selections"
          @click="toggleSelection(index)"
          :title="item.label"
          :class="{active: checkActive(index)}"
          >{{ item.label }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    selections: {
      type: Array,
      default: [{
        label: 'test',
        value: 0
      }]
    }
  },
  data () {
    return {
      nowIndexes: [0]
    }
  },
  methods: {
    toggleSelection (index) {
      if(this.nowIndexes.includes(index)) {
        this.nowIndexes=_.remove(this.nowIndexes,(id) => {
          return id!=index
        })
      }
      else {
        this.nowIndexes.push(index)
      }
      this.$emit('on-change',this.nowIndexes)
    },
    checkActive (index) {
      return this.nowIndexes.includes(index)
    }
  }
}
</script>

<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>
