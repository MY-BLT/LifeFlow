// ============================================================
// src/pages/PersonalDemoPage.tsx
// LifeFlow AI Life Intelligence Platform – Enhanced Version
// با مدیریت داینامیک داده‌ها، AI پیشرفته و عملیات CRUD کامل
// ============================================================

import { useEffect, useRef, useState } from 'react';
import { categories } from '../data/sampleData';
import { analytics } from '../utils/analytics';
import { Activity, generateId, getCurrentDate, storage } from '../utils/storage';
import Footer from '../components/Footer';
import ProjectExplorer from '../components/ProjectExplorer';

interface Props { onNavigate: (page: string) => void; }

// ─── Interfaces ──────────────────────────────────────────────────────────────

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: string;
  color: string;
  createdAt: string;
}

interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: string;
  streak: number;
  completedDays: boolean[];
  createdAt: string;
  targetDays: number;
}

interface AIContext {
  activities: Activity[];
  scores: ReturnType<typeof analytics.calculateScores>;
  goals: Goal[];
  habits: Habit[];
  categorySummary: ReturnType<typeof analytics.getCategorySummary>;
}

// ─── Storage Keys ────────────────────────────────────────────────────────────

const STORAGE_KEYS = {
  GOALS: 'lifeflow_goals',
  HABITS: 'lifeflow_habits',
  ACTIVITIES: 'lifeflow_activities',
  AI_HISTORY: 'lifeflow_ai_history',
};

// ─── توابع تبدیل تاریخ شمسی / میلادی ────────────────────────────────────────

function toJalali(gy: number, gm: number, gd: number): [number, number, number] {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let gy2 = (gm > 2) ? gy + 1 : gy;
  let days = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
  let jy = -1595 + (33 * Math.floor(days / 12053));
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  let jm = 0;
  if (days < 186) {
    jm = 1 + Math.floor(days / 31);
    days = 1 + (days % 31);
  } else {
    jm = 7 + Math.floor((days - 186) / 30);
    days = 1 + ((days - 186) % 30);
  }
  return [jy, jm, days];
}

function toGregorian(jy: number, jm: number, jd: number): [number, number, number] {
  jy += 1595;
  let days = -355668 + (365 * jy) + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4) + jd + (jm < 7 ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
  let gy = 400 * Math.floor(days / 146097);
  days %= 146097;
  if (days > 36524) {
    gy += 100 * Math.floor((--days) / 36524);
    days %= 36524;
  }
  gy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    gy += Math.floor((--days) / 365);
    days %= 365;
  }
  let gm = 0;
  let gd = days + 1;
  const sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (gm = 1; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
  return [gy, gm, gd];
}

function getPersianDayIndex(dateStr: string): number {
  const [y, m, d] = dateStr.split('/').map(Number);
  const [gy, gm, gd] = toGregorian(y, m, d);
  const gDate = new Date(gy, gm - 1, gd);
  const day = gDate.getDay();
  return (day + 1) % 7;
}

function calculateStreak(days: boolean[]): number {
  let s = 0;
  for (let i = days.length - 1; i >= 0 && days[i]; i--) s++;
  return s;
}

// ─── Storage Helpers ─────────────────────────────────────────────────────────

