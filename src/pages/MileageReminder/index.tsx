import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import { DeviceAPI } from '@/services/device/DeviceController';
import { Navigate, useAccess } from '@umijs/max';
import React, { useRef } from 'react';
import { getColumns, MileageNameMap } from './colums';
import { searchForm } from './searchForm';

const TableList: React.FC = () => {
  const { isLogin } = useAccess();
  const baseListRef = useRef<BaseListPageRef>(null);

  const columns = getColumns();

  const fetchUserData = async (params: any) => {
    const { data } = await DeviceAPI.getMileageReminder(params);
    return {
      list: data.item_list,
      total: data.meta.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  const searchParamsTransform = (params: any) => {
    const { loss_time, ...rest } = params;
    return {
      ...rest,
      start_time: loss_time?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
      end_time: loss_time?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
    };
  };

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="里程提醒页面"
        columns={columns}
        searchFormItems={searchForm}
        searchParamsTransform={searchParamsTransform}
        fetchData={fetchUserData}
        exportConfig={{
          fileName: '里程提醒列表.xlsx',
          fetchAllData: DeviceAPI.getMileageReminder, // 你的API函数
          responseKey: 'item_list',
          keyAndNames: MileageNameMap,
        }}
      />
    </>
  );
};

export default TableList;
