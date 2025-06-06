import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { blogService } from '../../services/blog.service';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

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
const addBlogs = async () => {
  try {
    const res = await blogService.addBlogs();
    if (res.status === 200) {
      getAllBlogs();
    }
  } catch (error) {
    console.error('Failed to add blog:', error);
  }
};

  const deleteBlog = async (blogId) => {
    try {
      const res = await blogService.deleteBlog(blogId);
      if (res.status === 200) {
        getAllBlogs();
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

 
  useEffect(() => {
    getAllBlogs();
  }, []);

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
          <Button icon={<EditOutlined />} type="link">Sửa</Button>
          <Button icon={<DeleteOutlined />} type="link" danger>Xoá</Button>
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
        <Button type="primary" icon={<PlusOutlined />} className="bg-[#FF6B6B] hover:bg-[#FF5252]">
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
    </div>
  );
};

export default Blog;
