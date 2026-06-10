import { useState } from 'react';
import { storage } from '../utils/storage';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  {
    label: 'محصول',
    children: [
      { id: 'idea', label: '💡 منشأ ایده' },
      { id: 'maturity', label: '🌱 بلوغ ایده' },
      { id: 'value', label: '💎 خلق ارزش' },
    ],
  },
  {
    label: 'کسب‌وکار',
    children: [
      { id: 'business', label: '📋 مدل کسب‌وکار' },
      { id: 'market', label: '📊 تحلیل بازار' },
      { id: 'competitor', label: '⚔️ رقبا' },
      { id: 'marketing', label: '📣 بازاریابی' },
      { id: 'revenue', label: '💰 مدل درآمد' },
      { id: 'intermediation', label: '🔗 واسطه‌گری' },
    ],
  },
  { id: 'demo-personal', label: 'دمو شخصی' },
  { id: 'demo-org', label: 'دمو سازمانی' },
  { id: 'roadmap', label: 'نقشه راه' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const user = storage.getUser();

  const handleLogout = () => {
    storage.clearUser();
    onNavigate('home');
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(13, 17, 23, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid #30363d',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: '60px', gap: '8px' }}>
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px 0 0', flexShrink: 0 }}
        >
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #58a6ff, #bc8cff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(88,166,255,0.4)',
            flexShrink: 0,
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: '17px', color: '#f0f6fc', letterSpacing: '-0.3px', fontFamily: 'Vazirmatn, sans-serif' }}>
            LifeFlow
          </span>
        </button>

        {/* Separator */}
        <div style={{ width: '1px', height: '20px', background: '#30363d', margin: '0 8px' }} className="hide-mobile" />

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1 }} className="hide-mobile">
          {navLinks.map((link) => (
            'children' in link ? (
              <div key={link.label} style={{ position: 'relative' }}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  onBlur={() => setTimeout(() => setOpenDropdown(null), 150)}
                  style={{
                    padding: '6px 12px', borderRadius: '6px',
                    background: 'transparent',
                    color: '#8b949e',
                    border: 'none', cursor: 'pointer',
                    fontSize: '13px', fontWeight: 500,
                    fontFamily: 'Vazirmatn, sans-serif',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    transition: 'all 0.2s',
                  }}
                >
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: openDropdown === link.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {openDropdown === link.label && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: '4px',
                    background: '#161b22', border: '1px solid #30363d', borderRadius: '12px',
                    padding: '8px', minWidth: '180px', zIndex: 100,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                  }}>
                    {(link.children || []).map(child => (
                      <button
                        key={child.id}
                        onClick={() => { onNavigate(child.id); setOpenDropdown(null); }}
                        style={{
                          display: 'block', width: '100%', textAlign: 'right',
                          padding: '8px 12px', borderRadius: '8px', border: 'none',
                          background: currentPage === child.id ? 'rgba(88,166,255,0.1)' : 'transparent',
                          color: currentPage === child.id ? '#58a6ff' : '#c9d1d9',
                          cursor: 'pointer', fontSize: '13px',
                          fontFamily: 'Vazirmatn, sans-serif',
                          transition: 'all 0.15s',
                        }}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id!)}
                style={{
                  padding: '6px 12px', borderRadius: '6px',
                  background: currentPage === link.id ? 'rgba(88,166,255,0.1)' : 'transparent',
                  color: currentPage === link.id ? '#58a6ff' : '#8b949e',
                  border: 'none', cursor: 'pointer',
                  fontSize: '13px', fontWeight: 500,
                  fontFamily: 'Vazirmatn, sans-serif',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </button>
            )
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: 'auto' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.2)',
                borderRadius: '8px', padding: '5px 10px', cursor: 'pointer',
              }}
                onClick={() => onNavigate(user.type === 'personal' ? 'demo-personal' : 'demo-org')}
              >
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #58a6ff, #bc8cff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', color: '#0d1117', fontWeight: 700,
                }}>
                  {user.name.charAt(0)}
                </div>
                <span style={{ fontSize: '12px', color: '#c9d1d9', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name.split(' ')[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  padding: '5px 10px', borderRadius: '6px', border: '1px solid #30363d',
                  background: 'transparent', color: '#8b949e', cursor: 'pointer',
                  fontSize: '12px', fontFamily: 'Vazirmatn, sans-serif', transition: 'all 0.2s',
                }}
              >
                خروج
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              style={{
                padding: '7px 16px', borderRadius: '8px', border: 'none',
                background: '#58a6ff', color: '#0d1117', cursor: 'pointer',
                fontSize: '13px', fontWeight: 700, fontFamily: 'Vazirmatn, sans-serif',
                transition: 'all 0.2s',
              }}
            >
              ورود به سیستم
            </button>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8b949e', padding: '4px' }}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: '#161b22', borderTop: '1px solid #30363d', padding: '12px 16px',
          display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '80vh', overflowY: 'auto',
        }}>
          {[
            { id: 'home', label: '🏠 خانه' },
            { id: 'idea', label: '💡 منشأ ایده' },
            { id: 'maturity', label: '🌱 بلوغ ایده' },
            { id: 'value', label: '💎 خلق ارزش' },
            { id: 'business', label: '📋 مدل کسب‌وکار' },
            { id: 'market', label: '📊 تحلیل بازار' },
            { id: 'competitor', label: '⚔️ رقبا' },
            { id: 'marketing', label: '📣 بازاریابی' },
            { id: 'revenue', label: '💰 مدل درآمد' },
            { id: 'demo-personal', label: '👤 دمو شخصی' },
            { id: 'demo-org', label: '🏢 دمو سازمانی' },
            { id: 'roadmap', label: '🗺️ نقشه راه' },
          ].map(link => (
            <button
              key={link.id}
              onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
              style={{
                width: '100%', textAlign: 'right', padding: '10px 16px', borderRadius: '8px',
                background: currentPage === link.id ? 'rgba(88,166,255,0.1)' : 'transparent',
                color: currentPage === link.id ? '#58a6ff' : '#c9d1d9',
                border: 'none', cursor: 'pointer', fontSize: '14px',
                fontFamily: 'Vazirmatn, sans-serif', transition: 'all 0.15s',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
