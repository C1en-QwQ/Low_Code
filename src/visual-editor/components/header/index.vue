<!-- 还未完成，半成品 -->
<template>
  <el-row class="header">
    <!-- 左侧logo start -->
    <el-col :span="6" class="flex items-center">
      <div class="logo"></div>
      <h3 class="font-semibold">积木</h3>
    </el-col>
    <!-- 左侧logo end -->
    <!-- 中间操作页面部分 start -->
    <el-col class="flex items-center" :span="12">
      <template v-for="(toolItem, toolIndex) in tools" :key="toolIndex">
        <div :class="[`w-1/${tools.length}`]" class="w-1/9">
          <div
            class="tool-item flex flex-col items-center cursor-pointer"
          >
            <el-tooltip class="item" effect="light" :content="toolItem.title" placement="bottom">
              <el-icon>
                <component :is="toolItem.icon" />
              </el-icon>
            </el-tooltip>
          </div>
        </div>
      </template>
    </el-col>
    <!-- 中间操作页面部分 end -->
    <!-- 右侧工具栏 start -->
    <el-col :span="6" class="right-tools flex flex-row-reverse items-center">
      <el-tooltip class="item" effect="light" content="运行" placement="bottom">
        <el-button type="primary" size="small" circle class="flex-shrink-0 !p-6px">
          <el-icon size="large" color="black"><VideoPlay /></el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="github" placement="bottom">
        <a href="#" target="_blank">
          <img :src="`${BASE_URL}github.svg`" alt="" width="30" height="30" />
        </a>
      </el-tooltip>
    </el-col>
    <!-- 右侧工具栏 end -->
  </el-row>
  <!-- <Preview v-model:visible="isShowH5Preview" /> -->
</template>

<script setup lang="ts">
  import { VideoPlay } from '@element-plus/icons-vue';
  import { BASE_URL } from '@/visual-editor/utils';
  import { useTools } from './useTools';
  // import Preview from './preview.vue';
  // import { ref } from '@vue/reactivity';
  // console.log('BASE_URL:', BASE_URL);
  const tools = useTools();
  defineOptions({
    name: 'Header'
  })
  // const isShowH5Preview = ref(false);

</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    .logo {
      width: 40px;
      height: 40px;
      background-image: url(@/assets/logo.png);
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
</style>
