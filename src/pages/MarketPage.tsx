import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface Props {
  onNavigate: (page: string) => void;
}

// پرسوناهای مشتریان هدف (نه کاربران فعلی، بلکه پروفایل افرادی که می‌خواهیم جذب کنیم)
const personas = [
  {
    name: 'آراد رضایی',
    age: '۲۹ ساله',
    role: 'توسعه‌دهنده نرم‌افزار',
    avatar: '👨‍💻',
    pain: 'ساعت‌ها کار می‌کند اما در پایان روز احساس می‌کند کار مهمی انجام نداده. نمی‌داند چرا.',
    goal: 'می‌خواهد بهره‌وری واقعی‌اش را اندازه بگیرد و زمان بیشتری برای یادگیری داشته باشد.',
    tools: ['Notion', 'Jira', 'Spotify'],
    budget: '۱۵۰,۰۰۰ تومان/ماه',
    color: '#58a6ff',
    quote: '"می‌دانم باید کمتر کار کنم اما بیشتر خروجی بدهم. نمی‌دانم چطور."',
  },
  {
    name: 'نگار موسوی',
    age: '۳۵ ساله',
    role: 'مدیر محصول استارتاپ',
    avatar: '👩‍💼',
    pain: 'مسئول ۱۰ نفر است. نمی‌تواند بفهمد کدام اعضا در معرض فرسودگی هستند تا قبل از خروج آن‌ها اقدام کند.',
    goal: 'می‌خواهد داشبوردی داشته باشد که سلامت تیم را در لحظه نشان دهد.',
    tools: ['Slack', 'Linear', 'Confluence'],
    budget: '۵۰۰,۰۰۰ تومان/ماه برای تیم',
    color: '#3fb950',
    quote: '"بهترین سرمایه‌گذاری، نگه‌داشتن تیم خوب است. LifeFlow این را ممکن می‌کند."',
  },
];

// رقبای واقعی (داده‌های ۲۰۲۴)، LifeFlow در انتها با نشان "در حال توسعه"
const competitors = [
  {
    name: 'RescueTime',
    focus: 'Automatic Time Tracking',
    aiInsight: '✅ (Basic)',
    orgDash: '❌',
    persian: '❌',
    price: '$12/user',
    local: '❌',
    source: 'rescuetime.com',
  },
  {
    name: 'Toggl Track',
    focus: 'Time Tracking & Reporting',
    aiInsight: '⚡ (Simple)',
    orgDash: '❌',
    persian: '❌',
    price: '$10/user',
    local: '❌',
    source: 'toggl.com',
  },
  {
    name: 'Rize',
    focus: 'AI Coaching + Time Tracking',
    aiInsight: '✅',
    orgDash: '❌',
    persian: '❌',
    price: '$14.99/user',
    local: '❌',
    source: 'rize.io',
  },
  {
    name: 'Todoist',
    focus: 'Task Management',
    aiInsight: '⚡ (Karma)',
    orgDash: '❌',
    persian: '❌',
    price: '$5/user',
    local: '❌',
    source: 'todoist.com',
  },
  {
    name: 'Microsoft Viva Insights',
    focus: 'Organizational Analytics',
    aiInsight: '✅',
    orgDash: '✅',
    persian: '❌',
    price: 'From $4/user (M365)',
    local: '❌ (org cloud)',
    source: 'docs.microsoft.com',
  },
  {
    name: 'کسبینو',
    focus: 'CRM & Workflow Automation',
    aiInsight: '❌',
    orgDash: '⚡',
    persian: '✅',
    price: 'سفارشی',
    local: '✅',
    source: 'kasbino.com',
  },
  {
    name: 'تسکولو',
    focus: 'Task & Project Management',
    aiInsight: '❌',
    orgDash: '⚡',
    persian: '✅',
    price: 'از ۳۹ هزار تومان',
    local: '✅',
    source: 'taskulu.com',
  },
  { name: 'میزیتو (Mizito)', focus: 'Team Collaboration', ai: '❌ No', prediction: '❌ No', userCount: '80K+', price: '۸۰هزار ت', origin: 'Iran' },
  {
    name: 'LifeFlow 🚧',
    focus: 'AI Productivity Intelligence',
    aiInsight: '✅ (Root Cause + Burnout)',
    orgDash: '✅',
    persian: '✅',
    price: '۹۹k T (تخمینی)',
    local: '✅ (Edge)',
    highlight: true,
    note: 'در حال توسعه – ۰ کاربر',
    source: 'Current MVP',
  },
];

