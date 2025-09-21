import { X, Timer, Play, Square, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CalorieTracker } from "@/utils/calorieTracker";

interface Exercise {
  name: string;
  duration: number;
}

interface Workout {
  id: string;
  name: string;
  duration: number;
  exercises: Exercise[];
}

interface WorkoutPopupProps {
  workout?: Workout;
  onClose: () => void;
}

const WorkoutPopup = ({ workout, onClose }: WorkoutPopupProps) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Use workout data or fallback to default exercises
  const exercises = workout?.exercises || [
    { name: "Wall Push-ups", duration: 120 },
    { name: "Desk Stretches", duration: 180 },
    { name: "Chair Squats", duration: 240 },
    { name: "Deep Breathing", duration: 180 }
  ];

  const currentExerciseData = exercises[currentExercise];
  const targetTime = currentExerciseData.duration;
  const workoutName = workout?.name || "Quick Workout";

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeElapsed < targetTime && !isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          if (newTime >= targetTime) {
            setIsRunning(false);
            // Auto-advance to next exercise or complete workout
            if (currentExercise < exercises.length - 1) {
              setTimeout(() => {
                setCurrentExercise(prev => prev + 1);
                setTimeElapsed(0);
                setIsRunning(true);
              }, 1000);
            } else {
              setIsCompleted(true);
              // Add workout to calorie tracker
              const totalDuration = exercises.reduce((sum, ex) => sum + ex.duration, 0);
              const estimatedCalories = Math.round((totalDuration / 60) * 5); // ~5 calories per minute
              CalorieTracker.addActivity(workoutName, estimatedCalories, Math.round(totalDuration / 60));
            }
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeElapsed, targetTime, currentExercise, exercises.length, workoutName, isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const exerciseCompleted = timeElapsed >= targetTime;
  const progressPercentage = Math.min((timeElapsed / targetTime) * 100, 100);
  
  const handleStart = () => setIsRunning(true);
  const handleStop = () => {
    setIsRunning(false);
    setTimeElapsed(0);
  };
  
  const handleReset = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setCurrentExercise(0);
    setIsCompleted(false);
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 animate-slide-up">
      <div className="bg-gradient-card border border-border/50 rounded-xl p-4 shadow-glow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-success' : exerciseCompleted ? 'bg-success' : isRunning ? 'bg-primary animate-pulse' : 'bg-muted'}`}></div>
            <span className="font-semibold text-foreground">
              {isCompleted ? 'Workout Complete!' : workoutName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {!isCompleted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs px-2 py-1 h-7"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
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
            <span className="font-medium text-foreground">{currentExerciseData.name}</span>
            <span className="text-muted-foreground">{Math.ceil(targetTime / 60)} min</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Exercise {currentExercise + 1} of {exercises.length}</span>
            {!isCompleted && <span>{isRunning ? 'Running...' : 'Ready to start'}</span>}
          </div>
          
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
            <div className="flex items-center gap-2">
              {!isRunning ? (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleStart}
                  className="flex items-center gap-2 bg-success hover:bg-success/90"
                >
                  <Play className="w-4 h-4" />
                  Start
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleStop}
                  className="flex items-center gap-2"
                >
                  <Square className="w-4 h-4" />
                  Stop
                </Button>
              )}
            </div>
          )}
          
          {isCompleted && (
            <Button
              variant="default"
              size="sm"
              onClick={onClose}
              className="bg-success hover:bg-success/90"
            >
              Great Job! 🎉
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPopup;