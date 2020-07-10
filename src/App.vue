<template>
  <div id="app" style="margin: 0">
    <mainscreen/>
  </div>
</template>

<script>
import Mainscreen from "./components/mainscreen";
export default {
  name: 'App',
  components: {Mainscreen}
}
</script>

<style>
  body{
    padding: 0; margin: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
