<template>
  <v-card>
  <!--待审博客列表-->
  <v-simple-table>
    <thead>
    <tr>
      <th>上传时间</th>
      <th>浏览数</th>
      <th>赞/踩</th>
      <th>审核状态</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item,i) in blogs_info_list" :key="i" class="text-left">
      <td>{{ item.date }}</td>
      <td>{{item.views}}</td>
      <td>{{item.likes+'/'+item.dislikes}}</td>
      <td></td>
      <td>
        <v-btn :to="{path:'/admins/oneBlogRev',query:{index:i}}" color="primary">审阅文本</v-btn>
      </td>
    </tr>
    </tbody>
  </v-simple-table>
  </v-card>
</template>

<script>
    export default {
        name: "blogsRev",
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

        //用户信息
        blogs_id_list:[],
        blogs_info_list:[],
      }),
      mounted() {
          let config1={headers:{}, params:{username:this.username}}


          //获取用户列表
        this.$axios.post('/api/article/getlist',config1)
        .then(function (response) {
            if (response.state === 'success') {
              this.blogs_id_list = decodeURI(response.list)
            }
            else{
              alert('用户不存在')
            }
        })
        .catch(function (error) {
          alert('请求失败')
            console.log(error)
        })

        //通过文章的id列表加载具体的文章
        for (var i=0;i<this.blogs_id_list.length;i++){
          let config2={headers:{}, params:{id:this.blogs_id_list[i]}}
          this.$axios.post('/api/article/fetch',config2)
            .then(function (response) {
              if (response.state === 'success') {
                this.blogs_info_list.append(response)
              }
            })
            .catch(function (error) {
              console.log(error,' happen on ',i)
            })
        }
      }
    }
</script>

<style scoped>

</style>
