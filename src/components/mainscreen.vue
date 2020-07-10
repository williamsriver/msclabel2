<template>
<v-app style="padding: 0; margin: 0">
  <v-content>
  <v-navigation-drawer
    v-model="isRightBarShow"
    absolute right>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Application
          <v-app-bar-nav-icon @click="isRightBarShow=!isRightBarShow" style="float:right;"></v-app-bar-nav-icon>
        </v-list-item-title>
        <v-list-item-subtitle>
          subtext
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list
      dense
      nav
      v-for="(item,i) in buttonlist"
      :key="i"
    >
      <v-list-item>
        <v-list-item-content>
          <v-btn text>{{item}}</v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-sheet>
    <v-row style="  margin: 0;
    background-color: darkblue">
      <v-col v-show ="$vuetify.breakpoint.mdAndUp" :md="3">
        <v-row>
          <v-btn style="color: white" text>首页</v-btn>
          <v-spacer></v-spacer>
          <v-btn style="color: white" text>介绍</v-btn>
          <v-spacer></v-spacer>
          <v-btn style="color: white" text>关于</v-btn>
        </v-row>
      </v-col>
      <v-col :md="6">
        <v-row >
          <v-icon
            v-show ="$vuetify.breakpoint.smAndDown"
            style="color: white">mdi-microsoft</v-icon>
          <v-main style="color: white">武大微软技术俱乐部</v-main>
        </v-row>
      </v-col>
      <v-col v-show ="$vuetify.breakpoint.mdAndUp" :md="2">
        <v-row>
          <v-btn style="color: white" text>登录</v-btn>
          <v-spacer></v-spacer>
          <v-btn style="color: white" outlined>注册</v-btn>
        </v-row>
      </v-col>
      <v-app-bar-nav-icon
        v-show ="$vuetify.breakpoint.smAndDown"
        @click="isRightBarShow=!isRightBarShow"
        style="color: white"></v-app-bar-nav-icon>
    </v-row>
  </v-sheet>
  <v-sheet>
    <v-carousel cycle hide-delimiter-background
                :height="scrheight-130"
                :show-arrows="false"
                hide-delimiters>
        <v-carousel-item
          v-for="(slide, i) in actislides"
          :key="i">
          <v-sheet
            height="100%">
            <v-img :src="backgroundsrc[i]"></v-img>
          </v-sheet>
        </v-carousel-item>
      <v-card style="position: absolute; top:0;
            background-color: rgba(0,0,0,0.2);
            width: 100%; height: 100%;
            color: white;"
            elevation="2"  flat>
        <div style="padding-top: 150px">
        <p class="text-h2 font-weight-light text-center">在这里，开始人生新旅程</p>
        <p class="text-h4 font-weight-light text-center">
          武大微软俱乐部欢迎所有志同道合的小伙伴们，让我们携手共进</p>
        </div>
      </v-card>
    </v-carousel>
    <v-btn class="mx-2" fab dark small color="primary"
           @click="$vuetify.goTo('#second', {})"
           style="margin-top: -20px;"
           elevation="3" absolute>
      <v-icon>
        mdi-chevron-double-down</v-icon>
    </v-btn>
  </v-sheet>

  <v-sheet style="padding:100px 0 100px 0; margin:0; background-color: rgb(250,250,250)"
           id="second">
        <v-card style="background-color: transparent" flat>
          <p class="text-h2 font-weight-light text-center">
            来看看我们搞的事情</p>
          <p class="text-h4 font-weight-light text-center">
            微软俱乐部精心准备了丰富多彩的活动供社员选择参加</p>
        </v-card>
      <v-row justify="space-between">
        <v-spacer></v-spacer>
        <v-col :md="3"
               v-for="(item,i) in pg2list"
               :key="i"
          >
          <v-card>
            <v-img :src="item.imgSrc" :height="p2imgheight"></v-img>
            <v-card-title>{{item.title}}</v-card-title>
            <v-card-subtitle>{{item.eventime}}</v-card-subtitle>
            <v-card-subtitle>{{item.subtitle}}</v-card-subtitle>
            <v-card-actions>
              <v-btn class="text-h6" style="color: blueviolet" text>
                立即参加
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="item.show=!item.show" text>
                <v-main>{{item.show?'收起':'详情'}}</v-main>
                <v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="item.show">
                <v-main>{{item.details}}</v-main>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-sheet>
  <v-card style="padding: 100px 30px 100px 30px">
    <v-row>
      <v-spacer></v-spacer>
        <v-card flat max-width=1100>
          <v-img src="../../static/pics/bg03.jpg"></v-img>
        </v-card>
      <v-spacer></v-spacer>
    </v-row>
    <v-sheet height="30px"></v-sheet>
    <v-card flat>
        <p class="text-h2 font-weight-light text-center">丰富的资源，强劲的实力</p>
        <p class="text-h4 font-weight-light text-center">
          微软俱乐部坐拥微软提供的资金支持、产品支持和技术支持</p>
    </v-card>
    <v-row>
      <v-spacer></v-spacer>
      <v-col :md="5">
        <v-card flat>
          <img src="../../static/pics/dollar.png" height="100" width="100"/>
          <p class="text-h3 font-weight-light text-center">资金支持</p>
        </v-card>
      </v-col>
      <v-col :md="5">
      <v-card flat>
        <img src="../../static/pics/code.png" height="100" width="100"/>
        <p class="text-h3 font-weight-light text-center">编程进阶</p>
      </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col :md="5">
        <v-card flat>
          <img src="../../static/pics/people.png" height="100" width="100"/>
          <p class="text-h3 font-weight-light text-center">英雄豪杰</p>
        </v-card>
      </v-col>
      <v-col :md="5">
      <v-card flat>
        <img src="../../static/pics/study.png" height="100" width="100"/>
        <p class="text-h3 font-weight-light text-center">技术讲座</p>
      </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
        <v-btn class="text-h4" height="90px" width="220px" color="green"
        style="color: white">加入我们</v-btn>
      <v-spacer></v-spacer>
    </v-row>
  </v-card>
  <v-sheet style="padding:100px 0 100px 0; margin:0; background-color: rgb(250,250,250)">
    <v-card style="background-color: transparent" flat>
      <v-row>
        <v-spacer></v-spacer>
        <v-card-title class="text-h2">来自社员的评价</v-card-title>
        <v-spacer></v-spacer>
      </v-row>
    </v-card>
    <v-container>
      <v-carousel height="200px"
      :show-arrows="false" cycle>
        <v-carousel-item
          v-for="(item,i) in commentlist"
          :key="i">
          <v-sheet style="background-color: transparent; color:black;" width="100%">
            <p>{{item.text}}</p>
            <p>{{item.author}}</p>
            <v-img :src="item.picsrc" alt="There should be a pic"></v-img>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </v-sheet>
  <v-bottom-navigation grow>
    <v-btn value="recent">
      <span>历史</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>
    <v-btn value="favorites">
      <span>喜爱的</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn value="nearby">
      <span>附近</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
  </v-content>
