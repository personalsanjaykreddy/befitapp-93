import { Timer, Play, Flower2, Zap, Heart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import WorkoutPopup from "./WorkoutPopup";

interface MicroWorkoutsProps {
  onViewAllWorkouts?: () => void;
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

const MicroWorkouts = ({ onViewAllWorkouts }: MicroWorkoutsProps) => {
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Micro Workouts</h3>
          <p className="text-sm text-muted-foreground">Quick 5-10 minute sessions</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAllWorkouts}
          className="text-xs"
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {microWorkouts.map((workout) => (
          <Card
            key={workout.id}
            className="p-3 cursor-pointer hover:shadow-md transition-all duration-normal hover-highlight touch-highlight border border-border/50"
            onClick={() => handleStartWorkout(workout)}
          >
            <div className="space-y-2">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getColorClasses(workout.color)} flex items-center justify-center mb-2`}>
                <workout.icon className="w-5 h-5 text-white" />
              </div>
              
              <div>
                <h4 className="font-medium text-foreground text-sm">{workout.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{workout.description}</p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {workout.duration} min
                  </Badge>
                  <Button
                    size="sm"
                    className="h-7 px-2 text-xs bg-gradient-primary hover:shadow-glow"
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
          </Card>
        ))}
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

export default MicroWorkouts;