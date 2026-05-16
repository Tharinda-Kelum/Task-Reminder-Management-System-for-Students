import { useState } from 'react';
import API from '../api';
import { GraduationCap, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function Login({ setToken }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/auth/register' : '/auth/login';
    try {
      const { data } = await API.post(endpoint, formData);
      if (isRegistering) {
        alert("Account deployed successfully! Redirecting to Portal Access...");
        setIsRegistering(false);
      } else {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Authentication aborted. Check server logs.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-[#1E293B] to-[#0F172A]">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-black/40 overflow-hidden border border-slate-100 transition-all duration-300">
        
        {/* Top Branding Section */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 p-8 text-center text-white">
          <div className="inline-flex p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-4 border border-white/10 shadow-inner">
            <GraduationCap size={30} />
          </div>
          <h2 className="text-2xl font-black tracking-tight">{isRegistering ? "Register Student Account" : "Academic Ecosystem Access"}</h2>
          <p className="text-blue-100/70 text-xs font-semibold uppercase tracking-wider mt-1.5">Task & Deadline Node</p>
        </div>

        {/* Input Interface Area */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {isRegistering && (
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                <input type="text" name="username" placeholder="Tharinda Kelum" onChange={handleInputChange} className="w-full pl-11" required />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide ml-1">University Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input type="email" name="email" placeholder="student@university.lk" onChange={handleInputChange} className="w-full pl-11" required />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input type="password" name="password" placeholder="••••••••" onChange={handleInputChange} className="w-full pl-11" required />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.99] mt-6">
            <span>{isRegistering ? "Generate Identity" : "Secure Authentication"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Dynamic Route Handshake Container */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="text-sm text-blue-600 hover:text-indigo-600 font-bold transition-colors">
            {isRegistering ? "Already managed? Sign In" : "Register a new profile index"}
          </button>
        </div>
      </div>
    </div>
  );
}