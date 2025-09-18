import { MileageReminderInfo } from '@/services/device/typings';

export const getColumns = () => {
  return [
    {
      title: '公司名称',
      dataIndex: 'company_name',
    },
    {
      title: '门店名称',
      dataIndex: 'store_name',
    },
    {
      title: '设备SN码',
      dataIndex: 'sn',
    },
    {
      title: '车型',
      dataIndex: 'device_id',
      render: (_: any, record: MileageReminderInfo) => {
        return <span>{`${record.brand} ${record.car_model}`}</span>;
      },
    },
    {
      title: '里程',
      dataIndex: 'mileage',
      render: (text: number) => {
        return <span>{text.toFixed(0)} km</span>;
      },
    },
    {
      title: '用户手机号',
      dataIndex: 'phone',
    },
  ];
};

export const MileageNameMap = [
  {
    key: 'store_name',
    name: '门店',
    width: 20,
  },
  {
    key: 'sn',
    name: '设备号',
    width: 18,
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
    name: '用户里程(km)',
    key: (mileageInfo: MileageReminderInfo) => {
      return mileageInfo?.mileage?.toFixed(2) + ' km';
    },
    width: 15,
  },
  {
    key: 'phone',
    name: '手机号',
    width: 13,
  },
];
