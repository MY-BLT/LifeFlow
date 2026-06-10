import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface Props { onNavigate: (page: string) => void; }

const bmcData = {
  keyPartners: ['دانشگاه‌های معتبر ایران', 'سازمان‌های فناوری اطلاعات', 'استارتاپ‌های HR-Tech', 'شتاب‌دهنده‌های برتر', 'سرمایه‌گذاران فرشته'],
  keyActivities: ['توسعه الگوریتم AI', 'تحلیل رفتار کاربران', 'بهبود مستمر محصول', 'بازاریابی دیجیتال', 'پشتیبانی مشتری'],
  keyResources: ['تیم توسعه ارشد', 'الگوریتم ML اختصاصی', 'داده‌های رفتاری کاربران', 'زیرساخت ابری', 'برند LifeFlow'],
  valueProps: ['تشخیص الگوی رفتاری', 'هشدار فرسودگی شغلی', 'بینش‌های AI شخصی‌سازی', 'داشبورد سازمانی', 'بهره‌وری ۴۲٪ بیشتر'],
  customerRels: ['خودسرویس آنلاین', 'پشتیبانی ۲۴/۷', 'جامعه کاربری', 'وبینارهای رایگان', 'مشاوره آنبوردینگ'],
  channels: ['وب‌سایت مستقیم', 'اپ استور', 'LinkedIn', 'رفرال کاربران', 'همکاری HR'],
  customerSegments: ['متخصصان ۲۵-۴۵ ساله', 'تیم‌های استارتاپ', 'سازمان‌های بزرگ', 'فریلنسرها', 'مدیران میانی'],
  costStructure: ['حقوق تیم R&D', 'زیرساخت سرور', 'هزینه بازاریابی', 'پشتیبانی مشتری', 'هزینه‌های حقوقی'],
  revenueStreams: ['اشتراک Premium ماهانه', 'اشتراک Team', 'لایسنس Enterprise', 'APIهای B2B', 'گزارش‌های تحلیلی'],
};

export default function BusinessModelPage({ onNavigate: _ }: Props) {
  function onNavigate(_page: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>مدل کسب‌وکار</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            Business Model Canvas
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>
            چارچوب جامع کسب‌وکار LifeFlow – طراحی‌شده با رویکرد Lean Startup
          </p>
        </div>

        {/* BMC Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'auto auto', gap: '12px', marginBottom: '40px' }}>
          {/* Row 1 */}
          <div className="bmc-cell" style={{ gridColumn: '1', gridRow: '1 / 3' }}>
            <h4>🤝 شرکای کلیدی</h4>
            <ul>{bmcData.keyPartners.map((i,k)=><li key={k}>{i}</li>)}</ul>
          </div>
          <div style={{ gridColumn: '2', gridRow: '1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="bmc-cell" style={{ flex: 1 }}>
              <h4>⚙️ فعالیت‌های کلیدی</h4>
              <ul>{bmcData.keyActivities.map((i,k)=><li key={k}>{i}</li>)}</ul>
            </div>
          </div>
          <div className="bmc-cell" style={{ gridColumn: '3', gridRow: '1 / 3', background: 'rgba(88,166,255,0.08)', borderColor: 'rgba(88,166,255,0.3)' }}>
            <h4 style={{ color: '#79b8ff' }}>💎 ارزش پیشنهادی</h4>
            <ul>{bmcData.valueProps.map((i,k)=><li key={k}>{i}</li>)}</ul>
          </div>
          <div style={{ gridColumn: '4', gridRow: '1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="bmc-cell" style={{ flex: 1 }}>
              <h4>💬 روابط با مشتریان</h4>
              <ul>{bmcData.customerRels.map((i,k)=><li key={k}>{i}</li>)}</ul>
            </div>
          </div>
          <div className="bmc-cell" style={{ gridColumn: '5', gridRow: '1 / 3' }}>
            <h4>🎯 بخش‌های مشتری</h4>
            <ul>{bmcData.customerSegments.map((i,k)=><li key={k}>{i}</li>)}</ul>
          </div>

          {/* Row 2 */}
          <div className="bmc-cell" style={{ gridColumn: '2', gridRow: '2' }}>
            <h4>🏗️ منابع کلیدی</h4>
            <ul>{bmcData.keyResources.map((i,k)=><li key={k}>{i}</li>)}</ul>
          </div>
          <div className="bmc-cell" style={{ gridColumn: '4', gridRow: '2' }}>
            <h4>📢 کانال‌ها</h4>
            <ul>{bmcData.channels.map((i,k)=><li key={k}>{i}</li>)}</ul>
          </div>
        </div>

        {/* Row 3: Cost & Revenue */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '40px' }}>
          <div className="bmc-cell" style={{ background: 'rgba(248,81,73,0.06)', borderColor: 'rgba(248,81,73,0.2)' }}>
            <h4 style={{ color: '#f85149' }}>💸 ساختار هزینه</h4>
            <ul>{bmcData.costStructure.map((i,k)=><li key={k}>{i}</li>)}</ul>
          </div>
          <div className="bmc-cell" style={{ background: 'rgba(63,185,80,0.06)', borderColor: 'rgba(63,185,80,0.2)' }}>
            <h4 style={{ color: '#3fb950' }}>💰 جریان‌های درآمد</h4>
            <ul>{bmcData.revenueStreams.map((i,k)=><li key={k}>{i}</li>)}</ul>
          </div>
        </div>

        {/* Value Proposition Deep Dive */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            💎 تحلیل عمیق ارزش پیشنهادی
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              {
                title: 'برای کاربر شخصی',
                items: [
                  'فهمیدن دلایل عدم موفقیت در اهداف',
                  'شناسایی اوقات اوج بهره‌وری شخصی',
                  'کاهش استرس با مدیریت آگاهانه زمان',
                  'پیشگیری از فرسودگی قبل از وقوع',
                ],
                color: '#58a6ff',
                icon: '👤',
              },
              {
                title: 'برای تیم و سازمان',
                items: [
                  'رصد سلامت سازمانی به‌صورت لحظه‌ای',
                  'توزیع بهینه بار کاری بین اعضا',
                  'پیش‌بینی و پیشگیری از خروج نیرو',
                  'گزارش‌های تحلیلی برای تصمیم‌گیری',
                ],
                color: '#3fb950',
                icon: '🏢',
              },
              {
                title: 'مزیت رقابتی',
                items: [
                  'هوش مصنوعی بومی‌شده برای بازار ایران',
                  'رابط کاربری فارسی کامل',
                  'ذخیره محلی – حریم خصوصی صد در صد',
                  'قیمت‌گذاری متناسب با بازار ایران',
                ],
                color: '#bc8cff',
                icon: '⚡',
              },
            ].map((section, i) => (
              <div key={i} style={{
                padding: '20px', borderRadius: '12px',
                background: `${section.color}08`, border: `1px solid ${section.color}25`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '22px' }}>{section.icon}</span>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc' }}>{section.title}</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {section.items.map((item, k) => (
                    <li key={k} style={{ fontSize: '13px', color: '#8b949e', padding: '4px 0', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: section.color, flexShrink: 0 }}>◆</span> {item}
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
