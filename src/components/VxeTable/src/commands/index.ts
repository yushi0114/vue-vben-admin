import { VxeGlobalCommandsHandles } from 'vxe-table';

export const commands: Recordable<VxeGlobalCommandsHandles.CommandsCallback> = {
  exportBtn: ({ $table }) => {
    $table.exportData();
  },
};
