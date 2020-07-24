<template>
  <v-card width="700" height="340" style="padding: 25px 25px 25px 25px" light>
    <v-btn icon @click="loginscreen = false" absolute right>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-card-title>欢迎登录</v-card-title>
    <!--用户名-->
    <v-text-field
      v-model="username"
      label="用户名"
      @click:append="showpassword = !showpassword"
    ></v-text-field>
    <!--密码-->
    <v-text-field
      v-model="userpassword"
      :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showpassword ? 'text' : 'password'"
      label="密码"
      @click:append="showpassword = !showpassword"
    ></v-text-field>
    <!--操作按钮-->
    <v-card-actions>
      <v-btn @click="loginadmit">登录</v-btn>
      <router-link to="/passwordFind">
        <v-btn style="color: #00b8d4;" text>忘记密码？</v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <router-link to="/register">
        <v-btn text style="color: #00b8d4;">没有账号？赶紧注册！</v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
    export default {
        name: "login",
      data:()=>({
        //用户登录数据
        loginstatus:false,
        loginscreen:false,
        showpassword:false,
        userpassword:'',
        username:'',
      }),
      methods:{
        loginadmit(){
          this.$axios.post('api', {
            username: this.username,
            password: this.userpassword
          })
            .then(function (response) {
              console.log(response);
              if (response) {
                alert('登录成功！')
                this.$router.push('/')
                this.$bus.emit('loginsuccess')
              }
              else {
                if (response.error === 'usernotfound') {
                  alert('用户名不存在')
                }
                if (response.error === 'usernotfound') {
                  alert('密码错误')
                }
              }
            })
            .catch(function (error) {
              alert('请求错误')
              console.log(error);
            });
        },
      }
    }
</script>

<style scoped>

</style>
