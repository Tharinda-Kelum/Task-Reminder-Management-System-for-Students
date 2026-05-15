import { useState } from 'react';
import API from '../api';

export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
    } catch (err) { alert("Invalid login credentials"); }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-xl w-96 border-t-4 border-blue-600">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Student Portal</h2>
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" onChange={e => setPassword(e.target.value)} required />
        <button className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 transition">Login</button>
      </form>
    </div>
  );
}