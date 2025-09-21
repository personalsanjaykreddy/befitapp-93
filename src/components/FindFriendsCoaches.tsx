import { useState } from "react";
import { Users, MapPin, Star, MessageCircle, UserPlus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface FindFriendsCoachesProps {
  onBack: () => void;
}

const FindFriendsCoaches = ({ onBack }: FindFriendsCoachesProps) => {
  const [activeTab, setActiveTab] = useState<"friends" | "coaches">("friends");
  const [searchQuery, setSearchQuery] = useState("");

  const friends = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      distance: "0.5 miles",
      commonWorkouts: ["Running", "Yoga"],
      streak: 15,
      level: "Intermediate",
      isOnline: true
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "MC",
      distance: "1.2 miles",
      commonWorkouts: ["Weight Training", "HIIT"],
      streak: 8,
      level: "Advanced",
      isOnline: false
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "EW",
      distance: "2.1 miles",
      commonWorkouts: ["Swimming", "Cycling"],
      streak: 22,
      level: "Expert",
      isOnline: true
    }
  ];

  const coaches = [
    {
      id: 1,
      name: "Alex Rodriguez",
      avatar: "AR",
      specialties: ["Personal Training", "Nutrition"],
      rating: 4.9,
      experience: "5 years",
      rate: "$75/hour",
      distance: "1.8 miles",
      certified: true,
      availability: "Available today"
    },
    {
      id: 2,
      name: "Lisa Thompson",
      avatar: "LT",
      specialties: ["Yoga", "Mindfulness", "Flexibility"],
      rating: 5.0,
      experience: "8 years",
      rate: "$60/hour",
      distance: "0.9 miles",
      certified: true,
      availability: "Next week"
    }
  ];

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Find & Connect</h1>
            <p className="text-sm text-muted-foreground">Discover friends and coaches nearby</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            Back
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Search Bar */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md hover:scale-[1.01] transition-all duration-normal cursor-pointer hover-highlight touch-highlight">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, activity, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 hover:shadow-sm transition-all duration-normal"
            />
          </div>
        </Card>

        {/* Tabs */}
        <Card className="p-2 bg-gradient-card border border-border/50 hover:shadow-md transition-all duration-normal">
          <div className="flex gap-1">
            <Button
              variant={activeTab === "friends" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("friends")}
              className="flex-1 hover:scale-105 transition-transform duration-normal hover:shadow-sm"
            >
              <Users className="w-4 h-4 mr-2" />
              Friends ({friends.length})
            </Button>
            <Button
              variant={activeTab === "coaches" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("coaches")}
              className="flex-1 hover:scale-105 transition-transform duration-normal hover:shadow-sm"
            >
              <Star className="w-4 h-4 mr-2" />
              Coaches ({coaches.length})
            </Button>
          </div>
        </Card>

        {/* Friends Tab */}
        {activeTab === "friends" && (
          <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-glow hover:scale-[1.01] transition-all duration-slow cursor-pointer hover-highlight touch-highlight">
            <h3 className="font-semibold text-foreground mb-3">Nearby Fitness Friends</h3>
            <div className="space-y-3">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-3 p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold group-hover:animate-bounce-gentle">
                      {friend.avatar}
                    </div>
                    {friend.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background animate-glow-pulse" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {friend.name}
                      </h4>
                      <Badge variant="outline" className="text-xs hover:scale-105 transition-transform">
                        {friend.level}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{friend.distance}</span>
                      <span>•</span>
                      <span>{friend.streak} day streak</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {friend.commonWorkouts.map((workout, index) => (
                        <Badge key={index} variant="secondary" className="text-xs hover:scale-105 transition-transform">
                          {workout}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="hover:scale-105 hover:shadow-glow transition-all duration-normal">
                      <UserPlus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Coaches Tab */}
        {activeTab === "coaches" && (
          <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-selected hover:scale-[1.01] transition-all duration-slow cursor-pointer">
            <h3 className="font-semibold text-foreground mb-3">Certified Coaches</h3>
            <div className="space-y-3">
              {coaches.map((coach) => (
                <div
                  key={coach.id}
                  className="flex items-start gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group border border-border/30"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center text-secondary-foreground font-semibold group-hover:animate-bounce-gentle">
                    {coach.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {coach.name}
                      </h4>
                      {coach.certified && (
                        <Badge variant="default" className="text-xs hover:scale-105 transition-transform">
                          Certified
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-warning fill-warning" />
                        <span>{coach.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{coach.experience}</span>
                      <span>•</span>
                      <MapPin className="w-3 h-3" />
                      <span>{coach.distance}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {coach.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs hover:scale-105 transition-transform">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-bold text-primary">{coach.rate}</span>
                        <span className="text-muted-foreground ml-2">{coach.availability}</span>
                      </div>
                      <Button size="sm" className="hover:scale-105 hover:shadow-glow transition-all duration-normal">
                        Book Session
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Filter Options */}
        <Card className="p-3 bg-muted/50 border border-border/30 hover:bg-muted/70 hover:scale-[1.01] transition-all duration-normal cursor-pointer">
          <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform">
            <Filter className="w-4 h-4 mr-2" />
            Filter by distance, activity, or availability
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default FindFriendsCoaches;