import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PersonalDemoPage from './pages/PersonalDemoPage';
import OrgDemoPage from './pages/OrgDemoPage';
import IdeaPage from './pages/IdeaPage';
import MaturityPage from './pages/MaturityPage';
import ValuePage from './pages/ValuePage';
import BusinessModelPage from './pages/BusinessModelPage';
import MarketPage from './pages/MarketPage';
import RevenuePage from './pages/RevenuePage';
import RoadmapPage from './pages/RoadmapPage';
import MarketingPage from './pages/MarketingPage';

type Page =
  | 'home' | 'login'
  | 'idea' | 'maturity' | 'value'
  | 'business' | 'market' | 'competitor' | 'marketing' | 'revenue' | 'intermediation'
  | 'demo-personal' | 'demo-org'
  | 'roadmap' | 'docs';

const PAGES_WITHOUT_NAV: Page[] = ['login'];

function CompetitorPage({ onNavigate: _ }: { onNavigate: (p: string) => void }) {
  const comps = [
    { name: 'Todoist', logo: '✅', founded: '۲۰۰۷', users: '۳۰M', price: '$6/mo', strengths: ['رابط ساده', 'همگام‌سازی', 'دسترسی‌پذیری'], weaknesses: ['بدون AI', 'بدون تحلیل رفتار', 'فارسی ضعیف'], score: 65 },
    { name: 'Notion', logo: '📝', founded: '۲۰۱۶', users: '۲۰M', price: '$8/mo', strengths: ['همه‌کاره', 'قابل‌سازی', 'بانک دانش'], weaknesses: ['پیچیدگی بالا', 'بدون HR Analytics', 'کند'], score: 72 },
    { name: 'Toggl', logo: '⏱️', founded: '۲۰۱۳', users: '۵M', price: '$9/mo', strengths: ['ردیاب زمان دقیق', 'گزارش کار', 'تیمی'], weaknesses: ['فقط ردیابی', 'بدون بینش', 'UI قدیمی'], score: 58 },
    { name: 'Google Calendar', logo: '📅', founded: '۲۰۰۶', users: '500M', price: 'رایگان', strengths: ['رایگان', 'یکپارچه', 'قابل اعتماد'], weaknesses: ['تقویم محور', 'بدون تحلیل', 'بدون AI'], score: 40 },
    { name: 'LifeFlow', logo: '⚡', founded: '۱۴۰۵', users: '۱۲K+', price: '99K تومان', strengths: ['AI رفتاری', 'فارسی کامل', 'آفلاین', 'سازمانی', 'قیمت مناسب'], weaknesses: ['برند جدید', 'اکوسیستم کوچک‌تر'], score: 91, highlight: true },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-danger" style={{ marginBottom: '16px', display: 'inline-flex' }}>تحلیل رقبا</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>چشم‌انداز رقابتی</h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>مقایسه جامع LifeFlow با رقبای اصلی بازار</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {comps.map((comp, i) => (
            <div key={i} className="card" style={{
              padding: '24px', position: 'relative', overflow: 'hidden',
              border: comp.highlight ? '1px solid #58a6ff' : '1px solid #30363d',
              boxShadow: comp.highlight ? '0 0 30px rgba(88,166,255,0.15)' : 'none',
            }}>
              {comp.highlight && (
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#58a6ff', color: '#0d1117', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>
                  ما
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '32px' }}>{comp.logo}</span>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: comp.highlight ? '#58a6ff' : '#f0f6fc' }}>{comp.name}</h3>
                  <div style={{ fontSize: '11px', color: '#8b949e' }}>{comp.users} کاربر · {comp.price}</div>
                </div>
                <div style={{ marginRight: 'auto', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: comp.score >= 80 ? '#3fb950' : comp.score >= 60 ? '#d29922' : '#f85149' }}>{comp.score}</div>
                  <div style={{ fontSize: '10px', color: '#8b949e' }}>امتیاز</div>
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', color: '#3fb950', fontWeight: 600, marginBottom: '6px' }}>✓ نقاط قوت</div>
                {comp.strengths.map((s, k) => <div key={k} style={{ fontSize: '12px', color: '#8b949e', padding: '2px 0' }}>· {s}</div>)}
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#f85149', fontWeight: 600, marginBottom: '6px' }}>✗ نقاط ضعف</div>
                {comp.weaknesses.map((s, k) => <div key={k} style={{ fontSize: '12px', color: '#8b949e', padding: '2px 0' }}>· {s}</div>)}
              </div>
              <div style={{ marginTop: '16px', height: '6px', background: '#21262d', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${comp.score}%`, background: comp.score >= 80 ? '#3fb950' : comp.score >= 60 ? '#d29922' : '#f85149', borderRadius: '3px', transition: 'width 1s ease' }} />
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>🎯 موقعیت‌یابی رقابتی</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {[
              { title: 'LifeFlow vs Todoist', desc: 'Todoist task management است، LifeFlow behavioral intelligence. دو محصول کاملاً متفاوت.', color: '#58a6ff' },
              { title: 'LifeFlow vs Notion', desc: 'Notion همه‌چیز است اما هیچ‌چیز نیست. LifeFlow یک کار را عالی انجام می‌دهد: تحلیل بهره‌وری.', color: '#3fb950' },
              { title: 'LifeFlow vs Toggl', desc: 'Toggl زمان را ردیابی می‌کند. LifeFlow می‌گوید با آن زمان چه اتفاقی افتاده و چرا.', color: '#bc8cff' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '20px', borderRadius: '12px', background: `${item.color}08`, border: `1px solid ${item.color}25` }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: item.color, marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IntermediationPage({ onNavigate: _ }: { onNavigate: (p: string) => void }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-purple" style={{ marginBottom: '16px', display: 'inline-flex' }}>واسطه‌گری</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>تحلیل واسطه‌گری دیجیتال</h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>LifeFlow به عنوان یک پلتفرم واسط چه نقشی ایفا می‌کند؟</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {[
            {
              title: 'واسط اطلاعاتی',
              icon: '📊',
              color: '#58a6ff',
              desc: 'بین داده‌های رفتاری خام کاربر و بینش‌های قابل‌فهم و اقدام‌پذیر واسطه‌گری می‌کند. Information Asymmetry را کاهش می‌دهد.',
              roles: ['جمع‌آوری داده', 'پردازش هوشمند', 'بصری‌سازی', 'توصیه عملی'],
            },
            {
              title: 'واسط بهره‌وری',
              icon: '⚡',
              color: '#3fb950',
              desc: 'بین اهداف کاربر و واقعیت رفتار روزانه‌اش واسطه می‌شود. شکاف Intention-Action را پر می‌کند.',
              roles: ['Goal Setting', 'Progress Tracking', 'Gap Analysis', 'Action Planning'],
            },
            {
              title: 'واسط سازمانی',
              icon: '🏢',
              color: '#bc8cff',
              desc: 'بین مدیران و وضعیت واقعی تیم واسطه‌گری می‌کند. Visibility کامل بدون Micromanagement فراهم می‌کند.',
              roles: ['Real-time Monitoring', 'Burnout Detection', 'Resource Optimization', 'Decision Support'],
            },
          ].map((item, i) => (
            <div key={i} className="card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: item.color, marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.7, marginBottom: '16px' }}>{item.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {item.roles.map((role, k) => (
                  <div key={k} style={{ fontSize: '12px', color: '#c9d1d9', padding: '4px 8px', background: `${item.color}10`, borderRadius: '4px', border: `1px solid ${item.color}20` }}>
                    {role}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            🌐 اکوسیستم واسطه‌گری LifeFlow
          </h2>
          <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.9, marginBottom: '20px' }}>
            LifeFlow در مدل واسطه‌گری چندطرفه (Multi-sided Platform) فعالیت می‌کند که ارزش متقابل برای همه ذینفعان خلق می‌کند:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { role: 'کاربران شخصی', value: 'بهره‌وری بالاتر و سلامت بهتر', icon: '👤', color: '#58a6ff' },
              { role: 'سازمان‌ها', value: 'تیم سالم‌تر و سود بیشتر', icon: '🏢', color: '#3fb950' },
              { role: 'HR Managers', value: 'تصمیمات داده‌محور', icon: '👔', color: '#bc8cff' },
              { role: 'سرمایه‌گذاران', value: 'بازار رو‌به‌رشد ۱۲۰B دلاری', icon: '💰', color: '#d29922' },
            ].map((stakeholder, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '16px', background: '#0d1117', borderRadius: '10px', border: '1px solid #21262d' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stakeholder.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: stakeholder.color, marginBottom: '6px' }}>{stakeholder.role}</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>{stakeholder.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DocsPage({ onNavigate: _ }: { onNavigate: (p: string) => void }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>مستندات</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            مستندات فنی LifeFlow
          </h1>
        </div>

        {[
          {
            title: '🏗️ معماری پروژه',
            content: [
              { label: 'فریم‌ورک', value: 'React 18 + TypeScript + Vite' },
              { label: 'استایل', value: 'Tailwind CSS + Custom CSS Variables' },
              { label: 'ذخیره‌سازی', value: 'LocalStorage (Offline-First)' },
              { label: 'هوش مصنوعی', value: 'Rule-based AI Engine (بدون Backend)' },
              { label: 'نمودارها', value: 'Custom SVG Charts (بدون کتابخانه خارجی)' },
              { label: 'فونت', value: 'Vazirmatn (Persian Optimized)' },
            ],
          },
          {
            title: '📁 ساختار فایل‌ها',
            code: `src/
├── App.tsx                    # Router اصلی
├── index.css                  # سیستم طراحی
├── components/
│   └── Navbar.tsx             # ناوبری
├── pages/
│   ├── HomePage.tsx           # صفحه اصلی
│   ├── LoginPage.tsx          # ورود
│   ├── PersonalDemoPage.tsx   # دمو شخصی
│   ├── OrgDemoPage.tsx        # دمو سازمانی
│   ├── IdeaPage.tsx           # منشأ ایده
│   ├── MaturityPage.tsx       # بلوغ ایده
│   ├── ValuePage.tsx          # خلق ارزش
│   ├── BusinessModelPage.tsx  # مدل کسب‌وکار
│   ├── MarketPage.tsx         # بازار + رقبا
│   ├── MarketingPage.tsx      # بازاریابی
│   ├── RevenuePage.tsx        # درآمد
│   └── RoadmapPage.tsx        # نقشه راه
├── utils/
│   ├── storage.ts             # LocalStorage API
│   └── analytics.ts           # AI Engine
└── data/
    └── sampleData.ts          # داده‌های نمونه`,
          },
          {
            title: '🧠 موتور AI',
            content: [
              { label: 'نوع', value: 'Rule-based Behavioral Analysis' },
              { label: 'قوانین', value: '۸+ قانون رفتاری تخصصی' },
              { label: 'امتیازدهی', value: 'بهره‌وری، تمرکز، سلامت، اتلاف وقت' },
              { label: 'توصیه‌ها', value: 'شخصی‌سازی‌شده بر اساس الگوی کاربر' },
              { label: 'به‌روزرسانی', value: 'آنی با هر تغییر داده' },
            ],
          },
        ].map((section, i) => (
          <div key={i} className="card" style={{ marginBottom: '20px', padding: '28px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc', marginBottom: '16px' }}>{section.title}</h2>
            {'content' in section ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                {section.content?.map((item, k) => (
                  <div key={k} style={{ display: 'flex', gap: '10px', padding: '10px', background: '#0d1117', borderRadius: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#8b949e', minWidth: '100px' }}>{item.label}:</span>
                    <span style={{ fontSize: '12px', color: '#c9d1d9' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <pre style={{
                background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px',
                padding: '16px', fontSize: '12px', color: '#8b949e', overflow: 'auto',
                fontFamily: 'monospace', lineHeight: 1.6,
              }}>
                {section.code}
              </pre>
            )}
          </div>
        ))}

        {/* About */}
        <div style={{
          padding: '28px', borderRadius: '16px',
          background: 'rgba(88,166,255,0.06)', border: '1px solid rgba(88,166,255,0.2)',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc', marginBottom: '12px' }}>👨‍💻 درباره توسعه‌دهنده</h2>
          <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.8 }}>
            <strong style={{ color: '#f0f6fc' }}>محمدیاسین بریدلقمانی طوسی</strong><br />
            شماره دانشجویی: ۴۰۲۲۲۳۷۳<br />
            LifeFlow – خرداد ۱۴۰۵
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Check URL hash for deep linking
    const hash = window.location.hash.replace('#', '');
    if (hash) navigate(hash);
  }, []);

  const showNav = !PAGES_WITHOUT_NAV.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={navigate} />;
      case 'login': return <LoginPage onNavigate={navigate} />;
      case 'demo-personal': return <PersonalDemoPage onNavigate={navigate} />;
      case 'demo-org': return <OrgDemoPage onNavigate={navigate} />;
      case 'idea': return <IdeaPage onNavigate={navigate} />;
      case 'maturity': return <MaturityPage onNavigate={navigate} />;
      case 'value': return <ValuePage onNavigate={navigate} />;
      case 'business': return <BusinessModelPage onNavigate={navigate} />;
      case 'market': return <MarketPage onNavigate={navigate} />;
      case 'competitor': return <CompetitorPage onNavigate={navigate} />;
      case 'marketing': return <MarketingPage onNavigate={navigate} />;
      case 'revenue': return <RevenuePage onNavigate={navigate} />;
      case 'intermediation': return <IntermediationPage onNavigate={navigate} />;
      case 'roadmap': return <RoadmapPage onNavigate={navigate} />;
      case 'docs': return <DocsPage onNavigate={navigate} />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', color: '#c9d1d9', fontFamily: 'Vazirmatn, system-ui, sans-serif', direction: 'rtl' }}>
      {showNav && <Navbar currentPage={currentPage} onNavigate={navigate} />}
      <main>{renderPage()}</main>
    </div>
  );
}
