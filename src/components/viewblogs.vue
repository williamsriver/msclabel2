<template>
  <v-app>
    {{'item'}}
  </v-app>
</template>

<script>
    export default {
        name: "viewblogs",
      data:()=>({
        watchedItem:'',
      }),
      mounted() {
          this.watchedItem = this.$route.query.item
      }
    }
</script>

<style scoped>

</style>
