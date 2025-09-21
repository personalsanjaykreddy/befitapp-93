import { useState } from "react";
import { ArrowLeft, Clock, Utensils, Droplets, Coffee, Moon, Sun, Sunset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface QuickFoodProps {
  onBack: () => void;
}

const QuickFood = ({ onBack }: QuickFoodProps) => {
  const hour = new Date().getHours();
  
  const getCurrentTimeOfDay = () => {
    if (hour >= 5 && hour < 11) return "morning";
    if (hour >= 11 && hour < 16) return "afternoon";
    if (hour >= 16 && hour < 19) return "evening";
    return "night";
  };

  const timeOfDay = getCurrentTimeOfDay();

  const quickRecommendations = {
    morning: {
      icon: Sun,
      label: "Morning Fuel",
      foods: [
        { name: "Banana & Oats", type: "food", time: "5 mins", energy: "Quick Energy" },
        { name: "Greek Yogurt Bowl", type: "food", time: "3 mins", energy: "Protein Rich" },
        { name: "Peanut Butter Toast", type: "food", time: "4 mins", energy: "Sustained Energy" }
      ],
      liquids: [
        { name: "Green Tea", type: "liquid", time: "2 mins", benefit: "Antioxidants" },
        { name: "Lemon Water", type: "liquid", time: "1 min", benefit: "Hydration" },
        { name: "Protein Smoothie", type: "liquid", time: "5 mins", benefit: "Recovery" }
      ]
    },
    afternoon: {
      icon: Sun,
      label: "Midday Boost",
      foods: [
        { name: "Mixed Nuts", type: "food", time: "0 mins", energy: "Brain Food" },
        { name: "Apple & Almonds", type: "food", time: "1 min", energy: "Natural Sugar" },
        { name: "Whole Grain Crackers", type: "food", time: "2 mins", energy: "Fiber Rich" }
      ],
      liquids: [
        { name: "Coconut Water", type: "liquid", time: "0 mins", benefit: "Electrolytes" },
        { name: "Herbal Tea", type: "liquid", time: "3 mins", benefit: "Calm Focus" },
        { name: "Fresh Juice", type: "liquid", time: "2 mins", benefit: "Vitamins" }
      ]
    },
    evening: {
      icon: Sunset,
      label: "Evening Snack",
      foods: [
        { name: "Dark Chocolate", type: "food", time: "0 mins", energy: "Mood Boost" },
        { name: "Berries & Yogurt", type: "food", time: "2 mins", energy: "Antioxidants" },
        { name: "Hummus & Veggies", type: "food", time: "3 mins", energy: "Protein & Fiber" }
      ],
      liquids: [
        { name: "Chamomile Tea", type: "liquid", time: "5 mins", benefit: "Relaxation" },
        { name: "Warm Milk", type: "liquid", time: "3 mins", benefit: "Sleep Aid" },
        { name: "Tart Cherry Juice", type: "liquid", time: "0 mins", benefit: "Natural Melatonin" }
      ]
    },
    night: {
      icon: Moon,
      label: "Light Night Bites",
      foods: [
        { name: "Handful of Walnuts", type: "food", time: "0 mins", energy: "Healthy Fats" },
        { name: "Cottage Cheese", type: "food", time: "1 min", energy: "Casein Protein" },
        { name: "Kiwi Fruit", type: "food", time: "2 mins", energy: "Sleep Support" }
      ],
      liquids: [
        { name: "Golden Milk", type: "liquid", time: "5 mins", benefit: "Anti-inflammatory" },
        { name: "Peppermint Tea", type: "liquid", time: "4 mins", benefit: "Digestive Aid" },
        { name: "Water with Magnesium", type: "liquid", time: "1 min", benefit: "Muscle Relaxation" }
      ]
    }
  };

  const currentRecommendations = quickRecommendations[timeOfDay];
  const Icon = currentRecommendations.icon;

  return (
    <div className="flex flex-col h-screen bg-gradient-hero">
      {/* Header */}
      <div className="flex items-center p-4 bg-background/95 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-bold text-foreground">Quick Food</h1>
          <p className="text-xs text-muted-foreground">
            Fast food and drink suggestions for {timeOfDay}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Time-based Header */}
        <Card className="p-4 text-center">
          <Icon className="w-12 h-12 text-primary mx-auto mb-2" />
          <h2 className="text-xl font-bold text-foreground mb-1">{currentRecommendations.label}</h2>
          <p className="text-sm text-muted-foreground">
            Perfect for {timeOfDay} time • {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </p>
        </Card>

        {/* Food Suggestions */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Utensils className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Quick Food Ideas</h3>
          </div>
          
          <div className="space-y-3">
            {currentRecommendations.foods.map((food, index) => (
              <div key={index} className="p-3 bg-gradient-card rounded-lg border border-border/50 hover-highlight touch-highlight">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{food.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {food.time}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {food.energy}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Liquid Suggestions */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-foreground">Drink Suggestions</h3>
          </div>
          
          <div className="space-y-3">
            {currentRecommendations.liquids.map((liquid, index) => (
              <div key={index} className="p-3 bg-gradient-card rounded-lg border border-border/50 hover-highlight touch-highlight">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{liquid.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {liquid.time}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs text-blue-600">
                    {liquid.benefit}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Tip */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <h3 className="text-sm font-semibold text-foreground mb-2">💡 Quick Tip</h3>
          <p className="text-sm text-muted-foreground">
            {timeOfDay === "morning" && "Start your day with hydration - drink a glass of water before anything else!"}
            {timeOfDay === "afternoon" && "Avoid heavy meals that can cause energy dips. Light, nutrient-dense snacks work best."}
            {timeOfDay === "evening" && "Choose foods that support relaxation and don't interfere with sleep quality."}
            {timeOfDay === "night" && "Keep it light and avoid caffeine. Your body needs to wind down for quality sleep."}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default QuickFood;