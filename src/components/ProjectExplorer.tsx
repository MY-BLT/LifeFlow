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
    <section style={{ padding: '80px 24px', borderTop: '1px solid #21262d' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '12px', letterSpacing: '-0.5px' }}>
          کاوش در پروژه
        </h2>
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#8b949e', marginBottom: '40px' }}>
          تمام بخش‌های تجاری و فنی LifeFlow را بررسی کنید
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {pageNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                padding: '18px 14px', borderRadius: '12px',
                background: '#161b22', border: '1px solid #30363d',
                cursor: 'pointer', textAlign: 'center',
                transition: 'all 0.2s', color: '#c9d1d9',
                fontFamily: 'Vazirmatn, sans-serif',
              }}
              onMouseOver={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = item.color + '60';
                el.style.background = item.color + '08';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = '#30363d';
                el.style.background = '#161b22';
                el.style.transform = 'none';
              }}
            >
              <div style={{ fontSize: '26px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontSize: '12px', fontWeight: 600 }}>{item.label}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}