import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blogService } from '../../services/blog.service'


const BlogPage = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)

  // Hàm lấy danh sách blog
  const getAllBlogs = async () => {
    setLoading(true)
    try {
      const res = await blogService.getAllBlogs()
      if (res.status === 200) {
        setBlogs(res.data)
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllBlogs()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">
          Blog Tâm Lý Học
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Khám phá các bài viết chuyên sâu về tâm lý học, mối quan hệ và phát triển bản thân từ các chuyên gia hàng đầu
        </p>
      </section>

      {loading ? (
        <div className="text-center">Đang tải...</div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img 
                  src={blog.thumbnailUrl} 
                  alt={blog.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-medium px-3 py-1 bg-[#F0F7FF] text-[#4A90E2] rounded-full">{blog.headline}</span>
                  <span className="text-xs text-gray-500">{new Date(blog.createdTime).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2 hover:text-[#FF6B6B] transition-colors duration-300">
                  <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.summary}</p>
                <div className="flex justify-end items-center">
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
      )}
    </div>
  )
}

export default BlogPage