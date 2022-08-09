import { defineComponent } from "vue";
import { ElTabs } from "element-plus/lib/components";
import styles from './index.module.scss'

export default defineComponent({
  name: 'RightAttributePanel',
  setup() {
    return () => (
      <>
        <div class={[styles.drawer]}>
          RightAttributePanel
        </div>
      </>
    )
  }
})
