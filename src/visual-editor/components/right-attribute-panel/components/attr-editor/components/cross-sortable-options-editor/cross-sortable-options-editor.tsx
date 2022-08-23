// 可拖拽排序的选项列表
// 用于配置多种选项组件

import { useVisualData } from "@/visual-editor/hooks/useVisualData";
import { VisualEditorBlockData, VisualEditorComponent } from "@/visual-editor/visual-editor.utils";
import { computed, defineComponent, PropType, reactive } from "vue";
import { useVModel } from '@vueuse/core';
import { isObject } from "@/visual-editor/utils/is";
import { cloneDeep } from "lodash-es";
import { ElCheckbox, ElCheckboxGroup, ElCollapse, ElCollapseItem, ElForm, ElIcon, ElInput, ElTabPane, ElTabs } from "element-plus";
import Draggable from 'vuedraggable';
import { CirclePlus, Rank, Remove } from "@element-plus/icons-vue";
import { PropConfig } from "../prop-config";

interface OptionItem extends LabelValue {
  component?: VisualEditorComponent;
  block?: VisualEditorBlockData;
}

export const CrossSortableOptionsEditor = defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<(string | OptionItem)[]>,
      default: () => [],
    },
    multiple: Boolean, // 是否为多选
    showItemPropsConfig: Boolean, // 是否多选
  },
  setup(props, { emit }) {
    const { currentBlock } = useVisualData();

    const state = reactive({
      list: useVModel(props, 'modelValue', emit),
      drag: false,
    });

    const checkList = computed({
      get: () => {
        const value = currentBlock.value.props.modelValue;
        return Array.isArray(value) ? value : [...new Set(value?.split(','))];
      },
      set(value) {
        currentBlock.value.props.modelValue = value;
      },
    });

    const dragOptions = computed(() => {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    });

    // 复选框值改变时触发
    const onChange = (val: any[]) => {
      // 筛选出其中不为空的值
      val = val.filter((item) => item !== '');
      // 如果是多选，直接赋值，如果不是，排除已选中的值后赋值
      val = props.multiple
        ? val
        : val.filter((n) => !currentBlock.value.props.modelValue?.includes(n));
      currentBlock.value.props.modelValue = val.join(',');
    };

    // 在某项之前新增一项
    const incrementOption = (index: number) => {
      const length = state.list.length + 1;
      const newItem = state.list.some((item) => isObject(item))
        ? Object.assign(cloneDeep(state.list[0]), {
          label: `选项${length}`,
          value: `选项${length}`,
          })
        : '';
      state.list.splice(index + 1, 0, newItem);
    };

    return () => (
      <div>
        <ElCheckboxGroup
          modelValue={checkList.value}
          style={{ fontSize: 'inherit' }}
          onChange={onChange}
        >
          <Draggable
            tag="ul"
            list={state.list}
            class="list-group"
            component-data={{
              tag: 'ul',
              type: 'transition-group',
              name: !state.drag ? 'flip-list' : null,
            }}
            handle=".handle"
            {...dragOptions.value}
            itemKey={''}
            onStart={() => (state.drag = true)}
            onEnd={() => (state.drag = false)}
          >
            {{
              item: ({ element, index }) => (
                <div class={'flex items-center justify-between'}>
                  <ElIcon class="handle cursor-move">
                    <Rank></Rank>
                  </ElIcon>
                  {isObject(element) ? (
                    <>
                      <ElCheckbox label={element.value} class={'ml-5px'}>
                        {''}
                      </ElCheckbox>
                      label:
                      <ElInput
                        v-model={element.label}
                        class={'my-12px mx-3px'}
                        style={{ width: '108px' }}
                        size="small"
                      ></ElInput>
                      value:
                      <ElInput
                        v-model={element.value}
                        class={'my-12px mx-3px'}
                        style={{ width: '106px' }}
                        size="small"
                      ></ElInput>
                    </>
                  ) : (
                    <ElInput
                      v-model={state.list[index]}
                      class={'m-12px'}
                      style={{ width: '270px' }}
                      size="small"
                    ></ElInput>
                  )}
                  {/* 选项添加删除控件 */}
                  <div class={'flex flex-col'}>
                    <ElIcon
                      class="hover:text-blue-400 cursor-pointer"
                      onClick={() => incrementOption(index)}
                    >
                      <CirclePlus></CirclePlus>
                    </ElIcon>
                    <ElIcon
                      class="hover:text-red-500 cursor-pointer"
                      onClick={() => state.list.splice(index, 1)}
                    >
                      <Remove></Remove>
                    </ElIcon>
                  </div>
                </div>
              ),
            }}
          </Draggable>
        </ElCheckboxGroup>
        {/* 选项配置折叠面板 */}
        {props.showItemPropsConfig && (
          <ElCollapse>
            <ElCollapseItem title={'选项配置'}>
              <ElTabs type={'border-card'}>
                {state.list.map((item: OptionItem) => (
                  <ElTabPane label={item.label} key={item.label}>
                    <ElForm labelPosition={'left'} size="small">
                      <PropConfig component={item.component} block={item.block} />
                    </ElForm>
                  </ElTabPane>
                ))}
              </ElTabs>
            </ElCollapseItem>
          </ElCollapse>
        )}
      </div>
    );
  }
})
