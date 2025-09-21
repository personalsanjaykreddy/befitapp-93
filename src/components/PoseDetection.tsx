import { useState, useRef, useEffect } from "react";
import { Camera, CameraOff, Play, Pause, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PoseDetectionProps {
  onBack: () => void;
}

const PoseDetection = ({ onBack }: PoseDetectionProps) => {
  const [isActive, setIsActive] = useState(false);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [currentExercise, setCurrentExercise] = useState("squat");
  const [score, setScore] = useState(85);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const exercises = [
    { id: "squat", name: "Squats", description: "Deep knee bend analysis" },
    { id: "pushup", name: "Push-ups", description: "Arm alignment check" },
    { id: "plank", name: "Plank", description: "Core stability assessment" }
  ];

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsActive(true);
      startPoseAnalysis();
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsActive(false);
    setFeedback([]);
  };

  const startPoseAnalysis = () => {
    // Simulate real-time pose feedback
    const feedbackMessages = [
      "✓ Good knee alignment",
      "⚠ Go deeper in your squat",
      "✓ Excellent back posture",
      "⚠ Keep knees behind toes"
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      setFeedback(prev => {
        const newFeedback = [...prev, feedbackMessages[index % feedbackMessages.length]];
        return newFeedback.slice(-3); // Keep only last 3 messages
      });
      
      setScore(Math.floor(Math.random() * 20) + 75); // Random score 75-95
      index++;
    }, 2000);

    setTimeout(() => clearInterval(interval), 10000);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Form Coach</h1>
            <p className="text-sm text-muted-foreground">Real-time pose correction</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            Back
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Exercise Selection */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-glow hover:scale-[1.02] transition-all duration-slow cursor-pointer group hover-highlight touch-highlight">
          <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">Select Exercise</h3>
          <div className="grid grid-cols-3 gap-2">
            {exercises.map((exercise) => (
              <Button
                key={exercise.id}
                variant={currentExercise === exercise.id ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentExercise(exercise.id)}
                className="text-xs hover:scale-105 transition-transform duration-normal hover:shadow-md"
              >
                {exercise.name}
              </Button>
            ))}
          </div>
        </Card>

        {/* Camera View */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-selected hover:scale-[1.01] transition-all duration-slow cursor-pointer">
          <div className="aspect-video bg-background rounded-lg mb-4 relative overflow-hidden border border-border/30">
            {isActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Camera preview will appear here</p>
                </div>
              </div>
            )}
            
            {/* Pose overlay indicators */}
            {isActive && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 right-4 bg-background/90 rounded-lg px-3 py-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-glow-pulse"></div>
                    <span className="text-sm font-medium text-foreground">Live</span>
                  </div>
                </div>
                
                {/* Score badge */}
                <div className="absolute top-4 left-4 bg-gradient-primary text-primary-foreground rounded-lg px-3 py-2 shadow-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold">{score}%</div>
                    <div className="text-xs">Form Score</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={isActive ? stopCamera : startCamera}
              className="flex-1 hover:scale-105 hover:shadow-glow transition-all duration-normal"
            >
              {isActive ? (
                <>
                  <CameraOff className="w-4 h-4 mr-2" />
                  Stop Analysis
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Start Analysis
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Real-time Feedback */}
        {isActive && (
          <Card className="p-4 bg-gradient-card border border-border/50 animate-slide-up hover:shadow-md hover:scale-[1.01] transition-all duration-normal cursor-pointer">
            <h3 className="font-semibold text-foreground mb-3">Live Feedback</h3>
            <div className="space-y-2">
              {feedback.map((message, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-background/50 rounded-lg animate-fade-in"
                >
                  {message.includes('✓') ? (
                    <CheckCircle className="w-4 h-4 text-success" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-warning" />
                  )}
                  <span className="text-sm text-foreground">{message.substring(2)}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Privacy Notice */}
        <Card className="p-3 bg-muted/50 border border-border/30 hover:bg-muted/70 hover:scale-[1.01] transition-all duration-normal cursor-pointer">
          <p className="text-xs text-muted-foreground text-center">
            🔒 All processing happens on your device. No video data is sent to servers.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PoseDetection;