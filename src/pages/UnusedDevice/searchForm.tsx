import { Col, Form, Input } from 'antd';

export const searchForm = (
  <>
    <Col>
      <Form.Item name="before_days" label="未上线天数">
        <Input placeholder="请输入未上线天数" />
      </Form.Item>
    </Col>
  </>
);
