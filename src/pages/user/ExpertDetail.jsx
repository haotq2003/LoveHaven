import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ExpertDetail = () => {
  const { accountId } = useParams()
  const [expert, setExpert] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExpertDetail()
  }, [])

  const fetchExpertDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/get-consultant-by-account-id/${accountId}`)
      console.log(res.data.data)
      setExpert(res.data.data)
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
    </div>
  )
}

export default ExpertDetail
