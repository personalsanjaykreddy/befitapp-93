import { MapPin, Navigation, Layers, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapView = () => {
  return (
    <div className="relative flex-1 bg-gradient-hero overflow-hidden">
      {/* Map Placeholder with Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1)_0%,transparent_70%)]" />
        
        {/* Mock Map Elements */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-secondary rounded-full animate-glow-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-success rounded-full animate-glow-pulse" />
        
        {/* Mock Route Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <path
            d="M 100 200 Q 200 100 300 150 T 500 200"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            fill="none"
            className="animate-fade-in"
          />
          <path
            d="M 150 300 Q 250 250 350 280 T 450 320"
            stroke="hsl(var(--secondary))"
            strokeWidth="2"
            fill="none"
            className="animate-fade-in"
          />
        </svg>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-6 right-4 flex flex-col gap-3">
        {/* Start/Record Button - Primary CTA */}
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-primary text-primary-foreground shadow-selected hover:shadow-glow transition-all duration-slow hover:scale-105 active:scale-95"
        >
          <Play className="w-6 h-6 fill-current" />
        </Button>

        {/* Secondary Controls */}
        <div className="flex flex-col gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 rounded-full bg-map-control/95 backdrop-blur-md border border-border/50 text-foreground shadow-md hover:shadow-lg transition-all duration-normal hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 rounded-full bg-map-control/95 backdrop-blur-md border border-border/50 text-foreground shadow-md hover:shadow-lg transition-all duration-normal hover:scale-105"
          >
            <Navigation className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 rounded-full bg-map-control/95 backdrop-blur-md border border-border/50 text-foreground shadow-md hover:shadow-lg transition-all duration-normal hover:scale-105"
          >
            <Layers className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Current Location Indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg animate-bounce-gentle" />
          <div className="absolute inset-0 w-6 h-6 bg-primary/30 rounded-full animate-ping" />
        </div>
      </div>
    </div>
  );
};

export default MapView;