<template>
  <el-container>
    <el-header height="40px" class="flex items-center shadow-md">
      <Header />
    </el-header>
    <el-container class="layout-container">
      <el-aside class="shadow-sm" width="300px">
        <LeftAside />
      </el-aside>
      <el-main>
        <!-- 中间编辑区域start -->
        <SimulatorEditor />
        <!-- 中间编辑区域end -->
        <!-- 右侧属性面板start -->
        <RightAttributePanel />
        <!-- 右侧属性面板end -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import Header from './components/header/index.vue';
  import LeftAside from './components/left-aside/index.vue';
  import SimulatorEditor from './components/simulator-editor/simulator-editor.vue';
  import RightAttributePanel from './components/right-attribute-panel'

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
