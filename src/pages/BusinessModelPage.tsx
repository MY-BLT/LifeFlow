import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";
import { useState } from "react";

interface Props { onNavigate: (page: string) => void; }

// محتوای کاملاً تخصصی و بازنویسی شده برای یک استارتاپ هوش مصنوعی در حوزه منابع انسانی و بهره‌وری
const bmcData = {
  keyPartners: ['پلتفرم‌های مدیریت تسک (Jira, Trello)', 'پلتفرم‌های منابع انسانی (HRIS)', 'گجت‌های پوشیدنی و ساعت‌های هوشمند', 'مراکز مشاوره و روان‌شناسی سازمانی', 'ارائه‌دهندگان زیرساخت ابری (Cloud)'],
  keyActivities: ['توسعه و آموزش مدل‌های زبانی/رفتاری', 'تحلیل یکپارچه داده‌های API', 'تضمین امنیت و حریم خصوصی داده‌ها', 'فروش B2B و بازاریابی بازگشتی', 'بهینه‌سازی مستمر تجربه کاربری (UX)'],
  keyResources: ['مدل‌های هوش مصنوعی اختصاصی', 'پایگاه داده الگوهای رفتاری', 'تیم مهندسی داده و روان‌شناس صنعتی', 'زیرساخت پردازش ابری مقیاس‌پذیر', 'پتنت‌ها و مالکیت معنوی الگوریتم‌ها'],
  valueProps: ['پیش‌بینی فرسودگی شغلی قبل از وقوع', 'افزایش ۴۲٪ بهره‌وری بدون افزایش ساعت‌کاری', 'ارائه بینش‌های شخصی برای ریتم کار', 'داشبورد جامع سلامت سازمانی مدیران', 'حفظ حریم خصوصی (پردازش لبه/Local)'],
  customerRels: ['مدیریت موفقیت مشتری (CSM) اختصاصی', 'ارزیابی‌های دوره‌ای سلامت روان', 'سیستم Onboarding تعاملی با AI', 'جامعه کاربری آنلاین و انتقال تجربه', 'سلف‌سرویس و اتوماسیون تیکتینگ'],
  channels: ['فروش مستقیم B2B به دپارتمان HR', 'مارکت‌پلیس نرم‌افزارهای سازمانی', 'لینکدین و بازاریابی محتوایی', 'وبینارها و رویدادهای مدیریت منابع انسانی', 'اپ استور و گوگل پلی (نسخه فردی)'],
  customerSegments: ['شرکت‌های فناوری و استارتاپ‌ها (B2B)', 'مدیران منابع انسانی (HR Managers)', 'تیم‌های ریموت و توزیع‌شده', 'متخصصان و برنامه‌نویسان (B2C)', 'آژانس‌های خلاقیت و مارکتینگ'],
  costStructure: ['هزینه‌های سرور و پردازش سنگین AI', 'تحقیق و توسعه (R&D) و حقوق مهندسین', 'هزینه‌های جذب مشتری (CAC) در B2B', 'نگهداری و امنیت سایبری داده‌ها', 'هزینه یکپارچه‌سازی با نرم‌افزارهای ثالث'],
  revenueStreams: ['SaaS - حق اشتراک ماهانه/سالانه سازمانی', 'فروش API تحلیل رفتار به پلتفرم‌ها', 'اشتراک Premium برای کاربران فردی', 'فروش گزارش‌های کلان صنعت (بی‌نام)', 'هزینه استقرار اختصاصی برای Enterprise'],
};

const colorGroups = {
  left: { bg: 'rgba(88,166,255,0.08)', border: 'rgba(88,166,255,0.3)', text: '#58a6ff', hoverBg: 'rgba(88,166,255,0.15)' },
  middle: { bg: 'rgba(240,192,0,0.08)', border: 'rgba(240,192,0,0.4)', text: '#f0c000', hoverBg: 'rgba(240,192,0,0.15)' },
  right: { bg: 'rgba(233,30,99,0.08)', border: 'rgba(233,30,99,0.3)', text: '#e91e63', hoverBg: 'rgba(233,30,99,0.15)' },
  cost: { bg: 'rgba(244,67,54,0.08)', border: 'rgba(244,67,54,0.3)', text: '#f44336', hoverBg: 'rgba(244,67,54,0.15)' },
  revenue: { bg: 'rgba(76,175,80,0.08)', border: 'rgba(76,175,80,0.3)', text: '#4caf50', hoverBg: 'rgba(76,175,80,0.15)' },
};

