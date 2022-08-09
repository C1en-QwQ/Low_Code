import { defineComponent } from "vue";
import { Suitcase } from "@element-plus/icons-vue";

export default defineComponent({
  name: 'ContainerComponent',
  label: '容器组件',
  icon: Suitcase,
  order: 4,
  setup() {
    return () => {
      return (
        'ContainerComponent'
      )
    }
  }
})
