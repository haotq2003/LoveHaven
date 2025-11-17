import React from 'react'
import { CheckCircle, Mail } from 'lucide-react'

const VerifyResult = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-4">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">
              Verification Successful!
            </h1>
            <p className="text-gray-600">
              Your email has been verified.
            </p>
          </div>

          {/* Email Icon Decoration */}
          <div className="flex justify-center py-4">
            <div className="bg-orange-100 rounded-full p-3">
              <Mail className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 text-gray-600">
            <p>
              Congratulations! Your account has been successfully activated.
            </p>
            <p>
              You're now ready to step into the world of{' '}
              <span className="font-semibold text-orange-600">Sketchnote</span> — 
              where every idea can be transformed into visual, creative illustrations.
            </p>
            <p className="text-sm">
              Feel free to return to the homepage and start your creative journey with us!
            </p>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help?{' '}
              <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                Contact us
              </a>.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Welcome to the Sketchnote community! ✏️✨</p>
        </div>
      </div>
    </div>
  )
}

export default VerifyResult
