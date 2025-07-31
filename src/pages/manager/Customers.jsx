import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, message ,Modal, Input, Popconfirm } from 'antd';

import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { userService } from '../../services/user.service';

const AccountList = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
const [editingUser, setEditingUser] = useState(null);
const [isEditModalVisible, setIsEditModalVisible] = useState(false);
const [editForm, setEditForm] = useState({
  name: '',
  phone: '',
  address: '',
  password: ''
});
const handleDelete = async (id) => {
  try {
    await userService.deleteUser(id);
    message.success('Xóa người dùng thành công');
    fetchUsers(); // Cập nhật lại danh sách
  } catch (error) {
    message.error('Xóa thất bại');
  }
};

const openEditModal = (user) => {
  setEditingUser(user);
  setEditForm({
    name: user.name,
    phone: user.phone,
    address: user.address,
    password: ''
  });
  setIsEditModalVisible(true);
};
const handleEditSubmit = async () => {
  try {
    await userService.updateUser(editingUser.id, editForm);
    message.success('Cập nhật người dùng thành công');
    setIsEditModalVisible(false);
    fetchUsers(); // Refresh bảng
  } catch (error) {
    message.error('Cập nhật thất bại');
  }
};
  const fetchUsers = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const response = await userService.getAllUsers(page - 1, size);
      const resData = response.data;
      console.log(resData)
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
    { title: 'Họ tên', dataIndex: 'name', key: 'name' },
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
      <Button icon={<EditOutlined />} onClick={() => openEditModal(record)} />
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa người dùng này?"
        onConfirm={() => handleDelete(record.id)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <Button icon={<DeleteOutlined />} danger />
      </Popconfirm>
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
      <Modal
  title="Cập nhật người dùng"
  open={isEditModalVisible}
  onOk={handleEditSubmit}
  onCancel={() => setIsEditModalVisible(false)}
  okText="Lưu"
  cancelText="Hủy"
>
  <Input
    placeholder="Tên"
    value={editForm.name}
    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
    className="mb-3"
  />
  <Input
    placeholder="Số điện thoại"
    value={editForm.phone}
    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
    className="mb-3"
  />
  <Input
    placeholder="Địa chỉ"
    value={editForm.address}
    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
    className="mb-3"
  />
  <Input.Password
    placeholder="Mật khẩu mới"
    value={editForm.password}
    onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
  />
</Modal>
    </div>
    
  );
};

export default AccountList;
