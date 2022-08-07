<template>
  <el-container>
    <el-header height="40px" class="flex items-center shadow-md">
      <Header />
    </el-header>
    <el-container class="layout-container">
      <el-aside class="shadow-sm" width="300px">
        <LeftAside />
      </el-aside>
      <el-main> main </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import Header from './components/header/index.vue';
  import LeftAside from './components/left-aside/index.vue'

  // const BASE_URL = import.meta.env.BASE_URL
  // console.log('BASE_URL', BASE_URL)
</script>

<style lang="scss">
  .el-header,
  .el-footer {
    position: relative;
    z-index: 99;
    background-color: white;
  }

  .el-aside {
    background-color: white;
  }

  .layout-container {
    height: calc(100vh - 80px);
  }

  .el-main {
    position: relative;
    padding: 12px;
    background-color: #f5f5f5;
    @media (min-width: 1111px) {
      overflow-x: hidden;
    }
  }
</style>
