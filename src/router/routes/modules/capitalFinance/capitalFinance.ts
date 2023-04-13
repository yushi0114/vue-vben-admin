import { RoleEnum } from '@/enums/roleEnum';
import { t } from '@/hooks/web/useI18n';
import { getParentLayout, LAYOUT } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const capitalFinance: AppRouteModule[] = [
  {
    path: '/capital-finance/collecting',
    name: 'CapitalFinanceCollecting',
    component: LAYOUT,
    redirect: '/capital-finance/collecting/project-manage/urge-invoice-list',
    meta: {
      orderNo: 30,
      icon: 'ion:layers-outline',
      title: t('routes.capitalFinance.capitalFinanceManage.menu'),
      roles: [RoleEnum.SUPER],
    },

    children: [
      {
        path: 'project-manage/urge-invoice-list',
        name: 'UrgeInvoiceList',
        component: () => import('@/views/finance/project/index.vue'),
        meta: {
          title: t('routes.capitalFinance.capitalFinanceManage.projectManage.menu'),
        },
      },
      {
        path: 'free-project-manage',
        name: 'FreeProjectManage',
        component: () => import('@/views/finance/freeProject/index.vue'),
        meta: {
          title: t('routes.capitalFinance.capitalFinanceManage.freeProjectManage.menu'),
        },
      },
      {
        path: 'auditing-manage',
        name: 'AuditingManage',
        component: getParentLayout('AuditingManage'),
        meta: {
          title: t('routes.capitalFinance.capitalFinanceManage.auditingManage.menu'),
        },
        children: [
          {
            path: 'wait-auditing-invoice',
            name: 'WaitAuditingInvoice',
            component: () => import('@/views/finance/auditing/waitAuditing/index.vue'),
            meta: {
              title: t('routes.capitalFinance.capitalFinanceManage.auditingManage.menu'),
            },
          },
          {
            path: 'month-pack-up-invoice',
            name: 'MonthPackUpInvoice',
            component: () => import('@/views/finance/auditing/monthPackUp/index.vue'),
            meta: {
              title: t('routes.capitalFinance.capitalFinanceManage.auditingManage.monthPackUp'),
            },
          },
        ],
      },
      {
        path: 'return-manage',
        name: 'ReturnManage',
        component: getParentLayout('ReturnManage'),
        meta: {
          title: t('routes.capitalFinance.capitalFinanceManage.returnManage.menu'),
        },
        children: [
          {
            path: 'return-edit',
            name: 'ReturnEdit',
            component: () => import('@/views/finance/return/edit/index.vue'),
            meta: {
              title: t('routes.capitalFinance.capitalFinanceManage.returnManage.edit'),
            },
          },
          {
            path: 'return-auditing',
            name: 'ReturnAuditing',
            component: () => import('@/views/finance/return/audit/index.vue'),
            meta: {
              title: t('routes.capitalFinance.capitalFinanceManage.returnManage.audit'),
            },
          },
          {
            path: 'return-note',
            name: 'ReturnNote',
            component: () => import('@/views/finance/return/note/index.vue'),
            meta: {
              title: t('routes.capitalFinance.capitalFinanceManage.returnManage.note'),
            },
          },
        ],
      },
      {
        path: 'send-manage',
        name: 'SendManage',
        component: getParentLayout('SeturnManage'),
        meta: {
          title: t('routes.capitalFinance.capitalFinanceManage.sendManage.menu'),
        },
        children: [
          {
            path: 'send-email-invoice',
            name: 'SendEmailInvoice',
            component: () => import('@/views/finance/send/sendEmailInvoice/index.vue'),
            meta: {
              title: t('routes.capitalFinance.capitalFinanceManage.sendManage.sendEmailInvoice'),
            },
          },
          {
            path: 'send-tax-invoice',
            name: 'SendTaxInvoice',
            component: () => import('@/views/finance/send/sendTaxInvoice/index.vue'),
            meta: {
              title: t('routes.capitalFinance.capitalFinanceManage.sendManage.sendTaxInvoice'),
            },
          },
          {
            path: 'send-bumf-invoice',
            name: 'SendBumfInvoice',
            component: () => import('@/views/finance/send/sendBumfInvoice/index.vue'),
            meta: {
              title: t('routes.capitalFinance.capitalFinanceManage.sendManage.sendBumfInvoice'),
            },
          },
        ],
      },
    ],
  },
  {
    path: '/capital-finance/collecting/project-view',
    name: 'ProjectView',
    component: () => import('@/views/finance/project/ProjectView.vue'),
    meta: {
      title: t('routes.capitalFinance.capitalFinanceManage.projectManage.menu'),
    },
  },
];

export default capitalFinance;
