<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" 
          v-model="username"
           placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ usnErrors.erroText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" 
          v-model="password"
           placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ pswErrors.erroText }}</span>
      </div>
      <div class="g-form-line">
        <div class= "g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p>{{ errorText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      errorText: ''
    }
  },
  computed: {
    usnErrors () {
      let state,erroText;
      if(!/@/g.test(this.username)) {
        state=false;
        erroText="不包含@"
      }
      else {
        state=true;
        erroText="";
      }

      if(!this.usnfirstFlag) {
        erroText=''
        this.usnfirstFlag=true
      }

      return {
        state,
        erroText
      }
    },
    pswErrors () {
      let state,erroText;
      if(!/^\w{1,6}$/g.test(this.password)) {
        state=false;
        erroText="位数不为1~6位"
      }
      else {
        state=true;
        erroText="";
      }
      if(!this.pswfirstFlag) {
        erroText=''
        this.pswfirstFlag=true
      }
      return {
        state,
        erroText
      }
    }
  },
  methods: {
    onLogin () {
      if(!this.usnErrors.state||!this.pswErrors.state) {
        this.errorText="用户名或密码错误"
      }
      else {
        this.$http.get('api/login')
        .then((res) => {
          this.$emit('has-log',res.data)
        },(error) => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
