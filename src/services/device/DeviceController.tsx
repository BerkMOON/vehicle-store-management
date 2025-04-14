/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { ResponseInfoType } from '@/types/common';
import { request } from '@umijs/max';
import type { DeviceRequest, DeviceResponse } from './typings';

const API_PREFIX = '/api/business/device';

export const DeviceAPI = {
  /**
   * b端设备列表
   * GET /api/business/device/list
   * 接口ID：282433158
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-282433158
   */
  getDeviceList: (params?: DeviceRequest) =>
    request<ResponseInfoType<DeviceResponse>>(`${API_PREFIX}/list`, {
      method: 'GET',
      params,
    }),
};
