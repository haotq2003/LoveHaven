import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import tuvan2 from '../../assets/anhtuvan.jpg';
import { authService } from '../../services/auth.service';
import { message } from 'antd';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      
      if (response.data) {
        login(response.data);
        message.success('Đăng nhập thành công!');
        
        // Giải mã JWT token để lấy thông tin role
        const token = response.data;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userRoles = payload.roles; // roles là một mảng trong JWT
        
        // Chuyển hướng dựa trên role
        if (userRoles && userRoles.length > 0) {
          // Kiểm tra nếu mảng roles chứa role cần thiết
          if (userRoles.includes('CONSULTANT')) {
            navigate('/consultant');
          } else if (userRoles.includes('MANAGER')) {
            navigate('/manager');
          } else {
            // Mặc định chuyển về trang chủ nếu không có role phù hợp
            navigate('/');
          }
        } else {
          // Không có roles hoặc mảng rỗng
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập không thành công');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-5xl bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-[#FF6B6B]">Chào mừng bạn đến với Trung tâm Tư vấn Tâm lý</h2>
          <p className="text-[#FF8C94] mb-6">Vui lòng điền thông tin để tiếp tục</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full px-4 py-2 border border-[#FFB6C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full px-4 py-2 border border-[#FFB6C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm text-[#FF6B6B]">
              <a href="#" className="hover:text-[#FF5252]">Quên mật khẩu?</a>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#FF6B6B] text-white py-2 rounded-lg hover:bg-[#FF5252] transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>

            <div className="text-center text-[#FF8C94]">hoặc</div>

            <button 
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white border border-[#FFB6C1] text-[#FF6B6B] py-2 rounded-lg hover:bg-[#FFE2E2] transition"
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
              Đăng nhập với Google
            </button>

            <p className="text-center text-sm text-[#FF8C94] mt-4">
              Chưa có tài khoản? <Link to="/register" className="text-[#FF6B6B] hover:text-[#FF5252]">Đăng ký</Link>
            </p>
            <p className="text-center text-sm text-[#FF8C94] mt-4">
              Đăng ký chuyên viên <Link to="/doctor-register" className="text-[#FF6B6B] hover:text-[#FF5252]">Đăng ký</Link>
            </p>
          </form>
        </div>

        {/* Right Promotion Section */}
        <div className="hidden md:flex md:w-1/2 relative">
          <img
            src={tuvan2}
            alt="Tư vấn tâm lý"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="relative z-10 p-10 text-white w-full h-full flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4">Lắng nghe - Thấu hiểu - Chia sẻ</h2>
            <p className="text-lg">
              Chúng tôi luôn đồng hành cùng bạn trong hành trình chữa lành, giúp bạn tìm lại sự bình yên, cân bằng và hạnh phúc trong cuộc sống.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
