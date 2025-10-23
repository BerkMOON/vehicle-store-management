import { Button } from 'antd';

export const getColumns = (onMarkClick: (record: any) => void) => {
  return [
    {
      title: '设备SN码',
      dataIndex: 'sn',
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
      title: '是否是当前版本',
      dataIndex: 'cur_version',
      render: () => {
        return '否';
      },
    },
    {
      title: '是否十天未上线',
      dataIndex: 'is_unused',
      render: (text: string) => {
        return text || '否';
      },
    },
    {
      title: '是否联系过了',
      dataIndex: 'is_contacted',
      render: (text: string) => {
        return text || '否';
      },
    },
    {
      title: '标记到期时间',
      dataIndex: 'contact_time',
      render: (text: string) => {
        return text || '-';
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => {
        // 如果已经联系过了，不显示按钮
        if (record.is_contacted === '是') {
          return null;
        }
        return (
          <Button type="primary" onClick={() => onMarkClick(record)}>
            标记到期时间
          </Button>
        );
      },
    },
  ];
};

export const OldDeviceNameMap = [
  {
    key: 'sn',
    name: '设备SN码',
    width: 20,
  },
  {
    key: 'brand',
    name: '车辆品牌',
    width: 15,
  },
  {
    key: 'car_model',
    name: '车辆型号',
    width: 15,
  },
  {
    key: 'phone',
    name: '用户手机号',
    width: 15,
  },
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key: (_item: any) => '否',
    name: '是否是当前版本',
    width: 15,
  },
  {
    key: 'is_unused',
    name: '是否十天未上线',
    width: 15,
  },
  {
    key: 'is_contacted',
    name: '是否联系过了',
    width: 15,
  },
  {
    key: 'contact_time',
    name: '标记到期时间',
    width: 20,
  },
];
