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

  {/* Problem Statement - واقعی‌تر و تاثیرگذارتر */}
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
    مشکل واقعی
  </span>
  
  <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#f0f6fc', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
    <span style={{ fontSize: '30px' }}>⏱️</span> وقت می‌گذرد، اما نمی‌دانیم کجا؟
  </h2>
  
  <p style={{ fontSize: '16px', color: '#f0f6fc', lineHeight: 2, marginBottom: '20px' }}>
    ساعت ۹ صبح: "<em>امروز حتماً پروژه رو تموم می‌کنم</em>"<br />
    ساعت ۱۱ شب: "<em>باز هیچ‌کاری انجام ندادم... فردا درستش می‌کنم</em>"
  </p>
  
  <p style={{ fontSize: '15px', color: '#c9d1d9', lineHeight: 1.9, marginBottom: '24px' }}>
    این داستان هر روز تکرار می‌شود. نه به خاطر تنبلی، بلکه چون <strong style={{ color: '#f85149' }}>هیچ‌وقت متوجه نمی‌شویم وقتمان دقیقاً کجا اتلاف شد.</strong>
  </p>
  
  <div style={{ height: '1px', background: 'rgba(248,81,73,0.3)', margin: '28px 0' }} />
  
  <div style={{ display: 'grid', gap: '16px' }}>
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '20px', marginTop: '2px' }}>📱</span>
      <div>
        <strong style={{ color: '#f0f6fc', display: 'block', marginBottom: '4px' }}>
          "فقط یک لحظه اینستاگرام چک می‌کنم..."
        </strong>
        <span style={{ color: '#8b949e', fontSize: '14px' }}>
          → ۴۵ دقیقه بعد هنوز در حال اسکرول هستید
        </span>
      </div>
    </div>
    
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '20px', marginTop: '2px' }}>💬</span>
      <div>
        <strong style={{ color: '#f0f6fc', display: 'block', marginBottom: '4px' }}>
          "چت‌ها رو یه سریع جواب بدم..."
        </strong>
        <span style={{ color: '#8b949e', fontSize: '14px' }}>
          → ۲ ساعت در چت‌های بی‌نتیجه گذشت
        </span>
      </div>
    </div>
    
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '20px', marginTop: '2px' }}>🎮</span>
      <div>
        <strong style={{ color: '#f0f6fc', display: 'block', marginBottom: '4px' }}>
          "یک دست بازی برای استراحت..."
        </strong>
        <span style={{ color: '#8b949e', fontSize: '14px' }}>
          → عصر شد و هنوز به کار اصلی نرسیدید
        </span>
      </div>
    </div>
  </div>
  
  <div style={{ height: '1px', background: 'rgba(248,81,73,0.3)', margin: '28px 0' }} />
  
  <div style={{ background: 'rgba(248,81,73,0.08)', borderRadius: '12px', padding: '20px', borderRight: '3px solid #f85149' }}>
    <p style={{ fontSize: '15px', color: '#f0f6fc', lineHeight: 1.8, margin: 0 }}>
      <strong style={{ color: '#f85149', fontSize: '16px' }}>نتیجه؟</strong><br />
      شما نمی‌دانید امروز <span style={{ color: '#d29922', fontWeight: 600 }}>۳ ساعت</span> در شبکه‌های اجتماعی، 
      <span style={{ color: '#d29922', fontWeight: 600 }}> ۲ ساعت</span> در چت‌های غیرضروری و 
      <span style={{ color: '#d29922', fontWeight: 600 }}> ۱.۵ ساعت</span> در یوتیوب گذاشتید.
    </p>
  </div>
  
  <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(139,148,158,0.1)', borderRadius: '8px', border: '1px dashed rgba(139,148,158,0.3)' }}>
    <p style={{ fontSize: '14px', color: '#8b949e', margin: 0, lineHeight: 1.7 }}>
      💡 <strong style={{ color: '#c9d1d9' }}>ابزارهای موجود چه می‌کنند؟</strong><br />
      Todoist تسک‌ها را لیست می‌کند. Notion یادداشت می‌گیرد. Toggl زمان کاری را ثبت می‌کند.<br />
      <em style={{ color: '#f85149', fontWeight: 600 }}>اما هیچ‌کدام نمی‌گویند "چرا امروز باز شکست خوردی؟"</em>
    </p>
  </div>
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