<template>
  <div id="app">
    <div class="container">
      <Write />
      <Bill class="bill-view-container" />
    </div>
  </div>
</template>

<script>
import Bill from "./components/Bill.vue";
import Write from "./components/Write.vue";

export default {
  name: "app",
  components: {
    Bill,
    Write
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(55, 211, 164);

  /* margin-top: 60px; */
}
.container {
  padding-top: 100px;
  margin: 0 auto;
  width: 80%;
}
.bill-view-container {
  margin-top: 50px;
}
</style>
