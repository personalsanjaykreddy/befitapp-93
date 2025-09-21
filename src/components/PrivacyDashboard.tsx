import { useState } from "react";
import { Shield, Eye, Database, Smartphone, CloudOff, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

interface PrivacyDashboardProps {
  onBack: () => void;
}

const PrivacyDashboard = ({ onBack }: PrivacyDashboardProps) => {
  const [privacySettings, setPrivacySettings] = useState({
    onDeviceProcessing: true,
    dataSharing: false,
    analyticsOptIn: true,
    personalizedAds: false,
    researchParticipation: false,
    locationTracking: true,
    biometricData: true,
    thirdPartyIntegrations: false
  });

  const [dataTypes] = useState([
    {
      type: "Fitness Data",
      description: "Workouts, steps, heart rate",
      processing: "On-device only",
      shared: false,
      size: "2.3 MB",
      retention: "Local storage"
    },
    {
      type: "Pose Analysis", 
      description: "Form correction video analysis",
      processing: "On-device AI",
      shared: false,
      size: "0 MB",
      retention: "Not stored"
    },
    {
      type: "Usage Analytics",
      description: "App interaction patterns",
      processing: "Anonymized",
      shared: true,
      size: "0.1 MB",
      retention: "30 days"
    },
    {
      type: "Health Metrics",
      description: "Sleep, recovery, nutrition",
      processing: "Encrypted locally",
      shared: false,
      size: "1.8 MB", 
      retention: "User controlled"
    }
  ]);

  const privacyScore = Object.values(privacySettings).filter(setting => 
    setting === privacySettings.onDeviceProcessing || 
    setting === !privacySettings.dataSharing ||
    setting === !privacySettings.personalizedAds ||
    setting === !privacySettings.thirdPartyIntegrations
  ).length * 12.5;

  const getProcessingBadge = (processing: string) => {
    if (processing.includes("On-device")) {
      return <Badge variant="default" className="text-xs hover:scale-105 transition-transform">🔒 On-Device</Badge>;
    }
    if (processing.includes("Encrypted")) {
      return <Badge variant="outline" className="text-xs hover:scale-105 transition-transform">🔐 Encrypted</Badge>;
    }
    return <Badge variant="secondary" className="text-xs hover:scale-105 transition-transform">☁️ Cloud</Badge>;
  };

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Privacy Center</h1>
            <p className="text-sm text-muted-foreground">Your data, your control</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            Back
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Privacy Score */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-glow hover:scale-[1.02] transition-all duration-slow cursor-pointer group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center group-hover:animate-bounce-gentle">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Privacy Score
              </h3>
              <p className="text-sm text-muted-foreground">
                Based on your privacy settings
              </p>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Privacy Level</span>
              <span className="text-lg font-bold text-primary">{Math.round(privacyScore)}%</span>
            </div>
            <Progress 
              value={privacyScore} 
              className="h-3 hover:h-4 transition-all duration-normal"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-2 bg-success/10 rounded">
              <div className="text-sm font-bold text-success">100%</div>
              <div className="text-xs text-muted-foreground">On-Device Processing</div>
            </div>
            <div className="p-2 bg-primary/10 rounded">
              <div className="text-sm font-bold text-primary">0%</div>
              <div className="text-xs text-muted-foreground">Data Sold</div>
            </div>
          </div>
        </Card>

        {/* Data Processing Overview */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md hover:scale-[1.01] transition-all duration-normal cursor-pointer">
          <h3 className="font-semibold text-foreground mb-3">Your Data Types</h3>
          <div className="space-y-3">
            {dataTypes.map((data, index) => (
              <div
                key={index}
                className="p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group border border-border/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {data.type}
                      </h4>
                      {getProcessingBadge(data.processing)}
                    </div>
                    <p className="text-sm text-muted-foreground">{data.description}</p>
                  </div>
                  
                  <div className="text-right text-xs text-muted-foreground">
                    <div>{data.size}</div>
                    <div className={data.shared ? 'text-warning' : 'text-success'}>
                      {data.shared ? 'Shared' : 'Private'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Processing: {data.processing}</span>
                  <span className="text-muted-foreground">Retention: {data.retention}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Privacy Controls */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-selected hover:scale-[1.01] transition-all duration-slow cursor-pointer">
          <h3 className="font-semibold text-foreground mb-3">Privacy Controls</h3>
          <div className="space-y-4">
            {Object.entries(privacySettings).map(([key, value]) => {
              const labels: Record<string, { title: string; description: string; icon: any }> = {
                onDeviceProcessing: {
                  title: "On-Device Processing",
                  description: "Process AI and analysis locally",
                  icon: Smartphone
                },
                dataSharing: {
                  title: "Data Sharing",
                  description: "Share anonymized data with partners",
                  icon: Users
                },
                analyticsOptIn: {
                  title: "Usage Analytics",
                  description: "Help improve the app experience",
                  icon: Database
                },
                personalizedAds: {
                  title: "Personalized Ads",
                  description: "Show targeted advertisements",
                  icon: Eye
                },
                researchParticipation: {
                  title: "Research Program",
                  description: "Participate in fitness research studies",
                  icon: Shield
                },
                locationTracking: {
                  title: "Location Services",
                  description: "Enable location-based features",
                  icon: Settings
                },
                biometricData: {
                  title: "Biometric Collection",
                  description: "Collect heart rate and health metrics",
                  icon: Database
                },
                thirdPartyIntegrations: {
                  title: "Third-Party Access",
                  description: "Allow external app integrations",
                  icon: CloudOff
                }
              };

              const label = labels[key];
              const IconComponent = label.icon;

              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 hover:bg-background/30 rounded transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {label.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">{label.description}</p>
                    </div>
                  </div>
                  
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => 
                      setPrivacySettings(prev => ({ ...prev, [key]: checked }))
                    }
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Research Program */}
        <Card className="p-4 bg-gradient-selected border border-primary/20 hover:shadow-glow hover:scale-[1.02] transition-all duration-slow cursor-pointer group">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-6 h-6 text-primary group-hover:animate-bounce-gentle" />
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Opt-In Research Program
              </h3>
              <p className="text-sm text-muted-foreground">
                Contribute to fitness science while earning rewards
              </p>
            </div>
          </div>
          
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current studies:</span>
              <span className="font-medium text-foreground">3 available</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Potential earnings:</span>
              <span className="font-medium text-success">$25-50/month</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full hover:scale-105 transition-transform"
            disabled={!privacySettings.researchParticipation}
          >
            {privacySettings.researchParticipation ? 'View Studies' : 'Enable Research First'}
          </Button>
        </Card>

        {/* Data Export */}
        <Card className="p-3 bg-muted/50 border border-border/30 hover:bg-muted/70 hover:scale-[1.01] transition-all duration-normal cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-foreground">Data Portability</h4>
              <p className="text-xs text-muted-foreground">Export or delete your data anytime</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                Export
              </Button>
              <Button size="sm" variant="outline" className="hover:scale-105 transition-transform text-destructive">
                Delete
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyDashboard;