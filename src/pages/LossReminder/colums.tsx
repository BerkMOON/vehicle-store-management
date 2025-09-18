import { LossInfo, NearbyPoint } from '@/services/device/typings';

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
      title: '触发时间',
      dataIndex: 'trigger_time',
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
    {
      title: '触发位置',
      dataIndex: 'nearby_points',
      render: (point: NearbyPoint[]) => {
        return (
          <>
            {point?.map((item, index) => (
              <div key={index}>{item.name}</div>
            ))}
          </>
        );
      },
    },
    {
      title: '具体位置',
      dataIndex: 'nearby_points',
      render: (point: NearbyPoint[]) => {
        return (
          <>
            {point?.map((item, index) => (
              <div key={index}>
                {item.city}
                {item.district}
                {item.address}
              </div>
            ))}
          </>
        );
      },
    },
  ];
};

export const LossNameMap = [
  {
    key: 'sn',
    name: '设备号',
    width: 18,
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
    key: 'trigger_time',
    name: '触发时间',
    width: 18,
  },
  {
    name: '触发地点',
    key: (lossInfo: LossInfo) => {
      return lossInfo.nearby_points?.[0].name || '';
    },
    width: 45,
  },
  {
    name: '具体位置',
    key: (lossInfo: LossInfo) => {
      const city = lossInfo.nearby_points?.[0].city || '';
      const district = lossInfo.nearby_points?.[0].district || '';
      const address = lossInfo.nearby_points?.[0].address || '';
      return city + district + address;
    },
    width: 60,
  },
];
