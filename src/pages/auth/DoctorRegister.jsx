import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ImageUploader from '../../components/common/ImageUploader'
import { authService } from '../../services/auth.service'
import { message } from 'antd'

const DoctorRegister = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    urlImage: '',
    bio: '',
    expertise: '',
      certificates: []
  })

  const [errors, setErrors] = useState({})
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('register') // register -> otp -> success
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleImageUploaded = (imageUrl, publicId) => {
    setFormData({
      ...formData,
      urlImage: imageUrl
    })
  }

  const validate = () => {
    const newErrors = {}
    
    // Kiểm tra họ tên
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên đầy đủ'
    }
    
    // Kiểm tra email
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }
    
    // Kiểm tra mật khẩu
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }
    
    // Kiểm tra số điện thoại
    if (!formData.phone) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ'
    }
    
    // Kiểm tra địa chỉ
    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ'
    }
    
    // Kiểm tra chuyên môn
    if (!formData.expertise.trim()) {
      newErrors.expertise = 'Vui lòng nhập chuyên môn'
    }
    
    // Kiểm tra tiểu sử
    if (!formData.bio.trim()) {
      newErrors.bio = 'Vui lòng nhập tiểu sử'
    }
    
    // Kiểm tra ảnh đại diện
    if (!formData.urlImage) {
      newErrors.urlImage = 'Vui lòng tải lên ảnh đại diện'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validate()) {
      setLoading(true)
      try {
        // Gửi OTP đến email người dùng
        await authService.sendOTP(formData.email)
        setStep('otp')
        message.success('Mã OTP đã được gửi đến email của bạn!')
      } catch (err) {
        message.error(err.response?.data?.message || 'Có lỗi xảy ra khi gửi OTP')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Xác thực OTP
      await authService.verifyOTP(formData.email, otp)
      
      // Chuẩn bị dữ liệu để gửi API
      const doctorData = {
        accountRegisterDTO: {
          password: formData.password,
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          urlImage: formData.urlImage
        },
        bio: formData.bio,
        expertise: formData.expertise,
        certificates: formData.certificates
      }
      
      // Đăng ký tài khoản bác sĩ
      await authService.registerDoctor(doctorData)
      
      message.success('Đăng ký bác sĩ thành công!')
      navigate('/login')
    } catch (err) {
      message.error(err.response?.data?.message || 'Xác thực OTP không thành công')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE2E2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#FF6B6B]">Đăng Ký Bác Sĩ Tư Vấn</h2>
          <p className="mt-2 text-sm text-[#FF8C94]">
            Tham gia Love Haven để giúp đỡ mọi người tìm kiếm tình yêu đích thực
          </p>
        </div>
        
        {step === 'register' && (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-[#FF6B6B]">
                Ảnh đại diện
              </label>
              <div className="mt-1">
                <ImageUploader onImageUploaded={handleImageUploaded} />
                {errors.urlImage && (
                  <p className="mt-1 text-sm text-red-600">{errors.urlImage}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#FF6B6B]">
                  Họ và tên
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.name ? 'border-red-300' : 'border-[#FFB6C1]'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B] sm:text-sm`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#FF6B6B]">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.email ? 'border-red-300' : 'border-[#FFB6C1]'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B] sm:text-sm`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#FF6B6B]">
                  Mật khẩu
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.password ? 'border-red-300' : 'border-[#FFB6C1]'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B] sm:text-sm`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#FF6B6B]">
                  Số điện thoại
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.phone ? 'border-red-300' : 'border-[#FFB6C1]'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B] sm:text-sm`}
                    placeholder="0912345678"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-[#FF6B6B]">
                  Địa chỉ
                </label>
                <div className="mt-1">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.address ? 'border-red-300' : 'border-[#FFB6C1]'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B] sm:text-sm`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="expertise" className="block text-sm font-medium text-[#FF6B6B]">
                  Chuyên môn
                </label>
                <div className="mt-1">
                  <input
                    id="expertise"
                    name="expertise"
                    type="text"
                    required
                    value={formData.expertise}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.expertise ? 'border-red-300' : 'border-[#FFB6C1]'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B] sm:text-sm`}
                    placeholder="Tư vấn tâm lý, Tư vấn hôn nhân..."
                  />
                  {errors.expertise && (
                    <p className="mt-1 text-sm text-red-600">{errors.expertise}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-[#FF6B6B]">
                Tiểu sử chuyên môn
              </label>
              <div className="mt-1">
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  required
                  value={formData.bio}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.bio ? 'border-red-300' : 'border-[#FFB6C1]'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B] sm:text-sm`}
                  placeholder="Mô tả về kinh nghiệm, phương pháp làm việc và thành tựu của bạn..."
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
                )}
              </div>
            </div>
            <div>
  <label className="block text-sm font-medium text-[#FF6B6B]">
    Chứng chỉ (Link)
  </label>
  {formData.certificates.map((cert, index) => (
    <div key={index} className="flex items-center gap-2 mt-2">
      <input
        type="url"
        name={`certificate-${index}`}
        value={cert}
        placeholder="https://example.com/certificate.pdf"
        onChange={(e) => {
          const newCertificates = [...formData.certificates]
          newCertificates[index] = e.target.value
          setFormData({ ...formData, certificates: newCertificates })
        }}
        className="flex-1 px-3 py-2 border border-[#FFB6C1] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B] sm:text-sm"
      />
      {formData.certificates.length > 1 && (
        <button
          type="button"
          onClick={() => {
            const newCertificates = formData.certificates.filter((_, i) => i !== index)
            setFormData({ ...formData, certificates: newCertificates })
          }}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Xoá
        </button>
      )}
    </div>
  ))}

  <button
    type="button"
    onClick={() =>
      setFormData({
        ...formData,
        certificates: [...formData.certificates, '']
      })
    }
    className="mt-2 text-[#FF6B6B] hover:text-[#FF5252] text-sm"
  >
    + Thêm chứng chỉ
  </button>

  {errors.certificates && (
    <p className="mt-1 text-sm text-red-600">{errors.certificates}</p>
  )}
</div>


            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF6B6B] hover:bg-[#FF5252] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B] disabled:opacity-50"
              >
                {loading ? 'Đang xử lý...' : 'Đăng Ký Làm Bác Sĩ Tư Vấn'}
              </button>
            </div>
          </form>
        )}

        {step === 'otp' && (
          <form className="space-y-6" onSubmit={handleVerifyOTP}>
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Chúng tôi đã gửi mã OTP đến email {formData.email}. Vui lòng kiểm tra và nhập mã xác thực để hoàn tất đăng ký.
              </p>
              <label htmlFor="otp" className="block text-sm font-medium text-[#FF6B6B]">
                Mã OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-[#FFB6C1] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B] sm:text-sm"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF6B6B] hover:bg-[#FF5252] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B] disabled:opacity-50"
              >
                {loading ? 'Đang xác thực...' : 'Xác thực và đăng ký'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-[#FF8C94]">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-medium text-[#FF6B6B] hover:text-[#FF5252]">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DoctorRegister