import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Trash2, Check, Target, Calendar, Zap, Utensils, Droplets, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ToDoSectionProps {
  onBack: () => void;
}

interface Goal {
  id: string;
  text: string;
  completed: boolean;
  category: "gym" | "food" | "water" | "meditation" | "custom";
  createdAt: string;
}

interface WeeklyGoals {
  [key: string]: Goal[];
}

const ToDoSection = ({ onBack }: ToDoSectionProps) => {
  const [currentWeek, setCurrentWeek] = useState<WeeklyGoals>(() => {
    const saved = localStorage.getItem('weeklyGoals');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [newGoal, setNewGoal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Goal["category"]>("custom");
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD format
  });

  const goalRecommendations = [
    { id: "gym", label: "Gym", icon: Zap, suggestions: ["30 min workout", "Strength training", "Cardio session", "Yoga practice"] },
    { id: "food", label: "Food", icon: Utensils, suggestions: ["Healthy breakfast", "Protein meal", "Avoid junk food", "Cook at home"] },
    { id: "water", label: "Water", icon: Droplets, suggestions: ["8 glasses water", "Stay hydrated", "Morning water", "Pre-workout hydration"] },
    { id: "meditation", label: "Meditation", icon: Brain, suggestions: ["10 min meditation", "Breathing exercise", "Mindfulness", "Evening reflection"] },
    { id: "custom", label: "Notes", icon: Target, suggestions: ["Write journal", "Plan tomorrow", "Review goals", "Quick note"] }
  ];

  useEffect(() => {
    localStorage.setItem('weeklyGoals', JSON.stringify(currentWeek));
    
    // Update weekly progress in HomeView
    const today = new Date().toISOString().split('T')[0];
    const todayGoals = currentWeek[today] || [];
    const completedGoals = todayGoals.filter(goal => goal.completed).length;
    const totalGoals = todayGoals.length;
    
    localStorage.setItem('dailyProgress', JSON.stringify({
      completed: completedGoals,
      total: totalGoals,
      date: today
    }));
  }, [currentWeek]);

  const addGoal = (goalText: string, category: Goal["category"] = "custom") => {
    if (!goalText.trim()) return;
    
    const newGoalItem: Goal = {
      id: Date.now().toString(),
      text: goalText.trim(),
      completed: false,
      category,
      createdAt: new Date().toISOString()
    };

    setCurrentWeek(prev => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newGoalItem]
    }));
    
    setNewGoal("");
  };

  const toggleGoal = (goalId: string) => {
    setCurrentWeek(prev => ({
      ...prev,
      [selectedDay]: (prev[selectedDay] || []).map(goal =>
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      )
    }));
  };

  const deleteGoal = (goalId: string) => {
    setCurrentWeek(prev => ({
      ...prev,
      [selectedDay]: (prev[selectedDay] || []).filter(goal => goal.id !== goalId)
    }));
  };

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    
    return date.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getWeekDays = () => {
    const today = new Date();
    const days = [];
    
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    
    return days;
  };

  const weekDays = getWeekDays();
  const todayGoals = currentWeek[selectedDay] || [];
  const completedToday = todayGoals.filter(goal => goal.completed).length;

  return (
    <div className="flex flex-col h-screen bg-gradient-hero">
      {/* Header */}
      <div className="flex items-center p-4 bg-background/95 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-bold text-foreground">Today Goals & Notes</h1>
          <p className="text-xs text-muted-foreground">
            {completedToday}/{todayGoals.length} completed • {getDayName(selectedDay)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Week Navigator */}
        <Card className="p-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">Week Overview</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {weekDays.map(day => {
              const dayGoals = currentWeek[day] || [];
              const isSelected = day === selectedDay;
              const isToday = day === new Date().toISOString().split('T')[0];
              const date = new Date(day);
              const dayName = date.toLocaleDateString('en', { weekday: 'short' });
              const dayDate = date.getDate();
              
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "flex-shrink-0 p-2 rounded-lg cursor-pointer transition-all duration-normal min-w-[60px] text-center",
                    isSelected 
                      ? "bg-primary text-primary-foreground shadow-glow" 
                      : "bg-muted hover:bg-muted/80",
                    isToday && !isSelected && "ring-2 ring-primary/50"
                  )}
                >
                  <div className="text-xs font-medium">
                    {dayName}
                  </div>
                  <div className="text-xs mt-1">
                    {dayDate}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Goal Recommendations */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Add Goals & Notes</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {goalRecommendations.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={selectedCategory === id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(id as Goal["category"])}
                className="justify-start gap-2"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>
          
          {selectedCategory !== "custom" && (
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-1">
                {goalRecommendations
                  .find(r => r.id === selectedCategory)
                  ?.suggestions.map(suggestion => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs"
                      onClick={() => addGoal(suggestion, selectedCategory)}
                    >
                      {suggestion}
                    </Badge>
                  ))
                }
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            <Input
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Add a new goal..."
              onKeyDown={(e) => e.key === 'Enter' && addGoal(newGoal, selectedCategory)}
              className="flex-1"
            />
            <Button 
              onClick={() => addGoal(newGoal, selectedCategory)}
              disabled={!newGoal.trim()}
              size="icon"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Today's Goals */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Goals for {(() => {
              const date = new Date(selectedDay);
              const today = new Date();
              const isToday = selectedDay === today.toISOString().split('T')[0];
              
              if (isToday) {
                return `Today, ${date.toLocaleDateString('en', { month: 'short', day: 'numeric' })}`;
              }
              return date.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
            })()}
          </h3>
          
          {todayGoals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No goals set for this day</p>
              <p className="text-xs">Add your first goal above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayGoals.slice(0, 3).map(goal => {
                const categoryInfo = goalRecommendations.find(r => r.id === goal.category);
                const Icon = categoryInfo?.icon || Target;
                
                return (
                  <div
                    key={goal.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border transition-all duration-normal",
                      goal.completed 
                        ? "bg-success/10 border-success/20 opacity-75" 
                        : "bg-card border-border hover:shadow-md"
                    )}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleGoal(goal.id)}
                      className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full",
                        goal.completed 
                          ? "bg-success text-success-foreground" 
                          : "border-2 border-muted-foreground hover:border-primary"
                      )}
                    >
                      {goal.completed && <Check className="w-4 h-4" />}
                    </Button>
                    
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span 
                        className={cn(
                          "text-sm truncate",
                          goal.completed ? "line-through text-muted-foreground" : "text-foreground"
                        )}
                      >
                        {goal.text}
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteGoal(goal.id)}
                      className="flex-shrink-0 w-8 h-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
              {todayGoals.length > 3 && (
                <div className="text-center py-2 text-muted-foreground">
                  <p className="text-xs">+{todayGoals.length - 3} more goals</p>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Progress Summary */}
        {todayGoals.length > 0 && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-foreground">Daily Progress</h3>
              <span className="text-xs text-muted-foreground">
                {Math.round((completedToday / todayGoals.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-slow"
                style={{ width: `${(completedToday / todayGoals.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {completedToday === todayGoals.length 
                ? "🎉 All goals completed!" 
                : `${todayGoals.length - completedToday} goals remaining`
              }
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ToDoSection;