import { useState, useEffect } from "react";
import { User, Edit3, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface ProfileData {
  name: string;
  age: string;
  weight: string;
  height: string;
  goal: string;
  activityLevel: string;
}

interface PersonalProfileProps {
  onBack: () => void;
}

const PersonalProfile = ({ onBack }: PersonalProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    activityLevel: ""
  });

  useEffect(() => {
    // Load saved profile data
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      setIsEditing(true); // First time user
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
  };

  const getGreeting = () => {
    if (!profile.name) return "Welcome!";
    const hour = new Date().getHours();
    if (hour < 12) return `Good Morning, ${profile.name}!`;
    if (hour < 17) return `Good Afternoon, ${profile.name}!`;
    return `Good Evening, ${profile.name}!`;
  };

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{getGreeting()}</h1>
            <p className="text-sm text-muted-foreground">Manage your fitness profile</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Profile Card */}
        <Card className="p-6 bg-gradient-card border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Personal Details</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
                {isEditing ? (
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.name || "Not set"}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Age</label>
                {isEditing ? (
                  <Input
                    value={profile.age}
                    onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Age"
                    type="number"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.age || "Not set"} years</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Weight</label>
                {isEditing ? (
                  <Input
                    value={profile.weight}
                    onChange={(e) => setProfile(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="Weight (kg)"
                    type="number"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.weight || "Not set"} kg</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Height</label>
                {isEditing ? (
                  <Input
                    value={profile.height}
                    onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
                    placeholder="Height (cm)"
                    type="number"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.height || "Not set"} cm</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Fitness Goal</label>
              {isEditing ? (
                <select
                  value={profile.goal}
                  onChange={(e) => setProfile(prev => ({ ...prev, goal: e.target.value }))}
                  className="w-full p-2 rounded-md border border-border bg-background text-foreground"
                >
                  <option value="">Select goal</option>
                  <option value="weight-loss">Weight Loss</option>
                  <option value="muscle-gain">Muscle Gain</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="endurance">Build Endurance</option>
                </select>
              ) : (
                <p className="text-sm text-muted-foreground">{profile.goal || "Not set"}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Activity Level</label>
              {isEditing ? (
                <select
                  value={profile.activityLevel}
                  onChange={(e) => setProfile(prev => ({ ...prev, activityLevel: e.target.value }))}
                  className="w-full p-2 rounded-md border border-border bg-background text-foreground"
                >
                  <option value="">Select activity level</option>
                  <option value="sedentary">Sedentary (Little/no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="very-active">Very Active (6-7 days/week)</option>
                  <option value="extremely-active">Extremely Active (2x/day)</option>
                </select>
              ) : (
                <p className="text-sm text-muted-foreground">{profile.activityLevel || "Not set"}</p>
              )}
            </div>

            {isEditing && (
              <Button onClick={handleSave} className="w-full mt-4">
                Save Profile
              </Button>
            )}
          </div>
        </Card>

        {/* BMI Calculator */}
        {profile.weight && profile.height && (
          <Card className="p-4 bg-gradient-card border border-border/50">
            <h3 className="font-semibold text-foreground mb-2">Your BMI</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">
                {(parseFloat(profile.weight) / Math.pow(parseFloat(profile.height) / 100, 2)).toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                {(() => {
                  const bmi = parseFloat(profile.weight) / Math.pow(parseFloat(profile.height) / 100, 2);
                  if (bmi < 18.5) return "Underweight";
                  if (bmi < 25) return "Normal";
                  if (bmi < 30) return "Overweight";
                  return "Obese";
                })()}
              </span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PersonalProfile;