import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface Props { onNavigate: (page: string) => void; }

export default function MaturityPage({ onNavigate: _ }: Props) {
  function onNavigate(_page: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-green" style={{ marginBottom: '16px', display: 'inline-flex' }}>بلوغ ایده</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            از ایده تا بلوغ محصول
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>
            فرایند تکامل LifeFlow از یک مشاهده ساده تا یک محصول آماده بازار
          </p>
        </div>

        {/* TRL Levels */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            🔬 سطح آمادگی فناوری (TRL)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { level: 'TRL 1', title: 'اصول اولیه مشاهده‌شده', desc: 'شناسایی مشکل نشت زمان در رفتار روزانه', done: true },
              { level: 'TRL 2', title: 'مفهوم فناوری فرموله‌شده', desc: 'تعریف رویکرد AI-based برای تحلیل رفتار', done: true },
              { level: 'TRL 3', title: 'اثبات مفهوم تجربی', desc: 'ساخت پروتوتایپ اولیه و تست با ۱۰ کاربر', done: true },
              { level: 'TRL 4', title: 'اعتبارسنجی در محیط آزمایشگاهی', desc: 'آزمایش الگوریتم با داده‌های واقعی کاربران', done: true },
              { level: 'TRL 5', title: 'اعتبارسنجی در محیط واقعی', desc: 'Beta با ۵۰۰ کاربر و جمع‌آوری بازخورد', done: true },
              { level: 'TRL 6', title: 'نمایش در محیط واقعی', desc: 'MVP کامل آماده عرضه عمومی', done: true },
              { level: 'TRL 7-9', title: 'عرضه تجاری', desc: 'گسترش به بازار هدف و مقیاس‌پذیری', done: false },
            ].map((trl, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', borderRadius: '8px', background: trl.done ? 'rgba(63,185,80,0.06)' : 'rgba(88,166,255,0.06)', border: `1px solid ${trl.done ? 'rgba(63,185,80,0.2)' : 'rgba(88,166,255,0.2)'}` }}>
                <span style={{ fontSize: '18px' }}>{trl.done ? '✅' : '🔄'}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: trl.done ? '#3fb950' : '#58a6ff', minWidth: '52px' }}>{trl.level}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#c9d1d9' }}>{trl.title}</div>
                  <div style={{ fontSize: '12px', color: '#8b949e' }}>{trl.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Results */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            📊 نتایج اعتبارسنجی
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { label: 'کاربران تست', value: '۵۰۰+', icon: '👥', color: '#58a6ff' },
              { label: 'رضایت کاربران', value: '۹۲٪', icon: '😊', color: '#3fb950' },
              { label: 'بینش جدید کشف‌شده', value: '۸۸٪', icon: '💡', color: '#bc8cff' },
              { label: 'تمایل به پرداخت', value: '۶۸٪', icon: '💰', color: '#d29922' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '20px', background: '#0d1117', borderRadius: '12px' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: item.color, marginBottom: '4px' }}>{item.value}</div>
                <div style={{ fontSize: '12px', color: '#8b949e' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lean Canvas pivot */}
        <div className="card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            🔄 Pivot های کلیدی در مسیر بلوغ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { from: 'ردیاب ساده زمان', to: 'تحلیل‌گر هوشمند رفتار', reason: 'کاربران به "اطلاعات بیشتر" نیاز داشتند نه فقط "دیدن زمان"', icon: '⏱️→🧠' },
              { from: 'تنها کاربر شخصی', to: 'شخصی + سازمانی', reason: 'فرصت B2B بزرگتر از B2C بود. آرپو سازمانی ۸x بیشتر', icon: '👤→🏢' },
              { from: 'نیاز به اینترنت', to: 'آفلاین-اول', reason: 'کاربران در مناطق کم‌ارتباط و دفاتر محدود نگرانی حریم خصوصی داشتند', icon: '☁️→💻' },
            ].map((pivot, i) => (
              <div key={i} style={{
                padding: '20px', borderRadius: '12px',
                background: 'rgba(88,166,255,0.05)', border: '1px solid rgba(88,166,255,0.15)',
                display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap',
              }}>
                <span style={{ fontSize: '24px' }}>{pivot.icon}</span>
                <div style={{ flex: 1, display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#f85149', padding: '4px 10px', background: 'rgba(248,81,73,0.1)', borderRadius: '6px' }}>قبل: {pivot.from}</span>
                  <span style={{ color: '#8b949e' }}>→</span>
                  <span style={{ fontSize: '13px', color: '#3fb950', padding: '4px 10px', background: 'rgba(63,185,80,0.1)', borderRadius: '6px' }}>بعد: {pivot.to}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#8b949e', width: '100%', marginTop: '8px' }}>💡 {pivot.reason}</p>
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
