import { useEffect, useState } from 'react';
import API from '../api';
import { Trash2, PlusCircle, LayoutGrid, Calendar, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', moduleCode: '', dueDate: '', priority: 'Medium', description: '' });
  const [loading, setLoading] = useState(true);

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
      await API.post('/tasks', formData);
      setFormData({ title: '', moduleCode: '', dueDate: '', priority: 'Medium', description: '' });
      fetchTasks();
    } catch (err) { alert("Error connecting to dataset arrays."); }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Purge tracker entity?")) {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

  // Maps priorities to distinct semantic colors
  const getPriorityTheme = (prio) => {
    switch (prio) {
      case 'High': return { border: 'border-l-rose-500', badge: 'bg-rose-50 text-rose-700 border-rose-200/60' };
      case 'Medium': return { border: 'border-l-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200/60' };
      default: return { border: 'border-l-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/60' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
      
      {/* Sidebar Form Element Container */}
      <div className="lg:w-1/3 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-100/50 h-fit">
        <h2 className="text-base font-black text-slate-800 mb-5 flex items-center gap-2">
          <PlusCircle size={18} className="text-blue-600" /> Log Module Task
        </h2>
        <form onSubmit={handleAddTask} className="space-y-4">
          <div className="flex flex-col gap-1">
            <input type="text" name="title" value={formData.title} placeholder="Assignment Title" onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="text" name="moduleCode" value={formData.moduleCode} placeholder="e.g. IT2105" onChange={(e) => setFormData({...formData, moduleCode: e.target.value})} required />
            <select name="priority" value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} className="w-full font-medium">
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
          </div>
          <input type="date" name="dueDate" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full font-medium text-slate-600" required />
          
          <button type="submit" className="w-full bg-slate-900 text-white font-extrabold py-3 rounded-xl hover:bg-blue-600 shadow-md shadow-slate-900/10 hover:shadow-blue-600/10 transition-all duration-200">
            Publish to Grid
          </button>
        </form>
      </div>

      {/* Main Content Dashboard Feed */}
      <div className="lg:w-2/3 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-100/50 min-h-[450px]">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-100">
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <LayoutGrid size={18} className="text-indigo-600" /> Academic Pipeline Ledger
          </h2>
          <span className="text-xs font-bold bg-slate-100 border border-slate-200 px-3 py-1 rounded-md text-slate-600">{tasks.length} Tracks</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48 text-sm font-semibold text-slate-400 animate-pulse">Syncing nodes...</div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 border border-dashed border-slate-200 rounded-2xl p-6 text-slate-400">
            <AlertCircle size={32} className="text-slate-300 mb-2" />
            <p className="font-bold text-slate-700">Ledger clean!</p>
            <p className="text-xs mt-0.5">No immediate scholarly tasks registered to tracking matrices.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => {
              const theme = getPriorityTheme(task.priority);
              return (
                <div key={task._id} className={`group bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-blue-100 p-4 rounded-xl flex justify-between items-center transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-blue-500/[0.02] border-l-4 ${theme.border}`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black tracking-wider uppercase bg-white border px-1.5 py-0.5 rounded text-slate-600 shadow-sm">{task.moduleCode}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${theme.badge}`}>{task.priority}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">{task.title}</h3>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                      <Calendar size={12} />
                      <span>Due: {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteTask(task._id)} className="text-slate-300 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-all" title="Delete Task">
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