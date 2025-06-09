import React, { useEffect, useState } from 'react'
import { servicesService } from '../../services/services.service';
import { consultantService } from '../../services/consultants.service';

const ExpertsPage = () => {
  // Mảng chứa thông tin các chuyên gia
  const [experts,setExperts]  = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    
 const hanldeRegisternow = () =>{
    window.location.href = '/doctor-register';
 }
    useEffect(()=>{
      getAllExperts();
    },[page,size])

    const getAllExperts =  async () =>{
      try {
        const res = await consultantService.getAllConsultant(page, size);
        setExperts(res.data.content)
        console.log(res.data.content)
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
     

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {experts?.map((expert) => (
          <div key={expert.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-[#FFB6C1]/30 overflow-hidden group">
            <div className="h-64 bg-[#E6F7FF] relative">  {/* Thay đổi từ #FFE2E2 sang #E6F7FF (xanh dương nhạt) */}
              {/* Thay thế bằng hình ảnh thực tế */}
              <div className="absolute inset-0 flex items-center justify-center text-[#4A90E2] text-lg">  {/* Thay đổi từ #FF6B6B sang #4A90E2 */}
              <img className='w-full h-full ' src={expert.account.urlImage} alt="Avatar" />
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-black mb-1">{expert.account.name}</h3>
             {/* Thay đổi từ #FF8C94 sang #6B7280 (xám) */}
              <p className="text-gray-700 mb-6 leading-relaxed">{expert.description}</p>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-black mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#4A90E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">  {/* Thay đổi từ #FFB6C1 sang #4A90E2 */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  Chuyên môn:
                </h4>
              {expert.expertise}
              </div>
              
              <div className="flex items-center text-gray-700">
                <span className="text-[#9061F9]">  {/* Thay đổi từ #FF8C94 sang #9061F9 (tím) */}
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                  </svg>
                </span>
                <strong className="text-black mr-2">Học vấn:</strong> 
                {expert.bio}
              </div>
            </div>
            <div className="bg-[#F0FFF4] p-6 flex justify-between gap-4">  {/* Thay đổi từ #FFE2E2 sang #F0FFF4 (xanh lá nhạt) */}
              <button className="flex-1 bg-white text-[#2E8B57] border border-[#2E8B57] font-medium py-2.5 px-4 rounded-xl hover:bg-[#E6F7EE] transition-all duration-300">  {/* Thay đổi từ #FF6B6B sang #2E8B57 */}
                Xem hồ sơ
              </button>
            
            </div>
          </div>
        ))}
      </div>

      <section className="mt-20 bg-[#FFF0F5] rounded-2xl p-12 text-center">  {/* Thay đổi từ #FFE2E2 sang #FFF0F5 (hồng nhạt khác) */}
        <h2 className="text-3xl font-semibold text-black mb-6">
          Trở thành chuyên gia của Love Haven
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
          Nếu bạn là chuyên gia trong lĩnh vực tâm lý, tư vấn tình cảm hoặc hôn nhân gia đình, hãy tham gia đội ngũ của chúng tôi để giúp đỡ nhiều người hơn nữa tìm thấy hạnh phúc.
        </p>
        <button onClick={hanldeRegisternow}  className="bg-gradient-to-r from-[#FF6B6B] to-[#9061F9] hover:from-[#FF5252] hover:to-[#7C4DEF] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-md transform hover:scale-105">  {/* Thêm gradient từ hồng sang tím */}
          Ứng tuyển ngay
        </button>
      </section>
    </div>
  )
}

export default ExpertsPage