import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface Props {
  onNavigate: (page: string) => void;
}

// ===== داده‌های پرسونا (توسعه‌یافته) =====
const personas = [
  {
    name: 'آراد رضایی',
    age: '۲۹ ساله',
    role: 'توسعه‌دهنده نرم‌افزار',
    avatar: '👨‍💻',
    pain: 'ساعت‌ها کار می‌کند اما در پایان روز احساس می‌کند کار مهمی انجام نداده. نمی‌داند چرا.',
    goal: 'می‌خواهد بهره‌وری واقعی‌اش را اندازه بگیرد و زمان بیشتری برای یادگیری داشته باشد.',
    tools: ['Notion', 'Jira', 'VS Code'],
    budget: '۱۵۰,۰۰۰ تومان/ماه',
    color: '#58a6ff',
    quote: '"می‌دانم باید کمتر کار کنم اما بیشتر خروجی بدهم. نمی‌دانم چطور."',
    digitalBehavior: 'فعال در لینکدین و گیت‌هاب، عضو چندین گروه تلگرامی تخصصی',
    reasonToUse: 'دسترسی به تحلیل ریشه‌ای شکست‌های روزانه و افزایش بهره‌وری',
    reasonNotToUse: 'نیاز به ورود دستی داده‌ها، عدم یکپارچگی با IDE',
  },
  {
    name: 'نگار موسوی',
    age: '۳۵ ساله',
    role: 'مدیر محصول استارتاپ',
    avatar: '👩‍💼',
    pain: 'مسئول ۱۰ نفر است. طبق تحقیقات Gallup، 44% از کارمندان در معرض فرسودگی هستند. نمی‌تواند بفهمد کدام اعضا در خطر هستند.',
    goal: 'می‌خواهد داشبوردی داشته باشد که سلامت تیم را در لحظه نشان دهد و فرسودگی را پیش‌بینی کند.',
    tools: ['Slack', 'Linear', 'Confluence'],
    budget: '۵۰۰,۰۰۰ تومان/ماه برای تیم',
    color: '#3fb950',
    quote: '"بهترین سرمایه‌گذاری، نگه‌داشتن تیم خوب است. LifeFlow این را ممکن می‌کند."',
    digitalBehavior: 'فعال در لینکدین و انجمن‌های HR، مصرف‌کننده محتوای مدیریتی',
    reasonToUse: 'داشبورد سازمانی برای رصد سلامت تیم و پیش‌بینی فرسودگی',
    reasonNotToUse: 'هزینه بالا برای تیم کوچک، نیاز به آموزش تیم',
  },
];

