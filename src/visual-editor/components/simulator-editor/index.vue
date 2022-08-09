<template>
  <div class="simlator-container">
    <div class="simulator-editor">
      <div class="simulator-editor-content">
        simulator-editor
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'SimulatorEditor'
  })
</script>

<style lang="scss" scoped>
  .simlator-container {
    display: flex;
    width: 100%;
    height: 100%;
    padding-right: 400px;
    align-items: center;
    justify-content: center;

    @media (max-width: 1114px) {
      padding-right: 0;
    }
  }

  .simulator-editor {
    width: 660px;
    height: 740px;
    min-width: 660px;
    padding: 60px 150px;
    overflow: hidden auto;
    background: #fafafa;
    border-radius: 5px;
    box-sizing: border-box;
    background-clip: content-box;
    contain: layout;

    &::-webkit-scrollbar {
      width: 0;
    }

    &-content {
      min-height: 100%;
      transform: translate(0);
      box-shadow: 0 8px 12px #ebebeb;
    }
  }
</style>
