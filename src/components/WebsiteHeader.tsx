import { Search, User, Home, Dumbbell, Utensils, Brain, MoreHorizontal } from "lucide-react";
import { getTimeBasedGreeting, getDisplayName } from "@/utils/time";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

interface WebsiteHeaderProps {
  userName?: string;
}

const WebsiteHeader = ({ userName }: WebsiteHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const greeting = getTimeBasedGreeting();
  const displayName = userName ? getDisplayName(userName) : undefined;
  const userPhoto = localStorage.getItem('userPhoto');

  const navItems = [
    { id: "/", label: "Home", icon: Home },
    { id: "/workouts", label: "Workouts", icon: Dumbbell },
    { id: "/meals", label: "Meals", icon: Utensils },
    { id: "/mental-health", label: "Mental Health", icon: Brain },
    { id: "/more", label: "More", icon: MoreHorizontal }
  ];

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo & Greeting */}
          <div className="flex items-center gap-6">
            <div className="hover:scale-110 hover:shadow-glow transition-all duration-normal cursor-pointer">
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                StartFit
              </span>
            </div>
            
            {displayName && (
              <span className="text-sm text-muted-foreground hidden lg:block">
                {greeting}, {displayName}!
              </span>
            )}
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => navigate(item.id)}
                  className={cn(
                    "gap-2 transition-all duration-normal",
                    isActive && "bg-gradient-primary text-primary-foreground shadow-md"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* Right Side - Search & Profile */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative w-48 hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 h-9 bg-card/50 border-border/50 rounded-lg text-sm cursor-pointer hover:shadow-md transition-all"
                onClick={() => navigate('/search')}
                readOnly
              />
            </div>

            {/* Search Icon for Mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/search')}
              className="lg:hidden"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Profile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
              className="hover:scale-110 transition-transform duration-normal"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={userPhoto || ""} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-2 mt-4 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item.id)}
                className={cn(
                  "gap-2 flex-shrink-0",
                  isActive && "bg-gradient-primary text-primary-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default WebsiteHeader;
