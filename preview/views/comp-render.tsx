import { defineComponent, PropType } from 'vue';
import type { VisualEditorBlockData } from '@/visual-editor/visual-editor.utils';
import { visualConfig } from '@/visual.config';

export default defineComponent({
  name: 'CompRender',
  props: {
    element: {
      type: Object as PropType<VisualEditorBlockData>,
      default: () => ({}),
    },
  },
  setup(props) {
    return visualConfig.componentMap[props.element.componentKey].render({
      styles: props.element.styles || {},
      props: props.element.props || {},
      model: {},
      block: props.element,
      custom: {},
    });
  },
});
