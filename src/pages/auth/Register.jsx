import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/auth.service'
import { message } from 'antd'
import ImageUploader from '../../components/common/ImageUploader'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    urlImage: ''
  })
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('register') // register -> otp -> success
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('')

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

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError('Mật khẩu phải có ít nhất 8 ký tự')
      return false
    }
    setPasswordError('')
    return true
  }

  const validateForm = () => {
    // Kiểm tra các trường bắt buộc
    if (!formData.email || !formData.password || !formData.name || !formData.phone || !formData.address) {
      setError('Vui lòng điền đầy đủ thông tin')
      return false
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Email không hợp lệ')
      return false
    }

    // Kiểm tra mật khẩu
    if (!validatePassword(formData.password)) {
      return false
    }

    return true
  }

  const handleSubmitInfo = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Gửi OTP đến email người dùng
      await authService.sendOTP(formData.email)
      setStep('otp')
      message.success('Mã OTP đã được gửi đến email của bạn!')
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi gửi OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Xác thực OTP
      await authService.verifyOTP(formData.email, otp)
      
      // Đăng ký tài khoản
      await authService.register(formData)
      
      message.success('Đăng ký thành công!')
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Xác thực OTP không thành công')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng ký tài khoản
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {step === 'register' && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmitInfo}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                value={formData.password}
                onChange={(e) => {
                  handleChange(e)
                  validatePassword(e.target.value)
                }}
              />
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Địa chỉ
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ảnh đại diện
              </label>
              <div className="mt-1">
                <ImageUploader onImageUploaded={handleImageUploaded} />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || passwordError}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF6B6B] hover:bg-[#FF5252] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B] disabled:opacity-50"
              >
                {loading ? 'Đang xử lý...' : 'Tiếp tục'}
              </button>
            </div>
          </form>
        )}

        {step === 'otp' && (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOTP}>
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Chúng tôi đã gửi mã OTP đến email {formData.email}. Vui lòng kiểm tra và nhập mã xác thực để hoàn tất đăng ký.
              </p>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Mã OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
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
      </div>
    </div>
  )
}

export default Register