import { useState, useEffect } from "react";
import { Bot, MessageCircle, Zap, TrendingUp, Heart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface AICoachProps {
  onBack: () => void;
}

const AICoach = ({ onBack }: AICoachProps) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Good morning! I noticed your heart rate was elevated yesterday evening. Consider switching to low-impact exercises today.",
      timestamp: new Date(Date.now() - 300000),
      category: 'recovery'
    },
    {
      id: 2,
      type: 'ai',
      content: "Your squat depth has improved 15% this week! Try adding 5lbs to your next session.",
      timestamp: new Date(Date.now() - 3600000),
      category: 'progress'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [insights, setInsights] = useState([
    {
      title: "Recovery Focus",
      description: "Based on your sleep data, prioritize flexibility today",
      icon: Heart,
      priority: "high"
    },
    {
      title: "Form Improvement", 
      description: "Your knee tracking improved 12% this week",
      icon: TrendingUp,
      priority: "medium"
    },
    {
      title: "Nutrition Sync",
      description: "Protein intake is 85% of goal - add a snack",
      icon: Zap,
      priority: "low"
    }
  ]);

  const [isPremium, setIsPremium] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: newMessage,
      timestamp: new Date(),
      category: 'general' as const
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great question! Based on your workout history, I'd recommend...",
        "I can see from your form analysis that you're making excellent progress...",
        "Your recovery metrics suggest focusing on lower intensity today...",
        "That's a common concern. Let me analyze your movement patterns..."
      ];
      
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai' as const,
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        category: 'response' as const
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'recovery': return Heart;
      case 'progress': return TrendingUp;
      case 'nutrition': return Zap;
      default: return Brain;
    }
  };

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Coach</h1>
            <p className="text-sm text-muted-foreground">Your personalized fitness advisor</p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            Back
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Coach Status */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-glow hover:scale-[1.02] transition-all duration-slow cursor-pointer group hover-highlight touch-highlight">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center group-hover:animate-bounce-gentle">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Coach Status</h3>
              <p className="text-sm text-muted-foreground">
                {isPremium ? "Premium AI • Deep Personalization Active" : "Free AI • Basic Insights"}
              </p>
            </div>
            <Badge variant={isPremium ? "default" : "secondary"} className="hover:scale-105 transition-transform">
              {isPremium ? "Premium" : "Free"}
            </Badge>
          </div>
        </Card>

        {/* Quick Insights */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md hover:scale-[1.01] transition-all duration-normal cursor-pointer hover-highlight touch-highlight">
          <h3 className="font-semibold text-foreground mb-3">Today's Insights</h3>
          <div className="space-y-2">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-background/50 rounded-lg hover:bg-background/70 hover:scale-[1.02] transition-all duration-normal cursor-pointer group"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:animate-highlight-cursor ${
                    insight.priority === 'high' ? 'bg-destructive/20 text-destructive' :
                    insight.priority === 'medium' ? 'bg-warning/20 text-warning' :
                    'bg-success/20 text-success'
                  }`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {insight.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-selected transition-all duration-normal hover-highlight touch-highlight">
          <h3 className="font-semibold text-foreground mb-3">Recent Conversations</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {messages.map((message) => {
              const IconComponent = getCategoryIcon(message.category);
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 p-3 rounded-lg hover:scale-[1.01] transition-all duration-normal ${
                    message.type === 'ai' 
                      ? 'bg-primary/5 border border-primary/10 hover:bg-primary/10 cursor-pointer' 
                      : 'bg-muted/50 hover:bg-muted/70 cursor-pointer'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'ai' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {message.type === 'ai' ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <MessageCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Message Input */}
        <Card className="p-4 bg-gradient-card border border-border/50 hover:shadow-md transition-all duration-normal">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask your AI coach anything..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="hover:shadow-sm transition-all duration-normal"
            />
            <Button 
              onClick={sendMessage}
              className="hover:scale-105 hover:shadow-glow transition-all duration-normal"
            >
              Send
            </Button>
          </div>
        </Card>

        {/* Premium Upgrade */}
        {!isPremium && (
          <Card className="p-4 bg-gradient-selected border border-primary/20 hover:shadow-glow hover:scale-[1.02] transition-all duration-slow cursor-pointer group">
            <div className="text-center">
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                Upgrade to Premium AI
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get weekly plan tuning, 1:1 chat, and advanced insights
              </p>
              <Button 
                onClick={() => setIsPremium(true)}
                className="hover:scale-105 hover:shadow-glow transition-all duration-normal"
              >
                Upgrade Now
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AICoach;