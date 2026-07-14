// import React from 'react'
// import Card from './Card'
// import TaskItem from './TaskItem'
// import { Clipboard } from 'lucide-react'

// export default function TasksCard({ tasks = [], loading = false }) {
//   return (
//     <Card 
//       title="My Tasks" 
//       right={
//         <span style={{ 
//           background: '#f1f5f9', 
//           color: '#475569', 
//           padding: '4px 12px', 
//           borderRadius: 12, 
//           fontSize: 14, 
//           fontWeight: 600 
//         }}>
//           {tasks.length}
//         </span>
//       }
//     >
//       {loading ? (
//         <div style={{ textAlign: 'center', padding: '48px 24px', color: '#64748b' }}>
//           Loading tasks...
//         </div>
//       ) : tasks.length === 0 ? (
//         <div style={{ textAlign: 'center', padding: '48px 24px', color: '#64748b' }}>
//           <Clipboard size={48} style={{ margin: '0 auto 16px', opacity: 0.3, color: '#f97316' }} />
//           <p style={{ margin: 0, fontSize: 14 }}>No tasks yet. Create your first task!</p>
//         </div>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//           {tasks.map(t => (
//             <TaskItem
//               key={t.taskId}
//               title={t.title}
//               description={t.description}
//               dueDate={t.dueDate}
//               status={t.status}
//               categoryName={t.categoryName}
//               taskId={t.taskId}
//             />
//           ))}
//         </div>
//       )}
//     </Card>
//   )
// }


import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './Card'
import TaskItem from './TaskItem'
import { Clipboard } from 'lucide-react'
import styles from './TasksCard.module.css'

export default function TasksCard({ tasks = [], loading = false, onStatusChange }) {
  return (
    <Card
      title="My Tasks"
      right={<span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 12px', borderRadius: 12, fontSize: 14, fontWeight: 600 }}>{tasks.length}</span>}
    >
      {loading ? (
        <div className={styles.empty}>
          <div className="loading-skeleton" style={{ width: '100%', height: 84, borderRadius: 16, marginBottom: 12 }} />
          <div className="loading-skeleton" style={{ width: '70%', height: 16, borderRadius: 999, margin: '0 auto 8px' }} />
          <div className="loading-skeleton" style={{ width: '45%', height: 16, borderRadius: 999, margin: '0 auto' }} />
        </div>
      ) : tasks.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.iconWrap}><Clipboard size={28} /></div>
          <p style={{ margin: 0, fontSize: 14 }}>No tasks yet. Create your first task!</p>
        </div>
      ) : (
        <div className={styles.list}>
          <AnimatePresence initial={false}>
            {tasks.map((t) => (
              <TaskItem
                key={String(t.taskId)}
                title={t.title}
                description={t.description}
                dueDate={t.dueDate}
                status={t.status}
                categoryName={t.categoryName}
                taskId={t.taskId}
                onStatusChange={onStatusChange}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </Card>
  )
}
