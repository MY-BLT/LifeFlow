import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface Props { onNavigate: (page: string) => void; }

export default function MaturityPage({ onNavigate }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Hero */}
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
              { level: 'TRL 3', title: 'اثبات مفهوم تجربی', desc: 'ساخت پروتوتایپ اولیه و تست با گروه کوچک', done: true },
              { level: 'TRL 4', title: 'اعتبارسنجی در محیط آزمایشگاهی', desc: 'آزمایش الگوریتم با داده‌های شبیه‌سازی‌شده و محدود', done: true },
              { level: 'TRL 5', title: 'اعتبارسنجی در محیط واقعی (محدود)', desc: 'تست گروه کنترل محدود و جمع‌آوری بازخورد اولیه', done: true },
              { level: 'TRL 6', title: 'نمایش در محیط واقعی', desc: 'MVP تکمیل‌شده، آماده عرضه و تست گسترده‌تر', done: true },
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

        {/* 360-Degree Idea Analysis */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>
            🔎 تحلیل ۳۶۰ درجه ایده
          </h2>
          <p style={{ fontSize: '13px', color: '#8b949e', marginBottom: '24px' }}>
            بررسی جرقه اولیه از زوایای مختلف بازار، مشتری و ریسک
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {[
              { q: 'آیا واقعاً کسی در بازار منتظر چنین راه‌حلی است؟', a: 'بله. کارکنان دانش‌محور و دانشجویان از ابزارهایی که صرفاً وظایف را لیست می‌کنند، خسته شده‌اند. نیاز به درک "علت شکست برنامه‌ها" به شدت در بازار احساس می‌شود.', icon: '⏳' },
              { q: 'علاقه شخصی است یا مسئله واقعی گروهی؟', a: 'ایده از یک مشکل و درد شخصی آغاز شد، اما در مصاحبه‌های اولیه با یک گروه محدود، این شکاف (فاصله برنامه‌ریزی تا اجرا) در آن‌ها نیز تأیید شد؛ بنابراین مسئله‌ای گروهی است.', icon: '🎯' },
              { q: 'ایده از نوع جدید، ترکیبی یا تطبیقی است؟', a: 'ترکیبی (Combinatorial). این ایده تلفیقی از مدیریت تسک (مانند تسکینو)، ثبت زمان (مانند Toggl) و تحلیل رفتاری مبتنی بر هوش مصنوعی در یک پلتفرم یکپارچه است.', icon: '🧩' },
              { q: 'ایده تا چه مقیاسی می‌تواند رشد کند؟', a: 'از مخاطب فردی (B2C) آغاز شده و به دلیل ماهیت تحلیلی، پتانسیل گسترش به تیم‌های سازمانی (B2B) را دارد. در مقیاس کلان، بازار منطقه MENA هدف‌گذاری شده است.', icon: '📈' },
              { q: 'مشتریان حاضرند پول پرداخت کنند؟ چرا؟', a: 'بله. زیرا ارزش پیشنهادی مستقیماً بازگشت سرمایه (ROI) دارد. بازیابی ۱ تا ۲ ساعت در روز برای یک حرفه‌ای، برابر با افزایش تولید ارزش یا اوقات فراغت ملموس است که کاربر برای آن پرداخت می‌کند.', icon: '💳' },
              { q: 'آیا امکان ارزیابی میدانی ایده وجود دارد؟ چگونه؟', a: 'بله. با ارائه MVP فعلی به یک گروه کنترل محدود و رصد تغییرات بهره‌وری و الگوهای رفتاری آن‌ها در یک بازه زمانی مشخص (مثلاً ۲ هفته) نسبت به گذشته، ارزیابی میدانی انجام‌پذیر است.', icon: '🧪' },
              { q: 'اگر ایده شکست بخورد، محتمل‌ترین علت شکست چیست؟', a: 'خستگی کاربر از ورود داده (Data Entry Fatigue). اگر ثبت زمان و فعالیت برای کاربر سنگین باشد، ابزار را رها می‌کند. راه‌حل پیش‌بینی‌شده: اتوماسیون و یادگیری ماشین برای حدس فعالیت‌ها.', icon: '⚠️' },
              { q: 'گزینه قبلی مشتریان چه بوده است؟', a: 'استفاده همزمان از ۳ تا ۵ ابزار مجزا (یادداشت، چک‌لیست، تایمر دستی) یا در نهایت بازگشت به روش سنتی کاغذ و خودکار که قابلیت تحلیل ندارند.', icon: '🔄' },
              { q: 'پول یا توجه مشتری قبلاً به سمت چه جایگزینی می‌رفت؟', a: 'به سمت خرید اشتراک‌های پراکنده اپلیکیشن‌های خارجی (با مشکلات تحریم و پرداخت) یا صرف زمان زیاد برای تنظیم پایگاه‌های داده پیچیده در Notion بدون دریافت هیچ‌گونه تحلیل رفتاری.', icon: '💸' },
              { q: 'فرضیات اصلی ایده چیست؟', a: '۱. کاربران نه‌تنها می‌خواهند بدانند چه کار کرده‌اند، بلکه می‌خواهند بدانند "چرا" شکست خورده‌اند. ۲. هوش مصنوعی قادر است از داده‌های پرنویز زمان‌بندی، الگوهای رفتاری پنهان را استخراج کند.', icon: '🧠' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '12px', padding: '20px', transition: 'border-color 0.2s' }}
                   onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#58a6ff')}
                   onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#30363d')}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f0f6fc', lineHeight: 1.5 }}>{item.q}</h3>
                </div>
                <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.7, paddingRight: '30px' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Results */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>
            📊 نتایج اعتبارسنجی محدود
          </h2>
          <p style={{ fontSize: '13px', color: '#8b949e', marginBottom: '24px' }}>
            بر اساس تست گروه کنترل کوچک (پیش از عرضه عمومی)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { label: 'حجم نمونه تست', value: 'محدود', icon: '👥', color: '#58a6ff' },
              { label: 'رضایت اولیه کاربران', value: 'بالا', icon: '😊', color: '#3fb950' },
              { label: 'کشف بینش رفتاری جدید', value: 'موفق', icon: '💡', color: '#bc8cff' },
              { label: 'تمایل به پرداخت (پیش‌بینی)', value: 'متوسط رو به بالا', icon: '💰', color: '#d29922' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '20px', background: '#0d1117', borderRadius: '12px', border: '1px solid #21262c' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: item.color, marginBottom: '4px' }}>{item.value}</div>
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