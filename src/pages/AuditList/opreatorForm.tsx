import { TaskStatus, TaskStatusOptions, TaskType } from '@/constants';
import { TaskInfo } from '@/services/audit/typings';
import { Form, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useCallback } from 'react';

export const FollowForm = (props: { record: TaskInfo }) => {
  const { record } = props;

  const isDisabled = useCallback(
    (value: TaskStatus) => {
      return (
        (TaskType.Processing === record.status?.code &&
          value === TaskStatus.Returned) ||
        (TaskType.WaitingForReturn === record.status?.code &&
          value === TaskStatus.WaitingForReturn)
      );
    },
    [record.status?.code],
  );

  return (
    <>
      <Form.Item
        label="跟进状态"
        name="status"
        rules={[{ required: true, message: '请选择跟进状态' }]}
      >
        <Radio.Group>
          {TaskStatusOptions.map((item) => (
            <Radio
              key={item.value}
              value={item.value}
              disabled={isDisabled(item.value)}
            >
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item label="备注信息" name="remark">
        <TextArea placeholder="请输入备注信息" maxLength={8} />
      </Form.Item>
    </>
  );
};

export const AcceptForm = () => {
  return (
    <>
      <div>确认认领工单？</div>
    </>
  );
};
