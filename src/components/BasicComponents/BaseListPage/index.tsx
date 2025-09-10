import { PageContainer } from '@ant-design/pro-components';
import type { TableProps } from 'antd';
import { Button, Form, Row, Space, Table } from 'antd';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

interface BaseListPageProps<T = any, U = any> {
  title: string | React.ReactNode;
  columns: TableProps<T>['columns'];
  searchFormItems?: React.ReactNode;
  defaultSearchParams?: U;
  searchParamsTransform?: (params: any) => any;
  fetchData: (
    params: (
      | { page: number; limit: number }
      | { offset: number; limit: number }
    ) &
      U,
  ) => Promise<{
    list: T[];
    total: number;
  }>;
  createButton?: {
    text: string;
    onClick: () => void;
  };
  extraButtons?: React.ReactNode;
  isOffset?: boolean;
}

export interface BaseListPageRef {
  getData: () => void;
}

const formStyle: React.CSSProperties = {
  maxWidth: 'none',
  borderRadius: '8px',
  marginBottom: '16px',
};

const BaseListPage = forwardRef<BaseListPageRef, BaseListPageProps>(
  (props, ref) => {
    const {
      title,
      columns,
      searchFormItems,
      searchParamsTransform,
      defaultSearchParams = {} as any,
      fetchData,
      createButton,
      extraButtons,
      isOffset = false,
    } = props;

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [pageInfo, setPageInfo] = useState({
      page: 1,
      limit: 10,
      total: 0,
    });
    const [form] = Form.useForm();

    const fetchTableData = useCallback(
      async (params: { page: number; limit: number } & any) => {
        setLoading(true);
        try {
          let requestParams: any;
          if (isOffset) {
            // 使用 offset/limit 分页
            const { page, limit, ...otherParams } = params;
            requestParams = {
              offset: (page - 1) * limit,
              limit,
              ...otherParams,
            };
          } else {
            // 使用 page/limit 分页
            requestParams = params;
          }

          const result = await fetchData(requestParams);
          setData(result.list);
          setPageInfo({
            page: params.page,
            limit: params.limit,
            total: result.total,
          });
        } catch (error) {
          console.error('获取数据失败:', error);
        } finally {
          setLoading(false);
        }
      },
      [fetchData, isOffset],
    );

    useEffect(() => {
      fetchTableData({
        page: 1,
        limit: pageInfo.limit,
        ...defaultSearchParams,
      });
    }, []);

    const handleSearch = useCallback(
      (values: any) => {
        let searchParams = { ...values };
        if (searchParamsTransform) {
          searchParams = searchParamsTransform(values);
        }
        fetchTableData({ page: 1, limit: pageInfo.limit, ...searchParams });
      },
      [fetchTableData, pageInfo.limit],
    );

    const handleReset = useCallback(() => {
      form.resetFields();
      fetchTableData({
        page: 1,
        limit: pageInfo.limit,
        ...defaultSearchParams,
      });
    }, [form, defaultSearchParams, fetchTableData, pageInfo.limit]);

    const handlePageChange = useCallback(
      (page: number, pageSize: number) => {
        let formValues = form.getFieldsValue();
        if (searchParamsTransform) {
          formValues = searchParamsTransform(formValues);
        }
        fetchTableData({
          page,
          limit: pageSize,
          ...formValues,
        });
      },
      [fetchTableData, form],
    );

    useImperativeHandle(ref, () => ({
      getData: () => {
        let formValues = form.getFieldsValue();
        if (searchParamsTransform) {
          formValues = searchParamsTransform(formValues);
        }
        fetchTableData({
          page: pageInfo.page,
          limit: pageInfo.limit,
          formValues,
        });
      },
    }));

    return (
      <PageContainer header={{ title }}>
        {searchFormItems && (
          <Form
            form={form}
            layout="inline"
            onFinish={handleSearch}
            initialValues={defaultSearchParams}
            style={formStyle}
          >
            <Row gutter={[16, 16]}>{searchFormItems}</Row>
            <div style={{ textAlign: 'right', width: '100%' }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button onClick={handleReset}>重置</Button>
              </Space>
            </div>
          </Form>
        )}

        <div style={{ marginBottom: 16 }}>
          <Space>
            {createButton && (
              <Button type="primary" onClick={createButton.onClick}>
                {createButton.text}
              </Button>
            )}
            <Button
              type="primary"
              onClick={() =>
                fetchTableData({
                  page: pageInfo.page,
                  limit: pageInfo.limit,
                  ...form.getFieldsValue(),
                })
              }
            >
              刷新
            </Button>
            {extraButtons}
          </Space>
        </div>

        <Table<any>
          loading={loading}
          rowKey={(record) => record.id || record.role_id || record.user_id}
          columns={columns}
          dataSource={data}
          scroll={{ x: 'max-content' }}
          pagination={{
            current: pageInfo.page,
            pageSize: pageInfo.limit,
            total: pageInfo.total,
            onChange: handlePageChange,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </PageContainer>
    );
  },
);

export default BaseListPage;
