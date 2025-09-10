import { useRequest } from '@/hooks/useRequest';
import { AuditAPI } from '@/services/audit/AuditController';
import { MapAPI } from '@/services/map/MapController';
import { PageContainer } from '@ant-design/pro-components';
import { Navigate, useAccess, useParams } from '@umijs/max';
import { Card, Descriptions, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const TaskDetail: React.FC = () => {
  const { clueId } = useParams<{ clueId: string }>();
  const { isLogin } = useAccess();
  const [address, setAddress] = useState<string>('');

  const { loading, data: detail } = useRequest(AuditAPI.Detail, {
    immediate: true,
    immediateParams: clueId as string,
  });

  useEffect(() => {
    if (detail?.gps?.lat && detail?.gps?.lng) {
      MapAPI.getGDAddressInfo({
        location: `${detail.gps.lng},${detail.gps.lat}`,
      }).then((gdMapInfo) => {
        const address = gdMapInfo?.regeocode?.formatted_address;
        setAddress(address);
      });
    }
  }, [detail]);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <PageContainer
      header={{
        title: '详情',
      }}
    >
      <Spin spinning={loading}>
        <Card>
          {detail?.video_url && (
            <Card title="碰撞视频" style={{ marginBottom: 24 }}>
              <ReactPlayer url={detail.video_url} controls playbackRate={2} />
            </Card>
          )}

          <Card title="工单信息">
            <Descriptions column={2}>
              <Descriptions.Item label="工单号">
                {detail?.clue_id}
              </Descriptions.Item>
              <Descriptions.Item label="工单状态">
                {detail?.status?.name}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title="跟进记录" style={{ marginTop: 24 }}>
            <Descriptions column={2}>
              <Descriptions.Item label="首次跟进时间">
                {detail?.modify_time}
              </Descriptions.Item>
              <Descriptions.Item label="跟进人">
                {detail?.handler_name}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title="线索信息" style={{ marginTop: 24 }}>
            <Descriptions column={2}>
              {address && (
                <Descriptions.Item label="事故地址">
                  {address}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="设备号">{detail?.sn}</Descriptions.Item>
              <Descriptions.Item label="设备ID">
                {detail?.device_id}
              </Descriptions.Item>
              <Descriptions.Item label="事故级别">
                {detail?.level}
              </Descriptions.Item>
              <Descriptions.Item label="车辆型号">
                {detail?.brand
                  ? `${detail?.brand}-${detail?.car_model}`
                  : '暂无'}
              </Descriptions.Item>
              <Descriptions.Item label="备注信息">
                {detail?.remark}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Card>
      </Spin>
    </PageContainer>
  );
};

export default TaskDetail;
