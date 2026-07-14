import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import WelcomeCard from '../components/WelcomeCard'
import StatsCardRow from '../components/StatsCardRow'
import CategoriesCard from '../components/CategoriesCard'
import TasksCard from '../components/TasksCard'
import { getTasks, updateTaskStatus } from '../api/tasks'
import { getCategories, createCategory } from '../api/categories'
import { useAuth } from '../contexts/AuthContext'
import { Plus, LayoutDashboard } from 'lucide-react'
import Button from '../components/Button'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [tasksData, categoriesData] = await Promise.all([
        getTasks(),
        getCategories()
      ])
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async (name) => {
    try {
      await createCategory({ name })
      await loadData()
    } catch (error) {
      console.error('Failed to create category:', error)
      let errorMessage = 'Failed to create category'
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          try {
            const parsed = JSON.parse(error.response.data)
            errorMessage = parsed.message || errorMessage
          } catch {
            errorMessage = error.response.data
          }
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message
        }
      } else if (error.message) {
        errorMessage = error.message
      }
      alert(errorMessage)
    }
  }

  const handleCategoryDeleted = (categoryId) => {
    const normalizeId = (id) => id != null ? String(id) : null
    const normalizedDeletedId = normalizeId(categoryId)

    setCategories(prev => prev.filter(c => {
      const catId = normalizeId(c.categoryId)
      return catId !== normalizedDeletedId
    }))

    const normalizedActiveId = normalizeId(activeCategoryId)
    if (normalizedDeletedId === normalizedActiveId) {
      setActiveCategoryId(null)
    }
  }

  const normalizeId = (id) => {
    if (id == null) return null
    return String(id)
  }

  const visibleTasks = activeCategoryId != null
    ? tasks.filter(t => {
        const taskCategoryId = normalizeId(t.categoryId)
        const activeId = normalizeId(activeCategoryId)
        return taskCategoryId === activeId
      })
    : tasks

  const completed = tasks.filter(t => t.status === 'completed').length
  const pending = tasks.filter(t => t.status === 'pending').length
  const inProgress = tasks.filter(t => t.status === 'in_progress').length
  const total = tasks.length

  const todayTasks = visibleTasks.filter(t => {
    if (!t.dueDate) return false
    try {
      const taskDate = new Date(t.dueDate)
      if (isNaN(taskDate.getTime())) return false

      const today = new Date()
      return taskDate.getFullYear() === today.getFullYear() &&
             taskDate.getMonth() === today.getMonth() &&
             taskDate.getDate() === today.getDate()
    } catch {
      return false
    }
  })

  const userName = user?.userDto?.name || user?.name || 'User'

  const handleStatusChange = async (taskId, nextStatus) => {
    await updateTaskStatus(taskId, nextStatus)
    setTasks(prev => prev.map(t => t.taskId === taskId ? { ...t, status: nextStatus } : t))
  }

  if (loading) {
    return (
      <AppLayout>
        <div className={styles.loadingShell}>
          <motion.div className={styles.loadingCard} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="loading-skeleton" style={{ width: '45%', height: 20, borderRadius: 999 }} />
            <div className="loading-skeleton" style={{ width: '100%', height: 132, borderRadius: 24 }} />
            <div className="loading-skeleton" style={{ width: '100%', height: 84, borderRadius: 20 }} />
          </motion.div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className={styles.page}>
        <motion.div className={styles.header} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <div className={styles.titleGroup}>
            <div className={styles.iconWrap}>
              <LayoutDashboard size={22} />
            </div>
            <div>
              <h1 className={styles.title}>Dashboard</h1>
              <p className={styles.subtitle}>Stay on top of your assignments</p>
            </div>
          </div>
          <Button onClick={() => navigate('/tasks/create')} style={{ fontSize: '14px', padding: '0.85rem 1.3rem', borderRadius: 999 }}>
            <Plus size={17} /> Create Task
          </Button>
        </motion.div>

        <WelcomeCard greeting={`Welcome, ${userName} 👋`} taskCount={todayTasks.length} />

        <StatsCardRow completed={completed} pending={pending} inProgress={inProgress} total={total} />

        <div className={styles.grid} style={{ gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : 'minmax(300px, 380px) 1fr' }}>
          <CategoriesCard categories={categories} activeCategoryId={activeCategoryId} onSelect={setActiveCategoryId} onAddCategory={handleAddCategory} onCategoryDeleted={handleCategoryDeleted} />
          <TasksCard tasks={visibleTasks} loading={loading} onStatusChange={handleStatusChange} />
        </div>
      </div>
    </AppLayout>
  )
}
