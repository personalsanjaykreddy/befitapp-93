import { useState } from "react";
import { Brain, Heart, Smile, Moon, Headphones, BookOpen, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface MentalHealthHubProps {
  onBack: () => void;
}

const MentalHealthHub = ({ onBack }: MentalHealthHubProps) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [moodScore, setMoodScore] = useState(7);

  const activities = [
    {
      id: "meditation",
      title: "Guided Meditation",
      description: "5-minute mindfulness session",
      icon: Brain,
      duration: "5 min",
      difficulty: "Beginner",
      color: "bg-primary/20 text-primary"
    },
    {
      id: "breathing",
      title: "Breathing Exercise",
      description: "Deep breathing for relaxation",
      icon: Heart,
      duration: "3 min",
      difficulty: "Beginner",
      color: "bg-success/20 text-success"
    },
    {
      id: "gratitude",
      title: "Gratitude Journal",
      description: "Write 3 things you're grateful for",
      icon: BookOpen,
      duration: "5 min",
      difficulty: "Easy",
      color: "bg-warning/20 text-warning"
    },
    {
      id: "sleep",
      title: "Sleep Stories",
      description: "Calming stories for better sleep",
      icon: Moon,
      duration: "15 min",
      difficulty: "Relaxing",
      color: "bg-secondary/20 text-secondary"
    }
  ];

  const moodOptions = [
    { emoji: "😢", label: "Very Sad", value: 1 },
    { emoji: "😔", label: "Sad", value: 3 },
    { emoji: "😐", label: "Neutral", value: 5 },
    { emoji: "😊", label: "Happy", value: 7 },
    { emoji: "😄", label: "Very Happy", value: 9 }
  ];

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mental Health</h1>
            <p className="text-sm text-muted-foreground">Take care of your mind and soul</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            Back
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Mood Tracker */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-glow hover:scale-[1.02] transition-all duration-slow cursor-pointer group hover-highlight touch-highlight">
          <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
            How are you feeling today?
          </h3>
          
          <div className="flex justify-between items-center mb-4">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setMoodScore(mood.value)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all duration-normal hover:scale-110 ${
                  moodScore === mood.value 
                    ? 'bg-primary/20 scale-110' 
                    : 'hover:bg-accent/50'
                }`}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-xs text-muted-foreground">{mood.label}</span>
              </button>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Your mood score: <span className="font-bold text-primary">{moodScore}/10</span>
            </p>
          </div>
        </Card>

        {/* Mental Health Activities */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md transition-all duration-normal">
          <h3 className="font-semibold text-foreground mb-3">Wellness Activities</h3>
          <div className="space-y-3">
            {activities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
                  onClick={() => setSelectedActivity(activity.id)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle ${activity.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs hover:scale-105 transition-transform">
                        {activity.duration}
                      </Badge>
                      <Badge variant="secondary" className="text-xs hover:scale-105 transition-transform">
                        {activity.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm"
                    className="hover:scale-105 hover:shadow-glow transition-all duration-normal"
                  >
                    Start
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Weekly Progress */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-selected hover:scale-[1.01] transition-all duration-slow cursor-pointer hover-highlight touch-highlight">
          <h3 className="font-semibold text-foreground mb-3">This Week's Progress</h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">Mindfulness Sessions</span>
                <span className="text-primary font-medium">4/7 days</span>
              </div>
              <Progress value={57} className="h-2 hover:h-3 transition-all duration-normal" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">Mood Tracking</span>
                <span className="text-secondary font-medium">6/7 days</span>
              </div>
              <Progress value={86} className="h-2 hover:h-3 transition-all duration-normal" />
            </div>
          </div>
        </Card>

        {/* Support Resources */}
        <Card className="p-4 bg-gradient-selected border border-primary/20 hover:shadow-glow hover:scale-[1.02] transition-all duration-slow cursor-pointer group">
          <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
            Need Support?
          </h3>
          
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform">
              <Users className="w-4 h-4 mr-2" />
              Connect with Community
            </Button>
            <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform">
              <Headphones className="w-4 h-4 mr-2" />
              Talk to a Professional
            </Button>
            <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Check-in
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MentalHealthHub;