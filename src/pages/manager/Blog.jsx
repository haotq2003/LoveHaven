import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Input, Form, Modal, Upload, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { blogService } from '../../services/blog.service';
import ImageUploader from '../../components/common/ImageUploader';
import { jwtDecode } from "jwt-decode";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingBlog, setEditingBlog] = useState(null);

  const getUserInfo = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    try {
      const decoded = jwtDecode(token);
      return decoded.accountId || null;
    } catch (error) {
      console.error('Lỗi giải mã token:', error);
      return null;
    }
  };
  const handleImageUploaded = (url) => {
    // Gán URL ảnh vào trường thumbnailUrl trong form
    form.setFieldsValue({ thumbnailUrl: url });
  };

  const getAllBlogs = async () => {
    setLoading(true);
    try {
      const res = await blogService.getAllBlogs();
      if (res.status === 200) {
        setBlogs(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitBlog = async (values) => {
    const accountId = getUserInfo();
    const blogData = { ...values, accountId };
  
    try {
      if (editingBlog) {
        blogData.id = editingBlog.id;
        const res = await blogService.updateBlog(blogData);
        if (res.status === 200) {
          getAllBlogs();
          setIsModalOpen(false);
          setEditingBlog(null);
          form.resetFields();
        }
      } else {
        const res = await blogService.createBlog(blogData);
        if (res.status === 201) {
          getAllBlogs();
          setIsModalOpen(false);
          form.resetFields();
        }
      }
    } catch (error) {
      console.error('Lỗi khi xử lý blog:', error);
    }
  };
  
  

  const deleteBlog = async (blogId) => {
    console.log('e')
    try {
      const res = await blogService.deleteBlog(blogId);
      message.success('Xoá blog thành công');
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

 
  useEffect(() => {
    getAllBlogs();
  }, []);
  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
    form.setFieldsValue(blog);
  };
  
  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <div className="font-medium">{record.title}</div>
          {/* <div className="text-gray-500 text-sm">{record.headline}</div> */}
        </div>
      )
    },
    // {
    //   title: 'Danh mục nội dung',
    //   dataIndex: 'content',
    //   key: 'content',
    //   render: (content) => (
    //     <div>
    //       {content.map((item, index) => (
    //         <div key={index}>
    //           <strong>{item.title}:</strong> {item.detail}
    //         </div>
    //       ))}
    //     </div>
    //   )
    // },
    {
      title: 'Tóm tắt',
      dataIndex: 'summary',
      key: 'summary'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdTime',
      key: 'createdTime',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Ảnh thumbnail',
      dataIndex: 'thumbnailUrl',
      key: 'thumbnailUrl',
      render: (url) => (
        <img src={url} alt="thumbnail" className="w-16 h-10 object-cover rounded" />
      )
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button icon={<EditOutlined />} type="link" onClick={() => openEditModal(record)}>
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="link"
            danger
            onClick={() => {
              Modal.confirm({
                title: 'Bạn có chắc chắn muốn xoá?',
                okText: 'Xoá',
                okType: 'danger',
                cancelText: 'Huỷ',
                onOk: () => deleteBlog(record.id),
              });
            }}
          >
            Xoá
          </Button>
        </div>
      )
    }
    
  ];

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Tìm kiếm bài viết"
          prefix={<SearchOutlined />}
          className="w-64"
        />
        <Button   onClick={() => setIsModalOpen(true)} type="primary" icon={<PlusOutlined />} className="bg-[#FF6B6B] hover:bg-[#FF5252]">
          Thêm bài viết
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={blogs}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
   <Modal
  title={editingBlog ? 'Cập nhật bài viết' : 'Tạo bài viết mới'}
  visible={isModalOpen}
  onCancel={() => {
    setIsModalOpen(false);
    setEditingBlog(null);
    form.resetFields();
  }}
  onOk={() => form.submit()}
  okText={editingBlog ? 'Cập nhật' : 'Tạo'}
  cancelText="Huỷ"
>
  <Form
  form={form}
  layout="vertical"
  onFinish={handleSubmitBlog}
  onFinishFailed={(err) => {
    console.error("Validate failed:", err);
  }}
>
    <Form.Item
      name="title"
      label="Tiêu đề"
      rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="headline"
      label="Headline"
      rules={[{ required: true, message: 'Vui lòng nhập headline' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="summary"
      label="Tóm tắt"
      rules={[{ required: true, message: 'Vui lòng nhập tóm tắt' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
        label="Ảnh thumbnail"
        name="thumbnailUrl"
        rules={[{ required: true, message: 'Vui lòng tải ảnh thumbnail' }]}
      >
        {/* Input ẩn vì giá trị ảnh được gán tự động */}
        <Input type="hidden" />
        <ImageUploader onImageUploaded={handleImageUploaded} />
      </Form.Item>
    <Form.List name="content" initialValue={[{ title: '', detail: '' }]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <div key={key} className="flex gap-2 mb-2">
              <Form.Item
                {...restField}
                name={[name, 'title']}
                rules={[{ required: true, message: 'Nhập tiêu đề nội dung' }]}
              >
                <Input placeholder="Tiêu đề nội dung" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'detail']}
                rules={[{ required: true, message: 'Nhập chi tiết nội dung' }]}
              >
                <Input placeholder="Chi tiết nội dung" />
              </Form.Item>
              <Button onClick={() => remove(name)} danger>Xoá</Button>
            </div>
          ))}
          <Button type="dashed" onClick={() => add()} block>
            Thêm nội dung
          </Button>
        </>
      )}
    </Form.List>
  </Form>
</Modal>

    </div>
  );
};

export default Blog;
