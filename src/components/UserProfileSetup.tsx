import { useState, useEffect } from "react";
import { User, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface UserProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
  onSkip: () => void;
}

interface UserProfile {
  name: string;
  age: string;
  weight: string;
  height: string;
}

const UserProfileSetup = ({ onComplete, onSkip }: UserProfileSetupProps) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    weight: "",
    height: ""
  });

  const [errors, setErrors] = useState<Partial<UserProfile>>({});

  const validateForm = () => {
    const newErrors: Partial<UserProfile> = {};
    
    if (!profile.name.trim()) newErrors.name = "Name is required";
    if (!profile.age.trim()) newErrors.age = "Age is required";
    if (!profile.weight.trim()) newErrors.weight = "Weight is required";
    if (!profile.height.trim()) newErrors.height = "Height is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      onComplete(profile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 bg-gradient-card border border-border/50 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Welcome!</h2>
              <p className="text-sm text-muted-foreground">Let's set up your profile</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onSkip}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                placeholder="Age"
                className={errors.age ? "border-destructive" : ""}
              />
              {errors.age && <p className="text-xs text-destructive mt-1">{errors.age}</p>}
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="Weight"
                className={errors.weight ? "border-destructive" : ""}
              />
              {errors.weight && <p className="text-xs text-destructive mt-1">{errors.weight}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={profile.height}
              onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
              placeholder="Height in cm"
              className={errors.height ? "border-destructive" : ""}
            />
            {errors.height && <p className="text-xs text-destructive mt-1">{errors.height}</p>}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onSkip} className="flex-1">
            Skip for now
          </Button>
          <Button onClick={handleSubmit} className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-normal">
            <Save className="w-4 h-4 mr-2" />
            Save Profile
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserProfileSetup;