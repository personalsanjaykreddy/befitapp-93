import { useState } from "react";
import { Trophy, Users, Target, TrendingUp, Calendar, Medal, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface SocialCompetitionsProps {
  onBack: () => void;
}

const SocialCompetitions = ({ onBack }: SocialCompetitionsProps) => {
  const [selectedTab, setSelectedTab] = useState("cohorts");

  const [myCohorts] = useState([
    {
      id: 1,
      name: "Monday Motivators",
      members: 6,
      maxMembers: 8,
      progress: 78,
      goal: "Complete 20 workouts this month",
      daysLeft: 12,
      myRank: 2,
      streak: 5,
      avgFitnessAge: 28
    },
    {
      id: 2,
      name: "Weekend Warriors",
      members: 5,
      maxMembers: 6,
      progress: 45,
      goal: "Burn 15,000 calories collectively",
      daysLeft: 18,
      myRank: 3,
      streak: 3,
      avgFitnessAge: 31
    }
  ]);

  const [availableCohorts] = useState([
    {
      id: 3,
      name: "Early Risers",
      members: 4,
      maxMembers: 8,
      description: "5 AM workout crew for dedicated morning exercisers",
      requirements: "Commit to 5AM workouts 4x/week",
      fitnessAgeRange: "25-35 years"
    },
    {
      id: 4,
      name: "Strength Seekers",
      members: 7,
      maxMembers: 8,
      description: "Focus on building functional strength",
      requirements: "3+ strength sessions per week",
      fitnessAgeRange: "20-40 years"
    }
  ]);

  const [leagues] = useState([
    {
      id: 1,
      name: "Resilience Masters",
      tier: "Gold",
      participants: 156,
      myRank: 23,
      metric: "Recovery Score",
      myScore: 85,
      topScore: 96,
      reward: "Premium coaching session"
    },
    {
      id: 2,
      name: "Fitness Age Champions",
      tier: "Silver", 
      participants: 89,
      myRank: 12,
      metric: "Fitness Age Improvement",
      myScore: 24,
      topScore: 28,
      reward: "Nutrition consultation"
    }
  ]);

  const [challenges] = useState([
    {
      id: 1,
      title: "7-Day Mobility Challenge",
      description: "Complete daily mobility routine",
      participants: 234,
      timeLeft: "3 days",
      progress: 71,
      reward: "Flexibility assessment",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Step Count Showdown",
      description: "10,000 steps daily for 2 weeks",
      participants: 567,
      timeLeft: "9 days",
      progress: 64,
      reward: "Activity tracker discount",
      difficulty: "Intermediate"
    }
  ]);

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'gold': return 'bg-warning/20 text-warning border-warning/30';
      case 'silver': return 'bg-muted/20 text-muted-foreground border-border';
      case 'bronze': return 'bg-secondary/20 text-secondary border-secondary/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-success/20 text-success border-success/30';
      case 'intermediate': return 'bg-warning/20 text-warning border-warning/30';
      case 'advanced': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Social Fitness</h1>
            <p className="text-sm text-muted-foreground">Compete & connect with others</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            Back
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Navigation Tabs */}
        <Card className="p-2 bg-gradient-card border border-border/50 hover:shadow-md transition-all duration-normal">
          <div className="flex gap-1">
            {[
              { id: "cohorts", label: "My Cohorts", icon: Users },
              { id: "leagues", label: "Leagues", icon: Trophy },
              { id: "challenges", label: "Challenges", icon: Target }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={selectedTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTab(tab.id)}
                  className="flex-1 hover:scale-105 transition-transform duration-normal hover:shadow-sm"
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </Card>

        {/* My Cohorts */}
        {selectedTab === "cohorts" && (
          <>
            <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-glow hover:scale-[1.01] transition-all duration-slow cursor-pointer">
              <h3 className="font-semibold text-foreground mb-3">Active Cohorts</h3>
              <div className="space-y-3">
                {myCohorts.map((cohort) => (
                  <div
                    key={cohort.id}
                    className="p-4 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group border border-border/30"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                          {cohort.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">{cohort.goal}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{cohort.members}/{cohort.maxMembers} members</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{cohort.daysLeft} days left</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge variant="default" className="mb-2 hover:scale-105 transition-transform">
                          #{cohort.myRank}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {cohort.streak} day streak
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium text-foreground">{cohort.progress}%</span>
                      </div>
                      <Progress 
                        value={cohort.progress} 
                        className="h-2 hover:h-3 transition-all duration-normal"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Avg Fitness Age: {cohort.avgFitnessAge}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="hover:scale-105 transition-transform"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md transition-all duration-normal">
              <h3 className="font-semibold text-foreground mb-3">Join New Cohort</h3>
              <div className="space-y-3">
                {availableCohorts.map((cohort) => (
                  <div
                    key={cohort.id}
                    className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {cohort.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-1">{cohort.description}</p>
                      <div className="text-xs text-muted-foreground">
                        {cohort.requirements} • Fitness Age: {cohort.fitnessAgeRange}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">
                        {cohort.members}/{cohort.maxMembers} spots
                      </div>
                      <Button 
                        size="sm"
                        className="hover:scale-105 hover:shadow-glow transition-all duration-normal"
                      >
                        Request Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* Leagues */}
        {selectedTab === "leagues" && (
          <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-selected hover:scale-[1.01] transition-all duration-slow cursor-pointer">
            <h3 className="font-semibold text-foreground mb-3">Current Leagues</h3>
            <div className="space-y-3">
              {leagues.map((league) => (
                <div
                  key={league.id}
                  className="p-4 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group border border-border/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center group-hover:animate-bounce-gentle">
                        <Trophy className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {league.name}
                          </h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getTierColor(league.tier)} hover:scale-105 transition-transform`}
                          >
                            {league.tier}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Measuring: {league.metric}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">#{league.myRank}</div>
                      <div className="text-xs text-muted-foreground">of {league.participants}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-center p-2 bg-primary/10 rounded">
                      <div className="text-lg font-bold text-primary">{league.myScore}</div>
                      <div className="text-xs text-muted-foreground">My Score</div>
                    </div>
                    <div className="text-center p-2 bg-secondary/10 rounded">
                      <div className="text-lg font-bold text-secondary">{league.topScore}</div>
                      <div className="text-xs text-muted-foreground">Leader Score</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      🏆 Reward: {league.reward}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="hover:scale-105 transition-transform"
                    >
                      Leaderboard
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Challenges */}
        {selectedTab === "challenges" && (
          <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-glow hover:scale-[1.01] transition-all duration-slow cursor-pointer">
            <h3 className="font-semibold text-foreground mb-3">Active Challenges</h3>
            <div className="space-y-3">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="p-4 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group border border-border/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {challenge.title}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getDifficultyColor(challenge.difficulty)} hover:scale-105 transition-transform`}
                        >
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{challenge.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{challenge.timeLeft} left</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge variant="default" className="hover:scale-105 transition-transform">
                        <Medal className="w-3 h-3 mr-1" />
                        {challenge.reward}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Your Progress</span>
                      <span className="text-sm font-medium text-foreground">{challenge.progress}%</span>
                    </div>
                    <Progress 
                      value={challenge.progress} 
                      className="h-2 hover:h-3 transition-all duration-normal"
                    />
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full hover:scale-105 transition-transform"
                  >
                    <Flame className="w-4 h-4 mr-2" />
                    Continue Challenge
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SocialCompetitions;