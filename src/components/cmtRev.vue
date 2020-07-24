<template>
  <v-card>
    <!--待审博客列表-->
    <v-simple-table>
      <thead>
      <tr>
        <th>作者</th>
        <th>上传时间</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,i) in uncensoredBlogs" :key="i" class="text-left">
        <td>{{ item.writer }}</td>
        <td>unknown</td>
        <td>
          <v-btn :to="{path:'/admins/oneCmtRev',query:{index:i}}" color="primary">审阅文本</v-btn>
        </td>
      </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
    export default {
        name: "cmtRev",
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

      })
    }
</script>

<style scoped>

</style>
