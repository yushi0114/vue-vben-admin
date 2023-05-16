import antdLocale from 'ant-design-vue/es/locale/en_US';
import vxeTableLocale from 'vxe-table/lib/locale/lang/en-US';

import { genMessage } from '../helper';

const modules = import.meta.glob('./en/**/*.ts', {
  eager: true,
});
export default {
  message: {
    ...genMessage(modules, 'en'),
    antdLocale,
    ...vxeTableLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
