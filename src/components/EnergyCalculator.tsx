import { useState } from "react";
import { ArrowLeft, Zap, Activity, Utensils, Target, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [consumedFoods, setConsumedFoods] = useState<FoodItem[]>([]);
  const [workoutActivities, setWorkoutActivities] = useState<WorkoutActivity[]>([]);
  const [selectedFood, setSelectedFood] = useState<string>("");
  const [selectedWorkout, setSelectedWorkout] = useState<string>("");
  const [workoutDuration, setWorkoutDuration] = useState<number>(30);

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
    setSelectedFood("");
  };

  const removeFood = (index: number) => {
    setConsumedFoods(prev => prev.filter((_, i) => i !== index));
  };

  const addWorkout = () => {
    if (!selectedWorkout) return;
    const workout = workoutTypes.find(w => w.name === selectedWorkout);
    if (workout) {
      setWorkoutActivities(prev => [...prev, {
        name: workout.name,
        caloriesPerMinute: workout.caloriesPerMinute,
        duration: workoutDuration
      }]);
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

  const getRecommendations = () => {
    const netCalories = getNetCalories();
    const bmr = 1800; // Base metabolic rate (simplified)
    const targetCalories = bmr + 200; // Slight surplus for fitness goals
    const remaining = targetCalories - netCalories;

    return {
      netCalories,
      targetCalories,
      remaining,
      status: remaining > 500 ? "eat_more" : remaining < -500 ? "eat_less" : "balanced"
    };
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">What did you eat today?</h2>
        <p className="text-muted-foreground">Add the foods you've consumed</p>
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
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Foods Added:</h3>
          {consumedFoods.map((food, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{food.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {food.calories} cal • {food.protein}g protein
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFood(index)}
                  className="text-destructive"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
          
          <Card className="p-3 bg-primary/10 border-primary/20">
            <p className="text-center font-bold text-primary">
              Total: {getTotalCaloriesConsumed()} calories
            </p>
          </Card>
        </div>
      )}

      <Button 
        onClick={() => setStep(2)} 
        disabled={consumedFoods.length === 0}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">What activities did you do?</h2>
        <p className="text-muted-foreground">Add your workouts and activities</p>
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
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Activities Added:</h3>
          {workoutActivities.map((activity, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{activity.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.duration} mins • {activity.caloriesPerMinute * activity.duration} cal burned
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeWorkout(index)}
                  className="text-destructive"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
          
          <Card className="p-3 bg-secondary/10 border-secondary/20">
            <p className="text-center font-bold text-secondary">
              Total Burned: {getTotalCaloriesBurned()} calories
            </p>
          </Card>
        </div>
      )}

      <div className="flex space-x-3">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button onClick={() => setStep(3)} className="flex-1">
          Calculate Energy
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const recommendations = getRecommendations();

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Energy Analysis</h2>
          <p className="text-muted-foreground">Your daily energy balance</p>
        </div>

        {/* Energy Summary */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center bg-primary/10 border-primary/20">
            <Utensils className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-primary">{getTotalCaloriesConsumed()}</p>
            <p className="text-sm text-muted-foreground">Calories In</p>
          </Card>
          
          <Card className="p-4 text-center bg-secondary/10 border-secondary/20">
            <Activity className="w-6 h-6 mx-auto mb-2 text-secondary" />
            <p className="text-2xl font-bold text-secondary">{getTotalCaloriesBurned()}</p>
            <p className="text-sm text-muted-foreground">Calories Out</p>
          </Card>
        </div>

        {/* Net Balance */}
        <Card className="p-6 text-center bg-gradient-card border border-border/50">
          <Target className="w-8 h-8 mx-auto mb-3 text-success" />
          <p className="text-3xl font-bold mb-2" style={{ 
            color: recommendations.netCalories > 0 ? 'hsl(var(--success))' : 'hsl(var(--warning))'
          }}>
            {recommendations.netCalories > 0 ? '+' : ''}{recommendations.netCalories}
          </p>
          <p className="text-sm text-muted-foreground mb-4">Net Calories</p>
          
          <div className="text-xs text-muted-foreground">
            Target: {recommendations.targetCalories} cal/day
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-4">
          <h3 className="font-bold text-foreground mb-3 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-warning" />
            Recommendations
          </h3>
          
          {recommendations.status === "eat_more" && (
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-2">Need More Energy</Badge>
              <p className="text-sm text-muted-foreground">
                You need about <span className="font-bold text-primary">{Math.abs(recommendations.remaining)} more calories</span> to reach your daily target.
              </p>
              <p className="text-sm text-muted-foreground">
                Try adding: Banana with almonds (175 cal) or a glass of milk with dates (200 cal).
              </p>
            </div>
          )}
          
          {recommendations.status === "eat_less" && (
            <div className="space-y-2">
              <Badge variant="outline" className="mb-2">Energy Surplus</Badge>
              <p className="text-sm text-muted-foreground">
                You've consumed <span className="font-bold text-warning">{Math.abs(recommendations.remaining)} extra calories</span> today.
              </p>
              <p className="text-sm text-muted-foreground">
                Consider a 20-minute walk ({20 * 4} cal) or some light stretching.
              </p>
            </div>
          )}
          
          {recommendations.status === "balanced" && (
            <div className="space-y-2">
              <Badge className="mb-2">Well Balanced</Badge>
              <p className="text-sm text-muted-foreground">
                Great job! Your energy intake and output are well balanced for your fitness goals.
              </p>
            </div>
          )}
        </Card>

        <Button onClick={() => setStep(1)} className="w-full" variant="outline">
          Start New Analysis
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-hero">
      {/* Header */}
      <div className="flex items-center p-4 bg-background/95 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-bold text-foreground">Energy Calculator</h1>
          <p className="text-xs text-muted-foreground">Step {step} of 3</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};

export default EnergyCalculator;