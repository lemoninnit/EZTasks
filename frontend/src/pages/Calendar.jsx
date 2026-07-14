// import React, { useEffect, useState } from 'react'
// import AppLayout from '../layouts/AppLayout'
// import Card from '../components/Card'
// import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
// import { getTasks } from '../api/tasks'

// export default function Calendar() {
//   const [tasks, setTasks] = useState([])
//   const [currentDate, setCurrentDate] = useState(new Date())
//   const [selectedDate, setSelectedDate] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     (async () => {
//       try { 
//         setTasks(await getTasks()) 
//       } catch { 
//         setTasks([]) 
//       } finally { 
//         setLoading(false) 
//       }
//     })()
//   }, [])

//   const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
//   const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

//   const daysInMonth = getDaysInMonth(currentDate)
//   const firstDay = getFirstDayOfMonth(currentDate)
//   const days = Array.from({length: daysInMonth}, (_, i) => i + 1)
//   const emptyDays = Array.from({length: firstDay}, () => null)

//   const getTasksForDay = (day) => {
//     if (!day) return []
//     const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
//     const dateStr = date.toISOString().split('T')[0]
//     return tasks.filter(t => {
//       if (!t.dueDate) return false
//       const taskDate = t.dueDate.split('T')[0]
//       return taskDate === dateStr
//     })
//   }

//   const formatTaskTime = (dueDate) => {
//     if (!dueDate) return ''
//     try {
//       const date = new Date(dueDate)
//       return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
//     } catch {
//       return ''
//     }
//   }

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'completed': return '#10b981'
//       case 'in_progress': return '#f59e0b'
//       default: return '#3b82f6'
//     }
//   }

//   const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
//   const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
//   const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))

//   const allCalendarDays = [...emptyDays, ...days]
//   const selectedTasks = selectedDate ? getTasksForDay(selectedDate) : []

//   return (
//     <AppLayout>
//       <div style={{ maxWidth: '100%', width: '100%', margin: '0 auto', padding: '24px' }}>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
//           <div>
//             <h1 style={{ fontWeight: 800, fontSize: 28, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 8px 0' }}>
//               <CalendarIcon size={28} /> Calendar
//             </h1>
//             <p style={{ color: '#6b7280', margin: 0, fontSize: 14 }}>Track your assignments by due date</p>
//           </div>
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '2fr 1fr', gap: 24, width: '100%' }}>
//           <Card style={{ width: '100%', maxWidth: '100%' }}>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
//               <button 
//                 onClick={prevMonth} 
//                 style={{ 
//                   padding: '8px 12px', 
//                   border: '1px solid #e5e7eb', 
//                   borderRadius: 8, 
//                   background: '#fff',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   transition: 'all 0.2s'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.borderColor = '#3f5d2a'
//                   e.currentTarget.style.transform = 'scale(1.05)'
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.borderColor = '#e5e7eb'
//                   e.currentTarget.style.transform = 'scale(1)'
//                 }}
//                 title="Previous month"
//               >
//                 <ChevronLeft size={20} color="#374151" />
//               </button>
//               <h2 style={{ fontWeight: 700, color: '#0f172a', fontSize: 20, margin: 0 }}>{monthYear}</h2>
//               <button 
//                 onClick={nextMonth} 
//                 style={{ 
//                   padding: '8px 12px', 
//                   border: '1px solid #e5e7eb', 
//                   borderRadius: 8, 
//                   background: '#fff',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   transition: 'all 0.2s'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.borderColor = '#3f5d2a'
//                   e.currentTarget.style.transform = 'scale(1.05)'
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.borderColor = '#e5e7eb'
//                   e.currentTarget.style.transform = 'scale(1)'
//                 }}
//                 title="Next month"
//               >
//                 <ChevronRight size={20} color="#374151" />
//               </button>
//             </div>

//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 12 }}>
//               {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//                 <div key={day} style={{ textAlign: 'center', fontWeight: 600, color: '#334155', fontSize: 13, padding: '8px 0' }}>
//                   {day}
//                 </div>
//               ))}
//             </div>

//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
//               {allCalendarDays.map((day, idx) => {
//                 const dayTasks = getTasksForDay(day)
//                 const isSelected = selectedDate === day
//                 const isToday = day && new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

