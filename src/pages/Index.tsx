import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WebsiteHeader from "@/components/WebsiteHeader";
import HomeView from "@/components/HomeView";
import BentoGrid from "@/components/BentoGrid";
import UserProfileSetup from "@/components/UserProfileSetup";

const Index = () => {
  const navigate = useNavigate();
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Check if user profile exists and user hasn't completed setup
    try {
      const savedProfile = localStorage.getItem('userProfile');
      const hasCompletedSetup = localStorage.getItem('hasCompletedSetup');
      
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      } else if (!hasCompletedSetup) {
        setShowProfileSetup(true);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      // If there's an error, just continue without profile setup
      setShowProfileSetup(false);
    }
  }, []);


  const handleProfileComplete = (profile: any) => {
    setUserProfile(profile);
    localStorage.setItem('hasCompletedSetup', 'true');
    setShowProfileSetup(false);
  };

  const handleProfileSkip = () => {
    localStorage.setItem('hasCompletedSetup', 'true');
    setShowProfileSetup(false);
  };


  return (
    <div className="flex flex-col min-h-screen bg-gradient-hero">
      {/* Optional Profile Setup Modal */}
      {showProfileSetup && (
        <UserProfileSetup 
          onComplete={handleProfileComplete}
          onSkip={handleProfileSkip}
        />
      )}
      
      {/* Website Header with Navigation */}
      <WebsiteHeader 
        userName={userProfile?.name}
      />
      
      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Home View - Primary Canvas */}
          <div className="py-6">
            <HomeView 
              onNavigateToEnergyCalc={() => navigate('/energy-calculator')}
              onNavigateToNotes={() => navigate('/notepad')}
              onNavigateToMealPlan={() => navigate('/meals')}
              onNavigateToWorkoutPlan={() => navigate('/workouts')}
            />
          </div>
          
          {/* Bento Grid Categories */}
          <div className="bg-background/95 backdrop-blur-md border-t border-border/50 py-6">
            <div className="px-6">
              <BentoGrid 
                onNavigateToWorkoutPlan={() => navigate('/workouts')}
                onNavigateToMealPlan={() => navigate('/meals')}
                onNavigateToEnergyCalc={() => navigate('/energy-calculator')}
                onNavigateToProfile={() => navigate('/profile')}
                onNavigateToNotepad={() => navigate('/notepad')}
                onNavigateToAnalytics={() => navigate('/analytics')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
