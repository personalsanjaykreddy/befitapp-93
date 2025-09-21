interface CalorieData {
  consumed: number;
  burned: number;
  goal: number;
  date: string;
  foods: Array<{
    name: string;
    calories: number;
    timestamp: string;
  }>;
  activities: Array<{
    name: string;
    calories: number;
    duration: number;
    timestamp: string;
  }>;
}

const DEFAULT_DAILY_GOAL = 2400;

export class CalorieTracker {
  private static getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  private static getTodayData(): CalorieData {
    const today = this.getToday();
    const stored = localStorage.getItem(`calories_${today}`);
    
    if (stored) {
      return JSON.parse(stored);
    }
    
    return {
      consumed: 0,
      burned: 0,
      goal: DEFAULT_DAILY_GOAL,
      date: today,
      foods: [],
      activities: []
    };
  }

  private static saveTodayData(data: CalorieData): void {
    const today = this.getToday();
    localStorage.setItem(`calories_${today}`, JSON.stringify(data));
    
    // Trigger storage event for other components
    window.dispatchEvent(new CustomEvent('calorieDataUpdated', { detail: data }));
  }

  public static addFood(name: string, calories: number): void {
    const data = this.getTodayData();
    data.foods.push({
      name,
      calories,
      timestamp: new Date().toISOString()
    });
    data.consumed = data.foods.reduce((sum, food) => sum + food.calories, 0);
    this.saveTodayData(data);
  }

  public static addActivity(name: string, calories: number, duration: number): void {
    const data = this.getTodayData();
    data.activities.push({
      name,
      calories,
      duration,
      timestamp: new Date().toISOString()
    });
    data.burned = data.activities.reduce((sum, activity) => sum + activity.calories, 0);
    this.saveTodayData(data);
  }

  public static getTodayStats(): {
    consumed: number;
    burned: number;
    remaining: number;
    goal: number;
    netCalories: number;
  } {
    const data = this.getTodayData();
    const remaining = data.goal - data.consumed + data.burned;
    const netCalories = data.consumed - data.burned;
    
    return {
      consumed: data.consumed,
      burned: data.burned,
      remaining: Math.max(0, remaining),
      goal: data.goal,
      netCalories
    };
  }

  public static getRecentFoods(): Array<{ name: string; calories: number; timestamp: string }> {
    const data = this.getTodayData();
    return data.foods.slice(-5); // Last 5 foods
  }

  public static getRecentActivities(): Array<{ name: string; calories: number; duration: number; timestamp: string }> {
    const data = this.getTodayData();
    return data.activities.slice(-5); // Last 5 activities
  }

  public static resetIfNewDay(): void {
    // This will be called on app startup to handle day transitions
    const today = this.getToday();
    const lastResetDate = localStorage.getItem('lastCalorieReset');
    
    if (lastResetDate !== today) {
      // New day - data is automatically isolated by date in storage
      localStorage.setItem('lastCalorieReset', today);
    }
  }

  public static updateGoal(newGoal: number): void {
    const data = this.getTodayData();
    data.goal = newGoal;
    this.saveTodayData(data);
  }
}