<template>
  <el-tabs v-model="activeName" tab-position="left" class="left-aside">
    <template v-for="tabItem in tabs" :key="tabItem.name">
      <el-tab-pane :name="tabItem.name" lazy>
        <template #label>
          <div class="tab-item">
            <el-icon :size="26"><component :is="tabItem.icon" /></el-icon>
            {{ tabItem.label }}
          </div>
        </template>
        <component :is="tabItem.comp" v-bind="$attrs" />
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import components from './components';

  defineOptions({
    name: 'LeftAside',
  });

  const tabs = Object.entries(components)
    .map(([name, component]) => {
      const { label, icon, order } = component;
      return { label, icon, name, order, comp: component };
    })
    .sort((a, b) => a.order - b.order);

  const activeName = ref(tabs[0].name);

</script>

<style lang="scss" scoped>
  .left-aside {
    height: 100%;
    contain: layout;

    > :deep(.el-tabs__header) {
      margin-right: 0;

      .el-tabs__item {
        height: 80px;
        padding: 20px 16px;

        .tab-item {
          // windi css 的一个指令
          @apply flex flex-col items-center justify-center;

          [class^='el-icon-'] {
            font-size: 20px;
          }
        }
      }
    }

    > :deep(.el-tabs__content) {
      height: 100%;
      overflow-y: auto;
    }
  }
</style>