//                 return (
//                   <div 
//                     key={idx} 
//                     onClick={() => day && setSelectedDate(day)}
//                     style={{ 
//                       border: isSelected ? '2px solid #3f5d2a' : '1px dashed #e5e7eb', 
//                       borderRadius: 8, 
//                       minHeight: 100, 
//                       background: !day ? '#f9fafb' : isToday ? '#f0fdf4' : '#fff',
//                       padding: 8,
//                       cursor: day ? 'pointer' : 'default',
//                       transition: 'all 0.2s',
//                       boxShadow: isSelected ? '0 2px 8px rgba(63, 93, 42, 0.15)' : 'none'
//                     }}
//                     onMouseEnter={(e) => {
//                       if (day) {
//                         e.currentTarget.style.transform = 'scale(1.02)'
//                         e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
//                       }
//                     }}
//                     onMouseLeave={(e) => {
//                       if (day && !isSelected) {
//                         e.currentTarget.style.transform = 'scale(1)'
//                         e.currentTarget.style.boxShadow = 'none'
//                       }
//                     }}
//                   >
//                     {day && (
//                       <>
//                         <div style={{ 
//                           fontWeight: 700, 
//                           color: isToday ? '#3f5d2a' : '#334155', 
//                           marginBottom: 8,
//                           fontSize: 14
//                         }}>
//                           {day}
//                         </div>
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//                           {dayTasks.slice(0, 2).map((task, i) => {
//                             const timeStr = formatTaskTime(task.dueDate)
//                             return (
//                               <div 
//                                 key={i} 
//                                 style={{ 
//                                   border: '1px solid #e5e7eb', 
//                                   borderLeft: `3px solid ${getStatusColor(task.status)}`, 
//                                   borderRadius: 4, 
//                                   padding: '4px 6px', 
//                                   fontSize: 11, 
//                                   color: '#334155',
//                                   background: '#fff',
//                                   overflow: 'hidden',
//                                   textOverflow: 'ellipsis',
//                                   whiteSpace: 'nowrap',
//                                   transition: 'all 0.2s'
//                                 }}
//                                 title={task.title}
//                                 onMouseEnter={(e) => {
//                                   e.currentTarget.style.transform = 'scale(1.05)'
//                                   e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
//                                 }}
//                                 onMouseLeave={(e) => {
//                                   e.currentTarget.style.transform = 'scale(1)'
//                                   e.currentTarget.style.boxShadow = 'none'
//                                 }}
//                               >
//                                 {timeStr && <span style={{ fontWeight: 600 }}>{timeStr} </span>}
//                                 {task.title.substring(0, 12)}
//                               </div>
//                             )
//                           })}
//                           {dayTasks.length > 2 && (
//                             <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>
//                               +{dayTasks.length - 2} more
//                             </div>
//                           )}
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 )
//               })}
//             </div>
//           </Card>

//           {selectedDate && (
//             <Card>
//               <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>
//                 Tasks for {new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//               </h3>
//               {selectedTasks.length === 0 ? (
//                 <div style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: 14 }}>
//                   No tasks for this date
//                 </div>
//               ) : (
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//                   {selectedTasks.map((task) => {
//                     const timeStr = formatTaskTime(task.dueDate)
//                     return (
//                       <div 
//                         key={task.taskId}
//                         style={{
//                           border: '1px solid #e5e7eb',
//                           borderLeft: `4px solid ${getStatusColor(task.status)}`,
//                           borderRadius: 8,
//                           padding: 12,
//                           background: '#fff',
//                           transition: 'all 0.2s',
//                           boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = 'translateX(4px)'
//                           e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = 'translateX(0)'
//                           e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)'
//                         }}
//                       >
//                         <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 4, fontSize: 14 }}>
//                           {task.title}
//                         </div>
//                         {timeStr && (
//                           <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>
//                             Time: {timeStr}
//                           </div>
//                         )}
//                         <div style={{ 
//                           display: 'inline-block',
//                           padding: '2px 8px',
//                           background: getStatusColor(task.status) + '20',
//                           color: getStatusColor(task.status),
//                           borderRadius: 4,
//                           fontSize: 11,
//                           fontWeight: 500,
//                           textTransform: 'capitalize'
//                         }}>
//                           {task.status.replace('_', ' ')}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               )}
//             </Card>
//           )}
//         </div>