</v-app>
</template>
<script>
    export default {
        name: "mainscreen",
      data:()=>({
        backgroundsrc:['../../static/pics/homebg1.jpg',
          "../../static/pics/three.jpg",
          "../../static/pics/second.jpg",
          "../../static/pics/homepage.jpg"],
        actislides:[
          {subtitle: 'dsf',text:'dfg'},
          {subtitle: 'dsf',text:'dfg'},
          {subtitle: 'dsf',text:'dfg'},
          {subtitle: 'dsf',text:'dfg'},
        ],
        colors: [
          'green',
          'secondary',
          'yellow darken-4',
          'red lighten-2',
          'orange darken-1',
        ],
        scrheight:window.innerHeight,
        show:false,show2:false,show3:false,
        p2imgheight:"290px",
        pg2list:[
          {show:false,title:"全新的编程挑战赛",imgSrc:"../../static/pics/throphy.png",
            eventime:"2020-9",subtitle:"在这里，对决各路高手，赢取丰厚奖品",
            details:"这就是详情"},
          {show:false,title:"新一周的技术沙龙",imgSrc:"../../static/pics/throphy.png",
            eventime:"2020-9-2",subtitle:"技术大牛分享知识经验，让你大开眼界",
            details:"这就是详情"},
          {show:false,title:"微软实践项目",imgSrc:"../../static/pics/throphy.png",
            eventime:"2020-10",subtitle:"来吧！大展你的身手，证明自己的实力。",
            details:"这就是详情"},],
        commentlist:[
          {text:"真的蛮不错的",author:"fsd",picsrc:""},
          {text:"真的蛮不错的",author:"fsd",picsrc:""},
          {text:"真的蛮不错的",author:"fsd",picsrc:""},
        ],
        isRightBarShow:false,
        buttonlist:['a','b','c','d','e']
      }),
      mounted() {
        const that=this;
        window.addEventListener('scroll',this.scrollTop);
        window.onresize=()=>{
          that.scrheight=window.innerHeight;
          this.getDate();
        }
      },
      methods:{
        getDate(){
          var date=new Date();
          this.nowtime=date.getHours()+":";
          if (date.getMinutes()<10) this.nowtime+='0'+date.getMinutes();
          else this.nowtime+=date.getMinutes();
        }
      },
      computed:{
      }
    }
</script>

<style scoped>

</style>
