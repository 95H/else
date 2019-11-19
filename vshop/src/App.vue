<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "./base/Tab";
export default {
  name: "App",
  components: { Tab }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
a {
  text-decoration: none;
  color: #000;
}
.font::-webkit-scrollbar {
  width: 0px;

  height: 0px;
}
</style>
