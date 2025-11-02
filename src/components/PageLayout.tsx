import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import WebsiteHeader from "./WebsiteHeader";

interface PageLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

const PageLayout = ({ children, showHeader = true }: PageLayoutProps) => {
  const navigate = useNavigate();
  const userProfile = localStorage.getItem('userProfile');
  const userName = userProfile ? JSON.parse(userProfile).name : undefined;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-hero">
      {showHeader && <WebsiteHeader userName={userName} />}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
