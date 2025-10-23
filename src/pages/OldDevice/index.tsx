import BaseListPage, {
  BaseListPageRef,
} from '@/components/BasicComponents/BaseListPage';
import { DeviceAPI } from '@/services/device/DeviceController';
import { Navigate, useAccess } from '@umijs/max';
import { DatePicker, message, Modal } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useRef, useState } from 'react';
import { getColumns, OldDeviceNameMap } from './colums';

const TableList: React.FC = () => {
  const { isLogin } = useAccess();
  const baseListRef = useRef<BaseListPageRef>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [expireTime, setExpireTime] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(false);

  // 处理点击标记按钮
  const handleMarkClick = (record: any) => {
    setSelectedRecord(record);
    setExpireTime(null);
    setModalVisible(true);
  };

  // 处理提交标记
  const handleSubmit = async () => {
    if (!expireTime) {
      message.error('请选择更新固件时间');
      return;
    }

    if (!selectedRecord?.sn) {
      message.error('设备SN码不能为空');
      return;
    }

    try {
      setLoading(true);
      await DeviceAPI.createCallMark({
        sn: selectedRecord.sn,
        expire_time: expireTime.format('YYYY-MM-DD HH:mm:ss'),
      });
      message.success('标记成功');
      setModalVisible(false);
      // 刷新列表
      baseListRef.current?.getData();
    } catch (error) {
      message.error('标记失败');
    } finally {
      setLoading(false);
    }
  };

  const columns = getColumns(handleMarkClick);

  // 合并数据的通用函数
  const mergeData = async () => {
    // 第一部分：获取旧版本设备列表（所有数据）
    const { data: oldDeviceData } = await DeviceAPI.getOldDeviceList({
      page: 1,
      limit: 1000,
    });

    // 第二部分：获取10天未上线设备列表（所有数据）
    const { data: unusedDeviceData } = await DeviceAPI.getUnusedDeviceList({
      page: 1,
      limit: 1000,
      before_days: 10,
    } as any);

    // 第三部分：获取已联系标记列表
    const { data: callMarkData } = await DeviceAPI.getCallMarkList();

    // 创建10天未上线设备的SN集合
    const unusedSnSet = new Set(
      unusedDeviceData.record_list.map((item) => item.sn),
    );

    // 创建已联系标记的Map，key为sn，value为整个标记对象
    const callMarkMap = new Map(
      (callMarkData.mark_list || []).map((item) => [item.sn, item]),
    );

    // 合并数据：给第一部分数据添加标记
    const mergedList = oldDeviceData.record_list.map((item) => {
      const callMark = callMarkMap.get(item.sn!);
      return {
        ...item,
        is_unused: unusedSnSet.has(item.sn!) ? '是' : '否',
        is_contacted: callMark ? '是' : '否',
        contact_time: callMark?.expire_time || '',
      };
    });

    return mergedList;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchUserData = async (_params: any) => {
    const mergedList = await mergeData();
    return {
      list: mergedList,
      total: mergedList.length,
    };
  };

  // 导出数据获取函数
  const fetchExportData = async () => {
    const mergedList = await mergeData();
    return {
      response_status: {
        code: 200,
        msg: 'success',
        extension: {
          key: '',
          value: '',
        },
      },
      data: {
        record_list: mergedList,
      },
    };
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <BaseListPage
        ref={baseListRef}
        title="旧版本设备页面"
        columns={columns}
        fetchData={fetchUserData}
        exportConfig={{
          fileName: '旧版本设备列表.xlsx',
          fetchAllData: fetchExportData,
          responseKey: 'record_list',
          keyAndNames: OldDeviceNameMap,
          customExport: true,
        }}
      />
      <Modal
        title="标记用户已联系"
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        confirmLoading={loading}
        okText="确认"
        cancelText="取消"
      >
        <div style={{ marginBottom: 16 }}>
          <p>设备SN码：{selectedRecord?.sn}</p>
          <p>车辆品牌：{selectedRecord?.brand}</p>
          <p>车辆型号：{selectedRecord?.car_model}</p>
          <p>用户手机号：{selectedRecord?.phone}</p>
        </div>
        <div>
          <p style={{ marginBottom: 8 }}>请选择用户何时来更新固件：</p>
          <DatePicker
            value={expireTime}
            onChange={(value) => setExpireTime(value)}
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择更新时间"
            style={{ width: '100%' }}
            disabledDate={(current) => {
              // 不能选择过去的日期
              return current && current < dayjs().startOf('day');
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default TableList;
