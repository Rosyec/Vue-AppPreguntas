<script setup lang="ts">
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"
import Content from "./components/Content.vue"
</script>

<template>
  <Navbar></Navbar>
  <div class="container">
    <Content></Content>
  </div>
  <Footer></Footer>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
