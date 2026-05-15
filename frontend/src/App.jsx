import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="min-h-screen bg-gray-50">
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <nav className="bg-blue-800 text-white p-4 flex justify-between items-center shadow-md">
            <span className="font-bold">Task Manager v1.0</span>
            <button onClick={() => { localStorage.removeItem('token'); setToken(null); }} className="bg-red-500 px-4 py-1 rounded text-sm font-semibold">Logout</button>
          </nav>
          <Dashboard />
        </>
      )}
    </div>
  );
}
export default App;