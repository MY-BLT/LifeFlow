import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface Props { onNavigate: (page: string) => void; }

export default function RoadmapPage({ onNavigate }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

        {/* ===== HEADER ===== */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-purple" style={{ marginBottom: '16px', display: 'inline-flex' }}>نقشه راه</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            مسیر توسعه LifeFlow
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto' }}>
            از MVP فعلی تا رهبری بازار – برنامه‌ریزی دقیق برای ۶ ماه آینده و چشم‌انداز بلندمدت
          </p>
        </div>

        {/* ===== 1. MVP فعلی و امکانات پیاده‌سازی‌شده ===== */}
        <div className="card" style={{ padding: '32px', marginBottom: '32px', border: '2px solid rgba(63,185,80,0.3)', background: 'rgba(63,185,80,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '28px' }}>✅</span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc' }}>نسخه فعلی (MVP) – خرداد ۱۴۰۵</h2>
            <span className="badge badge-green" style={{ marginRight: 'auto' }}>تکمیل‌شده</span>
          </div>
          <p style={{ fontSize: '14px', color: '#8b949e', marginBottom: '16px' }}>
            LifeFlow در حال حاضر در نسخه MVP (حداقل محصول قابل عرضه) قرار دارد. تمام امکانات زیر پیاده‌سازی شده و آماده ارائه به کاربران اولیه است:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {[
              'داشبورد شخصی کامل با LifeScore',
              'ثبت و مدیریت فعالیت‌های روزانه',
              'بینش‌های هوش مصنوعی (تحلیل ریشه‌ای)',
              'داشبورد سازمانی (مدیریت تیم)',
              'خروجی JSON و CSV برای گزارش‌گیری',
              'PWA و قابلیت استفاده آفلاین',
              'ذخیره‌سازی محلی (حریم خصوصی کامل)',
              'سیستم اهداف و عادت‌ها',
              'مشاور AI تعاملی (چت)',
              'شبیه‌ساز آینده (پیش‌بینی بهره‌وری)',
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '13px', color: '#c9d1d9', padding: '6px 0',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                <span style={{ color: '#3fb950' }}>✓</span> {item}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(63,185,80,0.06)', borderRadius: '8px', border: '1px solid rgba(63,185,80,0.15)' }}>
            <span style={{ fontSize: '13px', color: '#8b949e' }}>
              📌 <strong>وضعیت:</strong> MVP کامل شده و در تاریخ ۸ تیر ۱۴۰۵ برای ارائه عمومی آماده است. 
              هم‌اکنون در مرحله جذب کاربران اولیه و جمع‌آوری بازخورد قرار داریم.
            </span>
          </div>
        </div>

        {/* ===== 2. برنامه توسعه سه‌ماهه ===== */}
        <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '28px' }}>📅</span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc' }}>برنامه توسعه سه‌ماهه (تیر – شهریور ۱۴۰۵)</h2>
            <span className="badge badge-blue" style={{ marginRight: 'auto' }}>در دست اقدام</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              {
                month: 'تیر ۱۴۰۵',
                items: ['جذب ۱۰۰ کاربر اولیه', 'جمع‌آوری بازخورد MVP', 'رفع باگ‌های اولیه', 'بهبود UX آنبوردینگ'],
                color: '#58a6ff',
              },
              {
                month: 'مرداد ۱۴۰۵',
                items: ['توسعه اپلیکیشن موبایل (React Native)', 'یکپارچه‌سازی Google Calendar', 'سیستم اعلان‌های هوشمند', 'بهبود الگوریتم AI'],
                color: '#3fb950',
              },
              {
                month: 'شهریور ۱۴۰۵',
                items: ['راه‌اندازی سیستم رفرال', 'برنامه وفاداری کاربران', 'بهینه‌سازی عملکرد', 'آماده‌سازی برای بازاریابی گسترده'],
                color: '#bc8cff',
              },
            ].map((q, i) => (
              <div key={i} style={{
                padding: '18px', borderRadius: '12px',
                background: `${q.color}06`, border: `1px solid ${q.color}20`,
                borderTop: `4px solid ${q.color}`,
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: q.color, marginBottom: '12px' }}>{q.month}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {q.items.map((item, k) => (
                    <li key={k} style={{
                      fontSize: '13px', color: '#c9d1d9', padding: '4px 0',
                      display: 'flex', gap: '8px', alignItems: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}>
                      <span style={{ color: q.color }}>◆</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 3. برنامه توسعه شش‌ماهه ===== */}
        <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '28px' }}>🚀</span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc' }}>برنامه توسعه شش‌ماهه (مهر – اسفند ۱۴۰۵)</h2>
            <span className="badge badge-purple" style={{ marginRight: 'auto' }}>برنامه‌ریزی‌شده</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {[
              {
                period: 'مهر – آبان ۱۴۰۵',
                items: ['نسخه Enterprise با قابلیت SSO', 'گزارش‌های مدیریتی پیشرفته', 'API عمومی برای یکپارچه‌سازی', 'پشتیبانی از چند زبان (انگلیسی)'],
                color: '#58a6ff',
              },
              {
                period: 'آذر – دی ۱۴۰۵',
                items: ['داشبورد مدیر ارشد (Executive)', 'تحلیل احساسات از ورودی‌های متنی', 'یکپارچه‌سازی با Slack و Teams', 'سیستم هشدار پیش‌بینی فرسودگی'],
                color: '#3fb950',
              },
              {
                period: 'بهمن – اسفند ۱۴۰۵',
                items: ['راه‌اندازی بازارگاه اپلیکیشن (App Marketplace)', 'ابزارهای تحلیل تیم (Team Analytics)', 'قابلیت صادرات گزارش به PDF/Excel', 'بهبود مقیاس‌پذیری زیرساخت'],
                color: '#bc8cff',
              },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '18px', borderRadius: '12px',
                background: `${s.color}06`, border: `1px solid ${s.color}20`,
                borderTop: `4px solid ${s.color}`,
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: s.color, marginBottom: '12px' }}>{s.period}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {s.items.map((item, k) => (
                    <li key={k} style={{
                      fontSize: '13px', color: '#c9d1d9', padding: '4px 0',
                      display: 'flex', gap: '8px', alignItems: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}>
                      <span style={{ color: s.color }}>◆</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 4. امکانات نسخه بعدی ===== */}
        <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '28px' }}>🔮</span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc' }}>نسخه بعدی (LifeFlow 2.0) – بهار ۱۴۰۶</h2>
          </div>
          <p style={{ fontSize: '14px', color: '#8b949e', marginBottom: '20px' }}>
            نسخه بعدی LifeFlow با تمرکز بر هوش مصنوعی پیشرفته و یکپارچگی عمیق با اکوسیستم کاری کاربران طراحی می‌شود:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              { icon: '🧠', title: 'AI پیش‌بینی‌کننده', desc: 'پیش‌بینی بهره‌وری و فرسودگی تا ۴ هفته قبل با دقت ۸۵٪' },
              { icon: '🔌', title: 'یکپارچگی کامل', desc: 'اتصال به Jira، Trello، Asana، Notion و Slack' },
              { icon: '📱', title: 'اپلیکیشن موبایل', desc: 'نسخه اختصاصی iOS و Android با قابلیت آفلاین' },
              { icon: '🏢', title: 'مدیریت منابع انسانی', desc: 'ابزارهای تخصصی برای HR و مدیریت استعداد' },
              { icon: '🌐', title: 'چندزبانه', desc: 'پشتیبانی از فارسی، انگلیسی و عربی' },
              { icon: '🤖', title: 'مشاور AI تعاملی', desc: 'چت‌بات پیشرفته با قابلیت مکالمه طبیعی' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '16px', borderRadius: '12px',
                background: '#0d1117', border: '1px solid #30363d',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '6px' }}>{item.title}</h4>
                <p style={{ fontSize: '12px', color: '#8b949e', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 5. چالش‌ها ===== */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            ⚠️ چالش‌های پیش‌رو
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {[
              {
                icon: '⚙️',
                title: 'چالش‌های فنی',
                color: '#58a6ff',
                items: [
                  'مقیاس‌پذیری موتور AI با افزایش کاربران',
                  'بهینه‌سازی عملکرد در دستگاه‌های ضعیف',
                  'یکپارچگی با اکوسیستم‌های خارجی (API)',
                  'امنیت داده‌ها در معماری محلی (Edge)',
                ],
              },
              {
                icon: '📊',
                title: 'چالش‌های بازار',
                color: '#d29922',
                items: [
                  'آموزش بازار به مفهوم «تحلیل ریشه‌ای»',
                  'رقابت با ابزارهای تثبیت‌شده خارجی',
                  'جذب کاربران اولیه و ایجاد اعتبار',
                  'تناسب قیمت‌گذاری با قدرت خرید ایران',
                ],
              },
              {
                icon: '⚖️',
                title: 'چالش‌های حقوقی و اعتمادسازی',
                color: '#f85149',
                items: [
                  'شفافیت در استفاده از داده‌های کاربران',
                  'رعایت قوانین حریم خصوصی (GDPR و داخلی)',
                  'جلب اعتماد سازمان‌ها برای اشتراک‌گذاری داده',
                  'محافظت از مالکیت فکری الگوریتم‌ها',
                ],
              },
            ].map((challenge, i) => (
              <div key={i} className="card" style={{
                padding: '24px',
                borderTop: `4px solid ${challenge.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '28px' }}>{challenge.icon}</span>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: challenge.color }}>{challenge.title}</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {challenge.items.map((item, k) => (
                    <li key={k} style={{
                      fontSize: '13px', color: '#8b949e', padding: '6px 0',
                      borderBottom: '1px solid #21262d', display: 'flex', gap: '8px',
                    }}>
                      <span style={{ color: challenge.color, flexShrink: 0 }}>•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 6. ریسک‌های اصلی و راهکارها ===== */}
        <div className="card" style={{ padding: '32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
            🛡️ ریسک‌های اصلی و راهکارهای کاهش
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {[
              {
                risk: 'عدم پذیرش بازار و جذب کاربر',
                solution: 'MVP تست‌شده با گروه‌های کانونی، بازاریابی محتوایی، برنامه رفرال قوی',
                color: '#f85149',
              },
              {
                risk: 'رقابت شدید از سوی ابزارهای خارجی',
                solution: 'تمرکز بر بومی‌سازی، حریم خصوصی محلی و قیمت رقابتی',
                color: '#d29922',
              },
              {
                risk: 'مشکلات فنی در مقیاس‌پذیری',
                solution: 'معماری میکروسرویس، استفاده از CDN و بهینه‌سازی کد',
                color: '#58a6ff',
              },
              {
                risk: 'تغییر قوانین داده‌ها در ایران',
                solution: 'ذخیره‌سازی محلی، عدم وابستگی به سرور خارجی، مشاوره حقوقی',
                color: '#bc8cff',
              },
              {
                risk: 'نوسانات ارزی و تورم',
                solution: 'قیمت‌گذاری بر اساس تومان، مدل اشتراک انعطاف‌پذیر',
                color: '#3fb950',
              },
              {
                risk: 'خروج کاربران به دلیل پیچیدگی',
                solution: 'آنبوردینگ تعاملی، آموزش‌های گام‌به‌گام، پشتیبانی ۲۴/۷',
                color: '#ff7b72',
              },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '18px', borderRadius: '12px',
                background: `${item.color}06`, border: `1px solid ${item.color}20`,
                borderRight: `4px solid ${item.color}`,
              }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: item.color, marginBottom: '8px' }}>
                  ⚡ {item.risk}
                </div>
                <div style={{ fontSize: '13px', color: '#c9d1d9', lineHeight: 1.6 }}>
                  ✅ {item.solution}
                </div>
              </div>
            ))}
          </div>
        </div>

         {/* ===== چشم‌انداز بلندمدت (واقع‌گرایانه) ===== */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(88,166,255,0.08), rgba(188,140,255,0.08))',
          border: '1px solid rgba(88,166,255,0.2)',
          borderRadius: '20px', padding: '40px', textAlign: 'center',
          marginBottom: '40px',
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            🌟 چشم‌انداز ۳ ساله (۱۴۰۵ تا ۱۴۰۸)
          </h2>
          <p style={{ fontSize: '16px', color: '#8b949e', lineHeight: 1.9, maxWidth: '700px', margin: '0 auto 24px' }}>
            مسیر رشد LifeFlow بر اساس اصول <strong style={{ color: '#58a6ff' }}>Lean Startup</strong> و 
            <strong style={{ color: '#3fb950' }}> بازخورد مستمر کاربران</strong>. اعداد زیر نشان‌دهنده 
            <strong style={{ color: '#d29922' }}> سناریوی پایه (Baseline)</strong> هستند و در صورت جذب سرمایه یا رشد ویروسی، 
            پتانسیل افزایش ۲ تا ۳ برابری دارند.
          </p>

          {/* سناریوی رشد سه‌ساله */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { year: 'سال ۱ (۱۴۰۶)', label: 'جستجوی Product-Market Fit', users: '۵K-۱۰K', orgs: '۵۰+', arr: '~$۵۰K', color: '#58a6ff' },
              { year: 'سال ۲ (۱۴۰۷)', label: 'رشد و توسعه بازار', users: '۵۰K-۱۰۰K', orgs: '۵۰۰+', arr: '~$۵۰۰K', color: '#3fb950' },
              { year: 'سال ۳ (۱۴۰۸)', label: 'مقیاس‌پذیری و توسعه منطقه‌ای', users: '۲۰۰K-۵۰۰K', orgs: '۲K+', arr: '~$۲M-۵M', color: '#bc8cff' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '20px', borderRadius: '14px',
                background: `${item.color}08`, border: `1px solid ${item.color}25`,
                borderTop: `4px solid ${item.color}`,
              }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: item.color, marginBottom: '4px' }}>
                  {item.year}
                </div>
                <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '12px' }}>{item.label}</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc' }}>{item.users}</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>کاربر فعال</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#c9d1d9', marginTop: '6px' }}>{item.orgs}</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>سازمان</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: item.color, marginTop: '6px' }}>{item.arr}</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>درآمد سالانه (ARR)</div>
              </div>
            ))}
          </div>

          {/* شاخص‌های کلیدی و مفروضات */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px', textAlign: 'right', padding: '16px',
            background: '#0d1117', borderRadius: '12px', border: '1px solid #30363d',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#8b949e' }}>📌 مفروضات کلیدی</div>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '11px', color: '#c9d1d9', lineHeight: 1.8 }}>
                <li>• نرخ تبدیل رایگان → پولی: ~۵-۷٪</li>
                <li>• نرخ ریزش ماهانه:  ۱۰٪</li>
                <li>• متوسط درآمد هر کاربر (ARPU): ~$۵۰/سال</li>
              </ul>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#8b949e' }}>🎯 پیش‌نیازهای تحقق</div>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '11px', color: '#c9d1d9', lineHeight: 1.8 }}>
                <li>• جذب سرمایه اولیه (Seed)</li>
                <li>• تیم بازاریابی و فروش B2B</li>
                <li>• بومی‌سازی برای کشورهای هدف</li>
              </ul>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#8b949e' }}>⚠️ ریسک‌های کلیدی</div>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '11px', color: '#c9d1d9', lineHeight: 1.8 }}>
                <li>• عدم پذیرش بازار</li>
                <li>• رقابت با غول‌های خارجی</li>
                <li>• تغییرات قوانین ارزی</li>
              </ul>
            </div>
          </div>

          {/* استراتژی خروج یا جایگزین */}
          <div style={{ marginTop: '20px', padding: '16px', borderRadius: '10px', background: 'rgba(210,153,34,0.06)', border: '1px solid rgba(210,153,34,0.2)' }}>
            <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.7 }}>
              💡 <strong style={{ color: '#d29922' }}>سناریوی جایگزین (محافظه‌کارانه):</strong> 
              اگر رشد بازار کندتر از حد انتظار باشد، مسیر تمرکز بر <strong style={{ color: '#58a6ff' }}>بازار B2B سازمانی</strong> 
              (با قراردادهای سالانه) و ارائه <strong style={{ color: '#3fb950' }}>راه‌حل سفارشی</strong> به سازمان‌های بزرگ 
              (مانند بانک‌ها و شرکت‌های دانش‌بنیان) در پیش گرفته خواهد شد تا درآمد پایدار با ریسک کمتر ایجاد شود.
            </p>
          </div>
        </div>
        {/* ===== Project Sections Grid & Footer ===== */}
        <ProjectExplorer onNavigate={onNavigate} />
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}