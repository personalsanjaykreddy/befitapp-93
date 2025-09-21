import { useState } from "react";
import { 
  Home, 
  Dumbbell, 
  Utensils, 
  Brain,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  isActive?: boolean;
  onSelect?: (id: string) => void;
}

const NavItem = ({ id, label, icon: Icon, isActive, onSelect }: NavItemProps) => {
  return (
    <button
      onClick={() => onSelect?.(id)}
      className={cn(
        "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-normal min-w-0 flex-1 group",
        "hover:bg-accent/50 active:scale-95 hover:scale-110",
        isActive && [
          "bg-gradient-selected text-primary",
          "shadow-sm scale-110"
        ]
      )}
    >
      <div className={cn(
        "relative mb-1 transition-all duration-normal group-hover:animate-bounce-gentle",
        isActive && "animate-bounce-gentle scale-110"
      )}>
        <Icon className={cn(
          "w-5 h-5 transition-colors duration-normal",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
        )} />
        {isActive && (
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg animate-glow-pulse" />
        )}
      </div>
      <span className={cn(
        "text-xs font-medium transition-colors duration-normal",
        isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
      )}>
        {label}
      </span>
    </button>
  );
};

interface BottomNavigationProps {
  onNavigate?: (section: string) => void;
}

const BottomNavigation = ({ onNavigate }: BottomNavigationProps) => {
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home
    },
    {
      id: "workouts",
      label: "Workouts",
      icon: Dumbbell
    },
    {
      id: "meals",
      label: "Meals",
      icon: Utensils
    },
    {
      id: "mental-health",
      label: "Mental",
      icon: Brain
    },
    {
      id: "others",
      label: "More",
      icon: MoreHorizontal
    }
  ];

  const handleTabSelect = (id: string) => {
    setActiveTab(id);
    onNavigate?.(id);
  };

  return (
    <nav className="relative bg-background/95 backdrop-blur-md border-t border-border/50 px-2 py-2 animate-slide-up shadow-lg">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/98 to-background/90" />
      
      {/* Navigation Items */}
      <div className="relative flex items-center justify-between gap-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            isActive={activeTab === item.id}
            onSelect={handleTabSelect}
          />
        ))}
      </div>
      
      {/* Active Tab Indicator */}
      <div className={cn(
        "absolute bottom-0 left-0 h-1 bg-gradient-primary transition-all duration-slow rounded-full shadow-glow",
        activeTab === "home" && "w-1/5 transform translate-x-0",
        activeTab === "workouts" && "w-1/5 transform translate-x-full",
        activeTab === "meals" && "w-1/5 transform translate-x-[200%]",
        activeTab === "mental-health" && "w-1/5 transform translate-x-[300%]",
        activeTab === "others" && "w-1/5 transform translate-x-[400%]"
      )} />
    </nav>
  );
};

export default BottomNavigation;