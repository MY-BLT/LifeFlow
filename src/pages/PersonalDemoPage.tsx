import { useState, useEffect } from 'react';
import { storage, generateId, getCurrentDate, Activity } from '../utils/storage';
import { analytics } from '../utils/analytics';
import { categories } from '../data/sampleData';

interface Props { onNavigate: (page: string) => void; }

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div style={{ height: '6px', background: '#21262d', borderRadius: '3px', overflow: 'hidden', flex: 1 }}>
      <div style={{
        height: '100%', width: `${(value / max) * 100}%`, borderRadius: '3px',
        background: color, transition: 'width 1s ease',
        boxShadow: `0 0 6px ${color}60`,
      }} />
    </div>
  );
}

function SimpleBarChart({ data, labels, colors }: { data: number[][]; labels: string[]; colors: string[] }) {
  const maxVal = Math.max(...data.flat(), 1);
  const seriesLabels = ['کار', 'مطالعه', 'شبکه اجتماعی', 'خواب'];
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '160px', padding: '0 8px' }}>
        {labels.map((label, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '2px' }}>
            {data.map((series, si) => (
              <div key={si} style={{
                width: '100%', minWidth: '8px',
                height: `${(series[i] / maxVal) * 120}px`,
                background: colors[si],
                borderRadius: '3px 3px 0 0',
                opacity: 0.85,
                transition: 'height 0.8s ease',
              }} title={`${seriesLabels[si]}: ${series[i]}h`} />
            ))}
            <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '4px', whiteSpace: 'nowrap' }}>{label.slice(0, 3)}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
        {seriesLabels.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#8b949e' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: colors[i] }} />
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function PieChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulativeAngle = 0;
  const size = 160;
  const r = 60;
  const cx = size / 2;
  const cy = size / 2;

  const slices = data.map(d => {
    const angle = (d.value / total) * 2 * Math.PI;
    const startAngle = cumulativeAngle;
    cumulativeAngle += angle;
    const x1 = cx + r * Math.cos(startAngle - Math.PI / 2);
    const y1 = cy + r * Math.sin(startAngle - Math.PI / 2);
    const x2 = cx + r * Math.cos(cumulativeAngle - Math.PI / 2);
    const y2 = cy + r * Math.sin(cumulativeAngle - Math.PI / 2);
    const largeArc = angle > Math.PI ? 1 : 0;
    return {
      ...d,
      path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
    };
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} stroke="#161b22" strokeWidth="2" opacity={0.9}>
            <title>{s.label}: {s.value}h</title>
          </path>
        ))}
        <circle cx={cx} cy={cy} r={28} fill="#161b22" />
        <text x={cx} y={cy + 4} textAnchor="middle" fill="#c9d1d9" fontSize="11" fontFamily="Vazirmatn">
          {total.toFixed(0)}h
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: d.color, flexShrink: 0 }} />
            <span style={{ color: '#8b949e', minWidth: '100px' }}>{d.label}</span>
            <span style={{ color: '#c9d1d9', fontWeight: 500 }}>{d.value}h</span>
            <span style={{ color: '#8b949e' }}>({Math.round((d.value / total) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadarChart({ scores }: { scores: { label: string; value: number; color: string }[] }) {
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;
  const n = scores.length;

  const getPoint = (i: number, value: number) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const dist = (value / 100) * r;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  };

  const getAxisPoint = (i: number, scale = 1) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + r * scale * Math.cos(angle), y: cy + r * scale * Math.sin(angle) };
  };

  const dataPoints = scores.map((s, i) => getPoint(i, s.value));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1].map((scale, ri) => {
        const pts = Array.from({ length: n }, (_, i) => getAxisPoint(i, scale));
        const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';
        return <path key={ri} d={path} fill="none" stroke="#30363d" strokeWidth="1" opacity="0.6" />;
      })}
      {/* Axes */}
      {Array.from({ length: n }, (_, i) => {
        const end = getAxisPoint(i);
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#30363d" strokeWidth="1" opacity="0.5" />;
      })}
      {/* Data area */}
      <path d={dataPath} fill="rgba(88,166,255,0.15)" stroke="#58a6ff" strokeWidth="2" />
      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={scores[i].color} stroke="#161b22" strokeWidth="1.5" />
      ))}
      {/* Labels */}
      {scores.map((s, i) => {
        const lp = getAxisPoint(i, 1.28);
        return (
          <text key={i} x={lp.x} y={lp.y + 4} textAnchor="middle" fill="#8b949e" fontSize="10" fontFamily="Vazirmatn">
            {s.label}
          </text>
        );
      })}
    </svg>
  );
}

