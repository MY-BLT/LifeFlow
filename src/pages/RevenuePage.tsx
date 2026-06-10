import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface Props { onNavigate: (page: string) => void; }

const plans = [
  {
    name: 'Free',
    nameFA: 'رایگان',
    price: '۰',
    period: 'همیشه',
    color: '#8b949e',
    features: [
      'ثبت تا ۳۰ فعالیت در ماه',
      'داشبورد پایه',
      'گزارش هفتگی',
      '۲ بینش AI در روز',
      'یک کاربر',
    ],
    missing: ['داشبورد سازمانی', 'خروجی JSON/CSV', 'بینش‌های نامحدود'],
    cta: 'شروع رایگان',
    popular: false,
  },
  {
    name: 'Premium',
    nameFA: 'پریمیوم',
    price: '۹۹,۰۰۰',
    period: 'ماهانه',
    color: '#58a6ff',
    features: [
      'ثبت نامحدود فعالیت',
      'بینش‌های AI نامحدود',
      'خروجی CSV و JSON',
      'گزارش‌های عمیق ماهانه',
      'پشتیبانی ایمیلی',
      'تحلیل رفتاری پیشرفته',
    ],
    missing: [],
    cta: 'شروع آزمایشی ۱۴ روزه',
    popular: true,
  },
  {
    name: 'Team',
    nameFA: 'تیمی',
    price: '۳۴۹,۰۰۰',
    period: 'ماهانه (۵ نفر)',
    color: '#3fb950',
    features: [
      'همه امکانات Premium',
      'داشبورد مدیریتی تیم',
      'تشخیص فرسودگی تیم',
      'گزارش‌های سازمانی',
      'پشتیبانی اولویت‌دار',
      'تا ۵ کاربر',
    ],
    missing: [],
    cta: 'شروع آزمایشی تیمی',
    popular: false,
  },
  {
    name: 'Enterprise',
    nameFA: 'سازمانی',
    price: 'سفارشی',
    period: 'قرارداد سالانه',
    color: '#bc8cff',
    features: [
      'همه امکانات Team',
      'API اختصاصی',
      'SSO و LDAP',
      'گزارش‌های سفارشی',
      'پشتیبانی ۲۴/۷',
      'کاربران نامحدود',
      'SLA تضمینی',
    ],
    missing: [],
    cta: 'تماس با تیم فروش',
    popular: false,
  },
];

