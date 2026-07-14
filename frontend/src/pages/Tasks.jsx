import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Button from '../components/Button'
import Card from '../components/Card'
import TextField from '../components/TextField'
import TaskItem from '../components/TaskItem'
import { getTasks, getTask, createTask, updateTask, deleteTask, updateTaskStatus } from '../api/tasks'
import { getCategories, createCategory } from '../api/categories'
import { Plus, ArrowLeft, ListTodo } from 'lucide-react'
import styles from './Tasks.module.css'

export default function Tasks() {
  const { id } = useParams()
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(id ? true : false)
  const [editingTask, setEditingTask] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [dueTime, setDueTime] = useState('')
  const [errors, setErrors] = useState({})
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [creating, setCreating] = useState(false)
  const [newCat, setNewCat] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      await loadData()
      if (id) {
        loadTask(id)
      }
    }
    init()
  }, [id])

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

  const loadTask = async (taskId) => {
    try {
      const task = await getTask(taskId)
      if (task) {
        setEditingTask(task)
        setTitle(task.title)
        setDescription(task.description || '')

        if (task.dueDate) {
          try {
            const date = new Date(task.dueDate)
            if (!isNaN(date.getTime())) {
              setDueDate(date.toISOString().split('T')[0])
              setDueTime(date.toTimeString().split(' ')[0].substring(0, 5))
            } else {
              const today = new Date()
              setDueDate(today.toISOString().split('T')[0])
              setDueTime(today.toTimeString().split(' ')[0].substring(0, 5))
            }
          } catch (e) {
            const today = new Date()
            setDueDate(today.toISOString().split('T')[0])
            setDueTime(today.toTimeString().split(' ')[0].substring(0, 5))
          }
        } else {
          const today = new Date()
          setDueDate(today.toISOString().split('T')[0])
          setDueTime(today.toTimeString().split(' ')[0].substring(0, 5))
        }

        setCategoryId(task.categoryId || '')
        setShowForm(true)
      }
    } catch (error) {
      console.error('Failed to load task:', error)
      navigate('/tasks')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!title.trim()) nextErrors.title = 'Title is required'
    if (!dueDate) nextErrors.dueDate = 'Deadline date is required'
    if (!dueTime) nextErrors.dueTime = 'Deadline time is required'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setCreating(true)
    try {
      const dueDateTime = `${dueDate}T${dueTime}:00`
      const payload = {
        title,
        description: description || '',
        dueDate: dueDateTime,
        status: editingTask ? editingTask.status : 'pending',
        categoryId: categoryId ? Number(categoryId) : null,
      }

      if (editingTask) {
        await updateTask(editingTask.taskId, payload)
      } else {
        await createTask(payload)
      }

      await loadData()
      resetForm()
      if (editingTask) {
        navigate('/tasks')
      }
    } catch (error) {
      setErrors({ submit: 'Failed to save task' })
    } finally {
      setCreating(false)
    }
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setDueDate('')
    setDueTime('')
    setCategoryId('')
    setErrors({})
    setEditingTask(null)
    setShowForm(false)
  }

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    try {
      await deleteTask(taskId)
      setTasks(prev => prev.filter(t => t.taskId !== taskId))
      await loadData()
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete task. Please try again.')
    }
  }

  const handleStatusChange = async (taskId, nextStatus) => {
    await updateTaskStatus(taskId, nextStatus)
    setTasks(prev => prev.map(t => t.taskId === taskId ? { ...t, status: nextStatus } : t))
  }

  const onAddCategory = async (e) => {
    e.preventDefault()
    if (!newCat.trim()) return
    try {
      const saved = await createCategory({ name: newCat })
      setCategories(prev => [...prev, saved])
      setNewCat('')
      setCategoryId(saved.categoryId)
    } catch {
      // keep existing categories on error
    }
  }

  const filteredTasks = tasks.filter((t) => {
    if (!searchTerm.trim()) return true
    const q = searchTerm.toLowerCase()
    return (
      (t.title || '').toLowerCase().includes(q) ||
      (t.description || '').toLowerCase().includes(q) ||
      (t.categoryName || '').toLowerCase().includes(q)
    )
  })

  return (
    <AppLayout>
      <div className={styles.page}>
        <motion.div className={styles.header} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <div className={styles.titleGroup}>
            <div className={styles.iconWrap}>
              <ListTodo size={22} />
            </div>
            <div>
              <h1 className={styles.title}>Tasks</h1>
              <p className={styles.subtitle}>Manage your tasks and assignments</p>
            </div>
          </div>
          <div className={styles.toolbar}>
            <input className={styles.searchInput} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search tasks..." />
            {!showForm && (
              <Button onClick={() => setShowForm(true)} style={{ fontSize: '14px', padding: '0.85rem 1.2rem', borderRadius: 999 }}>
                <Plus size={17} /> Create Task
              </Button>
            )}
          </div>
        </motion.div>

        <AnimatePresence initial={false}>
          {showForm && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Card style={{ marginBottom: 24 }}>
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
                  <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}>
                    <ArrowLeft size={20} color="#6b7280" />
                  </button>
                </div>

                <form className={styles.formBody} onSubmit={handleSubmit}>
                  {errors.submit && <div className={styles.errorText}>{errors.submit}</div>}
                  <TextField label="Task Title" placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)} required />

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Description</label>
                    <textarea className={styles.textarea} placeholder="Enter task description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
                  </div>

                  <div className={styles.formGrid}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Due Date {errors.dueDate && <span style={{ color: '#ef4444' }}>*</span>}</label>
                      <input className={styles.input} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Due Time {errors.dueTime && <span style={{ color: '#ef4444' }}>*</span>}</label>
                      <input className={styles.input} type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} />
                    </div>
                  </div>

                  <div className={styles.formGrid}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Category</label>
                      <select className={styles.input} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="">No category</option>
                        {categories.map((category) => (
                          <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Add Category</label>
                      <form onSubmit={onAddCategory} style={{ display: 'flex', gap: 8 }}>
                        <input className={styles.input} type="text" value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New category" />
                        <Button type="submit" style={{ padding: '0.8rem 0.95rem', minWidth: 'auto' }}><Plus size={16} /></Button>
                      </form>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <Button type="button" variant="ghost" onClick={resetForm} style={{ padding: '0.8rem 1rem' }}>Cancel</Button>
                    <Button type="submit" disabled={creating} style={{ padding: '0.8rem 1rem' }}>{creating ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}</Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className={styles.empty}>
            <div className="loading-skeleton" style={{ width: '100%', height: 90, borderRadius: 16, marginBottom: 12 }} />
            <div className="loading-skeleton" style={{ width: '70%', height: 16, borderRadius: 999, margin: '0 auto 8px' }} />
            <div className="loading-skeleton" style={{ width: '45%', height: 16, borderRadius: 999, margin: '0 auto' }} />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}><ListTodo size={24} /></div>
            <p style={{ margin: '0 0 0.3rem', color: 'var(--color-text)' }}>{searchTerm ? 'No tasks match your search.' : 'No tasks yet. Create your first task to get started.'}</p>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>{searchTerm ? 'Try a different keyword.' : 'Your task board is ready for your next big move.'}</p>
          </div>
        ) : (
          <div className={styles.list}>
            <AnimatePresence initial={false}>
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.taskId}
                  title={task.title}
                  description={task.description}
                  dueDate={task.dueDate}
                  status={task.status}
                  categoryName={task.categoryName}
                  taskId={task.taskId}
                  onEdit={() => {
                    setShowForm(true)
                    navigate(`/tasks/edit/${task.taskId}`)
                  }}
                  onDelete={() => handleDelete(task.taskId)}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
