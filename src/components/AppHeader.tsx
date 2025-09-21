import { Search, User } from "lucide-react";
import { getTimeBasedGreeting, getShortMotivationalLine, getDisplayName, checkAndAskForNickname } from "@/utils/time";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppHeaderProps {
  userName?: string;
  onOpenProfile?: () => void;
}

const AppHeader = ({ userName, onOpenProfile }: AppHeaderProps) => {
  const greeting = getTimeBasedGreeting();
  const shortMotivationalLine = getShortMotivationalLine();
  const displayName = userName ? getDisplayName(userName) : undefined;
  
  // Check if name is too long and ask for nickname
  if (userName && userName !== displayName) {
    checkAndAskForNickname(userName);
  }
  
  const userPhoto = localStorage.getItem('userPhoto');

  return (
    <div className="space-y-3">
      <header className="bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-3 shadow-sm">
        {/* Mobile Layout */}
        <div className="flex items-center justify-between gap-4 md:hidden">
          {/* Profile - Left Side */}
          <div className="flex items-center gap-3 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onOpenProfile}
              className="hover:scale-110 transition-transform duration-normal flex-shrink-0"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={userPhoto || ""} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground animate-pulse">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
            
            {/* Greeting with name - 3 lines beside profile */}
            <div className="flex flex-col justify-center h-8">
              <div className="text-xs font-medium text-foreground leading-none">Good</div>
              <div className="text-xs font-medium text-foreground leading-none">{greeting.split(' ')[1]}</div>
              {displayName && <div className="text-xs font-medium text-foreground leading-none">{displayName}</div>}
            </div>
          </div>

        {/* StartFit Logo - Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="hover:scale-110 hover:shadow-glow transition-all duration-normal cursor-pointer">
            <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              StartFit
            </span>
          </div>
        </div>

        {/* Search - Right Side */}
        <div className="flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-search'));
            }}
            className="hover:scale-110 transition-transform duration-normal"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>

        {/* Desktop/iPad Layout */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {/* Profile - Left Side */}
          <div className="flex items-center gap-3 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onOpenProfile}
              className="hover:scale-110 transition-transform duration-normal"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={userPhoto || ""} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground animate-pulse">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
            
            {/* Greeting with name - Single line for desktop */}
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-medium text-foreground truncate">
                {greeting}{displayName ? `, ${displayName}` : ''}!
              </span>
            </div>
          </div>

        {/* StartFit Logo - Center */}
        <div className="flex-shrink-0">
          <div className="hover:scale-110 hover:shadow-glow transition-all duration-normal cursor-pointer">
            <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              StartFit
            </span>
          </div>
        </div>

        {/* Search - Right Side */}
        <div className="relative w-48 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 h-9 bg-card/50 border-border/50 rounded-lg text-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-normal"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-search'));
            }}
            readOnly
          />
          </div>
        </div>
      </header>
      
      {/* Motivational Line - Below profile section */}
      <div className="px-4 py-2">
        <p className="text-sm text-primary font-medium animate-fade-in text-center">
          {shortMotivationalLine}
        </p>
      </div>
    </div>
  );
};

export default AppHeader;