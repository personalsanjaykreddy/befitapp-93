import { useState } from "react";
import { Smartphone, Watch, Bluetooth, Wifi, Activity, Heart, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface WearableSyncProps {
  onBack: () => void;
}

const WearableSync = ({ onBack }: WearableSyncProps) => {
  const [connectedDevices, setConnectedDevices] = useState([
    {
      id: 1,
      name: "Apple Watch Series 9",
      type: "smartwatch",
      brand: "Apple",
      connected: true,
      lastSync: "2 min ago",
      batteryLevel: 85,
      metrics: ["Heart Rate", "Steps", "Calories", "Sleep"]
    },
    {
      id: 2,
      name: "iPhone Health",
      type: "phone",
      brand: "Apple",
      connected: true,
      lastSync: "5 min ago",
      batteryLevel: null,
      metrics: ["Steps", "Flights Climbed", "Walking Distance"]
    }
  ]);

  const [availableDevices] = useState([
    {
      id: 3,
      name: "Garmin Fenix 7",
      type: "fitness-watch",
      brand: "Garmin",
      connected: false,
      features: ["GPS", "Heart Rate", "VO2 Max", "Training Load"]
    },
    {
      id: 4,
      name: "WHOOP 4.0",
      type: "fitness-band",
      brand: "WHOOP",
      connected: false,
      features: ["Recovery", "Strain", "Sleep", "HRV"]
    },
    {
      id: 5,
      name: "Polar H10",
      type: "heart-rate",
      brand: "Polar",
      connected: false,
      features: ["ECG Heart Rate", "Bluetooth", "ANT+"]
    },
    {
      id: 6,
      name: "Oura Ring Gen3",
      type: "smart-ring",
      brand: "Oura",
      connected: false,
      features: ["Sleep", "HRV", "Temperature", "Activity"]
    }
  ]);

  const [gymEquipment] = useState([
    {
      id: 1,
      name: "Peloton Bike+",
      type: "cardio",
      connected: false,
      features: ["Power", "Cadence", "Resistance", "Classes"]
    },
    {
      id: 2,
      name: "NordicTrack Treadmill",
      type: "cardio", 
      connected: false,
      features: ["Speed", "Incline", "Heart Rate", "iFit"]
    },
    {
      id: 3,
      name: "Technogym Equipment",
      type: "strength",
      connected: false,
      features: ["Weight", "Reps", "Form Analysis", "Programs"]
    }
  ]);

  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    realTimeHR: true,
    sleepTracking: true,
    locationServices: true,
    backgroundRefresh: true
  });

  const connectDevice = (deviceId: number) => {
    // Simulate device connection
    console.log(`Connecting device ${deviceId}`);
  };

  const disconnectDevice = (deviceId: number) => {
    setConnectedDevices(prev => 
      prev.map(device => 
        device.id === deviceId 
          ? { ...device, connected: false }
          : device
      )
    );
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'smartwatch':
      case 'fitness-watch':
      case 'smart-ring':
        return Watch;
      case 'phone':
        return Smartphone;
      case 'fitness-band':
      case 'heart-rate':
        return Heart;
      default:
        return Activity;
    }
  };

  const getBrandColor = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'apple': return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'garmin': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'whoop': return 'bg-red-50 text-red-800 border-red-200';
      case 'polar': return 'bg-cyan-50 text-cyan-800 border-cyan-200';
      case 'oura': return 'bg-purple-50 text-purple-800 border-purple-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Device Sync</h1>
            <p className="text-sm text-muted-foreground">Connect wearables & equipment</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            Back
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Sync Status */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-glow hover:scale-[1.02] transition-all duration-slow cursor-pointer group">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Sync Status</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-glow-pulse"></div>
              <span className="text-sm text-muted-foreground">Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <TrendingUp className="w-6 h-6 mx-auto mb-1 text-success" />
              <div className="text-sm font-medium text-foreground">12,847</div>
              <div className="text-xs text-muted-foreground">Steps Today</div>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <Heart className="w-6 h-6 mx-auto mb-1 text-destructive" />
              <div className="text-sm font-medium text-foreground">68 BPM</div>
              <div className="text-xs text-muted-foreground">Resting HR</div>
            </div>
          </div>
        </Card>

        {/* Connected Devices */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md transition-all duration-normal">
          <h3 className="font-semibold text-foreground mb-3">Connected Devices</h3>
          <div className="space-y-3">
            {connectedDevices.map((device) => {
              const IconComponent = getDeviceIcon(device.type);
              return (
                <div
                  key={device.id}
                  className="flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-lg hover:bg-success/20 hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center group-hover:animate-bounce-gentle">
                    <IconComponent className="w-5 h-5 text-success" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {device.name}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getBrandColor(device.brand)} hover:scale-105 transition-transform`}
                      >
                        {device.brand}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Bluetooth className="w-3 h-3" />
                      <span>Last sync: {device.lastSync}</span>
                      {device.batteryLevel && (
                        <>
                          <span>•</span>
                          <span>Battery: {device.batteryLevel}%</span>
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {device.metrics.map((metric, index) => (
                        <Badge key={index} variant="secondary" className="text-xs hover:scale-105 transition-transform">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => disconnectDevice(device.id)}
                    className="hover:scale-105 transition-transform"
                  >
                    Disconnect
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Available Wearables */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-selected hover:scale-[1.01] transition-all duration-slow cursor-pointer">
          <h3 className="font-semibold text-foreground mb-3">Available Wearables</h3>
          <div className="space-y-3">
            {availableDevices.map((device) => {
              const IconComponent = getDeviceIcon(device.type);
              return (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:animate-bounce-gentle transition-colors">
                      <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {device.name}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getBrandColor(device.brand)} hover:scale-105 transition-transform`}
                        >
                          {device.brand}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {device.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs hover:scale-105 transition-transform">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => connectDevice(device.id)}
                    className="hover:scale-105 hover:shadow-glow transition-all duration-normal"
                  >
                    Connect
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Gym Equipment */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md transition-all duration-normal">
          <h3 className="font-semibold text-foreground mb-3">Gym Equipment</h3>
          <div className="space-y-3">
            {gymEquipment.map((equipment) => (
              <div
                key={equipment.id}
                className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 group-hover:animate-bounce-gentle transition-colors">
                    <Activity className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {equipment.name}
                    </h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {equipment.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs hover:scale-105 transition-transform">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="hover:scale-105 hover:shadow-md transition-all duration-normal"
                >
                  Pair
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Sync Settings */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-selected hover:scale-[1.01] transition-all duration-slow cursor-pointer">
          <h3 className="font-semibold text-foreground mb-3">Sync Settings</h3>
          <div className="space-y-3">
            {Object.entries(syncSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-2 hover:bg-background/30 rounded transition-colors">
                <label className="text-sm font-medium text-foreground capitalize cursor-pointer">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) => 
                    setSyncSettings(prev => ({ ...prev, [key]: checked }))
                  }
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WearableSync;