import { readonly } from 'vue';

import { SwitchEnum } from '@/enums/statusEnum';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const SWITCH_MAP = readonly({
  [SwitchEnum.ON]: t('common.yesText'),
  [SwitchEnum.OFF]: t('common.noText'),
});