export default function MarketPage({ onNavigate }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* هشدار وضعیت فعلی */}
        <div style={{
          background: 'rgba(210,153,34,0.1)', border: '1px solid rgba(210,153,34,0.3)',
          borderRadius: '12px', padding: '16px', marginBottom: '32px',
          display: 'flex', alignItems: 'center', gap: '12px', color: '#d29922', fontSize: '14px', fontWeight: 500
        }}>
          <span style={{ fontSize: '20px' }}>⚠️</span>
          <span><strong>لایف‌فلو در مرحله MVP است و در حال حاضر هیچ کاربر فعالی ندارد.</strong> تمام آمار زیر، پتانسیل بازار و اهداف آتی را نشان می‌دهند، نه وضعیت فعلی.</span>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>تحلیل بازار (پیش‌از راه‌اندازی)</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            بازار بالقوه‌ای که هدف گرفته‌ایم
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>
            حتی بدون یک کاربر، فرصت بزرگ است. داده‌ها از گزارش‌های معتبر بازار استخراج شده‌اند.
          </p>
        </div>

        {/* Market Size (Potential) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'بازار جهانی (تخمینی)', value: '$۱۲۰B', sub: 'Productivity Software 2025', color: '#58a6ff', icon: '🌍' },
            { label: 'بازار MENA (تخمینی)', value: '$۲۸۰M', sub: 'نرخ رشد سالانه ۲۳٪', color: '#3fb950', icon: '🌏' },
            { label: 'بازار ایران (هدف)', value: '$۴۵M', sub: 'بازار هدف اولیه', color: '#bc8cff', icon: '🇮🇷' },
            { label: 'کاربران بالقوه', value: '۸M+', sub: 'متخصصان ایرانی هدف', color: '#d29922', icon: '👥' },
          ].map((item, i) => (
            <div key={i} className={`metric-card ${i === 0 ? 'blue' : i === 1 ? 'green' : i === 2 ? 'purple' : 'warning'}`}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: item.color, marginBottom: '4px' }}>{item.value}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#c9d1d9', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '11px', color: '#8b949e' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Segmentation */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            🎯 بخش‌بندی بازار هدف (پیش‌بینی نفوذ)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { segment: 'متخصصان آزاد (فریلنسرها)', size: '۱.۲M نفر', potential: '۸۵٪', color: '#58a6ff', desc: 'بیشترین انگیزه برای ابزارهای بهره‌وری شخصی و پرداخت مستقیم' },
              { segment: 'تیم‌های استارتاپ (۵-۵۰ نفر)', size: '۸۵۰K نفر', potential: '۷۸٪', color: '#3fb950', desc: 'نیاز به داشبورد سازمانی، پرداخت توسط شرکت' },
              { segment: 'شرکت‌های متوسط (۵۰-۵۰۰ نفر)', size: '۴۲۰K نفر', potential: '۶۵٪', color: '#bc8cff', desc: 'چرخه فروش طولانی‌تر اما ارزش قرارداد بالاتر' },
              { segment: 'دانشجویان و فارغ‌التحصیلان', size: '۲.۸M نفر', potential: '۵۵٪', color: '#d29922', desc: 'محرک رشد بلندمدت، حساس به قیمت' },
            ].map((seg, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#0d1117', borderRadius: '10px', flexWrap: 'wrap' }}>
                <div style={{ minWidth: '200px', fontSize: '14px', fontWeight: 600, color: '#f0f6fc' }}>{seg.segment}</div>
                <span className="badge badge-blue">{seg.size}</span>
                <div style={{ flex: 1, minWidth: '160px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, height: '6px', background: '#21262d', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: seg.potential, background: seg.color, borderRadius: '3px' }} />
                    </div>
                    <span style={{ fontSize: '12px', color: seg.color, fontWeight: 600 }}>{seg.potential}</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#8b949e', minWidth: '200px' }}>{seg.desc}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '11px', color: '#8b949e', marginTop: '12px' }}>
            * درصدها تخمینی از تمایل بالقوه به استفاده از چنین سرویسی هستند (بر اساس نظرسنجی‌های اولیه و مشاهدات بازار).
          </p>
        </div>

        {/* Personas (Target Profiles) */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            👤 پروفایل مشتریان هدف (هنوز جذب نشده‌اند)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
            {personas.map((p, i) => (
              <div key={i} className="card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '16px',
                    background: `${p.color}15`, border: `1px solid ${p.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0,
                  }}>
                    {p.avatar}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f0f6fc' }}>{p.name}</h3>
                    <div style={{ fontSize: '13px', color: '#8b949e' }}>{p.age} · {p.role}</div>
                    <span className="badge badge-blue" style={{ marginTop: '4px' }}>{p.budget}</span>
                  </div>
                </div>

                <div style={{ background: `${p.color}08`, borderRadius: '10px', padding: '14px', marginBottom: '16px', borderRight: `3px solid ${p.color}` }}>
                  <p style={{ fontSize: '13px', color: '#8b949e', fontStyle: 'italic', lineHeight: 1.7 }}>{p.quote}</p>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>دردها</div>
                  <p style={{ fontSize: '13px', color: '#c9d1d9', lineHeight: 1.7 }}>{p.pain}</p>
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>اهداف</div>
                  <p style={{ fontSize: '13px', color: '#c9d1d9', lineHeight: 1.7 }}>{p.goal}</p>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>ابزارهای فعلی</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {p.tools.map((tool, k) => (
                      <span key={k} style={{
                        padding: '3px 10px', borderRadius: '6px', fontSize: '12px',
                        background: '#0d1117', border: '1px solid #30363d', color: '#8b949e',
                      }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Table (with LifeFlow pre-launch status) */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            ⚔️ جدول مقایسه رقبا (وضعیت فعلی LifeFlow: ۰ کاربر)
          </h2>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>محصول</th>
                    <th>تمرکز اصلی</th>
                    <th>بینش AI</th>
                    <th>داشبورد سازمانی</th>
                    <th>رابط فارسی</th>
                    <th>قیمت</th>
                    <th>ذخیره محلی</th>
                    <th>وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((comp, i) => (
                    <tr key={i} style={comp.highlight ? { background: 'rgba(88,166,255,0.06)' } : {}}>
                      <td style={{ fontWeight: comp.highlight ? 700 : 500, color: comp.highlight ? '#58a6ff' : '#c9d1d9' }}>
                        {comp.name}
                        {comp.source && (
                          <sup style={{ fontSize: '9px', color: '#8b949e', marginRight: '4px' }} title={comp.source}>[منبع]</sup>
                        )}
                      </td>
                      <td style={{ color: '#8b949e', fontSize: '13px' }}>{comp.focus}</td>
                      <td>{comp.aiInsight}</td>
                      <td>{comp.orgDash}</td>
                      <td>{comp.persian}</td>
                      <td style={{ color: comp.highlight ? '#3fb950' : '#8b949e', fontWeight: comp.highlight ? 600 : 400 }}>{comp.price}</td>
                      <td>{comp.local}</td>
                      <td style={{ fontSize: '12px', color: comp.highlight ? '#d29922' : '#8b949e' }}>
                        {comp.note ? comp.note : 'فعال'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '8px', textAlign: 'left' }}>
            منابع: RescueTime.com, Toggl.com, Rize.io, Todoist.com, Microsoft Docs, Kasbino.com, Taskulu.com – آمارهای قیمت و قابلیت‌ها (۲۰۲۴)
          </div>
        </div>

        {/* Competitive Advantages (still valid even without users) */}
        <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            🚀 مزیت رقابتی LifeFlow (حتی قبل از جذب کاربر)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '16px' }}>
            {[
              {
                title: 'تحلیل ریشه‌ای بهره‌وری',
                desc: 'هیچ رقیبی به کاربر نمی‌گوید «چرا» به اهدافش نمی‌رسد. LifeFlow الگوهای پنهان را کشف می‌کند.',
              },
              {
                title: 'پیش‌بینی فرسودگی شغلی',
                desc: 'با تشخیص زودهنگام (حتی بدون کاربر فعلی، الگوریتم آماده است) می‌توان از افت عملکرد جلوگیری کرد.',
              },
              {
                title: 'حریم خصوصی ۱۰۰٪ محلی',
                desc: 'تمام تحلیل‌ها در مرورگر کاربر انجام می‌شود. داده‌ها هرگز سرور را ترک نمی‌کنند – یک مزیت حیاتی در ایران.',
              },
              {
                title: 'کاملاً فارسی و بومی',
                desc: 'درک تعطیلات، ساعات کاری و فرهنگ ایرانی در هسته محصول. رقبای خارجی فاقد این مزیت هستند.',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0d1117', padding: '20px', borderRadius: '12px', border: '1px solid #30363d' }}>
                <h3 style={{ color: '#58a6ff', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: '#8b949e', lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#8b949e', marginTop: '16px', fontStyle: 'italic' }}>
            * این مزیت‌ها بر اساس معماری محصول وجود دارند، حتی اگر هنوز کاربری جذب نشده باشد.
          </p>
        </div>

        {/* SWOT (honest about zero users) */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            🔷 تحلیل SWOT واقع‌بینانه (با احتساب ۰ کاربر)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {[
              { 
                title: 'نقاط قوت (S)', 
                items: [
                  'الگوریتم تحلیل ریشه‌ای منحصربه‌فرد (حتی روی کاغذ)',
                  'معماری Edge Computing (حریم خصوصی بی‌نظیر)',
                  'تیم کوچک و چابک با دانش روان‌شناسی و فنی',
                  'قیمت رقابتی در مقایسه با نمونه‌های خارجی'
                ], 
                color: '#3fb950' 
              },
              { 
                title: 'نقاط ضعف (W)', 
                items: [
                  'فقدان کامل کاربر و اعتبار (۰ کاربر)',
                  'نیاز به آموزش بازار در مورد «تحلیل ریشه‌ای»',
                  'منابع مالی محدود برای بازاریابی',
                  'عدم یکپارچگی با ابزارهای پرکاربرد در نسخه فعلی'
                ], 
                color: '#f85149' 
              },
              { 
                title: 'فرصت‌ها (O)', 
                items: [
                  'خلاء کامل چنین تحلیلی در بازار ایران و MENA',
                  'رشد سریع دورکاری و نیاز به خودمدیریتی',
                  'افزایش آگاهی نسبت به فرسودگی شغلی (منبع: Gallup)',
                  'همکاری با شتاب‌دهنده‌ها و استارتاپ‌های ایرانی'
                ], 
                color: '#58a6ff' 
              },
              { 
                title: 'تهدیدها (T)', 
                items: [
                  'بی‌اعتمادی اولیه به یک محصول بدون کاربر',
                  'احتمال ورود RescueTime یا Rize با نسخه فارسی',
                  'نوسانات شدید ارزی و کاهش قدرت خرید',
                  'تغییرات قوانین داده‌ها در ایران'
                ], 
                color: '#d29922' 
              },
            ].map((q, i) => (
              <div key={i} style={{
                padding: '20px', borderRadius: '12px',
                background: `${q.color}08`, border: `1px solid ${q.color}25`,
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: q.color, marginBottom: '12px' }}>{q.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {q.items.map((item, k) => (
                    <li key={k} style={{ fontSize: '13px', color: '#8b949e', padding: '4px 0', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: q.color, flexShrink: 0 }}>◆</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#8b949e', marginTop: '16px', textAlign: 'center' }}>
            این تحلیل با فرض MVP فعلی و عدم وجود کاربر تهیه شده است. هدف، جذب نخستین ۱۰۰ کاربر در ۳ ماه آینده است.
          </p>
        </div>

        {/* Project Sections Grid */}
        <ProjectExplorer onNavigate={onNavigate} />

        {/* Footer */}
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}