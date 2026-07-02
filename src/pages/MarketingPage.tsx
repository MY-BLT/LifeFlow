import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";
import React, { useState } from "react";

interface Props { onNavigate: (page: string) => void; }

export default function MarketingPage({ onNavigate }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // داده‌های منطقی‌سازی شده بر اساس استانداردهای SaaS
  const funnelStages = [
    { 
      stage: 'آگاهی (Awareness)', 
      tactics: 'SEO، محتوا، شبکه‌های اجتماعی، رویدادهای تخصصی HR', 
      users: '۵۰,۰۰۰', 
      color: '#58a6ff',
      width: 100,
      description: 'بازدید از لندینگ‌پیج و مقالات بلاگ'
    },
    { 
      stage: 'جذب (Acquisition)', 
      tactics: 'ثبت‌نام نسخه رایگان، دانلود لید مگنت (Lead Magnet)', 
      users: '۴,۰۰۰', 
      color: '#3fb950',
      width: 70,
      description: 'تبدیل بازدیدکننده به کاربر ثبت‌نام‌شده (تبدیل ۸٪)'
    },
    { 
      stage: 'فعال‌سازی (Activation)', 
      tactics: 'آنبوردینگ تعاملی، تکمیل پروفایل، دریافت اولین گزارش AI', 
      users: '۱,۸۰۰', 
      color: '#bc8cff',
      width: 50,
      description: 'تجربه اولین ارزش و لحظه "آها!" (Aha Moment)'
    },
    { 
      stage: 'نگهداری (Retention)', 
      tactics: 'گزارش‌های هفتگی ایمیلی، نوتیفیکیشن‌های هوشمند و کاربردی', 
      users: '۸۰۰', 
      color: '#d29922',
      width: 32,
      description: 'کاربران فعال ماهانه (MAU) - بازگشت مستمر'
    },
    { 
      stage: 'درآمد (Revenue)', 
      tactics: 'ارتقا به اشتراک Premium، فروش پکیج تیمی (B2B)', 
      users: '۲۵۰', 
      color: '#f85149',
      width: 18,
      description: 'پرداخت‌کنندگان (تبدیل ۳٪ از کل ثبت‌نامی‌ها)'
    },
    { 
      stage: 'ارجاع (Referral)', 
      tactics: 'لینک دعوت اختصاصی، ۱ ماه اشتراک رایگان برای هر معرفی', 
      users: '۶۰', 
      color: '#3fb950',
      width: 10,
      description: 'دعوت موفقیت‌آمیز از همکاران (رشد ارگانیک)'
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes funnelExpand {
          from { width: 0%; opacity: 0; }
          to { width: 100%; opacity: 1; }
        }
        .funnel-stage {
          animation: funnelExpand 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .funnel-stage:nth-child(1) { animation-delay: 0.05s; }
        .funnel-stage:nth-child(2) { animation-delay: 0.10s; }
        .funnel-stage:nth-child(3) { animation-delay: 0.15s; }
        .funnel-stage:nth-child(4) { animation-delay: 0.20s; }
        .funnel-stage:nth-child(5) { animation-delay: 0.25s; }
        .funnel-stage:nth-child(6) { animation-delay: 0.30s; }
        
        .funnel-stage:hover .funnel-bar {
          filter: brightness(1.2);
          transform: scaleX(1.02);
        }
        .funnel-bar {
          transition: all 0.3s ease;
          transform-origin: center;
        }
      `}} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* ===== HEADER ===== */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>Go-to-Market Strategy</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            استراتژی بازاریابی و ورود به بازار
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>
            رویکرد چندکاناله با تمرکز بر جذب ارگانیک (Inbound) و رشد محصول‌محور (PLG)
          </p>
        </div>

        {/* ===== هشدار وضعیت فعلی ===== */}
        <div style={{
          background: 'rgba(210,153,34,0.08)',
          border: '1px solid rgba(210,153,34,0.25)',
          borderRadius: '12px',
          padding: '14px 20px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#d29922',
          fontSize: '13px',
        }}>
          <span style={{ fontSize: '20px' }}>📌</span>
          <span>
            <strong>تمامی ارقام این صفحه، تارگت‌های (اهداف) ۱۲ ماهه پس از لانچ هستند.</strong> <br/>
            LifeFlow در حال حاضر در مرحله MVP قرار دارد و داده‌ها بر اساس بنچمارک‌های صنعت B2B SaaS در ایران پیش‌بینی شده‌اند.
          </span>
        </div>

        {/* ===== قیف بازاریابی (Funnel) ===== */}
        <div className="card" style={{ padding: '32px', marginBottom: '40px', border: '1px solid #30363d' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>
            🧩 قیف بازاریابی (SaaS Funnel)
          </h2>
          <p style={{ fontSize: '13px', color: '#8b949e', marginBottom: '32px' }}>
            مسیر تبدیل کاربر از آگاهی تا سفیر برند – پیش‌بینی سال اول
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            {funnelStages.map((item, i) => {
              const isHovered = hoveredIndex === i;
              const barWidth = item.width;

              return (
                <div
                  key={i}
                  className="funnel-stage"
                  style={{
                    width: '100%',
                    maxWidth: '800px',
                    padding: '8px 0',
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}>
                    {/* نوار قیف */}
                    <div
                      className="funnel-bar"
                      style={{
                        width: `${barWidth}%`,
                        height: isHovered ? '56px' : '48px',
                        background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
                        border: `1px solid ${item.color}50`,
                        borderRadius: '12px',
                        padding: '0 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: isHovered ? `0 8px 24px ${item.color}20` : 'none',
                        position: 'relative',
                        cursor: 'default',
                      }}
                    >
                      {/* شماره مرحله */}
                      <div style={{
                        position: 'absolute',
                        right: '-36px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: item.color,
                        color: '#0d1117',
                        fontSize: '13px',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {i + 1}
                      </div>

                      {/* نام مرحله و تعداد کاربران */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#f0f6fc' }}>
                          {item.stage}
                        </span>
                        <span style={{
                          fontSize: '12px', fontWeight: 600,
                          padding: '2px 8px', borderRadius: '6px',
                          background: `${item.color}20`, color: item.color,
                        }}>
                          {item.users} نفر
                        </span>
                      </div>

                      {/* تاکتیک‌ها - در هاور */}
                      {isHovered && (
                        <div style={{
                          fontSize: '11.5px', color: '#c9d1d9',
                          padding: '6px 12px', background: 'rgba(0,0,0,0.4)',
                          borderRadius: '6px', whiteSpace: 'nowrap',
                          maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis'
                        }}>
                          {item.tactics}
                        </div>
                      )}

                      {/* درصد تبدیل */}
                      {isHovered && i > 0 && (
                        <div style={{
                          fontSize: '11px', color: '#8b949e', fontWeight: 600,
                          padding: '4px 8px', background: 'rgba(255,255,255,0.05)',
                          borderRadius: '6px',
                        }}>
                          نرخ تبدیل: {Math.round((parseInt(item.users.replace(/,/g, '')) / parseInt(funnelStages[i-1].users.replace(/,/g, ''))) * 100)}%
                        </div>
                      )}
                    </div>
                  </div>

                  {/* توضیح مرحله */}
                  {isHovered && (
                    <div style={{
                      fontSize: '12px', color: '#8b949e', textAlign: 'center',
                      marginTop: '8px', padding: '6px',
                      background: 'rgba(255,255,255,0.02)', borderRadius: '6px',
                    }}>
                      {item.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== استراتژی کانال‌ها ===== */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>
            📣 استراتژی کانال‌های جذب (Acquisition Channels)
          </h2>
          <p style={{ fontSize: '13px', color: '#8b949e', marginBottom: '20px' }}>
            تمرکز بر بازاریابی درون‌گرا (Inbound) و فروش B2B برای تیم‌ها
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              {
                icon: '🔍', title: 'سئو و بازاریابی محتوا', color: '#58a6ff', stat: '۴۰٪ ترافیک',
                items: [
                  'هدف: ۲۰,۰۰۰ بازدید ارگانیک ماهانه',
                  'مقالات تخصصی: "جلوگیری از فرسودگی شغلی"',
                  'ابزارهای رایگان (Lead Magnet): تست سلامت روان تیمی',
                  'بهینه‌سازی کلمات کلیدی نرم‌افزار مدیریت تسک',
                ],
              },
              {
                icon: '🏢', title: 'فروش مستقیم B2B', color: '#3fb950', stat: '۳۵٪ درآمد',
                items: [
                  'هدف‌گیری دپارتمان‌های HR استارتاپ‌ها',
                  'برگزاری دمو (Demo) اختصاصی برای مدیران',
                  'همکاری با شتاب‌دهنده‌ها برای ارائه روی پکیج‌های حمایتی',
                  'پکیج‌های پایلوت رایگان برای تیم‌های زیر ۱۰ نفر',
                ],
              },
              {
                icon: '📱', title: 'شبکه‌های اجتماعی تخصصی', color: '#bc8cff', stat: '۱۵٪ ترافیک',
                items: [
                  'لینکدین: تمرکز اصلی (محتوای مدیریتی و HR)',
                  'توییتر (X): ارتباط با جامعه توسعه‌دهندگان (B2C)',
                  'تولید اینفوگرافیک از داده‌های آماری بهره‌وری در ایران',
                  'هدف ۱۲ ماهه: ۱۲,۰۰۰ فالوور ارگانیک و درگیر',
                ],
              },
              {
                icon: '🎁', title: 'لوپ ویروسی (Product-Led Growth)', color: '#d29922', stat: '۱۰٪ رشد',
                items: [
                  'قابلیت دعوت از هم‌تیمی‌ها مستقیماً از داخل داشبورد',
                  'یک ماه Premium رایگان به ازای هر ارجاع موفق',
                  'هدف ضریب ویروسی (K-Factor): ۰.۲۵',
                  'افزونه‌های مرورگر (Chrome) به عنوان کانال نصب ثانویه',
                ],
              },
            ].map((channel, i) => (
              <div key={i} className="card" style={{ padding: '24px', borderTop: `4px solid ${channel.color}`, transition: 'transform 0.2s', background: '#161b22' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '28px', background: `${channel.color}15`, padding: '8px', borderRadius: '10px' }}>{channel.icon}</span>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f0f6fc', margin: '0 0 6px 0' }}>{channel.title}</h3>
                    <span style={{ fontSize: '11px', color: channel.color, background: `${channel.color}15`, padding: '2px 8px', borderRadius: '4px', border: `1px solid ${channel.color}30` }}>
                      {channel.stat}
                    </span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {channel.items.map((item, k) => (
                    <li key={k} style={{ fontSize: '13px', color: '#c9d1d9', padding: '6px 0', display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: channel.color, flexShrink: 0 }}>◆</span> <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ===== KPIs (استانداردسازی شده) ===== */}
        <div className="card" style={{ padding: '32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>
            📊 شاخص‌های کلیدی عملکرد (KPIs)
          </h2>
          <p style={{ fontSize: '13px', color: '#8b949e', marginBottom: '24px' }}>
            تارگت‌های منطقی‌سازی شده برای ارزیابی سلامت مدل کسب‌وکار (سال اول)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {[
              { metric: 'CAC (هزینه جذب)', value: '< ۳۵۰k تومان', color: '#58a6ff', desc: 'هزینه جذب هر کاربر پولی' },
              { metric: 'LTV (ارزش طول عمر)', value: '> ۱.۲M تومان', color: '#3fb950', desc: 'درآمد کل از یک مشتری' },
              { metric: 'نسبت LTV به CAC', value: '> ۳.۵x', color: '#bc8cff', desc: 'شاخص سودآوری سالم SaaS' },
              { metric: 'Churn Rate', value: '< ۵٪', color: '#d29922', desc: 'ریزش ماهانه (Churn) در B2B' },
              { metric: 'تبدیل Free به Paid', value: '۳٪ تا ۵٪', color: '#f85149', desc: 'نرخ تبدیل استاندارد Freemium' },
              { metric: 'NPS (رضایت)', value: '> ۵۰', color: '#58a6ff', desc: 'شاخص معرفی به همکاران' },
            ].map((kpi, i) => (
              <div key={i} style={{
                padding: '18px', borderRadius: '12px', background: `${kpi.color}08`,
                border: `1px solid ${kpi.color}30`, textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: kpi.color, marginBottom: '6px' }}>{kpi.value}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc', marginBottom: '4px' }}>{kpi.metric}</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>{kpi.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== مرحله فعلی ===== */}
        <div style={{
          padding: '24px', borderRadius: '12px', background: 'rgba(88,166,255,0.05)',
          border: '1px solid rgba(88,166,255,0.2)', marginBottom: '32px',
          display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '32px' }}>🚀</span>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f6fc', marginBottom: '6px' }}>
              اقدامات فعلی در فاز MVP (پیش‌از عرضه رسمی)
            </div>
            <div style={{ fontSize: '13px', color: '#c9d1d9', lineHeight: 1.6 }}>
              در حال حاضر تمام بودجه و زمان روی <strong style={{ color: '#58a6ff' }}>توسعه محتوای سئو محور</strong> (ساخت Authority)، 
              مذاکره اولیه با <strong style={{ color: '#3fb950' }}>۲ تیم استارتاپی برای تست بتا</strong>، 
              و راه‌اندازی <strong style={{ color: '#bc8cff' }}>خبرنامه لینکدین</strong> متمرکز است.
            </div>
          </div>
        </div>

        {/* ===== Project Sections Grid & Footer ===== */}
        <ProjectExplorer onNavigate={onNavigate} />
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}