import { X, Timer, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface WorkoutPopupProps {
  onClose: () => void;
}

const WorkoutPopup = ({ onClose }: WorkoutPopupProps) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTask, setCurrentTask] = useState(0);

  // Daily Tiny Tasks (2-10 minute micro-workouts)
  const tinyTasks = [
    { name: "Wall Push-ups", duration: 120, description: "15 wall push-ups, rest, repeat" },
    { name: "Desk Stretches", duration: 180, description: "Neck rolls, shoulder shrugs, back stretch" },
    { name: "Stair Climbs", duration: 300, description: "Up and down stairs 5 times" },
    { name: "Chair Squats", duration: 240, description: "10 chair squats, 30s rest, repeat" },
    { name: "Deep Breathing", duration: 180, description: "4-7-8 breathing exercise" },
    { name: "Calf Raises", duration: 120, description: "20 calf raises while standing" },
    { name: "Walking Break", duration: 600, description: "Walk around for fresh air" }
  ];

  const selectedTask = tinyTasks[currentTask];
  const targetTime = selectedTask.duration;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused && timeElapsed < targetTime) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, timeElapsed, targetTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isCompleted = timeElapsed >= targetTime;
  const progressPercentage = Math.min((timeElapsed / targetTime) * 100, 100);

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 animate-slide-up">
      <div className="bg-gradient-card border border-border/50 rounded-xl p-4 shadow-glow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-success' : 'bg-primary animate-pulse'}`}></div>
            <span className="font-semibold text-foreground">
              {isCompleted ? 'Task Completed!' : 'Daily Tiny Task'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {tinyTasks.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCurrentTask((prev) => (prev + 1) % tinyTasks.length);
                  setTimeElapsed(0);
                  setIsPaused(false);
                }}
                className="text-xs px-2 py-1 h-7"
              >
                Next Task
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-6 h-6 hover:bg-destructive/20 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="font-medium text-foreground">{selectedTask.name}</span>
            <span className="text-muted-foreground">{Math.ceil(targetTime / 60)} min</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{selectedTask.description}</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-border rounded-full h-2 mb-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Timer className="w-5 h-5 text-primary" />
            <span className="text-lg font-bold text-foreground">
              {formatTime(timeElapsed)} / {formatTime(targetTime)}
            </span>
          </div>
          
          {!isCompleted && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-2"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          )}
          
          {isCompleted && (
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setCurrentTask((prev) => (prev + 1) % tinyTasks.length);
                setTimeElapsed(0);
                setIsPaused(false);
              }}
              className="bg-success hover:bg-success/90"
            >
              Next Task
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPopup;