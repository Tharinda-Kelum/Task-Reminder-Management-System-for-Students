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
        alert("Registration complete! Please log in.");
        setIsRegistering(false);
      } else {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed.");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Top Icon Badge */}
        <div style={{
          backgroundColor: '#F59E0B',
          color: '#1E293B',
          padding: '12px',
          borderRadius: '16px',
          marginBottom: '16px',
          boxShadow: '0 10px 15px -3px rgba(245, 158, 11, 0.2)'
        }}>
          <GraduationCap size={28} />
        </div>
        
        <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.025em', textAlign: 'center', margin: '0' }}>
          {isRegistering ? "Register Student Index" : "Academic Ecosystem Access"}
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '6px', marginBottom: '32px' }}>
          Task & Deadline Node
        </p>

        {/* Input Interface Wrapper */}
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {isRegistering && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '10px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', tracking: '0.05em', paddingLeft: '4px' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User style={{ position: 'absolute', left: '16px', top: '15px', color: '#64748B' }} size={16} />
                <input 
                  type="text" name="username" placeholder="Tharinda Kelum" onChange={handleInputChange} required 
                  style={{ width: '100%', backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(100, 116, 139, 0.5)', borderRadius: '12px', padding: '14px 16px 14px 44px', fontSize: '14px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', tracking: '0.05em', paddingLeft: '4px' }}>University Email</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '16px', top: '15px', color: '#64748B' }} size={16} />
              <input 
                type="email" name="email" placeholder="student@university.lk" onChange={handleInputChange} required 
                style={{ width: '100%', backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(100, 116, 139, 0.5)', borderRadius: '12px', padding: '14px 16px 14px 44px', fontSize: '14px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', tracking: '0.05em', paddingLeft: '4px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '16px', top: '15px', color: '#64748B' }} size={16} />
              <input 
                type="password" name="password" placeholder="••••••••" onChange={handleInputChange} required 
                style={{ width: '100%', backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(100, 116, 139, 0.5)', borderRadius: '12px', padding: '14px 16px 14px 44px', fontSize: '14px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            style={{ width: '100%', background: 'linear-gradient(90deg, #2563EB 0%, #4F46E5 100%)', color: '#ffffff', fontWeight: '700', border: 'none', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)', marginTop: '16px', fontSize: '14px' }}
          >
            <span>{isRegistering ? "Complete Setup" : "Secure Authentication"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <button 
          type="button" onClick={() => setIsRegistering(!isRegistering)} 
          style={{ background: 'none', border: 'none', marginTop: '24px', fontSize: '12px', color: '#CBD5E1', fontWeight: '500', cursor: 'pointer', textDecoration: 'none' }}
          onMouseOver={(e) => e.target.style.color = '#ffffff'}
          onMouseOut={(e) => e.target.style.color = '#CBD5E1'}
        >
          {isRegistering ? "Already have an account? Login here" : "Register a new profile index ⊕"}
        </button>

      </div>
    </div>
  );
}