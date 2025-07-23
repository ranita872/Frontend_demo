'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import api from '@/lib/api'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Not logged in')

        const res = await api.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })

        setProfile(res.data)
      } catch (err) {
        toast.error('Please log in')
        router.push('/login')
      }
    }

    fetchProfile()
  }, [router])

  const logout = async () => {
    try {
      await api.post('/api/auth/logout')
      localStorage.removeItem('token')
      toast.success('Logged out')
      router.push('/login')
    } catch {
      toast.error('Logout failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>
        {profile ? (
          <div className="text-center">
            <p className="mb-2">📱 Phone: {profile.phone}</p>
            <button
              onClick={logout}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  )
}
