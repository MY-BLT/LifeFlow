import { useState } from 'react';
import { teamMembers, departments } from '../data/sampleData';

interface Props { onNavigate: (page: string) => void; }

function HeatBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  const color = pct >= 80 ? '#3fb950' : pct >= 60 ? '#d29922' : '#f85149';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
      <div style={{ flex: 1, height: '6px', background: '#21262d', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '3px', transition: 'width 1s ease' }} />
      </div>
      <span style={{ fontSize: '12px', color, fontWeight: 600, minWidth: '32px' }}>{value}%</span>
    </div>
  );
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 80, h = 30;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / Math.max(max - min, 1)) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w} cy={h - ((data[data.length-1] - min) / Math.max(max - min, 1)) * h}
        r="2.5" fill={color} />
    </svg>
  );
}

export default function OrgDemoPage({ onNavigate: _ }: Props) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'departments' | 'ai'>('overview');

  const avgProductivity = Math.round(teamMembers.reduce((s, m) => s + m.productivity, 0) / teamMembers.length);
  const totalTasks = teamMembers.reduce((s, m) => s + m.tasksTotal, 0);
  const doneTasks = teamMembers.reduce((s, m) => s + m.tasksDone, 0);
  const atRiskCount = teamMembers.filter(m => m.burnoutRisk === 'high' || m.burnoutRisk === 'medium').length;

  const tabs = [
    { id: 'overview', label: 'داشبورد مدیریتی', icon: '📊' },
    { id: 'team', label: 'اعضای تیم', icon: '👥' },
    { id: 'departments', label: 'دپارتمان‌ها', icon: '🏢' },
    { id: 'ai', label: 'توصیه‌های AI', icon: '🧠' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #3fb950, #58a6ff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
              }}>🏢</div>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f0f6fc' }}>داشبورد سازمانی</h1>
                <p style={{ fontSize: '13px', color: '#8b949e' }}>LifeFlow Enterprise – خرداد ۱۴۰۵</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="badge badge-green">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3fb950', display: 'inline-block' }} />
              لایو داده
            </span>
            <span className="badge badge-blue">{teamMembers.length} عضو</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '4px', background: '#161b22', borderRadius: '12px',
          border: '1px solid #30363d', padding: '6px', marginBottom: '24px', flexWrap: 'wrap',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: activeTab === tab.id ? '#0d1117' : 'transparent',
                color: activeTab === tab.id ? '#58a6ff' : '#8b949e',
                fontFamily: 'Vazirmatn, sans-serif', fontSize: '13px', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'all 0.2s',
              }}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {[
                { icon: '⚡', label: 'میانگین بهره‌وری', value: `${avgProductivity}%`, sub: 'نسبت به ماه قبل +۶٪', color: '#58a6ff', type: 'blue' },
                { icon: '✅', label: 'تسک تکمیل‌شده', value: `${doneTasks}/${totalTasks}`, sub: `نرخ موفقیت ${Math.round((doneTasks/totalTasks)*100)}%`, color: '#3fb950', type: 'green' },
                { icon: '⚠️', label: 'ریسک فرسودگی', value: `${atRiskCount} نفر`, sub: 'نیاز به مداخله فوری', color: '#f85149', type: 'warning' },
                { icon: '🕐', label: 'کل ساعت کاری', value: `${teamMembers.reduce((s,m)=>s+m.hoursWorked,0)}h`, sub: 'این هفته', color: '#bc8cff', type: 'purple' },
              ].map((kpi, i) => (
                <div key={i} className={`metric-card ${kpi.type}`}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '22px' }}>{kpi.icon}</span>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: kpi.color, boxShadow: `0 0 6px ${kpi.color}` }} />
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: kpi.color, marginBottom: '4px' }}>{kpi.value}</div>
                  <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>{kpi.label}</div>
                  <div style={{ fontSize: '11px', color: '#8b949e' }}>{kpi.sub}</div>
                </div>
              ))}
            </div>

            {/* Productivity Ranking */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div className="card">
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', marginBottom: '20px' }}>
                  🏆 رتبه‌بندی بهره‌وری تیم
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[...teamMembers].sort((a,b) => b.productivity - a.productivity).map((m, i) => (
                    <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                        background: i === 0 ? '#d29922' : i === 1 ? '#8b949e' : i === 2 ? '#9e7646' : '#21262d',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: 700, color: i < 3 ? '#0d1117' : '#8b949e',
                      }}>
                        {i + 1}
                      </span>
                      <span style={{ fontSize: '18px' }}>{m.avatar}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', color: '#c9d1d9', marginBottom: '4px' }}>{m.name}</div>
                        <HeatBar value={m.productivity} />
                      </div>
                      <MiniSparkline data={m.weeklyTrend} color={m.productivity >= 80 ? '#3fb950' : m.productivity >= 60 ? '#d29922' : '#f85149'} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Bar */}
              <div className="card">
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', marginBottom: '20px' }}>
                  🏢 عملکرد دپارتمان‌ها
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {departments.map((dep, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', color: '#c9d1d9' }}>{dep.name}</span>
                        <span style={{ fontSize: '12px', color: '#8b949e' }}>{dep.tasksCompleted} تسک</span>
                      </div>
                      <HeatBar value={dep.productivity} />
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #30363d' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc', marginBottom: '12px' }}>امتیاز سلامت سازمان</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      fontSize: '48px', fontWeight: 800,
                      background: 'linear-gradient(135deg, #3fb950, #58a6ff)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                      {avgProductivity}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#f0f6fc', fontWeight: 600 }}>
                        {avgProductivity >= 80 ? 'سازمان سالم' : avgProductivity >= 65 ? 'نیاز به بهبود' : 'وضعیت بحرانی'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#8b949e' }}>از ۱۰۰ نمره</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Burnout Detection */}
            <div className="card">
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', marginBottom: '16px' }}>
                🔥 هشدار فرسودگی شغلی
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {teamMembers.filter(m => m.burnoutRisk !== 'low').map(m => (
                  <div
                    key={m.id}
                    style={{
                      padding: '16px', borderRadius: '10px',
                      background: m.burnoutRisk === 'high' ? 'rgba(248,81,73,0.08)' : 'rgba(210,153,34,0.08)',
                      border: `1px solid ${m.burnoutRisk === 'high' ? 'rgba(248,81,73,0.3)' : 'rgba(210,153,34,0.3)'}`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '24px' }}>{m.avatar}</span>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc' }}>{m.name}</div>
                        <div style={{ fontSize: '12px', color: '#8b949e' }}>{m.role}</div>
                      </div>
                      <span className={m.burnoutRisk === 'high' ? 'badge badge-danger' : 'badge badge-warning'} style={{ marginRight: 'auto' }}>
                        {m.burnoutRisk === 'high' ? 'خطر بالا' : 'خطر متوسط'}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#8b949e' }}>
                      {m.hoursWorked}ساعت/هفته · {m.tasksDone}/{m.tasksTotal} تسک
                    </div>
                    <div style={{ fontSize: '12px', color: m.burnoutRisk === 'high' ? '#f85149' : '#d29922', marginTop: '6px' }}>
                      {m.burnoutRisk === 'high' ? '⚠️ کاهش ساعت کاری فوری پیشنهاد می‌شود' : '💬 گفتگو و بررسی وضعیت توصیه می‌شود'}
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {teamMembers.map(m => (
                <div
                  key={m.id}
                  className="card"
                  style={{
                    cursor: 'pointer', transition: 'all 0.2s',
                    border: selectedMember === m.id ? '1px solid #58a6ff' : '1px solid #30363d',
                    background: selectedMember === m.id ? 'rgba(88,166,255,0.05)' : '#161b22',
                  }}
                  onClick={() => setSelectedMember(selectedMember === m.id ? null : m.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div style={{
                      width: '52px', height: '52px', borderRadius: '14px',
                      background: 'linear-gradient(135deg, rgba(88,166,255,0.2), rgba(188,140,255,0.2))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px',
                    }}>
                      {m.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc' }}>{m.name}</div>
                      <div style={{ fontSize: '12px', color: '#8b949e' }}>{m.role} · {m.department}</div>
                    </div>
                    <span className={`badge ${m.burnoutRisk === 'high' ? 'badge-danger' : m.burnoutRisk === 'medium' ? 'badge-warning' : 'badge-green'}`}>
                      {m.burnoutRisk === 'high' ? '🔴 خطر' : m.burnoutRisk === 'medium' ? '🟡 متوسط' : '🟢 سالم'}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    {[
                      { label: 'بهره‌وری', value: `${m.productivity}%`, color: m.productivity >= 80 ? '#3fb950' : '#d29922' },
                      { label: 'تسک‌ها', value: `${m.tasksDone}/${m.tasksTotal}`, color: '#58a6ff' },
                      { label: 'ساعت کاری', value: `${m.hoursWorked}h`, color: '#bc8cff' },
                    ].map((stat, i) => (
                      <div key={i} style={{ textAlign: 'center', background: '#0d1117', borderRadius: '8px', padding: '10px' }}>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                        <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '2px' }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: '#8b949e' }}>میزان بهره‌وری</span>
                      <MiniSparkline data={m.weeklyTrend} color={m.productivity >= 80 ? '#3fb950' : '#d29922'} />
                    </div>
                    <HeatBar value={m.productivity} />
                  </div>

                  {selectedMember === m.id && (
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #30363d' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc', marginBottom: '10px' }}>جزئیات عملکرد هفتگی</h4>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px' }}>
                        {m.weeklyTrend.map((v, i) => (
                          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                            <div style={{
                              width: '100%', background: '#58a6ff',
                              height: `${(v / 100) * 50}px`, borderRadius: '3px 3px 0 0', opacity: 0.7,
                            }} />
                            <span style={{ fontSize: '9px', color: '#8b949e' }}>{['ش','ی','د','س','چ','پ','ج'][i]}</span>
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: '12px', color: '#8b949e', marginTop: '10px', lineHeight: 1.6 }}>
                        {m.burnoutRisk === 'high' 
                          ? `⚠️ ${m.name} در ۳ روز گذشته بیش از ۱۰ ساعت کار کرده. کاهش بار کاری ضروری است.`
                          : m.burnoutRisk === 'medium'
                          ? `💬 روند کاهشی در بهره‌وری ${m.name} مشاهده می‌شود. بررسی وضعیت پیشنهاد می‌شود.`
                          : `✅ ${m.name} عملکرد پایداری دارد. ادامه روند فعلی مثبت است.`
                        }
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {departments.map((dep, i) => {
                const colors = ['#58a6ff', '#3fb950', '#bc8cff', '#d29922', '#ff7b72'];
                const color = colors[i % colors.length];
                return (
                  <div key={i} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute', top: 0, right: 0, left: 0, height: '3px',
                      background: `linear-gradient(90deg, ${color}, transparent)`,
                    }} />
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc', marginBottom: '4px' }}>
                      {dep.name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#8b949e', marginBottom: '20px' }}>
                      {dep.headCount} عضو تیم
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                      {[
                        { label: 'بهره‌وری', value: `${dep.productivity}%`, color },
                        { label: 'تسک‌ها', value: dep.tasksCompleted, color: '#58a6ff' },
                        { label: 'ساعت', value: `${dep.hoursSpent}h`, color: '#bc8cff' },
                      ].map((s, si) => (
                        <div key={si} style={{ textAlign: 'center', background: '#0d1117', borderRadius: '8px', padding: '10px' }}>
                          <div style={{ fontSize: '18px', fontWeight: 700, color: s.color }}>{s.value}</div>
                          <div style={{ fontSize: '10px', color: '#8b949e' }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <HeatBar value={dep.productivity} />
                    <div style={{ marginTop: '12px', fontSize: '12px', color: '#8b949e' }}>
                      کارایی منابع: {Math.round(dep.tasksCompleted / (dep.hoursSpent / dep.headCount))} تسک/نفر/هفته
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comparison table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #30363d' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc' }}>مقایسه تفصیلی دپارتمان‌ها</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>دپارتمان</th>
                      <th>تعداد نفرات</th>
                      <th>بهره‌وری</th>
                      <th>تسک تکمیل‌شده</th>
                      <th>ساعت کاری</th>
                      <th>بهره‌وری/نفر</th>
                      <th>وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.sort((a,b) => b.productivity - a.productivity).map((dep, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600, color: '#f0f6fc' }}>{dep.name}</td>
                        <td>{dep.headCount} نفر</td>
                        <td>
                          <span style={{
                            color: dep.productivity >= 80 ? '#3fb950' : dep.productivity >= 60 ? '#d29922' : '#f85149',
                            fontWeight: 600,
                          }}>
                            {dep.productivity}%
                          </span>
                        </td>
                        <td>{dep.tasksCompleted}</td>
                        <td>{dep.hoursSpent}h</td>
                        <td style={{ color: '#58a6ff' }}>{Math.round(dep.tasksCompleted / dep.headCount)} تسک</td>
                        <td>
                          <span className={`badge ${dep.productivity >= 80 ? 'badge-green' : dep.productivity >= 65 ? 'badge-warning' : 'badge-danger'}`}>
                            {dep.productivity >= 80 ? 'عالی' : dep.productivity >= 65 ? 'متوسط' : 'ضعیف'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* AI Recommendations Tab */}
        {activeTab === 'ai' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>
                🧠 توصیه‌های هوش مصنوعی سازمانی
              </h2>
              <p style={{ fontSize: '13px', color: '#8b949e' }}>
                تحلیل جامع عملکرد ۶ عضو تیم و ارائه راهکارهای بهینه‌سازی
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                {
                  icon: '🔥',
                  title: 'بحران فرسودگی در تیم مهندسی',
                  type: 'danger',
                  body: 'مهدی رضایی با ۵۵ ساعت کار در هفته و روند کاهشی بهره‌وری (از ۸۰ به ۶۵) در آستانه فرسودگی است. پیشنهاد: کاهش فوری به ۴۰ ساعت، تفویض اختیار وظایف، و جلسه یک به یک با مدیر.',
                  priority: 'فوری',
                  color: '#f85149',
                },
                {
                  icon: '⚡',
                  title: 'بهینه‌سازی ساختار تیم مهندسی',
                  type: 'warning',
                  body: 'دو مهندس با بار کاری نامتوازن کار می‌کنند. سارا ۴۸ ساعت و مهدی ۵۵ ساعت. توزیع مجدد وظایف می‌تواند بهره‌وری کل دپارتمان را از ۷۶٪ به ۸۵٪ برساند.',
                  priority: 'این هفته',
                  color: '#d29922',
                },
                {
                  icon: '🏆',
                  title: 'الگوگیری از تیم بازاریابی',
                  type: 'success',
                  body: 'نیلوفر حسینی با ۴۰ ساعت کاری و ۹۵٪ بهره‌وری بهترین نسبت کارایی را دارد. روش‌های مدیریت زمان ایشان می‌تواند به عنوان Best Practice در سازمان منتشر شود.',
                  priority: 'این ماه',
                  color: '#3fb950',
                },
                {
                  icon: '📊',
                  title: 'شاخص‌های OKR نیاز به بازنگری دارند',
                  type: 'info',
                  body: 'بر اساس نرخ تکمیل تسک ۸۲٪ در کل سازمان، اهداف فصل بعدی را ۱۵٪ افزایش دهید. تیم از ظرفیت کامل استفاده نمی‌کند.',
                  priority: 'فصل بعد',
                  color: '#58a6ff',
                },
                {
                  icon: '🌱',
                  title: 'سرمایه‌گذاری در آموزش تیم داده',
                  type: 'info',
                  body: 'تیم داده با ۸۸٪ بهره‌وری پتانسیل رشد بالایی دارد. آموزش‌های پیشرفته ML/AI می‌تواند بهره‌وری را به ۹۵٪ برساند و ارزش خروجی را ۳x کند.',
                  priority: '۳ ماهه',
                  color: '#58a6ff',
                },
              ].map((item, i) => {
                const typeColors = { danger: '#f85149', warning: '#d29922', success: '#3fb950', info: '#58a6ff' };
                const color = typeColors[item.type as keyof typeof typeColors];
                return (
                  <div
                    key={i}
                    style={{
                      background: `${color}08`, border: `1px solid ${color}25`,
                      borderRadius: '12px', padding: '20px 24px',
                      borderRight: `4px solid ${color}`,
                      animation: `fadeIn 0.4s ease ${i * 0.08}s both`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ fontSize: '22px', flexShrink: 0 }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc' }}>{item.title}</h3>
                          <span style={{
                            padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600,
                            background: `${color}20`, color, border: `1px solid ${color}40`,
                          }}>
                            {item.priority}
                          </span>
                        </div>
                        <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.8 }}>{item.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Resource Utilization */}
            <div className="card" style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', marginBottom: '16px' }}>
                📈 نرخ استفاده از منابع انسانی
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {teamMembers.map(m => {
                  const utilization = Math.round((m.hoursWorked / 40) * 100);
                  const color = utilization > 120 ? '#f85149' : utilization > 100 ? '#d29922' : '#3fb950';
                  return (
                    <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '18px' }}>{m.avatar}</span>
                      <span style={{ minWidth: '100px', fontSize: '13px', color: '#c9d1d9' }}>{m.name}</span>
                      <div style={{ flex: 1, height: '8px', background: '#21262d', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', width: `${Math.min(utilization, 140)}%`,
                          background: color, borderRadius: '4px', transition: 'width 1s ease',
                        }} />
                      </div>
                      <span style={{ fontSize: '12px', color, fontWeight: 600, minWidth: '48px' }}>
                        {utilization}%
                      </span>
                      <span style={{ fontSize: '11px', color: '#8b949e', minWidth: '32px' }}>
                        {m.hoursWorked}h
                      </span>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: '12px', color: '#8b949e', marginTop: '12px' }}>
                * نرخ ایده‌آل: ۸۰-۱۰۰٪ (۳۲-۴۰ ساعت هفتگی)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
