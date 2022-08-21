<template>
  <draggable
    v-model="list"
    class="dragArea list-group"
    :class="{ isDrag }"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !isDrag ? 'flip-list' : null,
    }"
    :group="group"
    v-bind="{ ...dragOptions, ...$attrs }"
    :item-key="itemKey"
    @start="isDrag = true"
    @end="isDrag = false"
  >
    <template #item="item">
      <div :class="{ 'item-drag': item.element.draggable }" :data-el="item.element.draggable">
        <slot name="item" v-bind="item"></slot>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed } from 'vue';
import draggable from 'vuedraggable';

  defineOptions({
    name: 'DraggableTransitionGroup',
  });

  const props = defineProps({
    moduleValue: {
      type: Array,
      default: () => [],
    },
    drag: {
      type: Boolean,
      default: false,
    },
    itemKey: {
      type: String,
      default: '_vid',
    },
    group: {
      type: Object,
      default: () => ({ name: 'components' }),
    },
    fallbackClass: String,
  });
  const emit = defineEmits(['update:moduleValue', 'update:drag']);

  const list = useVModel(props, 'moduleValue', emit);
  const isDrag = useVModel(props, 'drag', emit);

  const dragOptions = computed(() => ({
    animation: 200,
    disabled: false,
    scroll: true,
    ghostClass: 'ghost',
  }));
</script>

<style scoped lang="scss">
  @import './func.scss';

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    background: #c8ebfb;
    opacity: 0.5;
  }

  .list-group {
    height: 100%;
    min-height: 40px;

    &.isDrag:not(.no-child) :deep(.list-group-item.has-slot) {
      @include showContainerBorder;
    }
  }
</style>
