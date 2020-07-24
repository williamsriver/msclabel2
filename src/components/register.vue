<template>
  <v-app style="margin: 0;">
    <v-card style=" padding: 0 40px 0 40px">
      <v-card-title>欢迎注册</v-card-title>
      <!--用户名-->
      <v-text-field
        v-model="username"
        label="用户名"
        :rules="[rules.required,rules.usernamemax,rules.usernameCheck]"
        @click:append="showpassword = !showpassword"
      ></v-text-field>
      <!--密码-->
      <v-text-field
        v-model="userpassword"
        :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showpassword ? 'text' : 'password'"
        label="密码"
        :rules="[rules.required,rules.min,rules.passwordmax]"
        @click:append="showpassword = !showpassword">
      </v-text-field>
      <!--确认密码-->
      <v-text-field
        v-model="passwordmatch"
        :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showpassword ? 'text' : 'password'"
        :rules="[rules.sameCheck(passwordmatch,userpassword)]"
        label="确认密码"
        @click:append="showpassword = !showpassword">
      </v-text-field>
      <!--输入邮箱-->
      <v-text-field
        v-model="emailAddr"
        label="输入需要绑定的邮箱"
        :rules="[rules.emailCheck(emailAddr)]"
        @click:append="showpassword = !showpassword"
      ></v-text-field>
      <v-card-actions>
        <!--注册邮箱验证-->
        <v-btn :disabled="!registerValid"
               @click="registerOpr">注册</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>

    export default {
        name: "register",
      data:()=>({
        rules: {
          required: value => !!value || '必填',
          min: v => v.length >= 8 || '至少8个字符',
          usernamemax: v => v.length < 20 || '必须小于20字符',
          passwordmax: v => v.length < 72 || '必须小于72字符',
          sameCheck:function (value,password) {
            if (value !== password) return ('两次密码不一致')
            else return true
          },
          usernameCheck:function () {
            return true
          },
          emailCheck:function (emailstr) {
            if (/.+@.+\..+/.test(emailstr)) return true
            else return ('邮件地址不合法')
          },
        },
        emailAddr:'',
        username:'',
        userpassword:'',
        passwordmatch:'',
        matchmessage:'两次密码不一致',
        showpassword:false,
        errormessage:''
      }),
      computed:{
          //注册按钮合法性的检测
          registerValid(){
            return(this.username!=='' && this.userpassword === this.passwordmatch
              && this.userpassword !== '' && !(this.rules.emailCheck(this.emailAddr)==='邮件地址不合法')
            && this.emailAddr !== '' && this.rules.usernamemax(this.username)
            && this.rules.passwordmax(this.password))
          }
      },
      methods:{
          //注册的流程
          registerOpr() {
            //发送三个参数
            this.$axios.post('api/register', {
              username: this.username,
              password: this.userpassword,
              email: this.emailAddr,
            })
              .then(function (response) {
                console.log(response);
                if (response) {
                  alert('登录成功！')
                  this.$router.push('/')
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
            //将注册数据发到后台进行处理
            alert('请前往绑定的邮箱验证')
            this.$router.push('/')
          }
      }
    }
</script>

<style scoped>

</style>
