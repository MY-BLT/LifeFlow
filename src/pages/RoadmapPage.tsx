import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface Props { onNavigate: (page: string) => void; }

const phases = [
  {
    phase: 'فاز ۰',
    title: 'MVP فعلی',
    date: 'خرداد ۱۴۰۵',
    status: 'completed',
    color: '#3fb950',
    icon: '✅',
    items: [
      'داشبورد شخصی کامل',
      'ثبت و مدیریت فعالیت‌ها',
      'بینش‌های AI پایه',
      'داشبورد سازمانی',
      'خروجی JSON و CSV',
      'PWA و آفلاین',
      'امنیت LocalStorage',
    ],
  },
  {
    phase: 'فاز ۱',
    title: 'رشد اولیه',
    date: 'شهریور ۱۴۰۵',
    status: 'upcoming',
    color: '#58a6ff',
    icon: '🚀',
    items: [
      'اپلیکیشن موبایل (iOS/Android)',
      'یکپارچه‌سازی Google Calendar',
      'اعلان‌های هوشمند',
      'سیستم رفرال کاربران',
      'آنبوردینگ تعاملی',
      'بهبود الگوریتم AI',
    ],
  },
  {
    phase: 'فاز ۲',
    title: 'توسعه سازمانی',
    date: 'آذر ۱۴۰۵',
    status: 'planned',
    color: '#bc8cff',
    icon: '🏢',
    items: [
      'HR API یکپارچه‌سازی',
      'گزارش‌های پیشرفته مدیریتی',
      'SSO و احراز هویت سازمانی',
      'تنظیمات سفارشی Enterprise',
      'پشتیبانی چندزبانه',
      'داشبورد مدیر ارشد',
    ],
  },
  {
    phase: 'فاز ۳',
    title: 'هوش مصنوعی پیشرفته',
    date: 'خرداد ۱۴۰۶',
    status: 'future',
    color: '#d29922',
    icon: '🧠',
    items: [
      'پیش‌بینی بهره‌وری آینده',
      'تشخیص خودکار الگوهای زمانی',
      'مشاور AI تعاملی (چت)',
      'توصیه شغلی شخصی‌سازی',
      'تحلیل احساسات از متن',
      'یادگیری تطبیقی AI',
    ],
  },
];

const features = [
  { cat: 'هوش مصنوعی', items: ['تشخیص الگوی رفتاری', 'پیش‌بینی فرسودگی ۲ هفته قبل', 'بهینه‌سازی برنامه روزانه AI', 'مشاور چت GPT-like', 'تحلیل صدا و احساسات'] },
  { cat: 'یکپارچه‌سازی', items: ['Google Workspace', 'Microsoft 365', 'Slack و Teams', 'Jira و Linear', 'Trello و Asana'] },
  { cat: 'سخت‌افزار', items: ['پوشیدنی‌های هوشمند', 'اتصال ساعت‌های هوشمند', 'ردیابی خواب خودکار', 'سنجش استرس بیومتریک'] },
];

