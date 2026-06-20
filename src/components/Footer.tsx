// components/Footer.tsx
interface FooterProps {
  onNavigate: (page: string) => void;
}

const footerLinks = [
  { id: 'idea', label: 'ایده' },
  { id: 'business', label: 'کسب‌وکار' },
  { id: 'demo-personal', label: 'دمو' },
  { id: 'roadmap', label: 'نقشه راه' },
  { id: 'docs', label: 'مستندات' },
];

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer style={{ borderTop: '1px solid #21262d', padding: '48px 24px', background: '#0d1117' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #4c4d4e, #14101a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <img src="/lifeflowlogo.png" width="25" height="25" alt="LifeFlow" />
            </div>
            <span style={{ fontWeight: 800, color: '#f0f6fc', fontSize: '17px' }}>LifeFlow</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {footerLinks.map(link => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', fontSize: '13px', fontFamily: 'Vazirmatn, sans-serif', transition: 'color 0.2s' }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = '#58a6ff'; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = '#8b949e'; }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ height: '1px', background: '#21262d', marginBottom: '24px' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: '#8b949e' }}>
            © ۱۴۰۵ LifeFlow · دستیار هوشمند تحلیل بهره‌وری
          </p>
          <p style={{ fontSize: '12px', color: '#8b949e' }}>
            محمدیاسین بریدلقمانی طوسی · ۴۰۲۲۲۳۷۳
          </p>
        </div>
      </div>
    </footer>
  );
}