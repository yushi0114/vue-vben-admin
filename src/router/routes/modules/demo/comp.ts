import { t } from '@/hooks/web/useI18n';
import { getParentLayout, LAYOUT } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const comp: AppRouteModule = {
  path: '/comp',
  name: 'Comp',
  component: LAYOUT,
  redirect: '/comp/basic',
  meta: {
    orderNo: 30,
    icon: 'ion:layers-outline',
    title: t('routes.demo.comp.comp'),
  },

  children: [
    {
      path: 'table',
      name: 'TableDemo',
      redirect: '/comp/table/vxeTable',
      component: getParentLayout('TableDemo'),
      meta: {
        // icon: 'carbon:table-split',
        title: t('routes.demo.table.table'),
      },

      children: [
        {
          path: 'vxeTable',
          name: 'VxeTableDemo',
          component: () => import('@/views/demo/table/VxeTable.vue'),
          meta: {
            title: t('routes.demo.table.vxeTable'),
          },
        },
      ],
    },
  ],
};

export default comp;
