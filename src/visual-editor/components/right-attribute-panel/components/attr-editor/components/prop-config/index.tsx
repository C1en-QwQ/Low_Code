import { useVisualData } from "@/visual-editor/hooks/useVisualData";
import { VisualEditorBlockData, VisualEditorComponent } from "@/visual-editor/visual-editor.utils";
import { cloneDeep } from "lodash-es";
import { computed, defineComponent, PropType } from "vue";
import { VisualEditorProps, VisualEditorPropsType } from "@/visual-editor/visual-editor.props";
import { useDotProp } from "@/visual-editor/hooks/useDotProp";
import { ElCascader, ElColorPicker, ElFormItem, ElIcon, ElInput, ElInputNumber, ElOption, ElSelect, ElSwitch, ElTooltip, ExpandTrigger } from "element-plus";
import { Warning } from "@element-plus/icons-vue";
import { TablePropEditor, CrossSortableOptionsEditor } from '../../components';

// 根据
export const PropConfig = defineComponent({
  props: {
    component: {
      type: Object as PropType<VisualEditorComponent>,
      default: () => ({}),
    },
    block: {
      type: Object as PropType<VisualEditorBlockData>,
      default: () => ({})
    },
  },
  setup(props) {
    const { jsonData } = useVisualData();

    const models = computed(() => cloneDeep(jsonData.models));
    // 根据属性进行表单单项的渲染
    const renderPropItem = (propName: string, propConfig: VisualEditorProps) => {
      const { propObj, prop } = useDotProp(props.block.props, propName);
      // 如果属性对应的值为空则赋给默认值
      propObj[prop] ??= propConfig.defaultValue;

      // 根据属性的类型渲染对应的属性
      return {
        // 输入框
        [VisualEditorPropsType.input]: () => {
          if (!Object.is(propObj[prop], undefined) && !Object.is(propObj[prop], null)) {
            propObj[prop] = `${propObj[prop]}`;
          }
          return (
            <ElInput v-model={propObj[prop]} placeholder={propConfig.tips || propConfig.label} />
          );
        },
        // 数字输入框
        [VisualEditorPropsType.inputNumber]: () => {
          const parseRes = parseFloat(propObj[prop]);
          propObj[prop] = Number.isNaN(parseRes) ? 0 : parseRes;
          return <ElInputNumber v-model={propObj[prop]} />;
        },
        // 开关
        [VisualEditorPropsType.switch]: () => <ElSwitch v-model={propObj[prop]} />,
        // 颜色选择器
        [VisualEditorPropsType.color]: () => <ElColorPicker v-model={propObj[prop]} />,
        // 可拖拽项
        [VisualEditorPropsType.crossSortable]: () => (
          <CrossSortableOptionsEditor
            v-model={propObj[prop]}
            multiple={propConfig.multiple}
            showItemPropsConfig={propConfig.showItemPropsConfig}
          />
        ),
        // 下拉选择器
        [VisualEditorPropsType.select]: () => (
          <ElSelect v-model={propObj[prop]} valueKey={'value'} multiple={propConfig.multiple}>
            {propConfig.options?.map((opt) => (
              <ElOption label={opt.label} style={{ fontFamily: opt.value }} value={opt.value} />
            ))}
          </ElSelect>
        ),
        // 表格
        [VisualEditorPropsType.table]: () => (
          <TablePropEditor v-model={propObj[prop]} propConfig={propConfig} />
        ),
        // 模型绑定
        [VisualEditorPropsType.modelBind]: () => (
          <ElCascader
            clearable={true}
            props={{
              checkStrictly: true,
              children: 'entitys',
              label: 'name',
              value: 'key',
              expandTrigger: ExpandTrigger.HOVER,
            }}
            placeholder="请选择绑定的请求数据"
            v-model={propObj[prop]}
            options={[...models.value]}
          ></ElCascader>
        ),
      }[propConfig.type]();
    };

    return () => {
      return Object.entries(props.component.props ?? {}).map(([propName, propConfig]) => (
        <>
          <ElFormItem
            key={props.block._vid + propName}
            style={
              propConfig.labelPosition == 'top'
                ? {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }
                : {}
            }
          >
            {{
              label: () => (
                <>
                  {/* 考虑存在提示属性，因此需要在前面加上文字提示框 */}
                  {propConfig.tips && (
                    <ElTooltip
                      placement="left-start"
                      popper-class="max-w-200px"
                      content={propConfig.tips}
                    >
                      <div>
                        <ElIcon>
                          <Warning />
                        </ElIcon>
                      </div>
                    </ElTooltip>
                  )}
                  {propConfig.label}
                </>
              ),
              // 渲染组件
              default: () => renderPropItem(propName, propConfig),
            }}
          </ElFormItem>
        </>
      ));
    };
  }
})
