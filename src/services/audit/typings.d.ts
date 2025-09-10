import { BaseListInfo, StatusInfo } from '@/types/common';
export interface ListRequest {
  offset?: number;
  limit?: number;
  status?: string;
}

export interface TaskInfo {
  id: number;
  clue_id: string;
  device_id: string;
  vin: string;
  phone: string;
  gps: {
    lat: string;
    lng: string;
  };
  car_model: string;
  brand: string;
  report_time: string;
  video_url: string;
  handler_name: string;
  status: StatusInfo;
  remark: string;
  sn: string;
  level: string;
  create_time: string;
  modify_time: string;
}

// b端工单列表 返回结果
export interface ListResponse extends BaseListInfo {
  task_list: TaskInfo[];
}

export interface AcceptRequest {
  task_id: number;
  clue_id: string;
}

// b端工单处理 请求参数
export interface ProcessRequest {
  task_id: number;
  clue_id: string;
  status: string;
  remark?: string;
}
