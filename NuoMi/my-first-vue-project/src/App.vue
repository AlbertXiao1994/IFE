<template>
  <div id="app">
    <component-a msgFromFather="good boy" @child-tell-me-something="listenToMyBoy"></component-a>
    <p>child tell ms:{{ childWords }}</p>
    <h1 v-html="title"></h1>
    <label>请输入一个值：<input type="text" v-model="newItem" @keyup.enter="addItem"></label>
    <ul>
      <li v-for="item in items" :class="{finished:item.isFinished}" v-on:click="toggle(item)">{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
import Store from './Store'
import ComponentA from './components/componentA'
export default {
  data () {
    return {
      title: 'this is todo list',
      items: Store.fetch(),
      newItem: '',
      childWords: ''
    }
  },
  components: { ComponentA },
  watch: {
    items: {
      handler: function(items) {
         Store.save(items);
      },
      deep: true
    }
  },
  methods: {
    toggle: function(item) {
      item.isFinished=!item.isFinished
    },
    addItem: function() {
      this.items.push({
        label: this.newItem,
        isFinished: false
      })
      this.newItem="";
    },
    listenToMyBoy: function(msg) {
      this.childWords=msg;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.finished {
  text-decoration: underline;
  }
</style>
