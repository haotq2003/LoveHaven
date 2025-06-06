import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, message } from 'antd';

import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { userService } from '../../services/user.service';

const AccountList = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const response = await userService.getAllUsers(page - 1, size);
      const resData = response.data;
      setData(resData.content);
      setPagination({
        current: resData.number + 1,
        pageSize: resData.size,
        total: resData.totalElements
      });
    } catch (error) {
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleTableChange = (pagination) => {
    fetchUsers(pagination.current, pagination.pageSize);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    {
      title: 'Quyền',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles) => (
        <Space>
          {roles.map((role) => (
            <Tag key={role.id} color="blue">{role.name}</Tag>
          ))}
        </Space>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} />
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Danh sách tài khoản</h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default AccountList;
