import { useState } from "react";
import { MapPin, Calendar, Users, Star, Clock, DollarSign, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface LocalExperiencesProps {
  onBack: () => void;
}

const LocalExperiences = ({ onBack }: LocalExperiencesProps) => {
  const [searchRadius, setSearchRadius] = useState(5);
  const [selectedType, setSelectedType] = useState("all");

  const [localEvents] = useState([
    {
      id: 1,
      title: "Morning Yoga in the Park",
      instructor: "Sarah Johnson",
      type: "class",
      date: "Today, 7:00 AM",
      duration: "60 min",
      price: 15,
      rating: 4.8,
      participants: 12,
      maxParticipants: 20,
      distance: "0.8 miles",
      description: "Energizing vinyasa flow session in beautiful Riverside Park"
    },
    {
      id: 2,
      title: "HIIT Bootcamp Challenge",
      instructor: "Mike Chen",
      type: "bootcamp",
      date: "Tomorrow, 6:00 PM",
      duration: "45 min",
      price: 25,
      rating: 4.9,
      participants: 8,
      maxParticipants: 15,
      distance: "1.2 miles",
      description: "High-intensity interval training with bodyweight exercises"
    },
    {
      id: 3,
      title: "Community Run Club",
      instructor: "Lisa Rodriguez",
      type: "running",
      date: "Saturday, 8:00 AM",
      duration: "90 min",
      price: 0,
      rating: 4.7,
      participants: 25,
      maxParticipants: 50,
      distance: "2.1 miles",
      description: "Weekly 5K group run through downtown trails"
    }
  ]);

  const [coaches] = useState([
    {
      id: 1,
      name: "Alex Thompson",
      specialties: ["Strength Training", "Mobility"],
      rating: 4.9,
      experience: "8 years",
      rate: 75,
      availability: "Available today",
      certified: true,
      distance: "1.5 miles"
    },
    {
      id: 2,
      name: "Maya Patel",
      specialties: ["Yoga", "Mindfulness", "Injury Recovery"],
      rating: 5.0,
      experience: "12 years",
      rate: 90,
      availability: "Next week",
      certified: true,
      distance: "2.3 miles"
    }
  ]);

  const eventTypes = [
    { id: "all", name: "All Events", count: 15 },
    { id: "class", name: "Classes", count: 8 },
    { id: "bootcamp", name: "Bootcamps", count: 4 },
    { id: "running", name: "Running", count: 3 }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-primary/20 text-primary border-primary/30';
      case 'bootcamp': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'running': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Local Fitness</h1>
            <p className="text-sm text-muted-foreground">Discover nearby classes & coaches</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            Back
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Search & Filters */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md hover:scale-[1.01] transition-all duration-normal cursor-pointer">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <Input
                placeholder="Search location or activity..."
                className="flex-1 hover:shadow-sm transition-all duration-normal"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Within:</span>
              <select 
                value={searchRadius}
                onChange={(e) => setSearchRadius(parseInt(e.target.value))}
                className="px-3 py-1 rounded-md border border-border bg-background text-foreground hover:shadow-sm transition-all"
              >
                <option value={1}>1 mile</option>
                <option value={5}>5 miles</option>
                <option value={10}>10 miles</option>
                <option value={25}>25 miles</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Event Type Filters */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-selected hover:scale-[1.01] transition-all duration-slow cursor-pointer">
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.id)}
                className="hover:scale-105 transition-transform duration-normal hover:shadow-md"
              >
                {type.name} ({type.count})
              </Button>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md transition-all duration-normal">
          <h3 className="font-semibold text-foreground mb-3">Upcoming Events</h3>
          <div className="space-y-3">
            {localEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] hover:shadow-lg transition-all duration-normal cursor-pointer group border border-border/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getTypeColor(event.type)} hover:scale-105 transition-transform`}
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{event.distance}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="text-sm font-medium text-foreground">{event.rating}</span>
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {event.participants}/{event.maxParticipants} joined
                    </span>
                    <div className="text-xs text-muted-foreground">
                      by {event.instructor}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="hover:scale-105 transition-transform"
                    >
                      <QrCode className="w-4 h-4 mr-1" />
                      Check In
                    </Button>
                    <Button 
                      size="sm"
                      className="hover:scale-105 hover:shadow-glow transition-all duration-normal"
                    >
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Local Coaches */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-glow hover:scale-[1.01] transition-all duration-slow cursor-pointer">
          <h3 className="font-semibold text-foreground mb-3">Certified Coaches</h3>
          <div className="space-y-3">
            {coaches.map((coach) => (
              <div
                key={coach.id}
                className="flex items-center gap-4 p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold group-hover:animate-bounce-gentle">
                  {coach.name.split(' ').map(n => n[0]).join('')}
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
                  
                  <div className="flex flex-wrap gap-1 mb-1">
                    {coach.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs hover:scale-105 transition-transform">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-warning fill-warning" />
                      <span>{coach.rating}</span>
                    </div>
                    <span>{coach.experience}</span>
                    <span>{coach.distance}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">${coach.rate}/hr</div>
                  <div className="text-xs text-muted-foreground">{coach.availability}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Revenue Share Notice */}
        <Card className="p-3 bg-muted/50 border border-border/30 hover:bg-muted/70 hover:scale-[1.01] transition-all duration-normal cursor-pointer">
          <div className="text-center">
            <h4 className="text-sm font-medium text-foreground mb-1">🤝 Community Partnership</h4>
            <p className="text-xs text-muted-foreground">
              We share revenue with local instructors to support the fitness community
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LocalExperiences;