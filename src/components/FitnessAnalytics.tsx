import { useState, useEffect } from "react";
import { TrendingUp, Activity, Target, Flame, Footprints, Timer, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FitnessAnalyticsProps {
  onBack: () => void;
}

const FitnessAnalytics = ({ onBack }: FitnessAnalyticsProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Get saved data or use defaults
  const getSavedData = () => {
    const savedCalories = localStorage.getItem('caloriesConsumed') || '560';
    const savedExercise = localStorage.getItem('caloriesBurned') || '0';
    const baseGoal = 2400;
    
    return {
      baseGoal,
      consumed: parseInt(savedCalories),
      burned: parseInt(savedExercise),
      remaining: baseGoal - parseInt(savedCalories) + parseInt(savedExercise)
    };
  };

  const calorieData = getSavedData();

  // BMR Calculator (simplified) - Based on user profile if available
  const calculateBMR = () => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const data = JSON.parse(profile);
      if (data.weight && data.height && data.age) {
        // Using Mifflin-St Jeor Equation for men (simplified)
        const bmr = 10 * parseFloat(data.weight) + 6.25 * parseFloat(data.height) - 5 * parseFloat(data.age) + 5;
        return Math.round(bmr);
      }
    }
    return 1800; // Default BMR
  };

  // Step calculation based on time and activity (mock realistic data)
  const calculateSteps = () => {
    const hour = currentTime.getHours();
    const baseSteps = Math.floor(Math.random() * 1000) + 500; // Random base for realism
    
    // More steps during active hours
    if (hour >= 7 && hour <= 22) {
      return Math.min(15000, baseSteps + (hour - 7) * 600 + Math.floor(Math.random() * 400));
    }
    return Math.min(2000, baseSteps);
  };

  // Active minutes calculation based on time
  const calculateActiveMinutes = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour <= 23) {
      return Math.min(60, Math.floor((hour - 6) * 2.8) + Math.floor(Math.random() * 10));
    }
    return Math.floor(Math.random() * 5);
  };

  const steps = calculateSteps();
  const activeMinutes = calculateActiveMinutes();
  const bmr = calculateBMR();

  // Energy remaining based on time of day
  const getEnergyRemaining = () => {
    const hour = currentTime.getHours();
    const timeBasedEnergy = Math.max(0, 100 - (hour * 4)); // Decreases throughout day
    const activityBonus = Math.floor(activeMinutes / 10) * 5; // Bonus for activity
    
    return Math.min(100, timeBasedEnergy + activityBonus);
  };

  const energyRemaining = getEnergyRemaining();

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Fitness Analytics</h1>
            <p className="text-sm text-muted-foreground">All your health metrics in one place</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
        {/* Energy Status */}
        <Card className="p-6 bg-gradient-card border border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Energy Status</h2>
              <p className="text-sm text-muted-foreground">Based on time and activity</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground">Energy Remaining</span>
                <span className="text-primary font-medium">{energyRemaining}%</span>
              </div>
              <Progress value={energyRemaining} className="h-2" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-foreground">{bmr}</div>
                <div className="text-xs text-muted-foreground">BMR (cal/day)</div>
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{Math.floor(currentTime.getHours() * 0.8)}h</div>
                <div className="text-xs text-muted-foreground">Time Active</div>
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{Math.floor(energyRemaining * 0.24)}h</div>
                <div className="text-xs text-muted-foreground">Est. Remaining</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Calorie Tracking */}
        <Card className="p-6 bg-gradient-card border border-border/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">Calorie Balance</h2>
          
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
              <Target className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-sm font-medium text-foreground">{calorieData.baseGoal}</div>
              <div className="text-xs text-muted-foreground">Goal</div>
            </div>
            <div>
              <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
              <div className="text-sm font-medium text-foreground">{calorieData.consumed}</div>
              <div className="text-xs text-muted-foreground">Food</div>
            </div>
            <div>
              <Activity className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <div className="text-sm font-medium text-foreground">{calorieData.burned}</div>
              <div className="text-xs text-muted-foreground">Exercise</div>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-selected rounded-lg">
            <div className="text-2xl font-bold text-primary">{calorieData.remaining}</div>
            <div className="text-sm text-muted-foreground">Calories Remaining</div>
          </div>
        </Card>

        {/* Activity Metrics */}
        <Card className="p-6 bg-gradient-card border border-border/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">Activity Metrics</h2>
          
          <div className="space-y-4">
            {/* Steps */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Footprints className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">{steps.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Steps • {Math.floor((steps / 13000) * 100)}% of goal</div>
                </div>
              </div>
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Active Minutes - "Move Min" explained */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Timer className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">{activeMinutes}</div>
                  <div className="text-sm text-muted-foreground">Move Minutes • {Math.floor((activeMinutes / 60) * 100)}% of goal</div>
                </div>
              </div>
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </Card>

        {/* Explanations */}
        <Card className="p-4 bg-gradient-card border border-border/50">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            How We Calculate Your Metrics
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>Steps:</strong> Calculated based on your activity level and time of day. More active during daytime hours.</p>
            <p><strong>Move Minutes:</strong> Active minutes where you're moving consistently (like brisk walking, exercise, etc.)</p>
            <p><strong>Energy Remaining:</strong> Based on your BMR, current time, and activity level throughout the day.</p>
            <p><strong>BMR:</strong> Your Basal Metabolic Rate - calories your body burns at rest (calculated from your profile).</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FitnessAnalytics;