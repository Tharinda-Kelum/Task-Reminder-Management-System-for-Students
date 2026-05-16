import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { GraduationCap, LogOut } from 'lucide-react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          {/* Production-Grade App Header */}
          <nav className="bg-white/80 border-b border-slate-200/80 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-md shadow-blue-500/20">
                <GraduationCap className="text-white" size={22} />
              </div>
              <div>
                <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-900 tracking-tight">
                  EduTask<span className="text-blue-600">.Pro</span>
                </span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-150 border border-transparent hover:border-rose-100"
            >
              <LogOut size={16} />
              Logout
            </button>
          </nav>
          
          <main className="flex-1">
            <Dashboard />
          </main>
        </>
      )}
    </div>
  );
}

export default App;