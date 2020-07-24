<template>
  <v-app style="margin: 0;">
    <!--面板导航侧边栏-->
      <v-navigation-drawer
        :color="'primary'"
        height="1200"
        width="300"
        permanent absolute dark>
        <v-list dense nav class="py-0">

          <!--导航栏顶部-->
          <v-list-item two-line>
            <!--用户头像-->
            <v-list-item-avatar>
              <img src=userimgUrl alt="userimg">
            </v-list-item-avatar>
            <!--用户名和用户类型-->
            <v-list-item-content style="height: 110px">
              <v-list-item-title style="height: 35px" class="text-h6">{{username}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <!--导航栏主体-->
          <v-list-item
            v-for="(item,index) in dashboardItems"
            :key="item.title"
            style="height: 110px;"
            :to="item.routerset">
            <div style="display: flex; justify-content: center;">
              <!--面板图标-->
              <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
              <!--面板文字-->
              <v-list-item-content style="padding: 0;">
                <div style="height: 50px;" class="text-h6">
                  <p>{{ item.title }}</p>
                </div>
              </v-list-item-content>
            </div>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    <!--面板主体-->
      <v-sheet>
        <router-view></router-view>
      </v-sheet>
  </v-app>
</template>

<script>

    export default {
      name: "users",

      data:()=>({

        username:'',

        //面板
        dashboardItems: [
          {title: '用户信息', icon: 'mdi-view-dashboard', routerset:{path:'/users/userInfo'}},
          {title: '我的博客', icon: 'mdi-book',routerset:{path:'/users/myblogs'}},
          {title: '写博客', icon: 'mdi-pen',routerset:{path:'/users/editblogs',query:{mode:'new'}}},
        ],//面板菜单栏标签的图标和标题


        //基本参数
        scrheight:window.innerHeight,//窗口高度


      }),
      mounted() {
        const that=this;





        //窗口高度的监听
        window.onresize=()=>{
          that.scrheight=window.innerHeight;
        }
      },
      computed:{
        //检测控制
        //检查更新的个人信息是否合法
        docheight(){
          return document.body.clientHeight
        },
      },
      beforeDestroy() {
        //结束前销毁监听
        this.$bus.off('userlogin')
      },
      methods:{


        //用户删除自己的博客
        delBlogs(articleindex){
          this.blogs.splice(articleindex,1)
          this.delBlogsConfirmShow = false
        },








      }
    }
</script>

<style scoped>

</style>
