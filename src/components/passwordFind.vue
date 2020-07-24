<template>
  <v-app style="padding: 0; margin: 0">
    <v-sheet style="padding: 100px 30px 100px 30px;
    background-image: url('../../static/pics/homebg1.jpg')">
      <v-card :elevation="4">
        <v-form>
          <v-text-field label="请输入用户名" v-model="username" :rules="[rules.required]"/>
          <v-text-field label="请输入您注册时的绑定邮箱" v-model="emailAddr" :rules="[rules.required,rules.emailCheck]"/>
        </v-form>
        <v-btn :disabled="!(this.username!='' && !(this.rules.emailCheck(this.emailAddr)==='邮件地址不合法')
            && this.emailAddr != '')" @click="findEmail">提交</v-btn>
      </v-card>
    </v-sheet>
  </v-app>
</template>

<script>
    export default {
        name: "passwordFind",
      data:()=>({
        //用户数据
        username:'',
        emailAddr:'',
        //检验规则
        rules: {
          required: value => !!value || '必填',
          emailCheck:function (emailstr) {
            if (/.+@.+\..+/.test(emailstr)) return true
            else return ('邮件地址不合法')
          },
        },
      }),
      computed:{
        nValid(){
          return(this.userpassword === this.passwordmatch
            && this.userpassword != '' && !(this.rules.emailCheck(this.emailAddr)==='邮件地址不合法')
            && this.emailAddr != '' )
        }
      },
      methods:{
          findEmail(){
            const that=this
            this.$axios.post('http://127.0.0.1:6666', {
              username: that.username,
              email: that.email,
            })
              .then(function (response) {
                console.log(response);
                response = true
                if (response== true){
                  alert('已经发送验证邮件到您的邮箱，请前往你的邮箱查看并验证')
                  that.$router.push({path:'/'});
                }
              })
              .catch(function (error) {
                console.log(error);
                alert('发送失败')
                that.$router.push({path:'/'});
              });
          }
      }
    }
</script>

<style scoped>

</style>
