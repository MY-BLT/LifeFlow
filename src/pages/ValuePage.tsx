import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface Props { onNavigate: (page: string) => void; }

export default function ValuePage({ onNavigate }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

        {/* ===== HEADER ===== */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-purple" style={{ marginBottom: '16px', display: 'inline-flex' }}>خلق ارزش</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            LifeFlow چه ارزشی خلق می‌کند؟
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>
            تحلیل ارزش‌آفرینی در چهار سطح: بکارگیری، مبادله‌ای، استراتژیک و افزوده
          </p>
        </div>

        {/* ===== VALUE LADDER (اصلاح‌شده با واقعیت) ===== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          {[
            {
              level: 'ارزش بکارگیری (Use Value)',
              icon: '⚙️',
              color: '#58a6ff',
              values: [
                { title: 'صرفه‌جویی زمان', desc: 'با شناسایی فعالیت‌های بی‌بازده، کاربران می‌توانند تا ۲ ساعت در روز زمان مفید خود را بازیابی کنند.' },
                { title: 'افزایش بهره‌وری', desc: 'بهینه‌سازی الگوهای کاری بر اساس تحلیل AI، بهره‌وری را به طور میانگین ۳۰ تا ۴۰ درصد افزایش می‌دهد (بر اساس تست اولیه).' },
                { title: 'پیش‌گیری از فرسودگی', desc: 'هشدارهای زودهنگام بر اساس الگوی خواب، کار و استرس، از افت عملکرد جلوگیری می‌کند.' },
              ],
            },
            {
              level: 'ارزش مبادله‌ای (Exchange Value)',
              icon: '💰',
              color: '#d29922',
              values: [
                { title: 'بازگشت سرمایه (ROI)', desc: 'با صرفه‌جویی ۲ ساعت در روز، ارزش ماهانه حدود ۸۰۰ هزار تومان در مقابل هزینه اشتراک ۴۹ هزار تومان، ROI بیش از ۱۵۰۰٪ را نشان می‌دهد.' },
                { title: 'قیمت‌گذاری رقابتی', desc: 'نسبت به نمونه‌های خارجی (Rize: ۱۴.۹۹ دلار) با قیمت ۴۹ هزار تومان (کمتر از ۱.۵ دلار) بسیار مقرون‌به‌صرفه است.' },
                { title: 'مدل Freemium', desc: 'نسخه رایگان برای جذب کاربر و نسخه پرمیوم با ویژگی‌های پیشرفته، ارزش مبادله‌ای واضحی ایجاد می‌کند.' },
              ],
            },
            {
              level: 'ارزش استراتژیک (Strategic Value)',
              icon: '🎯',
              color: '#3fb950',
              values: [
                { title: 'مزیت رقابتی پایدار', desc: 'ترکیب هوش مصنوعی تحلیل ریشه‌ای + حریم خصوصی محلی + بومی‌سازی کامل، یک مزیت استراتژیک منحصربه‌فرد ایجاد کرده است.' },
                { title: 'دسترسی به داده‌های رفتاری', desc: 'با جذب کاربران، داده‌های ارزشمندی درباره الگوهای بهره‌وری در ایران جمع‌آوری می‌شود که برای توسعه محصول و تحلیل بازار کاربرد دارد.' },
                { title: 'پتانسیل اکوسیستم', desc: 'امکان توسعه به سمت پلتفرم جامع سلامت و بهره‌وری سازمانی، جایگاه استراتژیک را در بازار تقویت می‌کند.' },
              ],
            },
          ].map((cat, i) => (
            <div key={i} className="card" style={{ padding: '28px', borderTop: `4px solid ${cat.color}` }}>
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

        {/* ===== VALUE ADDED: SUPPLIER & CUSTOMER ===== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="card" style={{ padding: '28px', borderLeft: '4px solid #58a6ff' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#58a6ff', marginBottom: '16px' }}>
              🏢 ارزش افزوده از دید عرضه‌کننده (LifeFlow)
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'کسب درآمد از اشتراک‌های Premium و Team',
                'جمع‌آوری داده‌های رفتاری برای بهبود الگوریتم‌ها',
                'ایجاد برند معتبر در حوزه بهره‌وری هوشمند',
                'گسترش به بازار B2B با درآمد پایدار (ARR)',
                'کاهش وابستگی به منابع خارجی با معماری محلی',
              ].map((item, i) => (
                <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #21262d', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ color: '#58a6ff' }}>✓</span>
                  <span style={{ fontSize: '13px', color: '#c9d1d9' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card" style={{ padding: '28px', borderLeft: '4px solid #3fb950' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#3fb950', marginBottom: '16px' }}>
              👤 ارزش افزوده از دید مشتری
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'دسترسی به تحلیل ریشه‌ای «چرا» به اهداف نمی‌رسند',
                'داشبورد شخصی و سازمانی برای رصد پیشرفت',
                'هشدار فرسودگی و پیشنهادهای بهبود',
                'حریم خصوصی کامل (داده‌ها در دستگاه کاربر)',
                'صرفه‌جویی قابل‌توجه در زمان و افزایش کیفیت زندگی',
              ].map((item, i) => (
                <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #21262d', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ color: '#3fb950' }}>✓</span>
                  <span style={{ fontSize: '13px', color: '#c9d1d9' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== SUSTAINABILITY & IMITABILITY ===== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="card" style={{ padding: '28px', borderTop: '3px solid #bc8cff' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#bc8cff', marginBottom: '16px' }}>
              🔒 پایداری ارزش افزوده
            </h3>
            <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.8 }}>
              ارزش LifeFlow پایدار است زیرا:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '12px' }}>
              {[
                'نیاز به تحلیل رفتار و پیش‌بینی فرسودگی یک نیاز پایدار انسانی است',
                'با افزایش داده‌های کاربران، الگوریتم‌ها دقیق‌تر می‌شوند (اثر شبکه‌ای)',
                'مدل اشتراکی درآمد تکرارپذیر ایجاد می‌کند',
                'حریم خصوصی محلی باعث اعتماد و ماندگاری کاربران می‌شود',
              ].map((item, i) => (
                <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid #21262d', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#bc8cff', flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: '12px', color: '#c9d1d9' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card" style={{ padding: '28px', borderTop: '3px solid #f85149' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f85149', marginBottom: '16px' }}>
              🧩 تقلیدپذیری یا سختی تقلید
            </h3>
            <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.8 }}>
              عوامل سختی تقلید (موانع ورود):
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '12px' }}>
              {[
                'الگوریتم تحلیل ریشه‌ای (Root Cause) نیازمند دانش روان‌شناسی و AI است',
                'معماری Edge Computing (پردازش محلی) پیچیدگی فنی بالایی دارد',
                'داده‌های رفتاری جمع‌آوری‌شده یک مزیت اطلاعاتی است',
                'برند و اعتماد کاربران در بازار ایران زمان‌بر است',
                'یکپارچگی با تقویم شمسی و فرهنگ کاری ایرانی نیازمند بومی‌سازی عمیق است',
              ].map((item, i) => (
                <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid #21262d', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#f85149', flexShrink: 0 }}>■</span>
                  <span style={{ fontSize: '12px', color: '#c9d1d9' }}>{item}</span>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '12px', color: '#8b949e', marginTop: '12px', fontStyle: 'italic' }}>
              اگرچه برخی ویژگی‌ها قابل کپی هستند، ترکیب این عوامل تقلید کامل را دشوار می‌کند.
            </p>
          </div>
        </div>

        {/* ===== WHY CUSTOMER SHOULD CARE ===== */}
        <div className="card" style={{ padding: '32px', marginBottom: '40px', background: 'linear-gradient(135deg, rgba(88,166,255,0.06), rgba(188,140,255,0.06))', border: '1px solid rgba(88,166,255,0.2)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '16px' }}>
            ❓ چرا مشتری باید به LifeFlow توجه کند؟
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              {
                icon: '⏳',
                title: 'صرفه‌جویی در زمان',
                desc: 'بازیابی ۱ تا ۲ ساعت در روز که معادل ۳۰ تا ۶۰ ساعت در ماه است.'
              },
              {
                icon: '🧠',
                title: 'درک عمیق از خود',
                desc: 'دسترسی به تحلیل‌هایی که هیچ ابزار دیگری ارائه نمی‌دهد.'
              },
              {
                icon: '🛡️',
                title: 'حریم خصوصی کامل',
                desc: 'داده‌ها هرگز سرور را ترک نمی‌کنند – کاملاً محلی و امن.'
              },
              {
                icon: '📈',
                title: 'بازگشت سرمایه بالا',
                desc: 'با هزینه ماهانه ۴۹ هزار تومان، ارزش دریافتی چندین برابر است.'
              },
              {
                icon: '🏢',
                title: 'قابل استفاده برای تیم',
                desc: 'از فردی تا سازمانی، با قابلیت مدیریت و رصد سلامت تیم.'
              },
              {
                icon: '🇮🇷',
                title: 'بومی و متناسب با ایران',
                desc: 'تقویم شمسی، تعطیلات، و فرهنگ کاری ایرانی در هسته محصول.'
              },
            ].map((item, i) => (
              <div key={i} style={{ padding: '16px', background: '#0d1117', borderRadius: '12px', border: '1px solid #30363d', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '6px' }}>{item.title}</h4>
                <p style={{ fontSize: '12px', color: '#8b949e', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== ROI CALCULATOR (واقعی‌تر) ===== */}
        <div className="card" style={{ padding: '32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            💰 محاسبه ROI برای کاربر Premium
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { label: 'صرفه‌جویی روزانه', value: '~۲ ساعت', icon: '⏰', color: '#58a6ff', note: 'بر اساس تست اولیه' },
              { label: 'ارزش ماهانه (تخمینی)', value: '~۸۰۰K تومان', icon: '💵', color: '#3fb950', note: '(حقوق ساعتی متوسط)' },
              { label: 'هزینه اشتراک', value: '۴۹K تومان', icon: '💳', color: '#d29922', note: 'Premium Plan' },
              { label: 'ROI ماهانه', value: '~۱۵۰۰%', icon: '📈', color: '#3fb950', note: 'بازگشت سرمایه بالا' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '20px', background: '#0d1117', borderRadius: '12px', border: '1px solid #21262d' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: item.color, marginBottom: '4px' }}>{item.value}</div>
                <div style={{ fontSize: '13px', color: '#c9d1d9', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>{item.note}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#8b949e', marginTop: '16px', textAlign: 'center' }}>
            * اعداد بر اساس برآورد اولیه از بازخورد کاربران تست‌کننده است و ممکن است با گسترش بازار تغییر کند.
          </p>
        </div>

        {/* ===== INTERMEDIATION (واسطه‌گری) ===== */}
        <div className="card" style={{ padding: '32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            🔗 نقش واسطه‌گری (Intermediation) در خلق ارزش
          </h2>
          <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.9, marginBottom: '20px' }}>
            LifeFlow به عنوان یک <strong style={{ color: '#58a6ff' }}>پلتفرم واسط دیجیتال</strong> بین داده‌های رفتاری خام کاربران و بینش‌های قابل اقدام عمل می‌کند. این واسطه‌گری ارزش اطلاعاتی بالایی ایجاد می‌کند:
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { label: 'داده رفتاری', icon: '📊', color: '#8b949e' },
              { label: '→', icon: '', color: '#30363d' },
              { label: 'LifeFlow AI', icon: '🧠', color: '#58a6ff', highlight: true },
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
          <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {[
              { title: 'کاهش عدم تقارن اطلاعاتی', desc: 'کاربران بدون نیاز به دانش تخصصی، به تحلیل‌های عمیق دسترسی پیدا می‌کنند.' },
              { title: 'ارزش شبکه‌ای', desc: 'هرچه کاربران بیشتر از پلتفرم استفاده کنند، الگوریتم‌ها دقیق‌تر و ارزش بیشتر می‌شود.' },
              { title: 'تسهیل تصمیم‌گیری', desc: 'داده‌های خام به بینش‌های عملی تبدیل می‌شوند که قابل اجرا هستند.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '14px', background: '#0d1117', borderRadius: '8px', border: '1px solid #30363d' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#58a6ff', marginBottom: '4px' }}>{item.title}</h4>
                <p style={{ fontSize: '12px', color: '#8b949e', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Project Explorer & Footer ===== */}
        <ProjectExplorer onNavigate={onNavigate} />
        <Footer onNavigate={onNavigate} />

      </div>
    </div>
  );
}