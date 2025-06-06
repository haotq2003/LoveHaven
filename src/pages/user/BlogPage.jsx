import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogPage = () => {
  // Dữ liệu mẫu cho các bài viết blog
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Làm thế nào để vượt qua khủng hoảng tâm lý',
      category: 'Tâm lý học',
      summary: 'Khủng hoảng tâm lý có thể xảy ra với bất kỳ ai. Bài viết này chia sẻ các phương pháp hiệu quả để nhận diện và vượt qua giai đoạn khó khăn này.',
      image: '/images/blog/crisis.jpg',
      date: '12/05/2023',
      author: 'TS. Nguyễn Văn An'
    },
    {
      id: 2,
      title: 'Bí quyết giữ gìn hạnh phúc gia đình',
      category: 'Gia đình',
      summary: 'Hạnh phúc gia đình đến từ những điều nhỏ nhặt hàng ngày. Khám phá các bí quyết đơn giản nhưng hiệu quả để xây dựng mối quan hệ gia đình bền vững.',
      image: '/images/blog/family.jpg',
      date: '10/05/2023',
      author: 'ThS. Trần Thị Bình'
    },
    {
      id: 3,
      title: '5 cách để cải thiện sức khỏe tinh thần',
      category: 'Sức khỏe',
      summary: 'Sức khỏe tinh thần đóng vai trò quan trọng trong cuộc sống. Bài viết giới thiệu 5 phương pháp đơn giản giúp cải thiện tâm trạng và sức khỏe tinh thần mỗi ngày.',
      image: '/images/blog/mental-health.jpg',
      date: '05/05/2023',
      author: 'PGS.TS. Lê Minh Cường'
    },
    {
      id: 4,
      title: 'Làm thế nào để giao tiếp hiệu quả với đối tác',
      category: 'Mối quan hệ',
      summary: 'Giao tiếp là chìa khóa của mọi mối quan hệ. Tìm hiểu các kỹ năng giao tiếp hiệu quả để xây dựng và duy trì mối quan hệ lành mạnh với đối tác của bạn.',
      image: '/images/blog/communication.jpg',
      date: '01/05/2023',
      author: 'ThS. Phạm Hoàng Dung'
    },
    {
      id: 5,
      title: 'Hiểu về trầm cảm và cách hỗ trợ người thân',
      category: 'Tâm lý học',
      summary: 'Trầm cảm là căn bệnh phổ biến nhưng thường bị hiểu sai. Bài viết giúp bạn nhận biết dấu hiệu trầm cảm và cách hỗ trợ người thân đang gặp vấn đề.',
      image: '/images/blog/depression.jpg',
      date: '25/04/2023',
      author: 'TS. Hoàng Thị Lan'
    },
    {
      id: 6,
      title: 'Nuôi dạy con trong thời đại số',
      category: 'Gia đình',
      summary: 'Công nghệ số đang thay đổi cách trẻ em học tập và phát triển. Tìm hiểu cách cân bằng giữa công nghệ và các hoạt động truyền thống trong nuôi dạy con.',
      image: '/images/blog/digital-parenting.jpg',
      date: '20/04/2023',
      author: 'ThS. Ngô Quang Minh'
    }
  ])

  // Danh mục blog
  const categories = [
    'Tất cả',
    'Tâm lý học',
    'Gia đình',
    'Sức khỏe',
    'Mối quan hệ',
    'Phát triển bản thân'
  ]

  // State cho bộ lọc
  const [activeCategory, setActiveCategory] = useState('Tất cả')

  // Lọc blog theo danh mục
  const filteredBlogs = activeCategory === 'Tất cả' 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory)

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">
          Blog Tâm Lý Học
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Khám phá các bài viết chuyên sâu về tâm lý học, mối quan hệ và phát triển bản thân từ các chuyên gia hàng đầu
        </p>
      </section>

      {/* Danh mục */}
      <section className="mb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category 
                ? 'bg-[#FF6B6B] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Danh sách bài viết */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredBlogs.map(blog => (
          <div key={blog.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="h-48 bg-gray-200 relative">
              {/* Placeholder cho hình ảnh */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Hình ảnh bài viết
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium px-3 py-1 bg-[#F0F7FF] text-[#4A90E2] rounded-full">{blog.category}</span>
                <span className="text-xs text-gray-500">{blog.date}</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2 hover:text-[#FF6B6B] transition-colors duration-300">
                <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{blog.summary}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{blog.author}</span>
                <Link to={`/blog/${blog.id}`} className="text-[#FF6B6B] hover:text-[#FF5252] text-sm font-medium flex items-center">
                  Đọc tiếp
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Đăng ký nhận bản tin */}
      
    </div>
  )
}

export default BlogPage