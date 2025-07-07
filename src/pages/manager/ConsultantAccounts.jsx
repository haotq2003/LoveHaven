import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, message, Popconfirm, Modal } from 'antd';
import { consultantService } from '../../services/consultants.service';

const ConsultantAccounts = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [visible, setVisible] = useState(false);
  const fetchConsultants = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const response = await consultantService.getConsultantInactive(page - 1, size);
      console.log(response.data.content)
      const resData = response.data || response; 
      setData(resData.content || []);
      setPagination({
        current: (resData.number || 0) + 1,
        pageSize: resData.size || 10,
        total: resData.totalElements || 0
      });
    } catch (error) {
      message.error('Không thể tải danh sách tư vấn viên');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultants();
  }, []);

  const handleTableChange = (pagination) => {
    fetchConsultants(pagination.current, pagination.pageSize);
  };
const showModal = async (consultant) => {
 
 try {
    await getConsultantById(consultant.id);
    setVisible(true);
  } catch (error) {
    console.error('Lỗi khi hiển thị chi tiết tư vấn viên:', error);
  }
};
const handleCancel = () => {
  setVisible(false);
  setSelectedConsultant(null);
};

  const handleAccept = async (consultant) => {
  try {
    // Cập nhật UI ngay lập tức
    setData(prevData => 
      prevData.filter(item => item.id !== consultant.id)
    );
    
    // Cập nhật modal data nếu đang mở
    if (selectedConsultant && selectedConsultant.id === consultant.id) {
      setSelectedConsultant(prev => ({
        ...prev,
        account: { ...prev.account, status: 'ACTIVE' }
      }));
    }
    
    const res = await consultantService.acceptConsultant(consultant.account.id,'ACTIVE');
    message.success('Duyệt tài khoản thành công!');
    
    // Refresh để đảm bảo data đồng bộ
    fetchConsultants(pagination.current, pagination.pageSize);
    
  } catch (error) {
    console.log(error);
    message.error('Duyệt tài khoản thất bại!');
    // Nếu API fail, refresh lại để khôi phục state
    fetchConsultants(pagination.current, pagination.pageSize);
  }
};
  const getConsultantById = async(id) =>{
    try {
      const res = await consultantService.getConsultantById(id)
      console.log(res.data)
      setSelectedConsultant(res.data)
    } catch (error) {
      console.log(error)
      message.error('Không tìm thấy tài khoản!');
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Họ tên', dataIndex: 'name', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
     <Tag color={status === 'INACTIVE' ? 'orange' : 'green'}>
  {status === 'INACTIVE' ? 'Chờ duyệt' : 'Đã duyệt'}
</Tag>


      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        record.status !== 'APPROVED' ? (
         
            <Button onClick={() => showModal(record)} type="primary">Xem thêm </Button>

         
        ) : null
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý tài khoản tư vấn viên</h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />

      <Modal

  visible={visible}
  onCancel={handleCancel}
  footer={[
    <Button key="cancel" onClick={handleCancel}>
      Đóng
    </Button>,
    <Button
      key="approve"
      type="primary"
      onClick={() => {
        handleAccept(selectedConsultant);
        handleCancel();
      }}
    >
      Duyệt
    </Button>,
  ]}
>
 {selectedConsultant && (
  <div className="space-y-3 text-gray-800 text-sm">
    <div className="border-b pb-2 mb-4">
      <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
    </div>

    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      <p><span className="font-semibold">Họ tên:</span> {selectedConsultant.account.name}</p>
      <p><span className="font-semibold">Email:</span> {selectedConsultant.account.email}</p>
      <p><span className="font-semibold">Số điện thoại:</span> {selectedConsultant.account.phone}</p>
      <p><span className="font-semibold">Địa chỉ:</span> {selectedConsultant.account.address}</p>
      <p><span className="font-semibold">Trạng thái:</span> {selectedConsultant.account.status}</p>
      <p><span className="font-semibold">Kinh nghiệm:</span> {selectedConsultant.bio}</p>
      <p><span className="font-semibold">Học vấn:</span> {selectedConsultant.expertise}</p>
    </div>

    {selectedConsultant.account.urlImage && (
      <div className="mt-4">
        <img
          src={selectedConsultant.account.urlImage}
          alt="Ảnh tư vấn viên"
          className="w-full max-h-64 object-contain border rounded-md shadow-sm"
        />
      </div>
    )}
  </div>
)}

</Modal>

    </div>
    
  );
};

export default ConsultantAccounts; 