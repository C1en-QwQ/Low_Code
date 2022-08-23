import { defineComponent, reactive, watch } from "vue";
import styles from './index.module.scss'
import { useVisualData } from "@/visual-editor/hooks/useVisualData";
import { ElTabPane, ElTabs } from "element-plus";
import { AttrEditor } from "./components/attr-editor";

export default defineComponent({
  name: 'RightAttributePanel',
  setup() {
    // 获取现在在操作的组件
    const { currentBlock } = useVisualData();

    const state = reactive({
      // 要显示的属性
      activeName: 'attr',
    });

    watch(
      () => currentBlock.value.label,
      (newLabel) => {
        if (!newLabel?.startsWith('表单') && state.activeName == 'form-rule') {
          state.activeName = 'attr';
        }
      },
    );

    return () => (
      <>
        <div class={[styles.drawer]}>
          <div  class={styles.attrs}>
            <ElTabs
              v-model={state.activeName}
              type="border-card"
              stretch={true}
              class={styles.tabs}
            >
              <ElTabPane label="属性" name="attr">
                {/* 属性编辑 */}
                <AttrEditor />
              </ElTabPane>
            </ElTabs>
          </div>
        </div>
      </>
    )
  }
})
