import { useState } from "react";
import { Brain, Activity, AlertCircle, CheckCircle, Camera, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface BiomechanicsAssessmentProps {
  onBack: () => void;
}

const BiomechanicsAssessment = ({ onBack }: BiomechanicsAssessmentProps) => {
  const [currentAssessment, setCurrentAssessment] = useState<string | null>(null);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [results, setResults] = useState<any>(null);

  const assessments = [
    {
      id: "squat",
      title: "Overhead Squat Assessment",
      description: "Evaluate movement patterns and muscle imbalances",
      duration: "5 minutes",
      difficulty: "beginner",
      checkpoints: [
        "Foot position and arch",
        "Knee tracking alignment", 
        "Hip mobility and depth",
        "Torso position",
        "Shoulder mobility"
      ]
    },
    {
      id: "shoulder",
      title: "Shoulder Stability Test",
      description: "Check for shoulder impingement and stability issues",
      duration: "3 minutes", 
      difficulty: "intermediate",
      checkpoints: [
        "Scapular positioning",
        "Rotator cuff strength",
        "Overhead mobility",
        "Internal rotation"
      ]
    },
    {
      id: "core",
      title: "Core Stability Assessment",
      description: "Evaluate deep core activation and stability",
      duration: "4 minutes",
      difficulty: "beginner", 
      checkpoints: [
        "Breathing pattern",
        "Pelvic floor engagement",
        "Transverse abdominis activation",
        "Spinal alignment"
      ]
    }
  ];

  const correctivePrograms = [
    {
      title: "Hip Mobility Protocol",
      description: "4-week program to improve hip flexibility",
      sessions: 12,
      focus: "Lower body mobility",
      exercises: ["90/90 stretch", "Pigeon pose", "Hip flexor stretches"]
    },
    {
      title: "Shoulder Stability Program", 
      description: "6-week rotator cuff strengthening",
      sessions: 18,
      focus: "Shoulder health",
      exercises: ["Band pull-aparts", "Wall slides", "External rotations"]
    },
    {
      title: "Core Activation Series",
      description: "3-week deep core training",
      sessions: 9,
      focus: "Core stability",
      exercises: ["Dead bugs", "Bird dogs", "Pallof press"]
    }
  ];

  const startAssessment = (assessmentId: string) => {
    setCurrentAssessment(assessmentId);
    setAssessmentStep(0);
    setResults(null);
  };

  const nextStep = () => {
    const assessment = assessments.find(a => a.id === currentAssessment);
    if (assessment && assessmentStep < assessment.checkpoints.length - 1) {
      setAssessmentStep(prev => prev + 1);
    } else {
      // Complete assessment
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    // Simulate assessment results
    setResults({
      score: 75,
      issues: [
        { name: "Knee valgus", severity: "moderate", description: "Knees cave inward during movement" },
        { name: "Limited ankle mobility", severity: "mild", description: "Reduced dorsiflexion range" }
      ],
      recommendations: [
        "Hip Mobility Protocol",
        "Glute strengthening exercises",
        "Ankle mobility work"
      ]
    });
    setCurrentAssessment(null);
  };

  const getCurrentAssessment = () => {
    return assessments.find(a => a.id === currentAssessment);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success/20 text-success border-success/30';
      case 'intermediate': return 'bg-warning/20 text-warning border-warning/30';
      case 'advanced': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-success';
      case 'moderate': return 'text-warning'; 
      case 'severe': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  if (currentAssessment) {
    const assessment = getCurrentAssessment();
    if (!assessment) return null;

    return (
      <div className="flex-1 bg-gradient-hero overflow-hidden">
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">{assessment.title}</h1>
            <Button onClick={() => setCurrentAssessment(null)} variant="outline" size="sm">
              Exit
            </Button>
          </div>

          <Card className="p-6 bg-gradient-card border border-border/50 hover:shadow-md transition-all duration-normal">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Step {assessmentStep + 1} of {assessment.checkpoints.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(((assessmentStep + 1) / assessment.checkpoints.length) * 100)}%
                </span>
              </div>
              <Progress 
                value={((assessmentStep + 1) / assessment.checkpoints.length) * 100} 
                className="mb-4 hover:h-3 transition-all duration-normal"
              />
            </div>

            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {assessment.checkpoints[assessmentStep]}
              </h3>
              <p className="text-muted-foreground mb-4">
                Follow the instructions and perform the movement as shown
              </p>
              
              <div className="aspect-video bg-muted/20 rounded-lg mb-4 flex items-center justify-center border border-border/30">
                <div className="text-center">
                  <Camera className="w-12 h-12 mx-auto mb-2 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    Movement demonstration would appear here
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 hover:scale-105 transition-transform"
                onClick={() => setAssessmentStep(Math.max(0, assessmentStep - 1))}
                disabled={assessmentStep === 0}
              >
                Previous
              </Button>
              <Button 
                className="flex-1 hover:scale-105 hover:shadow-glow transition-all duration-normal"
                onClick={nextStep}
              >
                {assessmentStep === assessment.checkpoints.length - 1 ? 'Complete' : 'Next'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Biomechanics Lab</h1>
            <p className="text-sm text-muted-foreground">Assess movement patterns & prevent injuries</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            Back
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Results Summary */}
        {results && (
          <Card className="p-4 bg-gradient-selected border border-primary/20 animate-slide-up hover:shadow-glow hover:scale-[1.01] transition-all duration-slow cursor-pointer">
            <h3 className="font-semibold text-foreground mb-3">Latest Assessment Results</h3>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">{results.score}</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Movement Score</h4>
                <p className="text-sm text-muted-foreground">Above average mobility</p>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-medium text-foreground">Issues Identified:</h5>
              {results.issues.map((issue: any, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-background/50 rounded">
                  <AlertCircle className={`w-4 h-4 ${getSeverityColor(issue.severity)}`} />
                  <div>
                    <span className="text-sm font-medium text-foreground">{issue.name}</span>
                    <p className="text-xs text-muted-foreground">{issue.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Available Assessments */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md transition-all duration-normal">
          <h3 className="font-semibold text-foreground mb-3">Movement Assessments</h3>
          <div className="space-y-3">
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
                onClick={() => startAssessment(assessment.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:animate-bounce-gentle transition-colors">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {assessment.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{assessment.duration}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getDifficultyColor(assessment.difficulty)} hover:scale-105 transition-transform`}
                      >
                        {assessment.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="hover:scale-105 hover:shadow-md transition-all duration-normal"
                >
                  Start
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Corrective Programs */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-selected hover:scale-[1.01] transition-all duration-slow cursor-pointer">
          <h3 className="font-semibold text-foreground mb-3">Corrective Programs</h3>
          <div className="space-y-3">
            {correctivePrograms.map((program, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 group-hover:animate-bounce-gentle transition-colors">
                    <Target className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {program.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{program.sessions} sessions</span>
                      <span>•</span>
                      <span>{program.focus}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="hover:scale-105 hover:shadow-md transition-all duration-normal"
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Clinical Partnership */}
        <Card className="p-3 bg-muted/50 border border-border/30 hover:bg-muted/70 hover:scale-[1.01] transition-all duration-normal cursor-pointer">
          <div className="text-center">
            <h4 className="text-sm font-medium text-foreground mb-1">🏥 Need Professional Help?</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Connect with certified physical therapists for advanced assessment
            </p>
            <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
              Find PT Near Me
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BiomechanicsAssessment;