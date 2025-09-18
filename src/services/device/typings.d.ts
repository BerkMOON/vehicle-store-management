import { BaseListInfo, PageInfoParams, StatusInfo } from '@/types/common';

export interface DeviceResponse extends BaseListInfo {
  device_list: DeviceList[];
}

export interface DeviceList {
  createTime: string;
  mileage: number;
  onsetTime: string;
  phone: string;
  sn: string;
  status: StatusInfo;
  vin: string;
}

export interface DeviceRequest extends PageInfoParams {
  report_status?: string;
  endTime?: string;
  phone?: string;
  sn?: string;
  startTime?: string;
  onset_start_time?: string;
  onset_end_time?: string;
  /**
   * 状态，init未绑定，bound已绑定
   */
  status?: string;
  vin?: string;
}

export interface LossRequest extends PageInfoParams {
  sn?: string;
  device_id?: string;
  start_time?: string;
  end_time?: string;
}

export interface LossInfo {
  company_name?: string;
  device_id?: string;
  location?: string;
  nearby_points?: NearbyPoint[];
  sn?: string;
  store_name?: string;
  trigger_time?: string;
  car_model?: string;
  phone?: string;
}

export interface NearbyPoint {
  address: string;
  city: string;
  distance: number | number;
  district: string;
  name: string;
}

export interface LossResponse extends BaseListInfo {
  record_list: LossInfo[];
}

export interface MileageReminderRequest extends PageInfoParams {
  company_id?: number;
  mileage?: number;
  sn?: string;
  store_id?: number;
}

export interface MileageReminderInfo {
  company_name?: string;
  device_id?: string;
  id?: number;
  mileage?: number;
  phone?: string;
  sn?: string;
  store_name?: string;
  brand?: string;
  car_model?: string;
}
export interface MileageReminderResponse extends BaseListInfo {
  item_list: MileageReminderInfo[];
}

export interface UnusedDeivceInfo {
  company_name?: string;
  device_id?: string;
  mtime?: string;
  onset_time?: string;
  phone?: string;
  sn?: string;
  store_name?: string;
}

export interface UnusedDeviceResponse extends BaseListInfo {
  record_list: UnusedDeivceInfo[];
}
