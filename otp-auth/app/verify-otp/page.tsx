'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import api from '@/lib/api'

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone') || ''
  const router = useRouter()

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/api/auth/verify-otp', { phone, otp })

      // Save token in cookie/localStorage (you can use cookie instead)
      localStorage.setItem('token', res.data.token)

      toast.success('Login successful!')
      router.push('/profile')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!phone) router.push('/login')
  }, [phone, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={verifyOtp} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  )
}
