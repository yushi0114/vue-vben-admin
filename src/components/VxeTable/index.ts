import { VXETable } from 'vxe-table';
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx';

import { withInstall } from '@/utils';

import { commands } from './src/commands';
import { formats } from './src/formats';
import vxeBasicTable from './src/VxeBasicTable';

export const VxeBasicTable = withInstall(vxeBasicTable);
export * from './src/types';
export * from 'vxe-table';

export const setupVXETable = async () => {
  import('./src/css/index.scss');
  const componentSetting = await import('@/settings/componentSetting');
  const VXETablePluginAntd = await import('@/components/VxeTable/src/components');
  const renderer = await import('./src/renderer');

  VXETable.use(VXETablePluginAntd.default).use(VXETablePluginExportXLSX);
  VXETable.setup(componentSetting.default.vxeTable);
  VXETable.formats.mixin(formats);
  VXETable.commands.mixin(commands);
  VXETable.renderer.mixin(renderer.renderer);
};
