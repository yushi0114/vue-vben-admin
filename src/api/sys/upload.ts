import { AxiosProgressEvent } from 'axios';

import { useGlobSetting } from '@/hooks/setting';
import { defHttp } from '@/utils/http/axios';
import { UploadFileParams } from '#/axios';

import { UploadApiResult } from './model/uploadModel';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}
