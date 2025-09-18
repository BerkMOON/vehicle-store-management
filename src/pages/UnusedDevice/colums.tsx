export const getColumns = () => {
  return [
    {
      title: '设备SN码',
      dataIndex: 'sn',
    },
    {
      title: '首次上报时间',
      dataIndex: 'onset_time',
    },
    {
      title: '最后一次上报时间',
      dataIndex: 'mtime',
    },
    {
      title: '车辆品牌',
      dataIndex: 'brand',
    },
    {
      title: '车辆型号',
      dataIndex: 'car_model',
    },
    {
      title: '用户手机号',
      dataIndex: 'phone',
    },
  ];
};

export const UnusedDeviceNameMap = [
  {
    key: 'sn',
    name: '设备号',
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
    name: '用户手机号',
    width: 15,
  },
  {
    key: 'onset_time',
    name: '首次上报时间',
    width: 20,
  },
  {
    key: 'mtime',
    name: '最后上报时间',
    width: 20,
  },
];
