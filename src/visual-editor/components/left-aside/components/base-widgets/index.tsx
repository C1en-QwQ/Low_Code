import { visualConfig } from "@/visual.config";
import { Edit } from "@element-plus/icons-vue";
import { cloneDeep } from "lodash-es";
import { defineComponent, ref } from "vue";
import { createNewBlock } from '@/visual-editor/visual-editor.utils';
import DraggableTransitionGroup from '@/visual-editor/components/simulator-editor/draggable-Transition-group.vue';
import styles from './index.module.scss';

export default defineComponent({
  name: 'BaseWidgets',
  label: '基本组件',
  order: 3,
  icon: Edit,
  setup() {
    // 基础组件对象
    const baseWidgets = ref(visualConfig.componentModules.baseWidgets);

    const log = (evt) => {
      window.console.log('onChange:', evt);
    };
    // 克隆组件
    const cloneDog = (comp) => {
      // console.log('当前正在拖拽的组件：', comp);
      // 克隆出来的组件数据
      const newComp = cloneDeep(comp);
      // 根据数据创建组件对象并返回
      return createNewBlock(newComp);
    };

    // 基础物料中的内容
    return() => (
      <>
        <DraggableTransitionGroup
          class={styles.listGroup}
          v-model={baseWidgets.value}
          group={{ name: 'components', pull: 'clone', put: false }}
          clone={cloneDog}
          onChange={log}
          itemKey={'key'}
        >
          {{
            item: ({ element }) => (
              <div class={styles.listGroupItem} data-label={element.label}>
                {element.preview()}
              </div>
            ),
          }}
        </DraggableTransitionGroup>
      </>
    );
  }
})
