import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PageLayout from "@/components/PageLayout";
import WorkoutPlan from "@/components/WorkoutPlan";
import MealPlan from "@/components/MealPlan";
import EnergyCalculator from "@/components/EnergyCalculator";
import PersonalProfile from "@/components/PersonalProfile";
import NotePad from "@/components/NotePad";
import FitnessAnalytics from "@/components/FitnessAnalytics";
import MentalHealthHub from "@/components/MentalHealthHub";
import FindFriendsCoaches from "@/components/FindFriendsCoaches";
import OthersSection from "@/components/OthersSection";
import PrivacyDashboard from "@/components/PrivacyDashboard";
import BiomechanicsAssessment from "@/components/BiomechanicsAssessment";
import SocialCompetitions from "@/components/SocialCompetitions";
import HabitTracker from "@/components/HabitTracker";
import PoseDetection from "@/components/PoseDetection";
import WearableSync from "@/components/WearableSync";
import SmartNutrition from "@/components/SmartNutrition";
import LocalExperiences from "@/components/LocalExperiences";
import AICoach from "@/components/AICoach";
import ToDoSection from "@/components/ToDoSection";
import QuickFood from "@/components/QuickFood";
import SearchResults from "@/components/SearchResults";

const queryClient = new QueryClient();

const PageWrapper = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate();
  return <PageLayout>{React.cloneElement(children, { onBack: () => navigate(-1), onNavigateToPrivacy: () => navigate('/privacy'), onNavigateToBiomechanics: () => navigate('/biomechanics'), onNavigateToSocial: () => navigate('/social'), onNavigateToHabits: () => navigate('/habits'), onNavigateToPoseDetection: () => navigate('/pose-detection'), onNavigateToWearableSync: () => navigate('/wearable-sync'), onNavigateToSmartNutrition: () => navigate('/smart-nutrition'), onNavigateToLocalExperiences: () => navigate('/local-experiences'), onNavigateToAICoach: () => navigate('/ai-coach'), onNavigateToWorkoutPlan: () => navigate('/workouts'), onNavigateToMealPlan: () => navigate('/meals'), onNavigateToEnergyCalc: () => navigate('/energy-calculator'), onNavigateToProfile: () => navigate('/profile'), onNavigateToNotepad: () => navigate('/notepad'), onNavigateToAnalytics: () => navigate('/analytics') })}</PageLayout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/workouts" element={<PageWrapper><WorkoutPlan onBack={() => {}} /></PageWrapper>} />
          <Route path="/meals" element={<PageWrapper><MealPlan onBack={() => {}} /></PageWrapper>} />
          <Route path="/energy-calculator" element={<PageWrapper><EnergyCalculator onBack={() => {}} /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><PersonalProfile onBack={() => {}} /></PageWrapper>} />
          <Route path="/notepad" element={<PageWrapper><NotePad onBack={() => {}} /></PageWrapper>} />
          <Route path="/analytics" element={<PageWrapper><FitnessAnalytics onBack={() => {}} /></PageWrapper>} />
          <Route path="/mental-health" element={<PageWrapper><MentalHealthHub onBack={() => {}} /></PageWrapper>} />
          <Route path="/find-friends" element={<PageWrapper><FindFriendsCoaches onBack={() => {}} /></PageWrapper>} />
          <Route path="/more" element={<PageWrapper><OthersSection onBack={() => {}} onNavigateToPrivacy={() => {}} onNavigateToBiomechanics={() => {}} onNavigateToSocial={() => {}} onNavigateToHabits={() => {}} onNavigateToPoseDetection={() => {}} onNavigateToWearableSync={() => {}} onNavigateToSmartNutrition={() => {}} onNavigateToLocalExperiences={() => {}} onNavigateToAICoach={() => {}} /></PageWrapper>} />
          <Route path="/privacy" element={<PageWrapper><PrivacyDashboard onBack={() => {}} /></PageWrapper>} />
          <Route path="/biomechanics" element={<PageWrapper><BiomechanicsAssessment onBack={() => {}} /></PageWrapper>} />
          <Route path="/social" element={<PageWrapper><SocialCompetitions onBack={() => {}} /></PageWrapper>} />
          <Route path="/habits" element={<PageWrapper><HabitTracker onBack={() => {}} /></PageWrapper>} />
          <Route path="/pose-detection" element={<PageWrapper><PoseDetection onBack={() => {}} /></PageWrapper>} />
          <Route path="/wearable-sync" element={<PageWrapper><WearableSync onBack={() => {}} /></PageWrapper>} />
          <Route path="/smart-nutrition" element={<PageWrapper><SmartNutrition onBack={() => {}} /></PageWrapper>} />
          <Route path="/local-experiences" element={<PageWrapper><LocalExperiences onBack={() => {}} /></PageWrapper>} />
          <Route path="/ai-coach" element={<PageWrapper><AICoach onBack={() => {}} /></PageWrapper>} />
          <Route path="/todo" element={<PageWrapper><ToDoSection onBack={() => {}} /></PageWrapper>} />
          <Route path="/quick-food" element={<PageWrapper><QuickFood onBack={() => {}} /></PageWrapper>} />
          <Route path="/search" element={<PageWrapper><SearchResults onBack={() => {}} onNavigateToWorkoutPlan={() => {}} onNavigateToMealPlan={() => {}} onNavigateToEnergyCalc={() => {}} onNavigateToProfile={() => {}} onNavigateToNotepad={() => {}} onNavigateToAnalytics={() => {}} /></PageWrapper>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
