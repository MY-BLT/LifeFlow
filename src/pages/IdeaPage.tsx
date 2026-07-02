import Footer from "@/components/Footer";
import ProjectExplorer from "@/components/ProjectExplorer";

interface Props { onNavigate: (page: string) => void; }

export default function IdeaPage({ onNavigate }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      {/* استایل‌های اختصاصی */}
      <style>{`
        @keyframes pulseWarning {
          0% { box-shadow: 0 0 0 0 rgba(248,81,73,0.4); }
          70% { box-shadow: 0 0 0 12px rgba(248,81,73,0); }
          100% { box-shadow: 0 0 0 0 rgba(248,81,73,0); }
        }
        .problem-critical {
          animation: pulseWarning 2.5s infinite;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(248,81,73,0.4) !important;
          transition: all 0.3s ease;
        }
      `}</style>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>منشأ ایده</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#f0f6fc', marginBottom: '16px' }}>
            LifeFlow چگونه متولد شد؟
          </h1>
          <p style={{ fontSize: '16px', color: '#8b949e', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
            داستان تولد یک ایده از دل یک مشکل واقعی و دردناک
          </p>
        </div>

        {/* Problem Statement - اغراق‌شده و جدی */}
        <div className="problem-critical" style={{
          background: 'linear-gradient(145deg, rgba(248,81,73,0.1), rgba(248,81,73,0.03))', 
          border: '1px solid rgba(248,81,73,0.5)',
          borderRadius: '16px', padding: '40px', marginBottom: '40px',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-20px', left: '-20px', fontSize: '180px', opacity: '0.05', pointerEvents: 'none' }}>
            ⚠️
          </div>
          
          <span style={{ display: 'inline-block', padding: '4px 12px', background: '#f8514920', color: '#f85149', borderRadius: '20px', fontSize: '12px', fontWeight: 700, marginBottom: '16px', letterSpacing: '1px' }}>
            بحران خاموش
          </span>
          
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#f0f6fc', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '30px' }}>🚨</span> مشکل اصلی: حلقه باطل شکست
          </h2>
          
          <p style={{ fontSize: '16px', color: '#f0f6fc', lineHeight: 2, marginBottom: '20px' }}>
            هر روز صبح با انگیزه و یک برنامه دقیق می‌نشستیم. هر شب با احساس گناه و شکست می‌خوابیدیم. نه به خاطر تنبلی، بلکه چون ابزارهایی که داشتیم فقط کارها را <strong style={{ color: '#f0f6fc', borderBottom: '2px dotted #8b949e' }}>نشان</strong> می‌دادند، اما هرگز نمی‌گفتند <strong style={{ color: '#f85149' }}>چرا اهداف شکست می‌خورند.</strong>
          </p>
          
          <div style={{ height: '1px', background: 'rgba(248,81,73,0.3)', margin: '24px 0' }} />
          
          <p style={{ fontSize: '15px', color: '#c9d1d9', lineHeight: 1.9 }}>
            اپلیکیشن‌های موجود خارجی مثل Todoist، Notion و Toggl و یا ایرانی مثل تسکولو و میزیتو، تسک‌ها را مدیریت می‌کنند. اما هیچ‌کدام نمی‌پرسند: 
            <br />
            <em style={{ color: '#d29922', fontWeight: 600, marginTop: '12px', display: 'inline-block' }}>
              "آیا می‌دانید ۳ ساعت از روزتان کجا ناپدید می‌شود؟ آیا می‌دانید الگوی رفتاری شما در شب، منجر به شکست برنامه‌های صبح می‌شود؟"
            </em>
          </p>
        </div>

        {/* Origin Story Timeline - با تاریخ‌های اصلاح‌شده */}
        <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginBottom: '28px' }}>
            📅 جدول زمانی شکل‌گیری ایده
          </h2>
          {[
            {
              date: 'فروردین ۱۴۰۵',
              title: 'مشاهده اول – کشف مشکل شخصی',
              desc: 'محقق پروژه متوجه می‌شود که علی‌رغم استفاده از چندین اپلیکیشن مدیریت وقت، هنوز ساعاتی از روز بدون بازده می‌گذرد و هیچ ابزاری علت را توضیح نمی‌دهد. جرقه اولیه برای ایجاد یک راه‌حل جدید زده می‌شود.',
              color: '#58a6ff',
            },
            {
              date: 'اردیبهشت ۱۴۰۵',
              title: 'تحقیق بازار اولیه',
              desc: 'با تعداد محدودی از دانشجویان و حرفه‌ای‌ها گفتگو شد. اکثر آن‌ها اشاره کردند ابزارهای موجود "نشان می‌دهند اما یاد نمی‌دهند". این اعتبارسنجی اولیه، ضرورت ساخت محصولی با رویکرد تحلیلی را تأیید کرد.',
              color: '#3fb950',
            },
            {
              date: 'خرداد ۱۴۰۵',
              title: 'طراحی و توسعه MVP',
              desc: 'اولین نسخه MVP (حداقل محصول قابل عرضه) طراحی و پیاده‌سازی شد. رویکرد اصلی: نه فقط ثبت زمان، بلکه تحلیل الگوهای رفتاری با هوش مصنوعی و ارائه توصیه‌های شخصی‌سازی‌شده.',
              color: '#bc8cff',
            },
            {
              date: 'تیر ۱۴۰۵ (تا ۸ تیر)',
              title: 'اعتبارسنجی و بهبودهای نهایی',
              desc: 'نسخه اولیه روی تعداد محدودی از کاربران منتخب تست شد و بازخوردهای اولیه جمع‌آوری گردید. بر اساس آن، بهبودهای نهایی اعمال شد. در تاریخ ۸ تیر، نسخه پایدار برای ارائه عمومی آماده گردید.',
              color: '#f85149',
            },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: i < 3 ? '28px' : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '16px' }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: item.color, border: '3px solid #161b22',
                  boxShadow: `0 0 10px ${item.color}80`, flexShrink: 0,
                }} />
                {i < 3 && <div style={{ flex: 1, width: '2px', background: '#30363d', marginTop: '4px' }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: i < 3 ? '0' : 0 }}>
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
              <div key={i} className="card stat-card" style={{ padding: '24px', borderTop: `3px solid ${item.color}` }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f0f6fc', marginBottom: '10px' }}>{item.title}</h3>
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
            LifeFlow جزء اولین پلتفرم‌های ایرانی است که با هوش مصنوعی، نه فقط <strong style={{ color: '#f0f6fc' }}>چه</strong> کار می‌کنید، بلکه <strong style={{ color: '#58a6ff' }}>چرا</strong> موفق یا ناموفق هستید را کشف می‌کند. تبدیل داده‌های خام به بینش‌های عملی و قابل اقدام.
          </p>
        </div>

        {/* Project Sections Grid & Footer */}
        <ProjectExplorer onNavigate={onNavigate} />
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}