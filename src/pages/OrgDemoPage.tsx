import { Key, useState } from 'react';
import { teamMembers, departments } from '../data/sampleData';

interface Props { onNavigate: (page: string) => void; }

// ─── Micro Components ───────────────────────────────────────────────────────

function HeatBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  const color = pct >= 80 ? '#3fb950' : pct >= 60 ? '#d29922' : '#f85149';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
      <div style={{ flex: 1, height: '6px', background: '#21262d', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '3px', transition: 'width 1s ease', boxShadow: `0 0 6px ${color}50` }} />
      </div>
      <span style={{ fontSize: '11px', color, fontWeight: 600, minWidth: '32px' }}>{value}%</span>
    </div>
  );
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data, 1); const min = Math.min(...data);
  const w = 80; const h = 30;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / Math.max(max - min, 1)) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  const lx = w;
  const ly = h - ((data[data.length - 1] - min) / Math.max(max - min, 1)) * (h - 4) - 2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <circle cx={lx} cy={ly} r="2.5" fill={color} />
    </svg>
  );
}

function ScoreRing({ value, color, size = 72 }: { value: number; color: string; size?: number }) {
  const r = (size - 8) / 2; const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#21262d" strokeWidth="5" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1.5s ease' }} />
    </svg>
  );
}

// ─── Project Health ─────────────────────────────────────────────────────────

interface Project {
  name: string;
  team: string;
  progress: number;
  deadline: string;
  budget: number;
  deadlineRisk: 'low' | 'medium' | 'high';
  budgetRisk: 'low' | 'medium' | 'high';
  scopeRisk: 'low' | 'medium' | 'high';
  members: number;
  color: string;
}

const demoProjects: Project[] = [
  { name: 'بازطراحی اپلیکیشن موبایل', team: 'مهندسی', progress: 62, deadline: '۱۴۰۵/۰۵/۱۵', budget: 78, deadlineRisk: 'high', budgetRisk: 'medium', scopeRisk: 'low', members: 4, color: '#58a6ff' },
  { name: 'کمپین بازاریابی تابستان', team: 'بازاریابی', progress: 88, deadline: '۱۴۰۵/۰۴/۳۱', budget: 95, deadlineRisk: 'low', budgetRisk: 'low', scopeRisk: 'low', members: 3, color: '#3fb950' },
  { name: 'مهاجرت به Cloud', team: 'داده', progress: 41, deadline: '۱۴۰۵/۰۶/۳۱', budget: 55, deadlineRisk: 'medium', budgetRisk: 'high', scopeRisk: 'high', members: 5, color: '#f85149' },
  { name: 'پیاده‌سازی CRM جدید', team: 'فروش', progress: 73, deadline: '۱۴۰۵/۰۵/۳۱', budget: 82, deadlineRisk: 'low', budgetRisk: 'low', scopeRisk: 'medium', members: 3, color: '#bc8cff' },
  { name: 'داشبورد گزارشگری', team: 'داده', progress: 55, deadline: '۱۴۰۵/۰۵/۰۱', budget: 70, deadlineRisk: 'high', budgetRisk: 'medium', scopeRisk: 'low', members: 2, color: '#d29922' },
];

