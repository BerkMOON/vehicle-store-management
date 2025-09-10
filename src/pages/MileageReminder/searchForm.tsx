import { Col, Form, Input } from 'antd';

export const searchForm = (
  <>
    <Col>
      <Form.Item name="sn" label="SN号">
        <Input placeholder="请输入设备SN号" allowClear />
      </Form.Item>
    </Col>
    <Col>
      <Form.Item name="mileage" label="最小里程数">
        <Input placeholder="请输入最小里程数" allowClear />
      </Form.Item>
    </Col>
  </>
);
