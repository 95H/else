<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "./components/tab";
export default {
  name: "App",
  components: { Tab }
};
</script>

<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body,html,h1,h2,h3,h4,h5,h6,p,ul,a{
  margin:0;
  padding:0;
  border:0;
  text-decoration: none;
  list-style: none;
}
body,html,#app{
  width:100%;
  height:100%;
}


</style>
