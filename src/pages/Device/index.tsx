import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import { DeviceAPI } from '@/services/device/DeviceController';
import { Navigate, useAccess } from '@umijs/max';
import { Result } from 'antd';
import React, { useRef } from 'react';
import { DeviceNameMap, getColumns } from './colums';
import { searchForm } from './searchForm';

const TableList: React.FC = () => {
  const { isLogin, isAdmin } = useAccess();
  const baseListRef = useRef<BaseListPageRef>(null);

  const columns = getColumns();

  const fetchUserData = async (params: any) => {
    const { data } = await DeviceAPI.getDeviceList(params);
    return {
      list: data.device_list,
      total: data.meta.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Result status="403" title="403" subTitle="无权限访问" />;
  }

  const searchParamsTransform = (params: any) => {
    const { bind_time, onset_time, ...rest } = params;
    return {
      ...rest,
      bind_start_time: bind_time?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
      bind_end_time: bind_time?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
      onset_start_time: onset_time?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
      onset_end_time: onset_time?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
    };
  };

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="设备列表页面"
        columns={columns}
        searchFormItems={searchForm}
        searchParamsTransform={searchParamsTransform}
        fetchData={fetchUserData}
        exportConfig={{
          fileName: '设备列表.xlsx',
          fetchAllData: DeviceAPI.getDeviceList, // 你的API函数
          responseKey: 'device_list',
          keyAndNames: DeviceNameMap,
        }}
        defaultSearchParams={{
          store_id: 1,
        }}
      />
    </>
  );
};

export default TableList;
