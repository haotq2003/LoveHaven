import React, { useEffect, useState } from 'react'
import { Bell, Search, Wallet } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { walletService } from '../../services/wallet.service'
import { jwtDecode } from 'jwt-decode'

const Header = () => {
  const { userEmail } = useAuth()
  const [balance, setBalance] = useState(0)
  
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        
        const decoded = jwtDecode(token)
        const accountId =  decoded.id
        
        if (accountId) {
          const walletData = await walletService.getWallet(accountId)
          console.log(walletData)
          setBalance(walletData.data || 0)
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin ví:', error)
      }
    }
    
    fetchWalletBalance()
  }, [])
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-gray-800">Trang Tư Vấn Viên</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Wallet */}
        <div className="flex items-center p-2 rounded-lg bg-gray-50 border border-gray-200">
          <Wallet size={18} className="text-[#F48BA1] mr-2" />
          <span className="text-sm font-medium">{formatCurrency(balance)}</span>
        </div>
        
        {/* Notifications */}
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#F48BA1] flex items-center justify-center text-white font-medium">
            {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700">{userEmail || 'Consultant'}</p>
            <p className="text-xs text-gray-500">Tư vấn viên</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header