import { useState, useEffect } from "react";
import { ArrowLeft, Zap, Activity, Utensils, Target, Plus, Minus, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CalorieTracker } from "@/utils/calorieTracker";

interface EnergyCalculatorProps {
  onBack: () => void;
}

interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
}

interface WorkoutActivity {
  name: string;
  caloriesPerMinute: number;
  duration: number;
}

const EnergyCalculator = ({ onBack }: EnergyCalculatorProps) => {
  const [consumedFoods, setConsumedFoods] = useState<FoodItem[]>([]);
  const [workoutActivities, setWorkoutActivities] = useState<WorkoutActivity[]>([]);
  const [selectedFood, setSelectedFood] = useState<string>("");
  const [selectedWorkout, setSelectedWorkout] = useState<string>("");
  const [workoutDuration, setWorkoutDuration] = useState<number>(30);
  const [showResults, setShowResults] = useState(false);

  // Load existing data on component mount
  useEffect(() => {
    const recentFoods = CalorieTracker.getRecentFoods();
    const recentActivities = CalorieTracker.getRecentActivities();
    
    setConsumedFoods(recentFoods.map(food => ({
      name: food.name,
      calories: food.calories,
      protein: 0, carbs: 0, fat: 0, portion: "1 serving"
    })));
    
    setWorkoutActivities(recentActivities.map(activity => ({
      name: activity.name,
      caloriesPerMinute: activity.calories / activity.duration,
      duration: activity.duration
    })));
  }, []);

  const indianFoods: FoodItem[] = [
    { name: "Rice (1 cup)", calories: 205, protein: 4, carbs: 45, fat: 0.5, portion: "1 cup" },
    { name: "Roti (1 piece)", calories: 70, protein: 3, carbs: 15, fat: 0.5, portion: "1 piece" },
    { name: "Dal (1 cup)", calories: 230, protein: 18, carbs: 40, fat: 1, portion: "1 cup" },
    { name: "Chicken Curry (1 cup)", calories: 300, protein: 25, carbs: 8, fat: 18, portion: "1 cup" },
    { name: "Paneer (100g)", calories: 265, protein: 20, carbs: 1, fat: 20, portion: "100g" },
    { name: "Yogurt (1 cup)", calories: 150, protein: 8, carbs: 12, fat: 8, portion: "1 cup" },
    { name: "Banana (1 medium)", calories: 105, protein: 1, carbs: 27, fat: 0.5, portion: "1 medium" },
    { name: "Oats (1 cup)", calories: 150, protein: 5, carbs: 27, fat: 3, portion: "1 cup" },
    { name: "Egg (1 large)", calories: 70, protein: 6, carbs: 0.5, fat: 5, portion: "1 large" },
    { name: "Almonds (10 pieces)", calories: 70, protein: 3, carbs: 2, fat: 6, portion: "10 pieces" }
  ];

  const workoutTypes = [
    { name: "Walking", caloriesPerMinute: 4 },
    { name: "Running", caloriesPerMinute: 10 },
    { name: "Cycling", caloriesPerMinute: 8 },
    { name: "Weight Training", caloriesPerMinute: 6 },
    { name: "Yoga", caloriesPerMinute: 3 },
    { name: "Swimming", caloriesPerMinute: 11 },
    { name: "Dancing", caloriesPerMinute: 5 },
    { name: "Household Work", caloriesPerMinute: 3 }
  ];

  const addFood = (food: FoodItem) => {
    setConsumedFoods(prev => [...prev, food]);
    CalorieTracker.addFood(food.name, food.calories);
    setSelectedFood("");
  };

  const removeFood = (index: number) => {
    setConsumedFoods(prev => prev.filter((_, i) => i !== index));
  };

  const addWorkout = () => {
    if (!selectedWorkout) return;
    const workout = workoutTypes.find(w => w.name === selectedWorkout);
    if (workout) {
      const totalCalories = workout.caloriesPerMinute * workoutDuration;
      setWorkoutActivities(prev => [...prev, {
        name: workout.name,
        caloriesPerMinute: workout.caloriesPerMinute,
        duration: workoutDuration
      }]);
      CalorieTracker.addActivity(workout.name, totalCalories, workoutDuration);
      setSelectedWorkout("");
      setWorkoutDuration(30);
    }
  };

  const removeWorkout = (index: number) => {
    setWorkoutActivities(prev => prev.filter((_, i) => i !== index));
  };

  const getTotalCaloriesConsumed = () => {
    return consumedFoods.reduce((total, food) => total + food.calories, 0);
  };

  const getTotalCaloriesBurned = () => {
    return workoutActivities.reduce((total, activity) => 
      total + (activity.caloriesPerMinute * activity.duration), 0);
  };

  const getNetCalories = () => {
    return getTotalCaloriesConsumed() - getTotalCaloriesBurned();
  };

  const getEnergyLevel = () => {
    const netCalories = getNetCalories();
    const bmr = 1800; // Base metabolic rate
    const percentage = (netCalories / bmr) * 100;
    
    if (percentage < 50) return { level: "Low", color: "text-destructive", percentage: Math.max(percentage, 10) };
    if (percentage < 80) return { level: "Moderate", color: "text-warning", percentage };
    if (percentage < 120) return { level: "High", color: "text-success", percentage };
    return { level: "Very High", color: "text-primary", percentage: Math.min(percentage, 150) };
  };

  const getRecommendations = () => {
    const netCalories = getNetCalories();
    const bmr = 1800;
    const targetCalories = bmr + 200;
    const remaining = targetCalories - netCalories;
    const energyLevel = getEnergyLevel();

    return {
      netCalories,
      targetCalories,
      remaining,
      energyLevel,
      status: remaining > 500 ? "eat_more" : remaining < -500 ? "eat_less" : "balanced"
    };
  };

  const getSuggestedFoods = () => {
    const recommendations = getRecommendations();
    const remainingCals = Math.abs(recommendations.remaining);
    
    if (recommendations.status === "eat_more") {
      return indianFoods
        .filter(food => food.calories <= remainingCals + 100)
        .sort((a, b) => Math.abs(a.calories - remainingCals) - Math.abs(b.calories - remainingCals))
        .slice(0, 3);
    }
    
    return indianFoods
      .filter(food => food.calories <= 150)
      .slice(0, 3);
  };

  const calculateResults = () => {
    setShowResults(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-hero">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
            <Home className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-bold text-foreground">Energy Calculator</h1>
            <p className="text-xs text-muted-foreground">Track your daily energy balance</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Step 1: Food Intake */}
          <Card className="p-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-foreground mb-1">Step 1: Food Intake</h2>
              <p className="text-sm text-muted-foreground">Add the foods you've consumed today</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="food-select">Select Food</Label>
                <select
                  id="food-select"
                  value={selectedFood}
                  onChange={(e) => setSelectedFood(e.target.value)}
                  className="w-full mt-1 p-2 border border-input rounded-md bg-background"
                >
                  <option value="">Choose a food item...</option>
                  {indianFoods.map((food) => (
                    <option key={food.name} value={food.name}>
                      {food.name} - {food.calories} cal
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={() => {
                  const food = indianFoods.find(f => f.name === selectedFood);
                  if (food) addFood(food);
                }}
                disabled={!selectedFood}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Food
              </Button>
            </div>

            {consumedFoods.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="font-semibold text-foreground">Foods Added:</h3>
                {consumedFoods.map((food, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-accent/20 rounded-md">
                    <div>
                      <p className="font-medium text-foreground text-sm">{food.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {food.calories} cal • {food.protein}g protein
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFood(index)}
                      className="text-destructive h-8 w-8"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                
                <div className="p-2 bg-primary/10 rounded-md text-center">
                  <p className="font-bold text-primary text-sm">
                    Total Consumed: {getTotalCaloriesConsumed()} calories
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Step 2: Activities */}
          <Card className="p-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-foreground mb-1">Step 2: Activities</h2>
              <p className="text-sm text-muted-foreground">Add your workouts and activities</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="workout-select">Select Activity</Label>
                <select
                  id="workout-select"
                  value={selectedWorkout}
                  onChange={(e) => setSelectedWorkout(e.target.value)}
                  className="w-full mt-1 p-2 border border-input rounded-md bg-background"
                >
                  <option value="">Choose an activity...</option>
                  {workoutTypes.map((workout) => (
                    <option key={workout.name} value={workout.name}>
                      {workout.name} - {workout.caloriesPerMinute} cal/min
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={workoutDuration}
                  onChange={(e) => setWorkoutDuration(Number(e.target.value))}
                  min="1"
                  max="300"
                  className="mt-1"
                />
              </div>

              <Button
                onClick={addWorkout}
                disabled={!selectedWorkout}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </div>

            {workoutActivities.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="font-semibold text-foreground">Activities Added:</h3>
                {workoutActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-accent/20 rounded-md">
                    <div>
                      <p className="font-medium text-foreground text-sm">{activity.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.duration} mins • {activity.caloriesPerMinute * activity.duration} cal burned
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeWorkout(index)}
                      className="text-destructive h-8 w-8"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                
                <div className="p-2 bg-secondary/10 rounded-md text-center">
                  <p className="font-bold text-secondary text-sm">
                    Total Burned: {getTotalCaloriesBurned()} calories
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Calculate Energy Button */}
          <Button 
            onClick={calculateResults} 
            className="w-full"
            disabled={consumedFoods.length === 0 && workoutActivities.length === 0}
          >
            <Zap className="w-4 h-4 mr-2" />
            Calculate Energy Level
          </Button>

          {/* Step 3: Results */}
          {showResults && (
            <Card className="p-4">
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold text-foreground mb-1">Step 3: Energy Analysis</h2>
                <p className="text-sm text-muted-foreground">Your daily energy balance</p>
              </div>

              {/* Energy Summary */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 text-center bg-primary/10 border border-primary/20 rounded-md">
                  <Utensils className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xl font-bold text-primary">{getTotalCaloriesConsumed()}</p>
                  <p className="text-xs text-muted-foreground">Calories In</p>
                </div>
                
                <div className="p-3 text-center bg-secondary/10 border border-secondary/20 rounded-md">
                  <Activity className="w-5 h-5 mx-auto mb-1 text-secondary" />
                  <p className="text-xl font-bold text-secondary">{getTotalCaloriesBurned()}</p>
                  <p className="text-xs text-muted-foreground">Calories Out</p>
                </div>
              </div>

              {/* Energy Level */}
              <div className="p-4 text-center bg-gradient-card border border-border/50 rounded-md mb-4">
                <Target className="w-6 h-6 mx-auto mb-2 text-success" />
                <p className={`text-2xl font-bold mb-1 ${getRecommendations().energyLevel.color}`}>
                  {getRecommendations().energyLevel.level}
                </p>
                <p className="text-sm text-muted-foreground mb-2">Energy Level</p>
                <div className="text-xs text-muted-foreground">
                  Net: {getNetCalories()} calories
                </div>
              </div>

              {/* Note about workout generation */}
              <div className="p-3 bg-accent/20 rounded-md mb-4">
                <p className="text-sm text-center text-muted-foreground">
                  <strong>Note:</strong> After generating the energy levels, you can generate workouts based on your energy levels.
                </p>
              </div>

              {/* Food Recommendations */}
              <div className="space-y-3">
                <h3 className="font-bold text-foreground flex items-center">
                  <Utensils className="w-4 h-4 mr-2 text-warning" />
                  Recommended Foods
                </h3>
                
                <div className="space-y-2">
                  {getSuggestedFoods().map((food, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-background/50 rounded-md">
                      <div>
                        <p className="font-medium text-foreground text-sm">{food.name}</p>
                        <p className="text-xs text-muted-foreground">{food.calories} cal</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addFood(food)}
                        className="h-8"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={() => setShowResults(false)} className="w-full mt-4" variant="outline">
                Recalculate
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnergyCalculator;