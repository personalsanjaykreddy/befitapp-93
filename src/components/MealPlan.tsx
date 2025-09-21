import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Utensils, ChefHat, Zap, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MealPlanProps {
  onBack: () => void;
}

const MealPlan = ({ onBack }: MealPlanProps) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(() => {
    const saved = localStorage.getItem('mealPlanStep');
    return saved ? parseInt(saved) as 1 | 2 | 3 | 4 : 1;
  });
  const [mealType, setMealType] = useState<"pre-workout" | "post-workout" | "regular" | null>(null);
  const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | null>(null);
  const [savedMeals, setSavedMeals] = useState<any[]>(() => {
    const saved = localStorage.getItem('savedMeals');
    return saved ? JSON.parse(saved) : [];
  });

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('mealPlanStep', step.toString());
  }, [step]);

  useEffect(() => {
    localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
  }, [savedMeals]);

  const saveMeal = (meal: any) => {
    setSavedMeals(prev => [...prev, { ...meal, id: Date.now() }]);
  };

  const deleteMeal = (mealId: number) => {
    setSavedMeals(prev => prev.filter(meal => meal.id !== mealId));
  };

  const ingredients = [
    "Rice", "Roti/Chapati", "Dal (Lentils)", "Chicken", "Paneer", "Eggs", 
    "Vegetables", "Yogurt", "Milk", "Oats", "Banana", "Almonds", 
    "Ghee", "Oil", "Spices", "Onions", "Tomatoes", "Potatoes"
  ];

  const mealRecommendations = {
    "pre-workout": {
      morning: [
        {
          name: "Banana Oats with Almonds",
          ingredients: ["Oats", "Banana", "Almonds", "Milk"],
          calories: 320,
          protein: 12,
          carbs: 45,
          time: "30 mins before workout"
        },
        {
          name: "Roti with Paneer",
          ingredients: ["Roti/Chapati", "Paneer", "Ghee"],
          calories: 280,
          protein: 15,
          carbs: 35,
          time: "45 mins before workout"
        }
      ],
      afternoon: [
        {
          name: "Rice with Dal",
          ingredients: ["Rice", "Dal (Lentils)", "Ghee"],
          calories: 350,
          protein: 18,
          carbs: 50,
          time: "1 hour before workout"
        },
        {
          name: "Vegetable Upma",
          ingredients: ["Oats", "Vegetables", "Oil", "Spices"],
          calories: 250,
          protein: 8,
          carbs: 40,
          time: "45 mins before workout"
        }
      ],
      evening: [
        {
          name: "Banana with Yogurt",
          ingredients: ["Banana", "Yogurt", "Almonds"],
          calories: 200,
          protein: 10,
          carbs: 30,
          time: "30 mins before workout"
        }
      ]
    },
    "post-workout": {
      morning: [
        {
          name: "Protein Paratha with Eggs",
          ingredients: ["Roti/Chapati", "Eggs", "Vegetables", "Ghee"],
          calories: 420,
          protein: 25,
          carbs: 35,
          time: "Within 30 mins after workout"
        },
        {
          name: "Paneer Bhurji with Roti",
          ingredients: ["Paneer", "Roti/Chapati", "Vegetables", "Oil"],
          calories: 380,
          protein: 22,
          carbs: 30,
          time: "Within 45 mins after workout"
        }
      ],
      afternoon: [
        {
          name: "Chicken Rice Bowl",
          ingredients: ["Rice", "Chicken", "Vegetables", "Dal (Lentils)"],
          calories: 450,
          protein: 35,
          carbs: 40,
          time: "Within 1 hour after workout"
        },
        {
          name: "Dal Rice with Yogurt",
          ingredients: ["Rice", "Dal (Lentils)", "Yogurt", "Ghee"],
          calories: 400,
          protein: 20,
          carbs: 55,
          time: "Within 45 mins after workout"
        }
      ],
      evening: [
        {
          name: "Egg Curry with Rice",
          ingredients: ["Eggs", "Rice", "Onions", "Tomatoes", "Oil"],
          calories: 420,
          protein: 24,
          carbs: 45,
          time: "Within 1 hour after workout"
        }
      ]
    },
    regular: {
      morning: [
        {
          name: "Poha with Vegetables",
          ingredients: ["Rice", "Vegetables", "Oil", "Spices"],
          calories: 250,
          protein: 6,
          carbs: 45,
          time: "Breakfast"
        }
      ],
      afternoon: [
        {
          name: "Complete Dal Rice Thali",
          ingredients: ["Rice", "Dal (Lentils)", "Vegetables", "Roti/Chapati", "Yogurt"],
          calories: 520,
          protein: 25,
          carbs: 70,
          time: "Lunch"
        }
      ],
      evening: [
        {
          name: "Vegetable Curry with Rice",
          ingredients: ["Rice", "Vegetables", "Dal (Lentils)", "Oil"],
          calories: 380,
          protein: 15,
          carbs: 60,
          time: "Dinner"
        }
      ]
    }
  };

  const getCurrentRecommendations = () => {
    if (!mealType || !timeOfDay) return [];
    return mealRecommendations[mealType][timeOfDay] || [];
  };

  const getFilteredRecommendations = () => {
    const recommendations = getCurrentRecommendations();
    return recommendations.filter(meal => 
      meal.ingredients.some(ingredient => availableIngredients.includes(ingredient))
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">What should I eat?</h2>
        <p className="text-muted-foreground">Choose your meal type</p>
      </div>

      <div className="space-y-3">
        {[
          { id: "pre-workout", label: "Pre-Workout", icon: Zap, desc: "Fuel your workout" },
          { id: "post-workout", label: "Post-Workout", icon: ChefHat, desc: "Recovery nutrition" },
          { id: "regular", label: "Regular Meal", icon: Utensils, desc: "Daily nutrition" }
        ].map(({ id, label, icon: Icon, desc }) => (
          <Card
            key={id}
            className={cn(
              "p-4 cursor-pointer transition-all duration-normal hover:shadow-md",
              mealType === id && "ring-2 ring-primary bg-primary/5"
            )}
            onClick={() => setMealType(id as any)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{label}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button 
        onClick={() => setStep(2)} 
        disabled={!mealType}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">When are you eating?</h2>
        <p className="text-muted-foreground">This helps us recommend the right portion</p>
      </div>

      <div className="space-y-3">
        {[
          { id: "morning", label: "Morning", time: "6 AM - 11 AM" },
          { id: "afternoon", label: "Afternoon", time: "12 PM - 5 PM" },
          { id: "evening", label: "Evening", time: "6 PM - 10 PM" }
        ].map(({ id, label, time }) => (
          <Card
            key={id}
            className={cn(
              "p-4 cursor-pointer transition-all duration-normal hover:shadow-md",
              timeOfDay === id && "ring-2 ring-primary bg-primary/5"
            )}
            onClick={() => setTimeOfDay(id as any)}
          >
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">{label}</h3>
                <p className="text-sm text-muted-foreground">{time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={() => setStep(3)} 
          disabled={!timeOfDay}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">What's available?</h2>
        <p className="text-muted-foreground">Select ingredients you have at home</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {ingredients.map((ingredient) => (
          <Badge
            key={ingredient}
            variant={availableIngredients.includes(ingredient) ? "default" : "outline"}
            className={cn(
              "p-3 cursor-pointer justify-center transition-all duration-normal",
              availableIngredients.includes(ingredient) && "bg-primary text-white"
            )}
            onClick={() => {
              setAvailableIngredients(prev => 
                prev.includes(ingredient) 
                  ? prev.filter(i => i !== ingredient)
                  : [...prev, ingredient]
              );
            }}
          >
            {ingredient}
          </Badge>
        ))}
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={() => setStep(4)} 
          disabled={availableIngredients.length === 0}
          className="flex-1"
        >
          Get Recommendations
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => {
    const recommendations = getFilteredRecommendations();

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Your Meal Options</h2>
          <p className="text-muted-foreground">Based on your preferences and available ingredients</p>
        </div>

        {recommendations.length === 0 ? (
          <Card className="p-6 text-center">
            <Apple className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">No matches found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try selecting more ingredients or go back to change your preferences.
            </p>
            <Button variant="outline" onClick={() => setStep(3)}>
              Update Ingredients
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {recommendations.map((meal, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-foreground">{meal.name}</h3>
                    <p className="text-sm text-primary">{meal.time}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {meal.ingredients.map((ingredient) => (
                      <Badge 
                        key={ingredient} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {ingredient}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-3 bg-gradient-card rounded-lg border border-border/50 hover-highlight touch-highlight">
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">{meal.calories}</p>
                      <p className="text-xs text-muted-foreground">Calories</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-secondary">{meal.protein}g</p>
                      <p className="text-xs text-muted-foreground">Protein</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-success">{meal.carbs}g</p>
                      <p className="text-xs text-muted-foreground">Carbs</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => saveMeal(meal)}
                    className="flex-1"
                  >
                    Save Meal
                  </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteMeal(index)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Button variant="outline" onClick={() => setStep(1)} className="w-full">
          Plan Another Meal
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
          <h1 className="font-bold text-foreground">Meal Plans</h1>
          <p className="text-xs text-muted-foreground">Step {step} of 4</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Quick Food Section */}
        <div className="mb-6">
          <Button
            size="lg"
            className="w-full h-14 bg-gradient-primary text-primary-foreground shadow-selected hover:shadow-glow transition-all duration-slow hover:scale-105"
            onClick={() => {
              // Navigate to Quick Food section
              window.history.pushState({}, '', '/quick-food');
              window.dispatchEvent(new CustomEvent('navigate-to-quick-food'));
            }}
          >
            <Clock className="w-5 h-5 mr-2" />
            <div className="flex flex-col">
              <span className="text-lg font-medium">Quick Food</span>
              <span className="text-xs opacity-90">
                {(() => {
                  const hour = new Date().getHours();
                  if (hour >= 5 && hour < 11) return "Morning suggestions";
                  if (hour >= 11 && hour < 16) return "Afternoon ideas";
                  if (hour >= 16 && hour < 19) return "Evening snacks";
                  return "Night options";
                })()}
              </span>
            </div>
          </Button>
        </div>

        <div className="max-w-md mx-auto">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>
      </div>
    </div>
  );
};

export default MealPlan;