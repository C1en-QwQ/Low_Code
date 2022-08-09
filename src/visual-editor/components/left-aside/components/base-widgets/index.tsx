import { Edit } from "@element-plus/icons-vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'BaseWidgets',
  label: '基本组件',
  order: 3,
  icon: Edit,
  setup() {
    return() => {
      return (
        'BaseWidgets'
      )
    }
  }
})
