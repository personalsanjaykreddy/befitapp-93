import { useState, useEffect } from "react";
import { ArrowLeft, Clock, MapPin, Dumbbell, Heart, Zap, Target, CheckCircle, Flower2, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import WorkoutPopup from "./WorkoutPopup";

interface WorkoutPlanProps {
  onBack: () => void;
}

interface WorkoutType {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

interface WorkoutPlanData {
  type: string;
  duration: number;
  location: string;
}

interface Exercise {
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
  rest?: string;
}

const workoutTypes: WorkoutType[] = [
  {
    id: "micro",
    name: "Micro Workouts",
    description: "Quick 5-10 minute sessions",
    icon: Zap,
    gradient: "bg-gradient-to-br from-primary to-primary-glow"
  },
  {
    id: "yoga",
    name: "Yoga",
    description: "Flexibility, balance, and mindfulness",
    icon: Flower2,
    gradient: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  {
    id: "strength",
    name: "Strength Training",
    description: "Build muscle and increase power",
    icon: Dumbbell,
    gradient: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    id: "cardio",
    name: "Cardio",
    description: "Improve cardiovascular endurance",
    icon: Heart,
    gradient: "bg-gradient-to-br from-destructive to-red-400"
  },
  {
    id: "hiit",
    name: "HIIT",
    description: "High-intensity interval training",
    icon: Target,
    gradient: "bg-gradient-to-br from-warning to-orange-400"
  },
  {
    id: "flexibility",
    name: "Flexibility",
    description: "Stretch and improve mobility",
    icon: Target,
    gradient: "bg-gradient-to-br from-success to-emerald-400"
  }
];

const durations = [5, 10, 15, 30, 45, 60, 90];
const locations = ["Home", "Gym", "Outdoor", "Hotel/Travel"];

const WorkoutPlan = ({ onBack }: WorkoutPlanProps) => {
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem('workoutPlanStep');
    return saved ? parseInt(saved) : 1;
  });
  const [selectedType, setSelectedType] = useState(() => {
    return localStorage.getItem('workoutPlanType') || "";
  });
  const [selectedDuration, setSelectedDuration] = useState(() => {
    const saved = localStorage.getItem('workoutPlanDuration');
    return saved ? parseInt(saved) : 0;
  });
  const [selectedLocation, setSelectedLocation] = useState(() => {
    return localStorage.getItem('workoutPlanLocation') || "";
  });
  const [generatedPlan, setGeneratedPlan] = useState<Exercise[]>(() => {
    const saved = localStorage.getItem('workoutPlanGenerated');
    return saved ? JSON.parse(saved) : [];
  });
  const [showWorkoutPopup, setShowWorkoutPopup] = useState(false);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('workoutPlanStep', step.toString());
  }, [step]);

  useEffect(() => {
    localStorage.setItem('workoutPlanType', selectedType);
  }, [selectedType]);

  useEffect(() => {
    localStorage.setItem('workoutPlanDuration', selectedDuration.toString());
  }, [selectedDuration]);

  useEffect(() => {
    localStorage.setItem('workoutPlanLocation', selectedLocation);
  }, [selectedLocation]);

  useEffect(() => {
    localStorage.setItem('workoutPlanGenerated', JSON.stringify(generatedPlan));
  }, [generatedPlan]);

  const generateWorkoutPlan = (data: WorkoutPlanData): Exercise[] => {
    const plans = {
      micro: {
        home: [
          { name: "Morning Yoga Flow", duration: "8min" },
          { name: "Desk Break HIIT", duration: "5min" },
          { name: "Cardio Burst", duration: "7min" },
          { name: "Flexibility Flow", duration: "6min" }
        ],
        gym: [
          { name: "Quick Strength Circuit", duration: "10min" },
          { name: "HIIT Cardio Burst", duration: "8min" },
          { name: "Core Power Session", duration: "6min" },
          { name: "Stretching Flow", duration: "5min" }
        ],
        outdoor: [
          { name: "Park Bench Workout", duration: "10min" },
          { name: "Running Intervals", duration: "8min" },
          { name: "Bodyweight Circuit", duration: "7min" },
          { name: "Nature Yoga", duration: "9min" }
        ]
      },
      yoga: {
        home: [
          { name: "Sun Salutation A", sets: 3, reps: "5 rounds", rest: "30s" },
          { name: "Warrior II Flow", sets: 2, reps: "Hold 30s each side", rest: "15s" },
          { name: "Downward Dog", sets: 3, duration: "45s", rest: "15s" },
          { name: "Tree Pose", sets: 2, reps: "30s each leg", rest: "10s" },
          { name: "Savasana", sets: 1, duration: "5min", rest: "Complete" }
        ],
        gym: [
          { name: "Vinyasa Flow", sets: 4, reps: "8 breaths", rest: "30s" },
          { name: "Chair Pose Hold", sets: 3, duration: "45s", rest: "30s" },
          { name: "Warrior III", sets: 2, reps: "30s each leg", rest: "20s" },
          { name: "Crow Pose", sets: 3, reps: "Hold 15s", rest: "45s" },
          { name: "Meditation", sets: 1, duration: "10min", rest: "Complete" }
        ],
        outdoor: [
          { name: "Mountain Pose Breathing", sets: 3, duration: "60s", rest: "15s" },
          { name: "Nature Flow Sequence", sets: 2, reps: "10 movements", rest: "30s" },
          { name: "Tree Meditation", sets: 1, duration: "5min", rest: "30s" },
          { name: "Sunset Stretches", sets: 3, reps: "Hold 45s", rest: "20s" },
          { name: "Grounding Savasana", sets: 1, duration: "8min", rest: "Complete" }
        ]
      },
      strength: {
        home: [
          { name: "Push-ups", sets: 3, reps: "8-12", rest: "60s" },
          { name: "Bodyweight Squats", sets: 3, reps: "12-15", rest: "60s" },
          { name: "Pike Push-ups", sets: 3, reps: "6-10", rest: "60s" },
          { name: "Lunges", sets: 3, reps: "10 each leg", rest: "60s" },
          { name: "Plank Hold", sets: 3, duration: "30-60s", rest: "60s" }
        ],
        gym: [
          { name: "Bench Press", sets: 4, reps: "6-8", rest: "2-3min" },
          { name: "Deadlifts", sets: 4, reps: "5-6", rest: "2-3min" },
          { name: "Squats", sets: 4, reps: "8-10", rest: "2-3min" },
          { name: "Pull-ups", sets: 3, reps: "6-10", rest: "90s" },
          { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90s" }
        ],
        outdoor: [
          { name: "Park Bench Push-ups", sets: 3, reps: "10-15", rest: "60s" },
          { name: "Hill Sprints", sets: 5, duration: "30s", rest: "90s" },
          { name: "Tree Branch Pull-ups", sets: 3, reps: "5-8", rest: "90s" },
          { name: "Rock Carries", sets: 3, duration: "30s", rest: "60s" },
          { name: "Stair Climbs", sets: 3, reps: "2 flights", rest: "60s" }
        ]
      },
      cardio: {
        home: [
          { name: "Jumping Jacks", duration: "45s", rest: "15s" },
          { name: "High Knees", duration: "45s", rest: "15s" },
          { name: "Burpees", duration: "30s", rest: "30s" },
          { name: "Mountain Climbers", duration: "45s", rest: "15s" },
          { name: "Dancing", duration: "60s", rest: "15s" }
        ],
        gym: [
          { name: "Treadmill Intervals", duration: "2min fast", rest: "1min walk" },
          { name: "Rowing Machine", duration: "500m", rest: "90s" },
          { name: "Cycling", duration: "3min moderate", rest: "1min easy" },
          { name: "Elliptical", duration: "2min", rest: "30s" },
          { name: "Stair Climber", duration: "90s", rest: "60s" }
        ],
        outdoor: [
          { name: "Running Intervals", duration: "2min", rest: "1min walk" },
          { name: "Hill Repeats", duration: "90s uphill", rest: "walk down" },
          { name: "Cycling", duration: "5min", rest: "2min easy" },
          { name: "Swimming Laps", duration: "25m", rest: "15s" },
          { name: "Trail Running", duration: "continuous", rest: "as needed" }
        ]
      },
      hiit: {
        home: [
          { name: "Squat Jumps", duration: "20s", rest: "10s" },
          { name: "Push-up to T", duration: "20s", rest: "10s" },
          { name: "Plank Jacks", duration: "20s", rest: "10s" },
          { name: "Bicycle Crunches", duration: "20s", rest: "10s" },
          { name: "Jump Lunges", duration: "20s", rest: "10s" }
        ],
        gym: [
          { name: "Kettlebell Swings", duration: "30s", rest: "15s" },
          { name: "Battle Ropes", duration: "30s", rest: "15s" },
          { name: "Box Jumps", duration: "30s", rest: "15s" },
          { name: "Slam Balls", duration: "30s", rest: "15s" },
          { name: "Burpee Box Jump", duration: "30s", rest: "15s" }
        ],
        outdoor: [
          { name: "Sprint Intervals", duration: "30s", rest: "30s" },
          { name: "Bear Crawls", duration: "20s", rest: "10s" },
          { name: "Jump Squats", duration: "20s", rest: "10s" },
          { name: "Mountain Climbers", duration: "20s", rest: "10s" },
          { name: "Burpees", duration: "20s", rest: "10s" }
        ]
      },
      flexibility: {
        home: [
          { name: "Cat-Cow Stretch", duration: "60s" },
          { name: "Child's Pose", duration: "90s" },
          { name: "Hip Flexor Stretch", duration: "60s each leg" },
          { name: "Shoulder Rolls", duration: "45s" },
          { name: "Spinal Twist", duration: "60s each side" }
        ],
        gym: [
          { name: "Foam Rolling", duration: "5min" },
          { name: "Hamstring Stretch", duration: "90s each leg" },
          { name: "Pigeon Pose", duration: "2min each leg" },
          { name: "Chest Doorway Stretch", duration: "60s" },
          { name: "Calf Stretch", duration: "60s each leg" }
        ],
        outdoor: [
          { name: "Tree-Assisted Calf Stretch", duration: "60s each leg" },
          { name: "Park Bench Hip Flexor", duration: "90s each leg" },
          { name: "Ground Spinal Twist", duration: "60s each side" },
          { name: "Standing Quad Stretch", duration: "60s each leg" },
          { name: "Seated Forward Fold", duration: "2min" }
        ]
      }
    };

    const locationKey = data.location.toLowerCase().replace("/", "") as keyof typeof plans.strength;
    return plans[data.type as keyof typeof plans]?.[locationKey] || plans.strength.home;
  };

  const handleGeneratePlan = () => {
    const planData: WorkoutPlanData = {
      type: selectedType,
      duration: selectedDuration,
      location: selectedLocation
    };
    
    const plan = generateWorkoutPlan(planData);
    setGeneratedPlan(plan);
    setStep(4);
  };

  const deleteExercise = (index: number) => {
    setGeneratedPlan(prev => prev.filter((_, i) => i !== index));
  };

  const addCustomExercise = () => {
    const exerciseName = prompt("Enter exercise name:");
    if (exerciseName) {
      const newExercise: Exercise = {
        name: exerciseName,
        sets: 3,
        reps: "10-12",
        rest: "60s"
      };
      setGeneratedPlan(prev => [...prev, newExercise]);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">Choose Workout Type</h2>
              <p className="text-sm text-muted-foreground">What kind of workout are you in the mood for?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {workoutTypes.map((type) => (
                <Card
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={cn(
                    "p-4 cursor-pointer transition-all duration-normal hover:scale-[1.02] hover-highlight touch-highlight",
                    "border border-border/50 hover:border-primary/50",
                    selectedType === type.id && [
                      "border-primary/50 bg-gradient-selected scale-[1.02]",
                      "shadow-selected"
                    ]
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", type.gradient)}>
                      <type.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{type.name}</h3>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                    {selectedType === type.id && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
            
            <Button 
              onClick={() => setStep(2)} 
              disabled={!selectedType}
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-normal"
            >
              Continue
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">How long do you have?</h2>
              <p className="text-sm text-muted-foreground">Choose your workout duration</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {durations.map((duration) => (
                <Card
                  key={duration}
                  onClick={() => setSelectedDuration(duration)}
                  className={cn(
                    "p-4 cursor-pointer transition-all duration-normal hover:scale-[1.02] hover-highlight touch-highlight",
                    "text-center border border-border/50 hover:border-secondary/50",
                    selectedDuration === duration && [
                      "border-secondary/50 bg-gradient-selected scale-[1.02]",
                      "shadow-selected"
                    ]
                  )}
                >
                  <div className="space-y-2">
                    <Clock className={cn(
                      "w-6 h-6 mx-auto transition-colors duration-normal",
                      selectedDuration === duration ? "text-secondary" : "text-muted-foreground"
                    )} />
                    <p className="font-semibold text-foreground">{duration} min</p>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)} 
                disabled={!selectedDuration}
                className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-normal"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">Where are you working out?</h2>
              <p className="text-sm text-muted-foreground">This helps us customize your exercises</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {locations.map((location) => (
                <Card
                  key={location}
                  onClick={() => setSelectedLocation(location)}
                  className={cn(
                    "p-4 cursor-pointer transition-all duration-normal hover:scale-[1.02] hover-highlight touch-highlight",
                    "text-center border border-border/50 hover:border-success/50",
                    selectedLocation === location && [
                      "border-success/50 bg-gradient-selected scale-[1.02]",
                      "shadow-selected"
                    ]
                  )}
                >
                  <div className="space-y-2">
                    <MapPin className={cn(
                      "w-6 h-6 mx-auto transition-colors duration-normal",
                      selectedLocation === location ? "text-success" : "text-muted-foreground"
                    )} />
                    <p className="font-semibold text-foreground">{location}</p>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleGeneratePlan} 
                disabled={!selectedLocation}
                className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-normal"
              >
                Generate Plan
              </Button>
            </div>
          </div>
        );

      case 4:
        const selectedTypeData = workoutTypes.find(t => t.id === selectedType);
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">Your Workout Plan</h2>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">{selectedTypeData?.name}</Badge>
                <Badge variant="outline">{selectedDuration} min</Badge>
                <Badge variant="outline">{selectedLocation}</Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              {generatedPlan.map((exercise, index) => (
                <Card key={index} className="p-4 bg-gradient-card border border-border/50 hover-highlight touch-highlight">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{exercise.name}</h3>
                      <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                        {exercise.sets && <span>{exercise.sets} sets</span>}
                        {exercise.reps && <span>{exercise.reps} reps</span>}
                        {exercise.duration && <span>{exercise.duration}</span>}
                        {exercise.rest && <span>Rest: {exercise.rest}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteExercise(index)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              <Button
                onClick={addCustomExercise}
                variant="outline"
                className="w-full border-dashed hover:bg-primary/5"
              >
                + Add Custom Exercise
              </Button>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setStep(1);
                  setSelectedType("");
                  setSelectedDuration(0);
                  setSelectedLocation("");
                  setGeneratedPlan([]);
                }} 
                className="flex-1"
              >
                Create New Plan
              </Button>
              <Button 
                onClick={() => setShowWorkoutPopup(true)}
                className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-normal"
              >
                <Timer className="w-4 h-4 mr-2" />
                Start Workout
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-hero">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-background/95 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-bold text-foreground">Workout Plan</h1>
          <p className="text-xs text-muted-foreground">Step {step} of 4</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 pb-2">
        <div className="w-full bg-border/50 rounded-full h-1">
          <div 
            className="bg-gradient-primary h-1 rounded-full transition-all duration-slow"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {renderStepContent()}
      </div>

      {/* Workout Popup */}
      {showWorkoutPopup && (
        <WorkoutPopup
          workout={{
            id: `${selectedType}-${selectedDuration}`,
            name: `${workoutTypes.find(t => t.id === selectedType)?.name || 'Custom'} Workout`,
            duration: selectedDuration,
            exercises: generatedPlan.map(exercise => ({
              name: exercise.name,
              duration: exercise.duration ? parseInt(exercise.duration.replace(/\D/g, '')) * 60 : 300 // Convert to seconds
            }))
          }}
          onClose={() => setShowWorkoutPopup(false)}
        />
      )}
    </div>
  );
};

export default WorkoutPlan;