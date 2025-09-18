import { DeviceList } from '@/services/device/typings';

export const getColumns = () => {
  return [
    {
      title: '门店名称',
      dataIndex: 'store_name',
    },
    {
      title: '设备SN码',
      dataIndex: 'sn',
    },
    {
      title: '车架号',
      dataIndex: 'vin',
    },
    {
      title: '车辆型号',
      dataIndex: 'car_model',
    },
    {
      title: '用户手机号',
      dataIndex: 'phone',
    },
    {
      title: '首次上报时间',
      dataIndex: 'onset_time',
    },
    {
      title: '用户状态',
      dataIndex: ['status', 'name'],
    },
    {
      title: '用户绑定时间',
      dataIndex: 'bind_time',
    },
  ];
};

export const DeviceNameMap = [
  {
    key: 'store_name',
    name: '门店',
    width: 20,
  },
  {
    key: 'sn',
    name: '设备号',
    width: 20,
  },
  {
    key: 'vin',
    name: '车架号',
    width: 25,
  },
  {
    key: 'brand',
    name: '品牌',
    width: 10,
  },
  {
    key: 'car_model',
    name: '用户车型',
    width: 15,
  },
  {
    key: 'phone',
    name: '手机号',
    width: 13,
  },
  {
    key: (deviceInfo: DeviceList) => {
      return deviceInfo?.status?.name;
    },
    name: '用户状态',
    width: 10,
  },
  {
    key: 'bind_time',
    name: '首次绑定时间',
    width: 20,
  },
  {
    key: 'onset_time',
    name: '首次上报时间',
    width: 20,
  },
];
