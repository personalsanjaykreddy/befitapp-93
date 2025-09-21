import { useState } from "react";
import { 
  Calendar, 
  Utensils, 
  UserPlus, 
  Calculator, 
  NotebookPen, 
  User,
  Play,
  Clock,
  Target,
  TrendingUp,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  stats?: string;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onNavigate?: (id: string) => void;
}

const BentoCard = ({ 
  id, 
  title, 
  description, 
  icon: Icon, 
  gradient, 
  stats, 
  isSelected, 
  onSelect,
  onNavigate 
}: BentoCardProps) => {
  return (
    <div
      onClick={() => {
        onSelect?.(id);
        onNavigate?.(id);
      }}
      className={cn(
        "relative group cursor-pointer rounded-lg p-4 transition-all duration-slow hover-highlight touch-highlight",
        "bg-gradient-card border border-border/50 shadow-sm hover:shadow-glow",
        "transform hover:scale-[1.05] active:scale-[0.95]",
        isSelected && [
          "scale-[1.08] shadow-selected bg-gradient-selected",
          "border-primary/30 animate-scale-selected"
        ]
      )}
    >
      {/* Background Glow Effect */}
      {isSelected && (
        <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-10 animate-glow-pulse" />
      )}
      
      {/* Icon Container */}
      <div className={cn(
        "w-10 h-10 rounded-lg mb-3 flex items-center justify-center transition-all duration-normal",
        gradient,
        "group-hover:scale-125 group-hover:animate-bounce-gentle",
        isSelected && "scale-125 animate-bounce-gentle"
      )}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      
      {/* Content */}
      <div className="space-y-1">
        <h3 className={cn(
          "font-semibold text-sm text-card-foreground transition-colors duration-normal",
          isSelected ? "text-primary" : "group-hover:text-primary"
        )}>
          {title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
        {stats && (
          <p className={cn(
            "text-xs font-medium mt-2 transition-colors duration-normal",
            isSelected ? "text-secondary" : "text-primary group-hover:text-secondary"
          )}>
            {stats}
          </p>
        )}
      </div>
      
      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background animate-scale-in shadow-glow" />
      )}
    </div>
  );
};

interface BentoGridProps {
  onNavigateToWorkoutPlan?: () => void;
  onNavigateToMealPlan?: () => void;
  onNavigateToEnergyCalc?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToNotepad?: () => void;
  onNavigateToAnalytics?: () => void;
}

const BentoGrid = ({ onNavigateToWorkoutPlan, onNavigateToMealPlan, onNavigateToEnergyCalc, onNavigateToProfile, onNavigateToNotepad, onNavigateToAnalytics }: BentoGridProps = {}) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = [
    {
      id: "workout-plan",
      title: "Workout Plan",
      description: "Create and follow personalized workout routines",
      icon: Calendar,
      gradient: "bg-gradient-to-br from-primary to-primary-glow",
      stats: "15 plans created"
    },
    {
      id: "energy-calc",
      title: "Energy Calculator",
      description: "Calculate calories and get nutrition recommendations",
      icon: Calculator,
      gradient: "bg-gradient-to-br from-secondary to-secondary-glow",
      stats: "Daily: 2,150 cal"
    },
    {
      id: "meals",
      title: "Meal Plans",
      description: "Discover healthy recipes and nutrition tracking",
      icon: Utensils,
      gradient: "bg-gradient-to-br from-success to-emerald-400",
      stats: "28 recipes saved"
    },
    {
      id: "find-friends",
      title: "Find Friends & Coaches",
      description: "Connect with nearby friends and fitness coaches",
      icon: Users,
      gradient: "bg-gradient-to-br from-warning to-orange-400",
      stats: "23 friends nearby"
    },
    {
      id: "notepad",
      title: "Notes & To-Do",
      description: "Keep track of tasks and workout notes",
      icon: NotebookPen,
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
      stats: "3 active tasks"
    },
    {
      id: "analytics",
      title: "Fitness Analytics",
      description: "View all your health metrics in one place",
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      stats: "Live tracking"
    },
    {
      id: "profile",
      title: "Profile",
      description: "View your progress and achievements",
      icon: User,
      gradient: "bg-gradient-to-br from-pink-500 to-pink-600",
      stats: "Level 12 Athlete"
    }
  ];

  return (
    <div className="p-4 pb-2">
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground mb-1">Quick Actions</h2>
        <p className="text-sm text-muted-foreground">Choose your fitness activity</p>
      </div>
      
      {/* Bento Grid */}
      <div className="grid grid-cols-2 gap-4 animate-fade-in">
        {cards.map((card) => (
          <BentoCard
            key={card.id}
            {...card}
            isSelected={selectedCard === card.id}
            onSelect={setSelectedCard}
            onNavigate={(id) => {
              if (id === "workout-plan") onNavigateToWorkoutPlan?.();
              else if (id === "meals") onNavigateToMealPlan?.();
              else if (id === "energy-calc") onNavigateToEnergyCalc?.();
              else if (id === "profile") onNavigateToProfile?.();
              else if (id === "notepad") onNavigateToNotepad?.();
              else if (id === "analytics") onNavigateToAnalytics?.();
              else if (id === "find-friends") {
                window.dispatchEvent(new CustomEvent('navigate-to-find-friends'));
              }
            }}
          />
        ))}
      </div>
      
      {/* Quick Stats Bar */}
      <div className="mt-4 p-3 rounded-lg bg-gradient-card border border-border/50 hover:shadow-md hover:scale-[1.02] transition-all duration-normal cursor-pointer">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-primary">
            <Play className="w-3 h-3" />
            <span className="font-medium">2.3k</span>
            <span className="text-muted-foreground">activities</span>
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <Clock className="w-3 h-3" />
            <span className="font-medium">147h</span>
            <span className="text-muted-foreground">this month</span>
          </div>
          <div className="flex items-center gap-1 text-success">
            <Target className="w-3 h-3" />
            <span className="font-medium">89%</span>
            <span className="text-muted-foreground">goal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;