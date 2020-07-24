<template>
  <v-card style="padding-left: 300px;">
    <v-card-title style="padding-left: 300px;" class="text-h2">我的博客</v-card-title>

    <v-divider></v-divider>
    <!--个人博客列表-->
    <v-data-table
      :headers="headers"
      :items="blogs"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          small class="mr-2" text
          :to="{path:'/users/viewblogs',
            query:{article:item,}}">
          <v-icon>mdi-eye</v-icon>
          <span>查看</span>
        </v-btn>
        <v-btn
          small class="mr-2" text
          :to="{path:'/users/editblogs',
            query:{
            mode:'edit',article:item,
          }}"
        >
          <v-icon>mdi-pencil</v-icon>
          <span>编辑</span>
        </v-btn>

        <v-btn
          small class="mr-2" text
          @click="deleteItem(item)"
        >
          <v-icon>mdi-delete</v-icon>
          <span>删除</span>
        </v-btn>
      </template>
    </v-data-table>

  </v-card>
</template>

<script>
    export default {
        name: "myblogs",
      data:()=>({
        itemheaders:[
          '文章ID',
          '标题',
          '创建日期',
          '浏览数'
        ],
        dialog: false,
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        blogs: [],
        editedIndex: -1,
        editedItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0,
        },
        defaultItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0,
        },
      }),
      computed: {
      },
      watch: {

      },
      created () {
        this.initialize()
      },
      mounted() {
        this.$axios.post('/article/getlist',{
          username:this.username
        }).then(function (response) {
          if (response.state === 'success'){
            this.blogIdList = response.list
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      methods: {
        initialize() {
          this.blogs = [
            {
              name: 'Frozen Yogurt',
              calories: 159,
              fat: 6.0,
              carbs: 24,
              protein: 4.0,
            },
            {
              name: 'Ice cream sandwich',
              calories: 237,
              fat: 9.0,
              carbs: 37,
              protein: 4.3,
            },
            {
              name: 'Eclair',
              calories: 262,
              fat: 16.0,
              carbs: 23,
              protein: 6.0,
            },
            {
              name: 'Cupcake',
              calories: 305,
              fat: 3.7,
              carbs: 67,
              protein: 4.3,
            },
            {
              name: 'Gingerbread',
              calories: 356,
              fat: 16.0,
              carbs: 49,
              protein: 3.9,
            },
            {
              name: 'Jelly bean',
              calories: 375,
              fat: 0.0,
              carbs: 94,
              protein: 0.0,
            },
            {
              name: 'Lollipop',
              calories: 392,
              fat: 0.2,
              carbs: 98,
              protein: 0,
            },
            {
              name: 'Honeycomb',
              calories: 408,
              fat: 3.2,
              carbs: 87,
              protein: 6.5,
            },
            {
              name: 'Donut',
              calories: 452,
              fat: 25.0,
              carbs: 51,
              protein: 4.9,
            },
            {
              name: 'KitKat',
              calories: 518,
              fat: 26.0,
              carbs: 65,
              protein: 7,
            },
          ]
        },

        deleteItem(item) {
          const index = this.blogs.indexOf(item)
          const that = this
          if (confirm('Are you sure you want to delete this item?')){
            this.$axios.post('/article/delete',{
              id:item.id,
            }).then(function (response) {
              if (response){
                alert('删除成功')
                this.blogs.splice(index, 1)
              }
              else alert('删除失败')
            }).catch(function (error) {
              alert('删除失败')
              console.log(error)
            })
          }
        },



      },
    }
</script>

<style scoped>

</style>
