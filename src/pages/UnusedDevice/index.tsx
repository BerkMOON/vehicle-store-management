import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import { DeviceAPI } from '@/services/device/DeviceController';
import { Navigate, useAccess } from '@umijs/max';
import React, { useRef } from 'react';
import { getColumns, UnusedDeviceNameMap } from './colums';
import { searchForm } from './searchForm';

const TableList: React.FC = () => {
  const { isLogin } = useAccess();
  const baseListRef = useRef<BaseListPageRef>(null);

  const columns = getColumns();

  const fetchUserData = async (params: any) => {
    const { data } = await DeviceAPI.getUnusedDeviceList(params);
    return {
      list: data.record_list,
      total: data.meta.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="未上线设备页面"
        columns={columns}
        fetchData={fetchUserData}
        searchFormItems={searchForm}
        exportConfig={{
          fileName: '未上线设备列表.xlsx',
          fetchAllData: DeviceAPI.getUnusedDeviceList, // 你的API函数
          responseKey: 'record_list',
          keyAndNames: UnusedDeviceNameMap,
        }}
        defaultSearchParams={{
          before_days: 10,
        }}
      />
    </>
  );
};

export default TableList;
