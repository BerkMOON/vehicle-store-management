import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import CreateOrModifyForm from '@/components/BasicComponents/CreateOrModifyForm';
import { TaskStatus } from '@/constants';
import { useModalControl } from '@/hooks/useModalControl';
import { AuditAPI } from '@/services/audit/AuditController';
import type { ListRequest, TaskInfo } from '@/services/audit/typings';
import { Navigate, useAccess } from '@umijs/max';
import React, { useRef, useState } from 'react';
import { getColumns } from './colums';
import { AcceptForm, FollowForm } from './opreatorForm';
import { searchForm } from './searchForm';

const DEFAULT_SEARCH_PARAMS = {
  status: TaskStatus.All,
};

const AuditList: React.FC = () => {
  const { isLogin } = useAccess();
  const baseListRef = useRef<BaseListPageRef>(null);
  const followModal = useModalControl();
  const createOrModifyModal = useModalControl();
  const [selectedAudit, setSelectedAudit] = useState<any>(null);

  const handleModalOpen = (
    modalControl: ReturnType<typeof useModalControl>,
    audit?: TaskInfo,
  ) => {
    if (audit) {
      setSelectedAudit(audit);
    } else {
      setSelectedAudit(null);
    }
    modalControl.open();
  };

  const columns = getColumns({
    handleModalOpen,
    createOrModifyModal,
    customModal: followModal,
  });

  const fetchClueData = async (params: ListRequest) => {
    const { data } = await AuditAPI.getTaskList(params);
    return {
      list: data.task_list,
      total: data?.meta?.total_count,
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  const searchParamsTransform = (params: any) => {
    const { timeRange, ...rest } = params;
    return {
      ...rest,
      start_time: timeRange?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
      end_time: timeRange?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
    };
  };

  const handleFormValues = (record: Record<string, any>) => {
    return {
      ...record,
      clue_id: selectedAudit.clue_id,
    };
  };

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="工单列表"
        columns={columns}
        searchFormItems={searchForm}
        fetchData={fetchClueData}
        defaultSearchParams={DEFAULT_SEARCH_PARAMS}
        searchParamsTransform={searchParamsTransform}
        isOffset={true}
      />
      <CreateOrModifyForm
        modalVisible={createOrModifyModal.visible}
        onCancel={() => {
          createOrModifyModal.close();
          setSelectedAudit(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text={{
          title: '认领工单',
          successMsg: '认领成功',
        }}
        api={AuditAPI.Accept}
        operatorFields={handleFormValues}
        record={selectedAudit}
        idMapKey="task_id"
      >
        <AcceptForm />
      </CreateOrModifyForm>
      <CreateOrModifyForm
        modalVisible={followModal.visible}
        onCancel={() => {
          followModal.close();
          setSelectedAudit(null);
        }}
        refresh={() => baseListRef.current?.getData()}
        text={{
          title: '跟进工单',
          successMsg: '跟进成功',
        }}
        api={AuditAPI.Process}
        record={selectedAudit}
        idMapKey="task_id"
        operatorFields={handleFormValues}
      >
        <FollowForm record={selectedAudit} />
      </CreateOrModifyForm>
    </>
  );
};

export default AuditList;
