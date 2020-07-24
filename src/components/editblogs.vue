<template>
  <v-card style="padding-left: 300px;">
    <v-card-title>您正在：
      {{this.mode==='new'?'写新文章':'编辑文章'}}
    </v-card-title>

    <v-row>
      <v-col cols="1" class="align-self-baseline" >文章标题</v-col>
      <v-col cols="6">
        <v-text-field v-model="this.editedItem.title"></v-text-field>
      </v-col>
      <v-col cols="5">审核状态:{{editedItem.censor}}</v-col>
    </v-row>

    <mavon-editor
      v-model="this.editedItem.content"
      ref="md"
      @change="mdTextChange"
      @imgAdd="imgAdd"
      style="min-height: 600px"
    />
    <v-btn @click="mdTextSubmit">提交</v-btn>
  </v-card>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
    export default {
        name: "editblogs",
      components: {
        mavonEditor,//md包
      },
      data:()=>({
        editedItem:[],//编辑元素初始化
        //md
        mdHtml:'',    // md及时转的mdHtml
        mode:'',
        newBlogTitle: '',
      }),
      mounted() {
        this.mode = this.$route.query.mode
        if (this.mode === 'edit') {
          this.editedItem = this.$route.query.item
        }
      },
      methods:{
        // 提交md文件
        mdTextSubmit(){

          //编辑新的文章
          if (this.mode === 'new'){
            this.$axios.post('api/article/new',{
              title: this.editedItem.title,
              content: this.editedItem.content,
            }).then(function (response) {
              alert(response)
              console.log(response)
            }).catch(function (error) {
              alert('提交错误')
            })
          }
          //修改旧的文章
          else if (this.mode === 'edit') {
            this.$axios.post('api/article/modify', {
              title: this.editedItem.title,
              content: this.editedItem.content,
              id:this.$route.query.id,
            }).then(function (response) {
              alert(response)
              console.log(response)
            }).catch(function (error) {
              alert('提交错误')
            })
          }


        },

        //@change对应的监听函数，达到数据同步效果
        mdTextChange(value, render){
          // render 为 markdown 解析后的结果[mdHtml]
          this.mdHtml = render;
        },

        //添加上传图片（供md使用）
        imgAdd(pos, $file){
          let formdata = new FormData();
          this.$upload.post('http://127.0.0.1:6666', formdata).then(res => {
            console.log(res.data);
            this.$refs.md.$img2Url(pos, res.data);
          }).catch(err => {
            console.log(err)
          })
        },
      }
    }
</script>

<style scoped>

</style>
