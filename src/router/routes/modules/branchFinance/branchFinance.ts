import { RoleEnum } from '@/enums/roleEnum';
import { t } from '@/hooks/web/useI18n';
import { LAYOUT } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const comp: AppRouteModule = {
  path: '/capital-finance/collecting',
  name: 'CapitalFinanceCollecting',
  component: LAYOUT,
  redirect: '/capital-finance/collecting/project-manage/urge-invoice-list',
  meta: {
    orderNo: 30,
    icon: 'ion:layers-outline',
    title: t('routes.capitalFinance.capitalFinanceManage.menu'),
    roles: [RoleEnum.TEST],
  },

  children: [
    {
      path: 'project-manage/urge-invoice-list',
      name: 'UrgeInvoiceList',
      component: () => import('@/views/demo/table/VxeTable.vue'),
      meta: {
        title: t('routes.capitalFinance.capitalFinanceManage.projectManage.menu'),
      },
    },
  ],
};

export default comp;
