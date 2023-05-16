import XEUtils from 'xe-utils';

import { SWITCH_MAP } from '@/utils/constants';

export const formats = {
  formatAmount: ({ cellValue }, digits = 2) => {
    return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits });
  },
  formatDate: ({ cellValue }) => {
    if (!XEUtils.isValidDate(cellValue)) {
      return '--';
    }
    return XEUtils.toDateString(cellValue, 'yyyy-MM-dd');
  },
  formatDateTime: ({ cellValue }) => {
    if (!XEUtils.isValidDate(cellValue)) {
      return '--';
    }
    return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss');
  },
  // 格式化银行卡，默认每4位空格隔开
  formatBankcard({ cellValue }) {
    return XEUtils.commafy(XEUtils.toValueString(cellValue), { spaceNumber: 4, separator: ' ' });
  },
  formatSwitch({ cellValue }) {
    return SWITCH_MAP[cellValue] ?? '--';
  },
};
