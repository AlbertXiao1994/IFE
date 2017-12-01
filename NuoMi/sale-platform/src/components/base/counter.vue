<template>
    <div class="counter-component">
      <div class="counter-btn" @click="sub"> - </div>
      <div class="counter-show">
        <input type="text" v-model="number" @keyup="checkInput">
      </div>
      <div class="counter-btn" @click="add"> + </div>
    </div>
</template>

<script>
import _ from "lodash"
export default {
  props: {
    max: {
      type: Number,
      default: 5
    },
    min: {
      type: Number,
      default: 1
    }
  },
  watch: {
    number () {
      this.checkInput()
      this.$emit('on-change',this.number)
    }
  },
  data () {
    return {
      number: this.min
    }
  },
  methods: {
    add () {
      if(this.number>=this.max) {
        return
      }
      else {
        this.number++
      }
    },
    sub () {
      if(this.number<=this.min) {
        return
      }
      else {
        this.number--
      }
    },
    checkInput: _.debounce(function() {
      let fix
      if(typeof this.number=="string") {
        fix=Number(this.number.replace(/\D/g,''))
      }
      else {
        if(this.number>this.max) {
          fix=this.max
        }
        else if(this.number<this.min) {
          fix=this.min
        }
        else {
          fix=this.number
        }
      }
      this.number=fix
    },100)
  }
}
</script>

<style scoped>
.counter-component {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.counter-show {
  float: left;
}
.counter-show input {
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 23px;
  line-height: 23px;
  width: 30px;
  outline: none;
  text-indent: 4px;
}
.counter-btn {
  border: 1px solid #e3e3e3;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.counter-btn:hover {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}

</style>
