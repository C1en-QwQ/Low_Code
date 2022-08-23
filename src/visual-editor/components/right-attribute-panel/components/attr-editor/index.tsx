// 组件属性编辑器

import { FormatInputNumber } from "@/visual-editor/components/common/format-input-number";
import { useVisualData } from "@/visual-editor/hooks/useVisualData";
import { Warning } from "@element-plus/icons-vue";
import { ElForm, ElFormItem, ElIcon, ElPopover, ElRadioButton, ElRadioGroup } from "element-plus";
import { computed, defineComponent, watch } from "vue";
import { PropConfig } from "./components/prop-config";


export const AttrEditor = defineComponent({
  setup() {
    const { visualConfig, currentBlock } = useVisualData();

    const compPaddingAttrs = ['paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom'];

    watch(
      compPaddingAttrs.map((item) => () => currentBlock.value.styles?.[item]),
      (val: string[]) => {
        const isSame = val.every((item) => currentBlock.value.styles?.tempPadding == item);
        // 如果没改变或者四个方向的值相同
        if (isSame || new Set(val).size === 1) {
          if (Reflect.has(currentBlock.value, 'styles')) {
            currentBlock.value.styles.tempPadding = val[0];
          }
        } else {
          // 否则将组件内边距清空，因为组件内边距有值的话会将所有方向的设为一样
          currentBlock.value.styles.tempPadding = '';
        }
      },
    );

    // 组件内边距变化时进行的操作
    const compPadding = computed({
      get: () => currentBlock.value.styles?.tempPadding,
      set(val) {
        compPaddingAttrs.forEach((item) => (currentBlock.value.styles[item] = val));
        currentBlock.value.styles.tempPadding = val;
      },
    });

    // 表单项
    const FormEditor = () => {
      const content: JSX.Element[] = [];
      if (currentBlock.value) {
        const { componentKey } = currentBlock.value;
        const component = visualConfig.componentMap[componentKey];
        console.log('props.block:', currentBlock.value);
        content.push(
          <>
            <ElFormItem label="组件id" labelWidth={'76px'}>
              {currentBlock.value._vid}
              <ElPopover
                width={200}
                trigger="hover"
                effect="dark"
                content={`可以利用组件ID获取组件并设置属性，可用属性在控制台输入：$$refs.${currentBlock.value._vid}进行查看`}
              >
                {{
                  reference: () => (
                    <ElIcon class={'ml-6px'}>
                      <Warning />
                    </ElIcon>
                  ),
                }}
              </ElPopover>
            </ElFormItem>
          </>,
        );
        if (component) {
          if (component.props) {
            content.push(<PropConfig component={component} block={currentBlock.value} />);
            {
              currentBlock.value.showStyleConfig &&
                content.push(
                  <ElFormItem label={'组件对齐方式'} labelWidth={'90px'}>
                    <ElRadioGroup v-model={currentBlock.value.styles.justifyContent}>
                      <ElRadioButton label="flex-start">{'左对齐'}</ElRadioButton>
                      <ElRadioButton label="center">{'居中'}</ElRadioButton>
                      <ElRadioButton label="flex-end">{'右对齐'}</ElRadioButton>
                    </ElRadioGroup>
                  </ElFormItem>,
                  <ElFormItem class={'flex flex-col justify-start'}>
                    {{
                      label: () => (
                        <div class={'flex justify-between mb-2'}>
                          <div class="mr-3">组件内边距</div>
                          <FormatInputNumber v-model={compPadding.value} class={'!w-100px'} />
                        </div>
                      ),
                      default: () => (
                        <div
                          class={'grid grid-cols-3 gap-2 w-full bg-gray-100 p-20px items-center'}
                        >
                          <FormatInputNumber
                            v-model={currentBlock.value.styles.paddingTop}
                            class={'!w-100px col-span-full col-start-2'}
                          />
                          <FormatInputNumber
                            v-model={currentBlock.value.styles.paddingLeft}
                            class={'!w-100px col-span-1'}
                          />
                          <div class={'bg-white col-span-1 h-40px'}></div>
                          <FormatInputNumber
                            v-model={currentBlock.value.styles.paddingRight}
                            class={'!w-100px col-span-1'}
                          />
                          <FormatInputNumber
                            v-model={currentBlock.value.styles.paddingBottom}
                            class={'!w-100px col-span-full col-start-2'}
                          />
                        </div>
                      ),
                    }}
                  </ElFormItem>,
                );
            }
          }
        }
      }
      return (
        <>
          <ElForm labelPosition={'left'}>{content}</ElForm>
        </>
      );
    };

    return () => (
      <>
        <FormEditor />
      </>
    );
  }
})
