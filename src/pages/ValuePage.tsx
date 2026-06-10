import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface Props { onNavigate: (page: string) => void; }

export default function ValuePage({ onNavigate: _ }: Props) {
  function onNavigate(_page: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-purple" style={{ marginBottom: '16px', display: 'inline-flex' }}>خلق ارزش</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            LifeFlow چه ارزشی خلق می‌کند؟
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>
            ارزش‌آفرینی در سه سطح فردی، سازمانی و اجتماعی
          </p>
        </div>

        {/* Value Ladder */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          {[
            {
              level: 'ارزش عملکردی',
              icon: '⚙️',
              color: '#58a6ff',
              values: [
                { title: 'صرفه‌جویی ۳.۲ ساعت در روز', desc: 'با شناسایی و حذف فعالیت‌های بی‌بازده' },
                { title: 'افزایش ۴۲٪ بهره‌وری', desc: 'از طریق بهینه‌سازی الگوهای کاری' },
                { title: 'کاهش ۶۷٪ فرسودگی', desc: 'با تشخیص زودهنگام و مداخله به موقع' },
              ],
            },
            {
              level: 'ارزش احساسی',
              icon: '❤️',
              color: '#f85149',
              values: [
                { title: 'آرامش ذهنی', desc: 'اطلاع از دقیق بودن مسیر و پیشرفت واقعی' },
                { title: 'اعتمادبه‌نفس', desc: 'دیدن دستاوردها به صورت عینی و قابل اندازه‌گیری' },
                { title: 'رهایی از احساس گناه', desc: 'مدیریت آگاهانه وقت بدون احساس اتلاف' },
              ],
            },
            {
              level: 'ارزش اجتماعی',
              icon: '🌍',
              color: '#3fb950',
              values: [
                { title: 'سازمان‌های سالم‌تر', desc: 'کاهش نرخ ترک کار و افزایش رضایت شغلی' },
                { title: 'جامعه بهره‌ورتر', desc: 'افزایش تولید ناخالص داخلی از طریق بهره‌وری ملی' },
                { title: 'کار-زندگی متعادل', desc: 'فرهنگ Work-Life Balance در سازمان‌ها' },
              ],
            },
          ].map((cat, i) => (
            <div key={i} className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '28px' }}>{cat.icon}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: cat.color }}>{cat.level}</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cat.values.map((v, k) => (
                  <div key={k} style={{ padding: '14px', background: `${cat.color}08`, borderRadius: '8px', borderRight: `3px solid ${cat.color}40` }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '4px' }}>{v.title}</div>
                    <div style={{ fontSize: '12px', color: '#8b949e' }}>{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            💰 محاسبه ROI برای کاربر Premium
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { label: 'صرفه‌جویی زمانی روزانه', value: '۳.۲ ساعت', icon: '⏰', color: '#58a6ff', note: 'بر اساس میانگین کاربران' },
              { label: 'ارزش مالی ماهانه', value: '۸۰۰,۰۰۰ تومان', icon: '💵', color: '#3fb950', note: '(حقوق ساعتی متوسط ایران)' },
              { label: 'هزینه اشتراک ماهانه', value: '۹۹,۰۰۰ تومان', icon: '💳', color: '#d29922', note: 'Premium Plan' },
              { label: 'ROI ماهانه', value: '۷۰۸٪', icon: '📈', color: '#3fb950', note: 'بازگشت سرمایه ۸x' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '20px', background: '#0d1117', borderRadius: '12px', border: '1px solid #21262d' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: item.color, marginBottom: '4px' }}>{item.value}</div>
                <div style={{ fontSize: '13px', color: '#c9d1d9', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Intermediation Analysis */}
        <div className="card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            🔗 تحلیل واسطه‌گری (Intermediation)
          </h2>
          <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.9, marginBottom: '20px' }}>
            LifeFlow به عنوان یک <strong style={{ color: '#58a6ff' }}>پلتفرم واسط دیجیتال</strong> بین داده‌های رفتاری کاربران و بینش‌های قابل اقدام عمل می‌کند. این واسطه‌گری ارزش اطلاعاتی بالایی خلق می‌کند.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { label: 'داده رفتاری کاربر', icon: '📊', color: '#8b949e' },
              { label: '→', icon: '', color: '#30363d' },
              { label: 'LifeFlow AI Engine', icon: '🧠', color: '#58a6ff', highlight: true },
              { label: '→', icon: '', color: '#30363d' },
              { label: 'بینش عملی', icon: '💡', color: '#3fb950' },
              { label: '→', icon: '', color: '#30363d' },
              { label: 'تصمیم بهتر', icon: '🎯', color: '#bc8cff' },
            ].map((node, i) => (
              node.label === '→' ? (
                <span key={i} style={{ fontSize: '20px', color: '#30363d' }}>←</span>
              ) : (
                <div key={i} style={{
                  padding: '12px 16px', borderRadius: '10px', textAlign: 'center',
                  background: node.highlight ? 'rgba(88,166,255,0.1)' : '#161b22',
                  border: `1px solid ${node.highlight ? '#58a6ff' : '#30363d'}`,
                  boxShadow: node.highlight ? '0 0 20px rgba(88,166,255,0.2)' : 'none',
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>{node.icon}</div>
                  <div style={{ fontSize: '11px', color: node.color, fontWeight: 600 }}>{node.label}</div>
                </div>
              )
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
