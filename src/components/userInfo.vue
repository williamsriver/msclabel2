<template>
  <v-card style="padding-left: 300px;">
    <!--顶部标题-->

    <v-divider></v-divider>

    <!--用户信息-->
    <v-card-text class="text-left">
      <v-row>
        <v-card-title>用户名</v-card-title>
        <v-card-title>{{this.username+'sdgsdg'}}</v-card-title>
      </v-row>

      <v-row>
        <v-card-title>博客数</v-card-title>
        <v-card-title>{{blognum}}</v-card-title>
      </v-row>

      <v-row>
      <v-card-title v-show="!userInfoEditShow">个人介绍</v-card-title>
      </v-row>
      <v-card-text v-show="!userInfoEditShow">{{}}</v-card-text>
      <v-row>
      <v-card-title v-show="userInfoEditShow">修改个人介绍</v-card-title>
      </v-row>
      <v-textarea v-model="newintro" v-show="userInfoEditShow"
                  :rules="[rules.intromax]"></v-textarea>


      <!--性别-->
      <v-row>
        <v-card-title>性别</v-card-title>
        <v-row v-show="userInfoEditShow">
          <v-col cols="3">
            <v-select v-model="gendervalue" :items="newgender"></v-select>
          </v-col>
        </v-row>
      </v-row>

      <!--生日专栏-->
      <v-row>
        <v-card-title>生日</v-card-title>
        <v-card-title>{{birthday}}</v-card-title>
      </v-row>
        <!--日历选择栏-->
      <v-row>
        <v-sheet
          v-show="userInfoEditShow" tile height="54"
          color="grey lighten-3">
          <v-row>
            <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon class="ma-2" @click="$refs.calendar.next()">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </v-sheet>
        <!--日历-->
        <v-calendar v-show="userInfoEditShow"
                    ref="calendar"
                    v-model="birthday"
                    :type="'month'"
                    :event-overlap-mode="'stack'"
                    :event-overlap-threshold="30">
        </v-calendar>
      </v-row>

      <!--头像专栏-->
      <v-row>
        <v-card-title>头像：</v-card-title>
        <img :src="'/user/getavatar?username='+this.username"
             ref="userpicplace" alt="userimg" width="200" height="200"/>

      </v-row>
      <v-row style="padding-left: 30px">
        <v-btn v-show="userInfoEditShow">
            <input
              style="position:absolute; width: 70px;"
              @change="changepic($event)"
              id="file1" type="file" ref="newpic"
              accept="image/*"/>
        </v-btn>
      </v-row>
    </v-card-text>

    <!--个人信息修改按钮-->
    <v-row>
    <v-btn @click="userInfoEditShow=!userInfoEditShow" v-show="!userInfoEditShow"
           color="primary" large absolute right>编辑个人信息</v-btn>

    <v-btn @click="savePersonalInfo" v-show="userInfoEditShow"
           style="margin-right: 90px"
           large absolute right :disabled="!updateInfoCheck">保存并上传</v-btn>
    <v-btn @click="userInfoEditShow=!userInfoEditShow" v-show="userInfoEditShow"
           large absolute right>返回</v-btn>
    </v-row>
  </v-card>
</template>

<script>
    export default {
        name: "userInfo",
      data:()=>({
        //修改模块
        pickedpic:'../../static/pics/study.png',//图片修改时的选中头像
        userInfoEditShow:false,//个人信息修改的开关
        newpicFile:'',
        newpicName:'',
        newsrc:'',

        //规则
        rules: {
          intromax: function (intro) {
            if (intro.length>=200){
              return ('太长了，不能超过200字')
            }
            else return true
          }
        },

        //更新模块
        newintro:'',//新的个人介绍
        newgender:[
          '未知','男性','女性',
        ],
        gendervalue:'未知',
        genderPtr:0,//性别指针
        newBlogTitle:'',

        //用户信息
        picSrc:'',
        userinfolist:'',
        username:'',//用户名
        userimgUrl:'',//用户头像的url
        birthday: 'unknown',//用户生日
        blognum:0,//用户博客数量
        usertype:'普通用户',//用户类型
      }),
      mounted() {
        //获取用户名
        /*
        this.$axios.post('/user/getcurrentuser',{})
        .then(function (response) {
          if (response.state === 'success'){
            this.username = response.username
          }
          else alert('请求失败')
        })
        .catch(function (error) {
          console.log(error)
        })

        if (this.username !== ''){
          this.$axios.post('/user/getcurrentuser',{})
            .then(function (response) {
              if (response.state === 'success'){
                this.userinfolist = response.info
              }
              else alert(response.message)
            })
            .catch(function (error) {
              console.log(error)
            })
        }

         */


      },
      computed:{
        updateInfoCheck(){
          return (this.newintro.length<200)
        },
      },
      methods: {
        //用户修改图片
        changepic(event) {
          //无法直接获取对象，即changepic(this)
          //采用传入事件的方式进行读取
          let newPic = event.target.files;
          this.newpicName = newPic[0].name
          this.newpicFile = this.$refs.newpic.files[0];
          var newsrc = this.getObjectURL(event.target.files[0]);//获取图片的url
          this.$refs.userpicplace.src = newsrc;

          //上传图片

        },

        //建立一个可存取到指定文件的url
        getObjectURL(file) {
          var url = null ;

          // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
          if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
          } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
          } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
          }
          return url ;
        },

        openPic(){
          this.$refs.newpic.click()
        },

        //修改个人信息后保存并提交到后台
        savePersonalInfo(){
          //提交参数
          this.$axios.post('/api/updateinfo',{
            desc:this.newintro,//个人简介
            gender:this.newgender.indexOf(this.gendervalue),//获取性别index
            //email:
          }).then(function (response) {
            if (response == true){
              alert('上传成功')
              //成功后更新信息
              this.$axios.post('/user/getinfo',{
                username: this.username
              }).then(function (response) {
                if (response.state == true){
                  this.userinfolist = response
                }
                else alert('更新失败')
              })
              //返回
              this.userInfoEditShow = !this.userInfoEditShow
            }
            else alert('上传失败')
          }).catch(function (error) {
            console.log(error)
          })

          //上传图片
          this.$axios.post('/api/updateinfo',{
            desc:this.newintro
            //gender:
            //email:
          },{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(function (response) {
            if (response == true){
              alert('上传图片成功')
              //成功后更新信息
              this.$axios.post('/user/getavatar',{
                avatar:this.newpicFile
              }).then(function (response) {
                if (response.state == true){
                  this.userinfolist = response
                }
                else alert('更新图片失败')
              })
              //返回
              this.userInfoEditShow = !this.userInfoEditShow
            }
            else alert('上传图片失败')
          }).catch(function (error) {
            console.log(error)
          })

        },
      }
    }
</script>

<style scoped>

</style>
