/* eslint-disable */
import { PageInfoParams, ResponseInfoType } from '@/types/common';
import { request } from '@umijs/max';
import type {
  DeviceRequest,
  DeviceResponse,
  LossRequest,
  LossResponse,
  MileageReminderRequest,
  MileageReminderResponse,
  OldDeviceResponse,
  UnusedDeviceResponse,
} from './typings';

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

  /**
   * 流失提醒-店端
   * GET /api/business/device/getLossNotifications
   * 接口ID：314228471
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-314228471
   */
  getLossNotifications: (params?: LossRequest) =>
    request<ResponseInfoType<LossResponse>>(
      `${API_PREFIX}/getLossNotifications`,
      {
        method: 'GET',
        params,
      },
    ),

  /**
   * b端里程列表
   * GET /api/business/device/mileage/list
   * 接口ID：345524847
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-345524847
   */
  getMileageReminder: (params?: MileageReminderRequest) =>
    request<ResponseInfoType<MileageReminderResponse>>(
      `${API_PREFIX}/mileage/list`,
      {
        method: 'GET',
        params,
      },
    ),

  /**
   * 10天未上线设备列表
   * GET /api/business/device/unused/list
   * 接口ID：348283269
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-348283269
   */
  getUnusedDeviceList: (params?: PageInfoParams) =>
    request<ResponseInfoType<UnusedDeviceResponse>>(
      `${API_PREFIX}/unused/list`,
      {
        method: 'GET',
        params,
      },
    ),

  /**
   * 未升级设备列表
   * GET /api/business/device/unused/listNotUpdated/
   * 接口ID：364800230
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-364800230
   */
  getOldDeviceList: (params?: PageInfoParams) =>
    request<ResponseInfoType<OldDeviceResponse>>(
      `${API_PREFIX}/unused/listNotUpdated`,
      {
        method: 'GET',
        params,
      },
    ),

  /**
   * 查询有效设备标记
   * GET /api/business/device/call/mark/list
   * 接口ID：364802799
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-364802799
   */
  getCallMarkList: () =>
    request<
      ResponseInfoType<{ mark_list: { sn: string; expire_time: string }[] }>
    >(`${API_PREFIX}/call/mark/list`, {
      method: 'GET',
    }),

  /**
   * 创建设备标记
   * POST /api/business/device/call/mark/create
   * 接口ID：364801552
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-364801552
   */
  createCallMark: (params: { sn: string; expire_time: string }) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/call/mark/create`, {
      method: 'POST',
      data: params,
    }),
};
