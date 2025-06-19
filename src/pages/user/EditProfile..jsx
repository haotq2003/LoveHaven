import React, { useEffect, useState } from 'react';
import { userService } from '../../services/user.service';
import { Form, Input, Button, message, Spin } from 'antd';

const EditProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Không tìm thấy token');

        const decoded = JSON.parse(atob(token.split('.')[1]));
        const id = decoded.id;
        setAccountId(id);

        const res = await userService.viewInforUser(id);
        form.setFieldsValue({
          password: '', // bỏ trống nếu không thay đổi
          name: res.data.fullName || '',
          phone: res.data.phone || '',
          address: res.data.address || ''
        });
      } catch (err) {
        message.error('Lỗi khi tải thông tin: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [form]);

  const onFinish = async (values) => {
    try {
      const payload = {
        password: values.password,
        name: values.name,
        phone: values.phone,
        address: values.address
      };
      await userService.updateProfile(accountId, payload);
      message.success('Cập nhật thành công!');
      window.location.href = '/profile';
    } catch (err) {
        console.log(err)
      message.error('Cập nhật thất bại');
    }
  };

  if (loading) {
    return <div style={{ padding: 50, textAlign: 'center' }}><Spin /></div>;
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff' }}>
      <h2>Cập nhật thông tin</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="password" label="Mật khẩu mới" >
          <Input.Password />
        </Form.Item>
        <Form.Item name="name" label="Họ và tên" >
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Số điện thoại">
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#FF6B6B', borderColor: '#FF6B6B' }}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;