function ProjectHealthPanel() {
  const [selected, setSelected] = useState<string | null>(null);
  const riskColor = (r: string) => r === 'high' ? '#f85149' : r === 'medium' ? '#d29922' : '#3fb950';
  const riskLabel = (r: string) => r === 'high' ? 'بالا' : r === 'medium' ? 'متوسط' : 'پایین';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {demoProjects.map(proj => (
        <div
          key={proj.name}
          onClick={() => setSelected(selected === proj.name ? null : proj.name)}
          style={{
            padding: '20px', borderRadius: '12px', background: '#161b22',
            border: `1px solid ${selected === proj.name ? proj.color : '#30363d'}`,
            cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <div style={{
              width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
              background: proj.color, boxShadow: `0 0 8px ${proj.color}80`,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc' }}>{proj.name}</div>
              <div style={{ fontSize: '11px', color: '#8b949e' }}>تیم {proj.team} · {proj.members} نفر · مهلت: {proj.deadline}</div>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { label: 'زمان', risk: proj.deadlineRisk },
                { label: 'بودجه', risk: proj.budgetRisk },
                { label: 'اسکوپ', risk: proj.scopeRisk },
              ].map((r, i) => (
                <span key={i} style={{
                  padding: '2px 8px', borderRadius: '4px', fontSize: '10px',
                  background: `${riskColor(r.risk)}15`,
                  color: riskColor(r.risk),
                  border: `1px solid ${riskColor(r.risk)}30`,
                }}>
                  {r.label}: {riskLabel(r.risk)}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ flex: 1, height: '8px', background: '#21262d', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${proj.progress}%`, background: proj.color, borderRadius: '4px', transition: 'width 1s ease' }} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: proj.color, minWidth: '36px' }}>{proj.progress}%</span>
          </div>
          {selected === proj.name && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #30363d', animation: 'fadeIn 0.3s ease' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', marginBottom: '12px' }}>
                {[
                  { label: 'پیشرفت', value: `${proj.progress}%`, color: proj.color },
                  { label: 'بودجه مصرفی', value: `${proj.budget}%`, color: proj.budget > 90 ? '#f85149' : '#3fb950' },
                  { label: 'ریسک کلی', value: proj.deadlineRisk === 'high' || proj.budgetRisk === 'high' ? 'بالا' : 'متوسط', color: '#d29922' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', background: '#0d1117', borderRadius: '8px', padding: '10px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: '10px', color: '#8b949e' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '12px', color: proj.deadlineRisk === 'high' ? '#f85149' : '#d29922', lineHeight: 1.7 }}>
                {proj.deadlineRisk === 'high' ? '⚠️ احتمال تأخیر بالاست. افزایش منابع یا تجدیدنظر در scope پیشنهاد می‌شود.' :
                  proj.budgetRisk === 'high' ? '💰 بودجه در خطر است. مدیریت هزینه‌ها فوری بررسی شود.' :
                    '✅ پروژه در وضعیت مناسبی قرار دارد. ادامه روند فعلی توصیه می‌شود.'}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── AI Manager Chat ────────────────────────────────────────────────────────

function AIManagerPanel() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'سلام! من مدیر مصنوعی LifeFlow هستم. بر اساس داده‌های سازمانی، آماده‌ام به سوالات مدیریتی شما پاسخ دهم.' }
  ]);

  const generateResponse = (q: string): string => {
    const ql = q.toLowerCase();
    const atRisk = teamMembers.filter(m => m.burnoutRisk !== 'low');
    const avgProd = Math.round(teamMembers.reduce((s, m) => s + m.productivity, 0) / teamMembers.length);
    const highRiskProj = demoProjects.filter(p => p.deadlineRisk === 'high' || p.budgetRisk === 'high');

    if (ql.includes('پروژه') && (ql.includes('خطر') || ql.includes('ریسک'))) {
      return `🔴 پروژه‌های در خطر:\n\n${highRiskProj.map(p => `• ${p.name}\n  - پیشرفت: ${p.progress}%\n  - ریسک زمان: ${p.deadlineRisk === 'high' ? 'بالا' : 'متوسط'}`).join('\n\n')}\n\n💡 پیشنهاد: جلسه فوری با تیم مهندسی برای بازطراحی اپلیکیشن برنامه‌ریزی کنید.`;
    }
    if (ql.includes('حمایت') || ql.includes('کمک') || ql.includes('نیاز')) {
      return `👥 اعضایی که نیاز به حمایت دارند:\n\n${atRisk.map(m => `• ${m.name} (${m.role})\n  - ساعت کاری: ${m.hoursWorked}h/هفته\n  - وضعیت: ${m.burnoutRisk === 'high' ? '🔴 فوری' : '🟡 پیگیری'}`).join('\n\n')}\n\n💡 پیشنهاد: جلسه یک‌به‌یک با مهدی رضایی اولویت اول دارد.`;
    }
    if (ql.includes('تمرکز') || ql.includes('اولویت') || ql.includes('مدیریت')) {
      return `🎯 اولویت‌های مدیریتی این هفته:\n\n1. 🔴 فوری: کاهش ساعت کاری مهدی رضایی\n2. 🟡 این هفته: بررسی پیشرفت مهاجرت Cloud\n3. 🟢 این ماه: تنظیم OKR فصل بعدی\n\nمیانگین بهره‌وری تیم: ${avgProd}%\nروند: ${avgProd >= 75 ? '↑ مثبت' : '↓ نزولی'}`;
    }
    if (ql.includes('فرسودگی') || ql.includes('burnout')) {
      return `🔥 گزارش فرسودگی تیم:\n\n${atRisk.map(m => `• ${m.name}: ${m.hoursWorked}h/هفته - ${m.burnoutRisk === 'high' ? 'خطر بحرانی' : 'تحت نظر'}`).join('\n')}\n\nنرخ ریسک کلی: ${Math.round((atRisk.length / teamMembers.length) * 100)}% تیم\n\n💊 اقدامات پیشنهادی:\n• محدودیت اضافه‌کاری\n• جلسات check-in هفتگی\n• توزیع مجدد وظایف`;
    }
    if (ql.includes('گزارش') || ql.includes('هفته') || ql.includes('وضعیت')) {
      const donePct = Math.round((teamMembers.reduce((s, m) => s + m.tasksDone, 0) / teamMembers.reduce((s, m) => s + m.tasksTotal, 0)) * 100);
      return `📊 گزارش هفتگی سازمان:\n\n✅ تسک‌های تکمیل‌شده: ${donePct}%\n⚡ میانگین بهره‌وری: ${avgProd}%\n👥 اعضای تیم: ${teamMembers.length} نفر\n⚠️ ریسک فرسودگی: ${atRisk.length} نفر\n\n🏆 برترین دپارتمان: ${departments.sort((a, b) => b.productivity - a.productivity)[0]?.name}\n📉 نیاز به توجه: تیم مهندسی`;
    }
    return `سوال جالبی است. می‌توانید بپرسید:\n• "کدام پروژه‌ها در خطر هستند؟"\n• "چه کسی نیاز به حمایت دارد؟"\n• "مدیریت باید روی چه چیزی تمرکز کند؟"\n• "گزارش این هفته چیست؟"\n• "وضعیت فرسودگی تیم؟"`;
  };

  const handleSend = () => {
    if (!question.trim()) return;
    setMessages(prev => [...prev,
      { role: 'user', text: question },
      { role: 'ai', text: generateResponse(question) }
    ]);
    setQuestion('');
  };

  return (
    <div>
      <div style={{
        height: '340px', overflowY: 'auto', padding: '16px',
        background: '#0d1117', borderRadius: '12px', border: '1px solid #30363d',
        display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px',
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex', gap: '10px',
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            animation: 'fadeIn 0.3s ease',
          }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
              background: msg.role === 'ai' ? 'linear-gradient(135deg, #3fb950, #58a6ff)' : '#21262d',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px',
            }}>{msg.role === 'ai' ? '🤖' : '👔'}</div>
            <div style={{
              maxWidth: '72%', padding: '10px 14px', borderRadius: '10px', fontSize: '12px',
              background: msg.role === 'ai' ? '#161b22' : 'rgba(63,185,80,0.08)',
              border: `1px solid ${msg.role === 'ai' ? '#30363d' : 'rgba(63,185,80,0.25)'}`,
              color: '#c9d1d9', lineHeight: 1.8, whiteSpace: 'pre-line',
            }}>{msg.text}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
        {['پروژه‌های در خطر؟', 'نیاز به حمایت؟', 'گزارش هفتگی', 'فرسودگی تیم؟'].map((q, i) => (
          <button key={i} onClick={() => setQuestion(q)} style={{
            padding: '4px 10px', borderRadius: '6px', border: '1px solid #30363d',
            background: '#161b22', color: '#8b949e', cursor: 'pointer',
            fontFamily: 'Vazirmatn, sans-serif', fontSize: '11px',
          }}>{q}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input value={question} onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="سوال مدیریتی بپرسید..." className="input-field" style={{ flex: 1 }} />
        <button onClick={handleSend} className="btn-primary" style={{ padding: '10px 20px', flexShrink: 0 }}>ارسال</button>
      </div>
    </div>
  );
}

// ─── Bottleneck Panel ───────────────────────────────────────────────────────

function BottleneckPanel() {
  const bottlenecks = [
    { area: 'تأیید کدها', severity: 'high', delay: '۳.۲ روز', team: 'مهندسی', desc: 'درخواست‌های Pull Request بیش از ۳ روز در انتظار review می‌مانند', icon: '🔴', fix: 'افزایش رویترهای code review یا تعریف SLA 24 ساعته' },
    { area: 'جلسات تصمیم‌گیری', severity: 'medium', delay: '۵.۱ روز', team: 'مدیریت', desc: 'تصمیمات استراتژیک بیش از ۵ روز در انتظار تأیید نهایی', icon: '🟡', fix: 'تفویض اختیار به مدیران میانی برای تصمیمات زیر ۱۰۰K' },
    { area: 'تست و QA', severity: 'medium', delay: '۲.۸ روز', team: 'مهندسی', desc: 'فرایند تست دستی باعث تأخیر در release می‌شود', icon: '🟡', fix: 'پیاده‌سازی CI/CD و خودکارسازی تست‌های regression' },
    { area: 'انتقال داده', severity: 'low', delay: '۱.۵ روز', team: 'داده', desc: 'sync دستی بین سیستم‌های مختلف تأخیر ایجاد می‌کند', icon: '🟢', fix: 'استفاده از ETL pipeline خودکار' },
  ];
  const severityColor = (s: string) => s === 'high' ? '#f85149' : s === 'medium' ? '#d29922' : '#3fb950';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {bottlenecks.map((b, i) => (
        <div key={i} style={{
          padding: '20px', borderRadius: '12px', background: '#161b22',
          border: `1px solid ${severityColor(b.severity)}25`,
          borderRight: `4px solid ${severityColor(b.severity)}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '16px' }}>{b.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc' }}>{b.area}</div>
              <div style={{ fontSize: '11px', color: '#8b949e' }}>تیم {b.team}</div>
            </div>
            <span style={{
              padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
              background: `${severityColor(b.severity)}15`, color: severityColor(b.severity),
              border: `1px solid ${severityColor(b.severity)}30`,
            }}>تأخیر: {b.delay}</span>
          </div>
          <p style={{ fontSize: '12px', color: '#8b949e', lineHeight: 1.7, marginBottom: '8px' }}>{b.desc}</p>
          <div style={{ fontSize: '12px', color: '#58a6ff' }}>💡 {b.fix}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Resource Panel ─────────────────────────────────────────────────────────

function ResourcePanel() {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '16px' }}>
          👥 نرخ اشغال منابع انسانی
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {teamMembers.map(m => {
            const util = Math.round((m.hoursWorked / 40) * 100);
            const color = util > 130 ? '#f85149' : util > 100 ? '#d29922' : util > 70 ? '#3fb950' : '#58a6ff';
            return (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{m.avatar}</span>
                <div style={{ minWidth: '110px' }}>
                  <div style={{ fontSize: '12px', color: '#c9d1d9' }}>{m.name}</div>
                  <div style={{ fontSize: '10px', color: '#8b949e' }}>{m.role}</div>
                </div>
                <div style={{ flex: 1, height: '8px', background: '#21262d', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${Math.min(util, 140)}%`, background: color,
                    borderRadius: '4px', transition: 'width 1s ease',
                  }} />
                </div>
                <span style={{ fontSize: '12px', color, fontWeight: 600, minWidth: '40px' }}>{util}%</span>
                <span style={{ fontSize: '11px', color: '#8b949e', minWidth: '36px' }}>{m.hoursWorked}h</span>
                <span style={{ fontSize: '10px', color: util > 120 ? '#f85149' : '#8b949e' }}>
                  {util > 120 ? '⚠️ اضافه' : util < 60 ? '💤 کم' : '✅ ایده‌آل'}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: '12px', fontSize: '11px', color: '#8b949e', padding: '10px', background: '#161b22', borderRadius: '8px', border: '1px solid #30363d' }}>
          * نرخ ایده‌آل: ۸۰-۱۰۰٪ (۳۲-۴۰ ساعت هفتگی) · بیش از ۱۲۰٪ = ریسک فرسودگی
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '16px' }}>
          🏢 ظرفیت دپارتمان‌ها
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {departments.map((dep, i) => {
            const colors = ['#58a6ff', '#3fb950', '#bc8cff', '#d29922', '#ff7b72'];
            const color = colors[i % colors.length];
            const capacity = Math.round((dep.hoursSpent / (dep.headCount * 40)) * 100);
            return (
              <div key={i} style={{
                padding: '16px', borderRadius: '12px', background: '#161b22', border: '1px solid #30363d',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc', marginBottom: '4px' }}>{dep.name}</div>
                <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '12px' }}>{dep.headCount} نفر</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color, marginBottom: '8px' }}>{capacity}%</div>
                <div style={{ fontSize: '10px', color: '#8b949e', marginBottom: '8px' }}>نرخ اشغال</div>
                <div style={{ height: '6px', background: '#21262d', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(capacity, 100)}%`, background: color, borderRadius: '3px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Executive Report ───────────────────────────────────────────────────────

function ExecutiveReportPanel() {
  const avgProductivity = Math.round(teamMembers.reduce((s, m) => s + m.productivity, 0) / teamMembers.length);
  const totalTasks = teamMembers.reduce((s, m) => s + m.tasksTotal, 0);
  const doneTasks = teamMembers.reduce((s, m) => s + m.tasksDone, 0);
  const atRiskCount = teamMembers.filter(m => m.burnoutRisk !== 'low').length;
  const highRiskProj = demoProjects.filter(p => p.deadlineRisk === 'high').length;

  return (
    <div>
      <div style={{
        padding: '24px', borderRadius: '16px', marginBottom: '24px',
        background: 'linear-gradient(135deg, rgba(63,185,80,0.06), rgba(88,166,255,0.06))',
        border: '1px solid rgba(88,166,255,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #3fb950, #58a6ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
          }}>📋</div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc' }}>گزارش اجرایی هفتگی</div>
            <div style={{ fontSize: '12px', color: '#8b949e' }}>تیر ۱۴۰۵ · تهیه‌شده با کمک AI</div>
          </div>
          <span className="badge badge-green" style={{ marginRight: 'auto' }}>✅ به‌روز</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
          {[
            { label: 'میانگین بهره‌وری', value: `${avgProductivity}%`, color: '#58a6ff', trend: '+۶٪' },
            { label: 'نرخ تکمیل تسک', value: `${Math.round((doneTasks / totalTasks) * 100)}%`, color: '#3fb950', trend: '+۳٪' },
            { label: 'اعضا در ریسک', value: `${atRiskCount} نفر`, color: '#f85149', trend: 'ثابت' },
            { label: 'پروژه‌های بحرانی', value: `${highRiskProj}`, color: '#d29922', trend: '-۱' },
          ].map((kpi, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '16px', background: '#0d1117', borderRadius: '10px', border: '1px solid #30363d' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: kpi.color, marginBottom: '4px' }}>{kpi.value}</div>
              <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '6px' }}>{kpi.label}</div>
              <div style={{ fontSize: '10px', color: kpi.trend.startsWith('+') ? '#3fb950' : kpi.trend.startsWith('-') ? '#f85149' : '#8b949e' }}>
                {kpi.trend} نسبت به هفته قبل
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <div className="card">
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '14px' }}>🎯 دستاوردهای کلیدی</h3>
          {[
            'کمپین بازاریابی با ۸۸٪ پیشرفت پیش از موعد',
            'تیم داده رکورد ۸۸٪ بهره‌وری را ثبت کرد',
            'نرخ تکمیل تسک از ۷۵ به ۸۲٪ رسید',
            'سیستم CRM با موفقیت ۷۳٪ پیاده‌سازی شد',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#8b949e', padding: '6px 0', borderBottom: i < 3 ? '1px solid #21262d' : 'none' }}>
              <span style={{ color: '#3fb950', flexShrink: 0 }}>✓</span>{item}
            </div>
          ))}
        </div>
        <div className="card">
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '14px' }}>⚠️ نقاط نگران‌کننده</h3>
          {[
            'مهدی رضایی: ۵۵ ساعت کار – ریسک فرسودگی فوری',
            'مهاجرت Cloud: تنها ۴۱٪ پیشرفت با مهلت ۶ هفته‌ای',
            'بودجه پروژه Cloud: ۵۵٪ مصرف‌شده در نیمه راه',
            'dashboard گزارشگری: احتمال تأخیر ۷۲٪',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#8b949e', padding: '6px 0', borderBottom: i < 3 ? '1px solid #21262d' : 'none' }}>
              <span style={{ color: '#f85149', flexShrink: 0 }}>✗</span>{item}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '14px' }}>📈 پیش‌بینی ۴ هفته آینده</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {[
            { label: 'بهره‌وری سازمان', current: avgProductivity, predicted: Math.min(avgProductivity + 4, 100), color: '#58a6ff' },
            { label: 'نرخ تحویل پروژه', current: 68, predicted: 74, color: '#3fb950' },
            { label: 'ریسک فرسودگی', current: Math.round((atRiskCount / teamMembers.length) * 100), predicted: Math.round((atRiskCount / teamMembers.length) * 100) - 10, color: '#f85149' },
          ].map((pred, i) => (
            <div key={i} style={{ padding: '14px', background: '#0d1117', borderRadius: '10px', border: '1px solid #30363d' }}>
              <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '8px' }}>{pred.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: pred.color }}>{pred.predicted}%</span>
                <span style={{ fontSize: '11px', color: pred.predicted > pred.current ? '#3fb950' : '#f85149' }}>
                  {pred.predicted > pred.current ? `+${pred.predicted - pred.current}` : pred.predicted - pred.current}%
                </span>
              </div>
              <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '4px' }}>فعلی: {pred.current}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Add Employee Modal ────────────────────────────────────────────────────
function AddEmployeeModal({ onClose, onAdd }: { onClose: () => void; onAdd: (emp: any) => void }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [dept, setDept] = useState('مهندسی');
  const [avatar, setAvatar] = useState('👨‍💻');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) return;
    onAdd({
      id: String(Date.now()),
      name,
      role,
      department: dept,
      avatar,
      productivity: Math.floor(Math.random() * 30 + 65),
      tasksDone: 0,
      tasksTotal: 0,
      hoursWorked: 40,
      burnoutRisk: 'low',
      weeklyTrend: [80, 82, 78, 85, 83, 79, 84],
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: '#161b22', borderRadius: '16px', border: '1px solid #30363d',
        padding: '32px', width: '420px', maxWidth: '90%', animation: 'fadeIn 0.3s ease',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>➕ افزودن عضو جدید</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>نام</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-field" required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>نقش</label>
            <input type="text" value={role} onChange={e => setRole(e.target.value)} className="input-field" required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>دپارتمان</label>
            <select value={dept} onChange={e => setDept(e.target.value)} className="input-field">
              {departments.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>آواتار</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['👨‍💻', '👩‍💻', '👨‍🔬', '👩‍🔬', '🧑‍💼', '👩‍💼', '👨‍🎨', '👩‍🎨'].map(a => (
                <button key={a} type="button" onClick={() => setAvatar(a)} style={{
                  fontSize: '24px', padding: '4px', borderRadius: '8px', cursor: 'pointer',
                  background: avatar === a ? 'rgba(88,166,255,0.15)' : 'transparent',
                  border: `1px solid ${avatar === a ? '#58a6ff' : '#30363d'}`,
                }}>{a}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>افزودن</button>
            <button type="button" onClick={onClose} style={{
              padding: '12px 20px', borderRadius: '8px', border: '1px solid #30363d',
              background: 'transparent', color: '#8b949e', cursor: 'pointer',
              fontFamily: 'Vazirmatn, sans-serif', fontSize: '13px',
            }}>انصراف</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function OrgDemoPage({ onNavigate: _ }: Props) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'team' | 'departments' | 'projects' | 'bottleneck' | 'resources' | 'aimanager' | 'executive' | 'ai'
  >('overview');
  const [extraMembers, setExtraMembers] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const allMembers = [...teamMembers, ...extraMembers];

  const avgProductivity = Math.round(allMembers.reduce((s, m) => s + m.productivity, 0) / allMembers.length);
  const totalTasks = allMembers.reduce((s, m) => s + m.tasksTotal, 0);
  const doneTasks = allMembers.reduce((s, m) => s + m.tasksDone, 0);
  const atRiskCount = allMembers.filter(m => m.burnoutRisk === 'high' || m.burnoutRisk === 'medium').length;

  const tabs = [
    { id: 'overview', label: 'داشبورد', icon: '📊' },
    { id: 'team', label: 'تیم', icon: '👥' },
    { id: 'departments', label: 'دپارتمان‌ها', icon: '🏢' },
    { id: 'projects', label: 'پروژه‌ها', icon: '📁' },
    { id: 'bottleneck', label: 'گلوگاه‌ها', icon: '🔍' },
    { id: 'resources', label: 'منابع', icon: '⚙️' },
    { id: 'aimanager', label: 'AI مدیر', icon: '🤖' },
    { id: 'executive', label: 'گزارش اجرایی', icon: '📋' },
    { id: 'ai', label: 'توصیه‌های AI', icon: '🧠' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/lifeflowlogo.png" alt="LifeFlow" style={{ height: '44px', borderRadius: '10px' }} />
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f0f6fc', margin: 0 }}>داشبورد سازمانی</h1>
              <p style={{ fontSize: '13px', color: '#8b949e', margin: 0 }}>LifeFlow Enterprise · تیر ۱۴۰۵</p>
              <p style={{ fontSize: '13px', color: '#8b949e', margin: 0 }}>دموی آزمایشی</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="badge badge-green">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3fb950', display: 'inline-block' }} />
              لایو داده
            </span>
            <span className="badge badge-blue">{allMembers.length} عضو فعال</span>
            <span className="badge" style={{ background: 'rgba(248,81,73,0.1)', color: '#f85149', border: '1px solid rgba(248,81,73,0.2)', padding: '4px 10px', borderRadius: '6px', fontSize: '11px' }}>
              {atRiskCount} نفر در ریسک
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '4px', background: '#161b22', borderRadius: '12px',
          border: '1px solid #30363d', padding: '6px', marginBottom: '24px', flexWrap: 'wrap',
        }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)} style={{
              padding: '7px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: activeTab === tab.id ? '#0d1117' : 'transparent',
              color: activeTab === tab.id ? '#58a6ff' : '#8b949e',
              fontFamily: 'Vazirmatn, sans-serif', fontSize: '12px', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: '5px', transition: 'all 0.2s',
            }}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {[
                { icon: '⚡', label: 'میانگین بهره‌وری', value: `${avgProductivity}%`, sub: '+۶٪ نسبت به ماه قبل', color: '#58a6ff', type: 'blue' },
                { icon: '✅', label: 'تسک تکمیل‌شده', value: `${doneTasks}/${totalTasks}`, sub: `نرخ ${Math.round((doneTasks / totalTasks) * 100)}%`, color: '#3fb950', type: 'green' },
                { icon: '⚠️', label: 'ریسک فرسودگی', value: `${atRiskCount} نفر`, sub: 'نیاز به مداخله', color: '#f85149', type: 'warning' },
                { icon: '🕐', label: 'کل ساعت کاری', value: `${allMembers.reduce((s, m) => s + m.hoursWorked, 0)}h`, sub: 'این هفته', color: '#bc8cff', type: 'purple' },
                { icon: '📁', label: 'پروژه‌های فعال', value: `${demoProjects.length}`, sub: `${demoProjects.filter(p => p.deadlineRisk === 'high').length} در خطر`, color: '#d29922', type: 'warning' },
              ].map((kpi, i) => (
                <div key={i} className={`metric-card ${kpi.type}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '22px' }}>{kpi.icon}</span>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: kpi.color, boxShadow: `0 0 6px ${kpi.color}` }} />
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 700, color: kpi.color, marginBottom: '4px' }}>{kpi.value}</div>
                  <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '6px' }}>{kpi.label}</div>
                  <div style={{ fontSize: '10px', color: '#8b949e' }}>{kpi.sub}</div>
                </div>
              ))}
            </div>

            {/* AI Status */}
            <div style={{
              padding: '16px 20px', borderRadius: '12px', marginBottom: '24px',
              background: 'rgba(88,166,255,0.06)', border: '1px solid rgba(88,166,255,0.15)',
              display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: '20px' }}>🤖</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc', marginBottom: '4px' }}>AI وضعیت سازمان را ارزیابی کرد</div>
                <p style={{ fontSize: '12px', color: '#8b949e', lineHeight: 1.7 }}>
                  بهره‌وری کلی سازمان در وضعیت متوسط است. مهدی رضایی نیاز فوری به کاهش بار کاری دارد.
                  پروژه مهاجرت Cloud با احتمال ۶۸٪ با تأخیر مواجه خواهد شد. توصیه: جلسه اورژانسی با تیم مهندسی.
                </p>
              </div>
              <button onClick={() => setActiveTab('aimanager')} style={{
                padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(88,166,255,0.3)',
                background: 'rgba(88,166,255,0.1)', color: '#58a6ff', cursor: 'pointer',
                fontFamily: 'Vazirmatn, sans-serif', fontSize: '12px', whiteSpace: 'nowrap',
              }}>پرسش از AI مدیر →</button>
            </div>

            {/* Rankings */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div className="card">
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '20px' }}>🏆 رتبه‌بندی بهره‌وری</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[...allMembers].sort((a, b) => b.productivity - a.productivity).slice(0, 8).map((m, i) => (
                    <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                        background: i === 0 ? '#d29922' : i === 1 ? '#8b949e' : i === 2 ? '#9e7646' : '#21262d',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', fontWeight: 700, color: i < 3 ? '#0d1117' : '#8b949e',
                      }}>{i + 1}</span>
                      <span style={{ fontSize: '16px' }}>{m.avatar}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', color: '#c9d1d9', marginBottom: '4px' }}>{m.name}</div>
                        <HeatBar value={m.productivity} />
                      </div>
                      <MiniSparkline data={m.weeklyTrend} color={m.productivity >= 80 ? '#3fb950' : m.productivity >= 60 ? '#d29922' : '#f85149'} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '20px' }}>🏢 عملکرد دپارتمان‌ها</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {departments.map((dep, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', color: '#c9d1d9' }}>{dep.name}</span>
                        <span style={{ fontSize: '11px', color: '#8b949e' }}>{dep.tasksCompleted} تسک</span>
                      </div>
                      <HeatBar value={dep.productivity} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div>
                    <div style={{
                      fontSize: '44px', fontWeight: 800,
                      background: 'linear-gradient(135deg, #3fb950, #58a6ff)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>{avgProductivity}</div>
                    <div style={{ fontSize: '11px', color: '#8b949e' }}>امتیاز سلامت سازمان</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc' }}>
                      {avgProductivity >= 80 ? '🏆 سازمان سالم' : avgProductivity >= 65 ? '⚡ نیاز به بهبود' : '⚠️ وضعیت بحرانی'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#8b949e' }}>از ۱۰۰ نمره</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Burnout */}
            <div className="card">
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '16px' }}>🔥 رادار فرسودگی شغلی</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                {allMembers.filter(m => m.burnoutRisk !== 'low').slice(0, 6).map(m => (
                  <div key={m.id} style={{
                    padding: '16px', borderRadius: '10px',
                    background: m.burnoutRisk === 'high' ? 'rgba(248,81,73,0.06)' : 'rgba(210,153,34,0.06)',
                    border: `1px solid ${m.burnoutRisk === 'high' ? 'rgba(248,81,73,0.25)' : 'rgba(210,153,34,0.25)'}`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '22px' }}>{m.avatar}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc' }}>{m.name}</div>
                        <div style={{ fontSize: '11px', color: '#8b949e' }}>{m.role}</div>
                      </div>
                      <span className={m.burnoutRisk === 'high' ? 'badge badge-danger' : 'badge badge-warning'}>
                        {m.burnoutRisk === 'high' ? '🔴 فوری' : '🟡 متوسط'}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '6px' }}>
                      {m.hoursWorked}h/هفته · {m.tasksDone}/{m.tasksTotal} تسک · بهره‌وری: {m.productivity}%
                    </div>
                    <div style={{ fontSize: '11px', color: m.burnoutRisk === 'high' ? '#f85149' : '#d29922' }}>
                      {m.burnoutRisk === 'high' ? '⚠️ کاهش ساعت کاری فوری پیشنهاد می‌شود' : '💬 گفتگو و بررسی وضعیت'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc' }}>👥 اعضای تیم</h2>
              <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ fontSize: '12px', padding: '8px 16px' }}>
                ➕ افزودن عضو
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '20px' }}>
              {allMembers.map(m => (
                <div key={m.id} className="card" onClick={() => setSelectedMember(selectedMember === m.id ? null : m.id)}
                  style={{
                    cursor: 'pointer', transition: 'all 0.2s',
                    border: selectedMember === m.id ? '1px solid #58a6ff' : '1px solid #30363d',
                    background: selectedMember === m.id ? 'rgba(88,166,255,0.04)' : '#161b22',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{
                      width: '50px', height: '50px', borderRadius: '14px', fontSize: '24px',
                      background: 'linear-gradient(135deg, rgba(88,166,255,0.15), rgba(188,140,255,0.15))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{m.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc' }}>{m.name}</div>
                      <div style={{ fontSize: '11px', color: '#8b949e' }}>{m.role} · {m.department}</div>
                    </div>
                    <span className={`badge ${m.burnoutRisk === 'high' ? 'badge-danger' : m.burnoutRisk === 'medium' ? 'badge-warning' : 'badge-green'}`}>
                      {m.burnoutRisk === 'high' ? '🔴 خطر' : m.burnoutRisk === 'medium' ? '🟡 متوسط' : '🟢 سالم'}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                    {[
                      { label: 'بهره‌وری', value: `${m.productivity}%`, color: m.productivity >= 80 ? '#3fb950' : '#d29922' },
                      { label: 'تسک‌ها', value: `${m.tasksDone}/${m.tasksTotal}`, color: '#58a6ff' },
                      { label: 'ساعت', value: `${m.hoursWorked}h`, color: '#bc8cff' },
                    ].map((s, i) => (
                      <div key={i} style={{ textAlign: 'center', background: '#0d1117', borderRadius: '8px', padding: '10px' }}>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: '9px', color: '#8b949e', marginTop: '2px' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', color: '#8b949e' }}>روند هفتگی</span>
                    <MiniSparkline data={m.weeklyTrend} color={m.productivity >= 80 ? '#3fb950' : '#d29922'} />
                  </div>
                  <HeatBar value={m.productivity} />
                  {selectedMember === m.id && (
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #30363d', animation: 'fadeIn 0.3s ease' }}>
                      <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#f0f6fc', marginBottom: '10px' }}>عملکرد روزانه این هفته</h4>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '56px' }}>
                        {m.weeklyTrend.map((v: number, i: number) => (
                          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                            <div style={{ width: '100%', background: '#58a6ff', height: `${(v / 100) * 44}px`, borderRadius: '3px 3px 0 0', opacity: 0.75 }} />
                            <span style={{ fontSize: '8px', color: '#8b949e' }}>{['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'][i]}</span>
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: '11px', color: '#8b949e', marginTop: '10px', lineHeight: 1.7 }}>
                        {m.burnoutRisk === 'high' ? `⚠️ ${m.name} در ریسک فرسودگی است. کاهش بار کاری ضروری.` :
                          m.burnoutRisk === 'medium' ? `💬 روند کاهشی مشاهده می‌شود. بررسی وضعیت پیشنهاد می‌شود.` :
                            `✅ ${m.name} عملکرد پایدار و مثبتی دارد.`}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {showAddModal && (
              <AddEmployeeModal
                onClose={() => setShowAddModal(false)}
                onAdd={(emp) => { setExtraMembers(prev => [...prev, emp]); setShowAddModal(false); }}
              />
            )}
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {departments.map((dep, i) => {
                const colors = ['#58a6ff', '#3fb950', '#bc8cff', '#d29922', '#ff7b72'];
                const color = colors[i % colors.length];
                return (
                  <div key={i} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: '3px', background: `linear-gradient(90deg, ${color}, transparent)` }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f0f6fc' }}>{dep.name}</h3>
                      <ScoreRing value={dep.productivity} color={color} size={52} />
                    </div>
                    <p style={{ fontSize: '11px', color: '#8b949e', marginBottom: '16px' }}>{dep.headCount} عضو</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                      {[
                        { label: 'بهره‌وری', value: `${dep.productivity}%`, color },
                        { label: 'تسک', value: dep.tasksCompleted, color: '#58a6ff' },
                        { label: 'ساعت', value: `${dep.hoursSpent}h`, color: '#bc8cff' },
                      ].map((s, si) => (
                        <div key={si} style={{ textAlign: 'center', background: '#0d1117', borderRadius: '8px', padding: '10px' }}>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: s.color }}>{s.value}</div>
                          <div style={{ fontSize: '9px', color: '#8b949e' }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <HeatBar value={dep.productivity} />
                    <div style={{ marginTop: '10px', fontSize: '11px', color: '#8b949e' }}>
                      کارایی: {Math.round(dep.tasksCompleted / dep.headCount)} تسک/نفر
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #30363d' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc' }}>مقایسه تفصیلی</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead><tr><th>دپارتمان</th><th>نفرات</th><th>بهره‌وری</th><th>تسک</th><th>ساعت</th><th>تسک/نفر</th><th>وضعیت</th></tr></thead>
                  <tbody>
                    {[...departments].sort((a, b) => b.productivity - a.productivity).map((dep, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600, color: '#f0f6fc' }}>{dep.name}</td>
                        <td>{dep.headCount}</td>
                        <td><span style={{ color: dep.productivity >= 80 ? '#3fb950' : dep.productivity >= 60 ? '#d29922' : '#f85149', fontWeight: 600 }}>{dep.productivity}%</span></td>
                        <td>{dep.tasksCompleted}</td>
                        <td>{dep.hoursSpent}h</td>
                        <td style={{ color: '#58a6ff' }}>{Math.round(dep.tasksCompleted / dep.headCount)}</td>
                        <td><span className={`badge ${dep.productivity >= 80 ? 'badge-green' : dep.productivity >= 65 ? 'badge-warning' : 'badge-danger'}`}>
                          {dep.productivity >= 80 ? 'عالی' : dep.productivity >= 65 ? 'متوسط' : 'ضعیف'}
                        </span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '4px' }}>📁 سلامت پروژه‌ها</h2>
              <p style={{ fontSize: '13px', color: '#8b949e' }}>پیش‌بینی هوشمند ریسک‌های زمان، بودجه و اسکوپ</p>
            </div>
            <ProjectHealthPanel />
          </div>
        )}

        {/* Bottleneck Tab */}
        {activeTab === 'bottleneck' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '4px' }}>🔍 یافتن گلوگاه‌ها</h2>
              <p style={{ fontSize: '13px', color: '#8b949e' }}>مناطق کند و ناکارآمد سازمان شناسایی شد</p>
            </div>
            <BottleneckPanel />
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '4px' }}>⚙️ تخصیص منابع</h2>
              <p style={{ fontSize: '13px', color: '#8b949e' }}>بهینه‌سازی توزیع نیروی انسانی و ظرفیت تیم‌ها</p>
            </div>
            <div className="card">
              <ResourcePanel />
            </div>
          </div>
        )}

        {/* AI Manager Tab */}
        {activeTab === 'aimanager' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '4px' }}>🤖 AI مدیر سازمانی</h2>
              <p style={{ fontSize: '13px', color: '#8b949e' }}>از AI بپرسید: چه پروژه‌ای در خطر است؟ چه کسی نیاز به حمایت دارد؟</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
              <div className="card">
                <AIManagerPanel />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="card">
                  <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc', marginBottom: '12px' }}>📊 وضعیت فوری</h3>
                  {[
                    { label: 'میانگین بهره‌وری', value: `${avgProductivity}%`, color: '#58a6ff' },
                    { label: 'اعضا در ریسک', value: `${atRiskCount}/${allMembers.length}`, color: '#f85149' },
                    { label: 'پروژه‌های بحرانی', value: `${demoProjects.filter(p => p.deadlineRisk === 'high').length}`, color: '#d29922' },
                    { label: 'نرخ تحویل', value: `${Math.round((doneTasks / totalTasks) * 100)}%`, color: '#3fb950' },
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? '1px solid #21262d' : 'none' }}>
                      <span style={{ fontSize: '12px', color: '#8b949e' }}>{s.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: s.color }}>{s.value}</span>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc', marginBottom: '12px' }}>⚡ اقدامات پیشنهادی</h3>
                  {[
                    { icon: '🔴', text: 'جلسه فوری با مهدی رضایی' },
                    { icon: '🟡', text: 'بررسی timeline مهاجرت Cloud' },
                    { icon: '🟢', text: 'تجلیل از عملکرد تیم بازاریابی' },
                    { icon: '🔵', text: 'تنظیم OKR فصل تابستان' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#8b949e', padding: '6px 0', borderBottom: i < 3 ? '1px solid #21262d' : 'none' }}>
                      <span>{item.icon}</span>{item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Executive Report Tab */}
        {activeTab === 'executive' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <ExecutiveReportPanel />
          </div>
        )}

        {/* AI Recommendations Tab */}
        {activeTab === 'ai' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '4px' }}>🧠 توصیه‌های هوش مصنوعی</h2>
              <p style={{ fontSize: '13px', color: '#8b949e' }}>تحلیل جامع عملکرد {allMembers.length} عضو و {demoProjects.length} پروژه</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '🔥', title: 'بحران فرسودگی در تیم مهندسی', type: 'danger', body: 'مهدی رضایی با ۵۵ ساعت کار در هفته و روند کاهشی بهره‌وری در آستانه فرسودگی است. پیشنهاد: کاهش فوری به ۴۰ ساعت، تفویض وظایف، جلسه یک‌به‌یک با مدیر.', priority: 'فوری' },
                { icon: '📁', title: 'پروژه مهاجرت Cloud در خطر تأخیر', type: 'danger', body: 'با ۴۱٪ پیشرفت و ۶ هفته تا مهلت، احتمال تأخیر ۷۲٪ است. بودجه ۵۵٪ مصرف شده. نیاز فوری به تجدیدنظر در scope یا افزایش منابع.', priority: 'این هفته' },
                { icon: '⚡', title: 'بهینه‌سازی توزیع بار کاری مهندسی', type: 'warning', body: 'سارا ۴۸ و مهدی ۵۵ ساعت کار می‌کنند در حالی که ظرفیت ایده‌آل ۴۰ ساعت است. توزیع مجدد می‌تواند بهره‌وری دپارتمان را از ۷۶ به ۸۵٪ برساند.', priority: 'این هفته' },
                { icon: '🏆', title: 'الگوگیری از تیم بازاریابی', type: 'success', body: 'نیلوفر حسینی با ۴۰ ساعت کاری و ۹۵٪ بهره‌وری بهترین نسبت کارایی را دارد. روش‌های مدیریت زمان ایشان را به عنوان Best Practice در سازمان منتشر کنید.', priority: 'این ماه' },
                { icon: '📊', title: 'OKR فصل بعدی نیاز به بازنگری دارد', type: 'info', body: 'با نرخ تکمیل تسک ۸۲٪، اهداف فصل بعدی را ۱۵٪ افزایش دهید. تیم از ظرفیت کامل استفاده نمی‌کند. تعریف stretch goals پیشنهاد می‌شود.', priority: 'فصل بعد' },
                { icon: '🌱', title: 'سرمایه‌گذاری در آموزش تیم داده', type: 'info', body: 'تیم داده با ۸۸٪ بهره‌وری آماده جهش است. آموزش‌های ML/AI پیشرفته می‌تواند خروجی را ۳x کند و ارزش سازمانی را افزایش دهد.', priority: '۳ ماهه' },
              ].map((item, i) => {
                const colors = { danger: '#f85149', warning: '#d29922', success: '#3fb950', info: '#58a6ff' };
                const color = colors[item.type as keyof typeof colors];
                return (
                  <div key={i} style={{
                    background: `${color}06`, border: `1px solid ${color}20`,
                    borderRadius: '12px', padding: '18px 22px', borderRight: `4px solid ${color}`,
                    animation: `fadeIn 0.4s ease ${i * 0.07}s both`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc' }}>{item.title}</h3>
                          <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, background: `${color}20`, color, border: `1px solid ${color}35` }}>
                            {item.priority}
                          </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.8 }}>{item.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}