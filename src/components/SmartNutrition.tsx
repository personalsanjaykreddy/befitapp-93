import { useState } from "react";
import { ShoppingCart, MapPin, DollarSign, Percent, Clock, Utensils, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SmartNutritionProps {
  onBack: () => void;
}

const SmartNutrition = ({ onBack }: SmartNutritionProps) => {
  const [selectedMealPlan, setSelectedMealPlan] = useState("balanced");
  const [localDeals] = useState([
    {
      id: 1,
      store: "Whole Foods Market",
      discount: 15,
      items: ["Organic Spinach", "Wild Salmon", "Avocados"],
      distance: "0.8 miles",
      validUntil: "Today 8 PM",
      priceMatch: true
    },
    {
      id: 2, 
      store: "Trader Joe's",
      discount: 20,
      items: ["Greek Yogurt", "Quinoa", "Blueberries"],
      distance: "1.2 miles",
      validUntil: "Tomorrow",
      priceMatch: false
    }
  ]);

  const [mealPlans] = useState([
    {
      id: "balanced",
      name: "Balanced Nutrition",
      description: "Well-rounded macros for general fitness",
      calories: 2200,
      protein: 140,
      carbs: 275,
      fat: 73,
      cost: 45,
      cuisinePreference: "Mediterranean"
    },
    {
      id: "muscle-gain", 
      name: "Muscle Building",
      description: "High protein for strength training",
      calories: 2800,
      protein: 210,
      carbs: 315,
      fat: 93,
      cost: 65,
      cuisinePreference: "American"
    },
    {
      id: "fat-loss",
      name: "Fat Loss",
      description: "Caloric deficit with nutrient density",
      calories: 1800,
      protein: 135,
      carbs: 180,
      fat: 60,
      cost: 38,
      cuisinePreference: "Asian"
    }
  ]);

  const [groceryList] = useState([
    {
      category: "Proteins",
      items: [
        { name: "Chicken Breast", quantity: "2 lbs", price: 8.99, deal: false },
        { name: "Wild Salmon", quantity: "1 lb", price: 12.99, deal: true, originalPrice: 15.99 },
        { name: "Greek Yogurt", quantity: "32 oz", price: 4.99, deal: true, originalPrice: 6.99 }
      ]
    },
    {
      category: "Vegetables", 
      items: [
        { name: "Organic Spinach", quantity: "5 oz bag", price: 2.99, deal: true, originalPrice: 3.99 },
        { name: "Sweet Potatoes", quantity: "3 lbs", price: 3.49, deal: false },
        { name: "Broccoli", quantity: "2 heads", price: 2.99, deal: false }
      ]
    },
    {
      category: "Pantry",
      items: [
        { name: "Quinoa", quantity: "2 lbs", price: 7.99, deal: true, originalPrice: 9.99 },
        { name: "Olive Oil", quantity: "16.9 oz", price: 8.99, deal: false },
        { name: "Almonds", quantity: "1 lb", price: 9.99, deal: false }
      ]
    }
  ]);

  const totalCost = groceryList.reduce((total, category) => 
    total + category.items.reduce((categoryTotal, item) => categoryTotal + item.price, 0), 0
  );

  const totalSavings = groceryList.reduce((total, category) =>
    total + category.items.reduce((categoryTotal, item) =>
      categoryTotal + (item.deal && item.originalPrice ? item.originalPrice - item.price : 0), 0
    ), 0
  );

  const selectedPlan = mealPlans.find(plan => plan.id === selectedMealPlan);

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Smart Nutrition</h1>
            <p className="text-sm text-muted-foreground">Personalized meals & smart shopping</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            Back
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Meal Plan Selection */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-glow hover:scale-[1.02] transition-all duration-slow cursor-pointer group">
          <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
            Choose Your Plan
          </h3>
          <div className="grid gap-3">
            {mealPlans.map((plan) => (
              <div
                key={plan.id}
                className={`p-3 rounded-lg border transition-all duration-normal hover:scale-[1.02] cursor-pointer group ${
                  selectedMealPlan === plan.id
                    ? 'bg-primary/10 border-primary/20 hover:bg-primary/20'
                    : 'bg-background/50 border-border/30 hover:bg-background/70 hover:shadow-sm'
                }`}
                onClick={() => setSelectedMealPlan(plan.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {plan.name}
                  </h4>
                  <div className="text-right">
                    <div className="text-sm font-bold text-foreground">${plan.cost}/week</div>
                    <div className="text-xs text-muted-foreground">{plan.calories} cal/day</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-1 bg-primary/10 rounded">
                    <div className="font-medium text-primary">{plan.protein}g</div>
                    <div className="text-muted-foreground">Protein</div>
                  </div>
                  <div className="text-center p-1 bg-secondary/10 rounded">
                    <div className="font-medium text-secondary">{plan.carbs}g</div>
                    <div className="text-muted-foreground">Carbs</div>
                  </div>
                  <div className="text-center p-1 bg-success/10 rounded">
                    <div className="font-medium text-success">{plan.fat}g</div>
                    <div className="text-muted-foreground">Fats</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Local Deals */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md hover:scale-[1.01] transition-all duration-normal cursor-pointer">
          <h3 className="font-semibold text-foreground mb-3">Local Deals & Discounts</h3>
          <div className="space-y-3">
            {localDeals.map((deal) => (
              <div
                key={deal.id}
                className="p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group border border-border/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {deal.store}
                      </h4>
                      <Badge variant="default" className="hover:scale-105 transition-transform">
                        {deal.discount}% OFF
                      </Badge>
                      {deal.priceMatch && (
                        <Badge variant="outline" className="text-xs hover:scale-105 transition-transform">
                          Price Match
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{deal.distance}</span>
                      <Clock className="w-3 h-3" />
                      <span>Valid until {deal.validUntil}</span>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    className="hover:scale-105 hover:shadow-glow transition-all duration-normal"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Shop
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {deal.items.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs hover:scale-105 transition-transform">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Smart Grocery List */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-selected hover:scale-[1.01] transition-all duration-slow cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Smart Grocery List</h3>
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">
                ${totalCost.toFixed(2)}
              </div>
              {totalSavings > 0 && (
                <div className="text-xs text-success">
                  Save ${totalSavings.toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {selectedPlan && (
            <div className="mb-4 p-3 bg-primary/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Optimized for {selectedPlan.name}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {selectedPlan.cuisinePreference} cuisine preference • Budget-friendly options prioritized
              </div>
            </div>
          )}

          <div className="space-y-4">
            {groceryList.map((category) => (
              <div key={category.category}>
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-primary" />
                  {category.category}
                </h4>
                <div className="space-y-2">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-background/50 rounded hover:bg-background/70 hover:scale-[1.01] transition-all duration-normal cursor-pointer group"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </span>
                          {item.deal && (
                            <Badge variant="default" className="text-xs hover:scale-105 transition-transform">
                              Deal
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{item.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">
                          ${item.price}
                        </div>
                        {item.deal && item.originalPrice && (
                          <div className="text-xs text-muted-foreground line-through">
                            ${item.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className="h-12 hover:scale-105 hover:shadow-glow transition-all duration-normal"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
          <Button 
            variant="outline" 
            className="h-12 hover:scale-105 transition-transform"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Store Locator
          </Button>
        </div>

        {/* Price Sensitivity Info */}
        <Card className="p-3 bg-muted/50 border border-border/30 hover:bg-muted/70 hover:scale-[1.01] transition-all duration-normal cursor-pointer">
          <div className="text-center">
            <h4 className="text-sm font-medium text-foreground mb-1">💰 Price-Smart Shopping</h4>
            <p className="text-xs text-muted-foreground">
              Automatically adjusted for local prices and your budget preferences
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SmartNutrition;