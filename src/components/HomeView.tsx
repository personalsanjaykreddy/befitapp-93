import { TrendingUp, Activity, Award, Calendar, Target, Flame, Footprints, Timer, Zap, Edit, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import MicroWorkouts from "./MicroWorkouts";
import { CalorieTracker } from "@/utils/calorieTracker";

interface HomeViewProps {
  onNavigateToEnergyCalc?: () => void;
  onNavigateToNotes?: () => void;
  onNavigateToMealPlan?: () => void;
  onNavigateToWorkoutPlan?: () => void;
}

interface DailyGoal {
  id: string;
  text: string;
  completed: boolean;
}

const HomeView = ({ onNavigateToEnergyCalc, onNavigateToNotes, onNavigateToMealPlan, onNavigateToWorkoutPlan }: HomeViewProps) => {
  const [calorieStats, setCalorieStats] = useState(() => CalorieTracker.getTodayStats());
  const [steps, setSteps] = useState(() => {
    const saved = localStorage.getItem('dailySteps');
    return saved ? parseInt(saved) : 2847;
  });
  const [moveMinutes, setMoveMinutes] = useState(() => {
    const saved = localStorage.getItem('dailyMoveMinutes');
    return saved ? parseInt(saved) : 12;
  });
  // Get daily progress from localStorage (updated by ToDoSection)
  const [dailyProgress, setDailyProgress] = useState(() => {
    const saved = localStorage.getItem('dailyProgress');
    return saved ? JSON.parse(saved) : { completed: 0, total: 0, date: new Date().toISOString().split('T')[0] };
  });

  // Initialize calorie tracking on component mount
  useEffect(() => {
    CalorieTracker.resetIfNewDay();
    setCalorieStats(CalorieTracker.getTodayStats());

    const handleCalorieUpdate = (event: any) => {
      setCalorieStats(CalorieTracker.getTodayStats());
    };

    window.addEventListener('calorieDataUpdated', handleCalorieUpdate);
    return () => window.removeEventListener('calorieDataUpdated', handleCalorieUpdate);
  }, []);

  // Weekly progress calculated from completed daily tasks
  const weeklyProgress = {
    completed: Math.min(7, Math.floor((dailyProgress.completed / Math.max(1, dailyProgress.total)) * 7)),
    total: 7
  };

  useEffect(() => {
    // Listen for updates from ToDoSection
    const handleStorageChange = () => {
      const saved = localStorage.getItem('dailyProgress');
      if (saved) {
        setDailyProgress(JSON.parse(saved));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateString = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });


  // Realistic step counting (not rapid movement)
  useEffect(() => {
    const stepInterval = setInterval(() => {
      const hour = new Date().getHours();
      // Only increment during active hours and not too rapidly
      if (hour >= 6 && hour <= 22 && Math.random() < 0.1) {
        const increment = Math.floor(Math.random() * 3) + 1;
        setSteps(prev => {
          const newSteps = Math.min(prev + increment, 15000);
          localStorage.setItem('dailySteps', newSteps.toString());
          return newSteps;
        });
      }
    }, 60000); // Update every minute

    const moveInterval = setInterval(() => {
      const hour = new Date().getHours();
      // Only increment during active hours
      if (hour >= 6 && hour <= 22 && Math.random() < 0.05) {
        setMoveMinutes(prev => {
          const newMinutes = Math.min(prev + 1, 60);
          localStorage.setItem('dailyMoveMinutes', newMinutes.toString());
          return newMinutes;
        });
      }
    }, 120000); // Update every 2 minutes

    return () => {
      clearInterval(stepInterval);
      clearInterval(moveInterval);
    };
  }, []);


  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Calories Circle - Smaller Size with Better Alignment */}
      <div className="px-6 pb-4">
        <div 
          className="bg-gradient-card border border-border/50 rounded-2xl p-4 shadow-lg hover:shadow-md transition-all duration-slow cursor-pointer group hover-highlight touch-highlight"
          onClick={onNavigateToEnergyCalc}
        >
          <div className="text-center mb-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">Energy Balance</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToEnergyCalc?.();
                }}
                className="text-xs px-2 py-1 bg-green-500/10 text-green-600 rounded-md hover:bg-green-500/20 transition-colors font-medium"
              >
                update
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Remaining = Goal - Food + Exercise</p>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            {/* Smaller Circular Progress with Better Text Alignment */}
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 28 28">
                <circle
                  cx="14"
                  cy="14"
                  r="11"
                  stroke="hsl(var(--border))"
                  strokeWidth="1.5"
                  fill="transparent"
                />
                <circle
                  cx="14"
                  cy="14"
                  r="11"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 11}`}
                  strokeDashoffset={`${2 * Math.PI * 11 * (1 - Math.min(calorieStats.consumed / calorieStats.goal, 1))}`}
                  className="transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-base font-bold text-foreground leading-tight">{calorieStats.remaining}</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">Remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <Target className="w-4 h-4 text-primary" />
              <div className="text-sm font-medium text-foreground">{calorieStats.goal}</div>
              <div className="text-xs text-muted-foreground">Daily Goal</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <div className="text-sm font-medium text-foreground">{calorieStats.consumed}</div>
              <div className="text-xs text-muted-foreground">Consumed</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Zap className="w-4 h-4 text-green-500" />
              <div className="text-sm font-medium text-foreground">{calorieStats.burned}</div>
              <div className="text-xs text-muted-foreground">Burned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Rings */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-card border border-border/50 rounded-xl p-4 hover:shadow-md transition-all duration-normal cursor-pointer hover-highlight touch-highlight">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="18" stroke="hsl(var(--border))" strokeWidth="4" fill="transparent" />
                  <circle cx="24" cy="24" r="18" stroke="hsl(var(--primary))" strokeWidth="4" fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 18}`} strokeDashoffset={`${2 * Math.PI * 18 * (1 - (steps / 13000))}`}
                    strokeLinecap="round" />
                </svg>
                <Footprints className="absolute inset-0 m-auto w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{steps.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Steps • {Math.round((steps / 13000) * 100)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-card border border-border/50 rounded-xl p-4 hover:shadow-md transition-all duration-normal cursor-pointer hover-highlight touch-highlight">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="18" stroke="hsl(var(--border))" strokeWidth="4" fill="transparent" />
                  <circle cx="24" cy="24" r="18" stroke="hsl(var(--secondary))" strokeWidth="4" fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 18}`} strokeDashoffset={`${2 * Math.PI * 18 * (1 - (moveMinutes / 60))}`}
                    strokeLinecap="round" />
                </svg>
                <Timer className="absolute inset-0 m-auto w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{moveMinutes}</div>
                <div className="text-xs text-muted-foreground">Move Min • {Math.round((moveMinutes / 60) * 100)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Goals & Notes - Merged Section */}
      <div className="px-6 pb-4">
        <div className="bg-gradient-card border border-border/50 rounded-xl p-4 hover:shadow-selected transition-all duration-slow cursor-pointer group hover-highlight touch-highlight">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Today Goals</h3>
            </div>
            <span className="text-sm text-muted-foreground">{dayName}, {dateString}</span>
          </div>
          
          {/* Daily Progress - Moved up */}
          {dailyProgress.total > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Daily Progress</span>
                <span className="text-primary font-medium">
                  {Math.round((dailyProgress.completed / dailyProgress.total) * 100)}%
                </span>
              </div>
              <Progress value={(dailyProgress.completed / dailyProgress.total) * 100} className="h-2" />
            </div>
          )}
          
          {/* Show only 3 goals */}
          <div className="space-y-2 mb-4">
            {dailyProgress.total === 0 ? (
              <div 
                className="text-center py-4 cursor-pointer hover:bg-background/50 rounded transition-colors"
                onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-todo'))}
              >
                <p className="text-sm text-muted-foreground mb-1">
                  No goals set for today
                </p>
                <p className="text-xs text-primary">Tap to add goals</p>
              </div>
            ) : (
              <div 
                className="cursor-pointer hover:bg-background/50 rounded transition-colors p-2"
                onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-todo'))}
              >
                <div className="text-center mb-2">
                  <span className="text-lg font-bold text-primary">{dailyProgress.completed}/{Math.min(dailyProgress.total, 3)}</span>
                  <span className="text-sm text-muted-foreground ml-1">quick tasks</span>
                </div>
                {dailyProgress.total > 3 && (
                  <p className="text-xs text-muted-foreground text-center">+{dailyProgress.total - 3} more in full view</p>
                )}
              </div>
            )}
          </div>
          
          {/* Weekly Overview - Only date and day */}
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Weekly Overview</span>
              <span className="text-primary font-medium">
                {Math.round((dailyProgress.completed / Math.max(dailyProgress.total, 1)) * 100)}%
              </span>
            </div>
            
            <div className="flex justify-between">
              {(() => {
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const today = new Date();
                const currentDay = today.getDay();
                
                return days.map((day, index) => {
                  const date = new Date(today);
                  date.setDate(today.getDate() + (index - currentDay));
                  const dateNum = date.getDate();
                  const isToday = index === currentDay;
                  const isCompleted = isToday && dailyProgress.completed === dailyProgress.total && dailyProgress.total > 0;
                  
                  return (
                    <div key={day} className="flex flex-col items-center gap-1">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium
                        ${isCompleted ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}
                        ${isToday ? 'ring-2 ring-primary/30' : ''}`}>
                        {isCompleted ? '✓' : dateNum}
                      </div>
                      <span className="text-xs text-muted-foreground">{day}</span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Micro Workouts Section */}
      <div className="px-6 pb-4">
        <MicroWorkouts onViewAllWorkouts={onNavigateToWorkoutPlan} />
      </div>

      {/* Special Features - Updated with new functionality */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 gap-3">
          <Button 
            size="lg" 
            className="bg-gradient-primary text-primary-foreground h-14 shadow-selected hover:shadow-glow transition-all duration-slow hover:scale-110 active:scale-95"
            onClick={onNavigateToMealPlan}
          >
            <Flame className="w-5 h-5 mr-2" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Quick Food</span>
              <span className="text-xs opacity-90">Log meals & track nutrition</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;