import { TaskType } from '@/constants';
import { ModalControl } from '@/hooks/useModalControl';
import { TaskInfo } from '@/services/audit/typings';
import { ColumnsProps } from '@/types/common';
import { Button, Divider } from 'antd';

export const getColumns = (props: ColumnsProps<TaskInfo>) => {
  const { handleModalOpen, customModal, createOrModifyModal } = props;
  return [
    {
      title: '工单号',
      dataIndex: 'clue_id',
      key: 'clue_id',
      render: (text: string) => (
        <a
          href={`/auditDetail/${text}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ),
    },
    {
      title: '事故评级',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '线索状态',
      dataIndex: ['status', 'name'],
      key: 'status',
    },
    {
      title: '设备号',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: '审核通过时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '处理人',
      dataIndex: 'handler_name',
      key: 'handler_name',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: TaskInfo) => (
        <>
          <Button
            type="link"
            href={`/auditDetail/${record.clue_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            查看详情
          </Button>
          {record.status?.code === TaskType.Pending && (
            <>
              <Divider type="vertical" />
              <Button
                type="link"
                onClick={() => {
                  handleModalOpen(createOrModifyModal as ModalControl, record);
                }}
              >
                认领
              </Button>
            </>
          )}
          {record.status?.code !== TaskType.Pending &&
            record.status?.code !== TaskType.Rejected &&
            record.status?.code !== TaskType.Returned && (
              <>
                <Divider type="vertical" />
                <Button
                  type="link"
                  onClick={() =>
                    handleModalOpen(customModal as ModalControl, record)
                  }
                >
                  跟进处理
                </Button>
              </>
            )}
        </>
      ),
    },
  ];
};
