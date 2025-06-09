import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { blogService } from '../../services/blog.service'


const BlogDetail = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getBlogDetail = async () => {
      try {
        const res = await blogService.getBlogById(id);
 console.log(res.data)
        if (res.status === 200) {
          setBlog(res.data)

        }
      } catch (error) {
        console.error('Failed to fetch blog detail:', error)
      } finally {
        setLoading(false)
      }
    }

    getBlogDetail()
  }, [id])

  if (loading) {
    return <div className="container mx-auto px-4 py-12">Đang tải...</div>
  }

  if (!blog) {
    return <div className="container mx-auto px-4 py-12">Không tìm thấy bài viết</div>
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <img 
        src={blog.thumbnailUrl} 
        alt={blog.title}
        className="w-full h-[400px] object-cover rounded-xl mb-8"
      />
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <div className="flex items-center gap-4 mb-8 text-gray-600">
        <span>{new Date(blog.createdTime).toLocaleDateString()}</span>
        <span className="px-3 py-1 bg-[#F0F7FF] text-[#4A90E2] rounded-full">{blog.headline}</span>
      </div>
      <p className="text-xl text-gray-700 mb-8">{blog.summary}</p>
      
      <div className="space-y-8">
        {blog.content.map((section, index) => (
          <div key={index} className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{section.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogDetail