import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Card from '../components/Card'
import TextField from '../components/TextField'
import Button from '../components/Button'
import { createAnnouncement } from '../api/announcements'
import { ArrowLeft } from 'lucide-react'

export default function CreateAnnouncement() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required')
      return
    }

    setLoading(true)
    try {
      await createAnnouncement({ title, content })
      navigate('/announcements')
    } catch (err) {
      setError('Failed to create announcement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout>
      <div style={{ maxWidth: 840, margin: '0 auto', padding: '8px' }}>
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => navigate('/announcements')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#4338ca',
              cursor: 'pointer',
              fontSize: '14px',
              marginBottom: '16px',
              transition: 'all 0.2s',
              fontWeight: 700,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-4px)'
              e.currentTarget.style.color = '#3730a3'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)'
              e.currentTarget.style.color = '#4338ca'
            }}
          >
            <ArrowLeft size={18} /> Back to Announcements
          </button>
          <h1 style={{ fontWeight: 800, fontSize: 28, color: '#0f172a' }}>Create Announcement</h1>
          <p style={{ marginTop: 8, color: '#64748b', maxWidth: 640 }}>Share updates, reminders, or important details with your students and team.</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && (
              <div style={{ 
                color: '#ef4444', 
                fontSize: '14px', 
                padding: '12px', 
                background: '#fee2e2', 
                borderRadius: '8px',
                border: '1px solid #fecaca',
                animation: 'fadeIn 0.3s ease-out'
              }}>
                {error}
              </div>
            )}
            
            <TextField
              label="Title"
              placeholder="Enter announcement title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                Content
              </label>
              <textarea
                placeholder="Enter announcement content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={8}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
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
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button type="button" onClick={() => navigate('/announcements')} style={{ background: '#6b7280' }}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Announcement'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
