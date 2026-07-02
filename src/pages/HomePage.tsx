import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const features = [
  {
    icon: '🧠',
    title: 'هوش مصنوعی رفتاری',
    desc: 'الگوهای پنهان رفتار شما را کشف می‌کند و دلایل عدم موفقیت در اهداف را شناسایی می‌کند.',
    color: '#58a6ff',
  },
  {
    icon: '⏱️',
    title: 'تحلیل نشت زمان',
    desc: 'دقیقاً مشخص می‌کند کجا زمان شما بدون بازده مصرف می‌شود و چطور بازپس‌گیری کنید.',
    color: '#3fb950',
  },
  {
    icon: '🔥',
    title: 'تشخیص فرسودگی',
    desc: 'قبل از آنکه فرسودگی شغلی رخ دهد، نشانه‌های اولیه را شناسایی و هشدار می‌دهد.',
    color: '#f85149',
  },
  {
    icon: '🎯',
    title: 'بهینه‌سازی تمرکز',
    desc: 'بهترین ساعات روز برای کار عمیق، خلاقیت و جلسات را پیش‌بینی می‌کند.',
    color: '#bc8cff',
  },
  {
    icon: '📊',
    title: 'داشبورد سازمانی',
    desc: 'مدیران می‌توانند بهره‌وری تیم را رصد کرده و منابع را بهینه تخصیص دهند.',
    color: '#d29922',
  },
  {
    icon: '🔒',
    title: 'حریم خصوصی اول',
    desc: 'تمام داده‌ها روی دستگاه شما ذخیره می‌شوند. هیچ اطلاعاتی به سرور ارسال نمی‌شود.',
    color: '#3fb950',
  },
];

const stats = [
  { value: '+حدود 40%', label: 'افزایش بهره‌وری', icon: '📈' },
  { value: 'چندین ساعت', label: 'صرفه‌جویی روزانه', icon: '⏰' },
  { value: 'حدود 50%', label: 'کاهش استرس', icon: '😌' },
  { value: '...', label: 'کاربر فعال', icon: '👥' },
];

const testimonials = [
  {
    name: 'دکتر رضا احمدی',
    role: 'مدیرعامل استارتاپ',
    avatar: '👨‍💼',
    text: 'LifeFlow متحول‌کننده بود. برای اولین بار فهمیدم چرا با وجود ۱۲ ساعت کار روزانه، احساس پیشرفت نمی‌کردم. الگوی کاری‌ام کاملاً بازطراحی شد.',
    stars: 5,
    company: 'Tech Iran',
  },
  {
    name: 'سارا ملکی',
    role: 'رهبر تیم مهندسی',
    avatar: '👩‍💻',
    text: 'داشبورد سازمانی LifeFlow به ما کمک کرد قبل از وقوع فرسودگی، آن را در تیم شناسایی کنیم. بهره‌وری کل تیم ۳۸٪ افزایش یافت.',
    stars: 5,
    company: 'TechTeam Co',
  },
  {
    name: 'محمد کریمی',
    role: 'فریلنسر ارشد',
    avatar: '🧑‍🎨',
    text: 'گزارش‌های هوشمند LifeFlow مثل داشتن یک مربی شخصی است که ۲۴ ساعته رفتارت را تحلیل می‌کند و راهنمایی‌های واقعی می‌دهد.',
    stars: 5,
    company: 'Freelance Pro',
  },
];


