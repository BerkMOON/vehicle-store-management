import { TASK_STATUS_OPTIONS } from '@/constants';
import { Col, DatePicker, Form, Select } from 'antd';

const { RangePicker } = DatePicker;

export const searchForm = (
  <>
    <Col>
      <Form.Item name="status" label="工单状态">
        <Select
          placeholder="请选择工单状态"
          allowClear
          style={{ width: 180 }}
          options={TASK_STATUS_OPTIONS}
        />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item name="timeRange" label="工单时间">
        <RangePicker style={{ width: '400px' }} showTime />
      </Form.Item>
    </Col>
  </>
);
