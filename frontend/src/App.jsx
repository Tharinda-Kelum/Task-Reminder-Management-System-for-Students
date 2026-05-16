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
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 50%, #E2E8F0 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          {/* Professional Navigation Bar */}
          <nav style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderBottom: '1px solid #E2E8F0',
            padding: '16px 32px',
            display: 'flex',
            justifyContent: 'between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
                padding: '10px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
              }}>
                <GraduationCap className="text-white" style={{ color: '#ffffff' }} size={20} />
              </div>
              <div>
                <span style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.025em' }}>
                  EduTask<span style={{ color: '#2563EB' }}>.Pro</span>
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#64748B',
                backgroundColor: 'transparent',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#EF4444';
                e.currentTarget.style.backgroundColor = '#FEF2F2';
                e.currentTarget.style.borderColor = '#FCA5A5';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#64748B';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              <LogOut size={15} />
              Logout
            </button>
          </nav>

          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Dashboard />
          </main>
        </>
      )}
    </div>
  );
}

export default App;