function BMCCell({ children, colorGroup, gridArea, style }: { 
  children: React.ReactNode; 
  colorGroup: typeof colorGroups.left; 
  gridArea?: string;
  style?: React.CSSProperties 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const combinedStyle: React.CSSProperties = {
    background: isHovered ? colorGroup.hoverBg : colorGroup.bg,
    border: `1px solid ${isHovered ? colorGroup.text : colorGroup.border}`,
    borderRadius: '12px',
    padding: '20px',
    height: '100%',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: isHovered ? `0 8px 24px ${colorGroup.bg}` : 'none',
    transform: isHovered ? 'translateY(-2px)' : 'none',
    gridArea: gridArea,
    ...style,
  };

  return (
    <div style={combinedStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
    </div>
  );
}

export default function BusinessModelPage({ onNavigate }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* استایل‌های ریسپانسیو برای گرید */}
      <style dangerouslySetInnerHTML={{__html: `
        .bmc-grid {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-template-rows: auto auto auto;
          gap: 16px;
          margin-bottom: 40px;
        }
        @media (max-width: 992px) {
          .bmc-grid {
            display: flex;
            flex-direction: column;
          }
        }
        .bmc-list li {
          position: relative;
          padding-right: 16px;
          margin-bottom: 10px;
          line-height: 1.5;
        }
        .bmc-list li::before {
          content: '•';
          position: absolute;
          right: 0;
          color: currentColor;
          opacity: 0.7;
        }
      `}} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ 
            background: 'rgba(88,166,255,0.1)', color: '#58a6ff', border: '1px solid rgba(88,166,255,0.3)',
            padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, display: 'inline-block', marginBottom: '16px'
          }}>
            مدل کسب‌وکار (Lean Canvas)
          </span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            Business Model Canvas
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            استراتژی خلق، ارائه و کسب ارزش در LifeFlow؛ یکپارچه‌سازی هوش مصنوعی با سلامت روان سازمانی.
          </p>
        </div>

        {/* BMC Grid (استاندارد ۱۰ ستونه) */}
        <div className="bmc-grid" dir="rtl">
          
          {/* شرکای کلیدی */}
          <BMCCell colorGroup={colorGroups.left} gridArea="1 / 1 / 3 / 3">
            <h4 style={{ color: colorGroups.left.text, fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', gap: '8px' }}>
              <span>🤝</span> شرکای کلیدی
            </h4>
            <ul className="bmc-list" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13.5px', color: '#c9d1d9' }}>
              {bmcData.keyPartners.map((item, idx) => <li key={idx} style={{ color: colorGroups.left.text }}><span style={{ color: '#c9d1d9' }}>{item}</span></li>)}
            </ul>
          </BMCCell>

          {/* فعالیت‌های کلیدی */}
          <BMCCell colorGroup={colorGroups.left} gridArea="1 / 3 / 2 / 5">
            <h4 style={{ color: colorGroups.left.text, fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', gap: '8px' }}>
              <span>⚙️</span> فعالیت‌های کلیدی
            </h4>
            <ul className="bmc-list" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13.5px', color: '#c9d1d9' }}>
              {bmcData.keyActivities.map((item, idx) => <li key={idx} style={{ color: colorGroups.left.text }}><span style={{ color: '#c9d1d9' }}>{item}</span></li>)}
            </ul>
          </BMCCell>

          {/* منابع کلیدی */}
          <BMCCell colorGroup={colorGroups.left} gridArea="2 / 3 / 3 / 5">
            <h4 style={{ color: colorGroups.left.text, fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', gap: '8px' }}>
              <span>🏗️</span> منابع کلیدی
            </h4>
            <ul className="bmc-list" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13.5px', color: '#c9d1d9' }}>
              {bmcData.keyResources.map((item, idx) => <li key={idx} style={{ color: colorGroups.left.text }}><span style={{ color: '#c9d1d9' }}>{item}</span></li>)}
            </ul>
          </BMCCell>

          {/* ارزش پیشنهادی */}
          <BMCCell colorGroup={colorGroups.middle} gridArea="1 / 5 / 3 / 7">
            <h4 style={{ color: colorGroups.middle.text, fontSize: '18px', fontWeight: 800, marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span>💎</span> ارزش پیشنهادی
            </h4>
            <ul className="bmc-list" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14.5px', color: '#f0f6fc', fontWeight: 500 }}>
              {bmcData.valueProps.map((item, idx) => (
                <li key={idx} style={{ color: colorGroups.middle.text, marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(240,192,0,0.1)' }}>
                  <span style={{ color: '#f0f6fc' }}>{item}</span>
                </li>
              ))}
            </ul>
          </BMCCell>

          {/* روابط با مشتریان */}
          <BMCCell colorGroup={colorGroups.right} gridArea="1 / 7 / 2 / 9">
            <h4 style={{ color: colorGroups.right.text, fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', gap: '8px' }}>
              <span>💬</span> ارتباط با مشتری
            </h4>
            <ul className="bmc-list" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13.5px', color: '#c9d1d9' }}>
              {bmcData.customerRels.map((item, idx) => <li key={idx} style={{ color: colorGroups.right.text }}><span style={{ color: '#c9d1d9' }}>{item}</span></li>)}
            </ul>
          </BMCCell>

          {/* کانال‌ها */}
          <BMCCell colorGroup={colorGroups.right} gridArea="2 / 7 / 3 / 9">
            <h4 style={{ color: colorGroups.right.text, fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', gap: '8px' }}>
              <span>📢</span> کانال‌های توزیع
            </h4>
            <ul className="bmc-list" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13.5px', color: '#c9d1d9' }}>
              {bmcData.channels.map((item, idx) => <li key={idx} style={{ color: colorGroups.right.text }}><span style={{ color: '#c9d1d9' }}>{item}</span></li>)}
            </ul>
          </BMCCell>

          {/* بخش‌های مشتری */}
          <BMCCell colorGroup={colorGroups.right} gridArea="1 / 9 / 3 / 11">
            <h4 style={{ color: colorGroups.right.text, fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', gap: '8px' }}>
              <span>🎯</span> بخش‌های مشتری
            </h4>
            <ul className="bmc-list" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13.5px', color: '#c9d1d9' }}>
              {bmcData.customerSegments.map((item, idx) => <li key={idx} style={{ color: colorGroups.right.text }}><span style={{ color: '#c9d1d9' }}>{item}</span></li>)}
            </ul>
          </BMCCell>

          {/* ساختار هزینه */}
          <BMCCell colorGroup={colorGroups.cost} gridArea="3 / 1 / 4 / 6">
            <h4 style={{ color: colorGroups.cost.text, fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', gap: '8px' }}>
              <span>💸</span> ساختار هزینه‌ها
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {bmcData.costStructure.map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', color: '#c9d1d9', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {item}
                </div>
              ))}
            </div>
          </BMCCell>

          {/* جریان‌های درآمد */}
          <BMCCell colorGroup={colorGroups.revenue} gridArea="3 / 6 / 4 / 11">
            <h4 style={{ color: colorGroups.revenue.text, fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', gap: '8px' }}>
              <span>💰</span> جریان‌های درآمدی
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {bmcData.revenueStreams.map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', color: '#c9d1d9', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {item}
                </div>
              ))}
            </div>
          </BMCCell>
        </div>

        {/* Value Proposition Deep Dive - بروزرسانی محتوا */}
        <div style={{ 
          background: '#161b22', border: '1px solid #30363d', borderRadius: '16px', 
          padding: '40px', marginBottom: '40px', boxShadow: '0 12px 32px rgba(0,0,0,0.2)' 
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#f0f6fc', marginBottom: '8px' }}>
              تحلیل عمیق مزیت‌های رقابتی (Unfair Advantage)
            </h2>
            <p style={{ color: '#8b949e', fontSize: '15px' }}>چرا LifeFlow با سایر ابزارهای مدیریت زمان تفاوت دارد؟</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              {
                title: 'برای کاربران خُرد (B2C)',
                items: [
                  'شناسایی دقیق ساعات طلایی بهره‌وری (Peak Time)',
                  'مدیریت انرژی جایگزین مدیریت زمان کلاسیک',
                  'کاهش استرس با ایجاد تعادل بین کار و زندگی',
                  'حریم خصوصی ۱۰۰٪ (داده‌ها از دستگاه خارج نمی‌شوند)',
                ],
                color: '#58a6ff',
                icon: '👤',
              },
              {
                title: 'برای سازمان‌ها (B2B)',
                items: [
                  'رصد لحظه‌ای شاخص سلامت روان سازمانی',
                  'جلوگیری از خروج نخبگان با پیش‌بینی فرسودگی',
                  'توزیع عادلانه و هوشمندانه بار کاری بین تیم',
                  'افزایش نرخ بازگشت سرمایه (ROI) منابع انسانی',
                ],
                color: '#3fb950',
                icon: '🏢',
              },
              {
                title: 'مزیت تکنولوژیک (Moat)',
                items: [
                  'الگوریتم‌های آموزش‌دیده روی رفتار کاربران بومی',
                  'هوش مصنوعی تطبیق‌پذیر (یادگیری از عادات کاربر)',
                  'ادغام یکپارچه (Seamless) با ابزارهای فعلی شرکت‌ها',
                  'مدل قیمت‌گذاری منعطف نسبت به رقبای خارجی',
                ],
                color: '#bc8cff',
                icon: '🚀',
              },
            ].map((section, i) => (
              <div key={i} style={{
                padding: '24px', borderRadius: '12px',
                background: `linear-gradient(180deg, ${section.color}10 0%, transparent 100%)`, 
                border: `1px solid ${section.color}30`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '28px', background: `${section.color}20`, padding: '10px', borderRadius: '10px' }}>{section.icon}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc', margin: 0 }}>{section.title}</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {section.items.map((item, k) => (
                    <li key={k} style={{ 
                      fontSize: '14px', color: '#c9d1d9', padding: '6px 0', 
                      display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: '1.5' 
                    }}>
                      <span style={{ color: section.color, flexShrink: 0, marginTop: '2px' }}>✦</span> {item}
                    </li>
                  ))}
                </ul>
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