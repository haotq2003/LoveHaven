import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { consultantService } from '../../services/consultants.service'
import { FeedBackService } from '../../services/feedback.service'

const ExpertDetail = () => {
  const { accountId } = useParams()
  const [expert, setExpert] = useState(null)
  const [loading, setLoading] = useState(true)
const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchExpertDetail()
  }, [])

  const fetchExpertDetail = async () => {
    try {
      const res = await consultantService.getConsultantById(accountId)
      console.log(res.data)
      setExpert(res.data)
          const feedbackRes = await FeedBackService.getFeedbackByTherapist(res.data.id);
    setFeedbacks(feedbackRes.data);
    } catch (error) {
      console.error('Error fetching expert details:', error)
    } finally {
      setLoading(false)
    }
  }
  

  if (loading) return <div className="text-center mt-10">Đang tải dữ liệu...</div>
  if (!expert) return <div className="text-center mt-10 text-red-500">Không tìm thấy chuyên gia</div>

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="h-64 bg-[#E6F7FF] flex items-center justify-center">
          <img src={expert.account.urlImage} alt="Avatar" className="h-full w-full object-cover" />
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-2">{expert.account.name}</h2>
          <p className="text-gray-600 mb-4">{expert.description || 'Không có mô tả.'}</p>

          <div className="mb-4">
            <strong>Chuyên môn:</strong> {expert.expertise}
          </div>
          <div className="mb-4">
            <strong>Học vấn:</strong> {expert.bio}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {expert.account.email}
          </div>
        </div>
      </div>
      <div className="mt-8">
  <h3 className="text-2xl font-semibold mb-4">Phản hồi từ khách hàng</h3>
  {feedbacks.length === 0 ? (
    <p className="text-gray-500">Chưa có đánh giá nào.</p>
  ) : (
    <ul className="space-y-4">
      {feedbacks.map((fb) => (
        <li key={fb.id} className="border p-4 rounded-md shadow-sm bg-gray-50">
          <p className="text-gray-800">{fb.body}</p>
          <p className="text-sm text-gray-500 mt-2">
            Khách hàng ID: {fb.customerId}
          </p>
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  )
}

export default ExpertDetail
