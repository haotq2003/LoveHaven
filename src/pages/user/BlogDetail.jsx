import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const BlogDetail = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  
  // Dữ liệu mẫu cho bài viết chi tiết
  const [blog, setBlog] = useState({
    id: 1,
    title: 'Làm thế nào để vượt qua khủng hoảng tâm lý',
    category: 'Tâm lý học',
    content: `<p>Khủng hoảng tâm lý là một trạng thái căng thẳng cảm xúc mà bất kỳ ai cũng có thể gặp phải trong cuộc sống. Đây là thời điểm khi một người cảm thấy không thể đối phó với những thách thức và áp lực của cuộc sống, dẫn đến cảm giác bị choáng ngợp, lo lắng và thậm chí tuyệt vọng.</p>

<h3>Dấu hiệu nhận biết khủng hoảng tâm lý</h3>
<p>Khủng hoảng tâm lý thường biểu hiện qua nhiều dấu hiệu khác nhau, bao gồm:</p>
<ul>
  <li>Cảm giác lo lắng và sợ hãi kéo dài</li>
  <li>Thay đổi thói quen ăn uống và giấc ngủ</li>
  <li>Cảm giác vô vọng và tuyệt vọng</li>
  <li>Khó tập trung và đưa ra quyết định</li>
  <li>Xa lánh bạn bè và gia đình</li>
  <li>Giảm hiệu suất làm việc hoặc học tập</li>
</ul>

<h3>Nguyên nhân gây khủng hoảng tâm lý</h3>
<p>Khủng hoảng tâm lý có thể xuất phát từ nhiều nguyên nhân khác nhau, bao gồm:</p>
<ul>
  <li>Mất mát người thân hoặc chia tay trong mối quan hệ</li>
  <li>Khó khăn tài chính hoặc mất việc làm</li>
  <li>Bệnh tật hoặc chấn thương nghiêm trọng</li>
  <li>Thay đổi lớn trong cuộc sống như chuyển nhà, thay đổi công việc</li>
  <li>Áp lực từ công việc hoặc học tập</li>
  <li>Xung đột trong các mối quan hệ</li>
</ul>

<h3>Các phương pháp vượt qua khủng hoảng tâm lý</h3>
<p>Dưới đây là một số phương pháp hiệu quả giúp bạn vượt qua giai đoạn khủng hoảng tâm lý:</p>

<h4>1. Nhận biết và chấp nhận cảm xúc</h4>
<p>Bước đầu tiên để vượt qua khủng hoảng tâm lý là nhận biết và chấp nhận cảm xúc của bạn. Đừng cố gắng phủ nhận hoặc chạy trốn khỏi những cảm xúc tiêu cực. Thay vào đó, hãy thừa nhận chúng và hiểu rằng đó là phản ứng bình thường trước những tình huống khó khăn.</p>

<h4>2. Tìm kiếm sự hỗ trợ</h4>
<p>Đừng cố gắng vượt qua khủng hoảng một mình. Hãy chia sẻ cảm xúc và khó khăn của bạn với người thân, bạn bè hoặc chuyên gia tâm lý. Sự hỗ trợ từ người khác có thể giúp bạn nhìn nhận vấn đề từ góc độ khác và tìm ra giải pháp phù hợp.</p>

<h4>3. Thực hành các kỹ thuật thư giãn</h4>
<p>Các kỹ thuật thư giãn như hít thở sâu, thiền, yoga hoặc tập thể dục đều có thể giúp giảm căng thẳng và cải thiện tâm trạng. Hãy dành thời gian mỗi ngày để thực hành những hoạt động này.</p>

<h4>4. Duy trì lối sống lành mạnh</h4>
<p>Chế độ ăn uống cân bằng, ngủ đủ giấc và tập thể dục thường xuyên có thể cải thiện đáng kể sức khỏe tâm lý của bạn. Hãy cố gắng duy trì lối sống lành mạnh ngay cả khi bạn đang trải qua giai đoạn khó khăn.</p>

<h4>5. Thiết lập mục tiêu nhỏ</h4>
<p>Trong giai đoạn khủng hoảng, việc đặt ra những mục tiêu lớn có thể khiến bạn cảm thấy áp lực. Thay vào đó, hãy thiết lập những mục tiêu nhỏ và khả thi. Mỗi thành công nhỏ sẽ giúp bạn xây dựng sự tự tin và động lực để tiếp tục tiến lên.</p>

<h4>6. Tìm kiếm ý nghĩa</h4>
<p>Tìm kiếm ý nghĩa trong những khó khăn bạn đang trải qua có thể giúp bạn vượt qua khủng hoảng tâm lý. Hãy tự hỏi bản thân: "Tôi có thể học được gì từ trải nghiệm này?" hoặc "Làm thế nào tôi có thể sử dụng trải nghiệm này để trở nên mạnh mẽ hơn?"</p>

<h4>7. Tìm kiếm sự giúp đỡ chuyên nghiệp</h4>
<p>Nếu cảm thấy khủng hoảng tâm lý quá nghiêm trọng hoặc kéo dài, đừng ngần ngại tìm kiếm sự giúp đỡ từ các chuyên gia tâm lý hoặc bác sĩ tâm thần. Họ có thể cung cấp cho bạn những công cụ và kỹ năng cần thiết để vượt qua giai đoạn khó khăn này.</p>

<h3>Kết luận</h3>
<p>Khủng hoảng tâm lý là một phần không thể tránh khỏi của cuộc sống, nhưng điều quan trọng là cách bạn đối phó với nó. Bằng cách áp dụng những phương pháp trên, bạn không chỉ có thể vượt qua khủng hoảng mà còn trở nên mạnh mẽ hơn sau mỗi thử thách. Hãy nhớ rằng, việc tìm kiếm sự giúp đỡ không phải là dấu hiệu của sự yếu đuối mà là biểu hiện của sự can đảm và quyết tâm để vượt qua khó khăn.</p>`,
    image: '/images/blog/crisis.jpg',
    date: '12/05/2023',
    author: 'TS. Nguyễn Văn An',
    authorAvatar: '/images/experts/expert1.jpg',
    authorBio: 'Tiến sĩ Tâm lý học với hơn 15 năm kinh nghiệm trong lĩnh vực tư vấn và trị liệu tâm lý. Chuyên gia về các vấn đề khủng hoảng tâm lý và phát triển bản thân.',
    tags: ['Khủng hoảng tâm lý', 'Sức khỏe tinh thần', 'Kỹ năng đối phó', 'Tự chăm sóc bản thân'],
    relatedPosts: [2, 5, 6]
  })

  // Giả lập việc tải dữ liệu
  useEffect(() => {
    // Trong thực tế, bạn sẽ gọi API để lấy dữ liệu dựa trên ID
    // Ví dụ: fetch(`/api/blogs/${id}`).then(res => res.json()).then(data => setBlog(data))
    
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col w-full">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Tiêu đề và thông tin bài viết */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
          {blog.title}
        </h1>
        <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-6">
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {blog.date}
          </span>
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {blog.category}
          </span>
        </div>
      </header>

      {/* Hình ảnh bài viết */}
      <div className="mb-8 bg-gray-200 rounded-xl h-64 md:h-96 flex items-center justify-center text-gray-500">
        Hình ảnh bài viết
      </div>

      {/* Thẻ tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {blog.tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-[#F0F7FF] text-[#4A90E2] text-sm rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Nội dung bài viết */}
      <div className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>

      {/* Thông tin tác giả */}
      <div className="border border-gray-200 rounded-xl p-6 mb-12 bg-gray-50">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500 text-xs">
            Ảnh tác giả
          </div>
          <div>
            <h3 className="text-xl font-semibold text-black mb-1">{blog.author}</h3>
            <p className="text-gray-600 mb-3">{blog.authorBio}</p>
            <div className="flex gap-2">
              <a href="#" className="text-[#FF6B6B] hover:text-[#FF5252] font-medium">Xem tất cả bài viết</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bài viết liên quan */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-black mb-6">Bài viết liên quan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bài viết liên quan 1 */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="h-40 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                Hình ảnh bài viết
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium px-2 py-1 bg-[#F0F7FF] text-[#4A90E2] rounded-full">Tâm lý học</span>
                <span className="text-xs text-gray-500">05/05/2023</span>
              </div>
              <h3 className="text-base font-semibold text-black mb-2 hover:text-[#FF6B6B] transition-colors duration-300">
                <Link to="/blog/3">5 cách để cải thiện sức khỏe tinh thần</Link>
              </h3>
            </div>
          </div>

          {/* Bài viết liên quan 2 */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="h-40 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                Hình ảnh bài viết
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium px-2 py-1 bg-[#F0F7FF] text-[#4A90E2] rounded-full">Tâm lý học</span>
                <span className="text-xs text-gray-500">25/04/2023</span>
              </div>
              <h3 className="text-base font-semibold text-black mb-2 hover:text-[#FF6B6B] transition-colors duration-300">
                <Link to="/blog/5">Hiểu về trầm cảm và cách hỗ trợ người thân</Link>
              </h3>
            </div>
          </div>

          {/* Bài viết liên quan 3 */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="h-40 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                Hình ảnh bài viết
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium px-2 py-1 bg-[#F0F7FF] text-[#4A90E2] rounded-full">Gia đình</span>
                <span className="text-xs text-gray-500">20/04/2023</span>
              </div>
              <h3 className="text-base font-semibold text-black mb-2 hover:text-[#FF6B6B] transition-colors duration-300">
                <Link to="/blog/6">Nuôi dạy con trong thời đại số</Link>
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Phần bình luận */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-black mb-6">Bình luận (3)</h2>
        
        {/* Form bình luận */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <h3 className="text-lg font-medium text-black mb-4">Để lại bình luận của bạn</h3>
          <div className="mb-4">
            <textarea 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent" 
              rows="4"
              placeholder="Viết bình luận của bạn ở đây..."
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input 
              type="text" 
              placeholder="Tên của bạn" 
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
            />
            <input 
              type="email" 
              placeholder="Email của bạn" 
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
            />
          </div>
          <button className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-6 py-3 rounded-lg transition-colors duration-300">
            Gửi bình luận
          </button>
        </div>
        
        {/* Danh sách bình luận */}
        <div className="space-y-6">
          {/* Bình luận 1 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500 text-xs">
                Ảnh
              </div>
              <div>
                <h4 className="font-medium text-black">Nguyễn Thị Hương</h4>
                <p className="text-sm text-gray-500">10/05/2023, 14:30</p>
              </div>
            </div>
            <p className="text-gray-700">Bài viết rất hữu ích. Tôi đã áp dụng một số phương pháp được đề cập và thấy tâm trạng cải thiện đáng kể. Cảm ơn tác giả!</p>
          </div>
          
          {/* Bình luận 2 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500 text-xs">
                Ảnh
              </div>
              <div>
                <h4 className="font-medium text-black">Trần Văn Minh</h4>
                <p className="text-sm text-gray-500">09/05/2023, 10:15</p>
              </div>
            </div>
            <p className="text-gray-700">Tôi đặc biệt thích phần về việc thiết lập mục tiêu nhỏ. Đúng là khi đang trong giai đoạn khủng hoảng, việc đặt ra những mục tiêu nhỏ và khả thi giúp tôi cảm thấy có động lực hơn rất nhiều.</p>
          </div>
          
          {/* Bình luận 3 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500 text-xs">
                Ảnh
              </div>
              <div>
                <h4 className="font-medium text-black">Lê Thanh Hà</h4>
                <p className="text-sm text-gray-500">08/05/2023, 16:45</p>
              </div>
            </div>
            <p className="text-gray-700">Bài viết rất chi tiết và dễ hiểu. Tôi đã chia sẻ cho một người bạn đang gặp khó khăn và họ cũng thấy rất hữu ích. Mong tác giả sẽ có thêm nhiều bài viết hay như thế này!</p>
          </div>
        </div>
      </div>

      {/* Nút quay lại */}
      <div className="text-center">
        <Link to="/blog" className="inline-flex items-center text-[#FF6B6B] hover:text-[#FF5252] font-medium">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay lại danh sách bài viết
        </Link>
      </div>
    </div>
  )
}

export default BlogDetail