const StorageHelper = {
  getGoals: (): Goal[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GOALS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveGoals: (goals: Goal[]) => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  },
  getHabits: (): Habit[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HABITS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveHabits: (habits: Habit[]) => {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  },
  getAIHistory: (): { role: 'user' | 'ai'; text: string; timestamp: string }[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AI_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveAIHistory: (history: { role: 'user' | 'ai'; text: string; timestamp: string }[]) => {
    localStorage.setItem(STORAGE_KEYS.AI_HISTORY, JSON.stringify(history));
  },
};

// ─── Enhanced AI Engine ─────────────────────────────────────────────────────

class AIEngine {
  private context: AIContext;

  constructor(context: AIContext) {
    this.context = context;
  }

  private analyzePattern(question: string): string {
    const patterns = {
      productivity: /بهره\s*ور|productivity|کار.*بیشتر|کارایی|efficient/i,
      burnout: /فرسودگ|burnout|خست|tired|استرس|stress/i,
      sleep: /خواب|sleep|بیدار|insomnia/i,
      social: /شبکه.*اجتماع|social.*media|اینستاگرام|instagram|telegram/i,
      goals: /هدف|goal|target|آرزو|dream/i,
      habits: /عادت|habit|روتین|routine/i,
      balance: /تعادل|balance|work.*life/i,
      focus: /تمرکز|focus|concentration|حواس.*پرت/i,
      health: /سلامت|health|ورزش|exercise|تغذیه|nutrition/i,
      time: /زمان|time|مدیریت.*وقت|time.*management/i,
      why: /چرا|why|علت|reason/i,
      what: /چی|چه|what/i,
      how: /چطور|چگونه|how/i,
      when: /کی|چه.*وقت|when/i,
    };

    const matched: string[] = [];
    Object.entries(patterns).forEach(([key, regex]) => {
      if (regex.test(question)) matched.push(key);
    });

    return matched.length > 0 ? matched[0] : 'general';
  }

  private getStats() {
    const { activities, scores, categorySummary } = this.context;
    const days = Math.max(new Set(activities.map(a => a.date)).size, 1);
    const byCat: Record<string, number> = {};
    activities.forEach(a => { byCat[a.category] = (byCat[a.category] || 0) + a.hours; });

    return {
      totalActivities: activities.length,
      activeDays: days,
      avgPerDay: (activities.reduce((s, a) => s + a.hours, 0) / days).toFixed(1),
      work: ((byCat['work'] || 0) / days).toFixed(1),
      study: ((byCat['study'] || 0) / days).toFixed(1),
      sleep: ((byCat['sleep'] || 0) / days).toFixed(1),
      social: ((byCat['social_media'] || 0) / days).toFixed(1),
      exercise: ((byCat['exercise'] || 0) / days).toFixed(1),
      topCategory: categorySummary[0],
      scores,
      byCat,
    };
  }

  generateResponse(question: string): string {
    const pattern = this.analyzePattern(question);
    const stats = this.getStats();
    const { goals, habits } = this.context;

    // Productivity Analysis
    if (pattern === 'productivity' || question.includes('بهره‌ور')) {
      const issues: string[] = [];
      const strengths: string[] = [];

      if (parseFloat(stats.work) > 7) strengths.push(`• ${stats.work} ساعت کار متمرکز روزانه`);
      if (parseFloat(stats.study) > 1) strengths.push(`• ${stats.study} ساعت یادگیری مداوم`);
      if (parseFloat(stats.social) > 2) issues.push(`• ${stats.social} ساعت شبکه اجتماعی (بیش از حد)`);
      if (stats.scores.focus < 60) issues.push(`• امتیاز تمرکز پایین: ${stats.scores.focus}/100`);
      if (parseFloat(stats.sleep) < 7) issues.push(`• کمبود خواب: ${stats.sleep} ساعت`);

      return `🔍 تحلیل بهره‌وری شما:\n\n` +
        `📊 امتیاز کلی: ${stats.scores.productivity}/100\n\n` +
        (strengths.length > 0 ? `✅ نقاط قوت:\n${strengths.join('\n')}\n\n` : '') +
        (issues.length > 0 ? `⚠️ نقاط ضعف:\n${issues.join('\n')}\n\n` : '') +
        `💡 توصیه هوشمند:\n` +
        (parseFloat(stats.social) > 2
          ? `۱. شبکه اجتماعی را به زیر ۱.۵ ساعت برسانید\n۲. از تکنیک Pomodoro استفاده کنید\n۳. صبح‌ها ۲ ساعت Deep Work`
          : stats.scores.focus < 60
          ? `۱. محیط کار را از حواس‌پرتی پاک کنید\n۲. از برنامه Focus mode استفاده کنید\n۳. کارهای مشابه را دسته‌بندی کنید`
          : `شما در مسیر درستی هستید. برای بهینه‌سازی:\n۱. اولویت‌بندی به روش Eisenhower\n۲. خودکارسازی کارهای تکراری\n۳. تفویض کارهای کم‌ارزش`);
    }

    // Burnout Risk
    if (pattern === 'burnout' || question.includes('فرسودگ')) {
      const workHours = parseFloat(stats.work);
      const sleepHours = parseFloat(stats.sleep);
      const exerciseHours = parseFloat(stats.exercise);

      const riskLevel = workHours > 10 || sleepHours < 6 || exerciseHours < 0.5 ? 'بالا' :
        workHours > 8 || sleepHours < 7 ? 'متوسط' : 'پایین';

      const riskColor = riskLevel === 'بالا' ? '🔴' : riskLevel === 'متوسط' ? '🟡' : '🟢';

      return `${riskColor} ارزیابی ریسک فرسودگی: ${riskLevel}\n\n` +
        `📊 شاخص‌های کلیدی:\n` +
        `• ساعت کار روزانه: ${stats.work}h ${workHours > 9 ? '⚠️' : '✅'}\n` +
        `• میانگین خواب: ${stats.sleep}h ${sleepHours < 7 ? '⚠️' : '✅'}\n` +
        `• فعالیت ورزشی: ${stats.exercise}h ${exerciseHours < 0.5 ? '⚠️' : '✅'}\n` +
        `• امتیاز سلامت: ${stats.scores.health}/100\n\n` +
        `💊 راهکار ${riskLevel === 'بالا' ? 'فوری' : 'پیشنهادی'}:\n` +
        (riskLevel === 'بالا'
          ? `۱. کاهش فوری ساعت کار به ${Math.max(workHours - 2, 8)}h\n۲. افزایش خواب به حداقل ۷ ساعت\n۳. ۳۰ دقیقه ورزش روزانه\n۴. ۱ روز کامل استراحت این هفته`
          : riskLevel === 'متوسط'
          ? `۱. هر ۹۰ دقیقه ۱۵ دقیقه استراحت\n۲. تکنیک تنفس عمیق ۳ بار در روز\n۳. یک روز weekend واقعی\n۴. مدیتیشن یا یوگا`
          : `برای حفظ تعادل:\n۱. ادامه الگوی فعلی\n۲. پیاده‌روی روزانه\n۳. هابی شخصی ۳۰ دقیقه\n۴. ارتباط با دوستان`);
    }

    // Sleep Analysis
    if (pattern === 'sleep') {
      const sleepHours = parseFloat(stats.sleep);
      const quality = sleepHours >= 8 ? 'عالی' : sleepHours >= 7 ? 'خوب' : sleepHours >= 6 ? 'متوسط' : 'ضعیف';

      return `😴 تحلیل الگوی خواب:\n\n` +
        `💤 میانگین: ${stats.sleep} ساعت/شب (${quality})\n` +
        `🎯 هدف ایده‌آل: ۷-۸ ساعت\n` +
        `📊 تأثیر بر عملکرد: ${sleepHours >= 7 ? '+15%' : sleepHours >= 6 ? '-10%' : '-25%'}\n\n` +
        `${sleepHours < 7 ? '⚠️ ' : '✅ '}توصیه‌های بهبود:\n` +
        `۱. ساعت ثابت خواب: ۲۳:۰۰\n` +
        `۲. بیداری ثابت: ۷:۰۰\n` +
        `۳. ۶۰ دقیقه قبل از خواب:\n` +
        `   • خاموش کردن تلفن و لپتاپ\n` +
        `   • نور کم، دمای ۱۸-۲۰°C\n` +
        `   • کتاب یا مدیتیشن\n` +
        `۴. اجتناب از کافئین بعد از ۱۶:۰۰\n` +
        `۵. ورزش سبک عصرگاهی`;
    }

    // Social Media
    if (pattern === 'social') {
      const socialHours = parseFloat(stats.social);
      const productivityLoss = Math.round(socialHours * 1.5);

      return `📱 تحلیل شبکه‌های اجتماعی:\n\n` +
        `⏰ مصرف روزانه: ${stats.social} ساعت\n` +
        `📉 تلفات بهره‌وری: ~${productivityLoss}h/هفته\n` +
        `🎯 محدوده ایده‌آل: کمتر از ۱.۵ ساعت\n\n` +
        `${socialHours > 2 ? '🔴' : socialHours > 1.5 ? '🟡' : '🟢'} وضعیت: ${socialHours > 2 ? 'خطرناک' : socialHours > 1.5 ? 'نیاز به کنترل' : 'مناسب'}\n\n` +
        `💡 استراتژی کاهش (۳۰ روزه):\n` +
        `هفته ۱: کاهش به ${Math.max(socialHours - 0.5, 1.5)}h با حذف Infinite Scroll\n` +
        `هفته ۲: زمان‌بندی (۱۲-۱۳ و ۱۹-۲۰)\n` +
        `هفته ۳: حذف اپلیکیشن‌های پرمصرف از صفحه اول\n` +
        `هفته ۴: ۱ روز Digital Detox در هفته\n\n` +
        `🎁 سود احتمالی:\n` +
        `• +${Math.round((socialHours - 1.5) * 7)} ساعت آزاد در هفته\n` +
        `• +${Math.min(Math.round((socialHours - 1.5) * 10), 30)} امتیاز تمرکز\n` +
        `• بهبود کیفیت روابط واقعی`;
    }

    // Goals Analysis
    if (pattern === 'goals' || question.includes('هدف')) {
      const activeGoals = goals.filter(g => {
        const [y, m, d] = g.deadline.split('/').map(Number);
        const [gy, gm, gd] = toGregorian(y, m, d);
        return new Date(gy, gm - 1, gd) >= new Date();
      });

      const achievableGoals = activeGoals.filter(g =>
        g.category === 'social_media' ? g.current > g.target : g.current / g.target >= 0.7
      );

      return `🎯 تحلیل اهداف شما:\n\n` +
        `📊 وضعیت کلی:\n` +
        `• اهداف فعال: ${activeGoals.length}\n` +
        `• در مسیر موفقیت: ${achievableGoals.length}\n` +
        `• نیاز به توجه: ${activeGoals.length - achievableGoals.length}\n\n` +
        (activeGoals.length > 0
          ? `🔝 اولویت‌های این هفته:\n` +
          activeGoals.slice(0, 3).map((g, i) => {
            const progress = g.category === 'social_media'
              ? Math.min(100, Math.round((g.target / Math.max(g.current, 0.1)) * 100))
              : Math.min(100, Math.round((g.current / g.target) * 100));
            return `${i + 1}. ${g.title}: ${progress}% ${progress >= 70 ? '✅' : progress >= 40 ? '⚡' : '⚠️'}`;
          }).join('\n') + '\n\n'
          : '📝 شما هنوز هدفی تعریف نکرده‌اید.\n\n'
        ) +
        `💡 توصیه هوشمند:\n` +
        (activeGoals.length === 0
          ? `شروع با ۳ هدف SMART:\n۱. یک هدف یادگیری (مثلاً ۳۰ دقیقه مطالعه)\n۲. یک هدف سلامتی (مثلاً ۲۰ دقیقه ورزش)\n۳. یک هدف کاهشی (مثلاً کمتر از ۱ ساعت شبکه اجتماعی)`
          : `• هر هدف را به ۴ بخش ۷ روزه تقسیم کنید\n• روزانه progress را ثبت کنید\n• هر ۷ روز یکبار بازبینی و تنظیم\n• از accountability partner استفاده کنید`);
    }

    // Habits Analysis
    if (pattern === 'habits' || question.includes('عادت')) {
      const activeHabits = habits.filter(h => h.streak > 0);
      const strugglingHabits = habits.filter(h => h.streak < 3);

      return `🔁 تحلیل عادت‌های شما:\n\n` +
        `📊 آمار کلی:\n` +
        `• کل عادت‌ها: ${habits.length}\n` +
        `• در حال استمرار: ${activeHabits.length}\n` +
        `• نیاز به تقویت: ${strugglingHabits.length}\n\n` +
        (habits.length > 0
          ? `🏆 برترین‌ها:\n` +
          habits.sort((a, b) => b.streak - a.streak).slice(0, 3).map((h, i) =>
            `${i + 1}. ${h.name}: ${h.streak} روز متوالی ${h.icon}`
          ).join('\n') + '\n\n'
          : ''
        ) +
        `💡 علم عادت‌سازی:\n` +
        `• ۲۱ روز برای شروع عادت\n` +
        `• ۶۶ روز برای خودکارسازی\n` +
        `• ۹۰ روز برای تثبیت کامل\n\n` +
        `🎯 فرمول موفقیت:\n` +
        `۱. Cue واضح (مثلاً بعد از صبحانه)\n` +
        `۲. Routine ساده (شروع با ۵ دقیقه)\n` +
        `۳. Reward فوری (تیک در تقویم)\n` +
        `۴. Tracking روزانه (این برنامه!)\n\n` +
        (strugglingHabits.length > 0
          ? `⚠️ برای عادت‌های ضعیف:\n• کاهش سختی به نصف\n• Stack کردن با عادت موجود\n• تغییر زمان اجرا\n• یافتن partner همراه`
          : '');
    }

    // Time Management
    if (pattern === 'time') {
      const totalHours = parseFloat(stats.avgPerDay);
      const productiveHours = parseFloat(stats.work) + parseFloat(stats.study);
      const wasteHours = parseFloat(stats.social);

      return `⏰ تحلیل مدیریت زمان:\n\n` +
        `📊 توزیع ۲۴ ساعت:\n` +
        `• زمان مفید: ${productiveHours.toFixed(1)}h (${Math.round(productiveHours / 24 * 100)}%)\n` +
        `• خواب: ${stats.sleep}h (${Math.round(parseFloat(stats.sleep) / 24 * 100)}%)\n` +
        `• اتلاف: ${wasteHours.toFixed(1)}h (${Math.round(wasteHours / 24 * 100)}%)\n` +
        `• سایر: ${(24 - productiveHours - parseFloat(stats.sleep) - wasteHours).toFixed(1)}h\n\n` +
        `💡 بهینه‌سازی:\n` +
        `🔴 Priority 1 (High Impact):\n` +
        `• ${parseFloat(stats.work) < 6 ? 'افزایش کار عمیق به ۶-۸ ساعت' : 'حفظ کار عمیق در بازه فعلی'}\n` +
        `• ${wasteHours > 2 ? `کاهش اتلاف از ${wasteHours}h به ۱.۵h` : 'حفظ کنترل فعلی حواس‌پرتی‌ها'}\n\n` +
        `🟡 Priority 2 (Medium Impact):\n` +
        `• Time Blocking: تقسیم روز به بلوک‌های ۹۰ دقیقه‌ای\n` +
        `• Batch Processing: گروه‌بندی کارهای مشابه\n\n` +
        `🟢 Priority 3 (Low Effort):\n` +
        `• حذف جلسات غیرضروری\n` +
        `• خودکارسازی کارهای اداری\n` +
        `• تفویض کارهای کم‌ارزش`;
    }

    // Focus Analysis
    if (pattern === 'focus') {
      return `🎯 تحلیل تمرکز:\n\n` +
        `📊 امتیاز فعلی: ${stats.scores.focus}/100\n` +
        `🔬 عوامل تأثیرگذار:\n` +
        `• خواب: ${stats.scores.health >= 70 ? '✅ مناسب' : '⚠️ ناکافی'}\n` +
        `• حواس‌پرتی: ${parseFloat(stats.social) < 2 ? '✅ کنترل‌شده' : '⚠️ زیاد'}\n` +
        `• محیط کار: ${stats.scores.productivity >= 70 ? '✅ بهینه' : '⚠️ نیاز به بهبود'}\n\n` +
        `💡 تکنیک‌های پیشرفته:\n` +
        `۱. Deep Work Sessions:\n` +
        `   • ۹۰ دقیقه کار بدون وقفه\n` +
        `   • ۱۵ دقیقه استراحت فعال\n` +
        `   • حداکثر ۳ سشن در روز\n\n` +
        `۲. محیط‌سازی:\n` +
        `   • موبایل در حالت هواپیما\n` +
        `   • بستن تمام تب‌های مرورگر\n` +
        `   • موسیقی بی‌کلام (Lo-fi/Classical)\n` +
        `   • نور طبیعی کافی\n\n` +
        `۳. Cognitive Enhancement:\n` +
        `   • مدیتیشن ۱۰ دقیقه صبح\n` +
        `   • ورزش هوازی ۲۰ دقیقه\n` +
        `   • آب کافی (۲ لیتر)\n` +
        `   • میان‌وعده سالم\n\n` +
        `🎯 چالش ۷ روزه:\n` +
        `هر روز ۱ بلوک Deep Work اضافه کنید\n` +
        `هدف: ${stats.scores.focus + 15} امتیاز در هفته آینده`;
    }

    // General/Default Response
    return `🤖 تحلیل جامع وضعیت شما:\n\n` +
      `📊 داده‌های کلیدی:\n` +
      `• ${stats.totalActivities} فعالیت در ${stats.activeDays} روز\n` +
      `• میانگین روزانه: ${stats.avgPerDay} ساعت\n` +
      `• Life Score: ${stats.scores.overall}/100\n\n` +
      `🎯 امتیازها:\n` +
      `• بهره‌وری: ${stats.scores.productivity}/100 ${stats.scores.productivity >= 70 ? '✅' : '⚠️'}\n` +
      `• تمرکز: ${stats.scores.focus}/100 ${stats.scores.focus >= 70 ? '✅' : '⚠️'}\n` +
      `• سلامت: ${stats.scores.health}/100 ${stats.scores.health >= 70 ? '✅' : '⚠️'}\n` +
      `• تعادل: ${stats.scores.balance}/100 ${stats.scores.balance >= 70 ? '✅' : '⚠️'}\n\n` +
      `💡 سوالات پیشنهادی:\n` +
      `• "چرا بهره‌ورم کم است؟"\n` +
      `• "ریسک فرسودگی دارم؟"\n` +
      `• "چطور خوابم را بهبود دهم؟"\n` +
      `• "عادت‌هایم چطور است؟"\n` +
      `• "اهدافم قابل دستیابی است؟"\n` +
      `• "چطور تمرکزم را افزایش دهم؟"`;
  }
}

// ─── کامپوننت تقویم شمسی ──────────────────────────────────────────────────

function JalaliDatePicker({ value, onChange }: { value: string; onChange: (date: string) => void }) {
  const [show, setShow] = useState(false);
  const today = getCurrentDate();
  const [jYear, jMonth] = value ? value.split('/').map(Number) : today.split('/').map(Number);
  const [month, setMonth] = useState(jMonth || 1);
  const [year, setYear] = useState(jYear || 1405);

  const daysInMonth = month <= 6 ? 31 : month <= 11 ? 30 : (year % 4 === 3 ? 30 : 29);
  const firstDayOfMonth = toGregorian(year, month, 1);
  const gDate = new Date(firstDayOfMonth[0], firstDayOfMonth[1] - 1, firstDayOfMonth[2]);
  const firstDayOffset = (gDate.getDay() + 1) % 7;

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleSelect = (day: number) => {
    const dateStr = `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
    onChange(dateStr);
    setShow(false);
  };

  const changeMonth = (delta: number) => {
    let newMonth = month + delta;
    let newYear = year;
    if (newMonth > 12) { newMonth = 1; newYear++; }
    if (newMonth < 1) { newMonth = 12; newYear--; }
    setMonth(newMonth);
    setYear(newYear);
  };

  const persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        value={value || ''}
        readOnly
        onClick={() => setShow(!show)}
        className="input-field"
        style={{ cursor: 'pointer' }}
        placeholder="1405/01/01"
      />
      {show && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, background: '#161b22',
          border: '1px solid #30363d', borderRadius: '10px', padding: '12px',
          zIndex: 1000, width: '260px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <button onClick={() => changeMonth(-1)} style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', fontSize: '16px' }}>◀</button>
            <span style={{ color: '#f0f6fc', fontSize: '13px', fontWeight: 600 }}>
              {persianMonths[month - 1]} {year}
            </span>
            <button onClick={() => changeMonth(1)} style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', fontSize: '16px' }}>▶</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: '10px', color: '#8b949e', padding: '2px' }}>{d}</div>
            ))}
            {Array.from({ length: firstDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {daysArray.map(day => {
              const selected = value === `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
              return (
                <div
                  key={day}
                  onClick={() => handleSelect(day)}
                  style={{
                    textAlign: 'center', padding: '5px', borderRadius: '4px',
                    background: selected ? 'rgba(88,166,255,0.2)' : 'transparent',
                    color: '#c9d1d9', cursor: 'pointer', fontSize: '11px',
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Micro Components ───────────────────────────────────────────────────────

function MiniBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  return (
    <div style={{ height: '6px', background: '#21262d', borderRadius: '3px', overflow: 'hidden', flex: 1 }}>
      <div style={{
        height: '100%', width: `${Math.min((value / max) * 100, 100)}%`, borderRadius: '3px',
        background: color, transition: 'width 1.2s ease', boxShadow: `0 0 8px ${color}50`,
      }} />
    </div>
  );
}

function ScoreRing({ value, color, size = 80 }: { value: number; color: string; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#21262d" strokeWidth="6" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1.5s ease' }} />
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fill={color}
        fontSize="14" fontWeight="700" fontFamily="Vazirmatn" style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%' }}>
        {value}
      </text>
    </svg>
  );
}

function MiniSparkline({ data, color, width = 80, height = 30 }: { data: number[]; color: string; width?: number; height?: number }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data, 1); const min = Math.min(...data);
  const range = Math.max(max - min, 1);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  const lastX = width;
  const lastY = height - ((data[data.length - 1] - min) / range) * (height - 4) - 2;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <circle cx={lastX} cy={lastY} r="3" fill={color} />
    </svg>
  );
}

function PieChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <div style={{ color: '#8b949e', fontSize: '13px', textAlign: 'center', padding: '20px' }}>داده‌ای موجود نیست</div>;
  let cum = 0;
  const size = 160; const r = 58; const cx = size / 2; const cy = size / 2;
  const slices = data.map(d => {
    const angle = (d.value / total) * 2 * Math.PI;
    const start = cum; cum += angle;
    const x1 = cx + r * Math.cos(start - Math.PI / 2);
    const y1 = cy + r * Math.sin(start - Math.PI / 2);
    const x2 = cx + r * Math.cos(cum - Math.PI / 2);
    const y2 = cy + r * Math.sin(cum - Math.PI / 2);
    const large = angle > Math.PI ? 1 : 0;
    return { ...d, path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z` };
  });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} stroke="#0d1117" strokeWidth="2" opacity="0.9"><title>{s.label}: {s.value}h</title></path>)}
        <circle cx={cx} cy={cy} r="26" fill="#0d1117" />
        <text x={cx} y={cy + 4} textAnchor="middle" fill="#c9d1d9" fontSize="10" fontFamily="Vazirmatn">{total.toFixed(1)}h</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: d.color, flexShrink: 0 }} />
            <span style={{ color: '#8b949e', minWidth: '90px' }}>{d.label}</span>
            <span style={{ color: '#c9d1d9', fontWeight: 600 }}>{d.value}h</span>
            <span style={{ color: '#8b949e' }}>({Math.round((d.value / total) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart({ data, labels, colors, seriesLabels }: { data: number[][]; labels: string[]; colors: string[]; seriesLabels: string[] }) {
  const maxVal = Math.max(...data.flat(), 1);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '140px', padding: '0 4px' }}>
        {labels.map((label, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '1px' }}>
            {data.map((series, si) => (
              <div key={si} style={{
                width: '100%', height: `${Math.max((series[i] / maxVal) * 110, series[i] > 0 ? 3 : 0)}px`,
                background: colors[si], borderRadius: '2px 2px 0 0', opacity: 0.85,
                transition: 'height 0.8s ease',
              }} title={`${seriesLabels[si]}: ${series[i]}h`} />
            ))}
            <div style={{ fontSize: '9px', color: '#8b949e', marginTop: '4px', whiteSpace: 'nowrap' }}>{label.slice(0, 3)}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
        {seriesLabels.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#8b949e' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: colors[i] }} />{s}
          </div>
        ))}
      </div>
    </div>
  );
}

function RadarChart({ scores }: { scores: { label: string; value: number; color: string }[] }) {
  const size = 200; const cx = size / 2; const cy = size / 2; const r = 75; const n = scores.length;
  const getPoint = (i: number, val: number) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const dist = (val / 100) * r;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  };
  const getAxis = (i: number, scale = 1) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + r * scale * Math.cos(angle), y: cy + r * scale * Math.sin(angle) };
  };
  const pts = scores.map((s, i) => getPoint(i, s.value));
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + 'Z';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[0.25, 0.5, 0.75, 1].map((s, ri) => {
        const gpts = Array.from({ length: n }, (_, i) => getAxis(i, s));
        const gpath = gpts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + 'Z';
        return <path key={ri} d={gpath} fill="none" stroke="#30363d" strokeWidth="1" opacity="0.5" />;
      })}
      {Array.from({ length: n }, (_, i) => {
        const end = getAxis(i);
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#30363d" strokeWidth="1" opacity="0.4" />;
      })}
      <path d={path} fill="rgba(88,166,255,0.12)" stroke="#58a6ff" strokeWidth="2" />
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill={scores[i].color} stroke="#0d1117" strokeWidth="1.5" />)}
      {scores.map((s, i) => {
        const lp = getAxis(i, 1.3);
        return <text key={i} x={lp.x} y={lp.y + 4} textAnchor="middle" fill="#8b949e" fontSize="10" fontFamily="Vazirmatn">{s.label}</text>;
      })}
    </svg>
  );
}

function HeatmapChart({ activities }: { activities: Activity[] }) {
  const weeks = 12;
  const days = 7;
  const today = new Date();
  const cells: { date: string; hours: number }[] = [];
  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < days; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (w * 7 + (days - 1 - d)));
      const gd = date.getDate();
      const gm = date.getMonth() + 1;
      const gy = date.getFullYear();
      const [jy, jm, jd] = toJalali(gy, gm, gd);
      const dateStr = `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
      const dayActs = activities.filter(a => a.date === dateStr);
      const hours = dayActs.reduce((s, a) => s + a.hours, 0);
      cells.push({ date: dateStr, hours });
    }
  }
  const maxH = Math.max(...cells.map(c => c.hours), 1);
  const dayLabels = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  return (
    <div>
      <div style={{ display: 'flex', gap: '3px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '2px' }}>
          {dayLabels.map((d, i) => (
            <div key={i} style={{ height: '12px', fontSize: '9px', color: '#8b949e', lineHeight: '12px', paddingRight: '4px' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '3px' }}>
          {Array.from({ length: weeks }, (_, w) => (
            <div key={w} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {Array.from({ length: days }, (_, d) => {
                const cell = cells[w * days + d];
                const intensity = cell ? cell.hours / maxH : 0;
                const bg = intensity === 0 ? '#21262d' :
                  intensity < 0.25 ? '#0e4429' : intensity < 0.5 ? '#006d32' :
                    intensity < 0.75 ? '#26a641' : '#39d353';
                return (
                  <div key={d} title={`${cell?.date}: ${cell?.hours.toFixed(1)}h`} style={{
                    width: '12px', height: '12px', borderRadius: '2px', background: bg,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }} />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', fontSize: '10px', color: '#8b949e' }}>
        <span>کم</span>
        {['#21262d', '#0e4429', '#006d32', '#26a641', '#39d353'].map((c, i) => (
          <div key={i} style={{ width: '10px', height: '10px', borderRadius: '2px', background: c }} />
        ))}
        <span>زیاد</span>
      </div>
    </div>
  );
}

// ─── Enhanced AI Coach ───────────────────────────────────────────────────────

function AICoach({ context }: { context: AIContext }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string; timestamp: string }[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const history = StorageHelper.getAIHistory();
    if (history.length > 0) {
      setMessages(history.slice(-10)); // آخرین 10 پیام
    } else {
      setMessages([{
        role: 'ai',
        text: `سلام! من دستیار هوش مصنوعی LifeFlow هستم. 🤖\n\nبر اساس تحلیل **${context.activities.length} فعالیت** شما در **${Math.max(new Set(context.activities.map(a => a.date)).size, 1)} روز**، آماده‌ام به سوالاتتان پاسخ دهم.\n\nمی‌توانید از من بپرسید:\n• چرا بهره‌ورم کم است؟\n• ریسک فرسودگی دارم؟\n• چطور خوابم را بهبود دهم؟\n• اهدافم قابل دستیابی است؟\n\nچه چیزی می‌خواهید بدانید؟`,
        timestamp: new Date().toISOString()
      }]);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!question.trim()) return;
    
    const userMsg = { role: 'user' as const, text: question, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setQuestion('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiEngine = new AIEngine(context);
      const response = aiEngine.generateResponse(question);
      const aiMsg = { role: 'ai' as const, text: response, timestamp: new Date().toISOString() };
      
      setMessages(prev => {
        const updated = [...prev, aiMsg];
        StorageHelper.saveAIHistory(updated.slice(-50)); // حفظ 50 پیام آخر
        return updated;
      });
      setIsTyping(false);
    }, 800);
  };

  const quickQuestions = [
    'چرا بهره‌ورم کم است؟',
    'امروز چیکار کنم؟',
    'ریسک فرسودگی دارم؟',
    'خوابم چطور است؟',
    'عادت‌هایم چطور است؟',
    'اهدافم قابل دستیابی است؟',
  ];

  const clearHistory = () => {
    setMessages([{
      role: 'ai',
      text: 'تاریخچه پاک شد. چه سوالی دارید؟',
      timestamp: new Date().toISOString()
    }]);
    StorageHelper.saveAIHistory([]);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: '14px', color: '#8b949e' }}>
          {messages.length} پیام در تاریخچه
        </div>
        <button onClick={clearHistory} style={{
          padding: '4px 12px', borderRadius: '6px', border: '1px solid #30363d',
          background: '#161b22', color: '#8b949e', cursor: 'pointer',
          fontFamily: 'Vazirmatn, sans-serif', fontSize: '11px',
        }}>
          🗑️ پاک کردن تاریخچه
        </button>
      </div>
      
      <div style={{
        height: '420px', overflowY: 'auto', padding: '16px',
        background: '#0d1117', borderRadius: '12px', border: '1px solid #30363d',
        display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px',
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex', gap: '10px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            animation: 'fadeIn 0.3s ease',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
              background: msg.role === 'ai' ? 'linear-gradient(135deg, #58a6ff, #bc8cff)' : '#21262d',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
            }}>
              {msg.role === 'ai' ? '🤖' : '👤'}
            </div>
            <div style={{
              maxWidth: '80%', padding: '12px 16px', borderRadius: '12px', fontSize: '13px',
              background: msg.role === 'ai' ? '#161b22' : 'rgba(88,166,255,0.1)',
              border: `1px solid ${msg.role === 'ai' ? '#30363d' : 'rgba(88,166,255,0.3)'}`,
              color: '#c9d1d9', lineHeight: 1.8, whiteSpace: 'pre-line',
              borderTopRightRadius: msg.role === 'user' ? '4px' : '12px',
              borderTopLeftRadius: msg.role === 'ai' ? '4px' : '12px',
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #58a6ff, #bc8cff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>🤖</div>
            <div style={{ padding: '12px 16px', borderRadius: '12px', background: '#161b22', border: '1px solid #30363d' }}>
              <span style={{ color: '#8b949e', fontSize: '13px' }}>در حال تایپ...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
        {quickQuestions.map((q, i) => (
          <button key={i} onClick={() => setQuestion(q)} style={{
            padding: '5px 12px', borderRadius: '6px', border: '1px solid #30363d',
            background: '#161b22', color: '#8b949e', cursor: 'pointer',
            fontFamily: 'Vazirmatn, sans-serif', fontSize: '11px', transition: 'all 0.2s',
          }}>
            {q}
          </button>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="سوال خود را بپرسید..."
          className="input-field"
          style={{ flex: 1 }}
          disabled={isTyping}
        />
        <button onClick={handleSend} className="btn-primary" style={{ padding: '10px 20px', flexShrink: 0 }} disabled={isTyping}>
          {isTyping ? '⏳' : 'ارسال'}
        </button>
      </div>
    </div>
  );
}

// ─── Future Simulator ────────────────────────────────────────────────────────

function FutureSimulator({ scores }: { scores: ReturnType<typeof analytics.calculateScores> }) {
  const [days, setDays] = useState(30);
  const [behavior, setBehavior] = useState<'current' | 'optimized' | 'worst'>('current');
  const multipliers = { current: 1, optimized: 1.35, worst: 0.65 };
  const projected = Math.min(100, Math.round(scores.overall * multipliers[behavior]));
  const delta = projected - scores.overall;
  
  const scenarios = [
    { key: 'current' as const, label: 'ادامه روند فعلی', icon: '➡️', color: '#8b949e' },
    { key: 'optimized' as const, label: 'سبک زندگی بهینه', icon: '🚀', color: '#3fb950' },
    { key: 'worst' as const, label: 'بدترین سناریو', icon: '📉', color: '#f85149' },
  ];
  
  const milestones = [
    { day: Math.round(days * 0.25), label: 'تطابق اولیه' },
    { day: Math.round(days * 0.5), label: 'عادت‌سازی' },
    { day: Math.round(days * 0.85), label: 'تثبیت' },
    { day: days, label: 'هدف نهایی' },
  ];
  
  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {scenarios.map(s => (
          <button key={s.key} onClick={() => setBehavior(s.key)} style={{
            padding: '8px 16px', borderRadius: '8px', border: `1px solid ${behavior === s.key ? s.color : '#30363d'}`,
            background: behavior === s.key ? `${s.color}15` : 'transparent',
            color: behavior === s.key ? s.color : '#8b949e',
            cursor: 'pointer', fontFamily: 'Vazirmatn, sans-serif', fontSize: '12px',
            display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s',
          }}>
            <span>{s.icon}</span>{s.label}
          </button>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[30, 60, 90].map(d => (
          <button key={d} onClick={() => setDays(d)} style={{
            padding: '6px 14px', borderRadius: '6px', border: `1px solid ${days === d ? '#58a6ff' : '#30363d'}`,
            background: days === d ? 'rgba(88,166,255,0.1)' : 'transparent',
            color: days === d ? '#58a6ff' : '#8b949e',
            cursor: 'pointer', fontFamily: 'Vazirmatn, sans-serif', fontSize: '12px', transition: 'all 0.2s',
          }}>{d} روز</button>
        ))}
      </div>
      
      <div style={{
        background: 'linear-gradient(135deg, rgba(88,166,255,0.06), rgba(188,140,255,0.06))',
        border: '1px solid rgba(88,166,255,0.15)', borderRadius: '12px', padding: '24px',
        display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '20px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>امتیاز فعلی</div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: '#8b949e' }}>{scores.overall}</div>
        </div>
        <div style={{ fontSize: '24px', color: '#30363d' }}>→</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>امتیاز پیش‌بینی‌شده</div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: delta >= 0 ? '#3fb950' : '#f85149' }}>{projected}</div>
        </div>
        <div style={{ flex: 1, minWidth: '160px' }}>
          <div style={{
            fontSize: '14px', fontWeight: 600, marginBottom: '6px',
            color: delta >= 0 ? '#3fb950' : '#f85149',
          }}>
            {delta >= 0 ? `+${delta}` : delta} امتیاز در {days} روز
          </div>
          <div style={{ fontSize: '12px', color: '#8b949e', lineHeight: 1.7 }}>
            {behavior === 'optimized' ? 'با بهینه‌سازی خواب، ورزش و کاهش شبکه اجتماعی' :
              behavior === 'worst' ? 'با ادامه الگوهای مخرب فعلی' : 'با حفظ وضعیت موجود'}
          </div>
        </div>
      </div>
      
      <div style={{ position: 'relative', height: '6px', background: '#21262d', borderRadius: '3px', marginBottom: '12px' }}>
        <div style={{
          height: '100%', borderRadius: '3px', transition: 'width 1s ease',
          width: `${Math.min(projected, 100)}%`,
          background: `linear-gradient(90deg, #58a6ff, ${delta >= 0 ? '#3fb950' : '#f85149'})`,
        }} />
        {milestones.map((m, i) => (
          <div key={i} style={{
            position: 'absolute', top: '-18px', left: `${(m.day / days) * 100}%`,
            transform: 'translateX(-50%)', fontSize: '9px', color: '#8b949e', whiteSpace: 'nowrap',
          }}>
            <div style={{ width: '1px', height: '6px', background: '#30363d', margin: '0 auto' }} />
            {m.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Add/Edit Goal Modal ─────────────────────────────────────────────────────

function GoalModal({ goal, onClose, onSave }: { goal?: Goal; onClose: () => void; onSave: (goal: Goal) => void }) {
  const [title, setTitle] = useState(goal?.title || '');
  const [target, setTarget] = useState(String(goal?.target || '1'));
  const [current, setCurrent] = useState(String(goal?.current || '0'));
  const [unit, setUnit] = useState(goal?.unit || 'ساعت/روز');
  const [deadline, setDeadline] = useState(goal?.deadline || '');
  const [selectedCategory, setSelectedCategory] = useState(goal?.category || categories[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !deadline.trim() || parseFloat(target) <= 0) return;
    const cat = categories.find(c => c.id === selectedCategory) || categories[0];
    const newGoal: Goal = {
      id: goal?.id || generateId(),
      title: title.trim(),
      target: parseFloat(target),
      current: parseFloat(current) || 0,
      unit: unit.trim() || 'واحد',
      deadline: deadline.trim(),
      category: selectedCategory,
      color: cat.color,
      createdAt: goal?.createdAt || new Date().toISOString(),
    };
    onSave(newGoal);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#161b22', borderRadius: '16px', border: '1px solid #30363d', padding: '32px', width: '420px', maxWidth: '90%', animation: 'fadeIn 0.3s ease' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
          {goal ? '✏️ ویرایش هدف' : '🎯 ایجاد هدف جدید'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>عنوان هدف</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="input-field" required placeholder="مثلاً: مطالعه زبان انگلیسی" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>مقدار هدف</label>
              <input type="number" min="0" step="0.1" value={target} onChange={e => setTarget(e.target.value)} className="input-field" required placeholder="مثلاً 2" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>پیشرفت فعلی</label>
              <input type="number" min="0" step="0.1" value={current} onChange={e => setCurrent(e.target.value)} className="input-field" placeholder="مثلاً 0.5" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>واحد اندازه‌گیری</label>
              <input type="text" value={unit} onChange={e => setUnit(e.target.value)} className="input-field" placeholder="ساعت/روز" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>مهلت</label>
              <JalaliDatePicker value={deadline} onChange={setDeadline} />
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>دسته‌بندی مرتبط</label>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="input-field">
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>
              {goal ? 'ذخیره تغییرات' : 'ایجاد هدف'}
            </button>
            <button type="button" onClick={onClose} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #30363d', background: 'transparent', color: '#8b949e', cursor: 'pointer', fontFamily: 'Vazirmatn, sans-serif', fontSize: '13px' }}>انصراف</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Goals Panel with CRUD ───────────────────────────────────────────────────

function GoalsPanel() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  useEffect(() => {
    setGoals(StorageHelper.getGoals());
  }, []);

  const handleSaveGoal = (goal: Goal) => {
    const updatedGoals = editingGoal
      ? goals.map(g => g.id === goal.id ? goal : g)
      : [...goals, goal];
    setGoals(updatedGoals);
    StorageHelper.saveGoals(updatedGoals);
    setEditingGoal(null);
    setShowModal(false);
  };

  const handleDeleteGoal = (id: string) => {
    if (!confirm('آیا مطمئن هستید؟')) return;
    const updatedGoals = goals.filter(g => g.id !== id);
    setGoals(updatedGoals);
    StorageHelper.saveGoals(updatedGoals);
  };

  const getSuccessProb = (goal: Goal): number => {
    const ratio = goal.category === 'social_media'
      ? Math.min(100, Math.round((goal.target / Math.max(goal.current, 0.1)) * 70))
      : Math.min(100, Math.round((goal.current / goal.target) * 100));
    return ratio;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc' }}>
          🎯 اهداف شما ({goals.length})
        </h2>
        <button onClick={() => { setEditingGoal(null); setShowModal(true); }} className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
          ➕ افزودن هدف
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {goals.map(goal => {
          const prob = getSuccessProb(goal);
          const isReverse = goal.category === 'social_media';
          const progress = isReverse
            ? Math.min(100, Math.round((goal.target / Math.max(goal.current, 0.1)) * 100))
            : Math.min(100, Math.round((goal.current / goal.target) * 100));
          const color = prob >= 70 ? '#3fb950' : prob >= 45 ? '#d29922' : '#f85149';
          
          return (
            <div key={goal.id} style={{ padding: '20px', borderRadius: '12px', background: '#161b22', border: '1px solid #30363d', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => { setEditingGoal(goal); setShowModal(true); }}
                  style={{ background: 'rgba(88,166,255,0.1)', border: '1px solid rgba(88,166,255,0.3)', color: '#58a6ff', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontFamily: 'Vazirmatn' }}
                >✏️ ویرایش</button>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  style={{ background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)', color: '#f85149', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontFamily: 'Vazirmatn' }}
                >🗑️ حذف</button>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingRight: '140px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '2px' }}>{goal.title}</div>
                  <div style={{ fontSize: '11px', color: '#8b949e' }}>
                    {isReverse ? `هدف: کمتر از ${goal.target}` : `${goal.current} از ${goal.target}`} {goal.unit} · مهلت: {goal.deadline}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 700, color }}>{prob}%</div>
                  <div style={{ fontSize: '10px', color: '#8b949e' }}>احتمال موفقیت</div>
                </div>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <div style={{ height: '8px', background: '#21262d', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: goal.color, borderRadius: '4px', transition: 'width 1s ease', boxShadow: `0 0 8px ${goal.color}40` }} />
                </div>
              </div>
              
              <div style={{ fontSize: '12px', color }}>
                {prob >= 70 ? '✅ در مسیر درست — ادامه دهید!' : prob >= 45 ? '⚡ نیاز به تلاش بیشتر — یک‌سوم راه مانده' : '⚠️ احتمال شکست بالا — اقدام فوری لازم است'}
              </div>
            </div>
          );
        })}
        
        {goals.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#8b949e', fontSize: '14px', background: '#161b22', borderRadius: '12px', border: '1px dashed #30363d' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎯</div>
            <div style={{ marginBottom: '8px', fontWeight: 600, color: '#c9d1d9' }}>هنوز هدفی تعریف نشده است</div>
            <div style={{ fontSize: '13px', marginBottom: '16px' }}>با تعیین اهداف SMART، پیشرفت خود را پیگیری کنید</div>
            <button onClick={() => setShowModal(true)} className="btn-primary" style={{ padding: '8px 20px' }}>
              شروع کنید
            </button>
          </div>
        )}
      </div>
      
      {showModal && (
        <GoalModal
          goal={editingGoal || undefined}
          onClose={() => { setShowModal(false); setEditingGoal(null); }}
          onSave={handleSaveGoal}
        />
      )}
    </div>
  );
}

// ─── Add/Edit Habit Modal ────────────────────────────────────────────────────

function HabitModal({ habit, onClose, onSave }: { habit?: Habit; onClose: () => void; onSave: (habit: Habit) => void }) {
  const [name, setName] = useState(habit?.name || '');
  const [icon, setIcon] = useState(habit?.icon || '✅');
  const [selectedCategory, setSelectedCategory] = useState(habit?.category || categories[0]?.id || '');
  const [targetDays, setTargetDays] = useState(String(habit?.targetDays || '21'));

  const emojiSuggestions = ['📚', '🏃', '✍️', '🧘', '💤', '🥗', '💧', '🎯', '🧠', '❤️', '🔥', '⚡'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const cat = categories.find(c => c.id === selectedCategory) || categories[0];
    const newHabit: Habit = {
      id: habit?.id || generateId(),
      name: name.trim(),
      icon: icon || '✅',
      color: cat.color,
      category: selectedCategory,
      streak: habit?.streak || 0,
      completedDays: habit?.completedDays || [false, false, false, false, false, false, false],
      targetDays: parseInt(targetDays) || 21,
      createdAt: habit?.createdAt || new Date().toISOString(),
    };
    onSave(newHabit);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#161b22', borderRadius: '16px', border: '1px solid #30363d', padding: '32px', width: '420px', maxWidth: '90%', animation: 'fadeIn 0.3s ease' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>
          {habit ? '✏️ ویرایش عادت' : '🔁 ایجاد عادت جدید'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>نام عادت</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-field" required placeholder="مثلاً: مطالعه ۳۰ دقیقه" />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>آیکون</label>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
              {emojiSuggestions.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    border: `1px solid ${icon === emoji ? '#58a6ff' : '#30363d'}`,
                    background: icon === emoji ? 'rgba(88,166,255,0.1)' : '#0d1117',
                    cursor: 'pointer', fontSize: '18px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <input type="text" value={icon} onChange={e => setIcon(e.target.value)} className="input-field" placeholder="یا یک ایموجی دلخواه وارد کنید" maxLength={2} />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>دسته‌بندی</label>
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="input-field">
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>هدف (روز)</label>
              <input type="number" min="1" value={targetDays} onChange={e => setTargetDays(e.target.value)} className="input-field" required />
            </div>
          </div>
          
          <div style={{ padding: '12px', background: '#0d1117', borderRadius: '8px', marginBottom: '20px', fontSize: '11px', color: '#8b949e', lineHeight: 1.6 }}>
            💡 <strong>نکته:</strong> تحقیقات نشان می‌دهد ۲۱ روز برای شروع، ۶۶ روز برای خودکارسازی و ۹۰ روز برای تثبیت کامل عادت نیاز است.
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>
              {habit ? 'ذخیره تغییرات' : 'ایجاد عادت'}
            </button>
            <button type="button" onClick={onClose} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #30363d', background: 'transparent', color: '#8b949e', cursor: 'pointer', fontFamily: 'Vazirmatn, sans-serif', fontSize: '13px' }}>انصراف</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Habits Panel with CRUD ──────────────────────────────────────────────────

function HabitsPanel() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const dayLabels = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  useEffect(() => {
    setHabits(StorageHelper.getHabits());
  }, []);

  const handleSaveHabit = (habit: Habit) => {
    const updatedHabits = editingHabit
      ? habits.map(h => h.id === habit.id ? habit : h)
      : [...habits, habit];
    setHabits(updatedHabits);
    StorageHelper.saveHabits(updatedHabits);
    setEditingHabit(null);
    setShowModal(false);
  };

  const handleDeleteHabit = (id: string) => {
    if (!confirm('آیا مطمئن هستید؟')) return;
    const updatedHabits = habits.filter(h => h.id !== id);
    setHabits(updatedHabits);
    StorageHelper.saveHabits(updatedHabits);
  };

  const toggleDay = (habitId: string, dayIndex: number) => {
    const updatedHabits = habits.map(h => {
      if (h.id === habitId) {
        const newDays = [...h.completedDays];
        newDays[dayIndex] = !newDays[dayIndex];
        return { ...h, completedDays: newDays, streak: calculateStreak(newDays) };
      }
      return h;
    });
    setHabits(updatedHabits);
    StorageHelper.saveHabits(updatedHabits);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc' }}>
          🔁 عادت‌های شما ({habits.length})
        </h2>
        <button onClick={() => { setEditingHabit(null); setShowModal(true); }} className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
          ➕ افزودن عادت
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {habits.map(habit => (
          <div key={habit.id} style={{ padding: '16px', borderRadius: '12px', background: '#161b22', border: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${habit.color}15`, border: `1px solid ${habit.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{habit.icon}</div>
            
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc', marginBottom: '6px' }}>{habit.name}</div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {habit.completedDays.map((done, di) => (
                  <div
                    key={di}
                    onClick={() => toggleDay(habit.id, di)}
                    style={{
                      width: '26px', height: '26px', borderRadius: '6px', fontSize: '9px',
                      background: done ? `${habit.color}20` : '#21262d',
                      border: `1px solid ${done ? habit.color : '#30363d'}`,
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', gap: '1px', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ color: '#8b949e', fontSize: '8px' }}>{dayLabels[di]}</span>
                    <span style={{ fontSize: '10px' }}>{done ? '✓' : '·'}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ textAlign: 'center', flexShrink: 0, marginRight: '10px' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: habit.color }}>{habit.streak}</div>
              <div style={{ fontSize: '10px', color: '#8b949e' }}>روز متوالی</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginLeft: '8px' }}>
              <button
                onClick={() => { setEditingHabit(habit); setShowModal(true); }}
                style={{
                  background: 'rgba(88,166,255,0.1)', border: '1px solid rgba(88,166,255,0.3)',
                  color: '#58a6ff', padding: '4px 8px', borderRadius: '6px',
                  cursor: 'pointer', fontSize: '10px', fontFamily: 'Vazirmatn',
                }}
              >✏️</button>
              <button
                onClick={() => handleDeleteHabit(habit.id)}
                style={{
                  background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)',
                  color: '#f85149', padding: '4px 8px', borderRadius: '6px',
                  cursor: 'pointer', fontSize: '10px', fontFamily: 'Vazirmatn',
                }}
              >🗑️</button>
            </div>
          </div>
        ))}
        
        {habits.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#8b949e', fontSize: '14px', background: '#161b22', borderRadius: '12px', border: '1px dashed #30363d' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔁</div>
            <div style={{ marginBottom: '8px', fontWeight: 600, color: '#c9d1d9' }}>هنوز عادتی تعریف نشده است</div>
            <div style={{ fontSize: '13px', marginBottom: '16px' }}>با ایجاد عادت‌های مثبت، زندگی خود را متحول کنید</div>
            <button onClick={() => setShowModal(true)} className="btn-primary" style={{ padding: '8px 20px' }}>
              شروع کنید
            </button>
          </div>
        )}
      </div>
      
      {showModal && (
        <HabitModal
          habit={editingHabit || undefined}
          onClose={() => { setShowModal(false); setEditingHabit(null); }}
          onSave={handleSaveHabit}
        />
      )}
    </div>
  );
}

// ─── Life Score Panel ────────────────────────────────────────────────────────

function LifeScorePanel({ scores }: { scores: ReturnType<typeof analytics.calculateScores> }) {
  const dimensions = [
    { label: 'بهره‌وری', value: scores.productivity, color: '#58a6ff', icon: '⚡', desc: 'نسبت کار/مطالعه به کل وقت' },
    { label: 'تمرکز', value: scores.focus, color: '#3fb950', icon: '🎯', desc: 'ساعات کار عمیق روزانه' },
    { label: 'سلامت', value: scores.health, color: '#bc8cff', icon: '❤️', desc: 'خواب + ورزش + تغذیه' },
    { label: 'تعادل', value: scores.balance, color: '#d29922', icon: '⚖️', desc: 'تنوع فعالیت‌های روزانه' },
    { label: 'کنترل اتلاف', value: 100 - scores.timeWaste, color: '#ff7b72', icon: '⏰', desc: 'کنترل حواس‌پرتی‌ها' },
  ];
  
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px', padding: '32px', background: 'linear-gradient(135deg, rgba(88,166,255,0.05), rgba(188,140,255,0.05))', borderRadius: '16px', border: '1px solid rgba(88,166,255,0.1)' }}>
        <div style={{ fontSize: '72px', fontWeight: 900, lineHeight: 1, background: scores.overall >= 75 ? 'linear-gradient(135deg, #3fb950, #58a6ff)' : scores.overall >= 55 ? 'linear-gradient(135deg, #d29922, #ff7b72)' : 'linear-gradient(135deg, #f85149, #d29922)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>{scores.overall}</div>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#f0f6fc', marginBottom: '4px' }}>
          {scores.overall >= 80 ? '🏆 عملکرد استثنایی' : scores.overall >= 65 ? '⚡ عملکرد خوب' : scores.overall >= 50 ? '📈 در حال پیشرفت' : '⚠️ نیاز به تغییر'}
        </div>
        <div style={{ fontSize: '13px', color: '#8b949e' }}>امتیاز جامع زندگی شما از ۱۰۰</div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
        {dimensions.map(d => (
          <div key={d.label} style={{ padding: '16px', borderRadius: '12px', background: '#161b22', border: '1px solid #30363d', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{d.icon}</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: d.color, marginBottom: '4px' }}>{d.value}</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#c9d1d9', marginBottom: '4px' }}>{d.label}</div>
            <div style={{ fontSize: '10px', color: '#8b949e', lineHeight: 1.5 }}>{d.desc}</div>
            <div style={{ marginTop: '10px' }}>
              <div style={{ height: '4px', background: '#21262d', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${d.value}%`, background: d.color, borderRadius: '2px', transition: 'width 1.5s ease' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Digital Twin Panel ─────────────────────────────────────────────────────

function DigitalTwinPanel({ scores, activities }: { scores: ReturnType<typeof analytics.calculateScores>; activities: Activity[] }) {
  const byCat: Record<string, number> = {};
  activities.forEach(a => { byCat[a.category] = (byCat[a.category] || 0) + a.hours; });
  const days = Math.max(new Set(activities.map(a => a.date)).size, 1);
  
  const traits = [
    { label: 'سبک یادگیری', value: byCat['study'] > byCat['work'] ? 'کنجکاو و پژوهشگر' : 'هدف‌محور', icon: '🧠' },
    { label: 'الگوی کاری', value: (byCat['work'] || 0) / days > 8 ? 'کارمحور (ریسک فرسودگی)' : 'متعادل', icon: '💼' },
    { label: 'سبک زندگی', value: (byCat['exercise'] || 0) > 3 ? 'فعال و ورزشکار' : 'کم‌تحرک', icon: '🏃' },
    { label: 'مدیریت توجه', value: (byCat['social_media'] || 0) / days < 1.5 ? 'متمرکز' : 'حواس‌پرت', icon: '🎯' },
  ];
  
  const radarData = [
    { label: 'بهره‌وری', value: scores.productivity, color: '#58a6ff' },
    { label: 'تمرکز', value: scores.focus, color: '#3fb950' },
    { label: 'سلامت', value: scores.health, color: '#bc8cff' },
    { label: 'تعادل', value: scores.balance, color: '#d29922' },
    { label: 'کارایی', value: 100 - scores.timeWaste, color: '#ff7b72' },
  ];
  
  return (
    <div>
      <div style={{ padding: '20px', borderRadius: '12px', marginBottom: '20px', background: 'linear-gradient(135deg, rgba(88,166,255,0.06), rgba(188,140,255,0.06))', border: '1px solid rgba(88,166,255,0.15)', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #58a6ff, #bc8cff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🤖</div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc', marginBottom: '4px' }}>دوقلوی دیجیتال شما</div>
          <div style={{ fontSize: '13px', color: '#8b949e' }}>مدل AI بر اساس {activities.length} فعالیت ثبت‌شده ساخته شده</div>
        </div>
        <span className="badge badge-blue" style={{ marginRight: 'auto' }}>پیش‌بینی ۸۷٪ دقت</span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px', alignItems: 'start', flexWrap: 'wrap' }}>
        <div><RadarChart scores={radarData} /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {traits.map((t, i) => (
            <div key={i} style={{ padding: '14px 16px', borderRadius: '10px', background: '#161b22', border: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '2px' }}>{t.label}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc' }}>{t.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Edit Activity Modal ────────────────────────────────────────────────────

function EditActivityModal({ activity, onClose, onSave }: { activity: Activity; onClose: () => void; onSave: (updated: Activity) => void }) {
  const [category, setCategory] = useState(activity.category);
  const [hours, setHours] = useState(String(activity.hours));
  const [date, setDate] = useState(activity.date);
  const [note, setNote] = useState(activity.note || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find(c => c.id === category) || categories[0];
    const updated: Activity = {
      ...activity,
      category,
      label: cat.label,
      hours: parseFloat(hours) || 0,
      date,
      icon: cat.icon,
      color: cat.color,
      note,
    };
    onSave(updated);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#161b22', borderRadius: '16px', border: '1px solid #30363d', padding: '32px', width: '420px', maxWidth: '90%', animation: 'fadeIn 0.3s ease' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '20px' }}>✏️ ویرایش فعالیت</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>دسته‌بندی</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="input-field">
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>مدت (ساعت)</label>
              <input type="number" min="0.25" max="24" step="0.25" value={hours} onChange={e => setHours(e.target.value)} className="input-field" required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>تاریخ</label>
              <JalaliDatePicker value={date} onChange={setDate} />
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#c9d1d9', marginBottom: '6px' }}>یادداشت</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} className="input-field" rows={3} style={{ resize: 'vertical', fontFamily: 'Vazirmatn, sans-serif' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>ذخیره</button>
            <button type="button" onClick={onClose} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #30363d', background: 'transparent', color: '#8b949e', cursor: 'pointer', fontFamily: 'Vazirmatn, sans-serif', fontSize: '13px' }}>انصراف</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function PersonalDemoPage({ onNavigate }: Props) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'lifescore' | 'goals' | 'habits' | 'aicoach' | 'simulator' | 'twin' | 'add' | 'history' | 'export'
  >('dashboard');
  
  const [form, setForm] = useState({ category: 'work', hours: '1', date: getCurrentDate(), note: '' });
  const [addedMsg, setAddedMsg] = useState('');
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [quickCat, setQuickCat] = useState('work');
  const [quickHours, setQuickHours] = useState('1');

  useEffect(() => {
    setActivities(storage.getActivities());
    setGoals(StorageHelper.getGoals());
    setHabits(StorageHelper.getHabits());
  }, []);

  const scores = analytics.calculateScores(activities);
  const insights = analytics.generateInsights(activities);
  const catSummary = analytics.getCategorySummary(activities);
  const weekData = analytics.getWeeklyData(activities);

  // همگام‌سازی اهداف و عادت‌ها بعد از ثبت فعالیت
  const syncProgress = (activity: Activity) => {
    // بروزرسانی اهداف
    const updatedGoals = goals.map(goal => {
      if (goal.category === activity.category) {
        return { ...goal, current: Math.round((goal.current + activity.hours) * 10) / 10 };
      }
      return goal;
    });
    setGoals(updatedGoals);
    StorageHelper.saveGoals(updatedGoals);
    
    // بروزرسانی عادت‌ها
    const todayIdx = getPersianDayIndex(activity.date);
    const updatedHabits = habits.map(habit => {
      if (habit.category === activity.category) {
        const newDays = [...habit.completedDays];
        newDays[todayIdx] = true;
        return { ...habit, completedDays: newDays, streak: calculateStreak(newDays) };
      }
      return habit;
    });
    setHabits(updatedHabits);
    StorageHelper.saveHabits(updatedHabits);
  };

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
    syncProgress(activity);
    setAddedMsg('✅ فعالیت با موفقیت اضافه شد!');
    setTimeout(() => setAddedMsg(''), 3000);
    setForm({ category: 'work', hours: '1', date: getCurrentDate(), note: '' });
  };

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find(c => c.id === quickCat)!;
    const today = getCurrentDate();
    const activity: Activity = {
      id: generateId(),
      category: quickCat,
      label: cat.label,
      hours: parseFloat(quickHours),
      date: today,
      icon: cat.icon,
      color: cat.color,
      note: '',
    };
    storage.saveActivity(activity);
    setActivities(storage.getActivities());
    syncProgress(activity);
    setAddedMsg('✅ ثبت شد');
    setTimeout(() => setAddedMsg(''), 2000);
    setQuickHours('1');
  };

  const handleDelete = (id: string) => {
    storage.deleteActivity(id);
    setActivities(storage.getActivities());
  };

  const handleUpdateActivity = (updated: Activity) => {
    const newActivities = activities.map(a => a.id === updated.id ? updated : a);
    localStorage.setItem('lifeflow_activities', JSON.stringify(newActivities));
    setActivities(newActivities);
    setEditingActivity(null);
  };

  const handleExportJSON = () => {
    const exportData = { activities, goals, habits, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `lifeflow-${getCurrentDate().replace(/\//g, '-')}.json`;
    a.click();
  };

  const handleExportCSV = () => {
    const rows = activities.map(a => `${a.id},${a.category},${a.label},${a.hours},${a.date},${(a.note || '').replace(/,/g, ';')}`);
    const csv = '\uFEFF' + ['شناسه,دسته‌بندی,برچسب,ساعت,تاریخ,یادداشت', ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `lifeflow-activities-${getCurrentDate().replace(/\//g, '-')}.csv`;
    a.click();
  };

  const aiContext: AIContext = {
    activities,
    scores,
    goals,
    habits,
    categorySummary: catSummary,
  };

  const tabs = [
    { id: 'dashboard', label: 'داشبورد', icon: '📊' },
    { id: 'lifescore', label: 'Life Score', icon: '🏆' },
    { id: 'goals', label: 'اهداف', icon: '🎯' },
    { id: 'habits', label: 'عادت‌ها', icon: '🔁' },
    { id: 'aicoach', label: 'AI Coach', icon: '🤖' },
    { id: 'simulator', label: 'شبیه‌ساز', icon: '🔮' },
    { id: 'twin', label: 'دوقلوی دیجیتال', icon: '🧬' },
    { id: 'add', label: 'افزودن', icon: '➕' },
    { id: 'history', label: 'تاریخچه', icon: '📋' },
    { id: 'export', label: 'خروجی', icon: '💾' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/lifeflowlogo.png" alt="LifeFlow" style={{ height: '44px', borderRadius: '10px' }} />
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f0f6fc', margin: 0 }}>داشبورد شخصی</h1>
              <p style={{ fontSize: '13px', color: '#8b949e', margin: 0 }}>هوش مصنوعی زندگی شما · {getCurrentDate()}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="badge badge-green">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3fb950', display: 'inline-block' }} />
              آنلاین
            </span>
            <span className="badge badge-blue">Life Score: {scores.overall}</span>
            <span style={{ fontSize: '12px', color: '#8b949e' }}>📅 {getCurrentDate()}</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: '#161b22', borderRadius: '12px', border: '1px solid #30363d', padding: '6px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                padding: '7px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: activeTab === tab.id ? '#0d1117' : 'transparent',
                color: activeTab === tab.id ? '#58a6ff' : '#8b949e',
                fontFamily: 'Vazirmatn, sans-serif', fontSize: '12px', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: '5px', transition: 'all 0.2s',
                boxShadow: activeTab === tab.id ? '0 0 10px rgba(88,166,255,0.1)' : 'none',
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            {/* Quick Add */}
            <form onSubmit={handleQuickAdd} style={{
              background: '#161b22', borderRadius: '12px', border: '1px solid #30363d',
              padding: '16px 20px', marginBottom: '24px',
              display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: '18px' }}>⚡</span>
              <span style={{ fontSize: '13px', color: '#f0f6fc', fontWeight: 600, marginRight: '8px' }}>ثبت سریع فعالیت</span>
              <select value={quickCat} onChange={e => setQuickCat(e.target.value)} className="input-field" style={{ width: 'auto', minWidth: '140px' }}>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>)}
              </select>
              <input
                type="number"
                min="0.25"
                max="24"
                step="0.25"
                value={quickHours}
                onChange={e => setQuickHours(e.target.value)}
                className="input-field"
                style={{ width: '80px' }}
                required
              />
              <button type="submit" className="btn-primary" style={{ padding: '8px 18px', fontSize: '12px' }}>
                ثبت
              </button>
              {addedMsg && <span style={{ color: '#3fb950', fontSize: '12px' }}>{addedMsg}</span>}
            </form>

            {/* Hero Score */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(88,166,255,0.08), rgba(188,140,255,0.08))',
              border: '1px solid rgba(88,166,255,0.2)', borderRadius: '16px', padding: '28px',
              marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap',
            }}>
              <ScoreRing
                value={scores.overall}
                color={scores.overall >= 75 ? '#3fb950' : scores.overall >= 55 ? '#d29922' : '#f85149'}
                size={90}
              />
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '6px' }}>
                  {scores.overall >= 80 ? '🏆 عالی! شما در مسیر درست هستید' :
                    scores.overall >= 60 ? '⚡ خوب، اما جای بهبود وجود دارد' :
                    '⚠️ نیاز به تنظیم مجدد دارید'}
                </h2>
                <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.7 }}>
                  بر اساس تحلیل {activities.length} فعالیت در {new Set(activities.map(a => a.date)).size} روز فعال
                </p>
                <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {[
                    { label: 'بهره‌وری', v: scores.productivity, c: '#58a6ff' },
                    { label: 'تمرکز', v: scores.focus, c: '#3fb950' },
                    { label: 'سلامت', v: scores.health, c: '#bc8cff' },
                  ].map(s => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '11px', color: '#8b949e' }}>{s.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: s.c }}>{s.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                background: '#0d1117', borderRadius: '12px', padding: '16px',
                border: '1px solid #30363d', maxWidth: '280px', minWidth: '220px',
              }}>
                <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🤖</span> AI توصیه می‌کند
                </div>
                <div style={{ fontSize: '12px', color: '#c9d1d9', lineHeight: 1.7 }}>
                  {insights[0]?.body.slice(0, 100)}...
                </div>
                <button
                  onClick={() => setActiveTab('aicoach')}
                  style={{
                    marginTop: '10px', fontSize: '11px', color: '#58a6ff',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Vazirmatn, sans-serif', padding: 0,
                  }}
                >
                  مشاهده همه توصیه‌ها ←
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              {[
                { icon: '⚡', label: 'بهره‌وری', value: scores.productivity, color: '#58a6ff', type: 'blue' },
                { icon: '🎯', label: 'تمرکز', value: scores.focus, color: '#3fb950', type: 'green' },
                { icon: '❤️', label: 'سلامت', value: scores.health, color: '#bc8cff', type: 'purple' },
                { icon: '⚖️', label: 'تعادل', value: scores.balance, color: '#d29922', type: 'warning' },
                { icon: '⏰', label: 'کنترل اتلاف', value: 100 - scores.timeWaste, color: '#ff7b72', type: 'warning' },
              ].map((sc, i) => (
                <div key={i} className={`metric-card ${sc.type}`} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', marginBottom: '8px' }}>{sc.icon}</div>
                  <div style={{ fontSize: '30px', fontWeight: 800, color: sc.color, marginBottom: '4px' }}>{sc.value}</div>
                  <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '10px' }}>{sc.label}</div>
                  <MiniBar value={sc.value} color={sc.color} />
                  <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '6px' }}>
                    {sc.value >= 75 ? '✅ عالی' : sc.value >= 50 ? '⚡ متوسط' : '⚠️ ضعیف'}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div className="card">
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '20px' }}>🍕 توزیع زمان</h3>
                <PieChart data={catSummary.slice(0, 6).map(c => ({ label: c.label, value: c.totalHours, color: c.color }))} />
              </div>
              <div className="card">
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '20px' }}>📊 نمودار هفتگی</h3>
                <BarChart
                  data={[weekData.work, weekData.study, weekData.social, weekData.sleep]}
                  labels={weekData.labels}
                  colors={['#58a6ff', '#3fb950', '#f85149', '#bc8cff']}
                  seriesLabels={['کار', 'مطالعه', 'شبکه', 'خواب']}
                />
              </div>
            </div>

            <div className="card" style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '16px' }}>📅 نقشه حرارتی فعالیت‌ها</h3>
              <HeatmapChart activities={activities} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
              <div className="card">
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '16px' }}>📋 تفکیک دسته‌بندی‌ها</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {catSummary.map(cat => (
                    <div key={cat.category} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '16px', width: '24px', textAlign: 'center' }}>{cat.icon}</span>
                      <div style={{ minWidth: '100px', fontSize: '12px', color: '#c9d1d9' }}>{cat.label}</div>
                      <div style={{ flex: 1 }}><MiniBar value={cat.percentage} color={cat.color} /></div>
                      <div style={{ fontSize: '11px', color: '#8b949e', minWidth: '70px', textAlign: 'left' }}>
                        {cat.totalHours}h ({cat.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card">
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '16px' }}>🔍 تحلیل سریع AI</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {insights.slice(0, 3).map((ins, i) => {
                    const colors = { warning: '#d29922', success: '#3fb950', info: '#58a6ff', danger: '#f85149' };
                    const c = colors[ins.type];
                    return (
                      <div key={i} style={{
                        padding: '12px', borderRadius: '10px',
                        background: `${c}08`, border: `1px solid ${c}25`,
                        borderRight: `3px solid ${c}`,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span>{ins.icon}</span>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#f0f6fc' }}>{ins.title}</span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#8b949e', lineHeight: 1.6 }}>
                          {ins.body.slice(0, 80)}...
                        </p>
                      </div>
                    );
                  })}
                  <button
                    onClick={() => setActiveTab('aicoach')}
                    style={{
                      padding: '8px', borderRadius: '8px', border: '1px dashed #30363d',
                      background: 'transparent', color: '#58a6ff', cursor: 'pointer',
                      fontFamily: 'Vazirmatn, sans-serif', fontSize: '12px', marginTop: '4px',
                    }}
                  >
                    مشاهده همه + AI Coach →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {activeTab === 'lifescore' && <LifeScorePanel scores={scores} />}
        {activeTab === 'goals' && <GoalsPanel />}
        {activeTab === 'habits' && <HabitsPanel />}
        {activeTab === 'aicoach' && <AICoach context={aiContext} />}
        {activeTab === 'simulator' && <FutureSimulator scores={scores} />}
        {activeTab === 'twin' && <DigitalTwinPanel scores={scores} activities={activities} />}

        {activeTab === 'add' && (
          <div style={{ maxWidth: '600px', animation: 'fadeIn 0.4s ease' }}>
            <div className="card" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>➕ افزودن فعالیت</h2>
              {addedMsg && (
                <div style={{
                  padding: '12px 16px', borderRadius: '8px', marginBottom: '20px',
                  background: 'rgba(63,185,80,0.1)', border: '1px solid rgba(63,185,80,0.3)',
                  color: '#3fb950', fontSize: '13px',
                }}>
                  {addedMsg}
                </div>
              )}
              <form onSubmit={handleAdd}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#c9d1d9', marginBottom: '8px' }}>
                    دسته‌بندی
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px' }}>
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
                        <span>{cat.icon}</span>
                        {cat.label}
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
                      min="0.25"
                      max="24"
                      step="0.25"
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
                    <JalaliDatePicker value={form.date} onChange={date => setForm(f => ({ ...f, date }))} />
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
                    placeholder="توضیح مختصری..."
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

        {activeTab === 'history' && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc' }}>
                📋 تاریخچه ({activities.length} مورد)
              </h2>
              <button
                onClick={() => {
                  if (confirm('آیا مطمئن هستید؟')) {
                    localStorage.removeItem('lifeflow_activities');
                    setActivities([]);
                  }
                }}
                className="btn-danger"
                style={{ fontSize: '12px' }}
              >
                🔄 بازنشانی
              </button>
            </div>
            
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>فعالیت</th>
                      <th>دسته</th>
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
                            <span style={{ fontSize: '16px' }}>{act.icon}</span>
                            <span style={{ fontSize: '12px', color: '#c9d1d9' }}>{act.label}</span>
                          </div>
                        </td>
                        <td>
                          <span style={{
                            background: `${act.color}15`, color: act.color,
                            border: `1px solid ${act.color}30`, padding: '2px 8px',
                            borderRadius: '4px', fontSize: '11px',
                          }}>
                            {act.category}
                          </span>
                        </td>
                        <td style={{ color: '#58a6ff', fontWeight: 600 }}>{act.hours}h</td>
                        <td style={{ color: '#8b949e', fontSize: '12px' }}>{act.date}</td>
                        <td style={{ color: '#8b949e', fontSize: '11px', maxWidth: '140px' }}>{act.note || '-'}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button
                              onClick={() => setEditingActivity(act)}
                              style={{
                                background: 'rgba(88,166,255,0.1)', border: '1px solid rgba(88,166,255,0.3)',
                                color: '#58a6ff', padding: '3px 8px', borderRadius: '5px',
                                cursor: 'pointer', fontSize: '11px', fontFamily: 'Vazirmatn',
                              }}
                            >
                              ویرایش
                            </button>
                            <button
                              onClick={() => handleDelete(act.id)}
                              style={{
                                background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)',
                                color: '#f85149', padding: '3px 8px', borderRadius: '5px',
                                cursor: 'pointer', fontSize: '11px', fontFamily: 'Vazirmatn',
                              }}
                            >
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {activities.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#8b949e' }}>
                    فعالیتی ثبت نشده
                  </div>
                )}
              </div>
            </div>
            
            {editingActivity && (
              <EditActivityModal
                activity={editingActivity}
                onClose={() => setEditingActivity(null)}
                onSave={handleUpdateActivity}
              />
            )}
          </div>
        )}

        {activeTab === 'export' && (
          <div style={{ maxWidth: '600px', animation: 'fadeIn 0.4s ease' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '24px' }}>💾 خروجی گزارش</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                {
                  icon: '📄',
                  title: 'JSON (کامل)',
                  desc: 'فعالیت‌ها + اهداف + عادت‌ها',
                  action: handleExportJSON,
                  label: 'دانلود JSON',
                  color: '#58a6ff',
                },
                {
                  icon: '📊',
                  title: 'CSV (فعالیت‌ها)',
                  desc: 'برای اکسل و Google Sheets',
                  action: handleExportCSV,
                  label: 'دانلود CSV',
                  color: '#3fb950',
                },
                {
                  icon: '🖨️',
                  title: 'چاپ',
                  desc: 'گزارش کامل صفحه',
                  action: () => window.print(),
                  label: 'چاپ',
                  color: '#bc8cff',
                },
              ].map((item, i) => (
                <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                    background: `${item.color}15`, border: `1px solid ${item.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', marginBottom: '2px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#8b949e' }}>{item.desc}</div>
                  </div>
                  <button
                    onClick={item.action}
                    style={{
                      padding: '8px 16px', borderRadius: '8px',
                      background: `${item.color}15`, border: `1px solid ${item.color}30`,
                      color: item.color, cursor: 'pointer', fontSize: '12px',
                      fontFamily: 'Vazirmatn, sans-serif', fontWeight: 600, whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </button>
                </div>
              ))}
            </div>
            
            <div style={{
              padding: '20px', borderRadius: '12px',
              background: 'rgba(88,166,255,0.06)', border: '1px solid rgba(88,166,255,0.15)',
            }}>
              <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc', marginBottom: '12px' }}>
                📈 خلاصه آماری
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { label: 'کل فعالیت‌ها', value: activities.length },
                  { label: 'روزهای فعال', value: new Set(activities.map(a => a.date)).size },
                  { label: 'کل ساعات', value: `${activities.reduce((s, a) => s + a.hours, 0).toFixed(1)}h` },
                  { label: 'Life Score', value: `${scores.overall}/100` },
                  { label: 'اهداف فعال', value: goals.length },
                  { label: 'عادت‌های ثبت‌شده', value: habits.length },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '12px', background: '#0d1117', borderRadius: '8px' }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#58a6ff' }}>{s.value}</div>
                    <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '2px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== Footer and Project Explorer ===== */}
      <ProjectExplorer onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}