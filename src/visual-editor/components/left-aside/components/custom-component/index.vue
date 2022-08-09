<template>
  CustomComponent
</template>

<script setup lang="ts">
  import { Upload } from '@element-plus/icons-vue';

  defineOptions({
    name: 'CustomComponent',
    label: '业务组件',
    order: 5,
    icon: Upload,
  })
</script>

<style scoped>

</style>