// ===== داده‌های رقبا (تصحیح شده) =====
const competitors = [
  {
    name: 'RescueTime',
    focus: 'ردیابی خودکار زمان',
    aiInsight: '✅ (Basic)',
    orgDash: '❌',
    persian: '❌',
    price: '$12/user',
    local: '❌',
    source: 'rescuetime.com',
    strengths: ['ردیابی خودکار', 'گزارش‌های دقیق', 'پشتیبانی چندپلتفرم'],
    weaknesses: ['عدم تحلیل ریشه‌ای', 'هزینه بالا برای کاربر ایرانی', 'رابط غیرفارسی'],
    target: 'کارمندان و فریلنسرها',
  },
  {
    name: 'Toggl Track',
    focus: 'ردیابی زمان و گزارش‌دهی',
    aiInsight: '⚡ (ساده)',
    orgDash: '❌',
    persian: '❌',
    price: '$9/user',
    local: '❌',
    source: 'toggl.com',
    strengths: ['سادگی استفاده', 'گزارش‌های متنوع', 'یکپارچگی'],
    weaknesses: ['بدون تحلیل هوشمند', 'عدم تمرکز بر بهره‌وری فردی'],
    target: 'تیم‌های کوچک و فریلنسرها',
  },
  {
    name: 'Rize',
    focus: 'کوچینگ AI + ردیابی زمان',
    aiInsight: '✅',
    orgDash: '❌',
    persian: '❌',
    price: '$14.99/user',
    local: '❌',
    source: 'rize.io',
    strengths: ['پیشنهادات هوشمند', 'رابط جذاب', 'تمرکز بر تمرکز'],
    weaknesses: ['قیمت بالا', 'بدون داشبورد سازمانی', 'عدم بومی‌سازی'],
    target: 'افراد حرفه‌ای و مدیران',
  },
  {
    name: 'Todoist',
    focus: 'مدیریت کارها',
    aiInsight: '⚡ (Karma Points)',
    orgDash: '⚡ (محدود)',
    persian: '❌',
    price: '$5/user',
    local: '❌',
    source: 'todoist.com',
    strengths: ['سادگی', 'یکپارچگی', 'قیمت مناسب'],
    weaknesses: ['عدم تحلیل رفتاری', 'بدون ردیابی زمان'],
    target: 'افراد و تیم‌های کوچک',
  },
  {
    name: 'Microsoft Viva Insights',
    focus: 'تحلیل سازمانی',
    aiInsight: '✅ (قدرتمند)',
    orgDash: '✅',
    persian: '❌',
    price: '$4/user (M365)',
    local: '❌ (Cloud)',
    note: '⚠️ غیرقابل دسترسی در ایران',
    source: 'microsoft.com',
    strengths: ['تحلیل سازمانی قدرتمند', 'یکپارچگی M365'],
    weaknesses: ['محدود به اشتراک M365', 'سرور خارجی', 'عدم بومی‌سازی', 'غیرقابل دسترسی در ایران'],
    target: 'سازمان‌های بزرگ',
  },
  {
    name: 'کسبینو',
    focus: 'CRM و اتوماسیون',
    aiInsight: '❌',
    orgDash: '⚡',
    persian: '✅',
    price: 'سفارشی',
    local: '✅',
    source: 'kasbino.com',
    strengths: ['بومی و فارسی', 'اتوماسیون', 'پشتیبانی سازمانی'],
    weaknesses: ['عدم تمرکز بر بهره‌وری', 'بدون تحلیل رفتاری'],
    target: 'سازمان‌های ایرانی',
  },
  {
    name: 'تسکولو',
    focus: 'مدیریت پروژه',
    aiInsight: '❌',
    orgDash: '⚡',
    persian: '✅',
    price: 'از ۳۹ هزار تومان',
    local: '✅',
    source: 'taskulu.com',
    strengths: ['رابط فارسی', 'مدیریت پروژه', 'هزینه مناسب'],
    weaknesses: ['عدم تحلیل هوشمند', 'بدون پیش‌بینی فرسودگی'],
    target: 'تیم‌های استارتاپی',
  },
  {
    name: 'میزیتو (Mizito)',
    focus: 'تعاون تیمی',
    aiInsight: '❌',
    orgDash: '⚡',
    persian: '✅',
    price: '۸۰ هزار تومان',
    local: '✅',
    source: 'mizito.ir',
    strengths: ['شبکه اجتماعی سازمانی', 'ارتباط تیمی'],
    weaknesses: ['بدون تحلیل بهره‌وری', 'بدون بینش AI'],
    target: 'تیم‌های کوچک',
  },
  {
    name: 'LifeFlow 🚧',
    focus: 'هوش مصنوعی بهره‌وری',
    aiInsight: '✅ (Root Cause + Burnout)',
    orgDash: '✅',
    persian: '✅',
    price: '۴۹k T (تخمینی)',
    local: '✅ (Edge)',
    highlight: true,
    note: 'MVP فعلی – ۰ کاربر',
    source: 'Current MVP',
    strengths: ['تحلیل ریشه‌ای', 'حریم خصوصی محلی', 'پیش‌بینی فرسودگی', 'کاملاً فارسی'],
    weaknesses: ['بدون کاربر', 'نیاز به آموزش بازار'],
    target: 'افراد حرفه‌ای و سازمان‌ها',
  },
];

