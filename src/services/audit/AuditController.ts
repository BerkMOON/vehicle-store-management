/* eslint-disable */
import { ResponseInfoType } from '@/types/common';
import { request } from '@umijs/max';
import {
  AcceptRequest,
  ListRequest,
  ListResponse,
  ProcessRequest,
  TaskInfo,
} from './typings';

const API_PREFIX = '/api/business/task';
export const AuditAPI = {
  /**
   * b端工单列表
   * GET /api/business/task/list
   * 接口ID：undefined
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-undefined
   */
  getTaskList: (params: ListRequest) =>
    request<ResponseInfoType<ListResponse>>(`${API_PREFIX}/list`, {
      method: 'GET',
      params,
    }),

  /**
   * b端工单确认
   * POST /api/business/task/accept
   * 接口ID：undefined
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-undefined
   */
  Accept: (params: AcceptRequest) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/accept`, {
      method: 'POST',
      data: params,
    }),

  /**
   * b端工单处理
   * POST /api/business/task/process
   * 接口ID：undefined
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-undefined
   */
  Process: (params: ProcessRequest) =>
    request<ResponseInfoType<null>>(`${API_PREFIX}/process`, {
      method: 'POST',
      data: params,
    }),

  /**
   * b端工单详情
   * GET /api/business/task/detail
   * 接口ID：273166677
   * 接口地址：https://app.apifox.com/link/project/5084807/apis/api-273166677
   */
  Detail: (clueId: string) =>
    request<ResponseInfoType<TaskInfo>>(`${API_PREFIX}/detail`, {
      method: 'GET',
      params: {
        clue_id: clueId,
      },
    }),
};