//         {/* CENTERED LEGEND */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",   // CENTER HORIZONTALLY
//               gap: 32,
//               marginTop: 32,
//               flexWrap: "wrap",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <span
//                 style={{
//                   width: 12,
//                   height: 12,
//                   borderRadius: 999,
//                   background: "#3b82f6",
//                 }}
//               ></span>
//               <span style={{ fontSize: 14, color: "#64748b" }}>Pending</span>
//             </div>

//             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <span
//                 style={{
//                   width: 12,
//                   height: 12,
//                   borderRadius: 999,
//                   background: "#f59e0b",
//                 }}
//               ></span>
//               <span style={{ fontSize: 14, color: "#64748b" }}>In Progress</span>
//             </div>

//             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <span
//                 style={{
//                   width: 12,
//                   height: 12,
//                   borderRadius: 999,
//                   background: "#10b981",
//                 }}
//               ></span>
//               <span style={{ fontSize: 14, color: "#64748b" }}>Completed</span>
//             </div>
//           </div>
//       </div>
//     </AppLayout>
//   )
// }


import React, { useEffect, useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import Card from '../components/Card'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { getTasks } from '../api/tasks'

export default function Calendar() {
  const [tasks, setTasks] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hoveredIdx, setHoveredIdx] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        setTasks(await getTasks())
      } catch {
        setTasks([])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, () => null)

  const getTasksForDay = (day) => {
    if (!day) return []
    const y = currentDate.getFullYear()
    const m = String(currentDate.getMonth() + 1).padStart(2, '0')
    const d = String(day).padStart(2, '0')
    const dateStr = `${y}-${m}-${d}`
    return tasks.filter(t => {
      if (!t.dueDate) return false
      const taskDate = t.dueDate.split('T')[0]
      return taskDate === dateStr
    })
  }

  const formatTaskTime = (dueDate) => {
    if (!dueDate) return ''
    try {
      const date = new Date(dueDate)
      if (isNaN(date.getTime())) {
        return ''
      }
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    } catch {
      return ''
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981'
      case 'in_progress': return '#f59e0b'
      default: return '#3b82f6'
    }
  }

  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))

  const allCalendarDays = [...emptyDays, ...days]
  const selectedTasks = selectedDate ? getTasksForDay(selectedDate) : []

  return (
    <AppLayout>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "24px",
          width: "100%",
        }}
      >
        {/* =======================  
             HEADER (CENTERED)
           ======================= */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          
        </div>

        {/* =======================  
             CENTERED GRID WRAPPER  
           ======================= */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth < 1024 ? "1fr" : "3fr 1.2fr",
              gap: 24,
              width: "100%",
              maxWidth: "100%",
            }}
          >
            {/* Calendar Card */}
            <Card style={{ width: "100%", maxWidth: "100%", padding: 24 }}>
              {/* top bar: month switch */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <button
                  onClick={prevMonth}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: 10,
                    background: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f8fafc'
                    e.currentTarget.style.borderColor = '#cbd5e1'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff'
                    e.currentTarget.style.borderColor = '#e2e8f0'
                  }}
                >
                  <ChevronLeft size={18} color="#475569" />
                </button>
                <h2 style={{ fontWeight: 800, color: '#0f172a', fontSize: 22, margin: 0, letterSpacing: '-0.02em' }}>{monthYear}</h2>
                <button
                  onClick={nextMonth}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: 10,
                    background: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f8fafc'
                    e.currentTarget.style.borderColor = '#cbd5e1'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff'
                    e.currentTarget.style.borderColor = '#e2e8f0'
                  }}
                >
                  <ChevronRight size={18} color="#475569" />
                </button>
              </div>

              {/* weekdays */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 12 }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} style={{ textAlign: 'center', fontWeight: 700, color: '#64748b', fontSize: 12, padding: '8px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* calendar days */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
                {allCalendarDays.map((day, idx) => {
                  const dayTasks = getTasksForDay(day)
                  const isSelected = selectedDate === day
                  const isToday = day &&
                    new Date().toDateString() ===
                    new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

                  return (
                    <div
                      key={idx}
                      onClick={() => day && setSelectedDate(day)}
                      onMouseEnter={() => day && setHoveredIdx(idx)}
                      onMouseLeave={() => day && setHoveredIdx(null)}
                      style={{
                        border: isSelected
                          ? '2px solid #3f5d2a'
                          : hoveredIdx === idx
                            ? '1px solid #3f5d2a'
                            : '1px solid #e2e8f0',
                        borderRadius: 12,
                        minHeight: 120,
                        height: 120,
                        background: !day
                          ? '#f8fafc'
                          : isToday
                            ? '#f0fdf4'
                            : '#fff',
                        padding: 10,
                        cursor: day ? 'pointer' : 'default',
                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                        overflow: 'hidden',
                        boxShadow: isSelected
                          ? '0 0 0 3px rgba(63, 93, 42, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                          : hoveredIdx === idx
                            ? '0 8px 16px -4px rgba(0, 0, 0, 0.06)'
                            : 'none',
                        transform: (isSelected || hoveredIdx === idx) ? 'translateY(-2px)' : 'none',
                      }}
                    >
                      {day && (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              fontWeight: 700,
                              fontSize: 13,
                              background: isToday ? '#3f5d2a' : 'transparent',
                              color: isToday ? '#fff' : '#475569',
                              transition: 'all 0.2s'
                            }}>
                              {day}
                            </span>
                            {dayTasks.length > 0 && (
                              <span style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: '#10b981'
                              }} />
                            )}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, overflowY: 'auto' }}>
                            {dayTasks.slice(0, 2).map((task, i) => {
                              const timeStr = formatTaskTime(task.dueDate)
                              const colors = {
                                completed: { bg: '#e6f4ea', text: '#137333', border: '#10b981' },
                                in_progress: { bg: '#fef7e0', text: '#b06000', border: '#f59e0b' },
                                pending: { bg: '#e8f0fe', text: '#1a73e8', border: '#3b82f6' }
                              }[task.status] || { bg: '#f1f3f4', text: '#3c4043', border: '#9aa0a6' };

                              return (
                                <div
                                  key={i}
                                  style={{
                                    background: colors.bg,
                                    color: colors.text,
                                    borderLeft: `3px solid ${colors.border}`,
                                    borderRadius: 6,
                                    padding: '3px 6px',
                                    fontSize: '10px',
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 3,
                                  }}
                                  title={task.title}
                                >
                                  {timeStr && <span style={{ opacity: 0.8, fontSize: '9px' }}>{timeStr}</span>}
                                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.title}</span>
                                </div>
                              )
                            })}
                            {dayTasks.length > 2 && (
                              <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, paddingLeft: 4 }}>
                                +{dayTasks.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Right side: selected day card */}
            {selectedDate && (
              <Card style={{ alignSelf: 'start', padding: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', letterSpacing: '-0.01em', borderBottom: '1px solid #f1f5f9', paddingBottom: 12 }}>
                  Tasks for {new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </h3>

                {selectedTasks.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px 16px', color: '#94a3b8', fontSize: 14 }}>
                    No tasks for this date
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {selectedTasks.map((task) => {
                      const timeStr = formatTaskTime(task.dueDate)
                      const colors = {
                        completed: { bg: '#e6f4ea', text: '#137333', border: '#10b981' },
                        in_progress: { bg: '#fef7e0', text: '#b06000', border: '#f59e0b' },
                        pending: { bg: '#e8f0fe', text: '#1a73e8', border: '#3b82f6' }
                      }[task.status] || { bg: '#f1f3f4', text: '#3c4043', border: '#9aa0a6' };

                      return (
                        <div
                          key={task.taskId}
                          style={{
                            border: '1px solid #e2e8f0',
                            borderLeft: `4px solid ${colors.border}`,
                            borderRadius: 12,
                            padding: 16,
                            background: '#fff',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-1px)'
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)'
                          }}
                        >
                          <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 6, fontSize: 14 }}>
                            {task.title}
                          </div>
                          {task.description && (
                            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8, lineHeight: 1.4 }}>
                              {task.description}
                            </div>
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                            {timeStr ? (
                              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, background: '#f1f5f9', padding: '3px 8px', borderRadius: 6 }}>
                                Time: {timeStr}
                              </div>
                            ) : <div />}
                            <div
                              style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                background: colors.bg,
                                color: colors.text,
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.03em'
                              }}
                            >
                              {task.status.replace('_', ' ')}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>

        {/* LEGEND (CENTERED) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
            marginTop: 32,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#3b82f6" }}></span>
            <span style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>Pending</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#f59e0b" }}></span>
            <span style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>In Progress</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#10b981" }}></span>
            <span style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>Completed</span>
          </div>
        </div>
      </div>
    </AppLayout>
  )

}