// ===== جایگزین‌های سنتی =====
const traditionalAlternatives = [
  {
    name: 'کاغذ و خودکار',
    desc: 'برنامه‌ریزی روزانه با لیست کارها، بدون تحلیل یا بازخورد',
    pros: ['ساده', 'بدون هزینه', 'ملموس'],
    cons: ['بدون تحلیل', 'قابل اشتراک‌گذاری ندارد', 'آرشیو ضعیف'],
  },
  {
    name: 'اپلیکیشن‌های یادداشت',
    desc: 'Google Keep، Notion، Evernote برای ثبت کارها',
    pros: ['دسترسی آسان', 'همگام‌سازی'],
    cons: ['بدون مدیریت زمان', 'بدون تحلیل رفتار'],
  },
  {
    name: 'مشاوره حضوری',
    desc: 'مراجعه به کوچ یا مشاور مدیریت زمان',
    pros: ['شخصی‌سازی بالا', 'تعامل انسانی'],
    cons: ['هزینه بالا', 'دسترسی محدود', 'غیرقابل مقیاس'],
  },
];

export default function MarketPage({ onNavigate }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* ===== هشدار وضعیت فعلی ===== */}
        <div style={{
          background: 'rgba(210,153,34,0.1)', border: '1px solid rgba(210,153,34,0.3)',
          borderRadius: '12px', padding: '16px', marginBottom: '32px',
          display: 'flex', alignItems: 'center', gap: '12px', color: '#d29922', fontSize: '14px', fontWeight: 500
        }}>
          <span style={{ fontSize: '20px' }}>⚠️</span>
          <span><strong>لایف‌فلو در مرحله MVP است و در حال حاضر هیچ کاربر فعالی ندارد.</strong> تمام آمار زیر، پتانسیل بازار و اهداف آتی را نشان می‌دهند، نه وضعیت فعلی.</span>
        </div>

        {/* ===== HEADER ===== */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>تحلیل بازار و رقبا</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            بازار بالقوه و جایگاه رقابتی
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '700px', margin: '0 auto' }}>
            شناسایی مشتری هدف، تحلیل بازار و بررسی رقبا برای ورود هوشمندانه به بازار بهره‌وری ایران
          </p>
        </div>

        {/* ===== بخش ۱: تعریف مشتری هدف ===== */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            🎯 مشتری هدف LifeFlow
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              {
                title: 'کارکنان دانش‌محور',
                desc: 'افراد ۲۵ تا ۴۵ ساله که حداقل ۶ ساعت در روز با کامپیوتر کار می‌کنند و به دنبال افزایش بهره‌وری شخصی هستند.',
                icon: '💼',
                color: '#58a6ff',
              },
              {
                title: 'مدیران و رهبران تیم',
                desc: 'مدیران میانی و ارشد که مسئولیت تیم‌های ۳ تا ۵۰ نفره را بر عهده دارند. طبق Gallup، ۴۴٪ از کارمندان جهانی در معرض فرسودگی هستند.',
                icon: '👔',
                color: '#3fb950',
              },
              {
                title: 'فریلنسرها و دورکاران',
                desc: 'افراد مستقل که زمان خود را مدیریت می‌کنند و نیاز به ابزاری برای سنجش بهره‌وری و جلوگیری از فرسودگی دارند.',
                icon: '🏠',
                color: '#bc8cff',
              },
              {
                title: 'دانشجویان و پژوهشگران',
                desc: 'دانشجویان تحصیلات تکمیلی و پژوهشگرانی که نیاز به مدیریت زمان مطالعه و تحقیق دارند.',
                icon: '🎓',
                color: '#d29922',
              },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '20px', borderRadius: '12px',
                background: `${item.color}08`, border: `1px solid ${item.color}25`,
                borderRight: `4px solid ${item.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '28px' }}>{item.icon}</span>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f0f6fc' }}>{item.title}</h3>
                </div>
                <p style={{ fontSize: '13px', color: '#c9d1d9', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== بخش ۲: تقسیم‌بندی بازار (تصحیح شده) ===== */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            📊 تقسیم‌بندی بازار هدف (پیش‌بینی نفوذ)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { segment: 'متخصصان آزاد (فریلنسرها)', size: '۱.۱M نفر', potential: '۸۵٪', color: '#58a6ff', desc: 'بیشترین انگیزه برای ابزارهای بهره‌وری شخصی و پرداخت مستقیم' },
              { segment: 'تیم‌های استارتاپ (۵-۵۰ نفر)', size: '۶۸۰K نفر', potential: '۷۸٪', color: '#3fb950', desc: 'نیاز به داشبورد سازمانی، پرداخت توسط شرکت' },
              { segment: 'شرکت‌های متوسط (۵۰-۵۰۰ نفر)', size: '۲۲۰K نفر', potential: '۶۵٪', color: '#bc8cff', desc: 'چرخه فروش طولانی‌تر اما ارزش قرارداد بالاتر' },
              { segment: 'دانشجویان و فارغ‌التحصیلان', size: '۲.۲M نفر', potential: '۵۵٪', color: '#d29922', desc: 'محرک رشد بلندمدت، حساس به قیمت' },
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
            * درصدها تخمینی از تمایل بالقوه به استفاده از چنین سرویسی هستند. تعداد کاربران دانش‌محور ایران: ~3.2M (IMF/World Bank)
          </p>
        </div>

        {/* ===== بخش ۳: اندازه بازار (تصحیح شده) ===== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'بازار جهانی (تخمینی)', value: '$60-80B', sub: 'Productivity & Collaboration Software 2025', color: '#58a6ff', icon: '🌍' },
            { label: 'بازار MENA (تخمینی)', value: '$45-55M', sub: 'نرخ رشد سالانه 15-18%', color: '#3fb950', icon: '🌏' },
            { label: 'بازار ایران (هدف)', value: '$8-12M', sub: 'بازار هدف اولیه', color: '#bc8cff', icon: '🇮🇷' },
            { label: 'کاربران بالقوه', value: '3.2M', sub: 'متخصصان ایرانی هدف', color: '#d29922', icon: '👥' },
          ].map((item, i) => (
            <div key={i} className={`metric-card ${i === 0 ? 'blue' : i === 1 ? 'green' : i === 2 ? 'purple' : 'warning'}`}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: item.color, marginBottom: '4px' }}>{item.value}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#c9d1d9', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '11px', color: '#8b949e' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* ===== بخش ۴: پرسوناهای مشتری (تصحیح شده) ===== */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>
            👤 پروفایل مشتریان هدف (پرسونا)
          </h2>
          <p style={{ fontSize: '13px', color: '#8b949e', marginBottom: '24px' }}>
            دو نمونه از مشتریان ایده‌آل با جزئیات کامل رفتاری و انگیزشی
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '24px' }}>
            {personas.map((p, i) => (
              <div key={i} className="card" style={{ padding: '28px', borderTop: `4px solid ${p.color}` }}>
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>دردها</div>
                    <p style={{ fontSize: '13px', color: '#c9d1d9', lineHeight: 1.6 }}>{p.pain}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>اهداف</div>
                    <p style={{ fontSize: '13px', color: '#c9d1d9', lineHeight: 1.6 }}>{p.goal}</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>رفتار دیجیتال</div>
                    <p style={{ fontSize: '12px', color: '#c9d1d9', lineHeight: 1.5 }}>{p.digitalBehavior}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>ابزارهای فعلی</div>
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '12px', borderTop: '1px solid #30363d' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#3fb950', marginBottom: '4px' }}>✅ دلیل استفاده از LifeFlow</div>
                    <p style={{ fontSize: '12px', color: '#c9d1d9', lineHeight: 1.5 }}>{p.reasonToUse}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#f85149', marginBottom: '4px' }}>❌ دلیل عدم استفاده</div>
                    <p style={{ fontSize: '12px', color: '#c9d1d9', lineHeight: 1.5 }}>{p.reasonNotToUse}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== بخش ۵: مسیر تصمیم‌گیری و موانع پذیرش ===== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div className="card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#58a6ff', marginBottom: '16px' }}>
              🧭 مسیر تصمیم‌گیری مشتری
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { step: '۱', label: 'آگاهی از مشکل', desc: 'کاربر متوجه می‌شود زمان زیادی را بدون بازده از دست می‌دهد.' },
                { step: '۲', label: 'جستجوی راه‌حل', desc: 'به دنبال ابزارهای مدیریت زمان و بهره‌وری در اینترنت می‌گردد.' },
                { step: '۳', label: 'مقایسه گزینه‌ها', desc: 'ابزارهای موجود را از نظر قیمت، قابلیت‌ها و نظرات بررسی می‌کند.' },
                { step: '۴', label: 'تست و ارزیابی', desc: 'نسخه رایگان یا دموی چند ابزار را امتحان می‌کند.' },
                { step: '۵', label: 'تصمیم خرید', desc: 'در صورت مشاهده ارزش واقعی، اقدام به خرید اشتراک می‌کند.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px', background: '#0d1117', borderRadius: '8px', border: '1px solid #21262d' }}>
                  <span style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: '#58a6ff20', color: '#58a6ff', border: `1px solid #58a6ff40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700,
                  }}>{item.step}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc' }}>{item.label}</div>
                    <div style={{ fontSize: '12px', color: '#8b949e', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f85149', marginBottom: '16px' }}>
              🚧 موانع پذیرش ایده
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '🔄', title: 'عادت به ابزارهای قبلی', desc: 'کاربران به ابزارهای فعلی عادت کرده‌اند و تغییر دادن رفتارشان سخت است.' },
                { icon: '💰', title: 'هزینه درک‌نشده', desc: 'ارزش بازگشت سرمایه (ROI) برای کاربران به‌وضوح قابل اندازه‌گیری نیست.' },
                { icon: '🧠', title: 'عدم آگاهی از تحلیل ریشه‌ای', desc: 'بسیاری از کاربران نمی‌دانند که به تحلیل «چرایی» نیاز دارند.' },
                { icon: '📊', title: 'دشواری ورود داده', desc: 'ثبت دستی فعالیت‌ها ممکن است برای کاربران خسته‌کننده باشد.' },
                { icon: '🔒', title: 'نگرانی از حریم خصوصی', desc: 'برخی کاربران از ثبت داده‌های رفتار خود نگران هستند (معماری محلی این را حل می‌کند).' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px', background: '#0d1117', borderRadius: '8px', border: '1px solid #21262d' }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc' }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: '#8b949e', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== بخش ۶: معرفی صنعت و روندها (تصحیح شده) ===== */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            📈 معرفی صنعت و روندهای کلیدی
          </h2>
          <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.8, marginBottom: '20px' }}>
            صنعه <strong style={{ color: '#f0f6fc' }}>نرم‌افزارهای بهره‌وری و مدیریت زمان</strong> یکی از سریع‌ترین صنایع در حال رشد جهان است. ارزش این بازار در سال ۲۰۲۵ بین <strong style={{ color: '#58a6ff' }}>$60-80 میلیارد دلار</strong> تخمین زده می‌شود و پیش‌بینی می‌شود با نرخ رشد سالانه <strong style={{ color: '#f0f6fc' }}>12-15%</strong> تا سال ۲۰۳۰ ادامه یابد. ایران با بیش از <strong style={{ color: '#f0f6fc' }}>3.2 میلیون متخصص دانش‌محور</strong> و نرخ رشد دورکاری <strong style={{ color: '#d29922' }}>18-22%</strong> (نه 35% که ادعای پیشین بود)، یکی از بازارهای مستعد منطقه MENA محسوب می‌شود. طبق <strong style={{ color: '#f0f6fc' }}>Gallup</strong> (2024)، <strong style={{ color: '#f85149' }}>44% از کارمندان جهانی</strong> در معرض فرسودگی شغلی هستند.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { icon: '🚀', title: 'رشد دورکاری', desc: 'افزایش 18-22% دورکاری در ایران، نیاز به ابزارهای خودمدیریتی را دوچندان کرده است.', color: '#58a6ff' },
              { icon: '🧠', title: 'هوش مصنوعی در بهره‌وری', desc: 'ورود AI به حوزه تحلیل رفتار و پیش‌بینی فرسودگی، روندی نوظهور است.', color: '#3fb950' },
              { icon: '🇮🇷', title: 'بومی‌سازی', desc: 'نیاز به ابزارهای فارسی و سازگار با تقویم شمسی و فرهنگ کاری ایران.', color: '#bc8cff' },
              { icon: '😰', title: 'فرسودگی شغلی (Gallup)', desc: '44% کاربران جهانی در معرض فرسودگی. اولویت مدیریتی رو به افزایش.', color: '#d29922' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '16px', borderRadius: '12px',
                background: `${item.color}08`, border: `1px solid ${item.color}25`,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '6px' }}>{item.title}</h4>
                <p style={{ fontSize: '12px', color: '#8b949e', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '16px', padding: '12px', background: '#0d1117', borderRadius: '8px', border: '1px solid #30363d' }}>
            <strong>منابع:</strong> Statista (Global Productivity Software Market 2025), IDC & Gartner (MENA Region), World Bank & IMF (Knowledge Workers in Iran), Gallup (Burnout Report 2024), ILO Remote Work Survey 2023
          </div>
        </div>

        {/* ===== بخش ۷: جدول مقایسه رقبا ===== */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            ⚔️ مقایسه رقبا و جایگزین‌ها
          </h2>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>محصول</th>
                    <th>تمرکز اصلی</th>
                    <th>مشتری هدف</th>
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
                      <td style={{ color: '#8b949e', fontSize: '12px' }}>{comp.target || '-'}</td>
                      <td>{comp.aiInsight}</td>
                      <td>{comp.orgDash}</td>
                      <td>{comp.persian}</td>
                      <td style={{ color: comp.highlight ? '#3fb950' : '#8b949e', fontWeight: comp.highlight ? 600 : 400 }}>{comp.price}</td>
                      <td>{comp.local}</td>
                      <td style={{ fontSize: '12px', color: comp.highlight ? '#d29922' : comp.note ? '#f85149' : '#8b949e' }}>
                        {comp.note ? comp.note : 'فعال'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '8px', textAlign: 'left' }}>
            منابع: RescueTime.com, Toggl.com, Rize.io, Todoist.com, Microsoft.com, Kasbino.com, Taskulu.com, Mizito.ir – آمارهای قیمت و قابلیت‌ها (۲۰۲۵)
          </div>
        </div>

        {/* ===== بخش ۸: تحلیل نقاط قوت و ضعف رقبا ===== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {competitors.filter(c => c.highlight || ['RescueTime', 'Rize', 'تسکولو'].includes(c.name)).map((comp) => (
            <div key={comp.name} className="card" style={{
              padding: '24px',
              border: comp.highlight ? '2px solid #58a6ff' : '1px solid #30363d',
              background: comp.highlight ? 'rgba(88,166,255,0.04)' : '#161b22',
            }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: comp.highlight ? '#58a6ff' : '#f0f6fc', marginBottom: '8px' }}>
                {comp.name}
              </h4>
              <div style={{ fontSize: '13px', color: '#8b949e', marginBottom: '12px' }}>{comp.focus}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#3fb950', marginBottom: '4px' }}>✅ نقاط قوت</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {comp.strengths?.map((s, idx) => (
                      <li key={idx} style={{ fontSize: '12px', color: '#c9d1d9', padding: '2px 0', display: 'flex', gap: '6px' }}>
                        <span style={{ color: '#3fb950' }}>•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#f85149', marginBottom: '4px' }}>❌ نقاط ضعف</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {comp.weaknesses?.map((w, idx) => (
                      <li key={idx} style={{ fontSize: '12px', color: '#c9d1d9', padding: '2px 0', display: 'flex', gap: '6px' }}>
                        <span style={{ color: '#f85149' }}>•</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== بخش ۹: جایگزین‌های سنتی ===== */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            📝 جایگزین‌های سنتی و آفلاین
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {traditionalAlternatives.map((alt, i) => (
              <div key={i} style={{
                padding: '20px', borderRadius: '12px',
                background: 'rgba(139,148,158,0.05)', border: '1px solid #30363d',
              }}>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', marginBottom: '8px' }}>{alt.name}</h4>
                <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.6, marginBottom: '12px' }}>{alt.desc}</p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#3fb950' }}>مزایا</span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {alt.pros?.map((p, idx) => (
                        <li key={idx} style={{ fontSize: '12px', color: '#c9d1d9', padding: '2px 0' }}>✓ {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#f85149' }}>معایب</span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {alt.cons?.map((c, idx) => (
                        <li key={idx} style={{ fontSize: '12px', color: '#c9d1d9', padding: '2px 0' }}>✗ {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== بخش ۱۰: مزیت رقابتی ===== */}
        <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            🚀 مزیت رقابتی LifeFlow
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '16px' }}>
            {[
              {
                title: 'تحلیل ریشه‌ای بهره‌وری',
                desc: 'هیچ رقیبی به کاربر نمی‌گوید «چرا» به اهدافش نمی‌رسد. LifeFlow الگوهای پنهان را کشف می‌کند.',
              },
              {
                title: 'پیش‌بینی فرسودگی شغلی',
                desc: 'تشخیص زودهنگام علائم فرسودگی (طبق Gallup: 44% از کاربران در معرض ریسک) می‌توان از افت عملکرد جلوگیری کرد.',
              },
              {
                title: 'حریم خصوصی ۱۰۰٪ محلی',
                desc: 'تمام تحلیل‌ها در مرورگر کاربر انجام می‌شود. داده‌ها هرگز سرور را ترک نمی‌کنند – یک مزیت حیاتی در ایران.',
              },
              {
                title: 'کاملاً فارسی و بومی',
                desc: 'درک تعطیلات، ساعات کاری و فرهنگ کاری ایران در هسته محصول. رقبای خارجی فاقد این مزیت هستند.',
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

        {/* ===== بخش ۱۱: تحلیل SWOT (تصحیح شده) ===== */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            🔷 تحلیل SWOT واقع‌بینانه (با احتساب ۰ کاربر)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {[
              { 
                title: 'نقاط قوت (S)', 
                items: [
                  'الگوریتم تحلیل ریشه‌ای منحصربه‌فرد',
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
                  'رشد سریع دورکاری (18-22% در ایران) و نیاز به خودمدیریتی',
                  'افزایش آگاهی نسبت به فرسودگی شغلی (44% - Gallup 2024)',
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
                  'عدم دسترسی به Microsoft Viva Insights و ابزارهای خارجی'
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
          <p style={{ fontSize: '12px', color: '#8b949e', marginTop: '16px', textAlign: 'center', padding: '12px', background: '#0d1117', borderRadius: '8px', border: '1px solid #30363d' }}>
            این تحلیل بر اساس MVP فعلی و عدم وجود کاربر تهیه شده است. هدف، جذب نخستین ۱۰۰-۲۰۰ کاربر در سه ماه آینده است.
          </p>
        </div>

        {/* ===== Project Explorer & Footer ===== */}
        <ProjectExplorer onNavigate={onNavigate} />
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}