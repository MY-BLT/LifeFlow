// src/utils/ai-agent.ts
import { Activity } from './storage';
import { analytics } from './analytics';

export interface Goal {
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

export interface Habit {
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

export interface AIContext {
  activities: Activity[];
  scores: ReturnType<typeof analytics.calculateScores>;
  goals: Goal[];
  habits: Habit[];
  categorySummary: any[];
}

export class AIEngine {
  private context: AIContext;

  constructor(context: AIContext) {
    this.context = context;
  }

  private analyzePattern(question: string): string {
    const patterns: Record<string, RegExp> = {
      productivity: /بهره\s*ور|کار.*بیشتر|کارایی|تمرکز/i,
      burnout: /فرسودگ|خست|استرس|خالی/i,
      sleep: /خواب|بیدار/i,
      social: /شبکه.*اجتماع|اینستا|تلگرام|وقت.*تلف/i,
      goals: /هدف|پیشرفت/i,
      habits: /عادت|روتین/i,
      overall: /وضعیت.*کلی|چطورم/i
    };

    for (const [key, regex] of Object.entries(patterns)) {
      if (regex.test(question)) return key;
    }
    return 'general';
  }

  public generateResponse(question: string): string {
    const pattern = this.analyzePattern(question);
    const { scores, activities, goals } = this.context;
    const workHours = activities.filter(a => a.category === 'work').reduce((s, a) => s + a.hours, 0);
    const avgWork = (workHours / Math.max(new Set(activities.map(a => a.date)).size, 1)).toFixed(1);

    switch (pattern) {
      case 'productivity':
        return `📊 تحلیل بهره‌وری:\nامتیاز شما ${scores.productivity}/100 است. شما روزانه میانگین ${avgWork} ساعت کار مفید دارید. برای افزایش آن، پیشنهاد می‌کنم بلوک‌های تمرکز ۹۰ دقیقه‌ای ایجاد کنید.`;
      
      case 'burnout':
        const risk = parseFloat(avgWork) > 9 ? 'بالا' : 'متوسط';
        return `⚠️ هشدار فرسودگی:\nبا توجه به میانگین ${avgWork} ساعت کار، سطح ریسک شما "${risk}" است. حتماً فعالیت‌های تفریحی را ۲۰٪ افزایش دهید.`;

      case 'social':
        const socialHrs = activities.filter(a => a.category === 'social_media').reduce((s, a) => s + a.hours, 0);
        return `📱 مدیریت توجه:\nشما در بازه اخیر ${socialHrs} ساعت در شبکه‌های اجتماعی بوده‌اید. این یعنی ${Math.round(socialHrs * 1.5)} امتیاز پتانسیل تمرکز از دست رفته است.`;

      case 'goals':
        const reaching = goals.filter(g => (g.current / g.target) > 0.7).length;
        return `🎯 وضعیت اهداف:\nاز ${goals.length} هدف فعال، ${reaching} مورد در آستانه دستیابی هستند. روی اهداف با پیشرفت پایین تمرکز کنید.`;

      default:
        return `🤖 سلام! من LifeFlow AI هستم. بر اساس تحلیل ${activities.length} فعالیت شما، امتیاز جامع زندگی شما ${scores.overall} است. ${scores.overall > 70 ? 'شما عملکرد عالی دارید!' : 'پتانسیل زیادی برای رشد وجود دارد.'} چه سوالی دارید؟`;
    }
  }
}