import { useState } from "react";
import { Plus, Check, Clock, Target, TrendingUp, Droplets, Coffee, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface HabitTrackerProps {
  onBack: () => void;
}

const HabitTracker = ({ onBack }: HabitTrackerProps) => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      title: "Morning Stretch",
      duration: "5 min",
      completed: true,
      streak: 12,
      icon: Target,
      category: "movement",
      difficulty: "easy"
    },
    {
      id: 2,
      title: "Hydration Check",
      duration: "2 min",
      completed: true,
      streak: 8,
      icon: Droplets,
      category: "health",
      difficulty: "easy"
    },
    {
      id: 3,
      title: "Standing Break",
      duration: "3 min",
      completed: false,
      streak: 5,
      icon: Clock,
      category: "movement",
      difficulty: "easy"
    },
    {
      id: 4,
      title: "Evening Meditation",
      duration: "10 min",
      completed: false,
      streak: 3,
      icon: Moon,
      category: "wellness",
      difficulty: "medium"
    }
  ]);

  const [microWorkouts] = useState([
    {
      id: 1,
      title: "Desk Push-ups",
      duration: "2 min",
      reps: "10 reps",
      category: "strength"
    },
    {
      id: 2,
      title: "Stair Climb",
      duration: "3 min",
      reps: "2 flights",
      category: "cardio"
    },
    {
      id: 3,
      title: "Wall Sit",
      duration: "1 min",
      reps: "30 seconds",
      category: "strength"
    }
  ]);

  const toggleHabit = (habitId: number) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completed: !habit.completed,
            streak: habit.completed ? habit.streak - 1 : habit.streak + 1
          }
        : habit
    ));
  };

  const completedToday = habits.filter(h => h.completed).length;
  const completionRate = (completedToday / habits.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/20 text-success border-success/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'hard': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Habit Builder</h1>
            <p className="text-sm text-muted-foreground">Build lasting micro-habits</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            Back
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Progress Overview */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-glow hover:scale-[1.02] transition-all duration-slow cursor-pointer group hover-highlight touch-highlight">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Today's Progress</h3>
            <Badge variant="default" className="hover:scale-105 transition-transform">
              {completedToday}/{habits.length}
            </Badge>
          </div>
          
          <div className="mb-3">
            <Progress 
              value={completionRate} 
              className="h-3 hover:h-4 transition-all duration-normal"
            />
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-success">
              <TrendingUp className="w-4 h-4" />
              <span>{Math.round(completionRate)}% Complete</span>
            </div>
            <div className="text-muted-foreground">
              Avg streak: {Math.round(habits.reduce((acc, h) => acc + h.streak, 0) / habits.length)} days
            </div>
          </div>
        </Card>

        {/* Daily Habits */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md transition-all duration-normal">
          <h3 className="font-semibold text-foreground mb-3">Daily Micro-Habits</h3>
          <div className="space-y-3">
            {habits.map((habit) => {
              const IconComponent = habit.icon;
              return (
                <div
                  key={habit.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-normal hover:scale-[1.02] cursor-pointer group ${
                    habit.completed 
                      ? 'bg-success/10 border-success/20 hover:bg-success/20' 
                      : 'bg-background/50 border-border/30 hover:bg-background/70 hover:shadow-sm'
                  }`}
                  onClick={() => toggleHabit(habit.id)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle ${
                    habit.completed ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {habit.completed ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-medium group-hover:text-primary transition-colors ${
                      habit.completed ? 'text-foreground line-through' : 'text-foreground'
                    }`}>
                      {habit.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{habit.duration}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getDifficultyColor(habit.difficulty)} hover:scale-105 transition-transform`}
                      >
                        {habit.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">{habit.streak}</div>
                    <div className="text-xs text-muted-foreground">day streak</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Micro-Workouts */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-selected hover:scale-[1.01] transition-all duration-slow cursor-pointer hover-highlight touch-highlight">
          <h3 className="font-semibold text-foreground mb-3">Quick Micro-Workouts</h3>
          <div className="grid gap-3">
            {microWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
              >
                <div>
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {workout.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{workout.duration}</span>
                    <span>•</span>
                    <span>{workout.reps}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="hover:scale-105 hover:shadow-md transition-all duration-normal"
                >
                  Start
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Add New Habit */}
        <Card className="p-4 bg-gradient-selected border border-primary/20 hover:shadow-glow hover:scale-[1.02] transition-all duration-slow cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:animate-bounce-gentle transition-colors">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                Add New Habit
              </h4>
              <p className="text-sm text-muted-foreground">Create a new micro-commitment</p>
            </div>
          </div>
        </Card>

        {/* Behavioral Tips */}
        <Card className="p-3 bg-muted/50 border border-border/30 hover:bg-muted/70 hover:scale-[1.01] transition-all duration-normal cursor-pointer">
          <div className="text-center">
            <h4 className="text-sm font-medium text-foreground mb-1">💡 Habit Tip</h4>
            <p className="text-xs text-muted-foreground">
              Start with 2-minute habits. Consistency beats intensity for building lasting habits.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HabitTracker;