import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Spin, Card, Divider } from 'antd';
import { UserOutlined, PhoneOutlined, HomeOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { consultantService } from '../../services/consultants.service';
import ImageUploader from '../../components/common/ImageUploader';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [form] = Form.useForm();
  const { userToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [consultant, setConsultant] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePublicId, setImagePublicId] = useState('');

  useEffect(() => {
    const fetchConsultantData = async () => {
      try {
        if (userToken) {
          const decoded = jwtDecode(userToken);
          const accountId = decoded.id;
          
          const response = await consultantService.getConsultantById(accountId);
          if (response && response.data) {
            setConsultant(response.data);
            form.setFieldsValue({
              name: response.data.account.name,
              phone: response.data.account.phone,
              address: response.data.account.address,
              bio: response.data.bio,
              expertise: response.data.expertise,
            });

            // Nếu có hình ảnh, thiết lập URL
            if (response.data.account.urlImage) {
              setImageUrl(response.data.account.urlImage.trim());
            }
          }
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin tư vấn viên:', error);
        message.error('Không thể lấy thông tin tư vấn viên');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultantData();
  }, [userToken, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      if (!consultant) {
        message.error('Không tìm thấy thông tin tư vấn viên');
        return;
      }

      const updateData = {
        bio: values.bio,
        expertise: values.expertise,
        accountId: consultant.account.id,
        imagesID: [], // Sẽ cập nhật sau khi có chức năng upload nhiều ảnh
        password: values.password || undefined, // Chỉ gửi password nếu được nhập
        name: values.name,
        phone: values.phone,
        address: values.address
      };

      const response = await consultantService.updateProfileConsultant(updateData);
      if (response) {
        message.success('Cập nhật thông tin thành công');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
      message.error('Không thể cập nhật thông tin');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUploaded = (url, publicId) => {
    setImageUrl(url);
    setImagePublicId(publicId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h1>
      
      <Card className="shadow-md mb-8">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: consultant?.account?.name || '',
            phone: consultant?.account?.phone || '',
            address: consultant?.account?.address || '',
            bio: consultant?.bio || '',
            expertise: consultant?.expertise || ''
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Divider orientation="left">Thông tin cơ bản</Divider>
              
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Họ và tên" />
              </Form.Item>
              
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
              </Form.Item>
              
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
              >
                <Input prefix={<HomeOutlined />} placeholder="Địa chỉ" />
              </Form.Item>
              
              <Form.Item
                name="password"
                label="Mật khẩu mới (để trống nếu không đổi)"
                rules={[
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu mới" />
              </Form.Item>
            </div>
            
            <div>
              <Divider orientation="left">Thông tin chuyên môn</Divider>
              
              <Form.Item
                name="bio"
                label="Giới thiệu bản thân"
                rules={[{ required: true, message: 'Vui lòng nhập giới thiệu bản thân' }]}
              >
                <Input.TextArea rows={4} placeholder="Giới thiệu ngắn về bản thân" />
              </Form.Item>
              
              <Form.Item
                name="expertise"
                label="Chuyên môn"
                rules={[{ required: true, message: 'Vui lòng nhập chuyên môn' }]}
              >
                <Input.TextArea rows={4} placeholder="Chuyên môn của bạn" />
              </Form.Item>
              
              <Form.Item
                label="Ảnh đại diện"
              >
                <div className="mb-4">
                
                  <ImageUploader   maxCount={1}  onImageUploaded={handleImageUploaded} />
                </div>
              </Form.Item>
            </div>
          </div>
          
          <Form.Item className="mt-6">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={saving}
              className="bg-[#F48BA1] hover:bg-[#F48BA1]/80"
            >
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;