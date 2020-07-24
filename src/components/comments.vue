<template>
  <v-app>
    <v-container>
      <v-main class="text-h2">用户/游客评价</v-main>
      <v-textarea v-model="userscomments" outlined>

      </v-textarea>
      <v-btn>提交</v-btn>
    </v-container>
  </v-app>
</template>

<script>
    export default {
        name: "comments",
      data:()=>({
        userscomments:''
      })
    }
</script>

<style scoped>

</style>
