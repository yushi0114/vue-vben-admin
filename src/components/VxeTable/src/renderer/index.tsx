import { h } from 'vue';
import { RendererOptions } from 'vxe-table';

import { cellText, createEvents, createProps, getComponent } from '../components/common';

const COMPONENT_NAME = 'AButton';
export const renderer: { [name: string]: RendererOptions } = {
  ToolbarButtonDownload: {
    renderToolbarButton(renderOpts, params) {
      const Component = getComponent(COMPONENT_NAME);
      const { attrs } = renderOpts;
      const { $table } = params;
      const defaultProps = {
        preIcon: 'ant-design:download-outlined',
      };
      const exportData = () => {
        $table.exportData();
      };
      return [
        h(
          Component,
          {
            ...attrs,
            ...createProps(renderOpts, null, defaultProps),
            ...createEvents(renderOpts, params, undefined, undefined, exportData),
          },
          cellText(renderOpts.content || '导出数据'),
        ),
      ];
    },
  },
};
