import React from 'react';
import tuvan2 from '../assets/tuvan2.jpg';

const Login = () => {
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-5xl bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-pink-600">Chào mừng bạn đến với Trung tâm Tư vấn Tâm lý</h2>
          <p className="text-gray-600 mb-6">Vui lòng điền thông tin để tiếp tục</p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <div className="flex justify-between items-center text-sm text-pink-500">
              <a href="#" className="hover:underline">Quên mật khẩu?</a>
            </div>

            <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300">
              Đăng nhập
            </button>

            <div className="text-center text-gray-500">hoặc</div>

            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition">
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
              Đăng nhập với Google
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Chưa có tài khoản? <a href="#" className="text-pink-500 hover:underline">Đăng ký</a>
            </p>
          </form>
        </div>

        {/* Right Promotion Section */}
        <div className="hidden md:flex md:w-1/2 relative">
          {/* Hình nền */}
          <img
            src={tuvan2}
            alt="Tư vấn tâm lý"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Nội dung phủ trên hình */}
          <div className="relative z-10 p-10 text-white bg-black/40 w-full h-full flex flex-col justify-center">
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
