import { useState } from "react";
import { 
  Settings, 
  Shield, 
  HelpCircle, 
  Star, 
  Share2, 
  Bell, 
  Smartphone,
  Brain,
  Users,
  Target,
  Camera,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface OthersSectionProps {
  onBack: () => void;
  onNavigateToPrivacy: () => void;
  onNavigateToBiomechanics: () => void;
  onNavigateToSocial: () => void;
  onNavigateToHabits: () => void;
  onNavigateToPoseDetection: () => void;
  onNavigateToWearableSync: () => void;
  onNavigateToSmartNutrition: () => void;
  onNavigateToLocalExperiences: () => void;
  onNavigateToAICoach: () => void;
}

const OthersSection = ({ 
  onBack, 
  onNavigateToPrivacy,
  onNavigateToBiomechanics,
  onNavigateToSocial,
  onNavigateToHabits,
  onNavigateToPoseDetection,
  onNavigateToWearableSync,
  onNavigateToSmartNutrition,
  onNavigateToLocalExperiences,
  onNavigateToAICoach
}: OthersSectionProps) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const advancedFeatures = [
    {
      id: "ai-coach",
      title: "AI Coach",
      description: "Personalized fitness guidance",
      icon: Brain,
      color: "bg-primary/20 text-primary",
      action: onNavigateToAICoach
    },
    {
      id: "pose-detection",
      title: "AI Form Coach",
      description: "Real-time pose correction",
      icon: Camera,
      color: "bg-secondary/20 text-secondary",
      action: onNavigateToPoseDetection
    },
    {
      id: "biomechanics",
      title: "Biomechanics Lab",
      description: "Movement pattern analysis",
      icon: Target,
      color: "bg-success/20 text-success",
      action: onNavigateToBiomechanics
    },
    {
      id: "social",
      title: "Social Competitions",
      description: "Compete with friends",
      icon: Users,
      color: "bg-warning/20 text-warning",
      action: onNavigateToSocial
    },
    {
      id: "habits",
      title: "Habit Builder",
      description: "Build lasting micro-habits",
      icon: Zap,
      color: "bg-purple-500/20 text-purple-600",
      action: onNavigateToHabits
    },
    {
      id: "wearable",
      title: "Device Sync",
      description: "Connect wearables & equipment",
      icon: Smartphone,
      color: "bg-cyan-500/20 text-cyan-600",
      action: onNavigateToWearableSync
    },
    {
      id: "nutrition",
      title: "Smart Nutrition",
      description: "AI-powered meal planning",
      icon: Zap,
      color: "bg-green-500/20 text-green-600",
      action: onNavigateToSmartNutrition
    },
    {
      id: "local",
      title: "Local Experiences",
      description: "Find nearby classes & coaches",
      icon: Users,
      color: "bg-pink-500/20 text-pink-600",
      action: onNavigateToLocalExperiences
    }
  ];

  const settingsOptions = [
    {
      id: "notifications",
      title: "Notifications",
      description: "Push notifications and reminders",
      icon: Bell,
      hasSwitch: true,
      value: notifications,
      onChange: setNotifications
    },
    {
      id: "privacy",
      title: "Privacy Center",
      description: "Data privacy and security settings",
      icon: Shield,
      action: onNavigateToPrivacy
    },
    {
      id: "help",
      title: "Help & Support",
      description: "Get help and contact support",
      icon: HelpCircle
    },
    {
      id: "rate",
      title: "Rate App",
      description: "Rate us on the app store",
      icon: Star
    },
    {
      id: "share",
      title: "Share App",
      description: "Share with friends and family",
      icon: Share2
    }
  ];

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">More Features</h1>
            <p className="text-sm text-muted-foreground">Advanced tools and settings</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            Back
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Advanced Features */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-glow hover:scale-[1.01] transition-all duration-slow cursor-pointer">
          <h3 className="font-semibold text-foreground mb-3">Advanced Features</h3>
          <div className="grid grid-cols-2 gap-3">
            {advancedFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  onClick={feature.action}
                  className="flex flex-col items-center p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.05] transition-all duration-normal cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 group-hover:animate-bounce-gentle ${feature.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h4 className="font-medium text-foreground text-center text-sm group-hover:text-primary transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md transition-all duration-normal">
          <h3 className="font-semibold text-foreground mb-3">Settings & Support</h3>
          <div className="space-y-3">
            {settingsOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <div
                  key={option.id}
                  onClick={option.action}
                  className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:animate-bounce-gentle transition-colors">
                      <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {option.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                  
                  {option.hasSwitch ? (
                    <Switch
                      checked={option.value}
                      onCheckedChange={option.onChange}
                      className="data-[state=checked]:bg-primary"
                    />
                  ) : (
                    <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                      Open
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* App Info */}
        <Card className="p-3 bg-muted/50 border border-border/30 hover:bg-muted/70 hover:scale-[1.01] transition-all duration-normal cursor-pointer">
          <div className="text-center">
            <h4 className="text-sm font-medium text-foreground mb-1">FitnessMap v2.0</h4>
            <p className="text-xs text-muted-foreground">
              Your complete fitness companion with AI-powered features
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OthersSection;