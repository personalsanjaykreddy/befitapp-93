import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Search, 
  Dumbbell, 
  Apple, 
  Calculator, 
  User, 
  BookOpen, 
  BarChart3, 
  Activity, 
  Heart, 
  Target, 
  Brain, 
  Users, 
  MapPin, 
  Camera, 
  TrendingUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface SearchResultsProps {
  onBack: () => void;
  onNavigateToWorkoutPlan: () => void;
  onNavigateToMealPlan: () => void;
  onNavigateToEnergyCalc: () => void;
  onNavigateToProfile: () => void;
  onNavigateToNotepad: () => void;
  onNavigateToAnalytics: () => void;
}

const APP_FEATURES = [
  { 
    name: "Workout Plans", 
    icon: Dumbbell, 
    description: "Personalized exercise routines",
    action: "onNavigateToWorkoutPlan",
    category: "Fitness"
  },
  { 
    name: "Meal Plans", 
    icon: Apple, 
    description: "Nutrition tracking & meal planning",
    action: "onNavigateToMealPlan",
    category: "Nutrition"
  },
  { 
    name: "Energy Calculator", 
    icon: Calculator, 
    description: "Track calories & energy balance",
    action: "onNavigateToEnergyCalc",
    category: "Analytics"
  },
  { 
    name: "Personal Profile", 
    icon: User, 
    description: "Manage your fitness profile",
    action: "onNavigateToProfile",
    category: "Profile"
  },
  { 
    name: "Fitness Analytics", 
    icon: BarChart3, 
    description: "Track your progress & metrics",
    action: "onNavigateToAnalytics",
    category: "Analytics"
  },
  { 
    name: "Notes & Goals", 
    icon: BookOpen, 
    description: "Personal notes & goal tracking",
    action: "onNavigateToNotepad",
    category: "Planning"
  },
  { 
    name: "AI Coach", 
    icon: Brain, 
    description: "Personalized AI fitness guidance",
    action: "ai-coach",
    category: "AI"
  },
  { 
    name: "Pose Detection", 
    icon: Camera, 
    description: "Real-time form correction",
    action: "pose-detection",
    category: "AI"
  },
  { 
    name: "Habit Tracker", 
    icon: Target, 
    description: "Build & maintain healthy habits",
    action: "habits",
    category: "Habits"
  },
  { 
    name: "Mental Health", 
    icon: Heart, 
    description: "Wellness & mindfulness tools",
    action: "mental-health",
    category: "Wellness"
  },
  { 
    name: "Social Competitions", 
    icon: Users, 
    description: "Compete with friends",
    action: "social",
    category: "Social"
  },
  { 
    name: "Local Experiences", 
    icon: MapPin, 
    description: "Find nearby fitness activities",
    action: "local-experiences",
    category: "Community"
  }
];

const SearchResults = ({ 
  onBack, 
  onNavigateToWorkoutPlan,
  onNavigateToMealPlan,
  onNavigateToEnergyCalc,
  onNavigateToProfile,
  onNavigateToNotepad,
  onNavigateToAnalytics
}: SearchResultsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFeatures, setShowFeatures] = useState(true);

  useEffect(() => {
    setShowFeatures(searchQuery.trim() === "");
  }, [searchQuery]);

  const categories = ["All", "Fitness", "Nutrition", "Analytics", "Wellness", "AI", "Social", "Community"];

  const actionMap: Record<string, () => void> = {
    onNavigateToWorkoutPlan,
    onNavigateToMealPlan, 
    onNavigateToEnergyCalc,
    onNavigateToProfile,
    onNavigateToNotepad,
    onNavigateToAnalytics
  };

  const handleFeatureClick = (feature: typeof APP_FEATURES[0]) => {
    if (actionMap[feature.action]) {
      actionMap[feature.action]();
    } else {
      // Navigate to other features
      window.dispatchEvent(new CustomEvent(`navigate-to-${feature.action}`));
    }
  };

  const filteredFeatures = APP_FEATURES.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || feature.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col h-screen bg-gradient-hero">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:scale-110 transition-transform duration-normal">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Search</h1>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search features, workouts, meals..."
            className="pl-10 h-12 bg-card/50 border-border/50 rounded-xl"
            autoFocus
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap hover:scale-105 transition-transform duration-normal"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* App Features */}
        {showFeatures && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              App Features
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {APP_FEATURES.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card 
                    key={index}
                    className="p-4 bg-gradient-card border-border/50 hover:shadow-selected hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
                    onClick={() => handleFeatureClick(feature)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{feature.name}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                      <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {feature.category}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Search Results */}
        {!showFeatures && (
          <div className="space-y-3">
            {filteredFeatures.length > 0 ? (
              filteredFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card 
                    key={index}
                    className="p-4 bg-gradient-card border-border/50 hover:shadow-selected hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
                    onClick={() => handleFeatureClick(feature)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{feature.name}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                      <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {feature.category}
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                <p className="text-sm text-muted-foreground mt-2">Try different keywords or browse categories</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;