export default function RoadmapPage({ onNavigate: _ }: Props) {
  function onNavigate(_page: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-purple" style={{ marginBottom: '16px', display: 'inline-flex' }}>نقشه راه</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            آینده LifeFlow
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>
            مسیر توسعه شفاف از MVP تا رهبری بازار منطقه
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', marginBottom: '60px' }}>
          {phases.map((phase, i) => (
            <div
              key={i}
              style={{
                display: 'flex', gap: '24px', marginBottom: '32px',
                animation: `fadeIn 0.5s ease ${i * 0.15}s both`,
              }}
            >
              {/* Timeline indicator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '48px', flexShrink: 0 }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: phase.status === 'completed' ? phase.color : `${phase.color}15`,
                  border: `2px solid ${phase.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px',
                  boxShadow: phase.status === 'completed' ? `0 0 15px ${phase.color}60` : 'none',
                }}>
                  {phase.icon}
                </div>
                {i < phases.length - 1 && (
                  <div style={{
                    flex: 1, width: '2px', marginTop: '8px',
                    background: `linear-gradient(to bottom, ${phase.color}, ${phases[i+1].color}40)`,
                    minHeight: '40px',
                  }} />
                )}
              </div>

              {/* Content */}
              <div style={{
                flex: 1, background: '#161b22',
                border: `1px solid ${phase.status === 'completed' ? phase.color + '40' : '#30363d'}`,
                borderRadius: '16px', padding: '24px',
                boxShadow: phase.status === 'completed' ? `0 0 20px ${phase.color}15` : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '6px',
                    background: `${phase.color}15`, color: phase.color, border: `1px solid ${phase.color}30`,
                  }}>
                    {phase.phase}
                  </span>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f0f6fc' }}>{phase.title}</h3>
                  <span style={{ marginRight: 'auto', fontSize: '13px', color: '#8b949e' }}>📅 {phase.date}</span>
                  <span style={{
                    fontSize: '11px', padding: '3px 10px', borderRadius: '6px', fontWeight: 600,
                    background: phase.status === 'completed' ? 'rgba(63,185,80,0.15)' : phase.status === 'upcoming' ? 'rgba(88,166,255,0.15)' : '#21262d',
                    color: phase.status === 'completed' ? '#3fb950' : phase.status === 'upcoming' ? '#58a6ff' : '#8b949e',
                  }}>
                    {phase.status === 'completed' ? '✅ تکمیل‌شده' : phase.status === 'upcoming' ? '🔄 در دست اقدام' : '📋 برنامه‌ریزی‌شده'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                  {phase.items.map((item, k) => (
                    <div key={k} style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      fontSize: '13px', color: phase.status === 'completed' ? '#c9d1d9' : '#8b949e',
                    }}>
                      <span style={{ color: phase.color, flexShrink: 0 }}>
                        {phase.status === 'completed' ? '✓' : '◆'}
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Future Features */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            🔮 ویژگی‌های آینده‌نگر
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {features.map((cat, i) => {
              const colors = ['#58a6ff', '#3fb950', '#bc8cff'];
              const color = colors[i];
              return (
                <div key={i} className="card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {i === 0 ? '🧠' : i === 1 ? '🔌' : '⌚'} {cat.cat}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {cat.items.map((item, k) => (
                      <li key={k} style={{
                        fontSize: '13px', color: '#8b949e', padding: '6px 0',
                        borderBottom: '1px solid #21262d', display: 'flex', gap: '8px',
                      }}>
                        <span style={{ color }}>{k + 1}.</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(88,166,255,0.08), rgba(188,140,255,0.08))',
          border: '1px solid rgba(88,166,255,0.2)',
          borderRadius: '20px', padding: '40px', textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            🌟 چشم‌انداز ۳ ساله
          </h2>
          <p style={{ fontSize: '16px', color: '#8b949e', lineHeight: 1.9, maxWidth: '700px', margin: '0 auto 32px' }}>
            LifeFlow می‌خواهد تا سال ۱۴۰۸ به پلتفرم شماره یک بهره‌وری در ایران و منطقه MENA تبدیل شود. هدف: ۱ میلیون کاربر فعال، ۱۰,۰۰۰ سازمان، و حضور در ۵ کشور.
          </p>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { value: '۱M+', label: 'کاربر فعال', color: '#58a6ff' },
              { value: '۱۰K+', label: 'سازمان', color: '#3fb950' },
              { value: '۵', label: 'کشور MENA', color: '#bc8cff' },
              { value: '$۱۵M', label: 'ARR هدف', color: '#d29922' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: item.color, marginBottom: '4px' }}>{item.value}</div>
                <div style={{ fontSize: '12px', color: '#8b949e' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Project Sections Grid */}
        <ProjectExplorer onNavigate={onNavigate} />
  
        {/* Footer */}
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}
