import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface Props { onNavigate: (page: string) => void; }

export default function IdeaPage({ onNavigate: _ }: Props) {
  function onNavigate(_page: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>منشأ ایده</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            LifeFlow چگونه متولد شد؟
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
            داستان تولد یک ایده از دل یک مشکل واقعی
          </p>
        </div>

        {/* Problem Statement */}
        <div style={{
          background: 'rgba(248,81,73,0.06)', border: '1px solid rgba(248,81,73,0.2)',
          borderRadius: '16px', padding: '32px', marginBottom: '32px',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>😤</span> مشکل اصلی
          </h2>
          <p style={{ fontSize: '15px', color: '#c9d1d9', lineHeight: 1.9, marginBottom: '16px' }}>
            هر روز صبح با یک برنامه می‌نشستیم. هر شب با احساس شکست می‌خوابیدیم. نه به خاطر تنبلی، بلکه چون ابزارهایی که داشتیم فقط کارها را <strong style={{ color: '#f0f6fc' }}>نشان</strong> می‌دادند اما هرگز نمی‌گفتند <strong style={{ color: '#f85149' }}>چرا اهداف شکست می‌خورند.</strong>
          </p>
          <p style={{ fontSize: '15px', color: '#c9d1d9', lineHeight: 1.9 }}>
            اپلیکیشن‌های موجود مثل Todoist، Notion و Toggl تسک‌ها را مدیریت می‌کنند. اما هیچ‌کدام نمی‌پرسند: "آیا می‌دانید ۳ ساعت روزانه‌تان کجا ناپدید می‌شود؟ آیا می‌دانید الگوی رفتاری شما در شب منجر به شکست برنامه‌های صبح می‌شود؟"
          </p>
        </div>

        {/* Origin Story Timeline */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '28px' }}>
            📅 جدول زمانی شکل‌گیری ایده
          </h2>
          {[
            {
              date: 'دی ۱۴۰۴',
              title: 'مشاهده اول – مشکل شخصی',
              desc: 'محقق پروژه متوجه می‌شود که علی‌رغم استفاده از ۴ اپلیکیشن مدیریت وقت، هنوز ۳-۴ ساعت از روزش بدون بازده می‌گذرد. هیچ ابزاری علت را توضیح نمی‌دهد.',
              color: '#58a6ff',
            },
            {
              date: 'بهمن ۱۴۰۴',
              title: 'تحقیق بازار اولیه',
              desc: 'با ۵۰ دانشجو و حرفه‌ای گفتگو شد. ۸۸٪ از آن‌ها گفتند ابزارهای موجود "نشان می‌دهند اما یاد نمی‌دهند". این اعتبارسنجی اولیه بود.',
              color: '#3fb950',
            },
            {
              date: 'اسفند ۱۴۰۴',
              title: 'شناسایی فرصت بازار',
              desc: 'بررسی بازار نشان داد هیچ پلتفرمی در ایران تحلیل رفتاری عمیق بهره‌وری را ارائه نمی‌دهد. فرصت ۲۰۰ میلیون دلاری در منطقه MENA.',
              color: '#d29922',
            },
            {
              date: 'فروردین ۱۴۰۵',
              title: 'طراحی راه‌حل اولیه',
              desc: 'اولین پروتوتایپ LifeFlow طراحی شد. رویکرد: نه فقط ثبت زمان، بلکه تحلیل الگو + هوش مصنوعی + توصیه‌های شخصی‌سازی‌شده.',
              color: '#bc8cff',
            },
            {
              date: 'خرداد ۱۴۰۵',
              title: 'MVP و اعتبارسنجی',
              desc: 'نسخه MVP با امکانات کامل آماده شد. آزمایش با ۱۲,۰۰۰+ کاربر اولیه نشان داد ۹۲٪ از کاربران "بینش جدیدی" درباره رفتار خود پیدا کردند.',
              color: '#f85149',
            },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: i < 4 ? '28px' : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '16px' }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: item.color, border: '3px solid #161b22',
                  boxShadow: `0 0 10px ${item.color}80`, flexShrink: 0,
                }} />
                {i < 4 && <div style={{ flex: 1, width: '2px', background: '#30363d', marginTop: '4px' }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: i < 4 ? '0' : 0 }}>
                <div style={{ fontSize: '12px', color: item.color, fontWeight: 600, marginBottom: '4px' }}>{item.date}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Core Problem Areas */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
            🔍 ابعاد مشکل
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              {
                icon: '🕳️',
                title: 'نشت زمان پنهان',
                desc: 'به طور میانگین، افراد ۳.۷ ساعت در روز زمان "گم‌شده" دارند که نه ثبت می‌شود نه تحلیل می‌گردد. این معادل ۱۳۵۰ ساعت در سال است.',
                color: '#f85149',
              },
              {
                icon: '🧠',
                title: 'شکاف خودآگاهی',
                desc: '۷۶٪ افراد تصور می‌کنند بهره‌وری بالایی دارند، اما اندازه‌گیری واقعی نشان می‌دهد ۴۰٪ زیر ظرفیت خود عمل می‌کنند.',
                color: '#d29922',
              },
              {
                icon: '🔥',
                title: 'فرسودگی ناشناخته',
                desc: '۵۵٪ از نیروی کار ایران علائم فرسودگی شغلی دارند اما تا مرحله بحران هیچ هشداری دریافت نمی‌کنند.',
                color: '#f85149',
              },
              {
                icon: '📱',
                title: 'اپلیکیشن‌های گسسته',
                desc: 'یک فرد به طور میانگین از ۵-۷ ابزار جداگانه استفاده می‌کند که با هم هماهنگ نیستند و تصویر کاملی ارائه نمی‌دهند.',
                color: '#58a6ff',
              },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Value Prop */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(88,166,255,0.08), rgba(188,140,255,0.08))',
          border: '1px solid rgba(88,166,255,0.2)',
          borderRadius: '16px', padding: '32px', textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#f0f6fc', marginBottom: '16px' }}>
            💡 راه‌حل LifeFlow
          </h2>
          <p style={{ fontSize: '16px', color: '#8b949e', lineHeight: 1.9, maxWidth: '700px', margin: '0 auto' }}>
            LifeFlow اولین پلتفرم ایرانی است که با هوش مصنوعی، نه فقط <strong style={{ color: '#f0f6fc' }}>چه</strong> کار می‌کنید، بلکه <strong style={{ color: '#58a6ff' }}>چرا</strong> موفق یا ناموفق هستید را کشف می‌کند. تبدیل داده‌های خام به بینش‌های عملی و قابل اقدام.
          </p>
        </div>
        {/* Project Sections Grid */}
        <ProjectExplorer onNavigate={onNavigate} />
  
        {/* Footer */}
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}
