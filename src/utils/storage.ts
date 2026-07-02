import { sampleActivities } from '../data/sampleData';

export interface Activity {
  id: string;
  category: string;
  label: string;
  hours: number;
  date: string;
  icon: string;
  color: string;
  note?: string;
}

export interface User {
  email: string;
  name: string;
  type: 'personal' | 'organization';
}

const ACTIVITIES_KEY = 'lifeflow_activities';
const USER_KEY = 'lifeflow_user';
// const THEME_KEY = 'lifeflow_theme';

export const storage = {
  getActivities(): Activity[] {
    try {
      const data = localStorage.getItem(ACTIVITIES_KEY);
      if (data) return JSON.parse(data);
      // Initialize with sample data
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(sampleActivities));
      return sampleActivities;
    } catch {
      return sampleActivities;
    }
  },

  saveActivity(activity: Activity): void {
    const activities = this.getActivities();
    activities.unshift(activity);
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
  },

  deleteActivity(id: string): void {
    const activities = this.getActivities().filter(a => a.id !== id);
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
  },

  clearActivities(): void {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(sampleActivities));
  },

  getUser(): User | null {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearUser(): void {
    localStorage.removeItem(USER_KEY);
  },

  isLoggedIn(): boolean {
    return !!this.getUser();
  },
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getCurrentDate = (): string => {
  const now = new Date();
  // Approximate Persian date calculation (simplified)
  // Using fixed date for demo: 1405/03
  const day = now.getDate();
  //return `1405/04/${String(day).padStart(2, '0')}`;
  return `1405/04/11`
};
