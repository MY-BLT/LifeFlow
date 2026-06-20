import { useState } from 'react';
import { storage } from '../utils/storage';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const demoAccounts = [
    { email: 'student@lifeflow.ir', password: 'demo1234', name: 'محمدیاسین بریدلقمانی', type: 'personal' as const, label: 'دمو شخصی', icon: '👤', color: '#58a6ff' },
    { email: 'organization@lifeflow.ir', password: 'demo1234', name: 'سازمان LifeFlow', type: 'organization' as const, label: 'دمو سازمانی', icon: '🏢', color: '#3fb950' },
  ];

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 800));

    const account = demoAccounts.find(a => a.email === email && a.password === password);
    if (account) {
      storage.setUser({ email: account.email, name: account.name, type: account.type });
      onNavigate(account.type === 'personal' ? 'demo-personal' : 'demo-org');
    } else {
      setError('ایمیل یا رمز عبور اشتباه است. از اکانت‌های دمو استفاده کنید.');
    }
    setLoading(false);
  };

  const handleDemoLogin = (account: typeof demoAccounts[0]) => {
    setEmail(account.email);
    setPassword(account.password);
    storage.setUser({ email: account.email, name: account.name, type: account.type });
    onNavigate(account.type === 'personal' ? 'demo-personal' : 'demo-org');
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0d1117',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px',
      position: 'relative',
    }}>
      {/* Background */}
      <div style={{
        position: 'fixed', inset: 0,
        background: `
          radial-gradient(ellipse at 30% 30%, rgba(88, 166, 255, 0.06) 0%, transparent 60%),
          radial-gradient(ellipse at 70% 70%, rgba(188, 140, 255, 0.06) 0%, transparent 60%)
        `,
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #4c4d4e, #14101a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 0 30px rgba(88,166,255,0.3)',
          }}>
            <img src="/lifeflowlogo.png" width="25" height="25" alt="LifeFlow" />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#f0f6fc', marginBottom: '6px' }}>ورود به LifeFlow</h1>
          <p style={{ fontSize: '14px', color: '#8b949e' }}>دستیار هوشمند بهره‌وری شخصی و سازمانی</p>
        </div>

        {/* Card */}
        <div style={{
          background: '#161b22', border: '1px solid #30363d',
          borderRadius: '16px', padding: '32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}>
          {/* Demo buttons */}
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '12px', color: '#8b949e', marginBottom: '12px', textAlign: 'center' }}>
              ورود سریع با حساب دمو
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {demoAccounts.map(account => (
                <button
                  key={account.email}
                  onClick={() => handleDemoLogin(account)}
                  style={{
                    padding: '12px', borderRadius: '10px',
                    background: `${account.color}10`,
                    border: `1px solid ${account.color}30`,
                    cursor: 'pointer', textAlign: 'center',
                    transition: 'all 0.2s',
                    fontFamily: 'Vazirmatn, sans-serif',
                  }}
                  onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = `${account.color}20`; }}
                  onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = `${account.color}10`; }}
                >
                  <div style={{ fontSize: '22px', marginBottom: '4px' }}>{account.icon}</div>
                  <div style={{ fontSize: '12px', color: account.color, fontWeight: 600 }}>{account.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: '#30363d' }} />
            <span style={{ fontSize: '12px', color: '#8b949e' }}>یا</span>
            <div style={{ flex: 1, height: '1px', background: '#30363d' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#c9d1d9', marginBottom: '6px' }}>
                آدرس ایمیل
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="student@lifeflow.ir"
                  className="input-field"
                  style={{ paddingRight: '40px' }}
                  required
                />
                <svg style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#c9d1d9', marginBottom: '6px' }}>
                رمز عبور
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field"
                  style={{ paddingRight: '40px', paddingLeft: '40px' }}
                  required
                />
                <svg style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#8b949e', padding: 0,
                  }}
                >
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  style={{ accentColor: '#58a6ff' }}
                />
                <span style={{ fontSize: '13px', color: '#8b949e' }}>مرا به خاطر بسپار</span>
              </label>
              <button type="button" style={{ background: 'none', border: 'none', color: '#58a6ff', fontSize: '13px', cursor: 'pointer', fontFamily: 'Vazirmatn, sans-serif' }}>
                فراموشی رمز
              </button>
            </div>

            {error && (
              <div style={{
                padding: '12px 16px', borderRadius: '8px',
                background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)',
                color: '#f85149', fontSize: '13px', marginBottom: '16px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: '100%', padding: '12px', fontSize: '15px', borderRadius: '10px' }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: '16px', height: '16px' }} />
                  در حال ورود...
                </>
              ) : 'ورود به سیستم'}
            </button>
          </form>
        </div>

        {/* Credentials hint */}
        <div style={{
          marginTop: '20px', padding: '16px',
          background: 'rgba(88,166,255,0.05)', border: '1px solid rgba(88,166,255,0.2)',
          borderRadius: '10px',
        }}>
          <p style={{ fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>اطلاعات ورود دمو:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <code style={{ fontSize: '12px', color: '#58a6ff' }}>student@lifeflow.ir / demo1234</code>
            <code style={{ fontSize: '12px', color: '#3fb950' }}>organization@lifeflow.ir / demo1234</code>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#8b949e', marginTop: '20px' }}>
          برای بازگشت:{' '}
          <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: '#58a6ff', cursor: 'pointer', fontFamily: 'Vazirmatn, sans-serif', fontSize: '13px' }}>
            صفحه اصلی
          </button>
        </p>
      </div>
    </div>
  );
}
