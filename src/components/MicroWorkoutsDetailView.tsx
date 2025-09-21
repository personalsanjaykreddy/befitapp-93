import { ArrowLeft, Timer, Play, Flower2, Zap, Heart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import WorkoutPopup from "./WorkoutPopup";

interface MicroWorkoutsDetailViewProps {
  onBack: () => void;
}

const microWorkouts = [
  {
    id: "morning-yoga",
    name: "Morning Yoga Flow",
    duration: 8,
    type: "yoga",
    icon: Flower2,
    description: "Sun salutations and gentle stretches",
    color: "purple",
    exercises: [
      { name: "Sun Salutation A", duration: 120 },
      { name: "Cat-Cow Stretch", duration: 90 },
      { name: "Child's Pose", duration: 90 },
      { name: "Mountain Pose Breathing", duration: 60 }
    ]
  },
  {
    id: "desk-break",
    name: "Desk Break HIIT",
    duration: 5,
    type: "hiit",
    icon: Zap,
    description: "Quick energy boost for work breaks",
    color: "orange",
    exercises: [
      { name: "Jumping Jacks", duration: 60 },
      { name: "Wall Push-ups", duration: 60 },
      { name: "Chair Squats", duration: 60 },
      { name: "Desk Stretches", duration: 120 }
    ]
  },
  {
    id: "cardio-burst",
    name: "Cardio Burst",
    duration: 7,
    type: "cardio",
    icon: Heart,
    description: "Get your heart pumping quickly",
    color: "red",
    exercises: [
      { name: "High Knees", duration: 90 },
      { name: "Butt Kicks", duration: 90 },
      { name: "Mountain Climbers", duration: 90 },
      { name: "Cool Down Walk", duration: 150 }
    ]
  },
  {
    id: "flexibility-flow",
    name: "Flexibility Flow",
    duration: 6,
    type: "flexibility",
    icon: Target,
    description: "Improve mobility and reduce tension",
    color: "green",
    exercises: [
      { name: "Neck Rolls", duration: 60 },
      { name: "Shoulder Shrugs", duration: 60 },
      { name: "Hip Circles", duration: 60 },
      { name: "Spinal Twist", duration: 120 },
      { name: "Deep Breathing", duration: 60 }
    ]
  }
];

const MicroWorkoutsDetailView = ({ onBack }: MicroWorkoutsDetailViewProps) => {
  const [selectedWorkout, setSelectedWorkout] = useState<typeof microWorkouts[0] | null>(null);
  const [showWorkoutPopup, setShowWorkoutPopup] = useState(false);

  const handleStartWorkout = (workout: typeof microWorkouts[0]) => {
    setSelectedWorkout(workout);
    setShowWorkoutPopup(true);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600", 
      red: "from-red-500 to-red-600",
      green: "from-green-500 to-green-600"
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-hero">
      {/* Header */}
      <div className="flex items-center p-4 bg-background/95 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-bold text-foreground">Micro Workouts</h1>
          <p className="text-xs text-muted-foreground">
            Quick 5-10 minute fitness sessions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <Timer className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Header Card */}
        <Card className="p-4 text-center">
          <Timer className="w-12 h-12 text-primary mx-auto mb-2" />
          <h2 className="text-xl font-bold text-foreground mb-1">Quick Fitness Sessions</h2>
          <p className="text-sm text-muted-foreground">
            Perfect for busy schedules • 5-10 minutes each
          </p>
        </Card>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 gap-4">
          {microWorkouts.map((workout) => (
            <Card
              key={workout.id}
              className="p-4 cursor-pointer hover:shadow-md transition-all duration-normal hover-highlight touch-highlight border border-border/50"
              onClick={() => handleStartWorkout(workout)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getColorClasses(workout.color)} flex items-center justify-center`}>
                  <workout.icon className="w-7 h-7 text-white" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground text-base mb-1">{workout.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{workout.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        <Timer className="w-3 h-3 mr-1" />
                        {workout.duration} min
                      </Badge>
                      <Badge variant="outline" className="text-xs px-2 py-1 capitalize">
                        {workout.type}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      className="h-8 px-3 text-xs bg-gradient-primary hover:shadow-glow"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartWorkout(workout);
                      }}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </Button>
                  </div>
                </div>
              </div>

              {/* Exercise Preview */}
              <div className="mt-3 pt-3 border-t border-border/30">
                <p className="text-xs text-muted-foreground mb-2">Exercises included:</p>
                <div className="flex flex-wrap gap-1">
                  {workout.exercises.slice(0, 3).map((exercise, index) => (
                    <span key={index} className="text-xs bg-background/50 px-2 py-1 rounded">
                      {exercise.name}
                    </span>
                  ))}
                  {workout.exercises.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{workout.exercises.length - 3} more</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Tip */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <h3 className="text-sm font-semibold text-foreground mb-2">💡 Quick Tip</h3>
          <p className="text-sm text-muted-foreground">
            Micro workouts are perfect for breaking up long work sessions. Even 5 minutes of movement can boost energy and focus!
          </p>
        </Card>
      </div>

      {/* Workout Timer Popup */}
      {showWorkoutPopup && selectedWorkout && (
        <WorkoutPopup
          workout={selectedWorkout}
          onClose={() => {
            setShowWorkoutPopup(false);
            setSelectedWorkout(null);
          }}
        />
      )}
    </div>
  );
};

export default MicroWorkoutsDetailView;