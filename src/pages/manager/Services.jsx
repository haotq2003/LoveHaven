import React, { useEffect, useState } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { servicesService } from '../../services/services.service';
import { Button, Form, message, Modal, Table, Input, InputNumber, Select, Popconfirm } from 'antd';

const Services = () => {
  
  const [services, setServices] = useState([]);
   const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isModalOpen,setIsModalOpen] = useState(false);
const [isEditMode, setIsEditMode] = useState(false);
const [currentService, setCurrentService] = useState(null);
const [form] = Form.useForm();
 useEffect(()=>{
getAllServices();
 },[page,size])

const getAllServices =  async () =>{
      setLoading(true);
try {
  const res = await servicesService.getAllServices(page, size);
  setServices(res.data.content)
  console.log(res.data.content)
} catch (error) {
  console.log(error)
}
}

const handleSubmit = async()  =>{
try {
  const values = await  form.validateFields();

  if(isEditMode && currentService)  {
    await servicesService.updateService(values,currentService.id);
        message.success("Cập nhật dịch vụ thành công!");
  }else{
    await servicesService.createService(values);
      message.success("Tạo dịch vụ thành công!");
  }
    setIsModalOpen(false);
    getAllServices();
} catch (error) {
  console.log(error)
  message.error("Có lỗi  xảy  ra")
}
}
const  handleDelete = async  (serviceId) =>{
  try{

  await  servicesService.deleteService(serviceId);
  message.success("Xoá dịch vụ thành công!");
  getAllServices();
  }catch(error){
    console.log(error);
    message.error("Xoá thất bại!");
  }
}

const columns = [
{
      title: 'Tên dịch vụ',
      dataIndex: 'name',
      key: 'name',
    },
 {
      title: 'Giá',
      dataIndex: 'pricePerHour',
      key: 'pricePerHour',
      render: (price) => `${price?.toLocaleString()} VND`,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
 {
  title: 'Hành động',
  key: 'action',
  render: (_, record) => (
    <div className="flex gap-2">
      <Button icon={<FaEdit />} onClick={() => openEditModal(record)}>Sửa</Button>
     <Popconfirm
title="Bạn có chắc chắn muốn xoá dịch vụ này?"
onConfirm={() => handleDelete(record.id)}
  okText="Xoá"
          cancelText="Hủy"


     >
      <Button icon={<FaTrash />} danger>
            Xoá
          </Button>
        </Popconfirm>
    </div>
  )
}

]
 const handleTableChange = (pagination) => {
    setPage(pagination.current - 1); 
    setSize(pagination.pageSize);
  };
  const openCreateModal = () => {
  setIsEditMode(false);
  form.resetFields();
  setIsModalOpen(true);
};

const openEditModal =  (service) =>{
  setIsEditMode(true);
  setCurrentService(service);
  form.setFieldsValue({
    ...service,
       
  })
    setIsModalOpen(true);
}
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Quản lý dịch vụ</h1>
       <Button onClick={openCreateModal} icon={<FaPlus />} type="primary">Thêm dịch vụ</Button>

      </div>
  <Table
columns={columns}
dataSource={services}
rowKey={(record) => record.id}
        pagination={{
          current: page + 1,
          pageSize: size,
          total: totalItems,
          showSizeChanger: true,
        }}
       
        onChange={handleTableChange}
  />
     <Modal
  title={isEditMode ? "Cập nhật dịch vụ" : "Tạo dịch vụ mới"}
  open={isModalOpen}
  onOk={handleSubmit}
  onCancel={() => setIsModalOpen(false)}
  okText={isEditMode ? "Cập nhật" : "Tạo mới"}
>
  <Form form={form} layout="vertical">
    <Form.Item name="name" label="Tên dịch vụ" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
      <Input />
    </Form.Item>

    <Form.Item name="description" label="Mô tả">
      <Input.TextArea rows={3} />
    </Form.Item>

    <Form.Item name="pricePerHour" label="Giá mỗi giờ" rules={[{ required: true }]}>
      <InputNumber
        min={0}
        style={{ width: '100%' }}
        formatter={value => `${value} VND`}
      />
    </Form.Item>

    <Form.Item name="consultantProfileIds" label="ID hồ sơ tư vấn" >
      <Select
        mode="multiple"
        placeholder="Nhập ID hoặc chọn"
        options={[
          { value: 1073741824, label: 'Tư vấn viên 1' },
         
        ]}
      />
    </Form.Item>
  </Form>
</Modal>

    </div>
  );
};

export default Services;