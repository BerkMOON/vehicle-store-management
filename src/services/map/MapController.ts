import { GdMapApiKey } from '@/constants';
import { request } from '@umijs/max';
import { AddressParams } from './typings';
const prefix = 'https://restapi.amap.com/v3/geocode';

export const MapAPI = {
  getGDAddressInfo: (params: AddressParams) =>
    request<any>(`${prefix}/regeo`, {
      method: 'GET',
      params: {
        ...params,
        key: GdMapApiKey,
      },
    }),
};
