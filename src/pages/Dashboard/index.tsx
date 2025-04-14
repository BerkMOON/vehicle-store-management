import ChartCard from '@/components/ChartComponents/ChartCard';
import { Navigate, useAccess } from '@umijs/max';
import { Result } from 'antd';
import React from 'react';

const TableList: React.FC = () => {
  const { isLogin, isAdmin } = useAccess();

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Result status="403" title="403" subTitle="无权限访问" />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <ChartCard title="激活数量" type="active" />
      <ChartCard title="绑定数量" type="bind" />
    </div>
  );
};

export default TableList;
