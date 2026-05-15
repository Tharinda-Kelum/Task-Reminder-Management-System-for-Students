import { useEffect, useState } from 'react';
import API from '../api';
import { Trash2, PlusCircle } from 'lucide-react';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const { data } = await API.get('/tasks');
    setTasks(data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    await API.post('/tasks', { title, moduleCode: 'GEN101', dueDate: new Date() });
    setTitle('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-blue-900">My Study Schedule</h1>
      <form onSubmit={addTask} className="flex gap-2 mb-8">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter new task..." className="flex-1 p-3 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
        <button className="bg-green-600 text-white px-6 rounded-lg flex items-center gap-2 hover:bg-green-700 font-bold"><PlusCircle size={20}/> Add</button>
      </form>
      <div className="space-y-4">
        {tasks.map(t => (
          <div key={t._id} className="flex justify-between items-center p-4 bg-white rounded shadow border-l-4 border-blue-500 hover:shadow-md transition">
            <span className="font-medium text-gray-700">{t.title}</span>
            <button onClick={() => deleteTask(t._id)} className="text-red-500 hover:text-red-700"><Trash2/></button>
          </div>
        ))}
      </div>
    </div>
  );
}