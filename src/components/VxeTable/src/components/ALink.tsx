import { h } from 'vue';
import { VxeGlobalRendererHandles } from 'vxe-table';

import { cellText, createEvents, createProps, getComponent } from './common';

const COMPONENT_NAME = 'AButton';

export function createDefaultRender() {
  return function (
    renderOpts: VxeGlobalRendererHandles.RenderEditOptions,
    params: VxeGlobalRendererHandles.RenderEditParams & { clickValue: string },
  ) {
    const { attrs, props: { separator } = { separator: ';' } } = renderOpts;
    const Component = getComponent(COMPONENT_NAME);
    const { row, column } = params;
    const content = row[column.field];
    const contentList = content ? content.split(separator) : [];
    return contentList.map((item) => {
      params.clickValue = item;

      return h(
        Component,
        {
          ...attrs,
          ...createProps(renderOpts, null, { type: 'link' }),
          ...createEvents(renderOpts, params),
        },
        () => cellText(renderOpts.content || item),
      );
    });
  };
}

export default {
  renderDefault: createDefaultRender(),
};