export default function RevenuePage({ onNavigate: _ }: Props) {
  function onNavigate(_page: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-green" style={{ marginBottom: '16px', display: 'inline-flex' }}>مدل درآمد</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            طرح قیمت‌گذاری
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>
            مدل Freemium با مسیر رشد مشخص از رایگان به Enterprise
          </p>
        </div>

        {/* Pricing Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {plans.map((plan, i) => (
            <div
              key={i}
              style={{
                background: '#161b22',
                border: plan.popular ? `2px solid ${plan.color}` : '1px solid #30363d',
                borderRadius: '16px', padding: '28px',
                position: 'relative', overflow: 'hidden',
                boxShadow: plan.popular ? `0 0 30px ${plan.color}20` : 'none',
                transform: plan.popular ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: plan.color, color: '#0d1117', padding: '3px 10px',
                  borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                }}>
                  محبوب‌ترین
                </div>
              )}
              <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: '3px', background: `linear-gradient(90deg, ${plan.color}, transparent)` }} />
              
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: plan.color, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {plan.nameFA}
              </h3>
              <div style={{ marginBottom: '20px' }}>
                {plan.price === 'سفارشی' ? (
                  <span style={{ fontSize: '28px', fontWeight: 800, color: '#f0f6fc' }}>سفارشی</span>
                ) : (
                  <>
                    <span style={{ fontSize: '32px', fontWeight: 800, color: '#f0f6fc' }}>{plan.price}</span>
                    <span style={{ fontSize: '14px', color: '#8b949e', marginRight: '4px' }}>تومان</span>
                  </>
                )}
                <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px' }}>/{plan.period}</div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                {plan.features.map((f, k) => (
                  <li key={k} style={{ fontSize: '13px', color: '#c9d1d9', padding: '6px 0', display: 'flex', alignItems: 'flex-start', gap: '8px', borderBottom: '1px solid #21262d' }}>
                    <span style={{ color: plan.color, flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
                {plan.missing.map((f, k) => (
                  <li key={k} style={{ fontSize: '13px', color: '#8b949e', padding: '6px 0', display: 'flex', alignItems: 'flex-start', gap: '8px', opacity: 0.5, borderBottom: '1px solid #21262d' }}>
                    <span style={{ flexShrink: 0 }}>✗</span> {f}
                  </li>
                ))}
              </ul>

              <button style={{
                width: '100%', padding: '12px', borderRadius: '10px',
                background: plan.popular ? plan.color : 'transparent',
                border: `1px solid ${plan.color}`,
                color: plan.popular ? '#0d1117' : plan.color,
                fontFamily: 'Vazirmatn, sans-serif', fontSize: '13px', fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Revenue Forecast */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            📈 پیش‌بینی درآمد
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            {[
              { period: 'ماه ۶', users: '۲,۰۰۰', paying: '۴۰۰', mrr: '۴۰M', color: '#58a6ff' },
              { period: 'ماه ۱۲', users: '۸,۵۰۰', paying: '۱,۷۰۰', mrr: '۱۷۰M', color: '#3fb950' },
              { period: 'ماه ۱۸', users: '۲۵,۰۰۰', paying: '۵,۰۰۰', mrr: '۵۰۰M', color: '#bc8cff' },
              { period: 'ماه ۲۴', users: '۶۰,۰۰۰', paying: '۱۲,۰۰۰', mrr: '۱.۲B', color: '#d29922' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '20px', background: '#0d1117', borderRadius: '12px', border: '1px solid #21262d' }}>
                <div style={{ fontSize: '13px', color: '#8b949e', marginBottom: '8px' }}>{item.period}</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: item.color, marginBottom: '4px' }}>{item.mrr}</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>MRR (تومان)</div>
                <div style={{ height: '1px', background: '#21262d', margin: '10px 0' }} />
                <div style={{ fontSize: '12px', color: '#8b949e' }}>{item.users} کاربر</div>
                <div style={{ fontSize: '11px', color: item.color }}>{item.paying} پرداخت‌کننده</div>
              </div>
            ))}
          </div>
          
          {/* Break-even */}
          <div style={{
            padding: '20px', borderRadius: '12px',
            background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '22px' }}>💰</span>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', marginBottom: '4px' }}>نقطه سربه‌سر</h3>
                <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.7 }}>
                  با فرض هزینه ماهانه <strong style={{ color: '#c9d1d9' }}>۱۵۰ میلیون تومان</strong> (تیم + زیرساخت)، نقطه سربه‌سر با <strong style={{ color: '#3fb950' }}>۱,۵۰۰ کاربر پریمیوم</strong> در ماه ۸ محقق می‌شود.
                </p>
              </div>
              <div style={{ marginRight: 'auto', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#3fb950' }}>ماه ۸</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>Break-even</div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Streams */}
        <div className="card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            💰 جریان‌های درآمدی
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { icon: '👤', title: 'اشتراک Premium', desc: 'درآمد اصلی از کاربران شخصی', share: '۴۵٪', color: '#58a6ff' },
              { icon: '👥', title: 'اشتراک Team/Enterprise', desc: 'ARR بالا از سازمان‌ها', share: '۳۵٪', color: '#3fb950' },
              { icon: '🔌', title: 'API B2B', desc: 'یکپارچه‌سازی با سیستم‌های HR', share: '۱۲٪', color: '#bc8cff' },
              { icon: '📊', title: 'گزارش‌های تحلیلی', desc: 'داده‌های مجموع (ناشناس) برای تحقیقات', share: '۸٪', color: '#d29922' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '20px', borderRadius: '12px',
                background: `${s.color}08`, border: `1px solid ${s.color}25`,
                display: 'flex', alignItems: 'center', gap: '16px',
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '4px' }}>{s.title}</h3>
                  <p style={{ fontSize: '12px', color: '#8b949e' }}>{s.desc}</p>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: s.color }}>{s.share}</div>
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
