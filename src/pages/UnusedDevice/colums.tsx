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
