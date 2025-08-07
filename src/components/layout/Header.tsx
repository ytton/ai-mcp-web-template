import { memo } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import Icon from "@/components/ui/icon";

function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-header flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Icon icon="lucide:zap" size={24} className="text-primary" />
          <span className="text-xl font-bold">AI MCP Web</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`hover:text-primary transition-colors ${
              isActive('/') ? 'text-foreground font-medium' : 'text-muted-foreground'
            }`}
          >
            首页
          </Link>
          <Link 
            to="/dashboard" 
            className={`hover:text-primary transition-colors ${
              isActive('/dashboard') ? 'text-foreground font-medium' : 'text-muted-foreground'
            }`}
          >
            仪表板
          </Link>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            关于
          </a>
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <Icon 
            icon="lucide:bell" 
            size={20} 
            className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" 
          />
          <Icon 
            icon="lucide:user" 
            size={20} 
            className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" 
          />
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
