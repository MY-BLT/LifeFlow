import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";
import React, { useState } from "react";

interface Props { onNavigate: (page: string) => void; }

// ===== داده‌های قیمت‌گذاری =====
const plans = [
  {
    name: 'Free',
    nameFA: 'رایگان',
    price: '۰',
    period: 'همیشه',
    color: '#8b949e',
    features: [
      'ثبت نامحدود فعالیت دستی',
      'داشبورد پایه بهره‌وری',
      'گزارش خلاصه هفتگی',
      '۳ بینش AI در ماه',
      'محدود به یک دستگاه',
    ],
    missing: ['داشبورد سازمانی', 'پیش‌بینی فرسودگی شغلی', 'بینش‌های روزانه AI'],
    cta: 'شروع رایگان',
    popular: false,
    navigateTo: 'demo-personal',
  },
  {
    name: 'Premium',
    nameFA: 'پریمیوم (فردی)',
    price: '۴۹,۰۰۰',
    period: 'ماهانه / کاربر',
    color: '#58a6ff',
    features: [
      'ردیابی خودکار زمان',
      'بینش‌های ریشه‌ای AI (نامحدود)',
      'همگام‌سازی بین دستگاه‌ها',
      'گزارش‌های عمیق ماهانه',
      'خروجی CSV و JSON',
      'پشتیبانی ایمیلی اولویت‌دار',
    ],
    missing: ['داشبورد تیمی'],
    cta: '۱۴ روز تست رایگان',
    popular: true,
    navigateTo: 'demo-personal',
  },
  {
    name: 'Team',
    nameFA: 'تیمی (استارتاپ‌ها)',
    price: '۱۹۹,۰۰۰',
    period: 'ماهانه (تا ۵ نفر)',
    color: '#3fb950',
    features: [
      'همه امکانات Premium',
      'داشبورد مدیریتی و سلامت تیم',
      'هشدار پیشگیری از فرسودگی',
      'گزارش‌های مقایسه‌ای تیمی',
      'پشتیبانی تلفنی و تیکت',
      'مدیریت دسترسی‌ها (RBAC)',
    ],
    missing: [],
    cta: 'شروع آزمایشی تیمی',
    popular: false,
    navigateTo: 'demo-org',
  },
  {
    name: 'Enterprise',
    nameFA: 'سازمانی',
    price: 'سفارشی',
    period: 'قرارداد سالانه',
    color: '#bc8cff',
    features: [
      'همه امکانات Team',
      'نصب روی سرور خصوصی (On-Prem)',
      'API اختصاصی برای HRIS',
      'ورود یکپارچه (SSO / Active Directory)',
      'مدیر موفقیت مشتری اختصاصی',
      'SLA تضمینی ۹۹.۹٪',
      'تعداد کاربر نامحدود',
    ],
    missing: [],
    cta: 'تماس با تیم فروش',
    popular: false,
    navigateTo: 'home',
  },
];

