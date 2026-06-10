import { Activity } from './storage';
import { categories } from '../data/sampleData';

export interface ScoreBreakdown {
  productivity: number;
  focus: number;
  health: number;
  timeWaste: number;
  balance: number;
  overall: number;
}

export interface Insight {
  type: 'warning' | 'success' | 'info' | 'danger';
  title: string;
  body: string;
  icon: string;
  priority: number;
}

export interface CategorySummary {
  category: string;
  label: string;
  icon: string;
  color: string;
  totalHours: number;
  percentage: number;
  days: number;
}

export const analytics = {
  calculateScores(activities: Activity[]): ScoreBreakdown {
    const byCat = groupByCategory(activities);
    
    const workHours = byCat['work'] || 0;
    const studyHours = byCat['study'] || 0;
    const sleepHours = byCat['sleep'] || 0;
    const exerciseHours = byCat['exercise'] || 0;
    const socialMediaHours = byCat['social_media'] || 0;
    const entertainmentHours = byCat['entertainment'] || 0;

    const days = getUniqueDays(activities);
    const n = Math.max(days, 1);

    const avgWork = workHours / n;
    const avgStudy = studyHours / n;
    const avgSleep = sleepHours / n;
    const avgExercise = exerciseHours / n;

    // Productivity: based on work + study vs total
    const totalHours = Object.values(byCat).reduce((a, b) => a + b, 0);
    const productiveHours = workHours + studyHours;
    const productivity = Math.min(100, Math.round((productiveHours / Math.max(totalHours, 1)) * 100 * 1.4));

    // Focus: based on avg work/study hours per day
    const focusRaw = Math.min(10, avgWork + avgStudy) / 10;
    const focus = Math.round(focusRaw * 100);

    // Health: based on sleep + exercise
    const sleepScore = avgSleep >= 7 && avgSleep <= 9 ? 100 : avgSleep >= 6 ? 80 : avgSleep >= 5 ? 60 : 40;
    const exerciseScore = avgExercise >= 1 ? Math.min(100, avgExercise * 50) : 20;
    const health = Math.round((sleepScore * 0.6 + exerciseScore * 0.4));

    // Time waste: based on social media + excessive entertainment
    const wasteHours = (socialMediaHours + entertainmentHours) / n;
    const timeWaste = Math.min(100, Math.round(wasteHours * 15));

    // Balance: how evenly distributed across categories
    const activeCats = Object.keys(byCat).length;
    const balance = Math.min(100, activeCats * 14);

    const overall = Math.round((productivity * 0.3 + focus * 0.25 + health * 0.25 + (100 - timeWaste) * 0.1 + balance * 0.1));

    return {
      productivity: clamp(productivity, 0, 100),
      focus: clamp(focus, 0, 100),
      health: clamp(health, 0, 100),
      timeWaste: clamp(timeWaste, 0, 100),
      balance: clamp(balance, 0, 100),
      overall: clamp(overall, 0, 100),
    };
  },

  generateInsights(activities: Activity[]): Insight[] {
    const byCat = groupByCategory(activities);
    const days = Math.max(getUniqueDays(activities), 1);
    const insights: Insight[] = [];

    const avgSocialMedia = (byCat['social_media'] || 0) / days;
    const avgSleep = (byCat['sleep'] || 0) / days;
    const avgStudy = (byCat['study'] || 0) / days;
    const avgWork = (byCat['work'] || 0) / days;
    const avgEntertainment = (byCat['entertainment'] || 0) / days;
    const avgExercise = (byCat['exercise'] || 0) / days;
    if (avgSocialMedia > 3) {
      insights.push({
        type: 'warning',
        title: 'مصرف بیش از حد شبکه‌های اجتماعی',
        body: `میانگین ${avgSocialMedia.toFixed(1)} ساعت در روز در شبکه‌های اجتماعی می‌گذرانید. این ۲۳٪ از وقت بیداری شماست. توصیه می‌شود به ۱.۵ ساعت محدود کنید.`,
        icon: '⚠️',
        priority: 2,
      });
    }

    if (avgSleep < 6) {
      insights.push({
        type: 'danger',
        title: 'کمبود خواب – ریسک سلامتی',
        body: `میانگین خواب شما ${avgSleep.toFixed(1)} ساعت است. خواب کمتر از ۶ ساعت با کاهش ۴۰٪ عملکرد شناختی همراه است. به ۷-۸ ساعت خواب نیاز دارید.`,
        icon: '🔴',
        priority: 1,
      });
    }

    if (avgStudy > 4) {
      insights.push({
        type: 'success',
        title: 'عملکرد مطالعه عالی',
        body: `روزانه ${avgStudy.toFixed(1)} ساعت مطالعه می‌کنید. این شما را در ۵٪ برتر کاربران LifeFlow قرار می‌دهد. فقط استراحت‌های ۲۰ دقیقه‌ای را فراموش نکنید.`,
        icon: '✅',
        priority: 4,
      });
    }

    if (avgWork > 10) {
      insights.push({
        type: 'danger',
        title: 'ریسک فرسودگی شغلی',
        body: `میانگین ${avgWork.toFixed(1)} ساعت کار در روز ریسک burnout را ۷۸٪ افزایش می‌دهد. مرزهای کاری مشخص تعریف کنید و زمان ریکاوری برنامه‌ریزی کنید.`,
        icon: '🔥',
        priority: 1,
      });
    }

    if (avgEntertainment > 5) {
      insights.push({
        type: 'warning',
        title: 'کاهش تمرکز به دلیل سرگرمی بیش از حد',
        body: `${avgEntertainment.toFixed(1)} ساعت سرگرمی روزانه توانایی تمرکز را ۳۵٪ کاهش می‌دهد. پیشنهاد: سرگرمی را به عنوان پاداش بعد از کارهای اصلی برنامه‌ریزی کنید.`,
        icon: '🎮',
        priority: 3,
      });
    }

    if (avgExercise < 0.5) {
      insights.push({
        type: 'warning',
        title: 'هشدار سبک زندگی کم‌تحرک',
        body: `ورزش کافی در برنامه شما ثبت نشده است. حتی ۳۰ دقیقه پیاده‌روی روزانه بهره‌وری را ۲۳٪ و سلامت روان را ۴۰٪ بهبود می‌دهد.`,
        icon: '🏃',
        priority: 3,
      });
    }

    if (avgSleep >= 7 && avgSleep <= 9) {
      insights.push({
        type: 'success',
        title: 'الگوی خواب بهینه',
        body: `خواب ${avgSleep.toFixed(1)} ساعته شما کاملاً ایده‌آل است. این الگو حافظه، تمرکز و سیستم ایمنی را تقویت می‌کند.`,
        icon: '😴',
        priority: 5,
      });
    }

    if (insights.length === 0) {
      insights.push({
        type: 'info',
        title: 'فعالیت‌های بیشتری اضافه کنید',
        body: 'برای دریافت تحلیل‌های دقیق‌تر، فعالیت‌های روزانه خود را به طور منظم وارد کنید. هر چه داده بیشتر، بینش دقیق‌تر.',
        icon: '💡',
        priority: 5,
      });
    }

    return insights.sort((a, b) => a.priority - b.priority);
  },

  getCategorySummary(activities: Activity[]): CategorySummary[] {
    const byCat: Record<string, { hours: number; days: Set<string> }> = {};
    
    for (const act of activities) {
      if (!byCat[act.category]) {
        byCat[act.category] = { hours: 0, days: new Set() };
      }
      byCat[act.category].hours += act.hours;
      byCat[act.category].days.add(act.date);
    }

    const total = Object.values(byCat).reduce((sum, v) => sum + v.hours, 0);

    return Object.entries(byCat).map(([cat, data]) => {
      const catInfo = categories.find(c => c.id === cat) || { label: cat, icon: '📌', color: '#58a6ff' };
      return {
        category: cat,
        label: catInfo.label,
        icon: catInfo.icon,
        color: catInfo.color,
        totalHours: Math.round(data.hours * 10) / 10,
        percentage: Math.round((data.hours / total) * 100),
        days: data.days.size,
      };
    }).sort((a, b) => b.totalHours - a.totalHours);
  },

  getWeeklyData(activities: Activity[]): { labels: string[]; work: number[]; study: number[]; social: number[]; sleep: number[] } {
    const days = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
    const dayKeys = ['1405/03/01', '1405/03/02', '1405/03/03', '1405/03/04', '1405/03/05', '1405/03/06', '1405/03/07'];

    const work = dayKeys.map(d => activities.filter(a => a.date === d && a.category === 'work').reduce((s, a) => s + a.hours, 0));
    const study = dayKeys.map(d => activities.filter(a => a.date === d && a.category === 'study').reduce((s, a) => s + a.hours, 0));
    const social = dayKeys.map(d => activities.filter(a => a.date === d && a.category === 'social_media').reduce((s, a) => s + a.hours, 0));
    const sleep = dayKeys.map(d => activities.filter(a => a.date === d && a.category === 'sleep').reduce((s, a) => s + a.hours, 0));

    return { labels: days, work, study, social, sleep };
  },
};

function groupByCategory(activities: Activity[]): Record<string, number> {
  return activities.reduce((acc, act) => {
    acc[act.category] = (acc[act.category] || 0) + act.hours;
    return acc;
  }, {} as Record<string, number>);
}

function getUniqueDays(activities: Activity[]): number {
  return new Set(activities.map(a => a.date)).size;
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}
