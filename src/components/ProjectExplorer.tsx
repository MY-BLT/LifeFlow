interface ProjectExplorerProps {
  onNavigate: (page: string) => void;
}

const pageNavItems = [
  { id: 'idea', label: 'منشأ ایده', icon: '💡', color: '#58a6ff' },
  { id: 'maturity', label: 'بلوغ ایده', icon: '🌱', color: '#3fb950' },
  { id: 'value', label: 'خلق ارزش', icon: '💎', color: '#bc8cff' },
  { id: 'business', label: 'مدل کسب‌وکار', icon: '📋', color: '#58a6ff' },
  { id: 'market', label: 'تحلیل بازار', icon: '📊', color: '#3fb950' },
  { id: 'competitor', label: 'رقبا', icon: '⚔️', color: '#f85149' },
  { id: 'marketing', label: 'بازاریابی', icon: '📣', color: '#d29922' },
  { id: 'revenue', label: 'مدل درآمد', icon: '💰', color: '#3fb950' },
  { id: 'intermediation', label: 'واسطه‌گری', icon: '🔗', color: '#bc8cff' },
  { id: 'demo-personal', label: 'دمو شخصی', icon: '👤', color: '#58a6ff' },
  { id: 'demo-org', label: 'دمو سازمانی', icon: '🏢', color: '#3fb950' },
  { id: 'roadmap', label: 'نقشه راه', icon: '🗺️', color: '#bc8cff' },
];

export default function ProjectExplorer({ onNavigate }: ProjectExplorerProps) {
  return (
    <section style={{
      padding: '64px 24px 48px',
      borderTop: '1px solid #21262d',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{
            fontSize: '11px',
            color: '#58a6ff',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '4px',
          }}>
            کاوش در پروژه
          </span>
          <h2 style={{
            fontSize: 'clamp(18px, 2vw, 24px)',
            fontWeight: 700,
            color: '#f0f6fc',
            margin: 0,
          }}>
            همه بخش‌های LifeFlow
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: '8px',
        }}>
          {pageNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 8px',
                borderRadius: '10px',
                background: 'transparent',
                border: '1px solid #30363d',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                color: '#8b949e',
                fontFamily: 'Vazirmatn, sans-serif',
                gap: '4px',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = item.color + '80';
                el.style.background = item.color + '10';
                el.style.color = '#f0f6fc';
                el.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = '#30363d';
                el.style.background = 'transparent';
                el.style.color = '#8b949e';
                el.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '18px', lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontSize: '10px', fontWeight: 500, lineHeight: 1.2 }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}