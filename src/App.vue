<script setup lang="ts">
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"
import Content from "./components/Content.vue"
</script>

<template>
  <Navbar></Navbar>
  <div class="container-fluid 
              text-center">
    <Content></Content>
  </div>
  <Footer></Footer>
</template>

<style>
  *{
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #4158D0;
    background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
  }
</style>
