import { VxeGlobalInterceptorHandles, VXETableCore } from 'vxe-table';

import AApiSelect from './AApiSelect';
import AApiTreeSelect from './AApiTreeSelect';
import AAutoComplete from './AAutoComplete';
import AButton from './AButton';
import AButtonGroup from './AButtonGroup';
import ACascader from './ACascader';
import ACheckboxGroup from './ACheckboxGroup';
import ADatePicker from './ADatePicker';
import AEmpty from './AEmpty';
import AInput from './AInput';
import AInputNumber from './AInputNumber';
import AInputSearch from './AInputSearch';
import ALink from './ALink';
import AMonthPicker from './AMonthPicker';
import ARadioGroup from './ARadioGroup';
import ARangePicker from './ARangePicker';
import ARate from './ARate';
import ASelect from './ASelect';
import ASwitch from './ASwitch';
import ATimePicker from './ATimePicker';
import ATreeSelect from './ATreeSelect';
import AWeekPicker from './AWeekPicker';
import AYearPicker from './AYearPicker';

/**
 * 检查触发源是否属于目标节点
 */
function getEventTargetNode(evnt: any, container: HTMLElement, className: string) {
  let targetElem;
  let target = evnt.target;
  while (target && target.nodeType && target !== document) {
    if (
      className &&
      target.className &&
      target.className.split &&
      target.className.split(' ').indexOf(className) > -1
    ) {
      targetElem = target;
    } else if (target === container) {
      return { flag: className ? !!targetElem : true, container, targetElem: targetElem };
    }
    target = target.parentNode;
  }
  return { flag: false };
}

/**
 * 事件兼容性处理
 */
function handleClearEvent(
  params:
    | VxeGlobalInterceptorHandles.InterceptorClearFilterParams
    | VxeGlobalInterceptorHandles.InterceptorClearActivedParams
    | VxeGlobalInterceptorHandles.InterceptorClearAreasParams,
) {
  const { $event } = params;
  const bodyElem = document.body;
  if (
    // 下拉框
    getEventTargetNode($event, bodyElem, 'ant-select-dropdown').flag ||
    // 级联
    getEventTargetNode($event, bodyElem, 'ant-cascader-menus').flag ||
    // 日期
    getEventTargetNode($event, bodyElem, 'ant-calendar-picker-container').flag ||
    // 时间选择
    getEventTargetNode($event, bodyElem, 'ant-time-picker-panel').flag
  ) {
    return false;
  }
}

/**
 * 基于 vxe-table 表格的适配插件，用于兼容 ant-design-vue 组件库
 */
export const VXETablePluginAntd = {
  install(vxetablecore: VXETableCore) {
    const { interceptor, renderer } = vxetablecore;

    renderer.mixin({
      AAutoComplete,
      AInput,
      AInputNumber,
      ASelect,
      ACascader,
      ADatePicker,
      AMonthPicker,
      ARangePicker,
      AWeekPicker,
      ATimePicker,
      ATreeSelect,
      ARate,
      ASwitch,
      ARadioGroup,
      ACheckboxGroup,
      ALink,
      AButton,
      AButtonGroup,
      AApiSelect,
      AApiTreeSelect,
      AEmpty,
      AInputSearch,
      AYearPicker,
    });

    interceptor.add('event.clearFilter', handleClearEvent);
    interceptor.add('event.clearActived', handleClearEvent);
    interceptor.add('event.clearAreas', handleClearEvent);
  },
};

if (typeof window !== 'undefined' && window.VXETable && window.VXETable.use) {
  window.VXETable.use(VXETablePluginAntd);
}

export default VXETablePluginAntd;
