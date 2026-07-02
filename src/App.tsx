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
import React from 'react';
import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";
import ReactMarkdown from 'react-markdown';


type Page =
  | 'home' | 'login'
  | 'idea' | 'maturity' | 'value'
  | 'business' | 'market' | 'competitor' | 'marketing' | 'revenue' | 'intermediation'
  | 'demo-personal' | 'demo-org'
  | 'roadmap' | 'docs';

const PAGES_WITHOUT_NAV: Page[] = ['login'];

function CompetitorPage({ onNavigate: _ }: { onNavigate: (p: string) => void }) {
    const allComps = [
    {
      name: 'LifeFlow (MVP)',
      category: 'Predictive Behavior Intelligence',
      logo: '⚡',
      status: '۰ کاربر (در حال توسعه)',
      price: '۴۹,۰۰۰ تومان',
      score: 96,
      similarity: 100,
      strengths: ['پیش‌بینی شکست اهداف قبل از وقوع', 'تحلیل ریشه‌ای (Root Cause)', 'حریم خصوصی ۱۰۰٪ محلی (Edge AI)'],
      weaknesses: ['برند نوپا', 'فقدان دیتای اولیه کاربران'],
      highlight: true,
      tier: 'primary'
    },
    {
      name: 'Rize.io',
      category: 'AI Productivity Tracker',
      logo: '🧠',
      status: '۳۰۰K+ کاربر فعال',
      price: '$۱۶.۹۹ / ماه',
      score: 89,
      similarity: 90,
      strengths: ['ردیابی خودکار دقیق', 'تحلیل عمیق تمرکز (Deep Work)', 'رابط کاربری بسیار جذاب'],
      weaknesses: ['قیمت بالا برای کاربر ایرانی', 'عدم تحلیل علل رفتاری'],
      tier: 'primary'
    },
    {
      name: 'Motion',
      category: 'AI Auto-Scheduling',
      logo: '📅',
      status: '۸۰K+ کاربر',
      price: '$۱۹ / ماه',
      score: 84,
      similarity: 80,
      strengths: ['برنامه‌ریزی خودکار تقویم', 'استفاده عالی از الگوریتم‌ها', 'صرفه‌جویی در زمان جلسات'],
      weaknesses: ['هزینه بسیار سنگین', 'عدم بومی‌سازی تقویم شمسی'],
      tier: 'primary'
    },
    {
      name: 'Reclaim.ai',
      category: 'AI Calendar Assistant',
      logo: '🔄',
      status: '۲۰۰K+ کاربر',
      price: '$۱۰ / ماه',
      score: 80,
      similarity: 75,
      strengths: ['ایجاد تعادل کار و زندگی', 'محافظت از زمان تمرکز', 'ادغام عالی با Google Calendar'],
      weaknesses: ['فقط محدود به تقویم', 'بدون تحلیل رفتار نرم‌افزاری'],
      tier: 'primary'
    },
    {
      name: 'RescueTime',
      category: 'Time Analytics',
      logo: '⏳',
      status: '۲M+ کاربر',
      price: '$۱۲ / ماه',
      score: 70,
      similarity: 70,
      strengths: ['بلاک کردن حواس‌پرتی‌ها', 'سابقه طولانی و دیتای قوی', 'پشتیبانی از تمام پلتفرم‌ها'],
      weaknesses: ['تحلیل‌های سطحی و قدیمی', 'عدم ارائه راهکار هوشمند'],
      tier: 'secondary'
    },
    {
      name: 'Endel',
      category: 'Neuroscience Focus',
      logo: '🎵',
      status: '۳M+ نصب',
      price: '$۹.۹۹ / ماه',
      score: 76,
      similarity: 50,
      strengths: ['ایجاد تمرکز با صدا (Soundscape)', 'پایه علمی و بیومتریک', 'تجربه کاربری فوق‌العاده'],
      weaknesses: ['فقط ابزار کمکی است', 'مدیریت تسک ندارد'],
      tier: 'secondary'
    },
    {
      name: 'Microsoft Viva',
      category: 'Employee Experience',
      logo: '🪁',
      status: 'Enterprise Only',
      price: '$۴ / کاربر (M365)',
      score: 78,
      similarity: 45,
      strengths: ['تحلیل سلامت سازمانی', 'یکپارچگی با Teams', 'داده‌های بزرگ (Big Data)'],
      weaknesses: ['عدم دسترسی برای فریلنسرها', 'تمرکز بر مانیتورینگ مدیریت'],
      tier: 'secondary'
    },
    {
      name: 'ClickUp',
      category: 'Work OS',
      logo: '🟣',
      status: '۱۲M+ کاربر',
      price: '$۱۲ / ماه',
      score: 82,
      similarity: 35,
      strengths: ['یک ابزار برای همه کارها', 'امکانات بی‌پایان سفارشی‌سازی', 'AI داخلی برای متن'],
      weaknesses: ['کندی سرعت (Performance)', 'منحنی یادگیری سخت'],
      tier: 'secondary'
    },
    {
      name: 'Jira (Atlassian)',
      category: 'Project Management',
      logo: '🔷',
      status: '۳۵۰K+ سازمان',
      price: '$۸.۵۰ / کاربر',
      score: 75,
      similarity: 30,
      strengths: ['استاندارد جهانی مدیریت پروژه', 'یکپارچگی با تمام ابزارها', 'مناسب برای سازمان‌های بزرگ'],
      weaknesses: ['پیچیدگی بیش از حد', 'عدم تمرکز بر سلامت فردی'],
      tier: 'secondary'
    },
    {
      name: 'تسکولو (Taskulu)',
      category: 'Local Project Management',
      logo: '📋',
      status: '۱۲۰K+ کاربر ایرانی',
      price: '۴۹,۰۰۰ تومان',
      score: 64,
      similarity: 25,
      strengths: ['رابط فارسی عالی', 'سرورهای داخل کشور', 'سادگی برای تیم‌های کوچک'],
      weaknesses: ['فقدان هوش مصنوعی پیشرفته', 'گزارش‌های سنتی و دستی'],
      tier: 'secondary'
    },
    {
      name: 'میزیتو (Mizito)',
      category: 'Social Project Management',
      logo: '🤝',
      status: '۹۰K+ کاربر ایرانی',
      price: '۸۵,۰۰۰ تومان',
      score: 62,
      similarity: 20,
      strengths: ['ساختار شبکه اجتماعی', 'مناسب برای پیگیری سریع', 'اپلیکیشن موبایل بومی'],
      weaknesses: ['عدم تحلیل بهره‌وری تخصصی', 'بدون موتور پیش‌بین'],
      tier: 'secondary'
    },
    {
      name: 'کسبینو',
      category: 'Business Process',
      logo: '🏢',
      status: 'Enterprise',
      price: 'سفارشی',
      score: 58,
      similarity: 15,
      strengths: ['اتوماسیون اداری', 'CRM داخلی', 'پشتیبانی دولتی/سازمانی'],
      weaknesses: ['رابط کاربر قدیمی', 'فقدان دیدگاه Productivity'],
      tier: 'secondary'
    }
  ];
const getSimColor = (sim: number) => sim >= 80 ? '#3fb950' : sim >= 60 ? '#58a6ff' : '#8b949e';
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px 60px' }}>
        
        {/* هدر صفحه */}
{/* ===== چشم‌انداز رقبا (کارت‌های خلاصه با Hover) ===== */}
<div style={{ marginBottom: '40px' }}>
  <div style={{ textAlign: 'center', marginBottom: '56px' }}>
    <span className="badge badge-danger" style={{ marginBottom: '16px', display: 'inline-flex' }}>تحلیل جامع اکوسیستم ۲۰۲۶</span>
    <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#f0f6fc', marginBottom: '16px' }}>
      چشم‌انداز رقبا
    </h1>
    <p style={{ fontSize: '18px', color: '#8b949e', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
      مقایسه <span style={{ color: '#58a6ff' }}>{allComps.length} رقیب کلیدی</span> بر اساس شباهت استراتژیک و قابلیت‌های فنی با LifeFlow
    </p>
  </div>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '24px',
    marginBottom: '60px'
  }}>
    {allComps.map((comp, i) => {
      const [isHovered, setIsHovered] = React.useState(false);
      const simColor = getSimColor(comp.similarity);
      
      return (
        <div
          key={i}
          className="card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            padding: '28px',
            position: 'relative',
            border: comp.highlight ? '2px solid #58a6ff' : '1px solid #30363d',
            background: comp.highlight ? 'rgba(88,166,255,0.05)' : '#161b22',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            transition: 'all 0.3s ease',
            cursor: 'default',
            transform: isHovered ? 'translateY(-4px)' : 'none',
            boxShadow: isHovered ? '0 8px 30px rgba(88,166,255,0.15)' : 'none',
          }}
        >
          {/* برچسب "محصول ما" */}
          {comp.highlight && (
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '24px',
              background: 'linear-gradient(135deg, #58a6ff, #bc8cff)',
              color: '#0d1117',
              padding: '4px 14px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 900,
              boxShadow: '0 4px 12px rgba(88,166,255,0.3)',
            }}>
              محصول ما (Proposed)
            </div>
          )}

          {/* ردیف اول: لوگو، نام و امتیاز */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{
                fontSize: '28px',
                background: '#0d1117',
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #30363d',
              }}>
                {comp.logo}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#f0f6fc', margin: 0 }}>
                  {comp.name}
                </h3>
                <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '2px' }}>
                  {comp.category}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: simColor }}>
                {comp.score}
              </div>
              <div style={{ fontSize: '10px', color: '#6e7681', letterSpacing: '1px' }}>SCORE</div>
            </div>
          </div>

          {/* بخش شباهت رفتاری */}
          <div style={{
            background: '#0d1117',
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid #21262d',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '12px', color: '#8b949e' }}>شباهت استراتژیک:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '80px', height: '6px', background: '#21262d', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  width: `${comp.similarity}%`,
                  height: '100%',
                  background: simColor,
                  borderRadius: '3px',
                }} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: simColor, minWidth: '35px' }}>
                {comp.similarity}%
              </span>
            </div>
          </div>

          {/* برچسب‌های وضعیت و قیمت */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '6px',
              background: '#21262d',
              color: '#c9d1d9',
              border: '1px solid #30363d',
            }}>
              👥 {comp.status}
            </span>
            <span style={{
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '6px',
              background: 'rgba(63,185,80,0.1)',
              color: '#3fb950',
              border: '1px solid rgba(63,185,80,0.2)',
            }}>
              💰 {comp.price}
            </span>
          </div>

          {/* نقاط قوت و ضعف - نمایش خلاصه به صورت پیش‌فرض، کامل روی هاور */}
          <div style={{ marginTop: '4px' }}>
            <div style={{
              display: 'flex',
              gap: '16px',
              flexDirection: isHovered ? 'column' : 'row',
              transition: 'all 0.3s ease',
            }}>
              {/* نقاط قوت */}
              <div style={{ flex: 1 }}>
                <div style={{
                  color: '#3fb950',
                  fontWeight: 800,
                  fontSize: '12px',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span>✓</span> نقاط قوت (Strengths)
                </div>
                {isHovered ? (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {comp.strengths.map((s, idx) => (
                      <li key={idx} style={{
                        fontSize: '13px',
                        color: '#c9d1d9',
                        marginBottom: '6px',
                        paddingRight: '12px',
                        position: 'relative',
                        lineHeight: 1.5,
                      }}>
                        <span style={{ position: 'absolute', right: 0, color: '#3fb950' }}>•</span> {s}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.6 }}>
                    {comp.strengths.slice(0, 2).join(' • ')}
                    {comp.strengths.length > 2 && (
                      <span style={{ color: '#58a6ff', marginRight: '4px' }}> …</span>
                    )}
                  </div>
                )}
              </div>

              {/* نقاط ضعف */}
              <div style={{ flex: 1 }}>
                <div style={{
                  color: '#f85149',
                  fontWeight: 800,
                  fontSize: '12px',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span>✗</span> نقاط ضعف (Weaknesses)
                </div>
                {isHovered ? (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {comp.weaknesses.map((w, idx) => (
                      <li key={idx} style={{
                        fontSize: '13px',
                        color: '#8b949e',
                        marginBottom: '6px',
                        paddingRight: '12px',
                        position: 'relative',
                        lineHeight: 1.5,
                      }}>
                        <span style={{ position: 'absolute', right: 0, color: '#f85149' }}>•</span> {w}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.6 }}>
                    {comp.weaknesses.slice(0, 2).join(' • ')}
                    {comp.weaknesses.length > 2 && (
                      <span style={{ color: '#58a6ff', marginRight: '4px' }}> …</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* راهنمای هاور */}
            <div style={{
              marginTop: '14px',
              paddingTop: '12px',
              borderTop: '1px solid #21262d',
              fontSize: '11px',
              color: '#8b949e',
              textAlign: 'center',
              transition: 'all 0.3s ease',
            }}>
              {isHovered ? (
                <span style={{ color: '#58a6ff' }}>📌 نمایش کامل نقاط قوت و ضعف</span>
              ) : (
                <span>🖱️ هاور کنید برای مشاهده جزئیات کامل</span>
              )}
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>

   <div className="card" style={{ padding: '32px' }}>
<div className="card" style={{ padding: '32px', marginBottom: '40px' }}>
  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#f0f6fc', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
    🎯 موقعیت‌یابی استراتژیک (Strategic Positioning)
  </h2>

  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
    {[
      {
        title: 'LifeFlow vs Jira / ClickUp',
        desc: 'ابزارهای مدیریت پروژه بر "تسک‌ها" و "فرآیندها" تمرکز دارند. لایف‌فلو لایه‌ای هوشمند روی آن‌هاست که بر "انسان" و "پتانسیل عملکردی" تمرکز می‌کند.',
        color: '#58a6ff',
        icon: '🔗'
      },
      {
        title: 'LifeFlow vs Rize / RescueTime',
        desc: 'رقبای جهانی بر "ثبت گذشته" (چه اتفاقی افتاد؟) تمرکز دارند. لایف‌فلو بر "پیش‌بینی آینده" (چه اتفاقی خواهد افتاد؟) و تحلیل ریشه‌ای شکست تمرکز دارد.',
        color: '#3fb950',
        icon: '🔮'
      },
      {
        title: 'LifeFlow vs Motion / Reclaim',
        desc: 'دستیارهای تقویم فقط زمان را جابه‌جا می‌کنند. لایف‌فلو سطح "انرژی و تمرکز" کاربر را تحلیل می‌کند تا زمان درست برای کار درست را پیشنهاد دهد.',
        color: '#bc8cff',
        icon: '⚡'
      },
      {
        title: 'LifeFlow vs ابزارهای بومی (تسکولو/میزیتو)',
        desc: 'ابزارهای ایرانی مدیریت وظایف را بومی کرده‌اند. لایف‌فلو "هوش مصنوعی سطح جهانی" را با فرهنگ کاری و تقویم فارسی ترکیب کرده است.',
        color: '#d29922',
        icon: '🇮🇷'
      },
      {
        title: 'LifeFlow vs Microsoft Viva',
        desc: 'Viva مختص سازمان‌های بزرگ است. لایف‌فلو این قدرت تحلیلی را در ابعادی چابک برای فریلنسرها و تیم‌های تکنولوژی کوچک (SME) فراهم می‌کند.',
        color: '#f85149',
        icon: '🪁'
      },
      {
        title: 'مزیت انحصاری: Root Cause Analysis',
        desc: 'تنها سیستمی که به جای سرزنش کاربر برای اتلاف وقت، علت ریشه‌ای آن (بی‌خوابی، تداخل جلسات، افت انرژی) را شناسایی و رفع می‌کند.',
        color: '#58a6ff',
        icon: '💎'
      },
    ].map((item, i) => (
      <div
        key={i}
        style={{
          padding: '24px',
          borderRadius: '16px',
          background: `${item.color}05`,
          border: `1px solid ${item.color}15`,
          transition: 'transform 0.2s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ fontSize: '24px', marginBottom: '12px' }}>{item.icon}</div>
        <h3 style={{ fontSize: '15px', fontWeight: 800, color: item.color, marginBottom: '10px' }}>
          {item.title}
        </h3>
        <p style={{ fontSize: '13.5px', color: '#8b949e', lineHeight: 1.8 }}>
          {item.desc}
        </p>
      </div>
    ))}
  </div>

<div
    style={{ 
    marginTop: '32px', 
    padding: '30px', 
    borderRadius: '20px', 
    background: 'linear-gradient(135deg, rgba(88,166,255,0.1) 0%, rgba(188,140,255,0.05) 100%)', 
    border: '1px solid rgba(88,166,255,0.2)', 
    textAlign: 'center' 
  }}
  >
    <h3
      style={{
        color: '#58a6ff',
        marginBottom: '12px',
        fontSize: '22px',
        fontWeight: 800,
      }}
    >
      پروژه‌ها مهم هستند؛ اما انسان‌ها مهم‌ترند.
    </h3>

    <p
      style={{
        color: '#c9d1d9',
        lineHeight: 2,
        maxWidth: '850px',
        margin: '0 auto',
      }}
    >
      <strong>Jira، ClickUp و Asana</strong> به شما می‌گویند چه کاری انجام شده است.
      <br />
      LifeFlow به شما می‌گوید چرا انجام نشده، چه کسی در معرض افت
      عملکرد قرار دارد و چگونه می‌توان بهره‌وری تیم را افزایش داد.
      <br />

      <span style={{ color: '#8b949e', fontSize: '13px' }}>(رویکرد نوین LifeFlow برای سال ۲۰۲۶)</span>
    </p>
  </div>
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

function DocsPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [previewMode, setPreviewMode] = useState<'none' | 'pdf' | 'readme'>('none');
  const [readmeContent, setReadmeContent] = useState<string>('در حال بارگذاری...');

  useEffect(() => {
    if (previewMode === 'readme') {
      fetch('/doc/README.md')
        .then((res) => {
          if (!res.ok) throw new Error('فایل یافت نشد');
          return res.text();
        })
        .then(setReadmeContent)
        .catch(() => setReadmeContent('⚠️ خطا در بارگذاری فایل README.md. مطمئن شوید فایل در پوشه public قرار دارد.'));
    }
  }, [previewMode]);

  const documents = [
    {
      id: 'pdf',
      title: 'گزارش نهایی پروژه',
      desc: 'مستند جامع تحلیل کسب‌وکار، مدل درآمدی، طرح بازاریابی، بوم کسب‌وکار و شرح دمو.',
      fileName: 'LifeFlow-Report.pdf',
      type: 'PDF',
      color: '#f85149',
      fileUrl: '/doc/LifeFlow-Report.pdf',
    },
    {
      id: 'readme',
      title: 'مستندات سورس‌کد',
      desc: 'فایل راهنمای نصب، راه‌اندازی، معماری فنی و توضیحات ساختار پروژه.',
      fileName: 'README.md',
      type: 'MD',
      color: '#58a6ff',
      fileUrl: '/doc/README.md',
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        .doc-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .doc-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.4); }
        .doc-card:hover .doc-preview { transform: scale(1.05) rotate(2deg); }
        .doc-preview { transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .btn-hover { transition: all 0.2s ease; cursor: pointer; }
        .btn-hover:hover { filter: brightness(1.2); }
        
        .markdown-body { color: #c9d1d9; font-size: 14px; line-height: 1.8; text-align: right; direction: rtl; }
        .markdown-body h1, .markdown-body h2, .markdown-body h3 { color: #f0f6fc; border-bottom: 1px solid #30363d; padding-bottom: 8px; margin-top: 24px; margin-bottom: 16px; }
        .markdown-body p { margin-bottom: 16px; }
        .markdown-body a { color: #58a6ff; text-decoration: none; }
        .markdown-body a:hover { text-decoration: underline; }
        .markdown-body ul, .markdown-body ol { padding-right: 24px; margin-bottom: 16px; }
        .markdown-body code { background: rgba(110,118,129,0.4); padding: 2px 6px; border-radius: 6px; font-family: monospace; font-size: 12px; }
        .markdown-body pre { background: #161b22; padding: 16px; border-radius: 8px; overflow-x: auto; margin-bottom: 16px; border: 1px solid #30363d; direction: ltr; text-align: left; }
        .markdown-body img { max-width: 100%; border-radius: 8px; margin: 16px 0; }
        .markdown-body table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        .markdown-body th, .markdown-body td { border: 1px solid #30363d; padding: 8px 12px; }
        .markdown-body th { background: #161b22; }
      `}} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>مستندات</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            مرکز مستندات LifeFlow
          </h1>
          <p style={{ fontSize: '15px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>
            گزارش‌های تحلیلی، ساختار معماری و سورس‌کد پلتفرم
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          {documents.map((doc, i) => (
            <div key={i} className="card doc-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #30363d' }}>
              <div style={{ height: '160px', background: `linear-gradient(145deg, ${doc.color}15 0%, #0d1117 100%)`, borderBottom: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: `${doc.color}20`, color: doc.color, padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 800 }}>
                  {doc.type}
                </div>
                <div className="doc-preview" style={{ width: '80px', height: '100px', background: '#fff', borderRadius: '4px', boxShadow: '0 8px 16px rgba(0,0,0,0.5)', padding: '8px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '6px', width: '70%', background: doc.color, borderRadius: '4px', marginBottom: '8px' }} />
                  <div style={{ height: '3px', width: '100%', background: '#e1e4e8', borderRadius: '2px', marginBottom: '4px' }} />
                  <div style={{ height: '3px', width: '90%', background: '#e1e4e8', borderRadius: '2px', marginBottom: '4px' }} />
                  <div style={{ height: '3px', width: '80%', background: '#e1e4e8', borderRadius: '2px', marginBottom: '8px' }} />
                  <div style={{ flex: 1, background: '#f6f8fa', borderRadius: '4px', border: '1px dashed #d1d5da', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '16px', color: '#d1d5da' }}>{doc.type === 'PDF' ? '📊' : '💻'}</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>{doc.title}</h3>
                <p style={{ fontSize: '12px', color: '#8b949e', marginBottom: '20px', lineHeight: 1.6, flex: 1 }}>{doc.desc}</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button 
                    onClick={() => setPreviewMode(doc.id as 'pdf' | 'readme')}
                    className="btn-hover" 
                    style={{ padding: '10px', background: '#21262d', color: '#c9d1d9', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #30363d' }}>
                    👁️ مشاهده
                  </button>
                  <a href={doc.fileUrl} download className="btn-hover" style={{ textAlign: 'center', padding: '10px', background: `${doc.color}15`, color: doc.color, borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', border: `1px solid ${doc.color}40` }}>
                    📥 دانلود
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== محیط نمایش فایل (Fixed Preview) ===== */}
        {previewMode !== 'none' && (
          <div style={{ marginBottom: '56px', padding: '24px', background: '#161b22', borderRadius: '16px', border: '1px solid #30363d' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #30363d', paddingBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', margin: 0 }}>
                {previewMode === 'pdf' ? '📄 پیش‌نمایش گزارش PDF' : '📘 پیش‌نمایش README.md'}
              </h2>
              <button 
                onClick={() => setPreviewMode('none')}
                style={{ background: '#f8514920', color: '#f85149', border: '1px solid #f8514940', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
                بستن ×
              </button>
            </div>

            {previewMode === 'pdf' ? (
              <div style={{ textAlign: 'center' }}>
                {/* Method 1: Direct link with fallback message */}
                <div style={{ padding: '40px', background: '#0d1117', borderRadius: '12px', border: '1px solid #30363d' }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>📄</div>
                  <h3 style={{ color: '#f0f6fc', marginBottom: '16px' }}>گزارش نهایی پروژه</h3>
                  <p style={{ color: '#8b949e', marginBottom: '24px' }}>
                    برای مشاهده فایل PDF، لطفاً از یکی از گزینه‌های زیر استفاده کنید:
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a 
                      href="/doc/LifeFlow-Report.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-hover"
                      style={{ 
                        padding: '12px 24px', 
                        background: '#238636', 
                        color: '#fff', 
                        borderRadius: '8px', 
                        fontSize: '14px', 
                        fontWeight: 600, 
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                      🔗 باز کردن در تب جدید
                    </a>
                    <a 
                      href="/doc/LifeFlow-Report.pdf" 
                      download
                      className="btn-hover"
                      style={{ 
                        padding: '12px 24px', 
                        background: '#1f6feb', 
                        color: '#fff', 
                        borderRadius: '8px', 
                        fontSize: '14px', 
                        fontWeight: 600, 
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                      📥 دانلود فایل
                    </a>
                  </div>
                  
                  {/* Fallback iframe (may work in some browsers) */}
                  <div style={{ marginTop: '32px' }}>
                    <iframe 
                      src="/doc/LifeFlow-Report.pdf#toolbar=1&navpanes=1&scrollbar=1" 
                      width="100%" 
                      height="800px" 
                      style={{ 
                        border: '1px solid #30363d', 
                        borderRadius: '12px', 
                        background: '#fff',
                        display: 'block'
                      }}
                      title="PDF Preview"
                    />
                    <p style={{ color: '#6e7681', fontSize: '12px', marginTop: '12px' }}>
                      ℹ️ اگر PDF بالا نمایش داده نشد، از دکمه "باز کردن در تب جدید" استفاده کنید
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="markdown-body">
                <ReactMarkdown>{readmeContent}</ReactMarkdown>
              </div>
            )}
          </div>
        )}

        {/* Technical Documentation Sections */}
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
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── ProjectExplorer.tsx
├── data/
│   └── sampleData.ts
├── pages/
│   ├── BusinessModelPage.tsx
│   ├── HomePage.tsx
│   ├── IdeaPage.tsx
│   ├── LoginPage.tsx
│   ├── MarketPage.tsx
│   ├── MarketingPage.tsx
│   ├── MaturityPage.tsx
│   ├── OrgDemoPage.tsx
│   ├── PersonalDemoPage.tsx
│   ├── RevenuePage.tsx
│   ├── RoadmapPage.tsx
│   └── ValuePage.tsx
└── utils/
    ├── ai-agent.ts
    ├── analytics.ts
    ├── cn.ts
    └── storage.ts`
          },
          {
            title: '🧠 موتور AI',
            content: [
              { label: 'نوع', value: 'Rule-based Behavioral Analysis (Pattern Matching)' },
              { label: 'الگوهای تشخیص', value: '۱۳+ الگوی رفتاری (بهره‌وری، فرسودگی، خواب، تمرکز، ...)' },
              { label: 'امتیازدهی', value: '۵ بعد: بهره‌وری، تمرکز، سلامت، اتلاف وقت، تعادل + Life Score کلی' },
              { label: 'بینش‌ها', value: 'تولید بینش‌های اولویت‌دار با آیکون و نوع (هشدار، موفقیت، ...)' },
              { label: 'توصیه‌ها', value: 'شخصی‌سازی‌شده بر اساس داده‌های کاربر (فعالیت‌ها، اهداف، عادت‌ها)' },
              { label: 'گزارش‌ها', value: 'تحلیل هفتگی، دسته‌بندی فعالیت‌ها، روندهای روزانه' },
              { label: 'به‌روزرسانی', value: 'آنی با هر تغییر داده (LocalStorage)' },
              { label: 'معماری', value: 'بدون Backend – پردازش محلی در مرورگر' },
            ],
          },
        ].map((section, i) => (
          <div key={i} className="card" style={{ marginBottom: '20px', padding: '28px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc', marginBottom: '16px' }}>{section.title}</h2>
            {'content' in section ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                {section.content?.map((item, k) => (
                  <div key={k} style={{ display: 'flex', gap: '10px', padding: '10px', background: '#0d1117', borderRadius: '8px', border: '1px solid #21262d' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#8b949e', minWidth: '100px' }}>{item.label}:</span>
                    <span style={{ fontSize: '12px', color: '#c9d1d9' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <pre style={{
                background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px',
                padding: '20px', fontSize: '13px', color: '#58a6ff', overflowX: 'auto',
                fontFamily: 'monospace', lineHeight: 1.6, direction: 'ltr', textAlign: 'left'
              }}>
                {section.code}
              </pre>
            )}
          </div>
        ))}

        <div style={{ marginTop: '56px' }}>
          <ProjectExplorer onNavigate={onNavigate} />
          <Footer onNavigate={onNavigate} />
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