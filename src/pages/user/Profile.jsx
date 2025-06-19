import React, { useState, useEffect } from 'react';
import { userService } from '../../services/user.service';
import { Card, Spin, Alert, Descriptions, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Không tìm thấy thông tin đăng nhập');
        }

        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const accountId = tokenData.id;

        const response = await userService.viewInforUser(accountId);
        setUserInfo(response.data);
      } catch (err) {
        setError(err.message || 'Đã xảy ra lỗi khi tải thông tin');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: '#FF6B6B' }} spin />} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Card title="Thông tin cá nhân" bordered={false} style={{ maxWidth: 700, margin: '0 auto' }}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Email">{userInfo?.email}</Descriptions.Item>
          <Descriptions.Item label="Họ và tên">{userInfo?.fullName}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{userInfo?.phone || 'Chưa cập nhật'}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{userInfo?.address || 'Chưa cập nhật'}</Descriptions.Item>
        </Descriptions>

        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Button
            type="primary"
            style={{ backgroundColor: '#FF6B6B', borderColor: '#FF6B6B' }}
            onClick={() => (window.location.href = '/edit-profile')}
          >
            Chỉnh sửa thông tin
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
