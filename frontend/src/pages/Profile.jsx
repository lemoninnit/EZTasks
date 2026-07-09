import React, { useState, useEffect } from 'react'
import AppLayout from '../layouts/AppLayout'
import Card from '../components/Card'
import Button from '../components/Button'
import { useAuth } from '../contexts/AuthContext'
import { updateCurrentUser, deleteCurrentUser } from '../api/users'
import { Trash2, UserCircle } from 'lucide-react'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (user?.userDto) {
      setName(user.userDto.name || '')
      setEmail(user.userDto.email || '')
    } else if (user?.name) {
      setName(user.name || '')
      setEmail(user.email || '')
    }
  }, [user])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    
    try {
      const result = await updateCurrentUser({ name, email })
      if (result) {
        updateUser(result)
        setSuccess('Profile updated successfully')
      }
    } catch (err) {
      setError('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This will permanently delete all your tasks, categories, and announcements. This action cannot be undone.')) {
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      await deleteCurrentUser()
      // Clear local storage and redirect
      localStorage.removeItem('ct_user')
      localStorage.removeItem('ct_token')
      window.location.href = '/login'
    } catch (err) {
      console.error('Delete account error:', err)
      const errorMessage = err.message || err.response?.data?.message || 'Failed to delete account'
      setError(errorMessage)
      setLoading(false)
    }
  }

  const userRole = user?.userDto?.role || user?.role || 'student'
  const userName = user?.userDto?.name || user?.name || 'User'
  const userEmail = user?.userDto?.email || user?.email || ''

  if (!user) {
    return (
      <AppLayout>
        <div style={{ padding: '24px', textAlign: 'center' }}>Loading...</div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Page Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #3f5d2a, #2d4a1b)',
            boxShadow: '0 4px 12px rgba(63, 93, 42, 0.25)'
          }}>
            <UserCircle size={22} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Profile
            </h1>
            <p style={{ fontSize: 14, color: '#64748b', margin: 0, fontWeight: 500 }}>
              Manage your account settings
            </p>
          </div>
        </div>
        
        <Card>
          <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && (
              <div style={{ 
                color: '#ef4444', 
                fontSize: '14px', 
                padding: '8px', 
                background: '#fee2e2', 
                borderRadius: '6px',
                animation: 'fadeIn 0.3s ease-out'
              }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ 
                color: '#10b981', 
                fontSize: '14px', 
                padding: '8px', 
                background: '#d1fae5', 
                borderRadius: '6px',
                animation: 'fadeIn 0.3s ease-out'
              }}>
                {success}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ 
                width: 64, 
                height: 64, 
                borderRadius: 999, 
                background: '#3f5d2a', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 700, 
                fontSize: 24,
                boxShadow: '0 4px 12px rgba(63, 93, 42, 0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {userName?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '18px', color: '#0f172a' }}>{userName}</div>
                <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>{userEmail}</div>
                <div style={{ 
                  display: 'inline-block',
                  marginTop: '8px',
                  padding: '4px 12px',
                  background: userRole === 'teacher' ? '#dbeafe' : '#f3f4f6',
                  color: userRole === 'teacher' ? '#1e40af' : '#374151',
                  borderRadius: 6,
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'capitalize'
                }}>
                  {userRole}
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3f5d2a'
                  e.target.style.boxShadow = '0 0 0 3px rgba(63, 93, 42, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.boxShadow = 'none'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3f5d2a'
                  e.target.style.boxShadow = '0 0 0 3px rgba(63, 93, 42, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.boxShadow = 'none'
                }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </form>
        </Card>

        <Card style={{ border: '1px solid #fee2e2', background: '#fef2f2' }}>
          <div style={{ marginBottom: '12px' }}>
            <h3 style={{ fontWeight: 600, color: '#dc2626', marginBottom: '8px', fontSize: '16px' }}>Danger Zone</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>
          <Button 
            onClick={handleDelete} 
            style={{ background: '#dc2626' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#b91c1c'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#dc2626'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <Trash2 size={18} style={{ marginRight: '8px' }} /> Delete Account
          </Button>
        </Card>
      </div>
    </AppLayout>
  )
}
