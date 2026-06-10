import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface Props { onNavigate: (page: string) => void; }

export default function MarketingPage({ onNavigate: _ }: Props) {
  function onNavigate(_page: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>بازاریابی</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            استراتژی بازاریابی
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>
            رویکرد چندکاناله با تمرکز بر جذب ارگانیک و رشد وایرال
          </p>
        </div>

        {/* Funnel */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            قیف بازاریابی LifeFlow
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { stage: 'آگاهی (Awareness)', tactics: 'SEO، محتوا، اینستاگرام، لینکدین', users: '۱۰۰,۰۰۰', color: '#58a6ff', width: '100%' },
              { stage: 'جذب (Acquisition)', tactics: 'ثبت‌نام رایگان، لندینگ پیج', users: '۲۰,۰۰۰', color: '#3fb950', width: '70%' },
              { stage: 'فعال‌سازی (Activation)', tactics: 'آنبوردینگ تعاملی، اولین بینش AI', users: '۱۲,۰۰۰', color: '#bc8cff', width: '50%' },
              { stage: 'نگهداری (Retention)', tactics: 'ایمیل هفتگی، نوتیفیکیشن هوشمند', users: '۸,۰۰۰', color: '#d29922', width: '35%' },
              { stage: 'درآمد (Revenue)', tactics: 'ارتقا به Premium/Team', users: '۱,۶۰۰', color: '#f85149', width: '22%' },
              { stage: 'ارجاع (Referral)', tactics: 'کد معرف، برنامه پاداش', users: '۴۰۰', color: '#3fb950', width: '12%' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0' }}>
                <div style={{ minWidth: '160px', fontSize: '13px', fontWeight: 600, color: '#c9d1d9' }}>{item.stage}</div>
                <div style={{
                  height: '32px', width: item.width, background: `${item.color}20`,
                  border: `1px solid ${item.color}40`, borderRadius: '6px',
                  display: 'flex', alignItems: 'center', padding: '0 10px',
                  fontSize: '11px', color: item.color, fontWeight: 600,
                  transition: 'width 1s ease',
                }}>
                  {item.users}
                </div>
                <div style={{ fontSize: '12px', color: '#8b949e', flex: 1 }}>{item.tactics}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Strategy */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {[
            {
              icon: '🔍',
              title: 'SEO و محتوا',
              color: '#58a6ff',
              items: [
                'هدف: ۵۰,۰۰۰ بازدیدکننده ارگانیک در ماه ۶',
                'کلمات کلیدی: مدیریت زمان، بهره‌وری، productivity',
                'مقالات تخصصی هفتگی در بلاگ',
                'ویدئوهای آموزشی یوتیوب و آپارات',
                'بهینه‌سازی برای جستجوی فارسی',
              ],
            },
            {
              icon: '📱',
              title: 'شبکه‌های اجتماعی',
              color: '#3fb950',
              items: [
                'اینستاگرام: ۳ پست در هفته + stories روزانه',
                'لینکدین: محتوای B2B برای مدیران',
                'توییتر/X: نظرات تخصصی بهره‌وری',
                'تلگرام: کانال نکات روزانه بهره‌وری',
                'KPI: ۱۰۰K فالوور در ماه ۱۲',
              ],
            },
            {
              icon: '🎁',
              title: 'برنامه رفرال',
              color: '#bc8cff',
              items: [
                'هر معرفی موفق = ۱ ماه Premium رایگان',
                'داشبورد رفرال اختصاصی برای هر کاربر',
                'پاداش ویژه برای معرفی ۵+ نفر',
                'KPI: ۳۰٪ کاربران جدید از رفرال',
                'ویروسی شدن: K-factor هدف ۱.۳',
              ],
            },
            {
              icon: '🤝',
              title: 'همکاری B2B',
              color: '#d29922',
              items: [
                'همکاری با شتاب‌دهنده‌های ایرانی',
                'ارائه در رویدادهای HR و مدیریت',
                'مشارکت با مشاوران منابع انسانی',
                'برنامه Partner برای مشاوران',
                'تخفیف ویژه برای NGOها',
              ],
            },
          ].map((channel, i) => (
            <div key={i} className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px' }}>{channel.icon}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f0f6fc' }}>{channel.title}</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {channel.items.map((item, k) => (
                  <li key={k} style={{ fontSize: '13px', color: '#8b949e', padding: '5px 0', display: 'flex', gap: '8px', borderBottom: '1px solid #21262d' }}>
                    <span style={{ color: channel.color, flexShrink: 0 }}>◆</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* KPIs */}
        <div className="card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            📊 شاخص‌های کلیدی عملکرد (KPI)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { metric: 'CAC (هزینه جذب)', value: '< ۵۰,۰۰۰ تومان', color: '#58a6ff' },
              { metric: 'LTV (ارزش عمر)', value: '> ۱,۲۰۰,۰۰۰ تومان', color: '#3fb950' },
              { metric: 'نرخ Churn', value: '< ۵٪ ماهانه', color: '#d29922' },
              { metric: 'نرخ NPS', value: '> ۶۰', color: '#bc8cff' },
              { metric: 'نرخ تبدیل Free→Premium', value: '> ۸٪', color: '#f85149' },
              { metric: 'MAU Growth', value: '> ۲۰٪ ماهانه', color: '#3fb950' },
            ].map((kpi, i) => (
              <div key={i} style={{
                padding: '16px', borderRadius: '10px',
                background: `${kpi.color}08`, border: `1px solid ${kpi.color}25`,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: kpi.color, marginBottom: '6px' }}>{kpi.value}</div>
                <div style={{ fontSize: '12px', color: '#8b949e' }}>{kpi.metric}</div>
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