export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Layered background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(88, 166, 255, 0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(188, 140, 255, 0.07) 0%, transparent 60%),
            radial-gradient(ellipse 70% 60% at 50% 100%, rgba(63, 185, 80, 0.04) 0%, transparent 60%)
          `,
        }} />
        
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage: `
            linear-gradient(rgba(48, 54, 61, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(48, 54, 61, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 80% at center, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at center, black 30%, transparent 100%)',
        }} />

        {/* Floating dots */}
        {[
          { top: '15%', right: '12%', size: 6, color: '#58a6ff', opacity: 0.6 },
          { top: '25%', left: '8%', size: 4, color: '#bc8cff', opacity: 0.5 },
          { top: '60%', right: '8%', size: 8, color: '#3fb950', opacity: 0.4 },
          { top: '75%', left: '15%', size: 5, color: '#58a6ff', opacity: 0.5 },
          { top: '40%', right: '25%', size: 3, color: '#d29922', opacity: 0.4 },
        ].map((dot, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: dot.top,
            ...(dot.right ? { right: dot.right } : {}),
            ...(dot.left ? { left: dot.left } : {}),
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            borderRadius: '50%',
            background: dot.color,
            opacity: dot.opacity,
            boxShadow: `0 0 ${dot.size * 3}px ${dot.color}`,
            animation: `pulse-glow ${2 + i * 0.5}s ease-in-out infinite`,
          }} />
        ))}

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '920px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.25)',
            borderRadius: '20px', padding: '6px 18px', marginBottom: '36px',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#3fb950', display: 'inline-block', boxShadow: '0 0 8px #3fb950', animation: 'pulse-glow 2s infinite' }} />
            <span style={{ fontSize: '13px', color: '#79b8ff', fontWeight: 500 }}>نسخه ۱.۰ – در دسترس – خرداد ۱۴۰۵</span>
          </div>

          {/* Main heading */}
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '28px', color: '#f0f6fc', letterSpacing: '-1px' }}>
            بهره‌وری را{' '}
            <span style={{
              background: 'linear-gradient(135deg, #58a6ff 30%, #bc8cff 70%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'inline-block',
            }}>
              هوشمند
            </span>
            {' '}کنید
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#8b949e', maxWidth: '680px', margin: '0 auto 52px', lineHeight: 1.8 }}>
            LifeFlow الگوهای رفتاری پنهان شما را کشف می‌کند. دلیل شکست اهداف، نشت زمان، ریسک فرسودگی و کیفیت تمرکز را با هوش مصنوعی تحلیل کنید.
          </p>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
            <button
              onClick={() => onNavigate('login')}
              style={{
                padding: '14px 32px', fontSize: '16px', fontWeight: 700, borderRadius: '12px',
                background: '#58a6ff', color: '#0d1117', border: 'none', cursor: 'pointer',
                fontFamily: 'Vazirmatn, sans-serif', display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.3s', boxShadow: '0 0 20px rgba(88,166,255,0.4)',
              }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 30px rgba(88,166,255,0.5)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(88,166,255,0.4)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              شروع رایگان
            </button>
            <button
              onClick={() => onNavigate('demo-personal')}
              style={{
                padding: '14px 32px', fontSize: '16px', fontWeight: 600, borderRadius: '12px',
                background: 'transparent', color: '#c9d1d9', border: '1px solid #30363d', cursor: 'pointer',
                fontFamily: 'Vazirmatn, sans-serif', display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.3s',
              }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = '#58a6ff'; (e.currentTarget as HTMLElement).style.color = '#58a6ff'; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = '#30363d'; (e.currentTarget as HTMLElement).style.color = '#c9d1d9'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              مشاهده دمو زنده
            </button>
          </div>

          {/* Terminal-style preview */}
          <div style={{
            background: '#161b22', border: '1px solid #30363d', borderRadius: '16px',
            overflow: 'hidden', maxWidth: '720px', margin: '0 auto',
            boxShadow: '0 20px 80px rgba(0,0,0,0.6)',
          }}>
            {/* Window chrome */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #21262d', background: '#0d1117' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f85149' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#d29922' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3fb950' }} />
              </div>
              <span style={{ fontSize: '12px', color: '#8b949e', margin: '0 auto' }}>LifeFlow AI Engine</span>
            </div>
            {/* Content */}
            <div style={{ padding: '20px 24px', textAlign: 'right' }}>
              {[
                { label: '> تحلیل الگوی رفتاری', color: '#58a6ff', delay: '0s' },
                { label: '✓ نشت زمان شناسایی شد: ۲.۸ ساعت/روز در شبکه اجتماعی', color: '#3fb950', delay: '0.3s' },
                { label: '⚠ هشدار فرسودگی: کار بیش از ۱۰ ساعت در ۳ روز متوالی', color: '#d29922', delay: '0.6s' },
                { label: '💡 پیشنهاد: بهترین زمان کار عمیق شما ۱۰-۱۲ صبح است', color: '#bc8cff', delay: '0.9s' },
                { label: '📊 امتیاز بهره‌وری این هفته: ۷۸/۱۰۰ (↑۱۲٪)', color: '#c9d1d9', delay: '1.2s' },
              ].map((line, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', animation: `fadeIn 0.5s ease ${line.delay} both` }}>
                  <span style={{ fontSize: '13px', color: line.color, fontFamily: 'monospace', lineHeight: 1.5 }}>{line.label}</span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <span style={{ fontSize: '13px', color: '#58a6ff', fontFamily: 'monospace' }}>{'>'}</span>
                <span style={{ width: '8px', height: '16px', background: '#58a6ff', animation: 'pulse-glow 1s infinite', borderRadius: '1px' }} />
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex' }}>
              {['👨‍💼', '👩‍💻', '🧑‍🎨', '👩‍🔬', '👨‍💻'].map((avatar, i) => (
                <div key={i} style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: `hsl(${200 + i * 25}, 50%, 35%)`,
                  border: '2px solid #0d1117',
                  marginLeft: i === 0 ? 0 : '-10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', zIndex: 5 - i, position: 'relative',
                }}>
                  {avatar}
                </div>
              ))}
            </div>
            <span style={{ fontSize: '14px', color: '#8b949e' }}>
              <span style={{ color: '#f0f6fc', fontWeight: 700 }}>مناسب</span> تیم و فرد حرفه‌ای
            </span>
            <div style={{ display: 'flex', gap: '2px' }}>
              {Array(5).fill(0).map((_, i) => <span key={i} style={{ color: '#d29922', fontSize: '16px' }}>★</span>)}
            </div>
            <span style={{ fontSize: '13px', color: '#8b949e' }}>۴.۹/۵</span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ padding: '50px 24px', borderTop: '1px solid #21262d', borderBottom: '1px solid #21262d', background: '#0d1117' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>{stat.icon}</div>
              <div style={{ fontSize: '34px', fontWeight: 900, color: '#58a6ff', marginBottom: '4px', letterSpacing: '-1px' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#8b949e' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(88,166,255,0.1)', border: '1px solid rgba(88,166,255,0.25)', borderRadius: '20px', padding: '5px 14px', fontSize: '12px', color: '#58a6ff', fontWeight: 600, marginBottom: '16px' }}>
            قابلیت‌های کلیدی
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            فراتر از ابزارهای معمول بهره‌وری
          </h2>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '580px', margin: '0 auto', lineHeight: 1.8 }}>
            LifeFlow اولین پلتفرمی است که نه فقط فعالیت شما را ثبت، بلکه الگوهای عمیق رفتاری را تحلیل می‌کند.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {features.map((feature, i) => (
            <div
              key={i}
              style={{
                background: '#161b22', border: '1px solid #30363d', borderRadius: '16px',
                padding: '28px', position: 'relative', overflow: 'hidden',
                transition: 'all 0.3s ease', cursor: 'default',
              }}
              onMouseOver={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = feature.color + '60';
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = `0 12px 40px ${feature.color}15`;
              }}
              onMouseOut={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = '#30363d';
                el.style.transform = 'none';
                el.style.boxShadow = 'none';
              }}
            >
              <div style={{
                position: 'absolute', top: 0, right: 0, left: 0, height: '2px',
                background: `linear-gradient(90deg, ${feature.color}, transparent)`,
              }} />
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: `${feature.color}12`, border: `1px solid ${feature.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '26px', marginBottom: '18px',
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc', marginBottom: '10px' }}>{feature.title}</h3>
              <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.75 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid #21262d', borderBottom: '1px solid #21262d' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '48px', letterSpacing: '-0.5px' }}>
            چطور کار می‌کند؟
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {[
              { step: '۰۱', title: 'ثبت فعالیت', desc: 'فعالیت‌های روزانه‌تان را در چند ثانیه ثبت کنید', icon: '📝', color: '#58a6ff' },
              { step: '۰۲', title: 'تحلیل هوشمند', desc: 'AI الگوهای رفتاری شما را به‌صورت لحظه‌ای تحلیل می‌کند', icon: '🧠', color: '#bc8cff' },
              { step: '۰۳', title: 'دریافت بینش', desc: 'بینش‌های عملی و قابل اجرا دریافت کنید', icon: '💡', color: '#3fb950' },
              { step: '۰۴', title: 'رشد مداوم', desc: 'با هر روز استفاده، توصیه‌ها دقیق‌تر می‌شوند', icon: '🚀', color: '#d29922' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '18px', margin: '0 auto 16px',
                  background: `${item.color}12`, border: `1px solid ${item.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px',
                }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: item.color, letterSpacing: '2px', marginBottom: '8px' }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{
          maxWidth: '960px', margin: '0 auto', padding: '60px',
          background: 'linear-gradient(135deg, rgba(88,166,255,0.07), rgba(188,140,255,0.07))',
          border: '1px solid rgba(88,166,255,0.18)',
          borderRadius: '28px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(88,166,255,0.08), transparent)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-60px', right: '-40px', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(188,140,255,0.06), transparent)', borderRadius: '50%' }} />
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 44px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px', letterSpacing: '-0.5px', position: 'relative', zIndex: 1 }}>
            همین امروز شروع کنید
          </h2>
          <p style={{ fontSize: '16px', color: '#8b949e', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
            بدون نیاز به کارت بانکی. دو نوع داشبورد کاملاً کاربردی آماده است.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <button
              onClick={() => onNavigate('demo-personal')}
              style={{
                padding: '14px 28px', borderRadius: '12px', border: 'none',
                background: '#58a6ff', color: '#0d1117', cursor: 'pointer',
                fontFamily: 'Vazirmatn, sans-serif', fontSize: '15px', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
              }}
            >
              👤 دمو شخصی
            </button>
            <button
              onClick={() => onNavigate('demo-org')}
              style={{
                padding: '14px 28px', borderRadius: '12px', border: '1px solid #30363d',
                background: 'transparent', color: '#c9d1d9', cursor: 'pointer',
                fontFamily: 'Vazirmatn, sans-serif', fontSize: '15px', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
              }}
            >
              🏢 دمو سازمانی
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid #21262d' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '12px', letterSpacing: '-0.5px' }}>
              کاربران می‌گویند
            </h2>
            <p style={{ fontSize: '14px', color: '#8b949e' }}>تجربه واقعی افرادی که با LifeFlow متحول شدند</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background: '#161b22', border: '1px solid #30363d', borderRadius: '16px', padding: '28px',
                transition: 'all 0.3s',
              }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                  {Array(t.stars).fill(0).map((_, s) => (
                    <span key={s} style={{ color: '#d29922', fontSize: '16px' }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.85, marginBottom: '20px', fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #58a6ff, #bc8cff)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f6fc' }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: '#8b949e' }}>{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Sections Grid */}
      <ProjectExplorer onNavigate={onNavigate} />

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