export default function RevenuePage({ onNavigate }: Props) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* هشدار MVP */}
        <div style={{
          background: 'rgba(210,153,34,0.08)', border: '1px solid rgba(210,153,34,0.25)',
          borderRadius: '12px', padding: '14px 20px', marginBottom: '32px',
          display: 'flex', alignItems: 'center', gap: '12px', color: '#d29922', fontSize: '13px',
        }}>
          <span style={{ fontSize: '20px' }}>📌</span>
          <span>
            <strong>لایف‌فلو در مرحله MVP است.</strong> این صفحه، استراتژی قیمت‌گذاری و پیش‌بینی‌های مالی مبتنی بر ARPU (متوسط درآمد هر کاربر: ~۵۵ هزار تومان) را برای ۱۲ تا ۲۴ ماه آینده نشان می‌دهد.
          </span>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-green" style={{ marginBottom: '16px', display: 'inline-flex' }}>Business & Revenue Model</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            مدل درآمد و قیمت‌گذاری
          </h1>
          <p style={{ fontSize: '15px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>
            مدل Freemium با مسیر ارتقای مبتنی بر ارزش (Product-Led Growth) برای افراد و تیم‌ها
          </p>
        </div>

        {/* Toggle Monthly/Annually */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
          <span style={{ fontSize: '14px', color: !isAnnual ? '#f0f6fc' : '#8b949e', fontWeight: !isAnnual ? 700 : 400 }}>پرداخت ماهانه</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            style={{
              width: '56px', height: '30px', background: isAnnual ? '#3fb950' : '#21262d',
              borderRadius: '20px', border: 'none', position: 'relative', cursor: 'pointer',
              transition: 'background 0.3s'
            }}
          >
            <div style={{
              width: '22px', height: '22px', background: '#fff', borderRadius: '50%',
              position: 'absolute', top: '4px', left: isAnnual ? '30px' : '4px', transition: 'left 0.3s'
            }} />
          </button>
          <span style={{ fontSize: '14px', color: isAnnual ? '#f0f6fc' : '#8b949e', fontWeight: isAnnual ? 700 : 400 }}>
            پرداخت سالانه <span style={{ color: '#3fb950', fontSize: '11px', background: 'rgba(63,185,80,0.15)', padding: '2px 6px', borderRadius: '4px', marginRight: '6px' }}>۲۰٪ تخفیف</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {plans.map((plan, i) => {
            // محاسبه تخفیف سالانه
            let displayPrice = plan.price;
            if (isAnnual && plan.price !== '۰' && plan.price !== 'سفارشی') {
              const numericPrice = parseInt(plan.price.replace(/,/g, ''));
              displayPrice = (numericPrice * 0.8).toLocaleString('fa-IR');
            }

            return (
              <div
                key={i}
                style={{
                  background: '#161b22',
                  border: plan.popular ? `2px solid ${plan.color}` : '1px solid #30363d',
                  borderRadius: '16px', padding: '28px',
                  position: 'relative', overflow: 'hidden',
                  boxShadow: plan.popular ? `0 8px 32px ${plan.color}15` : 'none',
                  transform: plan.popular ? 'translateY(-8px)' : 'none',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: plan.color, color: '#0d1117', padding: '4px 12px',
                    borderRadius: '20px', fontSize: '11px', fontWeight: 800,
                  }}>
                    محبوب‌ترین
                  </div>
                )}
                <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: '4px', background: `linear-gradient(90deg, ${plan.color}, transparent)` }} />
                
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: plan.color, marginBottom: '8px' }}>
                  {plan.nameFA}
                </h3>
                
                <div style={{ marginBottom: '24px', minHeight: '60px' }}>
                  {plan.price === 'سفارشی' ? (
                    <span style={{ fontSize: '28px', fontWeight: 800, color: '#f0f6fc' }}>سفارشی</span>
                  ) : (
                    <>
                      <span style={{ fontSize: '32px', fontWeight: 800, color: '#f0f6fc' }}>{displayPrice}</span>
                      <span style={{ fontSize: '13px', color: '#8b949e', marginRight: '6px' }}>تومان</span>
                    </>
                  )}
                  <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px' }}>
                    {plan.price === 'سفارشی' ? plan.period : (isAnnual ? 'ماهانه (پرداخت یکجا)' : plan.period)}
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', flexGrow: 1 }}>
                  {plan.features.map((f, k) => (
                    <li key={k} style={{ fontSize: '13px', color: '#c9d1d9', padding: '8px 0', display: 'flex', alignItems: 'flex-start', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: plan.color, flexShrink: 0, marginTop: '2px' }}>✓</span> {f}
                    </li>
                  ))}
                  {plan.missing.map((f, k) => (
                    <li key={k} style={{ fontSize: '13px', color: '#8b949e', padding: '8px 0', display: 'flex', alignItems: 'flex-start', gap: '10px', opacity: 0.5, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ flexShrink: 0, marginTop: '2px' }}>✗</span> {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onNavigate(plan.navigateTo)}
                  style={{
                    width: '100%', padding: '14px', borderRadius: '10px',
                    background: plan.popular ? plan.color : 'transparent',
                    border: `1px solid ${plan.color}`,
                    color: plan.popular ? '#0d1117' : plan.color,
                    fontFamily: 'inherit', fontSize: '14px', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    if (!plan.popular) e.currentTarget.style.background = `${plan.color}15`;
                  }}
                  onMouseOut={(e) => {
                    if (!plan.popular) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Revenue Forecast (اصلاح شده از نظر ریاضی) */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>
              📈 پیش‌بینی درآمد (MRR Forecast)
            </h2>
            <p style={{ fontSize: '13px', color: '#8b949e' }}>
              محاسبات بر اساس ترکیب فروش B2C و B2B (میانگین درآمد از هر کاربر / ARPU = ۵۵,۰۰۰ تومان)
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {[
              { period: 'ماه ۶', users: '۲,۰۰۰', paying: '۳۵۰', mrr: '۱۹ میلیون', color: '#58a6ff' },
              { period: 'ماه ۱۲', users: '۸,۵۰۰', paying: '۱,۵۰۰', mrr: '۸۲ میلیون', color: '#3fb950' },
              { period: 'ماه ۱۸', users: '۲۵,۰۰۰', paying: '۴,۵۰۰', mrr: '۲۴۷ میلیون', color: '#bc8cff' },
              { period: 'ماه ۲۴', users: '۶۰,۰۰۰', paying: '۱۰,۵۰۰', mrr: '۵۷۰ میلیون', color: '#d29922' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px 20px', background: '#0d1117', borderRadius: '12px', border: '1px solid #21262d' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc', marginBottom: '12px' }}>{item.period}</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: item.color, marginBottom: '4px' }}>{item.mrr}</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>MRR (درآمد مستمر ماهانه)</div>
                <div style={{ height: '1px', background: '#21262d', margin: '16px 0' }} />
                <div style={{ fontSize: '13px', color: '#c9d1d9', marginBottom: '4px' }}>{item.paying} کاربر پولی</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>از کل {item.users} ثبت‌نامی</div>
              </div>
            ))}
          </div>
          
          {/* Break-even (اصلاح شده از نظر ریاضی) */}
          <div style={{
            padding: '24px', borderRadius: '12px',
            background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(63,185,80,0.15)', padding: '12px', borderRadius: '12px', fontSize: '28px' }}>💰</div>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#3fb950', marginBottom: '6px' }}>نقطه سربه‌سر (Break-even Point)</h3>
                <p style={{ fontSize: '13.5px', color: '#c9d1d9', lineHeight: 1.7, margin: 0 }}>
                  با فرض ثابت بودن هزینه‌های عملیاتی (سرور، تیم، مارکتینگ) روی <strong style={{ color: '#f0f6fc' }}>۱۵۰ میلیون تومان در ماه</strong>، رسیدن به نقطه سربه‌سر نیازمند <strong style={{ color: '#3fb950' }}>~۲,۷۵۰ کاربر پرداخت‌کننده</strong> است که طبق پیش‌بینی، در <strong style={{ color: '#58a6ff' }}>ماه ۱۵ام</strong> محقق خواهد شد.
                </p>
              </div>
              <div style={{ textAlign: 'center', background: '#0d1117', padding: '12px 24px', borderRadius: '8px', border: '1px solid #21262d' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#3fb950' }}>ماه ۱۵</div>
                <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '4px' }}>رسیدن به سوددهی</div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Streams */}
        <div className="card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            🔄 ترکیب جریان‌های درآمدی
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { icon: '👤', title: 'اشتراک Premium', desc: 'کاربران فردی (B2C) - پایه اصلی درآمد', share: '۴۵٪', color: '#58a6ff' },
              { icon: '🏢', title: 'اشتراک Team / B2B', desc: 'سازمان‌ها و استارتاپ‌ها (Retention بالا)', share: '۳۵٪', color: '#3fb950' },
              { icon: '🔌', title: 'فروش API', desc: 'اتصال به نرم‌افزارهای مدیریت پروژه و HR', share: '۱۲٪', color: '#bc8cff' },
              { icon: '📊', title: 'گزارش‌های کلان', desc: 'فروش دیتای بی‌نام از ترندهای صنعت', share: '۸٪', color: '#d29922' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '20px', borderRadius: '12px',
                background: `${s.color}08`, border: `1px solid ${s.color}25`,
                display: 'flex', alignItems: 'center', gap: '16px',
                transition: 'transform 0.2s', cursor: 'default'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f0f6fc', marginBottom: '4px' }}>{s.title}</h3>
                  <p style={{ fontSize: '12px', color: '#8b949e', margin: 0 }}>{s.desc}</p>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: s.color }}>{s.share}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Sections Grid & Footer */}
        <ProjectExplorer onNavigate={onNavigate} />
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}