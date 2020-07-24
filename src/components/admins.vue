<template>
  <v-app style="margin: 0;">
    <v-card>
      <!--菜单栏-->
      <v-navigation-drawer
        :color="'primary'"
        :height="scrheight"
        width="300"
        permanent absolute dark>
        <v-list
          dense nav class="py-0">
          <!--顶栏-->
          <v-list-item two-line>
            <v-list-item-content style="height: 110px">
              <v-list-item-title style="height: 35px" class="text-h6">{{username}}</v-list-item-title>
              <v-list-item-subtitle style="height: 35px" class="text-h6">管理员</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <!--侧栏主内容-->
          <v-list-item
            v-for="(item,index) in items"
            :key="index" link
            :to="item.href">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ item.title }}</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!--主面板-->
      <v-sheet :height="scrheight" style="padding-left: 300px">
        <router-view></router-view>
      </v-sheet>
    </v-card>
    <!--博客审核面板-->
    <v-overlay :value="blogsRevMenu">
      <v-card :height="scrheight" :width="scrwidth" color="rgba(0,0,0,0.2)">
        <v-btn absolute right icon @click="blogsRevMenu = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="blogsRevMenu = false" large>通过</v-btn>
          <v-btn color="danger" @click="blogsRevMenu =false" large>不通过</v-btn>
          <v-spacer></v-spacer>
        </v-row>
        <v-card flat color="rgba(0,0,0,0.4)">
          <v-card-title>标题：{{uncensoredBlogs[blogsOperatingNum].title}}</v-card-title>
          <v-card-title>具体内容：</v-card-title>
          <v-card-text class="text-left">{{uncensoredBlogs[blogsOperatingNum].content}}</v-card-text>
        </v-card>
      </v-card>
    </v-overlay>
    <!--评论详情面板-->
    <v-overlay :value="cmtRevMenu">
      <v-card :height="scrheight-100" :width="scrwidth-100" color="rgba(0,0,0,0.3)">
        <v-btn absolute right icon @click="cmtRevMenu = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <!--评论列表-->
        <v-simple-table>
          <thead>
          <tr>
            <th>作者</th>
            <th>内容开头</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in blogcomments" :key="i" class="text-left">
            <td>{{ item.writer }}</td>
            <td>{{ item.content}}</td>
            <td>
              <v-btn @click="seecomment(i)">查看评论</v-btn>
              <v-btn @click="item.show=!item.show" icon>
                <v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </td>
          </tr>
          <v-expand-transition>
            <div v-show="true">
              <v-main>ye</v-main>
            </div>
          </v-expand-transition>
          </tbody>
        </v-simple-table>
      </v-card>

    </v-overlay>
  </v-app>
</template>

<script>
    export default {
        name: "admins",
      data:()=>({
        //步骤（位置）指针
        blogsRevstepPtr:0,

        //管理操作的指针
        blogsOperatingNum:0,
        cmtOperatingNum:0,


        blogcomments:[{writer:'sdfs',content:'sdfddddddddddddddddddddddddsdf'}],
        blogsRevMenu:false,
        cmtRevMenu:false,
        uncensoredBlogs:[{title:'dsfs',writer:'dsfsd',content:'sdfsd'}],
        username:'',
        stepitems: [
          {
            text: '首页',
            disabled: false,
            href: 'breadcrumbs_dashboard',
          },
          {
            text: '审阅文本',
            disabled: true,
            href: 'breadcrumbs_link_1',
          },
        ],
        dashboardShow:[
          {show:true},
          {show:false},
          {show:false},
          {show:false},
        ],
        drawer: true,
        items: [
          { href:{path:'/admins/blogsRev'},title: '审核博客', icon: 'mdi-view-dashboard' },
          { href:'/admins/cmtRev',title: '审核评论', icon: 'mdi-view-dashboard' },
        ],
        scrheight:window.innerHeight,
        scrwidth:window.innerWidth,
      }),
      mounted() {
          const that=this
        window.onresize=()=>{
          that.scrheight=window.innerHeight
          that.scrwidth=window.innerWidth
        }
      },
      methods:{
          //显示某一条评论的详情
          showContentDetails(){
            this.cmtRevMenu = true
          },
        changeto(index){
          for (var i=0;i<this.dashboardShow.length;i++){
            this.dashboardShow[i].show = false
          }
          this.dashboardShow[index].show = true
        },
        blogsReview(index){
          this.blogsOperatingNum = index
          this.blogsRevMenu = true
        },
        manageComments(index){
          this.blogsOperatingNum = index
          this.cmtRevMenu = true
        },
        seecomment(index){

        }
      }
    }
</script>

<style scoped>

</style>