export default function PersonalDemoPage({ onNavigate: _ }: Props) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add' | 'history' | 'insights' | 'export'>('dashboard');
  const [form, setForm] = useState({ category: 'work', hours: '1', date: getCurrentDate(), note: '' });
  const [addedMsg, setAddedMsg] = useState('');

  useEffect(() => {
    setActivities(storage.getActivities());
  }, []);

  const scores = analytics.calculateScores(activities);
  const insights = analytics.generateInsights(activities);
  const catSummary = analytics.getCategorySummary(activities);
  const weekData = analytics.getWeeklyData(activities);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find(c => c.id === form.category)!;
    const activity: Activity = {
      id: generateId(),
      category: form.category,
      label: cat.label,
      hours: parseFloat(form.hours),
      date: form.date,
      icon: cat.icon,
      color: cat.color,
      note: form.note,
    };
    storage.saveActivity(activity);
    setActivities(storage.getActivities());
    setAddedMsg('فعالیت با موفقیت اضافه شد!');
    setTimeout(() => setAddedMsg(''), 3000);
    setForm({ category: 'work', hours: '1', date: getCurrentDate(), note: '' });
  };

  const handleDelete = (id: string) => {
    storage.deleteActivity(id);
    setActivities(storage.getActivities());
  };

  const handleExportJSON = () => {
    const data = JSON.stringify(activities, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'lifeflow-activities.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const headers = 'شناسه,دسته‌بندی,برچسب,ساعت,تاریخ,یادداشت';
    const rows = activities.map(a => `${a.id},${a.category},${a.label},${a.hours},${a.date},${a.note || ''}`);
    const csv = '\uFEFF' + [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'lifeflow-activities.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'dashboard', label: 'داشبورد', icon: '📊' },
    { id: 'add', label: 'افزودن', icon: '➕' },
    { id: 'history', label: 'تاریخچه', icon: '📋' },
    { id: 'insights', label: 'بینش‌ها', icon: '🧠' },
    { id: 'export', label: 'خروجی', icon: '💾' },
  ];

  const scoreCards = [
    { label: 'بهره‌وری', value: scores.productivity, color: '#58a6ff', icon: '⚡' },
    { label: 'تمرکز', value: scores.focus, color: '#3fb950', icon: '🎯' },
    { label: 'سلامت', value: scores.health, color: '#bc8cff', icon: '❤️' },
    { label: 'اتلاف وقت', value: scores.timeWaste, color: '#f85149', icon: '⏰', inverse: true },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#f0f6fc', marginBottom: '4px' }}>
              داشبورد شخصی
            </h1>
            <p style={{ fontSize: '14px', color: '#8b949e' }}>
              تحلیل هوشمند الگوهای رفتاری و بهره‌وری شما
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <span className="badge badge-green">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3fb950', display: 'inline-block' }} />
              آنلاین
            </span>
            <span style={{ fontSize: '13px', color: '#8b949e', display: 'flex', alignItems: 'center', gap: '4px' }}>
              📅 خرداد ۱۴۰۵
            </span>
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
                boxShadow: activeTab === tab.id ? '0 0 10px rgba(88,166,255,0.1)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Overall score */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(88,166,255,0.08), rgba(188,140,255,0.08))',
                border: '1px solid rgba(88,166,255,0.2)',
                borderRadius: '16px', padding: '28px',
                display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '56px', fontWeight: 800,
                    background: 'linear-gradient(135deg, #58a6ff, #bc8cff)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>
                    {scores.overall}
                  </div>
                  <div style={{ fontSize: '13px', color: '#8b949e' }}>امتیاز کلی</div>
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f6fc', marginBottom: '4px' }}>
                    {scores.overall >= 80 ? 'عالی! شما در مسیر درست هستید' : scores.overall >= 60 ? 'خوب، اما جای بهبود وجود دارد' : 'نیاز به تنظیم مجدد دارید'}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.7 }}>
                    بر اساس تحلیل {activities.length} فعالیت ثبت‌شده در {new Set(activities.map(a => a.date)).size} روز
                  </p>
                  <div style={{ marginTop: '12px' }}>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${scores.overall}%`, background: 'linear-gradient(90deg, #58a6ff, #bc8cff)' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {scoreCards.map(sc => (
                <div key={sc.label} className={`metric-card ${sc.color === '#58a6ff' ? 'blue' : sc.color === '#3fb950' ? 'green' : sc.color === '#bc8cff' ? 'purple' : 'warning'}`}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontSize: '20px' }}>{sc.icon}</span>
                    <span style={{ fontSize: '11px', color: '#8b949e', background: '#0d1117', padding: '2px 8px', borderRadius: '4px' }}>
                      {sc.label}
                    </span>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: sc.color, marginBottom: '8px' }}>
                    {sc.inverse ? `${sc.value}%` : `${sc.value}`}
                  </div>
                  <MiniBar value={sc.value} max={100} color={sc.color} />
                  <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '6px' }}>
                    {sc.inverse ? (sc.value > 50 ? '⚠️ بالاتر از حد مجاز' : '✅ در محدوده مناسب') : (sc.value >= 75 ? '✅ عالی' : sc.value >= 50 ? '⚡ متوسط' : '⚠️ نیاز به بهبود')}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {/* Pie Chart */}
              <div className="card">
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🍕 توزیع زمان
                </h3>
                <PieChart
                  data={catSummary.slice(0, 6).map(c => ({ label: c.label, value: c.totalHours, color: c.color }))}
                />
              </div>

              {/* Bar Chart */}
              <div className="card">
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📊 نمودار هفتگی
                </h3>
                <SimpleBarChart
                  data={[weekData.work, weekData.study, weekData.social, weekData.sleep]}
                  labels={weekData.labels}
                  colors={['#58a6ff', '#3fb950', '#f85149', '#bc8cff']}
                />
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="card">
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', marginBottom: '20px' }}>
                📋 تفکیک دسته‌بندی‌ها
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {catSummary.map(cat => (
                  <div key={cat.category} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px', width: '28px', textAlign: 'center' }}>{cat.icon}</span>
                    <div style={{ minWidth: '120px', fontSize: '13px', color: '#c9d1d9' }}>{cat.label}</div>
                    <div style={{ flex: 1 }}>
                      <MiniBar value={cat.percentage} max={100} color={cat.color} />
                    </div>
                    <div style={{ fontSize: '12px', color: '#8b949e', minWidth: '70px', textAlign: 'left' }}>
                      {cat.totalHours}h ({cat.percentage}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Activity Tab */}
        {activeTab === 'add' && (
          <div style={{ maxWidth: '600px', animation: 'fadeIn 0.4s ease' }}>
            <div className="card" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>
                ➕ افزودن فعالیت جدید
              </h2>
              {addedMsg && (
                <div style={{
                  padding: '12px 16px', borderRadius: '8px', marginBottom: '20px',
                  background: 'rgba(63,185,80,0.1)', border: '1px solid rgba(63,185,80,0.3)',
                  color: '#3fb950', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  ✅ {addedMsg}
                </div>
              )}
              <form onSubmit={handleAdd}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#c9d1d9', marginBottom: '8px' }}>
                    دسته‌بندی فعالیت
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, category: cat.id }))}
                        style={{
                          padding: '10px 12px', borderRadius: '8px', cursor: 'pointer',
                          background: form.category === cat.id ? `${cat.color}15` : '#0d1117',
                          border: `1px solid ${form.category === cat.id ? cat.color : '#30363d'}`,
                          color: form.category === cat.id ? cat.color : '#8b949e',
                          fontFamily: 'Vazirmatn, sans-serif', fontSize: '12px',
                          display: 'flex', alignItems: 'center', gap: '6px',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span>{cat.icon}</span> {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#c9d1d9', marginBottom: '8px' }}>
                      مدت (ساعت)
                    </label>
                    <input
                      type="number"
                      min="0.25" max="24" step="0.25"
                      value={form.hours}
                      onChange={e => setForm(f => ({ ...f, hours: e.target.value }))}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#c9d1d9', marginBottom: '8px' }}>
                      تاریخ
                    </label>
                    <input
                      type="text"
                      value={form.date}
                      onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                      className="input-field"
                      placeholder="1405/03/01"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#c9d1d9', marginBottom: '8px' }}>
                    یادداشت (اختیاری)
                  </label>
                  <textarea
                    value={form.note}
                    onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                    className="input-field"
                    placeholder="توضیح مختصری درباره این فعالیت..."
                    rows={3}
                    style={{ resize: 'vertical', fontFamily: 'Vazirmatn, sans-serif' }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '15px' }}>
                  ثبت فعالیت
                </button>
              </form>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc' }}>📋 تاریخچه فعالیت‌ها ({activities.length} مورد)</h2>
              <button
                onClick={() => { storage.clearActivities(); setActivities(storage.getActivities()); }}
                className="btn-danger"
                style={{ fontSize: '12px' }}
              >
                🔄 بازنشانی داده
              </button>
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>فعالیت</th>
                      <th>دسته‌بندی</th>
                      <th>ساعت</th>
                      <th>تاریخ</th>
                      <th>یادداشت</th>
                      <th>عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.slice(0, 50).map(act => (
                      <tr key={act.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>{act.icon}</span>
                            <span style={{ fontSize: '13px', color: '#c9d1d9' }}>{act.label}</span>
                          </div>
                        </td>
                        <td>
                          <span style={{
                            background: `${act.color}15`, color: act.color,
                            border: `1px solid ${act.color}30`,
                            padding: '2px 8px', borderRadius: '4px', fontSize: '11px',
                          }}>
                            {act.category}
                          </span>
                        </td>
                        <td style={{ color: '#58a6ff', fontWeight: 600 }}>{act.hours}h</td>
                        <td style={{ color: '#8b949e', fontSize: '12px' }}>{act.date}</td>
                        <td style={{ color: '#8b949e', fontSize: '12px', maxWidth: '150px' }}>
                          {act.note || '-'}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(act.id)}
                            style={{
                              background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)',
                              color: '#f85149', padding: '4px 10px', borderRadius: '6px',
                              cursor: 'pointer', fontSize: '12px', fontFamily: 'Vazirmatn, sans-serif',
                            }}
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>
                🧠 بینش‌های هوش مصنوعی
              </h2>
              <p style={{ fontSize: '13px', color: '#8b949e' }}>
                بر اساس تحلیل رفتاری {activities.length} فعالیت ثبت‌شده شما
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {insights.map((insight, i) => {
                const colors = { warning: '#d29922', success: '#3fb950', info: '#58a6ff', danger: '#f85149' };
                const color = colors[insight.type];
                return (
                  <div
                    key={i}
                    style={{
                      background: `${color}08`, border: `1px solid ${color}25`,
                      borderRadius: '12px', padding: '20px 24px',
                      borderRight: `4px solid ${color}`,
                      animation: `fadeIn 0.4s ease ${i * 0.1}s both`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '22px' }}>{insight.icon}</span>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc' }}>{insight.title}</h3>
                      <span style={{ marginRight: 'auto' }}>
                        <span className={`badge badge-${insight.type === 'success' ? 'green' : insight.type === 'danger' ? 'danger' : insight.type === 'warning' ? 'warning' : 'blue'}`}>
                          {insight.type === 'warning' ? 'هشدار' : insight.type === 'success' ? 'مثبت' : insight.type === 'danger' ? 'خطر' : 'اطلاعات'}
                        </span>
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.8 }}>{insight.body}</p>
                  </div>
                );
              })}
            </div>

            {/* Recommendations */}
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0f6fc', marginBottom: '16px' }}>💡 توصیه‌های عملی</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {[
                  { icon: '⏰', title: 'تایم‌بلاکینگ', body: 'روز را به بلوک‌های ۹۰ دقیقه‌ای تقسیم کنید. مغز در این چرخه بهترین عملکرد را دارد.' },
                  { icon: '📱', title: 'Digital Detox', body: 'برنامه‌های شبکه اجتماعی را در زمان کار Grayscale کنید. ۴۷٪ کمتر وسوسه می‌شوید.' },
                  { icon: '🌅', title: 'Morning Routine', body: 'اول صبح مهم‌ترین کار روز را انجام دهید. ولایت خود را ۴۰٪ افزایش می‌دهد.' },
                  { icon: '💧', title: 'هیدراتاسیون', body: 'کم‌آبی ۲٪ تمرکز را ۲۰٪ کاهش می‌دهد. هر ساعت یک لیوان آب بنوشید.' },
                ].map((rec, i) => (
                  <div key={i} className="card" style={{ padding: '20px' }}>
                    <div style={{ fontSize: '28px', marginBottom: '12px' }}>{rec.icon}</div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '8px' }}>{rec.title}</h4>
                    <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.7 }}>{rec.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div style={{ maxWidth: '600px', animation: 'fadeIn 0.4s ease' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>💾 خروجی گزارش</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: '📄', title: 'خروجی JSON', desc: 'داده‌های خام فعالیت‌ها در فرمت JSON', action: handleExportJSON, label: 'دانلود JSON', color: '#58a6ff' },
                { icon: '📊', title: 'خروجی CSV', desc: 'مناسب برای اکسل و Google Sheets', action: handleExportCSV, label: 'دانلود CSV', color: '#3fb950' },
                { icon: '🖨️', title: 'چاپ گزارش', desc: 'گزارش کامل بهره‌وری برای چاپ', action: () => window.print(), label: 'چاپ', color: '#bc8cff' },
              ].map((item, i) => (
                <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px' }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '12px',
                    background: `${item.color}15`, border: `1px solid ${item.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', marginBottom: '4px' }}>{item.title}</h3>
                    <p style={{ fontSize: '13px', color: '#8b949e' }}>{item.desc}</p>
                  </div>
                  <button
                    onClick={item.action}
                    style={{
                      padding: '10px 20px', borderRadius: '8px',
                      background: `${item.color}15`, border: `1px solid ${item.color}30`,
                      color: item.color, cursor: 'pointer', fontSize: '13px',
                      fontFamily: 'Vazirmatn, sans-serif', fontWeight: 600,
                      transition: 'all 0.2s', whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </button>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '24px', padding: '20px', borderRadius: '12px',
              background: 'rgba(88,166,255,0.06)', border: '1px solid rgba(88,166,255,0.2)',
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '12px' }}>
                📈 خلاصه وضعیت
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { label: 'کل فعالیت‌ها', value: activities.length },
                  { label: 'روزهای فعال', value: new Set(activities.map(a => a.date)).size },
                  { label: 'کل ساعت ثبت‌شده', value: `${activities.reduce((s, a) => s + a.hours, 0).toFixed(1)}h` },
                  { label: 'امتیاز کلی', value: `${scores.overall}/100` },
                ].map((stat, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '12px', background: '#0d1117', borderRadius: '8px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#58a6ff' }}>{stat.value}</div>
                    <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '2px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
