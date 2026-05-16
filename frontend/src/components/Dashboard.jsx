import { useEffect, useState } from 'react';
import API from '../api';
import { Trash2, PlusCircle, LayoutGrid, Calendar, AlertCircle, CheckCircle, Circle } from 'lucide-react';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', moduleCode: '', dueDate: '', priority: 'Medium', description: '' });
  const [loading, setLoading] = useState(true);
  
  // State for the calendar view context (defaults to current month/year)
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      // New tasks initialize as incomplete (completed: false)
      await API.post('/tasks', { ...formData, completed: false });
      setFormData({ title: '', moduleCode: '', dueDate: '', priority: 'Medium', description: '' });
      fetchTasks();
    } catch (err) { 
      alert("Error saving task."); 
    }
  };

  // NEW FEATURE: Toggle status directly with the backend API
  const handleToggleComplete = async (task) => {
    try {
      const updatedStatus = !task.completed;
      await API.put(`/tasks/${task._id}`, { completed: updatedStatus });
      
      // Optimistically update local UI state immediately
      setTasks(tasks.map(t => t._id === task._id ? { ...t, completed: updatedStatus } : t));
    } catch (err) {
      alert("Could not update task status.");
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Permanently delete this task?")) {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

  const getPriorityColors = (task) => {
    if (task.completed) {
      return { borderLeft: '5px solid #94A3B8', bg: '#F1F5F9', text: '#64748B', tagBorder: '1px solid #CBD5E1' };
    }
    switch (task.priority) {
      case 'High': return { borderLeft: '5px solid #EF4444', bg: '#FEF2F2', text: '#991B1B', tagBorder: '1px solid #FCA5A5' };
      case 'Medium': return { borderLeft: '5px solid #F59E0B', bg: '#FEF3C7', text: '#92400E', tagBorder: '1px solid #FCD34D' };
      default: return { borderLeft: '5px solid #10B981', bg: '#ECFDF5', text: '#065F46', tagBorder: '1px solid #6EE7B7' };
    }
  };

  // --- CALENDAR GENERATION LOGIC ---
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Helper arrays for calendar generation grid blocks
  const blanks = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarGrid = [...blanks, ...days];

  // Match local timezone dates with formatted strings to highlight deadlines
  const getTasksForDate = (dayNum) => {
    if (!dayNum) return [];
    const checkString = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    return tasks.filter(t => t.dueDate.startsWith(checkString));
  };

  return (
    <div style={{
      maxWidth: '1440px',
      width: '100%',
      margin: '0 auto',
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '24px',
      boxSizing: 'border-box'
    }}>
      
      {/* COLUMN 1: Log Task Control Panel */}
      <div style={{
        flex: '1 1 320px',
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.02)',
        height: 'fit-content',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PlusCircle size={18} style={{ color: '#2563EB' }} /> Log Module Task
        </h2>
        
        <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <input 
              type="text" 
              placeholder="Assignment Title" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '12px', fontSize: '14px', outline: 'none', backgroundColor: '#F8FAFC', boxSizing: 'border-box' }}
              required 
            />
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              placeholder="e.g. IT2105" 
              value={formData.moduleCode}
              onChange={(e) => setFormData({...formData, moduleCode: e.target.value})} 
              style={{ width: '50%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '12px', fontSize: '14px', outline: 'none', backgroundColor: '#F8FAFC', boxSizing: 'border-box' }}
              required 
            />
            <select 
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})} 
              style={{ width: '50%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '12px', fontSize: '14px', color: '#0F172A', outline: 'none', backgroundColor: '#F8FAFC', cursor: 'pointer', boxSizing: 'border-box' }}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <input 
            type="date" 
            value={formData.dueDate}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})} 
            style={{ width: '100%', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '12px', fontSize: '14px', outline: 'none', backgroundColor: '#F8FAFC', color: '#334155', fontWeight: '600', boxSizing: 'border-box' }}
            required 
          />
          
          <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', color: '#ffffff', fontWeight: '700', padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '14px', marginTop: '8px' }}>
            Publish to Grid
          </button>
        </form>
      </div>

      {/* COLUMN 2: NEW Visual Schedule Matrix Calendar */}
      <div style={{
        flex: '1 1 320px',
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.02)',
        height: 'fit-content',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} style={{ color: '#6366F1' }} /> Schedule Matrix
          </h2>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#4F46E5' }}>{monthNames[month]} {year}</span>
        </div>

        {/* Calendar Week Labels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '8px' }}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <span key={idx} style={{ fontSize: '11px', fontWeight: '800', color: '#94A3B8' }}>{day}</span>
          ))}
        </div>

        {/* Days Grid Rendering Engine */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
          {calendarGrid.map((day, index) => {
            const dateTasks = getTasksForDate(day);
            const hasDeadlines = dateTasks.length > 0;
            const allDone = hasDeadlines && dateTasks.every(t => t.completed);

            return (
              <div 
                key={index} 
                style={{
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: day ? '700' : '400',
                  borderRadius: '10px',
                  color: day ? (hasDeadlines ? '#ffffff' : '#334155') : 'transparent',
                  background: day ? (hasDeadlines ? (allDone ? '#10B981' : '#EF4444') : '#F8FAFC') : 'transparent',
                  boxShadow: hasDeadlines ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
                  position: 'relative',
                  cursor: hasDeadlines ? 'pointer' : 'default'
                }}
                title={hasDeadlines ? `${dateTasks.length} assignment(s) scheduled` : ''}
              >
                {day}
                {hasDeadlines && !allDone && (
                  <span style={{ position: 'absolute', bottom: '3px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#FEF3C7' }}></span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* COLUMN 3: Academic Pipeline Ledger Dashboard Feed */}
      <div style={{
        flex: '2 1 500px',
        backgroundColor: '#ffffff',
        padding: '28px',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.02)',
        minHeight: '450px',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LayoutGrid size={18} style={{ color: '#4F46E5' }} /> Academic Pipeline Ledger
          </h2>
          <span style={{ fontSize: '12px', fontWeight: '800', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '6px 14px', borderRadius: '99px', color: '#1E40AF' }}>
            {tasks.length} Total Modules
          </span>
        </div>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px', fontSize: '14px', fontWeight: '600', color: '#94A3B8' }}>Syncing matrix nodes...</div>
        ) : tasks.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '280px', border: '2px dashed #E2E8F0', borderRadius: '20px', color: '#94A3B8' }}>
            <AlertCircle size={32} style={{ marginBottom: '10px' }} />
            <p style={{ margin: '0', fontWeight: '800', color: '#334155' }}>Ledger completely clean</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tasks.map(task => {
              const theme = getPriorityColors(task);
              return (
                <div 
                  key={task._id} 
                  style={{
                    backgroundColor: theme.bg,
                    border: '1px solid #E2E8F0',
                    borderLeft: theme.borderLeft,
                    padding: '16px',
                    borderRadius: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    opacity: task.completed ? 0.75 : 1,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    {/* STATUS BUTTON INTERFACE TOGGLE */}
                    <button 
                      onClick={() => handleToggleComplete(task)}
                      style={{ background: 'none', border: 'none', padding: 0, marginTop: '4px', cursor: 'pointer', color: task.completed ? '#10B981' : '#64748B' }}
                    >
                      {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                    </button>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '800', backgroundColor: '#ffffff', border: '1px solid #CBD5E1', padding: '2px 6px', borderRadius: '4px', color: '#334155' }}>
                          {task.moduleCode}
                        </span>
                        {!task.completed && (
                          <span style={{ fontSize: '9px', fontWeight: '800', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', backgroundColor: theme.bg, color: theme.text, border: theme.tagBorder }}>
                            {task.priority}
                          </span>
                        )}
                      </div>
                      
                      <h3 style={{ margin: '0', fontSize: '15px', fontWeight: '700', color: theme.text, textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.title}
                      </h3>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '600', color: '#94A3B8' }}>
                        <Calendar size={12} />
                        <span>Due: {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDeleteTask(task._id)} 
                    style={{ background: 'none', border: 'none', padding: '8px', color: '#CBD5E1', cursor: 'pointer' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#EF4444'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#CBD5E1'}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}