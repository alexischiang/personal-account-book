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

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
body {
  background-image: linear-gradient(
    125deg,
    #2c3e50,
    #27ae60,
    #2980b9,
    #e74c3c,
    #8e44ad
  );
  background-size: 400%;
  animation: bganimation 40s infinite;
}

@keyframes bganimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  1000% {
    background-position: 0% 50%;
  }
}
.container {
  padding-top: 100px;
  margin: 0 auto;
  width: 65%;
}
.bill-view-container {
  margin-top: 50px;
  position: relative;
}
</style>
