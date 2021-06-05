<template>
  <div id="app">
    <ConnectProvider />
  </div>
</template>

<script>
import ConnectProvider from "@/components/ConnectProvider.vue";

export default {
  name: "App",
  components: {
    ConnectProvider,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
